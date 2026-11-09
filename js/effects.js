/* Decorative effects: floating glyph layer, pointer sparkles, hero life.
   Every effect is skipped or reduced for reduced-motion and touch devices. */

const GLYPHS = ["♥","✦","✧","☆","♡","✿"];
const rand = (min, max) => min + Math.random() * (max - min);

function spark(x, y, n = 1, burst = false) {
  if (CALM) return;
  for (let k = 0; k < n; k++) {
    const s = document.createElement("i"), a = rand(0, 6.28), d = burst ? rand(40, 100) : rand(14, 24);
    s.className = "sp";
    s.textContent = GLYPHS[Math.random() * GLYPHS.length | 0];
    s.style.cssText = `left:${x}px;top:${y}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d - (burst ? 20 : 0)}px;color:${Math.random() < .5 ? "#ff8fc8" : "#7b4fd6"};font-size:${burst ? rand(14, 24) : 10}px`;
    document.body.appendChild(s);
    s.addEventListener("animationend", () => s.remove(), {once: true});
  }
}

/* Spark from the middle of an element (used for taps on folders and cards) */
function sparkAt(el, n, burst = true) {
  const r = el.getBoundingClientRect();
  spark(r.left + r.width / 2, r.top + r.height / 2, n, burst);
}

function initFloaters() {
  const fx = $("#fx"), glyphCount = TOUCH ? 12 : 26, mascotCount = TOUCH ? 3 : 5;
  for (let k = 0; k < glyphCount; k++) {
    const s = document.createElement("span"), z = rand(.1, 1);
    s.className = "fl";
    s.textContent = GLYPHS[k % GLYPHS.length];
    s.style.cssText = `left:${rand(0, 100)}%;top:${rand(0, 100)}%;font-size:${10 + z * 26}px;opacity:${.18 + z * .4};filter:blur(${(1 - z) * 2.5}px);--z:${z};animation-duration:${rand(6, 14)}s;animation-delay:-${rand(0, 8)}s;color:${k % 4 ? "#8a63dc" : "#ff8fc8"}`;
    fx.appendChild(s);
  }
  for (let k = 0; k < mascotCount; k++) {
    const z = rand(.3, 1), e = document.createElement("div");
    e.className = "fl";
    e.style.cssText = `left:${8 + k * 20 + rand(0, 8)}%;top:${rand(10, 85)}%;opacity:${.12 + z * .2};filter:blur(${(1 - z) * 3}px);--z:${z};animation-duration:${rand(9, 15)}s;animation-delay:-${rand(0, 8)}s`;
    e.innerHTML = `<svg viewBox="0 0 120 90" width="${40 + z * 50}" height="${30 + z * 38}"><use href="#kuromi"/></svg>`;
    fx.appendChild(e);
  }
}

/* Hearts that drift up the screen like bubbles */
function initRisingHearts() {
  if (CALM) return;
  const fx = $("#fx");
  for (let k = 0; k < (TOUCH ? 6 : 12); k++) {
    const h = document.createElement("i");
    h.className = "rise";
    h.textContent = GLYPHS[k % 3 === 0 ? 0 : k % GLYPHS.length];
    h.style.cssText = `--x:${rand(2, 96)}%;--s:${rand(12, 28)}px;--sx:${rand(-60, 60)}px;--dur:${rand(11, 20)}s;--delay:-${rand(0, 20)}s;--c:${k % 2 ? "#ff8fc8" : "#a68be6"}`;
    fx.appendChild(h);
  }
}

/* Folder cards lean toward the pointer (mouse only) */
function initTilt() {
  if (CALM || !matchMedia("(hover: hover)").matches) return;
  const reset = card => { card.style.removeProperty("--rx"); card.style.removeProperty("--ry"); };
  document.addEventListener("pointermove", e => {
    if (e.pointerType !== "mouse") return;
    const card = e.target.closest?.(".fd");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--ry", ((e.clientX - r.left) / r.width - .5) * 12 + "deg");
    card.style.setProperty("--rx", ((e.clientY - r.top) / r.height - .5) * -10 + "deg");
  }, {passive: true});
  document.addEventListener("pointerout", e => { const c = e.target.closest?.(".fd"); if (c) reset(c); });
}

function initPointerFx() {
  const fx = $("#fx");
  let last = 0;
  addEventListener("pointermove", e => {
    fx.style.setProperty("--mx", (e.clientX / innerWidth - .5) * 2);
    fx.style.setProperty("--my", (e.clientY / innerHeight - .5) * 2);
    if (e.pointerType === "mouse" && e.timeStamp - last > 90) { last = e.timeStamp; spark(e.clientX, e.clientY, 1); }
  }, {passive: true});
  addEventListener("pointerdown", e => spark(e.clientX, e.clientY, TOUCH ? 5 : 8, true), {passive: true});
}

/* Split a heading into words → letters so each letter can wave.
   Words stay unbreakable so phones never wrap in the middle of a word. */
function waveText(root) {
  root.setAttribute("aria-label", root.textContent);
  let i = 0;
  (function walk(node) {
    [...node.childNodes].forEach(c => {
      if (c.nodeType !== 3) return walk(c);
      const frag = document.createDocumentFragment();
      c.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) return frag.append(part);
        const w = document.createElement("span");
        w.className = "word";
        w.setAttribute("aria-hidden", "true");
        [...part].forEach(ch => {
          const s = document.createElement("span");
          s.className = "ch";
          s.style.setProperty("--i", i++);
          s.textContent = ch;
          w.appendChild(s);
        });
        frag.append(w);
      });
      c.replaceWith(frag);
    });
  })(root);
}

function initHero() {
  waveText($(".title"));
  $(".tape-in").innerHTML = "<b>♥ memories ✦ photos ♥ stories ✦ moments ✦ </b>".repeat(8);

  const bub = $("#bub"), hero = $(".hk");
  const MSG = ["hi Cristine ♡","pick a folder!","so many memories ✦","you’re doing great ♥","psst… find the secret"];
  let mi = 0;
  setInterval(() => {
    bub.style.animation = "none"; void bub.offsetWidth; bub.style.animation = "";
    bub.textContent = MSG[++mi % MSG.length];
  }, 3600);
  $("svg", hero).addEventListener("click", () => restartAnimation(hero, "jump"));
}
