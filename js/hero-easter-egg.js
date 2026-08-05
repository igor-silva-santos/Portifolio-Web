/* ── EASTER EGG DO PLANETA (hero) ──────────────────────────────────
   1) Evolução por visita: o planeta ganha detalhes (4º anel, segunda
      lua, brilho maior) conforme os dias diferentes em que a pessoa
      visita o site nesse navegador — guardado em localStorage. Não
      depende de GSAP, roda sempre (mesmo se o GSAP falhar).
   2) Clique secreto: 3 cliques no planeta em menos de 1.8s disparam
      uma explosão de partículas. Precisa do GSAP — se não tiver, esse
      efeito simplesmente não é ativado, sem quebrar nada. */
(function () {
  const planet = document.querySelector('.hero-visual');
  if (!planet) return;

  /* ── 1. EVOLUÇÃO POR VISITA ────────────────────────────────────── */
  (function evolvePlanet() {
    try {
      const STORAGE_KEY = 'igor_portfolio_visits';
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      let data = { count: 1, lastDate: '' };
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) data = JSON.parse(raw);

      if (data.lastDate !== today) {
        data.count = (data.count || 0) + 1;
        data.lastDate = today;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }

      let level = 0;
      if (data.count >= 10) level = 3;
      else if (data.count >= 5) level = 2;
      else if (data.count >= 2) level = 1;

      // acumula: nível 3 mantém os detalhes do 1 e do 2 também
      for (let i = 1; i <= level; i++) planet.classList.add('pv-level-' + i);
    } catch (e) {
      // localStorage bloqueado (aba anônima, configuração do navegador etc.) — sem problema.
    }
  })();

  /* ── 2. CLIQUE SECRETO → EXPLOSÃO DE PARTÍCULAS ───────────────── */
  if (typeof gsap === 'undefined') return;

  let clickCount = 0;
  let clickTimer = null;

  planet.addEventListener('click', () => {
    clickCount += 1;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { clickCount = 0; }, 1800);
    if (clickCount < 3) return;
    clickCount = 0;
    triggerSupernova();
  });

  function triggerSupernova() {
    const rect = planet.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = ['#3a7bd5', '#5a9bf5', '#8ab8ff', '#d0dae8'];

    // gira os anéis mais rápido por um instante
    gsap.utils.toArray('.hero-ring', planet).forEach((ring) => {
      gsap.to(ring, { rotation: '+=360', duration: 1.2, ease: 'power2.inOut' });
    });
    gsap.to('.hero-orb', {
      scale: 1.25,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    });

    // explosão de partículas
    const particleCount = 24;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.style.cssText =
        'position:fixed; left:' + cx + 'px; top:' + cy + 'px; width:6px; height:6px;' +
        'border-radius:50%; pointer-events:none; z-index:9999;' +
        'background:' + colors[i % colors.length] + ';' +
        'box-shadow:0 0 8px ' + colors[i % colors.length] + ';';
      document.body.appendChild(p);

      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.3;
      const distance = 80 + Math.random() * 120;
      gsap.to(p, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        scale: 0,
        duration: 0.9 + Math.random() * 0.5,
        ease: 'power2.out',
        onComplete: () => p.remove(),
      });
    }

    showToast('🛰️ sistema estabilizado — você achou o modo secreto');
  }

  function showToast(text) {
    const toast = document.createElement('div');
    toast.textContent = text;
    toast.style.cssText =
      'position:fixed; left:50%; bottom:40px; transform:translateX(-50%) translateY(20px);' +
      "background:rgba(8,12,24,.92); border:1px solid rgba(90,155,245,.35);" +
      "color:#eef2fa; padding:12px 22px; border-radius:100px; font-size:.85rem;" +
      "font-family:'Inter',sans-serif; letter-spacing:.02em; z-index:9999;" +
      'opacity:0; backdrop-filter:blur(8px); box-shadow:0 8px 30px rgba(0,0,0,.4);';
    document.body.appendChild(toast);

    gsap.to(toast, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    setTimeout(() => {
      gsap.to(toast, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => toast.remove(),
      });
    }, 2600);
  }
})();
