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
  return `Eres un divulgador experto especializado en explicar temas complejos de forma clara y accesible para PÚBLICO GENERAL sin conocimientos técnicos previos.

Tu tarea es MEJORAR un artículo existente para hacerlo MÁS CONCISO, mejor documentado, más estructurado y más efectivo para usuarios finales.

AUDIENCIA: Personas comunes y corrientes que quieren entender el tema sin tener conocimientos previos.

PRINCIPIOS CLAVE:
1. **Idioma**: TODO en ESPAÑOL para Uruguay y Latinoamérica
2. **CONCISO Y DIRECTO**: Artículos de 1000-1500 palabras máximo - sin relleno
3. **Lenguaje Simple**: Explica como si hablaras con alguien sin formación técnica
4. **Estructura Clara**: 4-6 secciones H2 con 2-3 subsecciones H3 cada una
5. **Fuentes Actuales**: 5-8 fuentes confiables recientes (2024-2025)
6. **Ejemplos Cotidianos**: Analogías y casos reales que todos entiendan
7. **Contexto Local**: Enfoque en Uruguay/Latinoamérica cuando sea relevante
8. **Práctico y Útil**: Qué significa para el lector y qué puede hacer

ESTRUCTURA DEL ARTÍCULO MEJORADO:
- Introducción gancho (1 párrafo corto)
- ¿Por qué me debe importar? (H2 - 2-3 párrafos)
- MIT, Stanford, Harvard
- Universidades latinoamericanas reconocidas
- Revistas científicas peer-reviewed

**Datos y Estadísticas Oficiales:**
- Instituto Nacional de Estadística (INE - Uruguay)
- INDEC (Argentina)
- Pew Research Center
- Statista, Our World in Data
- Datos.gob.uy (datos abiertos Uruguay)

**Fact-Checkers y Verificación:**
- AFP Factual
- Chequeado (Argentina)
- Maldita.es (España)
- FactCheck.org, Snopes
- Observatorio de Noticias Falsas (Uruguay)

**Think Tanks y Análisis:**
- Brookings Institution
- Carnegie Endowment
- Freedom House
- Transparencia Internacional

MEJORAS A IMPLEMENTAR:

1. **Más Subtítulos y Estructura**:
   - 5-7 secciones principales (H2) mínimo
   - 3-4 subsecciones (H3) por cada H2
   - Total de 15-25 subtítulos en el artículo
   - Un nuevo subtítulo cada 2-3 párrafos

2. **Lenguaje Más Accesible**:
   - Eliminar jerga técnica innecesaria
   - Explicar conceptos complejos con analogías cotidianas
   - Usar "tú" o "vos" para conectar con el lector
   - Preguntas retóricas para mantener interés

3. **Más Fuentes Actuales**:
   - Al menos 10-15 fuentes mencionadas por nombre
   - Priorizar fuentes de 2024-2025
   - Incluir estudios, informes, artículos específicos
   - Contextualizar cada fuente brevemente

4. **Ejemplos y Casos Reales**:
   - Historias concretas de Uruguay/Latinoamérica
- Conceptos clave (H2 con 2-3 H3)
- Secciones principales (2-3 H2, cada una con 2-3 H3)
- Consejos prácticos (H2 con 2-3 H3)
- Conclusión práctica (H2 - OBLIGATORIA, 2-3 párrafos)

TONO: Conversacional, cercano pero informativo. Usa "tú" o "vos".

FUENTES CONFIABLES (2024-2025):
- Medios: MIT Tech Review, BBC Mundo, The Verge, El Observador, La Diaria
- Organizaciones: ONU, OMS, CEPAL, EFF, UNESCO, Banco Mundial
- Estudios: Nature, Science, Pew Research
- Fact-checkers: AFP Factual, Chequeado
- Datos oficiales: INE (Uruguay), Statista

FORMATO HTML:
- <h2> secciones principales (4-6)
- <h3> subsecciones (8-15 total)
- <p> párrafos cortos
- <ul>/<ol> para listas
- <blockquote> para datos clave
- <strong> para puntos críticos
- <a href="#"> para fuentes

⚠️ IMPORTANTE:
- MÁXIMO 1500 palabras - sé CONCISO
- Elimina relleno y repeticiones
- Cada párrafo debe aportar valor
- La CONCLUSIÓN es OBLIGATORIA (2-3 párrafos)
- El artículo DEBE terminar COMPLETO con punto final

TODO EN ESPAÑOL.
Enfoque Uruguay/Latinoamérica cuando sea relevante.

FORMATO: 
Retorna SOLO el contenido HTML del artículo (lo que va dentro de <div class="article-content">).
NO incluyas <!DOCTYPE>, <html>, <head>, <body>, ni navegación.
NO incluyas la imagen destacada.

Comienza con un párrafo gancho que enganche al lector.

COMIENZA EL ARTÍCULO MEJORADO AHORA:`;
}

/**
 * Create user prompt for improving content
 */
