(() => {
  // Nav dropdown — click to toggle, outside-click + Escape to close.
  const trigger = document.querySelector('.site-nav__trigger');
  const menu = document.getElementById('primary-menu');
  if (trigger && menu) {
    const close = () => trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
    document.addEventListener('click', (e) => {
      if (!trigger.parentElement.contains(e.target)) close();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    menu.addEventListener('click', (e) => { if (e.target.tagName === 'A') close(); });
  }

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Section parallax: each [data-parallax-section] gets its inner img translated
  // based on its center distance from the viewport center, scaled by data-speed.
  const parallaxSections = document.querySelectorAll('[data-parallax-section]');
  if (parallaxSections.length && !reduce) {
    let secTicking = false;
    const updateSections = () => {
      const winH = window.innerHeight;
      parallaxSections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > winH + 200) return; // off-screen
        const center = rect.top + rect.height / 2;
        const distance = center - winH / 2;
        const speed = parseFloat(sec.dataset.speed || '0.05');
        sec.style.setProperty('--art-shift', `${(-distance * speed).toFixed(1)}px`);
      });
      secTicking = false;
    };
    const onSectionScroll = () => {
      if (!secTicking) {
        requestAnimationFrame(updateSections);
        secTicking = true;
      }
    };
    addEventListener('scroll', onSectionScroll, { passive: true });
    addEventListener('resize', onSectionScroll, { passive: true });
    updateSections();
  }

  if (reduce) return;

  const hero = document.querySelector('[data-parallax]');
  if (!hero) return;

  const layers = Array.from(hero.querySelectorAll('[data-layer]'));
  let ticking = false;
  let lastScroll = 0;

  const update = () => {
    const y = lastScroll;
    const heroRect = hero.getBoundingClientRect();
    const heroTop = heroRect.top + y;
    const progress = Math.max(0, Math.min(1, (y - heroTop) / (heroRect.height || 1)));

    layers.forEach((el) => {
      const speed = parseFloat(el.dataset.speed || '0');
      // Use scrollY * speed so shift is 0 at page top. The old (scrollY - heroDocTop) * speed
      // pulled layers upward on load (negative shift) and hid them under the sticky header.
      const shift = y * speed;
      el.style.setProperty('--shift', `${shift}px`);
      const scale = 1 + progress * 0.05;
      el.style.setProperty('--scale', scale.toFixed(3));
    });

    ticking = false;
  };

  const onScroll = () => {
    lastScroll = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  update();

  // Reveal-on-scroll for everything tagged data-reveal (or auto-apply to sections).
  const revealables = document.querySelectorAll('[data-reveal], .feature-row, .faction, .resource-card, .showcase__image');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    revealables.forEach((el) => {
      el.setAttribute('data-reveal', '');
      io.observe(el);
    });
  } else {
    revealables.forEach((el) => el.classList.add('is-visible'));
  }

  // YouTube lite-embed: click thumbnail → swap in autoplaying iframe.
  // (Falls back to navigating to youtube.com if JS fails.)
  document.querySelectorAll('.video__thumb[data-youtube-id]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const id = el.dataset.youtubeId;
      if (!id) return;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1&modestbranding=1`;
      iframe.title = 'Race to Kepler — How to Play';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.setAttribute('allowfullscreen', '');
      iframe.frameBorder = '0';
      iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;';
      const frame = document.createElement('div');
      frame.className = 'video__frame';
      frame.appendChild(iframe);
      el.parentNode.replaceChild(frame, el);
    });
  });

  // Mailing list: show a fake thanks-toast on submit so the first pass has a working UX.
  const form = document.querySelector('.mailing__form');
  const toast = document.querySelector('.mailing__toast');
  if (form && toast) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type=email]');
      if (!email || !email.value || !email.checkValidity()) {
        email?.focus();
        return;
      }
      form.reset();
      toast.hidden = false;
      setTimeout(() => { toast.hidden = true; }, 4000);
    });
  }
})();
