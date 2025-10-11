/**
 * Mobile Menu Functionality
 * Handles hamburger menu toggle for mobile devices
 */

document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector("nav");
  const body = document.body;

  if (!mobileMenuToggle || !nav) return;

  // Toggle menu
  mobileMenuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenuToggle.classList.toggle("active");
    nav.classList.toggle("active");
    body.classList.toggle("menu-open");
  });

  // Close menu when clicking on overlay (body after element)
  body.addEventListener("click", (e) => {
    if (
      body.classList.contains("menu-open") &&
      !nav.contains(e.target) &&
      !mobileMenuToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close menu when clicking on a navigation link
  const navLinks = nav.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Close menu on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && body.classList.contains("menu-open")) {
      closeMenu();
    }
  });

  // Close menu on window resize (if resized to desktop)
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768 && body.classList.contains("menu-open")) {
        closeMenu();
      }
    }, 250);
  });

  // Helper function to close menu
  function closeMenu() {
    mobileMenuToggle.classList.remove("active");
    nav.classList.remove("active");
    body.classList.remove("menu-open");
  }
});
