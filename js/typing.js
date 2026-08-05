/* ── TYPING EFFECT (hero) ─────────── */
(function () {
  const phrases = [
    'Desenvolvedor Full Stack',
    'Analista de Qualidade (QA)',
    'Consultor de TI',
    'Entusiasta de Home Assistant',
    'Consultor de Automação',
  ];
  const el = document.getElementById('typing-text');
  if (!el) return;

  let pi = 0, ci = 0, typing = true;
  function type() {
    const phrase = phrases[pi];
    if (typing) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { typing = false; setTimeout(type, 2000); return; }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { typing = true; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, typing ? 70 : 35);
  }
  setTimeout(type, 1500);
})();
