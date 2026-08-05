/* ── CONTADORES ANIMADOS (hero stats) ─────────────── */
(function () {
  function animateCounter(el) {
    const target = +el.dataset.target;
    const dur = 1800;
    const start = Date.now();
    function tick() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / dur, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    tick();
  }

  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  // Nota: no arquivo original os contadores eram selecionados mas nunca
  // observados/disparados, então ficavam travados em "0". Corrigido aqui
  // com um IntersectionObserver dedicado, no mesmo padrão do .reveal.
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    });
  }, { threshold: .3 });

  counters.forEach(el => counterObserver.observe(el));
})();
