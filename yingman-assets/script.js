(function () {
  'use strict';

  // ===== Header scroll effect =====
  const header = document.getElementById('siteHeader');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ===== Mobile menu toggle =====
  const toggleBtn = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  toggleBtn.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggleBtn.textContent = isOpen ? '✕' : '☰';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.textContent = '☰';
    });
  });

  // ===== Intersection Observer for reveal animations =====
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback for older browsers
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ===== Search placeholder rotation =====
  const searchInput = document.getElementById('animeSearch');
  const placeholders = [
    '搜索动漫、漫剧、角色……',
    '试试「葬送的芙莉莲」',
    '试试「咒术回战」',
    '试试「迷宫饭」',
    '试试「我推的孩子」'
  ];
  let placeholderIndex = 0;

  setInterval(function () {
    if (document.activeElement !== searchInput && searchInput.value === '') {
      placeholderIndex = (placeholderIndex + 1) % placeholders.length;
      searchInput.setAttribute('placeholder', placeholders[placeholderIndex]);
    }
  }, 4000);

  // ===== Smooth scroll for anchor links (native handles it, but ensure offset) =====
  // CSS scroll-behavior: smooth already handles this with sticky header offset
  // Adding scroll-margin via CSS on sections would be ideal; using JS fallback:
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 72;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== 悬浮引流按钮关闭逻辑 =====
  const floatPromo = document.getElementById('floatPromo');
  const floatPromoClose = document.getElementById('floatPromoClose');
  if (floatPromo && floatPromoClose) {
    // 若用户曾关闭过，则本次会话不再显示
    if (sessionStorage.getItem('floatPromoClosed') === '1') {
      floatPromo.style.display = 'none';
    }
    floatPromoClose.addEventListener('click', function () {
      floatPromo.style.display = 'none';
      sessionStorage.setItem('floatPromoClosed', '1');
    });
  }

})();
