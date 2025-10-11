/**
 * Update all existing posts to include mobile menu toggle
 */

import * as fs from "node:fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mobileMenuHTML = `
          <!-- MOBILE MENU TOGGLE -->
          <button class="mobile-menu-toggle" aria-label="Menú">
            <span></span>
            <span></span>
            <span></span>
          </button>
          `;

function updatePostFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");

    // Check if mobile menu already exists
    if (content.includes('class="mobile-menu-toggle"')) {
      console.log(
        `⏭️  Skipping ${path.basename(filePath)} - already has mobile menu`
      );
      return false;
    }

    // Add mobile menu toggle after search container, before nav
    const searchEndPattern = /(>\s*<\/div>\s*<\/div>\s*)(\s*<nav>)/;
    if (searchEndPattern.test(content)) {
      content = content.replace(searchEndPattern, `$1${mobileMenuHTML}$2`);
    }

    // Add mobile-menu.js script before closing body tag if not present
    if (!content.includes('src="/js/mobile-menu.js"')) {
      content = content.replace(
        /(<script src="\/js\/search\.js"><\/script>)/,
        '$1\n  <script src="/js/mobile-menu.js"></script>'
      );
    }

    // Write updated content
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Updated ${path.basename(filePath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

function findAndUpdatePosts(dir) {
  let updated = 0;
  let skipped = 0;

  function scanDirectory(directory) {
    const items = fs.readdirSync(directory);

    for (const item of items) {
      const fullPath = path.join(directory, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.endsWith(".html") && !item.includes("backup")) {
        if (updatePostFile(fullPath)) {
          updated++;
        } else {
          skipped++;
        }
      }
    }
  }

  scanDirectory(dir);
  return { updated, skipped };
}

// Main execution
console.log("\n🔄 Updating Posts with Mobile Menu");
console.log("===================================\n");

const postsDir = path.join(__dirname, "public", "posts");

if (!fs.existsSync(postsDir)) {
  console.error("❌ Posts directory not found!");
  process.exit(1);
}

const result = findAndUpdatePosts(postsDir);

console.log("\n✅ Update Complete!");
console.log(`   Updated: ${result.updated} posts`);
console.log(`   Skipped: ${result.skipped} posts (already have mobile menu)\n`);
