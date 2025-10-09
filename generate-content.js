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
  return `Eres un experto en tecnología y desarrollo de software, especializado en crear contenido técnico de alta calidad en español.

IDIOMA: TODO el contenido debe estar en ESPAÑOL para el mercado uruguayo y hispanohablante.

Tu misión es escribir artículos técnicos rigurosos, tutoriales y análisis sobre tecnología, desarrollo web, programación y tendencias del sector tech.

PRINCIPIOS DE ESCRITURA:
1. **Técnicamente Preciso**: Cada concepto técnico debe ser correcto y verificable
2. **Explicaciones Claras**: Conceptos complejos explicados de forma comprensible sin perder rigor
3. **Ejemplos Prácticos**: Incluir código, casos de uso reales y aplicaciones prácticas
4. **Estructura Lógica**: Progresión clara desde conceptos básicos a avanzados
5. **Referencias**: Citar documentación oficial, estudios y fuentes técnicas confiables
6. **Contexto Regional**: Incluir perspectiva local de Uruguay y Latinoamérica cuando sea relevante
7. **Orientado a la Práctica**: Ayudar a los lectores a aplicar lo aprendido

ESTRUCTURA DEL ARTÍCULO QUE DEBES SEGUIR:
- Introducción clara que explique el problema o concepto
- Contexto y por qué es importante
- Explicación técnica detallada con 3-5 subsecciones
- Ejemplos de código cuando sea aplicable (con syntax highlighting)
- Mejores prácticas y consideraciones
- Conclusión con takeaways prácticos
- Recursos adicionales y referencias

TONO: Profesional, técnico pero accesible, didáctico. Evitar jerga innecesaria pero usar terminología técnica correcta cuando sea apropiado.

FUENTES A REFERENCIAR (priorizando las MÁS RECIENTES 2024-2025):
- Documentación oficial de tecnologías (MDN, React Docs, Node.js, Python.org)
- Stack Overflow, GitHub discussions
- Blogs técnicos reconocidos (CSS-Tricks, Smashing Magazine, Dev.to)
- Estudios de rendimiento y benchmarks
- Conferencias y papers técnicos (Google I/O, JSConf, PyCon)
- Proyectos open source relevantes

ENFOQUE GEOGRÁFICO:
- Principal: Comunidad hispanohablante (Uruguay, Argentina, España, LATAM)
- Incluir perspectiva local cuando sea relevante (mercado laboral, oportunidades, comunidades)
- Usar ejemplos y casos de uso aplicables regionalmente

CANTIDAD DE FUENTES: Incluir al menos 5-8 referencias técnicas confiables.

Tu salida debe ser un artículo HTML COMPLETO listo para publicar, TODO EN ESPAÑOL.`;
}

/**
 * Create the user prompt for a specific topic
 */
function createUserPrompt(topic, additionalContext = "") {
  return `Escribe un artículo técnico completo sobre: "${topic}"

${additionalContext ? `Contexto adicional: ${additionalContext}\n` : ""}

El artículo debe:
- Estar en ESPAÑOL (español de Uruguay/región)
- Tener 1500-2500 palabras
- Incluir explicaciones técnicas precisas y ejemplos de código cuando sea relevante
- Tener títulos de sección claros (H2, H3)
- Referenciar tecnologías actuales, frameworks y herramientas modernas (2024-2025)
- Incluir ejemplos prácticos y casos de uso
- Sugerir recursos y documentación oficial que los lectores puedan consultar
- Incluir al menos 5-8 referencias técnicas confiables
- Usar listas, bloques de código (<pre><code>) y formato para legibilidad
- Citar documentación oficial, estudios de rendimiento, benchmarks cuando sea posible
- Incluir información actualizada de 2024-2025

FUENTES PRIORITARIAS (usar las más recientes):
- Documentación oficial (MDN, React, Vue, Angular, Node.js, Python, etc.)
- GitHub, Stack Overflow
- Blogs técnicos reconocidos (CSS-Tricks, Smashing Magazine, Dev.to, Medium)
- Estudios de caso y benchmarks
- Conferencias técnicas (Google I/O, JSConf, React Summit, PyCon)

PERSPECTIVA LOCAL:
- Cuando sea relevante, mencionar el mercado tech en Uruguay y Latinoamérica
- Oportunidades laborales, comunidades locales, recursos en español

CRÍTICO: Retorna SOLO el contenido HTML del cuerpo del artículo (el contenido que va dentro de <div class="article-content">). 
NO incluyas <!DOCTYPE html>, <html>, <head>, <body>, ni elementos de navegación.
NO incluyas la etiqueta de imagen destacada - eso se agrega automáticamente.
TODO EN ESPAÑOL.

Comienza con un párrafo de apertura, luego usa H2 para secciones principales, H3 para subsecciones, e incluye:
- <p> para párrafos
- <ul> y <li> para listas
- <pre><code> para bloques de código (con lenguaje especificado)
- <blockquote> para citas importantes
- <strong> y <em> para énfasis
- <a href="#"> para enlaces (usa # si no tienes URLs reales, pero menciona el nombre de la fuente)

COMIENZA EL ARTÍCULO AHORA:`;
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
  "title": "Título FUERTE y ATRACTIVO (en español)",
  "excerpt": "Resumen breve (150-200 caracteres) que atraiga lectores",
  "description": "Meta descripción para SEO (140-160 caracteres, en español)",
  "tags": ["etiqueta1", "etiqueta2", "etiqueta3"],
  "imagePrompt": "Prompt detallado para generar imagen de portada (descriptivo, específico, adecuado para Imagen)"
}

REGLAS PARA EL TÍTULO (MUY IMPORTANTE):
- Debe ser INFORMATIVO y ATRACTIVO para contenido técnico
- Usar PALABRAS TÉCNICAS RELEVANTES pero accesibles
- Ser ESPECÍFICO: incluir tecnologías, versiones, conceptos clave cuando sea relevante
- Generar INTERÉS sin exagerar
- 60-100 caracteres ideal para SEO
- TODO EN ESPAÑOL

EJEMPLOS DE TÍTULOS BUENOS (sigue este estilo):
❌ MAL: "Cómo usar React"
✅ BIEN: "React 18: Guía Completa de Hooks y Server Components en 2025"

❌ MAL: "Optimización de rendimiento web"
✅ BIEN: "Acelera tu Web: 10 Técnicas de Optimización que Reducen el Tiempo de Carga"

❌ MAL: "Introducción a Python"
✅ BIEN: "Python para Desarrollo Web: FastAPI vs Django en Proyectos Modernos"

Las etiquetas deben ser palabras clave técnicas relevantes en español (javascript, react, python, desarrollo web, programación, tutorial, etc.)
El prompt de imagen debe describir una imagen técnica moderna que capture la esencia del artículo (código, interfaces, diagramas técnicos).

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