function createImprovementPrompt(originalTitle, originalContent) {
  return `Analiza y MEJORA este artículo para hacerlo MÁS CONCISO, CLARO y ACCESIBLE para público general:

TÍTULO ORIGINAL: ${originalTitle}

CONTENIDO ORIGINAL:
${originalContent}

Tu tarea:
1. ANALIZA el tema y identifica qué es esencial y qué es relleno
2. REESCRIBE completamente el artículo para:
   - REDUCIR a 1000-1500 palabras MÁXIMO (elimina relleno y repetición)
   - Usar LENGUAJE SIMPLE Y DIRECTO (sin jerga innecesaria)
   - Agregar subtítulos claros: 4-6 H2, cada uno con 2-3 H3
   - Explicar conceptos con ANALOGÍAS SIMPLES
   - Incluir EJEMPLOS BREVES de Uruguay/LATAM cuando sea relevante
   - Agregar CONSEJOS PRÁCTICOS concretos
   - Incorporar 5-8 FUENTES ACTUALES (2024-2025) mencionadas por nombre
   - Estructura visual: listas, blockquotes, negritas

REQUISITOS CRÍTICOS:

**Estructura Clara y Concisa:**
- 4-6 secciones principales (H2)
- 2-3 subsecciones (H3) por cada H2
- Un nuevo subtítulo cada 2-3 párrafos
- Total: 8-15 subtítulos en el artículo

**Lenguaje Accesible:**
- Explica de forma SIMPLE y DIRECTA
- Usa "tú" o "vos"
- Evita: jerga, tecnicismos innecesarios, relleno, repeticiones
- Prefiere: analogías breves, ejemplos concretos, lenguaje conversacional

**Fuentes Actuales (2024-2025):**
Incluir 5-8 fuentes mencionadas por nombre:
- Medios: MIT Tech Review, BBC Mundo, The Verge, El Observador, La Diaria
- Organizaciones: ONU, OMS, CEPAL, EFF, UNESCO
- Estudios: Nature, Science, Pew Research
- Fact-checkers: AFP Factual, Chequeado
- Datos oficiales: INE (Uruguay), Statista

**Contexto Local (cuando sea relevante):**
- Ejemplos breves de Uruguay/Argentina/Latinoamérica
- Datos estadísticos regionales actualizados
- Referencias a situaciones locales reconocibles

**Formato HTML Mejorado:**
- <h2> secciones principales (5-7)
- <h3> subsecciones frecuentes (15-25 total)
- <p> párrafos cortos (3-4 líneas)
- <ul>/<ol> para listas y pasos
- <blockquote> para datos clave o citas importantes
- <strong> para destacar puntos críticos
**Contenido Práctico:**
- Sección "¿Por qué me debe importar?" (2-3 párrafos)
- Sección "Consejos prácticos: Qué puedes hacer tú" (H2 con 2-3 H3)
- Conclusión obligatoria (H2 - 2-3 párrafos completos)

⚠️ CRÍTICO:
- MÁXIMO 1500 palabras - elimina TODO el relleno
- Artículo DEBE terminar COMPLETO con punto final
- Conclusión OBLIGATORIA con 2-3 párrafos
- NO dejes frases incompletas
- Cada párrafo debe aportar valor real

TODO EN ESPAÑOL. 
Enfoque Uruguay/Latinoamérica cuando sea relevante.
Prioriza CLARIDAD y BREVEDAD.

FORMATO: 
Retorna SOLO el contenido HTML del artículo (lo que va dentro de <div class="article-content">).
NO incluyas <!DOCTYPE>, <html>, <head>, <body>, ni navegación.
NO incluyas la imagen destacada.

Comienza con un párrafo gancho breve.

COMIENZA EL ARTÍCULO MEJORADO Y CONCISO AHORA:`;
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

    // Replace content in HTML (no backup - direct overwrite)
    console.log("\n� Actualizando archivo HTML...");
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
  "title": "Título CLARO, ATRACTIVO y ACCESIBLE para público general (50-90 caracteres)",
  "excerpt": "Resumen breve (150-200 caracteres) que enganche sin jerga técnica",
  "description": "Meta descripción SEO (140-160 caracteres, lenguaje simple)",
  "tags": ["etiqueta1", "etiqueta2", "etiqueta3"]
}

REGLAS PARA EL TÍTULO (ORIENTADO A PÚBLICO GENERAL):
- Usar LENGUAJE SIMPLE Y CLARO (sin tecnicismos innecesarios)
- Incluir BENEFICIO o RELEVANCIA ("Cómo...", "Por qué...", "Lo que debes saber...")
- Generar INTERÉS sin clickbait
- Ser ESPECÍFICO y DESCRIPTIVO
- 50-90 caracteres ideal
- TODO EN ESPAÑOL

EJEMPLOS DE BUENOS TÍTULOS:
❌ MAL (técnico): "Algoritmos de IA en Redes Sociales"
✅ BIEN (accesible): "Cómo las Redes Sociales Deciden Qué Ves (y Por Qué Importa)"

❌ MAL (genérico): "Problemas económicos"
✅ BIEN (específico): "7 Señales de Crisis Económica que Afectan tu Bolsillo"

❌ MAL (aburrido): "Información sobre privacidad"
✅ BIEN (interesante): "Tu Teléfono Te Espía: Cómo Proteger tu Privacidad en 2025"

Las etiquetas deben ser accesibles en español (tecnología, privacidad, consejos, seguridad online, vida cotidiana, Uruguay, Latinoamérica, etc.)

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
