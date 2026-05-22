document.addEventListener('DOMContentLoaded', () => {

  // ── NAV ──
  window.addEventListener('scroll', () => {}, { passive: true }); // pill é sempre visível

  // ── MOBILE MENU ──
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  document.querySelectorAll('.mobile-link').forEach(l =>
    l.addEventListener('click', () => mobileMenu.classList.remove('open'))
  );

  // ── REVEAL ON SCROLL ──
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));

  // ── COUNTER ANIMATION ──
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const startTime = performance.now();
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const statObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.stat-num[data-target]').forEach(animateCounter);
        statObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  const statsEl = document.querySelector('.sobre-stats');
  if (statsEl) statObs.observe(statsEl);

  // ── HORIZONTAL STICKY SCROLL ──
  const outer = document.getElementById('projetosOuter');
  const wrap  = document.getElementById('projetosWrap');
  const track = document.getElementById('projetosTrack');
  const bar   = document.getElementById('progressBar');

  function getMax() { return Math.max(0, track.scrollWidth - wrap.clientWidth); }
  function setHeight() { outer.style.height = (window.innerHeight + getMax()) + 'px'; }

  setHeight();
  window.addEventListener('load', setHeight);
  window.addEventListener('resize', setHeight, { passive: true });

  window.addEventListener('scroll', () => {
    const max = getMax();
    if (max <= 0) return;
    const scrolled = -outer.getBoundingClientRect().top;
    const clamped  = Math.min(max, Math.max(0, scrolled));
    track.style.transform = `translateX(${-clamped}px)`;
    if (bar) bar.style.width = (clamped / max * 100) + '%';
  }, { passive: true });

  // drag/touch no track
  let dragging = false, dragX = 0, dragBase = 0;
  const getTX = () => { const m = new DOMMatrix(getComputedStyle(track).transform); return m.m41; };
  track.addEventListener('mousedown', e => { dragging=true; dragX=e.clientX; dragBase=getTX(); track.style.transition='none'; });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    const next = Math.max(-getMax(), Math.min(0, dragBase + e.clientX - dragX));
    track.style.transform = `translateX(${next}px)`;
    if (bar) bar.style.width = (Math.abs(next)/getMax()*100)+'%';
  });
  window.addEventListener('mouseup', () => { dragging=false; track.style.transition=''; });
  let touchX=0, touchBase=0;
  track.addEventListener('touchstart', e => { touchX=e.touches[0].clientX; touchBase=getTX(); track.style.transition='none'; }, { passive:true });
  track.addEventListener('touchmove', e => {
    const next = Math.max(-getMax(), Math.min(0, touchBase + e.touches[0].clientX - touchX));
    track.style.transform = `translateX(${next}px)`;
    if (bar) bar.style.width = (Math.abs(next)/getMax()*100)+'%';
  }, { passive:true });
  track.addEventListener('touchend', () => { track.style.transition=''; });

  // ── LIGHTBOX ──
  const projects = [
    // Card 0 — Fotos Aesthetic — 9 fotos internas
    {
      title: 'Fotos Aesthetic', cat: 'Fotografias',
      desc: 'Registros feitos ao longo da minha vida, fotos tratadas com capricho e olhar autoral.',
      local: 'Brasil', data: '2025-2026', equipamento: 'NikonD5100',
      photos: [
        { src:'img/WhatsApp Image 2026-05-21 at 20.58.14.jpeg', title:'Foto 1', info:'Campinas SP' },
        { src:'img/1000280637.jpg', title:'Foto 2', info:'Campinas SP' },
        { src:'img/1000280639.jpg', title:'Foto 3', info:'Campinas SP' },
        { src:'img/1000280642.jpg', title:'Foto 4', info:'Campinas SP' },
        { src:'img/1000280645.jpg', title:'Foto 5', info:'Campinas SP' },
        { src:'img/1000280647.jpg', title:'Foto 6', info:'Campinas SP' },
        { src:'img/1000280651.jpg', title:'Foto 7', info:'Campinas SP' },
        { src:'img/1000280657.jpg', title:'Foto 8', info:'Campinas SP' },
        { src:'img/1000280654.jpg', title:'Foto 9', info:'Campinas SP' },
      ]
    },
    // Card 1 — Filmmaking — 2 cards internos (vídeo)
    {
      title: 'Filmmaking', cat: 'Filmmaking',
      desc: 'Registros gravados até o momento, narrativas visuais com atenção ao movimento e à luz.',
      local: 'Brasil', data: '2026', equipamento: 'NikonD5100',
      photos: [
        { src:'img/1000280925.mp4', title:'Vídeo 1', info:'Produção · Nikon D5100', type:'video' },
        { src:'img/1000280929.mp4', title:'Vídeo 2', info:'Produção · Nikon D5100', type:'video' },
      ]
    },
    // Card 2 — Automotivo — 3 fotos internas
    {
      title: 'Automotivo', cat: 'Fotografias',
      desc: 'Registros fotográficos feitos nas pistas, adrenalina, máquinas e momentos únicos.',
      local: 'Brasil', data: '2026', equipamento: 'NikonD5100',
      photos: [
        { src:'img/WhatsApp Image 2026-05-21 at 20.58.16.jpeg', title:'Foto 1', info:'Kartódromo San Marino' },
        { src:'img/1000280627.jpg', title:'Foto 2', info:'Kartódromo San Marino' },
        { src:'img/1000280628.jpg', title:'Foto 3', info:'Kartódromo San Marino' },
      ]
    },
    // Card 3 — Retratos/Ensaios — 3 fotos internas
    {
      title: 'Retratos/Ensaios', cat: 'Fotografias',
      desc: 'Fotografias de retratos e ensaios, cada frame com intenção e cuidado.',
      local: 'Brasil', data: '2026', equipamento: 'NikonD5100',
      photos: [
        { src:'img/WhatsApp Image 2026-05-21 at 20.58.16 (1).jpeg', title:'Ensaio 1', info:'Senac Campinas' },
        { src:'img/1000271056.jpg', title:'Ensaio 2', info:'Senac Campinas' },
        { src:'img/1000280672.jpg', title:'Ensaio 3', info:'Campinas SP' },
      ]
    },
  ];

  const lightbox   = document.getElementById('lightbox');
  const lbContent  = document.getElementById('lbContent');
  const lbClose    = document.getElementById('lbClose');

  function closeLightbox() {
    lightbox.classList.remove('visible');
    setTimeout(() => { lightbox.style.display = 'none'; document.body.style.overflow = ''; }, 350);
  }

  function openLightbox(index) {
    const p = projects[index];
    lbContent.innerHTML = `
      <div class="lb-header">
        <span class="lb-cat">${p.cat}</span>
        <h2 class="lb-title">${p.title}</h2>
        <p class="lb-desc">${p.desc}</p>
      </div>
      <div class="lb-meta">
        <div class="lb-meta-item"><label>Local</label><span>${p.local}</span></div>
        <div class="lb-meta-item"><label>Data</label><span>${p.data}</span></div>
        <div class="lb-meta-item"><label>Equipamento</label><span>${p.equipamento}</span></div>
      </div>
      <div class="lb-grid">
        ${p.photos.map((ph, i) => ph.type === 'video' ? `
          <div class="lb-photo lb-video-card" data-src="${ph.src}">
            <div class="lb-video-thumb">
              <div class="lb-video-play-btn"><i class="fas fa-play"></i></div>
              <span class="lb-video-label">${ph.title}</span>
            </div>
            <div class="lb-photo-info">
              <strong>${ph.title}</strong>
              <span>${ph.info}</span>
            </div>
          </div>
        ` : `
          <div class="lb-photo">
            <img src="${ph.src}" alt="${ph.title}" loading="lazy" />
            <div class="lb-photo-info">
              <strong>${ph.title}</strong>
              <span>${ph.info}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // bind video card clicks → abrir player fullscreen (stopPropagation evita fechar o lightbox)
    lbContent.querySelectorAll('.lb-video-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        openVideoPlayer(card.dataset.src);
      });
    });

    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => lightbox.classList.add('visible'));
  }

  // ── VIDEO PLAYER FULLSCREEN ──
  const videoPlayer = document.getElementById('videoPlayer');
  const videoEl     = document.getElementById('videoEl');
  const videoClose  = document.getElementById('videoClose');

  function openVideoPlayer(src) {
    videoEl.src = src;
    videoPlayer.style.display = 'flex';
    requestAnimationFrame(() => videoPlayer.classList.add('visible'));
    videoEl.play();
  }

  function closeVideoPlayer() {
    videoEl.pause();
    videoEl.src = '';
    videoPlayer.classList.remove('visible');
    setTimeout(() => { videoPlayer.style.display = 'none'; }, 300);
  }

  videoClose.addEventListener('click', closeVideoPlayer);
  videoPlayer.addEventListener('click', e => { if (e.target === videoPlayer) closeVideoPlayer(); });

  // Escape: fecha o player se estiver aberto, senão fecha o lightbox
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (videoPlayer.style.display === 'flex') {
      closeVideoPlayer();
    } else {
      closeLightbox();
    }
  });

  document.querySelectorAll('.projeto-card:not(.card-behance)').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.index);
      if (!isNaN(idx)) openLightbox(idx);
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  // clique no fundo escuro do lightbox fecha — mas só se não for no conteúdo
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  // ── SMOOTH ANCHOR ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
  });

});