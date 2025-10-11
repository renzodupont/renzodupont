/**
 * Update all existing posts to include search bar in header
 */

import * as fs from "node:fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const searchBarHTML = `
        <!-- SEARCH BAR -->
        <div class="search-container">
          <form class="search-form" onsubmit="performSearch(event)">
            <input
              type="text"
              id="searchInput"
              placeholder="Buscar artículos..."
              class="search-input"
            />
            <button type="submit" class="search-btn">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="21 21l-4.35-4.35"></path>
              </svg>
            </button>
          </form>
        </div>
        `;

function updatePostFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");

    // Check if search bar already exists
    if (content.includes('class="search-container"')) {
      console.log(
        `⏭️  Skipping ${path.basename(filePath)} - already has search bar`
      );
      return false;
    }

    // Pattern 1: Add search bar after logo, before nav
    const pattern1 = /(<a href="\/" class="logo">Renzo Dupont<\/a>)\s*(<nav>)/;
    if (pattern1.test(content)) {
      content = content.replace(pattern1, `$1${searchBarHTML}$2`);
    }

    // Add search.js script before closing body tag if not present
    if (!content.includes('src="/js/search.js"')) {
      content = content.replace(
        /<\/body>/,
        '  <script src="/js/search.js"></script>\n</body>'
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
console.log("\n🔄 Updating Posts with Search Bar");
console.log("==================================\n");

const postsDir = path.join(__dirname, "public", "posts");

if (!fs.existsSync(postsDir)) {
  console.error("❌ Posts directory not found!");
  process.exit(1);
}

const result = findAndUpdatePosts(postsDir);

console.log("\n✅ Update Complete!");
console.log(`   Updated: ${result.updated} posts`);
console.log(`   Skipped: ${result.skipped} posts (already have search bar)\n`);
