/* Lightbox built on the native <dialog> element:
   focus is trapped, Esc closes it, and focus returns to the photo you opened.
   Also supports arrow keys and swipe left/right on touch screens. */

const Lightbox = (() => {
  const dlg = $("#lb"), img = $("#lb-img"), cap = $("#lb-cap"), count = $("#lb-n"), prev = $("#lb-prev"), next = $("#lb-next");
  let list = [], index = 0, closing = false;

  function draw() {
    const p = list[index];
    img.style.opacity = 0;
    setTimeout(() => { img.src = p.src; img.alt = p.name; }, CALM ? 0 : 160);
    cap.innerHTML = `<b>${esc(p.name)}</b>${p.text ? esc(p.text) : ""}`;
    count.textContent = `${index + 1} / ${list.length}`;
    prev.hidden = next.hidden = list.length < 2;
  }
  const step = d => { index = (index + d + list.length) % list.length; draw(); };

  function open(photos, i) {
    list = photos; index = i; closing = false;
    draw();
    dlg.showModal();
    document.body.classList.add("lock");
    requestAnimationFrame(() => dlg.classList.add("on"));
  }
  async function close() {
    if (closing || !dlg.open) return;
    closing = true;
    dlg.classList.remove("on");
    await wait(500);
    dlg.close();
    document.body.classList.remove("lock");
  }

  img.addEventListener("load", () => { img.style.opacity = 1; });
  $("#lb-x").addEventListener("click", close);
  prev.addEventListener("click", () => step(-1));
  next.addEventListener("click", () => step(1));
  dlg.addEventListener("click", e => { if (e.target === dlg) close(); });
  dlg.addEventListener("cancel", e => { e.preventDefault(); close(); });   /* Esc key */
  dlg.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  /* swipe */
  let startX = null;
  const fig = $("figure", dlg);
  fig.addEventListener("pointerdown", e => { startX = e.clientX; });
  fig.addEventListener("pointerup", e => {
    if (startX !== null && Math.abs(e.clientX - startX) > 50 && list.length > 1) step(e.clientX < startX ? 1 : -1);
    startX = null;
  });
  fig.addEventListener("pointercancel", () => { startX = null; });

  return {open, close};
})();
