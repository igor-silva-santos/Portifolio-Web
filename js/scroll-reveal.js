/* ── REVEAL AO ROLAR (IntersectionObserver nativo) ─────────────────
   Sem dependência de CDN nem de timing de terceiros — funciona sempre,
   em qualquer navegador que suporte IntersectionObserver (todos os
   modernos). Isso é proposital: depois de dois bugs seguidos com o
   GSAP ScrollTrigger escondendo seções inteiras, conteúdo do site não
   deve depender de uma lib externa pra aparecer. */
(function () {
  if (!('IntersectionObserver' in window)) {
    // navegador muito antigo: garante que tudo fique visível
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
      el.classList.add('visible');
    });
    return;
  }

  // cascata: cada card do grid ganha um delay incremental antes de revelar
  ['.services-grid .service-card', '.edu-grid .edu-card', '.projects-grid .project-card'].forEach(
    (selector) => {
      document.querySelectorAll(selector).forEach((el, i) => {
        el.style.transitionDelay = i * 0.12 + 's';
      });
    }
  );

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => io.observe(el));
})();
