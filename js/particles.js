/* ── CANVAS PARTICLES (fundo animado) ─────────────── */
(function () {
  const canvas = document.getElementById('canvas-bg');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouseX = -999, mouseY = -999;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.5 + .3;
      this.vx = (Math.random() - .5) * .3;
      this.vy = (Math.random() - .5) * .3;
      this.a  = Math.random() * .5 + .1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(90,155,245,${this.a})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.update();
      p.draw();
      particles.forEach(p2 => {
        const dx = p.x - p2.x, dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(58,123,213,${.12 * (1 - dist / 120)})`;
          ctx.lineWidth = .5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
      const mdx = p.x - mouseX, mdy = p.y - mouseY;
      const md  = Math.sqrt(mdx * mdx + mdy * mdy);
      if (md < 150) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(90,155,245,${.25 * (1 - md / 150)})`;
        ctx.lineWidth = .8;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
      }
    });
    requestAnimationFrame(loop);
  }
  loop();
})();
