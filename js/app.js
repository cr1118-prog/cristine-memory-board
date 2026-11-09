/* App shell: state, navigation between board → collection → folder,
   loader, and the delegated event handlers. */

const REQUIRED = folders.filter(f => !f.hidden).length;
const groupOf = i => groups.findIndex(g => g.kids.includes(i));

const state = {
  visited: new Set(),
  secretOn: false,
  folder: null,     // index of the folder being viewed
  group: null,      // index of the collection being viewed
  busy: false       // blocks clicks while a transition runs
};

/* ---------- home ---------- */
function renderHome() {
  const visible = groups.map((g, i) => i).filter(i => !groups[i].hidden || state.secretOn);
  $("#board").outerHTML = folderBoard(visible.map((gi, row) => {
    const g = groups[gi], opened = g.kids.filter(k => state.visited.has(k)).length;
    return {
      data: {g: gi}, no: row + 1, name: g.name,
      hint: g.kids.length > 1 ? `${g.kids.length} folders${opened ? ` · ${opened} opened` : ""}` : hintOf(folders[g.kids[0]])
    };
  })).replace("<ul ", '<ul id="board" ');
  $("#count").textContent = `${state.visited.size} of ${REQUIRED} folders opened`;
  $("#pips").innerHTML = Array.from({length: REQUIRED}, (_, k) => `<i class="${k < state.visited.size ? "on" : ""}">♥</i>`).join("");
}

/* ---------- inside views ---------- */
function setStage({kicker, title, note, bare}) {
  $("#kicker").textContent = kicker;
  $("#ititle").textContent = title;
  $("#inote").textContent = note;
  $("#body").classList.toggle("bare", !!bare);
}

function buildFolder(i) {
  const f = folders[i], section = SECTIONS[f.t], g = groups[groupOf(i)];
  setStage({
    kicker: g.kids.length > 1 ? `${g.name} · ${g.kids.indexOf(i) + 1} of ${g.kids.length}` : "Folder",
    title: f.name,
    note: section.note(f)
  });
  const body = $("#body");
  body.innerHTML = section.render(f);
  section.mount?.(body, f);
  reveal($("#inside"));
}

function buildGroup(gi) {
  const g = groups[gi];
  setStage({kicker: "Collection", title: g.name, note: g.note, bare: true});
  $("#body").innerHTML = folderBoard(g.kids.map((i, row) => ({
    data: {i}, no: row + 1, name: folders[i].name,
    hint: hintOf(folders[i]) + (state.visited.has(i) ? " ✓" : "")
  })), `sub in ${g.kids.length === 3 ? "c3" : "c2"}`);
  reveal($("#inside"));
}

/* ---------- navigation ---------- */
function showInside() {
  const g = state.group !== null ? groups[state.group] : null;
  $("#back").textContent = state.folder !== null && g && g.kids.length > 1 ? `← Back to ${g.name}` : "← Back to the board";
  $("#home").hidden = true;
  $("#inside").hidden = false;
  $("#inside").classList.remove("in");
  $("#topbar").classList.add("on");
  scrollTo(0, 0);
  /* two frames so the browser paints the hidden state before fading in (needed on iOS) */
  requestAnimationFrame(() => requestAnimationFrame(() => {
    $("#inside").classList.add("in");
    $("#ititle").focus({preventScroll: true});
    state.busy = false;
  }));
}

function pressEffect(card) {
  card.closest(".board").classList.add("opening");
  card.classList.add("opening");
  sparkAt(card, 14);
}

/* Run a transition once: ignores presses while another one is in progress */
async function transition(card, build) {
  if (state.busy) return;
  state.busy = true;
  pressEffect(card);
  await wait(440);
  build();
  showInside();
}

function openFolder(i, card) {
  transition(card, () => {
    state.folder = i;
    buildFolder(i);
    if (!folders[i].hidden) {
      state.visited.add(i);
      if (state.visited.size >= REQUIRED && !state.secretOn) {
        state.secretOn = true;
        setTimeout(() => toast("A hidden folder appeared on the board"), 700);
      }
    }
  });
}

function openGroup(gi, card) {
  transition(card, () => { state.group = gi; state.folder = null; buildGroup(gi); });
}

async function closeFolder() {
  if (state.busy || (state.folder === null && state.group === null)) return;
  state.busy = true;
  const toGroup = state.folder !== null && state.group !== null && groups[state.group].kids.length > 1;
  const cameFrom = state.folder !== null ? `[data-i="${state.folder}"]` : `[data-g="${state.group}"]`;   // card to re-focus
  $("#inside").classList.remove("in");
  if (!toGroup) $("#topbar").classList.remove("on");
  await wait(420);

  state.folder = null;
  if (toGroup) {
    buildGroup(state.group);
    showInside();
    $(`.fd${cameFrom}`)?.focus({preventScroll: true});
    return;
  }
  state.group = null;
  $("#inside").hidden = true;
  $("#home").hidden = false;
  renderHome();
  scrollTo(0, 0);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    $("#board").classList.add("in");
    $(`.fd${cameFrom}`)?.focus({preventScroll: true});
    state.busy = false;
  }));
}

/* ---------- events ---------- */
document.addEventListener("click", e => {
  const card = e.target.closest(".fd");
  if (!card) return;
  if (card.dataset.g !== undefined) {
    const gi = +card.dataset.g, g = groups[gi];
    if (g.kids.length === 1) { state.group = null; openFolder(g.kids[0], card); } else openGroup(gi, card);
  } else openFolder(+card.dataset.i, card);
});

$("#body").addEventListener("click", e => {
  const photo = e.target.closest(".ph-open");
  if (photo) Lightbox.open(photosOf(folders[state.folder]), +photo.dataset.photo);
});

$("#back").addEventListener("click", closeFolder);
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !$("#lb").open && (state.folder !== null || state.group !== null)) closeFolder();
});

/* ---------- loader ---------- */
let loaderGone = false;
async function hideLoader() {
  if (loaderGone) return;
  loaderGone = true;
  $("#loader").classList.add("done");
  await wait(350);
  reveal($("#home"));
  $("#board").classList.add("in");
  await wait(600);
  $("#loader").hidden = true;
  $("#home-title").focus({preventScroll: true});
}
$("#loader").addEventListener("click", hideLoader);
setTimeout(hideLoader, CALM ? 700 : 2800);

/* ---------- start ---------- */
initFloaters();
initRisingHearts();
initTilt();
initPointerFx();
initHero();
renderHome();
