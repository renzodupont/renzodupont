/**
 * Regenerate/Improve Existing Post
 *
 * Analyzes an existing post and rewrites it to be more resourceful and persuasive
 * with updated information, better sources, and stronger argumentation.
 *
 * Usage:
 *   node regenerate-post.js "path/to/post.html"
 *   node regenerate-post.js "public/posts/2025/10/crisis-economica.html"
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

/**
 * Extract article content from HTML file
 */
function extractArticleContent(htmlPath) {
  if (!fs.existsSync(htmlPath)) {
    throw new Error(`File not found: ${htmlPath}`);
  }

  const html = fs.readFileSync(htmlPath, "utf-8");
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // Extract title
  const title = doc.querySelector("h1")?.textContent || "Sin título";

  // Extract article content
  const articleContent =
    doc.querySelector(".article-content")?.innerHTML ||
    doc.querySelector("article")?.innerHTML ||
    "";

  // Extract metadata
  const metaDesc = doc.querySelector('meta[name="description"]')?.content || "";
  const date = doc.querySelector('meta[name="date"]')?.content || "";

  return {
    title,
    articleContent,
    metaDesc,
    date,
    fullHTML: html,
  };
}

/**
 * Create system prompt for regeneration
 */
function createRegenerationSystemPrompt() {
  return `Eres un periodista investigativo experto especializado en combatir la desinformación en Uruguay y Argentina.

Tu tarea es MEJORAR un artículo existente para que sea más persuasivo, mejor documentado, y más efectivo en combatir la desinformación.

PRINCIPIOS CLAVE:
1. **Idioma**: TODO el contenido debe estar en ESPAÑOL para el mercado uruguayo
2. **Fuentes**: Incluir tantas fuentes confiables como sea posible, priorizando las MÁS RECIENTES (2024-2025)
3. **Persuasión**: Argumentación sólida con evidencia verificable
4. **Contexto Local**: Enfoque en Uruguay, con referencias a Argentina cuando sea relevante
5. **Actualidad**: Incorporar datos y acontecimientos recientes

FUENTES CONFIABLES A PRIORIZAR (2024-2025):
- Organismos internacionales: ONU, OMS, CEPAL, Banco Mundial, FMI
- Medios verificables: El Observador, La Diaria, El País (Uruguay), Búsqueda
- Instituciones académicas: Universidad de la República (UdelaR), UDELAR
- ONGs: Amnistía Internacional, Human Rights Watch
- Organismos oficiales: INE (Instituto Nacional de Estadística), BCU (Banco Central)
- Investigaciones periodísticas reconocidas

MEJORAS A IMPLEMENTAR:
1. **Más datos recientes**: Estadísticas de 2024-2025
2. **Más fuentes citadas**: Al menos 5-8 fuentes confiables con nombres específicos
3. **Mejor estructura**: Secciones claras con argumentación progresiva
4. **Ejemplos concretos**: Casos específicos de Uruguay/Argentina
5. **Enlaces**: Mencionar fuentes específicas que los lectores puedan verificar
6. **Citas**: Incluir declaraciones de expertos o funcionarios (reales si es posible)
7. **Contexto histórico**: Conectar con eventos previos relevantes
8. **Impacto social**: Explicar las consecuencias para la población

ESTRUCTURA HTML:
- Usa <h2> para secciones principales
- Usa <h3> para subsecciones
- Usa <p> para párrafos
- Usa <ul> y <li> para listas
- Usa <blockquote> para citas importantes
- Usa <strong> para énfasis
- Usa <a href="#"> para mencionar fuentes (con nombre de la fuente)

El artículo mejorado debe ser más convincente, mejor documentado, y más útil para combatir la desinformación.`;
}

/**
 * Create user prompt for improving content
 */
function createImprovementPrompt(originalTitle, originalContent) {
  return `Analiza y MEJORA este artículo existente:

TÍTULO ORIGINAL: ${originalTitle}

CONTENIDO ORIGINAL:
${originalContent}

Tu tarea:
1. ANALIZA el tema del artículo
2. IDENTIFICA qué aspectos necesitan más documentación
3. REESCRIBE el artículo completo para que sea:
   - Más persuasivo con argumentación sólida
   - Mejor documentado con fuentes recientes (2024-2025)
   - Más específico para el contexto uruguayo
   - Más efectivo en combatir la desinformación
   - Más rico en datos, estadísticas y ejemplos concretos

REQUISITOS CRÍTICOS:
- TODO en ESPAÑOL
- Priorizar fuentes recientes (2024-2025)
- Incluir al menos 5-8 fuentes confiables mencionadas por nombre
- Enfoque en Uruguay (Argentina como contexto cuando sea relevante)
- Mantener el tema original pero con información actualizada y ampliada
- Incluir datos estadísticos específicos
- Mencionar organismos, estudios o informes específicos

FORMATO: 
Retorna SOLO el contenido HTML del artículo (lo que va dentro de <div class="article-content">).
NO incluyas <!DOCTYPE>, <html>, <head>, <body>, ni elementos de navegación.
NO incluyas la imagen destacada - eso se agrega automáticamente.

Comienza con un párrafo de apertura impactante, luego usa H2 para secciones principales.

COMIENZA EL ARTÍCULO MEJORADO AHORA:`;
}

