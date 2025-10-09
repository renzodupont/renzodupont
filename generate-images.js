/**
 * Image Generation Script using Gemini API
 * Generates cover images for blog posts based on their titles and topics
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs").promises;
const path = require("path");
require("dotenv").config();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate an image using Gemini API
 * @param {string} prompt - The image generation prompt
 * @param {string} outputPath - Where to save the generated image
 * @returns {Promise<boolean>} - Success status
 */
async function generateImageWithGemini(prompt, outputPath) {
  try {
    console.log("🎨 Generating image with Gemini...");
    console.log("📝 Prompt:", prompt);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const result = await model.generateContent([
      {
        text: `Generate a professional, high-quality cover image for a political/social analysis article. Style: Modern, editorial, impactful. ${prompt}`,
      },
    ]);

    const response = await result.response;
    const image = response.candidates[0].content.parts[0];

    if (image.inlineData) {
      const imageBuffer = Buffer.from(image.inlineData.data, "base64");
      await fs.writeFile(outputPath, imageBuffer);
      console.log("✅ Image saved to:", outputPath);
      return true;
    }

    console.log("⚠️ No image data returned from Gemini");
    return false;
  } catch (error) {
    console.error("❌ Error generating image with Gemini:", error.message);
    return false;
  }
}

/**
 * Download image from Pexels as fallback
 * @param {string} query - Search query
 * @param {string} outputPath - Where to save the image
 * @returns {Promise<boolean>} - Success status
 */
async function downloadFromPexels(query, outputPath) {
  if (!process.env.PEXELS_API_KEY) {
    console.log("⚠️ No Pexels API key configured");
    return false;
  }

  try {
    console.log("🔄 Falling back to Pexels...");
    const fetch = (await import("node-fetch")).default;

    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        query
      )}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
      }
    );

    const data = await response.json();

    if (data.photos && data.photos.length > 0) {
      const imageUrl = data.photos[0].src.large2x;
      const imageResponse = await fetch(imageUrl);
      const buffer = await imageResponse.buffer();

      await fs.writeFile(outputPath, buffer);
      console.log("✅ Pexels image saved to:", outputPath);
      return true;
    }

    return false;
  } catch (error) {
    console.error("❌ Error downloading from Pexels:", error.message);
    return false;
  }
}

/**
 * Article configurations with titles and image prompts
 */
const articles = [
  {
    slug: "fake-news-dolar-argentina",
    title: "Fake News y Dólar en Argentina",
    prompt:
      "Dollar bills, economic crisis, fake news, media manipulation, Argentina flag colors",
  },
  {
    slug: "mitos-verdades-reforma-jubilatoria-uruguay",
    title: "Reforma Jubilatoria Uruguay",
    prompt:
      "Elderly people, social security, protest, Uruguay flag colors, justice",
  },
  {
    slug: "ahorro-inversion-publica-argentina",
    title: "Inversión Pública Argentina",
    prompt:
      "Public infrastructure, budget cuts, social impact, Argentina economy",
  },
  {
    slug: "lawfare-rio-plata",
    title: "Lawfare en Río de la Plata",
    prompt:
      "Justice scales, political persecution, legal system, corruption investigation",
  },
  {
    slug: "concentracion-mediatica-rio-plata",
    title: "Concentración Mediática",
    prompt:
      "Media monopoly, television towers, corporate control, freedom of press",
  },
  {
    slug: "privatizacion-educacion-publica",
    title: "Privatización de la Educación",
    prompt:
      "Public school, students, education crisis, privatization, social rights",
  },
  {
    slug: "flexibilizacion-laboral-derechos",
    title: "Flexibilización Laboral",
    prompt:
      "Workers rights, labor unions, precarious employment, social justice",
  },
  {
    slug: "deuda-externa-politicas-sociales",
    title: "Deuda Externa y Políticas Sociales",
    prompt:
      "IMF, external debt, social cuts, economic dependency, Latin America",
  },
  {
    slug: "criminalizacion-protesta-social",
    title: "Criminalización de la Protesta",
    path: "Peaceful protest, police repression, human rights, social movements",
  },
  {
    slug: "discurso-anti-derechos",
    title: "Discurso Anti-Derechos",
    prompt: "Human rights, conservative discourse, social regression, activism",
  },
  {
    slug: "desmantelamiento-tv-publica",
    title: "Desmantelamiento de TV Pública",
    prompt:
      "Public television, media cuts, cultural programming, state broadcasting",
  },
  {
    slug: "poder-big-tech-monopolios-digitales",
    title: "Poder de Big Tech",
    prompt: "Tech monopoly, digital platforms, data privacy, corporate power",
  },
  {
    slug: "uberizacion-trabajo-precarizacion",
    title: "Uberización del Trabajo",
    prompt:
      "Gig economy, delivery workers, labor precarity, platform capitalism",
  },
  {
    slug: "granjas-trolls-desinformacion-industria",
    title: "Granjas de Trolls",
    prompt:
      "Social media manipulation, troll farms, fake accounts, disinformation",
  },
  {
    slug: "inseguridad-alimentaria-argentina",
    title: "Inseguridad Alimentaria",
    prompt: "Food poverty, hunger, social crisis, food distribution, Argentina",
  },
  {
    slug: "seguridad-populismo-punitivo-uruguay",
    title: "Populismo Punitivo en Uruguay",
    prompt:
      "Criminal justice, punitive policies, mass incarceration, security discourse",
  },
  {
    slug: "contaminacion-agua-agronegocio-uruguay",
    title: "Contaminación del Agua en Uruguay",
    prompt:
      "Water pollution, agribusiness, environmental damage, Uruguay rivers",
  },
  {
    slug: "justicia-climatica-sur-global",
    title: "Justicia Climática",
    prompt:
      "Climate justice, global south, environmental activism, climate change",
  },
  {
    slug: "amenaza-mapuche-uruguay",
    title: "La Falsa Amenaza Mapuche",
    prompt:
      "Indigenous rights, Mapuche people, false narratives, territorial rights",
  },
  {
    slug: "big-pharma-ganancias-vs-vidas",
    title: "Big Pharma: Ganancias vs Vidas",
    prompt:
      "Pharmaceutical industry, medicine access, public health, corporate profits",
  },
];

