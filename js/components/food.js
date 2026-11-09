/* Favorite food: photo, recipe tabs, tick-off ingredient list. */

SECTIONS.food = {
  note: () => "Tick off the ingredients as you cook, then follow the steps.",
  render: () => {
    const ingredients = `<ul class="ing">${FOOD.ing.map((t, n) => `<li style="--n:${n}"><label><input type="checkbox"><span>${esc(t)}</span></label></li>`).join("")}</ul>
      <p class="tip">${esc(FOOD.tip)}</p>
      <p class="prog" id="fprog" role="status">0 of ${FOOD.ing.length} ready</p>`;
    const steps = `<ol class="steps">${FOOD.steps.map((s, n) => `<li style="--n:${n}">${esc(s)}</li>`).join("")}</ol>`;
    return `<div class="food">
      <div class="rv"><div class="dish-img">${MEDIA.food
        ? `<img src="${esc(MEDIA.food)}" alt="${esc(FOOD.title)}">`
        : `<span>Add your dish photo<br>in js/data/media.js</span>`}</div></div>
      <div>
        <h2 class="dish rv">${esc(FOOD.title)}</h2>
        <p class="tagline rv">${esc(FOOD.tag)}</p>
        <span class="meta rv">${esc(FOOD.meta)}</span>
        <div class="recipe rv" id="recipe">${tabsHtml("recipe", [{id: "ing", label: "Ingredients", html: ingredients}, {id: "steps", label: "Steps", html: steps}])}</div>
      </div></div>`;
  },
  mount: root => {
    mountTabs(root);
    const boxes = $$(".ing input", root);
    boxes.forEach(b => b.addEventListener("change", () => {
      const n = boxes.filter(x => x.checked).length;
      $("#fprog").textContent = `${n} of ${boxes.length} ready`;
      if (n === boxes.length) toast("Everything is ready. Enjoy!");
    }));
  }
};
