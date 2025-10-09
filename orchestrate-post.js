/**
 * Complete Post Creation Pipeline
 *
 * Orchestrates the full workflow:
 * 1. Generate content with Gemini API
 * 2. Generate cover image with Imagen API
 * 3. Update posts-database.json
 *
 * Deployment is handled via GitHub Actions (.github/workflows/deploy.yml)
 * Just commit and push your changes to deploy.
 *
 * Usage:
 *   node orchestrate-post.js "Topic or headline"
 *   node orchestrate-post.js "Topic" --no-image
 *   node orchestrate-post.js "Topic" --featured
 */

import { generatePost } from "./generate-content.js";
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Google GenAI for image generation
const ai = new GoogleGenAI({});

/**
 * Generate cover image for the post
 */
async function generateCoverImage(imagePrompt, outputPath, postTitle) {
  console.log("\n🎨 Generating cover image with Imagen...");

  try {
    const fullPrompt = `Professional, high-quality editorial cover image for a political/social analysis article. Style: Modern, photorealistic, impactful, suitable for journalism. NO TEXT OR LETTERS in the image. ${imagePrompt}`;

    console.log("📝 Image prompt:", fullPrompt.substring(0, 150) + "...");

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
      console.log("✅ Cover image saved:", outputPath);
      return true;
    } else {
      console.log("❌ No images generated");
      return false;
    }
  } catch (error) {
    console.error("❌ Image generation failed:", error.message);
    console.error("   Continuing without image...");
    return false;
  }
}

/**
 * Update posts-database.json with the new post
 */
function updatePostsDatabase(postData, featured = false) {
  console.log("\n📊 Updating posts database...");

  const dbPath = path.join(__dirname, "posts-database.json");

  try {
    // Read existing database
    const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    // Check if post already exists
    const existingIndex = db.posts.findIndex((p) => p.id === postData.id);

    if (existingIndex !== -1) {
      console.log("⚠️  Post already exists, updating...");
      db.posts[existingIndex] = { ...postData, featured };
    } else {
      // Add new post at the beginning (most recent first)
      db.posts.unshift({ ...postData, featured });
      console.log("✅ New post added to database");
    }

    // Save updated database
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
    console.log(`✅ Database updated: ${db.posts.length} total posts`);

    return true;
  } catch (error) {
    console.error("❌ Failed to update database:", error.message);
    return false;
  }
}

/**
 * Update posts-config.xml with the new post
 */
function updatePostsConfigXML(postData) {
  console.log("\n📋 Updating posts-config.xml...");

  const xmlPath = path.join(__dirname, "posts-config.xml");

  try {
    // Read existing XML
    let xmlContent = fs.readFileSync(xmlPath, "utf-8");

    // Create new post entry
    const newPostXML = `
  <post>
    <title>${postData.title}</title>
    <link>${postData.link}</link>
    <prompt>${
      postData.imagePrompt || "Editorial image related to the article topic"
    }</prompt>
  </post>`;

    // Find the closing </posts> tag and insert before it
    const closingTag = "</posts>";
    const insertPosition = xmlContent.lastIndexOf(closingTag);

    if (insertPosition === -1) {
      console.error("❌ Could not find closing </posts> tag in XML");
      return false;
    }

    // Insert new post before closing tag
    xmlContent =
      xmlContent.slice(0, insertPosition) +
      newPostXML +
      "\n  " +
      xmlContent.slice(insertPosition);

    // Save updated XML
    fs.writeFileSync(xmlPath, xmlContent, "utf-8");
    console.log("✅ posts-config.xml updated");

    return true;
  } catch (error) {
    console.error("❌ Failed to update posts-config.xml:", error.message);
    return false;
  }
}

/**
 * Create a summary report
 */
