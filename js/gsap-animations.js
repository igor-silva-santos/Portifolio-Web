/* ── GSAP: REVEAL, STAGGER E BOTÕES MAGNÉTICOS ─────────────────────
   O CSS (css/base.css) deixa .reveal/.reveal-left/.reveal-right visíveis
   por padrão — é este script que esconde e revela via GSAP. Se o GSAP não
   carregar (CDN bloqueado etc.), o bloco abaixo simplesmente não roda e o
   conteúdo continua visível, só sem a animação de entrada. */
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP/ScrollTrigger não carregaram — animações de scroll desativadas, conteúdo permanece visível.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Corrige um bug conhecido do ScrollTrigger em celular: quando a barra de
  // endereço do navegador esconde/aparece durante o scroll, a viewport muda
  // de altura e o ScrollTrigger recalcula as posições de trigger com base
  // nesse resize — o que pode fazer seções nunca disparar a revelação.
  ScrollTrigger.config({ ignoreMobileResize: true });

  try {

    /* ── GRIDS DE CARDS (stagger) ──────────────────────────────────
       ScrollTrigger.batch() cria um trigger por elemento e agrupa os
       callbacks — cada card revela sozinho ao entrar na tela, com um
       leve efeito cascata quando vários entram juntos. Muito mais
       simples e confiável do que calcular a seção-pai na mão. */
    ['.service-card', '.edu-card', '.project-card'].forEach((selector) => {
      if (!document.querySelector(selector)) return;
      ScrollTrigger.batch(selector, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            opacity: 0,
            y: 36,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.12,
            overwrite: true,
          }),
      });
    });

    /* ── REVEAL SOLO ────────────────────────────────────────────────
       .reveal que NÃO é um card de grid (cabeçalhos de seção, botão
       "ver todos no GitHub" etc.) — cada um com seu próprio trigger. */
    gsap.utils
      .toArray('.reveal:not(.service-card):not(.edu-card):not(.project-card)')
      .forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 36,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

    /* ── REVEAL-LEFT / REVEAL-RIGHT ────────────────────────────────
       Avatar+texto do "Sobre", form+sidebar do "Contato". */
    gsap.utils.toArray('.reveal-left').forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        x: -36,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
    gsap.utils.toArray('.reveal-right').forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        x: 36,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    /* ── BOTÕES MAGNÉTICOS (quickTo) ───────────────────────────────── */
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

    // reavalia posições depois que fontes/imagens terminarem de carregar
    // (layout pode mudar de altura depois do primeiro cálculo do ScrollTrigger)
    window.addEventListener('load', () => ScrollTrigger.refresh());
  } catch (err) {
    // qualquer erro aqui não deve deixar o site quebrado — o CSS já garante
    // que o conteúdo está visível por padrão, então só avisamos no console.
    console.warn('Erro ao configurar animações GSAP:', err);
  }
})();
