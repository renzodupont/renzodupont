/**
 * Update Blog Post Images
 * - Replaces Unsplash placeholder images with AI-generated images
 * - Updates image paths to use local generated image    console.log('❌ No posts found in JSON database');
 * - Maintains proper alt text and styling
 */

import * as fs from "node:fs";
import path from "path";
import { JSDOM } from "jsdom";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Parse JSON database to get post data
 */
function parsePostsConfig() {
  try {
    const jsonPath = path.join(__dirname, "posts-database.json");
    const jsonContent = fs.readFileSync(jsonPath, "utf-8");
    const data = JSON.parse(jsonContent);

    const posts = data.posts.map((post) => ({
      title: post.title,
      link: post.link,
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
 * Find generated images for a post
 */
function findGeneratedImages(postPath) {
  const dir = path.dirname(postPath);
  const filename = path.basename(postPath, ".html");

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir);
  const imagePattern = new RegExp(
    `^${filename}-(\\d+)\\.(jpg|jpeg|png|webp)$`,
    "i"
  );

  const images = files
    .filter((file) => imagePattern.test(file))
    .map((file) => {
      const match = file.match(imagePattern);
      return {
        filename: file,
        number: parseInt(match[1]),
        extension: match[2],
      };
    })
    .sort((a, b) => a.number - b.number);

  return images;
}

/**
 * Update image sources in HTML content
 */
function updateImageSources(htmlContent, postPath, images) {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;

  // Find existing featured image
  let featuredImg =
    document.querySelector(".article-featured-image") ||
    document.querySelector('img[src*="unsplash"]') ||
    document.querySelector('img[src*="placeholder"]');

  if (!featuredImg && images.length > 0) {
    // If no existing image, create one after the article header
    const articleHeader = document.querySelector(".article-header");
    if (articleHeader) {
      featuredImg = document.createElement("img");
      featuredImg.className = "article-featured-image";
      articleHeader.insertAdjacentElement("afterend", featuredImg);
    }
  }

  if (featuredImg && images.length > 0) {
    // Use the first generated image as featured image
    const firstImage = images[0];
    const relativePath = `./${firstImage.filename}`;

    // Update the image source
    featuredImg.src = relativePath;

    // Generate appropriate alt text based on the post title
    const title = document.querySelector("h1")?.textContent || "Article image";
    featuredImg.alt = `Imagen destacada: ${title}`;

    // Ensure it has the featured image class
    if (!featuredImg.className.includes("article-featured-image")) {
      featuredImg.className = "article-featured-image";
    }

    console.log(`✅ Updated featured image: ${relativePath}`);
  }

  // Add additional images if there are more than one
  if (images.length > 1) {
    const articleContent = document.querySelector(".article-content");
    if (articleContent) {
      // Find a good place to insert additional images (after first paragraph)
      const firstParagraph = articleContent.querySelector("p");
      if (firstParagraph) {
        for (let i = 1; i < Math.min(images.length, 3); i++) {
          // Limit to 3 total images
          const additionalImg = document.createElement("img");
          additionalImg.src = `./${images[i].filename}`;
          additionalImg.alt = `Imagen adicional ${i + 1} del artículo`;
          additionalImg.className = "article-additional-image";
          additionalImg.style.cssText =
            "width: 100%; max-width: 800px; height: auto; margin: 20px 0; border-radius: 8px;";

          // Insert after the first paragraph
          firstParagraph.insertAdjacentElement("afterend", additionalImg);
          console.log(`✅ Added additional image: ${images[i].filename}`);
        }
      }
    }
  }

  return dom.serialize();
}

/**
 * Update all blog post images
 */
async function updateAllPostImages(options = {}) {
  console.log("🖼️  Starting Blog Post Image Update\n");

  // Load posts configuration from XML
  const posts = parsePostsConfig();

  if (posts.length === 0) {
    console.log("❌ No posts found in XML configuration");
    return;
  }

  let processed = 0;
  let updated = 0;
  let skipped = 0;

  for (const post of posts) {
    try {
      const postPath = path.join(__dirname, post.link);
      const filename = path.basename(postPath, ".html");

      console.log(`\n📄 Processing: ${filename}`);

      // Check if post file exists
      if (!fs.existsSync(postPath)) {
        console.log(`⚠️  Post file not found: ${postPath}`);
        continue;
      }

      // Find generated images for this post
      const images = findGeneratedImages(postPath);

      if (images.length === 0) {
        console.log("⏭️  No generated images found, skipping");
        skipped++;
        continue;
      }

      console.log(
        `🖼️  Found ${images.length} generated images: ${images
          .map((img) => img.filename)
          .join(", ")}`
      );

      // Read current HTML content
      const htmlContent = fs.readFileSync(postPath, "utf-8");

      // Update image sources
      const updatedHtml = updateImageSources(htmlContent, postPath, images);

      // Write back to file (unless dry run)
      if (options.dryRun) {
        console.log("🔍 [DRY RUN] Would update image sources");
      } else {
        fs.writeFileSync(postPath, updatedHtml, "utf-8");
        console.log(`💾 Updated HTML file with ${images.length} image(s)`);
      }

      updated++;
      processed++;
    } catch (error) {
      console.error(`❌ Error processing ${post.title}:`, error.message);
    }
  }

  console.log("\n📊 Image Update Summary:");
  console.log(`📄 Posts processed: ${processed}`);
  console.log(`🖼️  Posts updated with images: ${updated}`);
  console.log(`⏭️  Posts skipped (no images): ${skipped}`);
  console.log(`📋 Total posts in JSON: ${posts.length}`);

  if (updated > 0) {
    console.log("\n🎉 Blog post image update complete!");
    console.log(
      "💡 All Unsplash placeholders replaced with AI-generated images"
    );
  } else {
    console.log("\n💡 No posts were updated (no generated images found)");
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  // Check for dry run flag
  const isDryRun =
    process.argv.includes("--dry-run") || process.argv.includes("--dry");

  updateAllPostImages({ dryRun: isDryRun }).catch(console.error);
}

export { updateAllPostImages };