function createSummary(results) {
  const {
    contentGenerated,
    imageGenerated,
    databaseUpdated,
    xmlUpdated,
    postData,
    htmlPath,
  } = results;

  console.log("\n");
  console.log("═".repeat(60));
  console.log("📝 POST CREATION SUMMARY");
  console.log("═".repeat(60));
  console.log("");
  console.log(
    "✅ Content Generation:",
    contentGenerated ? "SUCCESS" : "FAILED"
  );
  console.log(
    "✅ Image Generation:  ",
    imageGenerated ? "SUCCESS" : "SKIPPED/FAILED"
  );
  console.log("✅ Database Update:   ", databaseUpdated ? "SUCCESS" : "FAILED");
  console.log("✅ XML Config Update: ", xmlUpdated ? "SUCCESS" : "FAILED");
  console.log("");
  console.log("─".repeat(60));
  console.log("");

  if (postData) {
    console.log("📄 Post Details:");
    console.log(`   Title: ${postData.title}`);
    console.log(`   ID: ${postData.id}`);
    console.log(`   Tags: ${postData.tags.join(", ")}`);
    console.log(`   Featured: ${postData.featured ? "Yes" : "No"}`);
    console.log(`   Date: ${postData.date}`);
    console.log("");
  }

  if (htmlPath) {
    console.log("📁 Files Created:");
    console.log(`   HTML: ${htmlPath}`);

    const imagePath = htmlPath.replace(".html", "-1.png");
    if (fs.existsSync(imagePath)) {
      console.log(`   Image: ${imagePath}`);
    }
    console.log("");
  }

  console.log("─".repeat(60));
  console.log("");

  if (contentGenerated && databaseUpdated) {
    console.log("🎉 Post successfully created!");
    console.log("");
    console.log("Next steps:");
    if (!imageGenerated) {
      console.log(
        "  • Manually add a cover image if automatic generation failed"
      );
    }
    console.log(
      "  • Review the content: " +
        (htmlPath ? path.relative(process.cwd(), htmlPath) : "N/A")
    );
    console.log("  • Commit and push to deploy:");
    console.log("    git add .");
    console.log('    git commit -m "Add: New post"');
    console.log("    git push");
    console.log("  • GitHub Actions will auto-deploy to production");
    console.log(
      "  • Check the post at: " +
        (htmlPath ? path.relative(__dirname, htmlPath) : "N/A")
    );
    console.log("  • Verify it appears on the homepage");
  } else {
    console.log("⚠️  Post creation incomplete. Check errors above.");
  }

  console.log("");
  console.log("═".repeat(60));
  console.log("");
}

/**
 * Main orchestration function
 */
async function orchestratePost(topic, options = {}) {
  console.log("\n");
  console.log("═".repeat(60));
  console.log("🎯 COMPLETE POST CREATION PIPELINE");
  console.log("═".repeat(60));
  console.log("");
  console.log(`📝 Topic: ${topic}`);
  console.log(`⚙️  Options:`, JSON.stringify(options, null, 2));
  console.log("");

  const results = {
    contentGenerated: false,
    imageGenerated: false,
    databaseUpdated: false,
    xmlUpdated: false,
    postData: null,
    htmlPath: null,
  };

  try {
    // Step 1: Generate content
    console.log("\n" + "─".repeat(60));
    console.log("STEP 1: Content Generation");
    console.log("─".repeat(60));

    const contentResult = await generatePost(topic, options.context || "");

    if (!contentResult.success) {
      console.error("❌ Content generation failed. Aborting pipeline.");
      createSummary(results);
      return results;
    }

    results.contentGenerated = true;
    results.postData = {
      ...contentResult.postData,
      featured: options.featured || false,
    };
    results.htmlPath = contentResult.htmlPath;

    // Step 2: Generate image (unless --no-image)
    if (!options.noImage) {
      console.log("\n" + "─".repeat(60));
      console.log("STEP 2: Image Generation");
      console.log("─".repeat(60));

      const imageDir = path.dirname(contentResult.htmlPath);
      const imagePath = path.join(imageDir, `${contentResult.slug}-1.png`);

      const imageSuccess = await generateCoverImage(
        contentResult.metadata.imagePrompt,
        imagePath,
        contentResult.postData.title
      );

      results.imageGenerated = imageSuccess;
    } else {
      console.log("\n⏭️  Skipping image generation (--no-image flag)");
    }

    // Step 3: Update database
    console.log("\n" + "─".repeat(60));
    console.log("STEP 3: Database Update");
    console.log("─".repeat(60));

    const dbSuccess = updatePostsDatabase(
      results.postData,
      options.featured || false
    );
    results.databaseUpdated = dbSuccess;

    // Step 4: Update XML config
    const xmlSuccess = updatePostsConfigXML(results.postData);
    results.xmlUpdated = xmlSuccess;

    // Final summary
    createSummary(results);

    return results;
  } catch (error) {
    console.error("\n❌ Pipeline error:", error.message);
    if (error.stack) {
      console.error(error.stack);
    }

    createSummary(results);
    return results;
  }
}

