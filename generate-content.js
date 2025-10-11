/**
 * Automated Content Generation with Gemini API
 *
 * This script uses Gemini 1.5 Pro to generate complete, well-researched HTML posts
 * with citations, resources, and structured content for combating misinformation.
 *
 * Usage:
 *   node generate-content.js "Topic or headline"
 *   node generate-content.js --interactive
 *   node generate-content.js --batch topics.json
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "node:fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate a slug from a title
 */
function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with dashes
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
}

/**
 * Get current date/time for post
 */
function getCurrentDateTime() {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: String(now.getMonth() + 1).padStart(2, "0"),
    day: String(now.getDate()).padStart(2, "0"),
    isoDate: now.toISOString(),
    displayDate: now.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}

/**
 * Create the system prompt for Gemini
 */
function createSystemPrompt() {
  return `Eres un divulgador experto en tecnología, especializado en explicar temas complejos de forma clara y accesible para PERSONAS SIN CONOCIMIENTOS TÉCNICOS.

AUDIENCIA OBJETIVO: Usuarios finales, público general hispanohablante que quiere entender tecnología sin tener formación técnica previa.

IDIOMA: TODO el contenido debe estar en ESPAÑOL para Uruguay y Latinoamérica.

Tu misión es crear contenido que cualquier persona pueda entender, sin importar su nivel de conocimiento técnico previo.

PRINCIPIOS DE ESCRITURA PARA PÚBLICO GENERAL:
1. **Lenguaje Simple y Claro**: Explica como si hablaras con tu abuela o un amigo sin conocimientos técnicos
2. **Sin Jerga Innecesaria**: Evita términos técnicos complejos; si los usas, explícalos con ejemplos cotidianos
3. **Analogías y Ejemplos Cotidianos**: Usa comparaciones con situaciones de la vida diaria que todos entiendan
4. **Visual y Estructurado**: Muchos subtítulos, listas, puntos clave destacados para facilitar la lectura
5. **Práctico y Útil**: Enfócate en qué significa esto para el lector, cómo le afecta, qué puede hacer
6. **Historias y Casos Reales**: Usa ejemplos concretos, casos de personas reales, situaciones reconocibles
7. **Paso a Paso**: Cuando expliques procesos, hazlo de forma gradual y progresiva

ESTRUCTURA DEL ARTÍCULO (MUY IMPORTANTE - MUCHOS SUBTÍTULOS):
- Introducción gancho: Una pregunta o situación que enganche al lector
- ¿Por qué me debe importar esto?: Relevancia personal y práctica
- Los conceptos básicos explicados simple: Fundamentos con analogías
- Desglose en subtemas (MÍNIMO 5-7 secciones H2 con varios H3 cada una):
  * Cada 2-3 párrafos debe haber un nuevo subtítulo (H3)
  * Subtítulos descriptivos y atractivos
  * Puntos clave destacados en listas
- Ejemplos prácticos y casos reales de Uruguay/Latinoamérica
- Consejos prácticos: Qué puede hacer el lector con esta información
- Conclusión práctica: Takeaways claros y accionables
- Recursos adicionales: Dónde aprender más (lenguaje accesible)

TONO: Conversacional, amigable, cercano pero informativo. Como un buen profesor que explica algo complejo de forma simple. Usa "tú" o "vos" para conectar con el lector.

FUENTES ACTUALIZADAS Y VERIFICABLES (2024-2025):
**Tecnología y Ciencia:**
- MIT Technology Review (español)
- The Verge, Wired, Ars Technica (artículos traducibles)
- Nature, Science (estudios recientes)
- Informes de empresas tech: Meta, Google, Microsoft, Apple
- Electronic Frontier Foundation (EFF)

**Medios Latinoamericanos Confiables:**
- El Observador (Uruguay), La Diaria (Uruguay), El País (Uruguay)
- La Nación (Argentina), Clarín (Argentina), Infobae
- BBC Mundo, El País (España)
- Búsqueda (Uruguay - análisis económico)

**Organizaciones Internacionales:**
- ONU, OMS, UNICEF, UNESCO
- CEPAL, Banco Mundial, FMI (para temas económicos)
- Amnistía Internacional, Human Rights Watch

**Instituciones Académicas:**
- Universidad de la República (UdelaR - Uruguay)
- MIT, Stanford, universidades reconocidas
- Estudios peer-reviewed de revistas científicas

**Datos y Estadísticas:**
- Instituto Nacional de Estadística (INE - Uruguay)
- Pew Research Center
- Statista, Our World in Data
- Informes gubernamentales oficiales

**Fact-Checkers y Verificación:**
- AFP Factual, Chequeado (Argentina)
- Observatorio de Noticias Falsas (Uruguay)
- FactCheck.org, Snopes

ENFOQUE GEOGRÁFICO:
- Contextualizar para Uruguay y Latinoamérica
- Usar ejemplos locales que resuenen con la audiencia
- Mencionar impacto regional cuando sea relevante
- Referencias a situaciones y problemas locales

CANTIDAD DE FUENTES: Incluir al menos 8-12 referencias de fuentes confiables recientes (2024-2025), mencionadas por nombre con contexto.

Tu salida debe ser un artículo HTML COMPLETO listo para publicar, TODO EN ESPAÑOL.`;
}

