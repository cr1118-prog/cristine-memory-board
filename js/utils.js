/* Shared helpers used by every component. Loaded before effects and components. */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const pad2 = n => String(n).padStart(2, "0");

/* User prefers less motion → skip timed delays and decorative effects */
const CALM = matchMedia("(prefers-reduced-motion: reduce)").matches;
/* Phones and tablets: fewer decorative elements to keep animation smooth */
const TOUCH = matchMedia("(pointer: coarse)").matches;
/* Wait for a CSS transition/animation duration (0 when motion is reduced) */
const wait = ms => new Promise(r => setTimeout(r, CALM ? 0 : ms));

/* Section registry: each component file adds { note, render, mount } for its type */
const SECTIONS = {};

/* Restart a CSS animation on an element (class-based or inline) */
function restartAnimation(el, className) {
  el.classList.remove(className);
  void el.offsetWidth;
  el.classList.add(className);
}

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("on");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove("on"), 2600);
}

/* Fade children marked .rv in, one after another */
function reveal(root) {
  $$(".rv", root).forEach((el, k) => {
    el.style.setProperty("--d", Math.min(k, 12) * 70 + "ms");
    requestAnimationFrame(() => el.classList.add("in"));
  });
}

/* Small reusable markup builders */
const KUROMI_SVG = cls => `<svg class="${cls}" viewBox="0 0 120 90" aria-hidden="true"><use href="#kuromi"/></svg>`;

const videoBox = (src, label) =>
  `<div class="mv rv">${src
    ? `<video controls playsinline preload="metadata" src="${esc(src)}" aria-label="${esc(label)} video"></video>`
    : `<span>Add your ${esc(label)} video in js/data/media.js</span>`}</div>`;

/* Resolve the photo list that belongs to a folder */
const photosOf = f => (f.key && MEDIA[f.key]) || [];
