/**
 * Simplified Image Generation using XML Configuration
 * - Uses simplified prompts to prevent Imagen-4 from adding text
 * - Reads prompt  console.log('🚀 St    console.log('❌ No posts found in JSON database');rting Simplified Image Generation (JSON-based)\n'); from XML configuration file
 * - Avoids complex descriptions that trigger text generation
 */

import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import path from "path";
import { JSDOM } from "jsdom";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Google GenAI
const ai = new GoogleGenAI({});

/**
 * Parse JSON database file
 */
function parsePostsConfig() {
  try {
    const jsonPath = path.join(__dirname, "posts-database.json");
    const jsonContent = fs.readFileSync(jsonPath, "utf-8");
    const data = JSON.parse(jsonContent);

    const posts = data.posts.map((post) => ({
      title: post.title,
      link: post.link,
      prompt: post.imagePrompt,
      id: post.id,
    }));

    console.log(
      `📋 Loaded ${posts.length} post configurations from JSON database`
    );
    return posts;
  } catch (error) {
    console.error("❌ Error parsing posts-database.json:", error.message);
    return [];
  }
}

/**
 * Generate image with simplified prompt (prevents text generation)
 */
async function generateImageSimple(simplePrompt, outputPath) {
  try {
    console.log("🎨 Generating image with simplified prompt...");
    console.log("📝 Simple prompt:", simplePrompt);

    // Ultra-simple prompt - no mention of blogs, articles, or complex descriptions
    const finalPrompt = `${simplePrompt}, photorealistic, high quality`;

    const response = await ai.models.generateImages({
      model: "imagen-4.0-generate-preview-06-06",
      prompt: finalPrompt,
      config: {
        numberOfImages: 1,
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const generatedImage = response.generatedImages[0];
      let imgBytes = generatedImage.image.imageBytes;
      const buffer = Buffer.from(imgBytes, "base64");

      fs.writeFileSync(outputPath, buffer);
      console.log("✅ Image saved to:", outputPath);
      return true;
    } else {
      console.log("❌ No images generated");
      return false;
    }
  } catch (error) {
    console.error("❌ Image generation failed:", error.message);
    return false;
  }
}

/**
 * Check if a post already has images
 */
function hasExistingImages(postPath) {
  const dir = path.dirname(postPath);
  const filename = path.basename(postPath, ".html");

  // Check for images like: filename-1.png, filename-2.jpg, etc.
  const files = fs.readdirSync(dir);
  const imagePattern = new RegExp(
    `^${filename}-(\\d+)\\.(jpg|jpeg|png|webp)$`,
    "i"
  );

  const existingImages = files.filter((file) => imagePattern.test(file));

  if (existingImages.length > 0) {
    console.log(
      `📸 Found ${existingImages.length} existing images: ${existingImages.join(
        ", "
      )}`
    );
    return true;
  }

  return false;
}

/**
 * Get next image number for a post
 */
function getNextImageNumber(postPath) {
  const dir = path.dirname(postPath);
  const filename = path.basename(postPath, ".html");

  const files = fs.readdirSync(dir);
  const imagePattern = new RegExp(
    `^${filename}-(\\d+)\\.(jpg|jpeg|png|webp)$`,
    "i"
  );

  let maxNumber = 0;

  for (const file of files) {
    const match = file.match(imagePattern);
    if (match) {
      const number = parseInt(match[1]);
      maxNumber = Math.max(maxNumber, number);
    }
  }

  return maxNumber + 1;
}

/**
 * Main simplified image generation function
 */
async function generateImagesFromXML(options = {}) {
  console.log("🚀 Starting Simplified Image Generation (XML-based)\n");

  if (
    !process.env.GEMINI_API_KEY ||
    process.env.GEMINI_API_KEY === "your_gemini_api_key_here"
  ) {
    console.error("❌ ERROR: No API key found!");
    console.log("\n📝 Steps to fix:");
    console.log("1. Copy .env.example to .env");
    console.log(
      "2. Get your FREE API key: https://aistudio.google.com/app/apikey"
    );
    console.log("3. Edit .env and add your API key");
    return;
  }

  // Load posts configuration from XML
  const posts = parsePostsConfig();

  if (posts.length === 0) {
    console.log("❌ No posts found in XML configuration");
    return;
  }

  // Process each post from XML config
  let processed = 0;
  let generated = 0;
  let skipped = 0;

  for (const post of posts) {
    try {
      const postPath = path.join(__dirname, post.link);
      const filename = path.basename(postPath, ".html");

      console.log(`\n📄 Processing: ${filename}`);
      console.log(`📋 Title: ${post.title}`);

      // Check if post file exists
      if (!fs.existsSync(postPath)) {
        console.log(`⚠️  Post file not found: ${postPath}`);
        continue;
      }

      // Check if post already has images (skip if it does)
      if (hasExistingImages(postPath)) {
        console.log("⏭️  Skipping - already has images");
        skipped++;
        continue;
      }

      // Generate image filename
      const imageNumber = getNextImageNumber(postPath);
      const imageFilename = `${filename}-${imageNumber}.png`;
      const imagePath = path.join(path.dirname(postPath), imageFilename);

      // Generate image with simplified prompt
      const success = await generateImageSimple(post.prompt, imagePath);

      if (success) {
        console.log(`✅ Generated: ${imageFilename}`);
        generated++;
      } else {
        console.log(`❌ Failed to generate image for: ${filename}`);
      }

      processed++;

      // Add a small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Error processing ${post.title}:`, error.message);
    }
  }

  console.log("\n📊 Summary:");
  console.log(`📄 Posts processed: ${processed}`);
  console.log(`🎨 Images generated: ${generated}`);
  console.log(`⏭️  Posts skipped (already had images): ${skipped}`);
  console.log(`📋 Total posts in JSON: ${posts.length}`);

  if (generated > 0) {
    console.log("\n🎉 Simplified image generation complete!");
    console.log("💡 Using simplified prompts to prevent text generation");
  } else {
    console.log(
      "\n💡 No new images were generated (all posts already have images)"
    );
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateImagesFromXML().catch(console.error);
}

export { generateImagesFromXML, generateImageSimple };
