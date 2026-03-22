/**
 * Mobile Menu
 */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('nav');
  const body = document.body;

  if (!toggle || !nav) return;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle.classList.toggle('active');
    nav.classList.toggle('active');
    body.classList.toggle('menu-open');
  });

  body.addEventListener('click', (e) => {
    if (body.classList.contains('menu-open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
      close();
    }
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', close);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) close();
  });

  let timer;
  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (window.innerWidth > 768 && body.classList.contains('menu-open')) close();
    }, 250);
  });

  function close() {
    toggle.classList.remove('active');
    nav.classList.remove('active');
    body.classList.remove('menu-open');
  }
});
