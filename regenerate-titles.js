/**
 * Regenerate Strong Titles for All Posts
 *
 * Analyzes existing posts and generates more catchy, attention-grabbing titles
 * while keeping them informative (not clickbait).
 *
 * Usage:
 *   node regenerate-titles.js                    # Regenerate all posts
 *   node regenerate-titles.js path/to/post.html  # Single post
 *   node regenerate-titles.js --dry-run          # Preview without changes
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "node:fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { JSDOM } from "jsdom";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ANSI colors
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
};

/**
 * Find all HTML posts recursively
 */
function findAllPosts(dir = "public/posts") {
  const posts = [];

  function traverse(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".html")) {
        posts.push(fullPath);
      }
    }
  }

  traverse(dir);
  return posts;
}

/**
 * Extract article content and current title from HTML
 */
function extractArticleInfo(htmlPath) {
  const html = fs.readFileSync(htmlPath, "utf-8");
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const currentTitle = doc.querySelector("h1")?.textContent || "Sin título";
  const metaDesc = doc.querySelector('meta[name="description"]')?.content || "";
  const pageTitle = doc.querySelector("title")?.textContent || "";

  // Extract main content
  const articleContent =
    doc.querySelector(".article-content")?.textContent ||
    doc.querySelector("article")?.textContent ||
    "";

  return {
    currentTitle,
    metaDesc,
    pageTitle,
    articleContent: articleContent.substring(0, 2000), // First 2000 chars
    html,
  };
}

/**
 * Generate a strong, catchy title using AI
 */
async function generateStrongTitle(articleInfo) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Analiza este artículo en español y genera un TÍTULO MÁS FUERTE Y ATRACTIVO.

TÍTULO ACTUAL: "${articleInfo.currentTitle}"

CONTENIDO DEL ARTÍCULO (extracto):
${articleInfo.articleContent}

TAREA: Genera un título que sea:

1. **INFORMATIVO pero MUY ATRACTIVO** (no clickbait pero casi)
2. **USA PALABRAS DE PODER**:
   - Revelado, Verdad, Oculto, Descubierto, Expuesto
   - Impacto, Crisis, Amenaza, Peligro, Urgente
   - Millones, Cifras concretas, Años específicos
   - Cómo, Por qué, Qué hay detrás
   
3. **SER ESPECÍFICO**: 
   - Incluir cifras cuando sea relevante ("2 Millones", "50%", "2025")
   - Mencionar lugares concretos (Uruguay, Argentina, Río de la Plata)
   - Usar ejemplos específicos

4. **GENERAR CURIOSIDAD o URGENCIA** sin mentir ni exagerar

5. **60-100 caracteres ideal** para SEO

6. **TODO EN ESPAÑOL** (español uruguayo/rioplatense)

EJEMPLOS DE TRANSFORMACIÓN:

❌ ANTES: "La privatización de la educación pública"
✅ DESPUÉS: "Educación Pública en Peligro: El Plan Oculto de Privatización en Uruguay"

❌ ANTES: "Flexibilización laboral en Uruguay y Argentina"
✅ DESPUÉS: "Flexibilización Laboral: Cómo 2 Millones de Trabajadores Pierden sus Derechos"

❌ ANTES: "Desinformación sobre el dólar"
✅ DESPUÉS: "Fake News del Dólar: Cómo los Medios Crean Crisis Artificiales en Argentina"

❌ ANTES: "Criminalización de la protesta social"
✅ DESPUÉS: "Criminalización de la Protesta: La Nueva Táctica para Silenciar al Pueblo"

❌ ANTES: "Contaminación del agua por agronegocio"
✅ DESPUÉS: "Agua Contaminada: El Precio Oculto del Agronegocio en Uruguay"

Retorna SOLO un objeto JSON con esta estructura:
{
  "newTitle": "El nuevo título fuerte y atractivo",
  "reason": "Breve explicación de por qué este título es mejor (1-2 líneas)"
}