/**
 * Create the user prompt for a specific topic
 */
function createUserPrompt(topic, additionalContext = "") {
  return `Escribe un artículo completo y accesible para PÚBLICO GENERAL sobre: "${topic}"

${additionalContext ? `Contexto adicional: ${additionalContext}\n` : ""}

AUDIENCIA: Personas sin conocimientos técnicos previos. Explica todo de forma simple y clara.

REQUISITOS DEL ARTÍCULO:
- ESPAÑOL (Uruguay/Latinoamérica)
- 2000-3000 palabras
- LENGUAJE SIMPLE Y ACCESIBLE (sin jerga técnica compleja)
- MUCHOS SUBTÍTULOS: Mínimo 5-7 secciones principales (H2) con 3-4 subsecciones (H3) cada una
- Un nuevo subtítulo cada 2-3 párrafos para facilitar la lectura
- Explicar conceptos complejos con ANALOGÍAS y EJEMPLOS COTIDIANOS
- Usar HISTORIAS y CASOS REALES de Uruguay/Latinoamérica
- Incluir CONSEJOS PRÁCTICOS que el lector pueda aplicar
- Al menos 8-12 referencias de fuentes confiables actuales (2024-2025)
- Listas numeradas y con viñetas para mayor claridad
- Destacar puntos clave con <strong>

ESTRUCTURA OBLIGATORIA CON MUCHOS SUBTÍTULOS:

1. INTRODUCCIÓN GANCHO (1-2 párrafos)
   - Empieza con una pregunta o situación cotidiana
   - Conecta con la vida del lector

2. ¿POR QUÉ ME DEBE IMPORTAR? (H2)
   - Explica la relevancia personal
   - Impacto en la vida diaria
   
3. LOS BÁSICOS EXPLICADOS SIMPLE (H2)
   - H3: Primer concepto fundamental con analogía
   - H3: Segundo concepto con ejemplo cotidiano
   - H3: Tercer concepto con historia real

4. SECCIONES PRINCIPALES (3-5 H2, cada una con 3-4 H3)
   - H2: Título descriptivo y atractivo
     * H3: Subtema 1 (cada 2-3 párrafos)
     * H3: Subtema 2
     * H3: Subtema 3
     * H3: Ejemplo práctico o caso real
   
5. CASOS REALES DE URUGUAY/LATAM (H2)
   - H3: Caso 1 con nombres y contexto
   - H3: Caso 2 verificable
   - H3: Lecciones aprendidas

6. CONSEJOS PRÁCTICOS (H2)
   - H3: Qué puedes hacer tú
   - H3: Cómo protegerte/aprovechar esta info
   - H3: Recursos útiles en español

7. CONCLUSIÓN PRÁCTICA
   - Resumen de takeaways clave
   - Llamado a la acción

FUENTES PRIORITARIAS ACTUALES (2024-2025):
**Menciona por nombre y con contexto al menos 8-12 fuentes de:**
- Medios verificables: MIT Technology Review, BBC Mundo, The Verge, Wired
- Medios locales: El Observador, La Diaria, El País (Uruguay), La Nación (Argentina)
- Organizaciones: ONU, OMS, CEPAL, Banco Mundial, EFF, UNESCO
- Estudios: Nature, Science, Pew Research Center, Our World in Data
- Instituciones: UdelaR (Uruguay), universidades reconocidas
- Fact-checkers: AFP Factual, Chequeado (Argentina)
- Empresas tech: Informes oficiales de Google, Meta, Microsoft, Apple
- Datos oficiales: INE (Uruguay), Statista

IMPORTANTE - ESTILO DE ESCRITURA:
- Usa "tú" o "vos" para conectar con el lector
- Pregunta retóricas para mantener interés
- Ejemplos como: "Imagina que...", "Piensa en cuando...", "Es como si..."
- Cuenta historias: "En 2024, en Montevideo, una persona..."
- Evita: "El paradigma del framework", "Implementación de algoritmos", "Arquitectura distribuida"
- Prefiere: "Cómo funciona", "Lo que significa para ti", "Un ejemplo simple"

CRÍTICO: Retorna SOLO el contenido HTML del cuerpo del artículo (el contenido que va dentro de <div class="article-content">). 
NO incluyas <!DOCTYPE html>, <html>, <head>, <body>, ni elementos de navegación.
NO incluyas la etiqueta de imagen destacada - eso se agrega automáticamente.
TODO EN ESPAÑOL.

FORMATO HTML:
- <h2> para secciones principales (5-7 mínimo)
- <h3> para subsecciones (cada 2-3 párrafos, 15-25 en total)
- <p> para párrafos cortos (3-4 líneas máximo)
- <ul> y <li> para listas
- <ol> y <li> para pasos numerados
- <blockquote> para citas importantes o datos clave
- <strong> para destacar puntos importantes
- <em> para énfasis
- <a href="#"> para mencionar fuentes (incluye nombre de la fuente)

COMIENZA EL ARTÍCULO AHORA CON EL PRIMER PÁRRAFO GANCHO:`;
}

