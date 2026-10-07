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
