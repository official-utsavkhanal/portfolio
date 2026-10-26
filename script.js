const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const themeToggle = document.getElementById('themeToggle');
const header = document.querySelector('.site-header');
const navLinks = [...document.querySelectorAll('.nav a')];
const sections = [...document.querySelectorAll('main section[id]')];

menuToggle?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

navLinks.forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const savedTheme = localStorage.getItem('utsav-theme');
if (savedTheme === 'dark') document.body.classList.add('dark');

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('utsav-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

function syncNav() {
  header.classList.toggle('scrolled', window.scrollY > 10);
  let current = 'home';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', syncNav, { passive: true });
syncNav();

document.getElementById('year').textContent = new Date().getFullYear();

// Reliable back-to-top control
const backToTop = document.getElementById('backToTop');

function syncBackToTop() {
  if (!backToTop) return;
  backToTop.classList.toggle('show', window.scrollY > 350);
}

backToTop?.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', syncBackToTop, { passive: true });
syncBackToTop();

// Hero typing animation
const typingPrefix = document.getElementById('typingPrefix');
const typingName = document.getElementById('typingName');

function runHeroTyping() {
  if (!typingPrefix || !typingName) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const prefixText = "Hi, I'm ";
  const nameText = 'Utsav Khanal';

  if (reduceMotion) {
    typingPrefix.textContent = prefixText;
    typingName.textContent = nameText;
    typingName.classList.add('typing-complete');
    return;
  }

  typingPrefix.textContent = '';
  typingName.textContent = '';

  let prefixIndex = 0;
  let nameIndex = 0;

  const typePrefix = () => {
    if (prefixIndex < prefixText.length) {
      typingPrefix.textContent += prefixText[prefixIndex++];
      setTimeout(typePrefix, 85);
      return;
    }
    setTimeout(typeName, 180);
  };

  const typeName = () => {
    if (nameIndex < nameText.length) {
      typingName.textContent += nameText[nameIndex++];
      setTimeout(typeName, 105);
      return;
    }
    typingName.classList.add('typing-complete');
  };

  setTimeout(typePrefix, 350);
}

runHeroTyping();
