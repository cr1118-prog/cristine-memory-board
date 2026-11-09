/* Secret stage: rolling credits (unlocked after opening every folder). */

SECTIONS.secret = {
  note: () => "You found the hidden folder. Roll the credits.",
  render: () => `
    <div class="credits" aria-label="Credits"><div class="roll">${CREDITS.map(([a, b]) =>
      `<p>${a ? `<small>${esc(a)}</small>` : ""}${b ? `<b>${esc(b)}</b>` : ""}</p>`).join("")}</div></div>
    <button class="btn ghost replay" id="replay" type="button">Roll the credits again</button>`,
  mount: root => {
    const roll = $(".roll", root);
    $("#replay", root).addEventListener("click", () => {
      roll.style.animation = "none"; void roll.offsetWidth; roll.style.animation = "";
    });
  }
};