/**
 * Regenerate article content
 */
async function regenerateArticle(htmlPath) {
  console.log("\n" + "═".repeat(70));
  console.log("🔄 REGENERACIÓN DE ARTÍCULO");
  console.log("═".repeat(70));

  // Extract existing content
  console.log("\n📖 Leyendo artículo existente...");
  const existing = extractArticleContent(htmlPath);
  console.log(`✅ Título: ${existing.title}`);
  console.log(`✅ Contenido: ${existing.articleContent.length} caracteres\n`);

  // Generate improved content
  console.log("🤖 Generando versión mejorada con Gemini 1.5 Pro...");
  console.log("   → Analizando tema y contexto");
  console.log("   → Buscando información actualizada");
  console.log("   → Mejorando argumentación y fuentes\n");

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: createRegenerationSystemPrompt(),
  });

  const prompt = createImprovementPrompt(
    existing.title,
    existing.articleContent
  );

  try {
    const result = await model.generateContent(prompt);
    const improvedContent = result.response.text();

    console.log(
      `✅ Contenido mejorado generado: ${improvedContent.length} caracteres`
    );

    // Generate new metadata
    console.log("\n📝 Generando metadatos actualizados...");
    const metadata = await generateMetadata(improvedContent, existing.title);
    console.log(`✅ Título optimizado: ${metadata.title}`);

    // Create backup
    const backupPath = htmlPath.replace(".html", ".backup.html");
    fs.copyFileSync(htmlPath, backupPath);
    console.log(`\n💾 Backup creado: ${backupPath}`);

    // Replace content in HTML
    const dom = new JSDOM(existing.fullHTML);
    const doc = dom.window.document;

    // Update title
    const h1 = doc.querySelector("h1");
    if (h1) h1.textContent = metadata.title;

    const titleTag = doc.querySelector("title");
    if (titleTag) titleTag.textContent = `${metadata.title} | Renzo Dupont`;

    // Update meta description
    const metaDesc = doc.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = metadata.description;

    // Update article content
    const articleContentDiv = doc.querySelector(".article-content");
    if (articleContentDiv) {
      articleContentDiv.innerHTML = improvedContent;
    }

    // Update date
    const metaDate = doc.querySelector('meta[name="date"]');
    if (metaDate) metaDate.content = new Date().toISOString();

    const dateDisplay = doc.querySelector(".article-meta");
    if (dateDisplay) {
      dateDisplay.textContent = `Actualizado el ${new Date().toLocaleDateString(
        "es-ES",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      )}`;
    }

    // Save updated file
    fs.writeFileSync(htmlPath, dom.serialize());
    console.log(`\n✅ Artículo actualizado: ${htmlPath}`);

    // Update posts database
    await updatePostInDatabase(htmlPath, metadata);

    console.log("\n" + "═".repeat(70));
    console.log("✅ REGENERACIÓN COMPLETADA");
    console.log("═".repeat(70));
    console.log(`\n📄 Archivo actualizado: ${htmlPath}`);
    console.log(`💾 Backup disponible: ${backupPath}`);
    console.log(
      `\n📝 Próximos pasos:\n   1. Revisa el artículo mejorado\n   2. git add ${htmlPath}\n   3. git commit -m "Mejorar: ${metadata.title}"\n   4. git push origin main\n`
    );

    return {
      success: true,
      filePath: htmlPath,
      backupPath,
      metadata,
    };
  } catch (error) {
    console.error("\n❌ Error al regenerar artículo:", error.message);
    throw error;
  }
}

/**
 * Generate metadata from content
 */
async function generateMetadata(htmlContent, originalTitle) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Analiza este artículo en español y genera metadatos en formato JSON:

Artículo:
${htmlContent.substring(0, 3000)}...

Retorna un objeto JSON con:
{
  "title": "Título SEO-optimizado (60-100 caracteres, en español)",
  "excerpt": "Resumen breve (150-200 caracteres) que capte la atención",
  "description": "Meta descripción para SEO (140-160 caracteres, en español)",
  "tags": ["etiqueta1", "etiqueta2", "etiqueta3"]
}

Las etiquetas deben ser palabras clave relevantes en español (economía, política, uruguay, argentina, derechos, etc.)

