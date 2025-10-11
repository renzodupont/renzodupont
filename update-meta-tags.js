/**
 * Update all HTML files with favicon and social media meta tags
 */
import * as fs from "node:fs";
import path from "path";
import { JSDOM } from "jsdom";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Update a single HTML file
 */
function updateHTMLFile(filePath) {
  console.log(`\n📄 Procesando: ${path.basename(filePath)}`);

  const html = fs.readFileSync(filePath, "utf-8");
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // Extract metadata
  const title = doc.querySelector("h1")?.textContent || "Renzo Dupont";
  const existingDesc =
    doc.querySelector('meta[name="description"]')?.content ||
    "Blog de tecnología en español";

  // Extract image path from the article
  const imgElement = doc.querySelector(".article-featured-image");
  const imgSrc = imgElement?.getAttribute("src") || "";

  // Build URLs
  const relativePath = path.relative(path.join(__dirname, "public"), filePath);
  const urlPath = relativePath.replace(/\\/g, "/");
  const pageUrl = `https://renzodupont.com/${urlPath}`;

  // Convert relative image to absolute URL
  let imageUrl = "https://renzodupont.com/favicon.ico"; // Default fallback
  if (imgSrc) {
    const imgPath = path.join(path.dirname(filePath), imgSrc);
    const imgRelative = path.relative(path.join(__dirname, "public"), imgPath);
    imageUrl = `https://renzodupont.com/${imgRelative.replace(/\\/g, "/")}`;
  }

  const head = doc.querySelector("head");
  if (!head) {
    console.log("  ⚠️  No se encontró <head>, saltando...");
    return;
  }

  // Add favicon if not present
  let favicon = doc.querySelector('link[rel="icon"]');
  if (!favicon) {
    favicon = doc.createElement("link");
    favicon.setAttribute("rel", "icon");
    favicon.setAttribute("href", "/favicon.ico");
    // Insert after title or at end of head
    const title = head.querySelector("title");
    if (title && title.nextSibling) {
      head.insertBefore(favicon, title.nextSibling);
    } else {
      head.appendChild(favicon);
    }
    console.log("  ✅ Favicon agregado");
  } else {
    console.log("  ✓  Favicon ya existe");
  }

  // Helper to add or update meta tag
  function addOrUpdateMeta(property, content, isProperty = false) {
    const selector = isProperty
      ? `meta[property="${property}"]`
      : `meta[name="${property}"]`;
    let meta = doc.querySelector(selector);

    if (!meta) {
      meta = doc.createElement("meta");
      if (isProperty) {
        meta.setAttribute("property", property);
      } else {
        meta.setAttribute("name", property);
      }
      head.appendChild(meta);
    }

    meta.setAttribute("content", content);
  }

  // Open Graph tags
  addOrUpdateMeta("og:type", "article", true);
  addOrUpdateMeta("og:url", pageUrl, true);
  addOrUpdateMeta("og:title", title, true);
  addOrUpdateMeta("og:description", existingDesc, true);
  addOrUpdateMeta("og:image", imageUrl, true);
  console.log("  ✅ Open Graph tags agregados/actualizados");

  // Twitter Card tags
  addOrUpdateMeta("twitter:card", "summary_large_image");
  addOrUpdateMeta("twitter:url", pageUrl);
  addOrUpdateMeta("twitter:title", title);
  addOrUpdateMeta("twitter:description", existingDesc);
  addOrUpdateMeta("twitter:image", imageUrl);
  console.log("  ✅ Twitter Card tags agregados/actualizados");

  // Save the file
  fs.writeFileSync(filePath, dom.serialize());
  console.log("  💾 Archivo guardado");
}

/**
 * Find all HTML files in a directory
 */
function findHTMLFiles(dir) {
  let results = [];

  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(findHTMLFiles(fullPath));
    } else if (item.endsWith(".html")) {
      results.push(fullPath);
    }
  }

  return results;
}

/**
 * Main execution
 */
async function main() {
  console.log("🚀 Actualizando meta tags en todos los archivos HTML...\n");
  console.log("=".repeat(70));

  const publicDir = path.join(__dirname, "public");

  // Find all HTML files
  const htmlFiles = findHTMLFiles(publicDir);
  console.log(`\n📊 Encontrados ${htmlFiles.length} archivos HTML\n`);

  // Update each file
  for (const file of htmlFiles) {
    try {
      updateHTMLFile(file);
    } catch (error) {
      console.error(`\n❌ Error procesando ${file}:`, error.message);
    }
  }

  console.log("\n" + "=".repeat(70));
  console.log(`\n✅ PROCESO COMPLETADO`);
  console.log(`📊 ${htmlFiles.length} archivos actualizados`);
  console.log("\n📝 Cambios realizados:");
  console.log("   • Favicon agregado: /favicon.ico");
  console.log("   • Open Graph tags (Facebook)");
  console.log("   • Twitter Card tags");
  console.log("\n🔍 Verifica los cambios con:");
  console.log("   git diff public/");
}

main().catch(console.error);
