import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScene } from './scene.js';
import { createPetalRain } from './petal-rain.js';
import { mountProjectSections } from './render-projects.js';
import { mountGameSection } from './render-games.js';
import { initSitePreviews } from './site-preview.js';
import { getLang, initLanguageSwitcher } from './i18n.js';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let sceneApi = null;
let petalRainApi = null;

function initNavigation() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const links = nav.querySelectorAll('a');

  const closeMenu = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      header.classList.toggle('scrolled', self.scroll() > 40);
    },
  });
}

function initHeroAnimations() {
  if (prefersReducedMotion) return;

  gsap.from('.hero-content > *:not(.hero-title)', {
    y: 40,
    opacity: 0,
    duration: 1.1,
    stagger: 0.14,
    ease: 'power3.out',
    delay: 0.3,
  });

  gsap.from('.hero-meta', {
    opacity: 0,
    x: 20,
    duration: 1,
    delay: 0.9,
    ease: 'power2.out',
  });

  document.querySelectorAll('[data-split]').forEach((line, index) => {
    gsap.from(line, {
      yPercent: 110,
      opacity: 0,
      duration: 1.15,
      delay: 0.45 + index * 0.12,
      ease: 'power4.out',
    });
  });
}

function initRevealAnimations() {
  if (prefersReducedMotion) return;

  gsap.utils.toArray('[data-reveal]').forEach((el, index) => {
    gsap.from(el, {
      y: 56,
      opacity: 0,
      duration: 1,
      delay: (index % 3) * 0.05,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  gsap.utils.toArray('.section-header').forEach((el) => {
    gsap.from(el.children, {
      y: 32,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    });
  });
}

function initPerformanceBars() {
  if (prefersReducedMotion) return;

  gsap.utils.toArray('.perf-bar-fill').forEach((bar) => {
    const width = bar.dataset.width || '90';
    gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: width / 100,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bar.closest('.perf-grid, .featured-project, .project-card'),
          start: 'top 85%',
        },
      }
    );
  });
}

function initAnimatedCounters() {
  document.querySelectorAll('[data-animate-value]').forEach((el) => {
    const target = parseFloat(el.dataset.animateValue);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const isHero = el.closest('.hero');

    if (prefersReducedMotion) {
      el.textContent = `${target.toFixed(decimals)}${suffix}`;
      return;
    }

    const counter = { value: 0 };
    const tweenConfig = {
      value: target,
      duration: isHero ? 1.8 : 1.6,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `${counter.value.toFixed(decimals)}${suffix}`;
      },
    };

    if (isHero) {
      gsap.to(counter, { ...tweenConfig, delay: 1.1 });
    } else {
      tweenConfig.scrollTrigger = {
        trigger: el,
        start: 'top 90%',
        once: true,
      };
      gsap.to(counter, tweenConfig);
    }
  });
}

function initCardTilt() {
  if (prefersReducedMotion || window.matchMedia('(max-width: 960px)').matches) return;

  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateY: x * 10,
        rotateX: -y * 10,
        transformPerspective: 900,
        duration: 0.4,
        ease: 'power2.out',
      });

      const glow = card.querySelector('.project-card-glow');
      if (glow) {
        gsap.to(glow, {
          opacity: 0.9,
          x: x * 30,
          y: y * 30,
          duration: 0.35,
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'power3.out',
      });

      const glow = card.querySelector('.project-card-glow');
      if (glow) {
        gsap.to(glow, { opacity: 0, x: 0, y: 0, duration: 0.5 });
      }
    });
  });

  document.querySelectorAll('[data-tilt-subtle]').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, { rotateY: x * 5, rotateX: -y * 5, duration: 0.35 });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5 });
    });
  });
}

function initMagneticElements() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('.btn-primary, .btn-ghost, .contact-email--magnetic').forEach((el) => {
    el.addEventListener('mousemove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.35,
        ease: 'power2.out',
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.55)' });
    });
  });
}

function initStackChipStagger() {
  if (prefersReducedMotion) return;

  gsap.utils.toArray('.stack-chip-row').forEach((row) => {
    gsap.from(row.querySelectorAll('.stack-chip'), {
      y: 12,
      opacity: 0,
      duration: 0.5,
      stagger: 0.04,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: row,
        start: 'top 88%',
      },
    });
  });
}

function initCursorGlow() {
  if (prefersReducedMotion || window.matchMedia('(max-width: 960px)').matches) return;

  const glow = document.querySelector('.cursor-glow');
  if (!glow) return;

  const move = (event) => {
    gsap.to(glow, {
      x: event.clientX,
      y: event.clientY,
      duration: 0.45,
      ease: 'power2.out',
    });
  };

  window.addEventListener('mousemove', move, { passive: true });

  document.querySelectorAll('a, button, [data-hover-card], [data-hover-lift]').forEach((el) => {
    el.addEventListener('mouseenter', () => glow.classList.add('is-active'));
    el.addEventListener('mouseleave', () => glow.classList.remove('is-active'));
  });
}