/**
 * Generate article metadata (title, excerpt, tags) from the HTML content
 */
async function generateMetadata(htmlContent, topic) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Analiza este artículo en español y proporciona metadatos en formato JSON:

Contenido del artículo:
${htmlContent.substring(0, 3000)}...

Retorna un objeto JSON con:
{
  "title": "Título FUERTE, ATRACTIVO y ACCESIBLE (en español)",
  "excerpt": "Resumen breve (150-200 caracteres) que enganche a lectores no técnicos",
  "description": "Meta descripción SEO (140-160 caracteres, lenguaje simple)",
  "tags": ["etiqueta1", "etiqueta2", "etiqueta3"],
  "imagePrompt": "Prompt detallado para imagen de portada (descriptivo, moderno, visual)"
}

REGLAS PARA EL TÍTULO (MUY IMPORTANTE - PARA PÚBLICO GENERAL):
- Debe ser CLARO y ATRACTIVO para personas sin conocimientos técnicos
- Usar LENGUAJE ACCESIBLE pero interesante
- Incluir BENEFICIO o RELEVANCIA para el lector ("Cómo...", "Por qué...", "Lo que debes saber...")
- Generar CURIOSIDAD sin clickbait
- Ser ESPECÍFICO y DESCRIPTIVO
- 50-90 caracteres ideal para SEO
- TODO EN ESPAÑOL

EJEMPLOS DE TÍTULOS BUENOS para PÚBLICO GENERAL (sigue este estilo):
❌ MAL (técnico): "React 18: Server Components y Suspense"
✅ BIEN (accesible): "Cómo Funcionan las Apps Web Modernas: Guía Simple para Entender React"

❌ MAL (genérico): "Seguridad en línea"
✅ BIEN (específico): "5 Señales de Phishing que Pueden Salvarte de un Robo Online"

❌ MAL (aburrido): "Introducción a la IA"
✅ BIEN (interesante): "Inteligencia Artificial Explicada: Lo Que Realmente Hace y Cómo Te Afecta"

❌ MAL (técnico): "Optimización de algoritmos de ML"
✅ BIEN (accesible): "Por Qué Tu Celular Entiende lo Que Dices: IA en la Vida Cotidiana"

❌ MAL (vago): "Tecnología moderna"
✅ BIEN (específico): "Tecnología 2025: 7 Cambios que Transformarán tu Vida Este Año"

REGLAS ADICIONALES:
- Prefiere números cuando sea relevante ("5 formas", "7 consejos")
- Incluye beneficio o consecuencia ("Cómo protegerte", "Lo que debes saber", "Qué significa para ti")
- Usa verbos activos y directos
- Evita jerga técnica en el título
- Conecta con experiencias cotidianas

