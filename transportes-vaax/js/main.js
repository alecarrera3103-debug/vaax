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
// mailto opens the user's mail client; nothing is sent or stored by this site.
document.querySelector('#quote-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const fields = new FormData(form);
  const value = name => String(fields.get(name) || '').trim();
  const body = [
    'Hola, equipo de Transportes VAAX:', '', 'Quisiera solicitar una cotización de transporte de personal.', '',
    `Nombre: ${value('nombre')}`, `Empresa: ${value('empresa')}`, `Correo: ${value('correo')}`,
    `Teléfono: ${value('telefono')}`, `Pasajeros aproximados: ${value('pasajeros')}`, '',
    'Necesidades del servicio:', value('mensaje'), '', 'Gracias.'
  ].join('\r\n');
  const subject = `Solicitud de cotización — ${value('empresa').replace(/[\r\n]/g, ' ')}`;
  const mailto = `mailto:juan.rdz@transportesvaax.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector('#form-status').textContent = 'Solicitud preparada. Completa el envío en tu aplicación de correo. Si no se abre, escribe a juan.rdz@transportesvaax.com. Tus datos permanecen en el formulario.';
  window.location.href = mailto;
});
document.querySelector('#year').textContent = new Date().getFullYear();
