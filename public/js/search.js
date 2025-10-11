/**
 * Global Search Functionality
 * Works across all pages - loads posts database and provides search
 * Compatible with index.html's existing search implementation
 */

// Only initialize if we're NOT on the home page (which has its own implementation)
const isHomePage =
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html";

if (!isHomePage) {
  let allPosts = [];

  // Load posts database
  async function loadPostsDatabase() {
    try {
      const response = await fetch("/posts-database.json");
      const data = await response.json();
      allPosts = data.posts || [];
      console.log(`✅ Loaded ${allPosts.length} posts for search`);
    } catch (error) {
      console.error("Error loading posts database:", error);
    }
  }

  // Perform search - redirect to home with search parameter
  window.performSearch = function (event) {
    if (event) event.preventDefault();

    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    const query = searchInput.value.trim();

    if (!query) {
      window.location.href = "/";
      return;
    }

    // Redirect to home page with search query
    window.location.href = `/?search=${encodeURIComponent(query)}`;
  };

  // Initialize on page load
  document.addEventListener("DOMContentLoaded", () => {
    loadPostsDatabase();

    // Add event listener to search form
    const searchForm = document.querySelector(".search-form");
    if (searchForm) {
      searchForm.addEventListener("submit", window.performSearch);
    }
  });
}
