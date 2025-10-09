/**
 * Post Organization Script
 * Reorganizes posts into year/month folder structure
 * Updates all references in HTML files
 */

const fs = require("fs").promises;
const path = require("path");
const { JSDOM } = require("jsdom");

/**
 * Extract metadata from HTML file
 */
async function extractPostMetadata(htmlPath) {
  try {
    const html = await fs.readFile(htmlPath, "utf-8");
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // Extract title
    const h1 = doc.querySelector("h1");
    const title = h1 ? h1.textContent.trim() : path.basename(htmlPath, ".html");

    // Extract date
    const dateMeta = doc.querySelector(".article-meta");
    let dateStr = "";
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = 1;

    if (dateMeta) {
      dateStr = dateMeta.textContent.trim();

      // Month names in Spanish
      const monthNames = {
        enero: 1,
        febrero: 2,
        marzo: 3,
        abril: 4,
        mayo: 5,
        junio: 6,
        julio: 7,
        agosto: 8,
        septiembre: 9,
        octubre: 10,
        noviembre: 11,
        diciembre: 12,
      };

      // Extract day
      const dayMatch = dateStr.match(/\b(\d{1,2})\s+de/);
      if (dayMatch) day = parseInt(dayMatch[1]);

      // Extract month
      for (const [monthName, monthNum] of Object.entries(monthNames)) {
        if (dateStr.toLowerCase().includes(monthName)) {
          month = monthNum;
          break;
        }
      }

      // Extract year
      const yearMatch = dateStr.match(/\d{4}/);
      if (yearMatch) year = parseInt(yearMatch[0]);
    }

    const slug = path.basename(htmlPath, ".html");

    return { title, dateStr, year, month, day, slug, originalPath: htmlPath };
  } catch (error) {
    console.error(`Error extracting metadata from ${htmlPath}:`, error.message);
    return null;
  }
}

/**
 * Discover all posts
 */
async function discoverPosts(postsDir) {
  const posts = [];
  const entries = await fs.readdir(postsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith(".html")) {
      const fullPath = path.join(postsDir, entry.name);
      const metadata = await extractPostMetadata(fullPath);
      if (metadata) {
        posts.push(metadata);
      }
    }
  }

  return posts;
}

/**
 * Update internal links in HTML content
 */
function updateLinksInHTML(html, oldPath, newPath) {
  // Update all variations of the old path
  const slug = path.basename(oldPath, ".html");

  // Patterns to replace
  const patterns = [
    new RegExp(`href="/posts/${slug}\\.html"`, "g"),
    new RegExp(`href="posts/${slug}\\.html"`, "g"),
    new RegExp(`href="/${slug}\\.html"`, "g"),
    new RegExp(`href="${slug}\\.html"`, "g"),
  ];

  let updatedHTML = html;
  for (const pattern of patterns) {
    updatedHTML = updatedHTML.replace(pattern, `href="${newPath}"`);
  }

  return updatedHTML;
}

/**
 * Organize posts into year/month structure
 */
async function organizePosts(options = {}) {
  const { postsDir = path.join(__dirname, "public", "posts"), dryRun = false } =
    options;

  console.log("🚀 Starting post organization...\n");
  console.log(`📂 Posts directory: ${postsDir}`);
  console.log(
    `🔍 Dry run: ${dryRun ? "YES (no changes will be made)" : "NO"}\n`
  );

  // Discover posts
  console.log("🔍 Discovering posts...");
  const posts = await discoverPosts(postsDir);
  console.log(`✅ Found ${posts.length} post(s)\n`);

  if (posts.length === 0) {
    console.log("ℹ️  No posts to organize.");
    return;
  }

  // Group posts by year/month
  const structure = {};
  for (const post of posts) {
    const yearKey = post.year;
    const monthKey = post.month.toString().padStart(2, "0");

    if (!structure[yearKey]) structure[yearKey] = {};
    if (!structure[yearKey][monthKey]) structure[yearKey][monthKey] = [];

    structure[yearKey][monthKey].push(post);
  }

  // Show planned structure
  console.log("📋 Planned structure:");
  for (const [year, months] of Object.entries(structure).sort()) {
    console.log(`\n  📅 ${year}/`);
    for (const [month, monthPosts] of Object.entries(months).sort()) {
      console.log(`     ${month}/ (${monthPosts.length} posts)`);
    }
  }
  console.log("");

  if (dryRun) {
    console.log("✅ Dry run complete. No changes made.");
    console.log("💡 Run without --dry-run to actually organize posts.");
    return;
  }

  // Track moves for updating references
  const moves = [];

  // Create directories and move posts
  console.log("📦 Organizing posts...\n");

  for (const [year, months] of Object.entries(structure)) {
    for (const [month, monthPosts] of Object.entries(months)) {
      const targetDir = path.join(postsDir, year, month);

      // Create directory
      await fs.mkdir(targetDir, { recursive: true });
      console.log(`📁 Created: ${path.relative(postsDir, targetDir)}/`);

      // Move posts
      for (const post of monthPosts) {
        const oldPath = post.originalPath;
        const newPath = path.join(targetDir, path.basename(oldPath));
        const oldRelative = `/posts/${post.slug}.html`;
        const newRelative = `/posts/${year}/${month}/${post.slug}.html`;

        try {
          await fs.rename(oldPath, newPath);
          console.log(`  ✅ Moved: ${post.slug}.html -> ${year}/${month}/`);

          moves.push({
            oldPath: oldRelative,
            newPath: newRelative,
            slug: post.slug,
          });
        } catch (error) {
          console.error(
            `  ❌ Failed to move ${post.slug}.html:`,
            error.message
          );
        }
      }
    }
  }

  console.log(`\n✅ Organized ${moves.length} posts into date-based folders`);

  // Save moves mapping for link updater
  const movesFile = path.join(__dirname, "post-moves.json");
  await fs.writeFile(movesFile, JSON.stringify(moves, null, 2));
  console.log(`\n💾 Saved moves mapping to: ${movesFile}`);
  console.log("💡 Run 'node update-post-links.js' to update all references");

  return moves;
}

// CLI handling
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    dryRun: args.includes("--dry-run") || args.includes("-d"),
  };

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
📂 Post Organization Script

Usage:
  node organize-posts.js [options]

Options:
  --dry-run, -d    Preview changes without actually moving files
  --help, -h       Show this help message

What it does:
  1. Scans all posts in public/posts/
  2. Extracts publication dates from HTML
  3. Creates year/month folder structure (e.g., 2024/09/)
  4. Moves posts to appropriate folders
  5. Saves a mapping file for updating links

Example structure:
  posts/
    2024/
      09/
        mitos-verdades-reforma-jubilatoria-uruguay.html
        fake-news-dolar-argentina.html
      10/
        new-october-post.html

After organizing:
  Run: node update-post-links.js
    `);
    process.exit(0);
  }

  organizePosts(options).catch(console.error);
}

module.exports = { organizePosts, discoverPosts, extractPostMetadata };
