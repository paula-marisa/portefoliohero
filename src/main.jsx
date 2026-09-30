import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import './styles.css';

const zones = {
  left: { title: 'Hey, over there?', text: 'Curious what I am building?', state: 'left' },
  center: { title: 'Hey, it’s you!', text: 'Welcome to my portfolio.', state: 'center' },
  right: { title: 'Something caught your eye?', text: 'Have a look around.', state: 'right' }
};

function Hero() {
  const [zone, setZone] = useState('center');
  const [sequence, setSequence] = useState('work');
  const raf = useRef(0);
  const pending = useRef('center');

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const selectZone = (next) => {
    pending.current = next;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      setZone(next);
      setSequence(next === 'center' ? 'greet' : next);
      if (next !== 'center') {
        window.clearTimeout(selectZone.timer);
        selectZone.timer = window.setTimeout(() => setSequence('work'), 2300);
      } else {
        window.clearTimeout(selectZone.timer);
        selectZone.timer = window.setTimeout(() => setSequence('point'), 1500);
      }
    });
  };

  const message = zones[zone];

  return (
    <main className="hero">
      <nav className="nav">
        <div className="brand">PR<span>.</span></div>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero-content">
        <div className="intro">
          <p className="eyebrow">COMPUTER ENGINEER</p>
          <h1>Paula<br /><span>Rodrigues</span></h1>
          <p className="lead">Exploring Software, Data, Web & Technology.</p>
          <p className="hint">Move around to say hello <span>↔</span></p>
        </div>

        <div
          className="character-stage"
          onMouseMove={(e) => {
            const x = e.currentTarget.getBoundingClientRect();
            const relative = (e.clientX - x.left) / x.width;
            selectZone(relative < 0.34 ? 'left' : relative > 0.66 ? 'right' : 'center');
          }}
          onMouseLeave={() => selectZone('center')}
          onClick={() => selectZone('center')}
        >
          <div className="glow" />
          <div className={`character ${sequence}`}>
            <div className="thought">working...</div>
            <div className="hair" />
            <div className="head"><div className="face"><i /><i /><b /></div></div>
            <div className="neck" />
            <div className="body">
              <div className="arm left-arm" /><div className="arm right-arm" />
              <div className="laptop"><div className="screen">{"</>"}</div><div className="base" /></div>
            </div>
            <div className="headphones"><span /><span /></div>
            <div className="wave">👋</div>
            <div className="point">↓</div>
          </div>
          <div className="stage-floor" />
        </div>

        <aside className="message">
          <span className="message-dot" />
          <p className="message-title">{message.title}</p>
          <p>{message.text}</p>
          <div className="socials">
            <a href="https://github.com/paula-marisa" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a>
            <a href="https://linkedin.com/in/paulasrodrigues" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a>
          </div>
        </aside>
      </section>

      <a className="explore" href="#work">
        <span>Explore my work</span><ArrowDown size={17}/>
      </a>
      <div className="mobile-note">Tap the character to say hello</div>
    </main>
  );
}

function App() {
  return <><Hero /><section id="work" className="dummy-section"><p>Selected work</p><h2>The rest of the portfolio comes next.</h2></section><section id="about" className="dummy-section"><p>About</p><h2>Computer Engineering + Healthcare background.</h2></section><section id="contact" className="dummy-section"><p>Contact</p><h2>Let’s build something.</h2></section></>;
}

createRoot(document.getElementById('root')).render(<App />);
