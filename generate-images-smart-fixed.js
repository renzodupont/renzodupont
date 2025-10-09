/**
 * Smart Image Generation using Google GenAI with Imagen
 * - Auto-discovers posts from HTML files
 * - Generates numbered images (-1, -2, -3) for each post
 * - Only processes posts that don't have images
 * - Supports monthly filtering to avoid processing all posts
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
 * Generate an image using Google GenAI with Imagen
 */
async function generateImageWithGemini(prompt, outputPath) {
  try {
    console.log("🎨 Generating image with Google GenAI...");
    console.log("📝 Prompt:", prompt);

    const fullPrompt = `Professional, high-quality cover image for a political/social analysis article. Style: Modern, editorial, impactful, photorealistic. ${prompt}`;

    const response = await ai.models.generateImages({
      model: "imagen-3.0-generate-002",
      prompt: fullPrompt,
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
 * Extract post metadata from HTML content
 */
function extractPostMetadata(htmlContent, htmlPath) {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;

  // Get title from h1 or title tag
  let title =
    document.querySelector("h1")?.textContent ||
    document.querySelector("title")?.textContent ||
    "Untitled";

  // Get description from meta tag or first paragraph
  let description =
    document.querySelector('meta[name="description"]')?.content ||
    document.querySelector("p")?.textContent?.substring(0, 200) ||
    "";

  // Get date from HTML filename or meta tag
  let dateStr = "";
  const metaDate = document.querySelector('meta[name="date"]')?.content;
  if (metaDate) {
    dateStr = metaDate;
  } else {
    // Try to extract from content or use file stats
    const stats = fs.statSync(htmlPath);
    dateStr = stats.mtime.toISOString();
  }

  const date = new Date(dateStr);

  return {
    title: title.trim(),
    description: description.trim(),
    date: date,
    year: date.getFullYear(),
    month: date.getMonth() + 1, // JS months are 0-based
    filename: path.basename(htmlPath, ".html"),
  };
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
 * Generate image prompt from post content
 */
function generateImagePrompt(metadata) {
  const { title, description } = metadata;

  // Create a relevant visual prompt based on the content
  let prompt = `Cover image representing: ${title}. `;

  if (description) {
    // Extract key themes from description
    const themes = {
      economic: "economic policy, charts, financial data",
      social: "social justice, community, people",
      political: "government, democracy, political structures",
      environment: "nature, climate, environmental protection",
      technology: "digital technology, innovation, data",
      education: "education, learning, knowledge",
      health: "healthcare, public health, medical",
      justice: "justice system, law, legal concepts",
    };

    const lowercaseDesc = description.toLowerCase();
    let themePrompts = [];

    for (const [theme, visualPrompt] of Object.entries(themes)) {
      if (
        lowercaseDesc.includes(theme) ||
        lowercaseDesc.includes(theme.slice(0, -1))
      ) {
        themePrompts.push(visualPrompt);
      }
    }

    if (themePrompts.length > 0) {
      prompt += `Visual elements: ${themePrompts.join(", ")}. `;
    }
  }

  prompt +=
    "Professional, editorial style, high contrast, engaging composition.";

  return prompt;
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
 * Discover all HTML post files
 */
function discoverPosts() {
  const publicDir = path.join(__dirname, "public");
  const postsDir = path.join(publicDir, "posts");

  if (!fs.existsSync(postsDir)) {
    console.log("❌ Posts directory not found:", postsDir);
    return [];
  }

  const posts = [];

  // Check for posts in posts directory structure
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        // Recursively scan subdirectories
        scanDirectory(itemPath);
      } else if (item.endsWith(".html")) {
        posts.push(itemPath);
      }
    }
  }

  scanDirectory(postsDir);

  console.log(`📂 Found ${posts.length} HTML post files`);
  return posts;
}

/**
 * Filter posts by date (optional)
 */
function filterPostsByMonth(posts, targetYear, targetMonth) {
  if (!targetYear || !targetMonth) {
    return posts;
  }

  console.log(
    `🗓️  Filtering posts for ${targetYear}/${targetMonth
      .toString()
      .padStart(2, "0")}`
  );

  const filtered = posts.filter((postPath) => {
    try {
      const htmlContent = fs.readFileSync(postPath, "utf-8");
      const metadata = extractPostMetadata(htmlContent, postPath);

      return metadata.year === targetYear && metadata.month === targetMonth;
    } catch (error) {
      console.log(`⚠️  Could not read ${postPath}:`, error.message);
      return false;
    }
  });

  console.log(
    `📅 Found ${filtered.length} posts from ${targetYear}/${targetMonth
      .toString()
      .padStart(2, "0")}`
  );
  return filtered;
}

/**
 * Main image generation function
 */
async function generateImages(options = {}) {
  console.log("🚀 Starting Smart Image Generation\n");

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

  // Discover all posts
  let posts = discoverPosts();

  if (posts.length === 0) {
    console.log("❌ No posts found to process");
    return;
  }

  // Filter by month if specified
  if (options.year && options.month) {
    posts = filterPostsByMonth(posts, options.year, options.month);
  }

  // Process each post
  let processed = 0;
  let generated = 0;
  let skipped = 0;

  for (const postPath of posts) {
    try {
      console.log(`\n📄 Processing: ${path.basename(postPath)}`);

      // Check if post already has images (skip if it does)
      if (hasExistingImages(postPath)) {
        console.log("⏭️  Skipping - already has images");
        skipped++;
        continue;
      }

      // Read and parse post
      const htmlContent = fs.readFileSync(postPath, "utf-8");
      const metadata = extractPostMetadata(htmlContent, postPath);

      console.log(`📋 Title: ${metadata.title}`);
      console.log(`📅 Date: ${metadata.date.toISOString().split("T")[0]}`);

      // Generate image prompt
      const imagePrompt = generateImagePrompt(metadata);

      // Generate image filename
      const imageNumber = getNextImageNumber(postPath);
      const imageFilename = `${metadata.filename}-${imageNumber}.png`;
      const imagePath = path.join(path.dirname(postPath), imageFilename);

      // Generate image
      const success = await generateImageWithGemini(imagePrompt, imagePath);

      if (success) {
        console.log(`✅ Generated: ${imageFilename}`);
        generated++;
      } else {
        console.log(`❌ Failed to generate image for: ${metadata.filename}`);
      }

      processed++;

      // Add a small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Error processing ${postPath}:`, error.message);
    }
  }

  console.log("\n📊 Summary:");
  console.log(`📄 Posts processed: ${processed}`);
  console.log(`🎨 Images generated: ${generated}`);
  console.log(`⏭️  Posts skipped (already had images): ${skipped}`);
  console.log(`📁 Total posts found: ${posts.length}`);

  if (generated > 0) {
    console.log("\n🎉 Image generation complete!");
  } else {
    console.log(
      "\n💡 No new images were generated (all posts already have images)"
    );
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  // Check for command line arguments
  const args = process.argv.slice(2);
  const options = {};

  // Parse year/month filter: node generate-images-smart.js 2025 10
  if (args.length >= 2) {
    options.year = parseInt(args[0]);
    options.month = parseInt(args[1]);

    if (isNaN(options.year) || isNaN(options.month)) {
      console.log(
        "❌ Invalid year/month format. Use: node generate-images-smart.js 2025 10"
      );
      process.exit(1);
    }
  }

  generateImages(options).catch(console.error);
}

export { generateImages, generateImageWithGemini };