function initCardLinkHover() {
  document.querySelectorAll('.card-link--animated').forEach((link) => {
    link.addEventListener('mouseenter', () => {
      if (prefersReducedMotion) return;
      gsap.to(link, { x: 6, color: '#e86b4a', duration: 0.3 });
    });
    link.addEventListener('mouseleave', () => {
      gsap.to(link, { x: 0, duration: 0.35 });
    });
  });
}

function initFeaturedParallax() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('[data-featured-parallax]').forEach((visual) => {
    const img = visual.querySelector('.project-preview__img');
    if (!img) return;

    visual.addEventListener('mousemove', (event) => {
      const rect = visual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(img, {
        x: x * 12,
        y: y * 12,
        scale: 0.58,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
    visual.addEventListener('mouseleave', () => {
      gsap.to(img, {
        x: 0,
        y: 0,
        scale: 0.52,
        duration: 0.6,
        ease: 'power3.out',
      });
    });
  });
}

function initSkillListHover() {
  document.querySelectorAll('.skill-list li').forEach((item) => {
    item.addEventListener('mouseenter', () => {
      if (prefersReducedMotion) return;
      gsap.to(item, { x: 8, color: 'rgba(245, 242, 237, 0.95)', duration: 0.25 });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(item, { x: 0, color: 'rgba(245, 242, 237, 0.68)', duration: 0.3 });
    });
  });
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;

      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });
}

function initYear() {
  document.getElementById('year').textContent = String(new Date().getFullYear());
}

function initBackgroundHover() {
  if (prefersReducedMotion) return;

  window.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;

    gsap.to('.orb-a', {
      x: x * 40,
      y: y * 25,
      duration: 0.8,
      ease: 'power2.out',
    });
    gsap.to('.orb-b', {
      x: x * -30,
      y: y * -20,
      duration: 0.9,
      ease: 'power2.out',
    });
    gsap.to('.orb-c', {
      x: x * 20,
      y: y * 35,
      duration: 0.7,
      ease: 'power2.out',
    });
  }, { passive: true });
}

function initParallax() {
  if (!sceneApi) return;

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      sceneApi.setScrollProgress(self.progress);
      if (petalRainApi) petalRainApi.setScrollProgress(self.progress);
      document.body.classList.toggle('is-bottom-focus', self.progress > 0.55);
    },
  });

  if (prefersReducedMotion) return;

  gsap.to('.orb-a', {
    y: -120,
    ease: 'none',
    scrollTrigger: { scrub: 1.2, start: 0, end: 'max' },
  });

  gsap.to('.orb-b', {
    y: -200,
    x: 60,
    ease: 'none',
    scrollTrigger: { scrub: 1.5, start: 0, end: 'max' },
  });

  gsap.to('.orb-c', {
    y: -80,
    x: -40,
    ease: 'none',
    scrollTrigger: { scrub: 1, start: 0, end: 'max' },
  });
}

function killProjectScrollTriggers() {
  ScrollTrigger.getAll().forEach((st) => {
    const trigger = st.trigger;
    if (!trigger || typeof trigger.closest !== 'function') return;
    if (
      trigger.closest('#japan, #global, #games, #skills') ||
      trigger.id === 'japan-overview' ||
      trigger.id === 'global-overview' ||
      trigger.id === 'games-overview'
    ) {
      st.kill();
    }
  });
}

function initPostMountAnimations() {
  killProjectScrollTriggers();
  initSitePreviews();
  initRevealAnimations();
  initPerformanceBars();
  initAnimatedCounters();
  initCardTilt();
  initStackChipStagger();
  initCardLinkHover();
  initFeaturedParallax();
  ScrollTrigger.refresh();
}

function initStaticHoverEffects() {
  initMagneticElements();
  initCursorGlow();
  initSkillListHover();
}

function refreshProjects(lang) {
  mountProjectSections(lang);
  mountGameSection(lang);
  initPostMountAnimations();
}

function init() {
  initYear();
  initNavigation();
  initSmoothAnchors();

  initLanguageSwitcher((lang) => {
    refreshProjects(lang);
  });

  mountProjectSections(getLang());
  mountGameSection(getLang());
  initHeroAnimations();
  initStaticHoverEffects();
  initPostMountAnimations();

  const container = document.getElementById('canvas-container');
  const petalContainer = document.getElementById('petal-rain-container');
  sceneApi = createScene(container, { reducedMotion: prefersReducedMotion });
  petalRainApi = createPetalRain(petalContainer, { reducedMotion: prefersReducedMotion });
  initBackgroundHover();
  initParallax();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
