'use strict';
const scene = document.querySelector('#scene');
const head = document.querySelector('#head');
const pupils = document.querySelector('#pupils');
const greet = document.querySelector('#greet');
const greeting = document.querySelector('#greeting');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let frame = 0;
let timer;
let lastAutoGreeting = 0;
function sayHello() {
  scene.classList.add('greeting');
  greeting.textContent = 'Olá! Que bom ver-te por aqui.';
  clearTimeout(timer);
  timer = setTimeout(() => scene.classList.remove('greeting'), 3000);
}
greet.addEventListener('click', sayHello);
scene.addEventListener('pointermove', (event) => {
  if (reducedMotion.matches || event.pointerType === 'touch') return;
  if (frame) cancelAnimationFrame(frame);
  const { clientX, clientY } = event;
  frame = requestAnimationFrame(() => {
    const rect = scene.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (clientX - rect.left - rect.width / 2) / (rect.width / 2)));
    const y = Math.max(-1, Math.min(1, (clientY - rect.top - rect.height / 2) / (rect.height / 2)));
    head.style.transform = `translate(${x * 7}px, ${y * 3}px) rotate(${x * 5}deg)`;
    pupils.style.transform = `translate(${x * 5}px, ${y * 3}px)`;
    if (Math.abs(x) < .15 && Math.abs(y) < .3 && Date.now() - lastAutoGreeting > 7000) {
      lastAutoGreeting = Date.now();
      sayHello();
    }
    frame = 0;
  });
});
scene.addEventListener('pointerleave', () => {
  cancelAnimationFrame(frame);
  frame = 0;
  head.style.transform = '';
  pupils.style.transform = '';
});
reducedMotion.addEventListener('change', () => {
  head.style.transform = '';
  pupils.style.transform = '';
});

// Accessible navigation, project exploration and user preferences.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu() { navigation.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  navigation.classList.toggle('is-open', expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 701px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
const themeButton = document.querySelector('#theme-toggle');
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute('aria-label', theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro');
  themeButton.textContent = theme === 'light' ? '☾' : '☼';
}
let savedTheme;
try { savedTheme = localStorage.getItem('paula-theme'); } catch {}
applyTheme(savedTheme === 'light' ? 'light' : 'dark');
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  applyTheme(theme);
  try { localStorage.setItem('paula-theme', theme); } catch {}
});
const projectCards = [...document.querySelectorAll('.project')];
const filterButtons = [...document.querySelectorAll('[data-filter]')];
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let visible = 0;
  projectCards.forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) visible++;
  });
  document.querySelector('#project-count').textContent = `${visible} ${visible === 1 ? 'projeto' : 'projetos'}`;
}));
const projectDialog = document.querySelector('#project-dialog');
let lastProjectTrigger;
function openProject(card, trigger) {
  const image = card.querySelector('img');
  document.querySelector('#dialog-title').textContent = card.querySelector('h3').textContent;
  document.querySelector('#dialog-category').textContent = card.querySelector('.project-meta').textContent;
  document.querySelector('#dialog-description').textContent = card.querySelector('p').textContent;
  document.querySelector('#dialog-tech').textContent = card.querySelector('.technology').textContent;
  const dialogImage = document.querySelector('#dialog-image');
  dialogImage.src = image.src;
  dialogImage.alt = image.alt;
  const links = document.querySelector('#dialog-links');
  links.replaceChildren(...[...card.querySelectorAll('.project-links a')].map(link => link.cloneNode(true)));
  lastProjectTrigger = trigger;
  projectDialog.showModal();
  document.body.classList.add('dialog-open');
}
projectCards.forEach(card => {
  const button = card.querySelector('.project-detail');
  button.setAttribute('aria-label', `Explorar ${card.querySelector('h3').textContent}`);
  button.addEventListener('click', () => openProject(card, button));
  card.addEventListener('keydown', event => {
    if (event.target === card && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault(); openProject(card, card);
    }
  });
});
projectDialog.querySelector('.dialog-close').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('click', event => {
  const rect = projectDialog.getBoundingClientRect();
  if (event.target === projectDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) projectDialog.close();
});
projectDialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  lastProjectTrigger?.focus();
});
const copyButton = document.querySelector('#copy-email');
copyButton.addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('paulamsr@hotmail.com');
    status.textContent = 'Email copiado.';
  } catch { status.textContent = 'Seleciona e copia o email apresentado acima.'; }
});
let scrollFrame = 0;
function updateProgress() {
  const range = document.documentElement.scrollHeight - window.innerHeight;
  document.querySelector('.reading-progress').style.width = `${range > 0 ? Math.min(100, window.scrollY / range * 100) : 0}%`;
  scrollFrame = 0;
}
window.addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress); }, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();
if ('IntersectionObserver' in window) {
  const activeSections = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => activeSections.set(entry.target.id, entry.isIntersecting));
    const current = [...activeSections].find(([, visible]) => visible)?.[0];
    navigation.querySelectorAll('a').forEach(link => {
      const active = link.hash === `#${current}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -60% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
document.querySelector('.hero .button').addEventListener('pointerenter', () => scene.classList.add('pointing'));
document.querySelector('.hero .button').addEventListener('pointerleave', () => scene.classList.remove('pointing'));