Las etiquetas deben ser palabras clave accesibles en español (tecnología, seguridad online, privacidad, inteligencia artificial, redes sociales, consejos prácticos, etc.)

El prompt de imagen debe describir una imagen moderna, visual y atractiva que represente el tema de forma comprensible (personas usando tecnología, conceptos visuales, gráficos explicativos, no código técnico).

Retorna SOLO JSON válido, nada más.`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  // Extract JSON from response (might have markdown code blocks)
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("No se pudo extraer JSON de metadatos de la respuesta");
  }

  return JSON.parse(jsonMatch[0]);
}

/**
 * Generate the complete HTML file
 */
function generateHTMLFile(metadata, articleContent, slug, dateInfo) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${metadata.description}">
  <meta name="date" content="${dateInfo.isoDate}">
  <title>${metadata.title} | Renzo Dupont</title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <header>
    <div class="container">
      <div class="header-content">
        <a href="/" class="logo">Renzo Dupont</a>
        
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
        
        <!-- MOBILE MENU TOGGLE -->
        <button class="mobile-menu-toggle" aria-label="Menú">
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/quienes-somos.html">Sobre Mí</a></li>
            <li><a href="/contacto.html">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>

  <article class="article-page">
    <div class="container-narrow">
      <header class="article-header">
        <h1>${metadata.title}</h1>
        <p class="article-meta">Publicado el ${dateInfo.displayDate}</p>
      </header>

      <img 
        src="./${slug}-1.png" 
        alt="Imagen destacada: ${metadata.title}" 
        class="article-featured-image"
      >

      <div class="article-content">
        ${articleContent}
      </div>

      <footer class="article-footer">
        <div class="share-buttons">
          <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(
            metadata.title
          )}&url=${encodeURIComponent(
    "https://renzodupont.com/posts/" +
      dateInfo.year +
      "/" +
      dateInfo.month +
      "/" +
      slug +
      ".html"
  )}" target="_blank" rel="noopener" class="share-button twitter">Compartir en Twitter</a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            "https://renzodupont.com/posts/" +
              dateInfo.year +
              "/" +
              dateInfo.month +
              "/" +
              slug +
              ".html"
          )}" target="_blank" rel="noopener" class="share-button facebook">Compartir en Facebook</a>
        </div>
      </footer>
    </div>
  </article>

  <footer>
    <div class="container">
      <p>&copy; 2025 Renzo Dupont. Tecnología en español.</p>
    </div>
  </footer>
  
  <script src="/js/search.js"></script>
  <script src="/js/mobile-menu.js"></script>
</body>
</html>`;
}

/**
 * Main content generation function
 */
