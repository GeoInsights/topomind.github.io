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

  // ===== Product contact assistant =====
  const chatWidget = document.querySelector('[data-product-chat-widget]');
  const chatLauncher = document.querySelector('[data-product-chat-toggle]');
  const chatMessages = document.querySelector('[data-product-chat-messages]');
  const chatForm = document.querySelector('[data-product-chat-form]');
  const chatInput = chatForm?.querySelector('input');

  const chatPrompts = {
    product: '介紹詩語山河',
    pilot: '學校可以怎樣試點',
    contact: '給我聯繫方式'
  };

  const chatReplies = [
    {
      keywords: ['產品', '介紹', '詩語山河', 'praise', '普通話', '詩詞'],
      text: '詩語山河是 TopoMind 的詩詞普通話 AI 課堂，結合詩詞地圖、PRAISE 自研普通話語音聲學評價模型、AI 跟讀糾音、小詩仙陪學與教師班級管理，幫助學生在文化情境中學普通話。'
    },
    {
      keywords: ['試點', '學校', '課堂', '老師', '合作', 'pilot'],
      text: '學校試點可以從一個班級或一個普通話學習單元開始。我們可以協助梳理課堂流程、教師後台使用方式、學生語音數據管理和試點評估指標。'
    },
    {
      keywords: ['聯繫', '聯絡', 'email', '郵箱', '方式', 'contact'],
      text: '你可以電郵聯繫 TopoMind：info@topomind.hk。請簡單說明你的學校或機構、學生年級、預計試點場景，我們會跟進。'
    }
  ];

  const addChatBubble = (text, type) => {
    if (!chatMessages) {
      return;
    }

    const bubble = document.createElement('p');
    bubble.className = `product-chat-bubble ${type}`;
    bubble.textContent = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const resetProductChat = () => {
    if (!chatMessages) {
      return;
    }

    chatMessages.innerHTML = '';
    addChatBubble('你好，我是詩語山河的 AI 聯繫助手。你可以問產品介紹、學校試點、教師使用方式，或直接索取聯繫方式。', 'assistant');
  };

  const openProductChat = () => {
    if (!chatWidget || !chatLauncher || !chatInput) {
      return;
    }

    chatWidget.classList.add('open');
    chatLauncher.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => chatInput.focus());
  };

  const closeProductChat = () => {
    if (!chatWidget || !chatLauncher) {
      return;
    }

    chatWidget.classList.remove('open');
    chatLauncher.setAttribute('aria-expanded', 'false');
  };

  const getProductReply = (message) => {
    const normalized = message.trim().toLowerCase();
    const match = chatReplies.find(reply => reply.keywords.some(keyword => normalized.includes(keyword.toLowerCase())));
    return match ? match.text : '我可以介紹詩語山河的產品能力、學校試點方式、教師管理後台和聯繫方式。你也可以直接電郵 info@topomind.hk。';
  };

  const sendProductMessage = (message) => {
    const cleanMessage = message.trim();
    if (!cleanMessage) {
      return;
    }

    addChatBubble(cleanMessage, 'user');
    addChatBubble(getProductReply(cleanMessage), 'assistant');
  };

  resetProductChat();

  document.querySelectorAll('[data-product-chat-open]').forEach(trigger => {
    trigger.addEventListener('click', openProductChat);
  });

  chatLauncher?.addEventListener('click', () => {
    if (chatWidget?.classList.contains('open')) {
      closeProductChat();
    } else {
      openProductChat();
    }
  });

  document.querySelectorAll('[data-product-chat-close]').forEach(button => {
    button.addEventListener('click', closeProductChat);
  });

  document.querySelectorAll('[data-product-chat-prompt]').forEach(button => {
    button.addEventListener('click', () => {
      openProductChat();
      sendProductMessage(chatPrompts[button.dataset.productChatPrompt] || '');
    });
  });

  chatForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    sendProductMessage(chatInput?.value || '');
    if (chatInput) {
      chatInput.value = '';
    }
  });

});
