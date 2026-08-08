/* ── TYPING EFFECT (hero) ─────────── */
(function () {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const fallback = ['Desenvolvedor Full Stack'];
  function getPhrases() {
    const lang = window.SITE_LANG === 'en' ? 'en' : 'pt';
    return (window.i18nPhrases && window.i18nPhrases[lang]) || fallback;
  }

  let phrases = getPhrases();
  let pi = 0, ci = 0, typing = true;

  // se o idioma mudar (toggle manual), recomeça a digitação com as frases certas
  document.addEventListener('langchange', () => {
    phrases = getPhrases();
    pi = 0; ci = 0; typing = true;
    el.textContent = '';
  });

  function type() {
    const phrase = phrases[pi % phrases.length];
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