async function generatePost(topic, additionalContext = "") {
  console.log("\n🎯 Starting Content Generation Pipeline");
  console.log("==========================================\n");

  console.log(`📝 Topic: ${topic}`);
  if (additionalContext) {
    console.log(`📋 Context: ${additionalContext}`);
  }

  try {
    // Step 1: Generate article content
    console.log("\n🤖 Step 1: Generating article with Gemini 2.5 Flash...");
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      },
    });

    const systemPrompt = createSystemPrompt();
    const userPrompt = createUserPrompt(topic, additionalContext);

    const result = await model.generateContent([
      { text: systemPrompt },
      { text: userPrompt },
    ]);

    const articleContent = result.response.text();
    console.log("✅ Article generated successfully");
    console.log(`   Length: ${articleContent.length} characters`);

    // Step 2: Generate metadata
    console.log("\n🏷️  Step 2: Generating metadata...");
    const metadata = await generateMetadata(articleContent, topic);
    console.log("✅ Metadata generated:");
    console.log(`   Title: ${metadata.title}`);
    console.log(`   Tags: ${metadata.tags.join(", ")}`);

    // Step 3: Create file structure
    const dateInfo = getCurrentDateTime();
    const slug = slugify(metadata.title);
    const outputDir = path.join(
      __dirname,
      "public",
      "posts",
      dateInfo.year.toString(),
      dateInfo.month
    );
    const outputPath = path.join(outputDir, `${slug}.html`);

    console.log("\n📁 Step 3: Creating file structure...");
    console.log(`   Directory: ${outputDir}`);
    console.log(`   Filename: ${slug}.html`);

    // Create directory if it doesn't exist
    fs.mkdirSync(outputDir, { recursive: true });

    // Generate complete HTML
    const fullHTML = generateHTMLFile(metadata, articleContent, slug, dateInfo);

    // Save HTML file
    fs.writeFileSync(outputPath, fullHTML, "utf-8");
    console.log("✅ HTML file saved");

    // Step 4: Return metadata for database update
    const postData = {
      id: slug,
      title: metadata.title,
      excerpt: metadata.excerpt,
      link: `public/posts/${dateInfo.year}/${dateInfo.month}/${slug}.html`,
      imagePrompt: metadata.imagePrompt,
      date: dateInfo.isoDate,
      featured: false, // Can be manually set to true later
      tags: metadata.tags,
    };

    console.log("\n✅ Content generation complete!");
    console.log("==========================================");
    console.log(`\n📄 HTML file: ${outputPath}`);
    console.log(`\n📊 Post data to add to database:`);
    console.log(JSON.stringify(postData, null, 2));

    return {
      success: true,
      htmlPath: outputPath,
      slug: slug,
      postData: postData,
      metadata: metadata,
    };
  } catch (error) {
    console.error("\n❌ Error generating content:", error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Interactive mode
 */
async function interactiveMode() {
  const readline = await import("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (prompt) => {
    return new Promise((resolve) => {
      rl.question(prompt, resolve);
    });
  };

  console.log("\n🎨 Interactive Content Generation Mode");
  console.log("=====================================\n");

  const topic = await question("What topic would you like to write about?\n> ");
  const context = await question(
    "\nAny additional context? (press Enter to skip)\n> "
  );

  rl.close();

  return await generatePost(topic, context);
}

/**
 * Batch mode - generate multiple posts from JSON file
 */
async function batchMode(filePath) {
  console.log(`\n📦 Batch Mode: Processing ${filePath}`);
  console.log("=====================================\n");

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const topics = Array.isArray(data) ? data : data.topics;

  const results = [];

  for (let i = 0; i < topics.length; i++) {
    const item = topics[i];
    const topic = typeof item === "string" ? item : item.topic;
    const context = typeof item === "object" ? item.context : "";

    console.log(`\n[${i + 1}/${topics.length}] Processing: ${topic}`);

    const result = await generatePost(topic, context);
    results.push(result);

    // Wait a bit between requests to avoid rate limiting
    if (i < topics.length - 1) {
      console.log("\n⏳ Waiting 5 seconds before next generation...");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  console.log("\n\n📊 Batch Generation Summary");
  console.log("============================");
  console.log(`Total: ${results.length}`);
  console.log(`Success: ${results.filter((r) => r.success).length}`);
  console.log(`Failed: ${results.filter((r) => !r.success).length}`);

  return results;
}

/**
 * Main CLI handler
 */
async function main() {
  const args = process.argv.slice(2);

  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ Error: GEMINI_API_KEY not found in .env file");
    console.error(
      "\n📝 Get your API key at: https://aistudio.google.com/app/apikey"
    );
    process.exit(1);
  }

  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    console.log(`
🎯 Automated Content Generation with Gemini API

Usage:
  node generate-content.js "Topic or headline"
  node generate-content.js --interactive
  node generate-content.js --batch topics.json

Examples:
  node generate-content.js "La privatización de YPF y sus consecuencias"
  node generate-content.js --interactive
  node generate-content.js --batch my-topics.json

Options:
  --interactive, -i    Interactive mode with prompts
  --batch <file>       Process multiple topics from JSON file
  --help, -h          Show this help message

Batch JSON format:
  ["topic 1", "topic 2", ...]
  or
  {
    "topics": [
      {"topic": "...", "context": "..."},
      {"topic": "...", "context": "..."}
    ]
  }
`);
    process.exit(0);
  }

  if (args[0] === "--interactive" || args[0] === "-i") {
    const result = await interactiveMode();
    process.exit(result.success ? 0 : 1);
  } else if (args[0] === "--batch") {
    if (!args[1]) {
      console.error("❌ Error: --batch requires a file path");
      process.exit(1);
    }
    const results = await batchMode(args[1]);
    const allSuccess = results.every((r) => r.success);
    process.exit(allSuccess ? 0 : 1);
  } else {
    // Single topic mode
    const topic = args.join(" ");
    const result = await generatePost(topic);
    process.exit(result.success ? 0 : 1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generatePost, generateMetadata };
