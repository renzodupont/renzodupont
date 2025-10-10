/**
 * Renzo Dupont - Tech Blog
 * Servidor Express simple para servir archivos estáticos
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8899;

// Security: Block access to sensitive files
app.use((req, res, next) => {
  const blockedPaths = [
    "/posts-database.json",
    "/posts-config.xml",
    "/.env",
    "/package.json",
    "/node_modules",
  ];

  if (blockedPaths.some((blocked) => req.path.startsWith(blocked))) {
    return res.status(403).send("Access Denied");
  }

  next();
});

// JSON middleware
app.use(express.json());

// API endpoint for posts (secure, server-side only)
app.get("/api/posts", (req, res) => {
  try {
    const dbPath = path.join(__dirname, "posts-database.json");
    const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    const { featured, search, limit = 20, page = 1, offset = 0 } = req.query;

    let posts = data.posts;
    const totalPosts = posts.length;

    // Filter featured posts
    if (featured === "true") {
      posts = posts.filter((post) => post.featured);
    }

    // Search functionality
    if (search) {
      const searchTerm = search.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Calculate pagination
    const totalFiltered = posts.length;
    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);
    const offsetNum = parseInt(offset);

    // Calculate start position (use offset if provided, otherwise calculate from page)
    const start = offsetNum > 0 ? offsetNum : (pageNum - 1) * limitNum;
    const end = start + limitNum;

    // Apply pagination
    const paginatedPosts = posts.slice(start, end);

    // Calculate metadata
    const totalPages = Math.ceil(totalFiltered / limitNum);
    const hasMore = end < totalFiltered;
    const hasPrevious = start > 0;

    res.json({
      posts: paginatedPosts,
      pagination: {
        total: totalFiltered,
        totalPages,
        currentPage: pageNum,
        limit: limitNum,
        offset: start,
        hasMore,
        hasPrevious,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to load posts" });
  }
});

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal - redirige a index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`� Renzo Dupont - Tecnología en español`);
});
