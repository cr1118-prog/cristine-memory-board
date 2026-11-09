/* Accessible tabs (role=tablist) with arrow-key support. */

const tabsHtml = (id, tabs) => `
  <div class="tabs" role="tablist" aria-label="${esc(id)}">
    ${tabs.map((t, i) => `<button type="button" role="tab" id="${id}-tab-${t.id}" aria-controls="${id}-panel-${t.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-tab="${t.id}">${esc(t.label)}</button>`).join("")}
  </div>
  ${tabs.map((t, i) => `<div class="pane" role="tabpanel" id="${id}-panel-${t.id}" aria-labelledby="${id}-tab-${t.id}" ${i ? "hidden" : ""}>${t.html}</div>`).join("")}`;

function mountTabs(root) {
  const tabs = $$('[role="tab"]', root), panels = $$('[role="tabpanel"]', root);
  const select = (tab, focus) => {
    tabs.forEach(t => { const on = t === tab; t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1; });
    panels.forEach(p => { p.hidden = p.id !== tab.getAttribute("aria-controls"); });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", e => {
      const to = {ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1}[e.key];
      if (to === undefined) return;
      e.preventDefault();
      select(tabs[(to + tabs.length) % tabs.length], true);
    });
  });
}
