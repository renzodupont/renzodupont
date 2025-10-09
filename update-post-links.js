/**
 * Link Update Script
 * Updates all post references in HTML files after reorganization
 */

const fs = require("fs").promises;
const path = require("path");
const { JSDOM } = require("jsdom");

/**
 * Load the moves mapping
 */
async function loadMovesMapping(movesFile) {
  try {
    const data = await fs.readFile(movesFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("❌ Could not load moves mapping:", error.message);
    console.log(
      "\n💡 Run 'node organize-posts.js' first to create the mapping."
    );
    return null;
  }
}

/**
 * Update links in HTML content
 */
function updateLinksInContent(content, moves) {
  let updated = content;
  let changeCount = 0;

  for (const move of moves) {
    // Create regex patterns for different link formats
    const patterns = [
      // href="/posts/slug.html"
      {
        regex: new RegExp(`href="/posts/${move.slug}\\.html"`, "g"),
        replacement: `href="${move.newPath}"`,
      },
      // href="posts/slug.html"
      {
        regex: new RegExp(`href="posts/${move.slug}\\.html"`, "g"),
        replacement: `href="${move.newPath}"`,
      },
      // href="/slug.html" (less common but possible)
      {
        regex: new RegExp(`href="/${move.slug}\\.html"`, "g"),
        replacement: `href="${move.newPath}"`,
      },
      // Relative paths in post files
      {
        regex: new RegExp(`href="${move.slug}\\.html"`, "g"),
        replacement: `href="${move.newPath}"`,
      },
    ];

    for (const { regex, replacement } of patterns) {
      const matches = (updated.match(regex) || []).length;
      if (matches > 0) {
        updated = updated.replace(regex, replacement);
        changeCount += matches;
      }
    }
  }

  return { updated, changeCount };
}

/**
 * Update a single HTML file
 */
async function updateHTMLFile(filePath, moves, dryRun = false) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const { updated, changeCount } = updateLinksInContent(content, moves);

    if (changeCount > 0) {
      if (!dryRun) {
        await fs.writeFile(filePath, updated, "utf-8");
      }
      return { success: true, changes: changeCount };
    }

    return { success: true, changes: 0 };
  } catch (error) {
    console.error(`  ❌ Error updating ${filePath}:`, error.message);
    return { success: false, changes: 0 };
  }
}

/**
 * Find all HTML files recursively
 */
async function findAllHTMLFiles(dir, excludeDirs = ["node_modules"]) {
  const htmlFiles = [];

  async function scan(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory() && !excludeDirs.includes(entry.name)) {
        await scan(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".html")) {
        htmlFiles.push(fullPath);
      }
    }
  }

  await scan(dir);
  return htmlFiles;
}

/**
 * Main function to update all links
 */
async function updateAllLinks(options = {}) {
  const {
    publicDir = path.join(__dirname, "public"),
    movesFile = path.join(__dirname, "post-moves.json"),
    dryRun = false,
  } = options;

  console.log("🚀 Starting link update process...\n");
  console.log(`📂 Public directory: ${publicDir}`);
  console.log(`📋 Moves mapping: ${movesFile}`);
  console.log(
    `🔍 Dry run: ${dryRun ? "YES (no changes will be made)" : "NO"}\n`
  );

  // Load moves mapping
  console.log("📖 Loading moves mapping...");
  const moves = await loadMovesMapping(movesFile);

  if (!moves || moves.length === 0) {
    console.log("❌ No moves to process.");
    return;
  }

  console.log(`✅ Loaded ${moves.length} post moves\n`);

  // Find all HTML files
  console.log("🔍 Finding HTML files...");
  const htmlFiles = await findAllHTMLFiles(publicDir);
  console.log(`✅ Found ${htmlFiles.length} HTML file(s)\n`);

  // Update files
  console.log("🔄 Updating links...\n");
  let totalChanges = 0;
  let filesUpdated = 0;

  for (const filePath of htmlFiles) {
    const relativePath = path.relative(publicDir, filePath);
    const result = await updateHTMLFile(filePath, moves, dryRun);

    if (result.changes > 0) {
      console.log(`  ✅ ${relativePath}: ${result.changes} link(s) updated`);
      filesUpdated++;
      totalChanges += result.changes;
    }
  }

  // Summary
  console.log(`\n${"=".repeat(60)}`);
  console.log("📊 SUMMARY");
  console.log(`${"=".repeat(60)}`);
  console.log(`📝 HTML files checked: ${htmlFiles.length}`);
  console.log(`✅ Files with updates: ${filesUpdated}`);
  console.log(`🔗 Total links updated: ${totalChanges}`);

  if (dryRun) {
    console.log("\n✅ Dry run complete. No changes made.");
    console.log("💡 Run without --dry-run to actually update files.");
  } else {
    console.log("\n✨ All links updated successfully!");
  }
}

// CLI handling
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    dryRun: args.includes("--dry-run") || args.includes("-d"),
  };

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
🔗 Link Update Script

Usage:
  node update-post-links.js [options]

Options:
  --dry-run, -d    Preview changes without actually updating files
  --help, -h       Show this help message

What it does:
  1. Reads the post moves mapping (post-moves.json)
  2. Scans all HTML files in public/
  3. Updates all references to moved posts
  4. Updates both absolute and relative links

Requirements:
  - Must run 'node organize-posts.js' first to create the mapping

Example:
  # Preview changes
  node update-post-links.js --dry-run

  # Actually update files
  node update-post-links.js
    `);
    process.exit(0);
  }

  updateAllLinks(options).catch(console.error);
}

module.exports = { updateAllLinks, updateLinksInContent };
