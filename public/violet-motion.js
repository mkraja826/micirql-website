(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const interactiveSelector = '.hero-signal, .service-card, .work-card, .product-proof, .outcome-card';
  const bound = new WeakSet();

  function updateScrollProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    root.style.setProperty('--scroll-progress', progress.toFixed(4));
  }

  function bindInteractiveGlow() {
    document.querySelectorAll(interactiveSelector).forEach((card) => {
      if (bound.has(card)) return;
      bound.add(card);

      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
      });

      card.addEventListener('pointerleave', () => {
        card.style.removeProperty('--mx');
        card.style.removeProperty('--my');
      });
    });
  }

  function init() {
    bindInteractiveGlow();
    updateScrollProgress();

    if (!reduceMotion) {
      window.addEventListener('pointermove', (event) => {
        root.style.setProperty('--cursor-x', `${event.clientX}px`);
        root.style.setProperty('--cursor-y', `${event.clientY}px`);
      }, { passive: true });
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    const mount = document.getElementById('root');
    if (mount && 'MutationObserver' in window) {
      const observer = new MutationObserver(bindInteractiveGlow);
      observer.observe(mount, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