/**
 * Parse command line options
 */
function parseOptions(args) {
  const options = {
    featured: args.includes("--featured"),
    noImage: args.includes("--no-image"),
    context: "",
  };

  // Extract context if provided
  const contextIndex = args.indexOf("--context");
  if (contextIndex !== -1 && args[contextIndex + 1]) {
    options.context = args[contextIndex + 1];
  }

  return options;
}

/**
 * Main CLI handler
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(`
═══════════════════════════════════════════════════════════
🎯 Complete Post Creation Pipeline
═══════════════════════════════════════════════════════════

Automates the entire process of creating and publishing a post:
  1. Generate content with Gemini API
  2. Generate cover image with Imagen API
  3. Update posts-database.json
  4. Optionally deploy to production

Usage:
  node orchestrate-post.js "Topic or headline" [options]

Options:
  --featured        Mark this post as featured on homepage
  --no-image        Skip image generation
  --context "..."   Additional context for content generation
  --help, -h        Show this help message

Examples:
  # Basic usage
  node orchestrate-post.js "La privatización de YPF y sus consecuencias"

  # Create featured post
  node orchestrate-post.js "Crisis hídrica en Uruguay" --featured

  # Skip image generation
  node orchestrate-post.js "Análisis económico 2025" --no-image

  # With additional context
  node orchestrate-post.js "Reforma laboral" --context "Focus on recent changes"

Requirements:
  • GEMINI_API_KEY in .env file

Deployment:
  This script generates content and updates the database.
  Commit and push changes to trigger automatic deployment via GitHub Actions.

Get API key: https://aistudio.google.com/app/apikey
`);
    process.exit(0);
  }

  // Check for API key
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ Error: GEMINI_API_KEY not found in .env file");
    console.error("\n📝 Add to .env: GEMINI_API_KEY=your_key_here");
    console.error("   Get key: https://aistudio.google.com/app/apikey");
    process.exit(1);
  }

  // Extract topic (everything that's not a flag)
  const flags = args.filter((arg) => arg.startsWith("--"));
  const topicArgs = args.filter((arg) => !arg.startsWith("--"));

  // Handle --context flag specially
  const contextIndex = flags.indexOf("--context");
  if (contextIndex !== -1) {
    // Remove --context and its value from topicArgs
    topicArgs.splice(topicArgs.indexOf(args[args.indexOf("--context") + 1]), 1);
  }

  if (topicArgs.length === 0) {
    console.error("❌ Error: No topic provided");
    console.error('\n📝 Usage: node orchestrate-post.js "Your topic here"');
    process.exit(1);
  }

  const topic = topicArgs.join(" ");
  const options = parseOptions(args);

  const results = await orchestratePost(topic, options);

  // Exit with appropriate code
  const success = results.contentGenerated && results.databaseUpdated;
  process.exit(success ? 0 : 1);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { orchestratePost, updatePostsDatabase, generateCoverImage };
