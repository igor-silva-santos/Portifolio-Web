/* ── GSAP: REVEAL, STAGGER E BOTÕES MAGNÉTICOS ─────────────────────
   Substitui o antigo js/scroll-reveal.js (IntersectionObserver manual).
   O CSS só define o estado inicial escondido (.reveal / .reveal-left /
   .reveal-right em css/base.css) — quem anima é o GSAP a partir daqui. */
(function () {
  gsap.registerPlugin(ScrollTrigger);

  /* ── REVEAL AO ROLAR ────────────────────────────────────────────
     Cada grupo de cards (serviços, formação, projetos) usa stagger
     próprio; os elementos "soltos" (.reveal fora de um grid) animam
     um a um. reveal-left/reveal-right (sobre e contato) entram do lado. */

  // grupos com stagger (cards que aparecem em cascata)
  const staggerGroups = [
    '.services-grid .service-card',
    '.edu-grid .edu-card',
    '.projects-grid .project-card',
  ];

  staggerGroups.forEach((selector) => {
    const cards = gsap.utils.toArray(selector);
    if (!cards.length) return;
    gsap.from(cards, {
      opacity: 0,
      y: 36,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: cards[0].closest('section'),
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  });

  // elementos .reveal que NÃO fazem parte de um grid com stagger acima
  // (cabeçalhos de seção, botão "ver todos no GitHub" etc.)
  const staggeredSelectors = staggerGroups.join(', ');
  const soloReveal = gsap.utils.toArray('.reveal').filter(
    (el) => !el.matches(staggeredSelectors) && !el.closest(staggeredSelectors)
  );
  soloReveal.forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 36,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // reveal-left / reveal-right (avatar+texto do "Sobre", form+sidebar do "Contato")
  gsap.utils.toArray('.reveal-left').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      x: -36,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    });
  });
  gsap.utils.toArray('.reveal-right').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      x: 36,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    });
  });

  /* ── BOTÕES MAGNÉTICOS (quickTo) ──────────────────────────────── */
  const magneticSelector = '.btn-primary, .btn-nav, .btn-submit';
  gsap.utils.toArray(magneticSelector).forEach((btn) => {
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3' });

    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.25);
      yTo((e.clientY - r.top - r.height / 2) * 0.25);
    });
    btn.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  });
})();
