/* ── GSAP: BOTÕES MAGNÉTICOS ───────────────────────────────────────
   Só efeito decorativo — reveal/stagger ao rolar voltou a ser feito
   por IntersectionObserver puro (js/scroll-reveal.js), sem GSAP, pra
   não arriscar conteúdo sumindo se essa lib falhar. Se o GSAP não
   carregar, os botões simplesmente não ganham o efeito magnético,
   sem quebrar nada. */
(function () {
  if (typeof gsap === 'undefined') return;

  try {
    gsap.utils.toArray('.btn-primary, .btn-nav, .btn-submit').forEach((btn) => {
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
  } catch (err) {
    console.warn('Erro ao configurar botões magnéticos GSAP:', err);
  }
})();
