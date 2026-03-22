/**
 * Animations System
 * Scroll reveals, animated counters, hero text split
 */

document.addEventListener('DOMContentLoaded', () => {
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- SCROLL REVEAL ---
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length && !isReduced) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  // --- TIMELINE SECTION ---
  const timelineSection = document.querySelector('.timeline-section');
  if (timelineSection && !isReduced) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          timelineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    timelineObserver.observe(timelineSection);
  } else if (timelineSection) {
    timelineSection.classList.add('in-view');
  }

  // --- ANIMATED COUNTERS ---
  const counterEls = document.querySelectorAll('[data-count]');
  if (counterEls.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterEls.forEach(el => counterObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const start = performance.now();

    if (isReduced) {
      el.textContent = target;
      return;
    }

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // --- HERO TEXT SPLIT ---
  const heroTitle = document.querySelector('.hero-title[data-split]');
  if (heroTitle) {
    const text = heroTitle.textContent.trim();
    heroTitle.innerHTML = '';
    let charIndex = 0;

    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ') {
        const space = document.createElement('span');
        space.classList.add('char', 'space');
        space.innerHTML = '&nbsp;';
        space.style.animationDelay = `${0.5 + charIndex * 0.06}s`;
        heroTitle.appendChild(space);
        charIndex++;
      } else {
        const span = document.createElement('span');
        span.classList.add('char');
        span.textContent = text[i];
        span.style.animationDelay = `${0.5 + charIndex * 0.06}s`;
        heroTitle.appendChild(span);
        charIndex++;
      }
    }
  }

  // --- HEADER SCROLL ---
  const header = document.querySelector('header');
  const scrollBtn = document.getElementById('scrollToTop');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        header.classList.add('scrolled');
        if (scrollBtn) scrollBtn.classList.add('visible');
      } else {
        header.classList.remove('scrolled');
        if (scrollBtn) scrollBtn.classList.remove('visible');
      }
    }, { passive: true });
  }

  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
