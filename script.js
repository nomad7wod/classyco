/* ================================================
   CLASSY & CO — JavaScript
   Vanilla JS · Sin dependencias externas
   ================================================ */

'use strict';

/* ================================================
   1. NÚMERO DE WHATSAPP
   Cambia SOLO este valor. Formato: código de país + número.
   Ejemplo Peru: 51987654321
   ================================================ */
const WA_NUMBER = '51922142227';


/* ================================================
   2. HELPER: actualizar todos los links de WhatsApp
   dinámicamente en caso de cambiar el número.
   ================================================ */
function updateWhatsAppLinks() {
  if (WA_NUMBER === 'NUMERO_AQUI') return; // Aún no configurado

  document.querySelectorAll('a[href*="wa.me/NUMERO_AQUI"]').forEach(link => {
    link.href = link.href.replace('NUMERO_AQUI', WA_NUMBER);
  });
}


/* ================================================
   3. HEADER — scroll effect
   ================================================ */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Estado inicial
}


/* ================================================
   4. MENÚ MÓVIL — toggle hamburguesa
   ================================================ */
function initMobileMenu() {
  const toggle  = document.getElementById('navToggle');
  const nav     = document.getElementById('nav');
  const overlay = document.getElementById('navOverlay');

  if (!toggle || !nav || !overlay) return;

  const openMenu = () => {
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú');
    nav.classList.add('is-open');
    overlay.classList.add('is-visible');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    nav.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    toggle.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  // Cerrar al hacer click en overlay
  overlay.addEventListener('click', closeMenu);

  // Cerrar al hacer click en un link del menú
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) closeMenu();
  });
}


/* ================================================
   5. NAVEGACIÓN ACTIVA — highlight del link actual
   ================================================ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks  = document.querySelectorAll('.nav__link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle(
              'active',
              href === `#${entry.target.id}`
            );
          });
        }
      });
    },
    {
      rootMargin: `-${getComputedStyle(document.documentElement)
        .getPropertyValue('--header-h')
        .trim()} 0px -60% 0px`,
      threshold: 0,
    }
  );

  sections.forEach(sec => observer.observe(sec));
}


/* ================================================
   6. REVEAL ON SCROLL — animación de entrada
   ================================================ */
function initReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  // Si el navegador no soporta IntersectionObserver, mostrar todo
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Solo anima una vez
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach(el => observer.observe(el));
}


/* ================================================
   7. SMOOTH SCROLL — para links internos
   ================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href').slice(1);
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });

      // Actualizar URL sin recargar
      history.pushState(null, '', `#${targetId}`);
    });
  });
}


/* ================================================
   8. TICKER — duplicar para loop infinito
   ================================================ */
function initTicker() {
  const track = document.querySelector('.ticker__track');
  if (!track) return;

  // Duplicar contenido para que el loop sea continuo
  track.innerHTML += track.innerHTML;
}


/* ================================================
   9. PRODUCTO QUICK WHATSAPP — tracking básico
   (mensaje de consola para confirmar clics)
   ================================================ */
function initProductTracking() {
  document.querySelectorAll('.product-card__quick-btn, .product-card__footer .btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = btn.closest('.product-card');
      if (!card) return;
      const name = card.querySelector('.product-card__name')?.textContent || 'Producto';
      console.log(`[Classy & Co] Click en: ${name}`);
    });
  });
}


/* ================================================
   10. LAZY IMAGES — agregar data-reveal a cards
   ================================================ */
function addRevealAttributes() {
  // Agregar reveal a las product cards con delay escalonado
  document.querySelectorAll('.product-card').forEach((card, i) => {
    card.setAttribute('data-reveal', '');
    const delay = (i % 4) + 1;
    if (delay > 1) card.setAttribute('data-reveal-delay', delay);
  });

  // Feature cards
  document.querySelectorAll('.feature-card').forEach((card, i) => {
    card.setAttribute('data-reveal', '');
    if (i > 0) card.setAttribute('data-reveal-delay', i);
  });

  // Payment cards
  document.querySelectorAll('.payment-card').forEach((card, i) => {
    card.setAttribute('data-reveal', '');
    card.setAttribute('data-reveal-delay', i + 1);
  });

  // Section headers
  document.querySelectorAll('.section__header').forEach(el => {
    el.setAttribute('data-reveal', '');
  });

  // Brand story media
  document.querySelectorAll('.brand-story__media, .brand-story__content').forEach(el => {
    el.setAttribute('data-reveal', '');
  });
}


/* ================================================
   11. INIT — ejecutar cuando el DOM esté listo
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {
  updateWhatsAppLinks();
  initHeader();
  initMobileMenu();
  initActiveNav();
  initSmoothScroll();
  initTicker();
  addRevealAttributes();   // Primero agrega los atributos
  initReveal();            // Luego observa
  initProductTracking();

  console.log('%cCLASSY & CO', 'font-size:18px;font-weight:bold;color:#161212;');
  console.log('%cStay Active. Stay Classy.', 'font-size:11px;color:#9C8D7C;letter-spacing:2px;');
});
