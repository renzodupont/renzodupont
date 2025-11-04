const fs = require('fs');
const path = require('path');

// Function to update a single HTML file
function updateNavigationInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file already has the Resume link
    if (content.includes('/resume.html')) {
      console.log(`✓ Already updated: ${filePath}`);
      return false;
    }

    // Pattern 1: Navigation menu in header
    const oldNavPattern1 = `<nav>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/quienes-somos.html">Sobre Mí</a></li>
            <li><a href="/contacto.html">Contacto</a></li>
          </ul>
        </nav>`;

    const newNavPattern1 = `<nav>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/quienes-somos.html">Sobre Mí</a></li>
            <li><a href="/resume.html">Resume</a></li>
            <li><a href="/contacto.html">Contacto</a></li>
          </ul>
        </nav>`;

    // Pattern 2: Footer links
    const oldNavPattern2 = `<div class="footer-section">
            <h3>Enlaces</h3>
            <ul>
              <li><a href="/">Inicio</a></li>
              <li><a href="/quienes-somos.html">Sobre Mí</a></li>
              <li><a href="/contacto.html">Contacto</a></li>
            </ul>
          </div>`;

    const newNavPattern2 = `<div class="footer-section">
            <h3>Enlaces</h3>
            <ul>
              <li><a href="/">Inicio</a></li>
              <li><a href="/quienes-somos.html">Sobre Mí</a></li>
              <li><a href="/resume.html">Resume</a></li>
              <li><a href="/contacto.html">Contacto</a></li>
            </ul>
          </div>`;

    let updated = false;

    if (content.includes(oldNavPattern1)) {
      content = content.replace(oldNavPattern1, newNavPattern1);
      updated = true;
    }

    if (content.includes(oldNavPattern2)) {
      content = content.replace(oldNavPattern2, newNavPattern2);
      updated = true;
    }

    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Updated: ${filePath}`);
      return true;
    } else {
      console.log(`- No change needed: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`✗ Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Function to recursively find and update all HTML files
function updateAllHtmlFiles(dirPath) {
  let updatedCount = 0;
  let totalCount = 0;

  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);

    if (item.isDirectory()) {
      const results = updateAllHtmlFiles(fullPath);
      updatedCount += results.updated;
      totalCount += results.total;
    } else if (item.isFile() && item.name.endsWith('.html')) {
      totalCount++;
      if (updateNavigationInFile(fullPath)) {
        updatedCount++;
      }
    }
  }

  return { updated: updatedCount, total: totalCount };
}

// Main execution
const publicDir = path.join(__dirname, 'public');
console.log('🚀 Starting navigation update...\n');

const results = updateAllHtmlFiles(publicDir);

console.log('\n' + '='.repeat(50));
console.log(`✅ Update complete!`);
console.log(`   Updated: ${results.updated} files`);
console.log(`   Total processed: ${results.total} files`);
console.log('='.repeat(50));




