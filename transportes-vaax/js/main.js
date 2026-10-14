'use strict';
// Native interactions: no libraries, no build step, no network dependency.
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
const header = document.querySelector('.header');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function closeMenu() {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  menu.classList.toggle('open', open);
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(); });
window.matchMedia('(min-width: 1101px)').addEventListener('change', closeMenu);
let scrollQueued = false;
function updateScroll() {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  document.querySelector('.scroll-progress').style.width = `${distance > 0 ? window.scrollY / distance * 100 : 0}%`;
  header.classList.toggle('scrolled', window.scrollY > 30);
  scrollQueued = false;
}
window.addEventListener('scroll', () => {
  if (!scrollQueued) { requestAnimationFrame(updateScroll); scrollQueued = true; }
}, { passive: true });
window.addEventListener('resize', updateScroll);
updateScroll();
if ('IntersectionObserver' in window) {
  document.body.classList.add('js-ready');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
  const sections = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        menu.querySelectorAll('a:not(.nav-cta)').forEach(link => {
          const active = link.hash === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => sections.observe(section));
}
const slides = [
  { image: 'flotilla-2.webp', alt: 'Vista lateral de una unidad de transporte de personal VAAX', title: 'Conectamos tu equipo', description: 'Movilidad de personal para tu operación diaria.' },
  { image: 'flotilla-1.webp', alt: 'Unidad compacta de transporte de personal de la presentación VAAX', title: 'Una solución a tu medida', description: 'Propuestas de transporte según las necesidades de tu empresa.' },
  { image: 'flotilla-3.webp', alt: 'Autobús blanco incluido en la presentación oficial de Transportes VAAX', title: 'Juntos hacia el mismo destino', description: 'Opciones para acompañar a equipos de distintos tamaños.' }
];
let currentSlide = 0;
let slideTimer;
const fleetImage = document.querySelector('#fleet-image');
function changeSlide(direction) {
  fleetRegion.style.setProperty('--slide-direction', direction < 0 ? -1 : 1);
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  clearTimeout(slideTimer);
  const render = () => {
    const slide = slides[currentSlide];
    fleetImage.src = `assets/images/${slide.image}`;
    fleetImage.alt = slide.alt;
    document.querySelector('#fleet-name').textContent = slide.title;
    document.querySelector('#fleet-description').textContent = slide.description;
    document.querySelector('#fleet-count').textContent = `0${currentSlide + 1} / 03`;
    fleetImage.classList.remove('changing');
    document.querySelectorAll('.fleet-dot').forEach((dot, index) => {
      if (index === currentSlide) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  };
  if (reducedMotion.matches) render();
  else { fleetImage.classList.add('changing'); slideTimer = setTimeout(render, 180); }
}
document.querySelector('#fleet-prev').addEventListener('click', () => changeSlide(-1));
document.querySelector('#fleet-next').addEventListener('click', () => changeSlide(1));
const fleetRegion = document.querySelector('.fleet-stage');
fleetRegion.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault(); changeSlide(event.key === 'ArrowRight' ? 1 : -1);
  }
});
// Integration point: replace this handler when a real backend is connected.
const quoteForm = document.querySelector('#quote-form');
quoteForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!quoteForm.reportValidity()) return;
  document.querySelector('#form-status').textContent = 'El envío todavía no está habilitado. No se ha enviado ningún mensaje. Tus datos permanecen en el formulario; puedes contactarnos por teléfono o WhatsApp.';
});
quoteForm.querySelector('[type="submit"]').disabled = false;
document.querySelector('#year').textContent = new Date().getFullYear();

// Pause repeating decorative motion when its section leaves the viewport.
if ('IntersectionObserver' in window) {
  const motionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('motion-paused', !entry.isIntersecting));
  });
  document.querySelectorAll('.hero, .security, .fleet').forEach(section => motionObserver.observe(section));
}


// Upgrade native details to an exclusive, accessible animated accordion.
// Without JavaScript the original details/name interaction remains available.
const accordionItems = [...document.querySelectorAll('.service-accordions details')].map((detail, index) => {
  const summary = detail.querySelector('summary');
  const item = document.createElement('div');
  item.className = 'accordion-item';
  const heading = document.createElement('h3');
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'accordion-trigger';
  trigger.id = `service-trigger-${index}`;
  trigger.setAttribute('aria-controls', `service-panel-${index}`);
  trigger.innerHTML = summary.innerHTML;
  heading.append(trigger);
  const panel = document.createElement('div');
  panel.className = 'accordion-panel';
  panel.id = `service-panel-${index}`;
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-labelledby', trigger.id);
  const inner = document.createElement('div');
  inner.className = 'accordion-panel-inner';
  inner.append(detail.querySelector('.details-content'));
  panel.append(inner);
  item.append(heading, panel);
  const open = detail.open;
  item.classList.toggle('is-open', open);
  trigger.setAttribute('aria-expanded', String(open));
  panel.inert = !open;
  detail.replaceWith(item);
  return { item, trigger, panel };
});
accordionItems.forEach(({ item, trigger }, index) => {
  trigger.addEventListener('click', () => {
    const shouldOpen = !item.classList.contains('is-open');
    accordionItems.forEach(entry => {
      const open = entry.item === item && shouldOpen;
      entry.item.classList.toggle('is-open', open);
      entry.trigger.setAttribute('aria-expanded', String(open));
      entry.panel.inert = !open;
    });
  });
  trigger.addEventListener('keydown', event => {
    let target;
    if (event.key === 'ArrowDown') target = (index + 1) % accordionItems.length;
    if (event.key === 'ArrowUp') target = (index - 1 + accordionItems.length) % accordionItems.length;
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = accordionItems.length - 1;
    if (target !== undefined) { event.preventDefault(); accordionItems[target].trigger.focus(); }
  });
});

// Manual pagination and touch gestures; vertical scrolling remains native.
document.querySelectorAll('.fleet-dot').forEach(dot => {
  dot.addEventListener('click', () => {
    const target = Number(dot.dataset.slide);
    if (target !== currentSlide) changeSlide(target - currentSlide);
  });
});
let fleetTouch;
fleetRegion.addEventListener('pointerdown', event => {
  if (event.pointerType === 'touch') fleetTouch = { x: event.clientX, y: event.clientY };
});
fleetRegion.addEventListener('pointerup', event => {
  if (!fleetTouch) return;
  const dx = event.clientX - fleetTouch.x;
  const dy = event.clientY - fleetTouch.y;
  fleetTouch = null;
  if (Math.abs(dx) > 55 && Math.abs(dy) < 45) changeSlide(dx < 0 ? 1 : -1);
});
fleetRegion.addEventListener('pointercancel', () => { fleetTouch = null; });

// Small, bounded image parallax on desktop; one animation frame per scroll.
const parallaxImages = [...document.querySelectorAll('.hero-photo, .photo-window>img')];
let parallaxFrame = false;
function updateParallax() {
  parallaxImages.forEach(image => {
    let offset = 0;
    if (!reducedMotion.matches && window.innerWidth > 800) {
      const bounds = image.parentElement.getBoundingClientRect();
      if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
        offset = Math.max(-12, Math.min(12, (window.innerHeight / 2 - bounds.top - bounds.height / 2) * 0.035));
      }
    }
    image.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`);
  });
  parallaxFrame = false;
}
function queueParallax() {
  if (!parallaxFrame) { parallaxFrame = true; requestAnimationFrame(updateParallax); }
}
window.addEventListener('scroll', queueParallax, { passive: true });
window.addEventListener('resize', queueParallax);
reducedMotion.addEventListener('change', queueParallax);
queueParallax();
