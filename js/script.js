/**
 * 背景の星空アニメーション（Canvas）
 */
window.addEventListener('load', () => {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let stars = [];

  function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    // 星の生成
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        opacity: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
        direction: Math.random() > 0.5 ? 1 : -1
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      // 透明度の変化で点滅
      s.opacity += s.speed * s.direction;
      if (s.opacity > 1 || s.opacity < 0) {
        s.direction *= -1;
      }
      
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, s.opacity)})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  // リサイズ対応
  window.addEventListener('resize', init);

  init();
  draw();
});

/**
 * スムーズスクロールの補完 (Tailwindのscroll-behaviorだけでは足りないブラウザ向け)
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});