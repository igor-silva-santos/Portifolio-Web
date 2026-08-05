/* ── REVEAL AO ROLAR (IntersectionObserver) ────────── */
(function () {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      io.unobserve(e.target);
    });
  }, { threshold: .1 });

  revealEls.forEach(el => io.observe(el));
})();
