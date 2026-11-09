/* Joke Time: flip cards that award points and stickers.
   Progress is kept while the page stays open. */

const Jokes = {flipped: new Set(), points: 0};

const slotHtml = k => {
  const got = Jokes.flipped.has(k);
  return `<span class="slot${got ? " got" : ""}" title="${got ? esc(REWARDS[k].n) : `Flip card ${k + 1} to unlock`}">${got ? REWARDS[k].i : "?"}</span>`;
};
const jokeCard = ([q, a], i) => {
  const on = Jokes.flipped.has(i), total = JOKES.length;
  return `<li class="rv" style="--n:${i}"><button class="fc" type="button" data-joke="${i}" style="--n:${i}" aria-pressed="${on}">
    <span class="in">
      <span class="side f" aria-hidden="${on}"><span class="n">${pad2(i + 1)}</span><span class="q">${esc(q)}</span><small><span>Tap to flip</span><span>${i + 1}/${total}</span></small></span>
      <span class="side b" aria-hidden="${!on}"><span class="stk" aria-hidden="true">${REWARDS[i].i}</span><small>Punchline</small><span class="q">${esc(a)}</span><small><span>+10 ♥</span><span>${i + 1}/${total}</span></small></span>
    </span></button></li>`;
};

function flipJoke(card) {
  const i = +card.dataset.joke, on = card.getAttribute("aria-pressed") !== "true";
  card.setAttribute("aria-pressed", on);
  $(".side.f", card).setAttribute("aria-hidden", on);
  $(".side.b", card).setAttribute("aria-hidden", !on);
  if (on) awardJoke(card, i);
}

function awardJoke(card, i) {
  const first = !Jokes.flipped.has(i), r = REWARDS[i];
  Jokes.flipped.add(i);
  Jokes.points += 10;
  const pts = $("#pts");
  pts.textContent = Jokes.points;
  restartAnimation(pts, "bump");
  $("#jcount").textContent = `Punchlines found ${Jokes.flipped.size} of ${JOKES.length}`;
  sparkAt(card, first ? 16 : 8);
  if (first) {
    $("#tray").innerHTML = JOKES.map((_, k) => slotHtml(k)).join("");
    $("#tray").children[i].classList.add("pop");
  }
  if (first && Jokes.flipped.size === JOKES.length) {
    toast("You collected every sticker. Joke champion! 👑");
    [0, 300, 600].forEach(t => setTimeout(() => spark(innerWidth * rand(.25, .75), innerHeight * rand(.25, .55), 18, true), t));
  } else toast(first ? `+10 ♥ · You got the ${r.n} ${r.i}` : "+10 ♥");
}

SECTIONS.jokes = {
  note: () => "Tap a card to see the punchline. Every flip earns points, and each new card wins a sticker.",
  render: () => `
    <div class="rwd rv"><div class="pts">♥ <b id="pts">${Jokes.points}</b> points</div><div class="tray" id="tray" aria-label="Sticker collection">${JOKES.map((_, k) => slotHtml(k)).join("")}</div></div>
    <ul class="cards">${JOKES.map(jokeCard).join("")}</ul>
    <p class="jcount" id="jcount" role="status">Punchlines found ${Jokes.flipped.size} of ${JOKES.length}</p>`,
  mount: root => $$(".fc", root).forEach(c => c.addEventListener("click", () => flipJoke(c)))
};
