/**
 * main.js - Modern Interactive Portfolio Features
 * Bui Hoang Ha Portfolio
 */

(function () {
  'use strict';

  // --- Theme Toggle ---
  const THEME_KEY = 'portfolio_theme';

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeToggleIcons(theme);
  }

  function updateThemeToggleIcons(theme) {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach((btn) => {
      const sunIcon = btn.querySelector('.theme-icon-sun');
      const moonIcon = btn.querySelector('.theme-icon-moon');
      if (sunIcon && moonIcon) {
        if (theme === 'dark') {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
        } else {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'block';
        }
      }
    });
  }

  // Initialize theme immediately to prevent flash
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  document.addEventListener('DOMContentLoaded', () => {
    // Re-sync theme button icons once DOM is ready
    updateThemeToggleIcons(document.documentElement.getAttribute('data-theme') || 'light');

    // Theme toggle click handler
    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
      });
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('nav-open');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
        mobileMenuBtn.classList.toggle('is-active', isOpen);
      });

      // Close mobile menu on link click
      navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('nav-open');
          if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove('is-active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
          }
        });
      });
    }

    // Let visitors choose webmail when no mailto handler is configured.
    const emailDialog = document.getElementById('email-dialog');
    document.querySelectorAll('[data-open-email-dialog]').forEach((button) => {
      button.addEventListener('click', () => {
        if (emailDialog && typeof emailDialog.showModal === 'function') {
          emailDialog.showModal();
        } else {
          window.location.href = 'mailto:smithmerch2301@gmail.com';
        }
      });
    });

    // --- Copy Email to Clipboard with Toast ---
    const copyEmailBtns = document.querySelectorAll('.btn-copy-email');
    copyEmailBtns.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = btn.getAttribute('data-email') || 'smithmerch2301@gmail.com';
        try {
          await navigator.clipboard.writeText(email);
          showToast('Email copied to clipboard!');
          const originalText = btn.innerHTML;
          btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg> Copied!`;
          btn.classList.add('copied');
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('copied');
          }, 2000);
        } catch (err) {
          showToast('Failed to copy. ' + email);
        }
      });
    });

    // --- Scroll to Top Button ---
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    if (scrollTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          scrollTopBtn.classList.add('visible');
        } else {
          scrollTopBtn.classList.remove('visible');
        }
      });

      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // --- Active Link Highlight on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    if (sections.length && navAnchors.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              navAnchors.forEach((a) => {
                if (a.getAttribute('href') === `#${id}`) {
                  a.classList.add('active');
                } else {
                  a.classList.remove('active');
                }
              });
            }
          });
        },
        { threshold: 0.3 }
      );

      sections.forEach((s) => observer.observe(s));
    }
  });

  // --- Toast Notification Helper ---
  function showToast(message) {
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
})();
