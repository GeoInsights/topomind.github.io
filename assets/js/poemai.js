document.addEventListener('DOMContentLoaded', function() {
  // ===== Header scroll effect =====
  const header = document.querySelector('.header');
  let lastScrollY = 0;

  function updateHeader() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ===== Smooth scroll navigation =====
  document.querySelectorAll('[data-scroll-to]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-scroll-to');
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== Hero animations =====
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroTagline = document.querySelector('.hero-tagline');
  const heroCta = document.querySelector('.hero-cta');

  if (heroTitle) {
    setTimeout(() => heroTitle.classList.add('revealed'), 100);
  }
  if (heroSubtitle) {
    setTimeout(() => heroSubtitle.classList.add('revealed'), 500);
  }
  if (heroTagline) {
    setTimeout(() => heroTagline.classList.add('revealed'), 750);
  }
  if (heroCta) {
    setTimeout(() => heroCta.classList.add('revealed'), 900);
  }

  // ===== Scroll reveal with IntersectionObserver =====
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || '0', 10);
        setTimeout(() => {
          el.classList.add('revealed');
        }, delay);
        revealObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ===== Feature cards observer =====
  const featureCards = document.querySelectorAll('.feature-card');

  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || '0', 10);
        setTimeout(() => {
          el.classList.add('revealed');
        }, delay);
        featureObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.2
  });

  featureCards.forEach(el => {
    featureObserver.observe(el);
  });

  // ===== Showcase items observer =====
  const showcaseItems = document.querySelectorAll('.showcase-item');

  const showcaseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || '0', 10);
        setTimeout(() => {
          el.classList.add('revealed');
        }, delay);
        showcaseObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.15
  });

  showcaseItems.forEach(el => {
    showcaseObserver.observe(el);
  });

  // ===== CTA section staggered reveal =====
  const ctaSection = document.querySelector('.cta');
  if (ctaSection) {
    const ctaObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.querySelectorAll('.scroll-reveal');
          children.forEach((child, i) => {
            setTimeout(() => {
              child.classList.add('revealed');
            }, i * 150);
          });
          ctaObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });
    ctaObserver.observe(ctaSection);
  }

  // ===== Concept section observer =====
  const conceptSection = document.querySelector('.concept');
  if (conceptSection) {
    const conceptObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const reveals = entry.target.querySelectorAll('.scroll-reveal');
          reveals.forEach(el => el.classList.add('revealed'));
          conceptObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });
    conceptObserver.observe(conceptSection);
  }

  // ===== Button hover effects (fallback for CSS) =====
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.backgroundColor = '#B03D28';
    });
    btn.addEventListener('mouseleave', function() {
      this.style.backgroundColor = '';
    });
  });

});