Retorna SOLO JSON válido, nada más.`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("No se pudo extraer JSON de la respuesta");
  }

  return JSON.parse(jsonMatch[0]);
}

/**
 * Update post in database
 */
async function updatePostInDatabase(htmlPath, metadata) {
  const dbPath = path.join(__dirname, "posts-database.json");

  if (!fs.existsSync(dbPath)) {
    console.log("⚠️  posts-database.json no encontrado");
    return;
  }

  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

  // Find post by path
  const relativePath = htmlPath.replace(/^.*\/public/, "");
  const postIndex = db.posts.findIndex((p) => p.link === relativePath);

  if (postIndex >= 0) {
    // Update existing post
    db.posts[postIndex].title = metadata.title;
    db.posts[postIndex].excerpt = metadata.excerpt;
    db.posts[postIndex].tags = metadata.tags;
    db.posts[postIndex].date = new Date().toISOString();

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    console.log("✅ Base de datos actualizada");
  } else {
    console.log("⚠️  Post no encontrado en la base de datos");
  }
}

/**
 * Find all HTML posts in the public/posts directory
 */
function findAllPosts() {
  const postsDir = path.join(__dirname, "public", "posts");
  const posts = [];

  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.endsWith(".html") && !item.endsWith(".backup.html")) {
        posts.push(fullPath);
      }
    }
  }

  scanDirectory(postsDir);
  return posts;
}

/**
 * Regenerate all posts
 */
async function regenerateAllPosts() {
  console.log("\n" + "═".repeat(70));
  console.log("🔄 REGENERACIÓN MASIVA DE ARTÍCULOS");
  console.log("═".repeat(70));

  const posts = findAllPosts();

  if (posts.length === 0) {
    console.log("\n⚠️  No se encontraron posts en public/posts/");
    return;
  }

  console.log(`\n📚 Se encontraron ${posts.length} artículos para regenerar\n`);

  const results = {
    successful: [],
    failed: [],
    skipped: [],
  };

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const relativePath = post.replace(__dirname + "/", "");

    console.log(`\n[$${i + 1}/${posts.length}] Procesando: ${relativePath}`);
    console.log("-".repeat(70));

    try {
      await regenerateArticle(post);
      results.successful.push(relativePath);
      console.log(`✅ Completado: ${relativePath}`);

      // Small delay between posts to avoid rate limiting
      if (i < posts.length - 1) {
        console.log("\n⏳ Esperando 5 segundos antes del siguiente...");
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    } catch (error) {
      console.error(`\n❌ Error en ${relativePath}: ${error.message}`);
      results.failed.push({ path: relativePath, error: error.message });
    }
  }

  // Final summary
  console.log("\n" + "═".repeat(70));
  console.log("📊 RESUMEN DE REGENERACIÓN");
  console.log("═".repeat(70));
  console.log(`\n✅ Exitosos: ${results.successful.length}`);
  console.log(`❌ Fallidos: ${results.failed.length}`);
  console.log(`⏭️  Omitidos: ${results.skipped.length}`);
  console.log(`📝 Total: ${posts.length}`);

  if (results.successful.length > 0) {
    console.log("\n✅ Artículos regenerados exitosamente:");
    results.successful.forEach((path) => console.log(`   - ${path}`));
  }

  if (results.failed.length > 0) {
    console.log("\n❌ Artículos con errores:");
    results.failed.forEach((item) =>
      console.log(`   - ${item.path}: ${item.error}`)
    );
  }

  console.log("\n" + "═".repeat(70));
  console.log(
    `\n📝 Próximos pasos:\n   1. Revisa los artículos regenerados\n   2. git add .\n   3. git commit -m "Regenerate all posts with updated sources"\n   4. git push origin main\n`
  );

  return results;
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(`
╔═══════════════════════════════════════════════════════════════════════╗
║              🔄 REGENERADOR DE ARTÍCULOS                              ║
║       Mejora artículos existentes con fuentes actualizadas           ║
╚═══════════════════════════════════════════════════════════════════════╝

Uso:
  node regenerate-post.js <ruta-al-archivo-html>
  node regenerate-post.js --all

Ejemplos:
  # Mejorar un artículo específico
  node regenerate-post.js "public/posts/2025/10/crisis-economica.html"

  # Mejorar TODOS los artículos
  node regenerate-post.js --all
  npm run regenerate-post --all

Características:
  ✅ Reescribe el artículo con más fuentes confiables
  ✅ Prioriza información reciente (2024-2025)
  ✅ Todo en español para mercado uruguayo
  ✅ Argumentación más persuasiva
  ✅ Crea backup automático del original
  ✅ Actualiza la base de datos

Modo --all:
  ⚡ Procesa todos los posts en public/posts/
  🔄 Espera 5 segundos entre posts (evitar rate limiting)
  💾 Crea backup de cada archivo
  📊 Muestra resumen final

Requisitos:
  • GEMINI_API_KEY en archivo .env

Obtén la clave: https://aistudio.google.com/app/apikey
`);
    process.exit(0);
  }

  // Check for API key
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ Error: GEMINI_API_KEY no encontrada en archivo .env");
    console.error("\n📝 Agrega a .env: GEMINI_API_KEY=tu_clave_aqui");
    console.error("   Obtén clave: https://aistudio.google.com/app/apikey");
    process.exit(1);
  }

  // Check for --all flag
  if (args.includes("--all")) {
    try {
      await regenerateAllPosts();
      process.exit(0);
    } catch (error) {
      console.error("\n❌ Error en regeneración masiva:", error.message);
      process.exit(1);
    }
  }

  const filePath = args[0];

  // Resolve path
  const fullPath = path.isAbsolute(filePath)
    ? filePath
    : path.join(__dirname, filePath);

  try {
    await regenerateArticle(fullPath);
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
}

main();
