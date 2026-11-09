/* Folder card + board: reused by the home page and by collection pages. */

/* One Kuromi folder. `data` becomes data-* attributes so one delegated click handler can read it. */
const folderCard = ({data, no, name, hint}, k) => `
  <li class="fdw" style="--k:${k}">
    <button class="fd" type="button" ${Object.entries(data).map(([a, v]) => `data-${a}="${v}"`).join(" ")}>
      ${KUROMI_SVG("kh")}<span class="no" aria-hidden="true">${pad2(no)}</span>
      <span class="nm">${esc(name)}</span><span class="hn">${esc(hint)}</span>
    </button>
  </li>`;

const folderBoard = (cards, classes = "") =>
  `<ul class="board ${classes}">${cards.map((c, k) => folderCard(c, k)).join("")}</ul>`;

/* Hint line under a folder name */
const hintOf = f => f.t === "gallery"
  ? (photosOf(f).length ? `${photosOf(f).length} photos` : "add your photos")
  : HINT[f.t];