Retorna SOLO JSON válido, sin markdown ni explicaciones adicionales.`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  // Extract JSON
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("No se pudo extraer JSON de la respuesta");
  }

  return JSON.parse(jsonMatch[0]);
}

/**
 * Update title in HTML file
 */
function updateTitleInHTML(htmlPath, oldTitle, newTitle, dryRun = false) {
  const html = fs.readFileSync(htmlPath, "utf-8");
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // Update <h1> title
  const h1 = doc.querySelector("h1");
  if (h1) {
    h1.textContent = newTitle;
  }

  // Update <title> tag
  const titleTag = doc.querySelector("title");
  if (titleTag) {
    const oldPageTitle = titleTag.textContent;
    // Replace the main part but keep " | Renzo Dupont"
    titleTag.textContent = `${newTitle} | Renzo Dupont`;
  }

  // Update meta description (keep or enhance)
  const metaDesc = doc.querySelector('meta[name="description"]');
  if (metaDesc && metaDesc.content.includes(oldTitle)) {
    // Update if old title was in description
    metaDesc.content = metaDesc.content.replace(oldTitle, newTitle);
  }

  if (!dryRun) {
    // Create backup
    const backupPath = htmlPath.replace(".html", ".backup.html");
    fs.copyFileSync(htmlPath, backupPath);

    // Write updated HTML
    fs.writeFileSync(htmlPath, dom.serialize(), "utf-8");
    return backupPath;
  }

  return null;
}

/**
 * Regenerate single post title
 */
async function regeneratePostTitle(htmlPath, dryRun = false) {
  console.log(
    `\n${colors.cyan}📄 Processing:${colors.reset} ${path.basename(htmlPath)}`
  );

  try {
    // Extract current info
    const articleInfo = extractArticleInfo(htmlPath);
    console.log(
      `   ${colors.yellow}Old title:${colors.reset} ${articleInfo.currentTitle}`
    );

    // Generate new title
    console.log(
      `   ${colors.blue}🤖 Generating stronger title...${colors.reset}`
    );
    const titleData = await generateStrongTitle(articleInfo);

    console.log(
      `   ${colors.green}✨ New title:${colors.reset} ${titleData.newTitle}`
    );
    console.log(
      `   ${colors.magenta}💡 Why:${colors.reset} ${titleData.reason}`
    );

    if (dryRun) {
      console.log(
        `   ${colors.yellow}⚠️  DRY RUN - No changes made${colors.reset}`
      );
      return { success: true, dryRun: true };
    }

    // Update HTML
    const backupPath = updateTitleInHTML(
      htmlPath,
      articleInfo.currentTitle,
      titleData.newTitle,
      dryRun
    );

    console.log(`   ${colors.green}✅ Updated successfully${colors.reset}`);
    console.log(
      `   ${colors.blue}💾 Backup:${colors.reset} ${path.basename(backupPath)}`
    );

    return {
      success: true,
      oldTitle: articleInfo.currentTitle,
      newTitle: titleData.newTitle,
      reason: titleData.reason,
      backupPath,
    };
  } catch (error) {
    console.log(`   ${colors.red}❌ Error: ${error.message}${colors.reset}`);
    return { success: false, error: error.message };
  }
}

/**
 * Regenerate all post titles
 */
async function regenerateAllTitles(dryRun = false) {
  console.log(
    `\n${colors.blue}═══════════════════════════════════════════════${colors.reset}`
  );
  console.log(
    `${colors.blue}  📝 REGENERATE ALL POST TITLES ${
      dryRun ? "(DRY RUN)" : ""
    }${colors.reset}`
  );
  console.log(
    `${colors.blue}═══════════════════════════════════════════════${colors.reset}\n`
  );

  const posts = findAllPosts();
  console.log(
    `${colors.cyan}Found ${posts.length} posts to process${colors.reset}\n`
  );

  if (dryRun) {
    console.log(
      `${colors.yellow}⚠️  DRY RUN MODE - No files will be modified${colors.reset}\n`
    );
  }

  const results = {
    total: posts.length,
    success: 0,
    failed: 0,
    changes: [],
  };

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    console.log(`\n${colors.blue}[${i + 1}/${posts.length}]${colors.reset}`);

    const result = await regeneratePostTitle(post, dryRun);

    if (result.success) {
      results.success++;
      if (!dryRun) {
        results.changes.push({
          file: post,
          oldTitle: result.oldTitle,
          newTitle: result.newTitle,
          reason: result.reason,
        });
      }
    } else {
      results.failed++;
    }

    // Rate limiting: wait 3 seconds between posts
    if (i < posts.length - 1) {
      console.log(`\n${colors.yellow}⏳ Waiting 3 seconds...${colors.reset}`);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  // Final summary
  console.log(
    `\n${colors.blue}═══════════════════════════════════════════════${colors.reset}`
  );
  console.log(`${colors.blue}  📊 SUMMARY${colors.reset}`);
  console.log(
    `${colors.blue}═══════════════════════════════════════════════${colors.reset}\n`
  );

  console.log(`${colors.cyan}Total posts:${colors.reset} ${results.total}`);
  console.log(`${colors.green}✅ Success:${colors.reset} ${results.success}`);
  console.log(`${colors.red}❌ Failed:${colors.reset} ${results.failed}`);

  if (!dryRun && results.changes.length > 0) {
    console.log(`\n${colors.green}📝 TITLES UPDATED:${colors.reset}\n`);
    results.changes.forEach((change, idx) => {
      console.log(
        `${idx + 1}. ${colors.yellow}${change.oldTitle}${colors.reset}`
      );
      console.log(`   → ${colors.green}${change.newTitle}${colors.reset}`);
      console.log(`   ${colors.magenta}${change.reason}${colors.reset}\n`);
    });

    console.log(
      `${colors.blue}💡 Tip: Backups saved as .backup.html files${colors.reset}`
    );
  }

  if (dryRun) {
    console.log(
      `\n${colors.yellow}⚠️  This was a dry run. Run without --dry-run to apply changes.${colors.reset}`
    );
  }

  return results;
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const specificFile = args.find((arg) => arg.endsWith(".html"));

  if (!process.env.GEMINI_API_KEY) {
    console.error(
      `${colors.red}❌ Error: GEMINI_API_KEY not found in .env${colors.reset}`
    );
    console.log(
      `\nGet your free API key at: ${colors.blue}https://aistudio.google.com/app/apikey${colors.reset}`
    );
    process.exit(1);
  }

  try {
    if (specificFile) {
      // Single file
      await regeneratePostTitle(specificFile, dryRun);
    } else {
      // All files
      await regenerateAllTitles(dryRun);
    }

    console.log(`\n${colors.green}✅ Done!${colors.reset}\n`);
  } catch (error) {
    console.error(
      `\n${colors.red}❌ Fatal error: ${error.message}${colors.reset}`
    );
    process.exit(1);
  }
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