/**
 * Main function to generate all images
 */
async function generateAllImages() {
  console.log("🚀 Starting image generation process...\n");

  // Ensure images directory exists
  const imagesDir = path.join(__dirname, "public", "images");
  try {
    await fs.mkdir(imagesDir, { recursive: true });
    console.log("📁 Images directory ready:", imagesDir, "\n");
  } catch (error) {
    console.error("❌ Error creating images directory:", error.message);
    return;
  }

  let successCount = 0;
  let failCount = 0;

  for (const article of articles) {
    console.log(`\n${"=".repeat(60)}`);
    console.log(`📰 Processing: ${article.title}`);
    console.log(`${"=".repeat(60)}`);

    const outputPath = path.join(imagesDir, `${article.slug}.jpg`);

    // Check if image already exists
    try {
      await fs.access(outputPath);
      console.log("⏭️  Image already exists, skipping...");
      successCount++;
      continue;
    } catch {
      // Image doesn't exist, proceed with generation
    }

    // Try Gemini first
    let success = await generateImageWithGemini(article.prompt, outputPath);

    // Fallback to Pexels if Gemini fails
    if (!success) {
      success = await downloadFromPexels(article.title, outputPath);
    }

    if (success) {
      successCount++;
    } else {
      failCount++;
      console.log("❌ Failed to generate/download image");
    }

    // Rate limiting - wait between requests
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log("📊 SUMMARY");
  console.log(`${"=".repeat(60)}`);
  console.log(`✅ Success: ${successCount}/${articles.length}`);
  console.log(`❌ Failed: ${failCount}/${articles.length}`);
  console.log(`\n✨ Images saved in: ${imagesDir}`);
}

/**
 * Generate a single image for a new article
 * @param {string} slug - Article slug
 * @param {string} title - Article title
 * @param {string} prompt - Image generation prompt
 */
async function generateSingleImage(slug, title, prompt) {
  const imagesDir = path.join(__dirname, "public", "images");
  await fs.mkdir(imagesDir, { recursive: true });

  const outputPath = path.join(imagesDir, `${slug}.jpg`);

  console.log(`\n🎨 Generating image for: ${title}`);

  let success = await generateImageWithGemini(prompt, outputPath);

  if (!success) {
    success = await downloadFromPexels(title, outputPath);
  }

  if (success) {
    console.log(`✅ Image generated successfully!`);
    console.log(`📁 Path: ${outputPath}`);
    console.log(
      `\n💡 Use in HTML: <img src="/images/${slug}.jpg" alt="${title}" />`
    );
  } else {
    console.log(`❌ Failed to generate image`);
  }
}

// CLI handling
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    // Generate all images
    generateAllImages().catch(console.error);
  } else if (args.length === 3) {
    // Generate single image: node generate-images.js <slug> <title> <prompt>
    const [slug, title, prompt] = args;
    generateSingleImage(slug, title, prompt).catch(console.error);
  } else {
    console.log(`
Usage:
  Generate all images:
    node generate-images.js

  Generate single image:
    node generate-images.js <slug> <title> <prompt>

Example:
    node generate-images.js "new-article" "Article Title" "visual description for image"
    `);
  }
}

module.exports = { generateImageWithGemini, generateSingleImage };
