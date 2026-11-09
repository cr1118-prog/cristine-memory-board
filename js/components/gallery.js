/* Photo gallery: one component, six layouts (see css/gallery.css).
   galleryHtml() is also used by the movie and song sections. */

const PLACEHOLDER = (label, n) =>
  `<figure class="ph empty" style="--n:${n - 1}"><div class="im">${KUROMI_SVG("")}<span>${esc(label)} ${n}</span></div></figure>`;

const photoFigure = (p, i) => `
  <figure class="ph" style="--n:${i}">
    <button class="ph-open" type="button" data-photo="${i}" aria-label="Enlarge photo: ${esc(p.name)}">
      <span class="im"><img loading="lazy" decoding="async" src="${esc(p.src)}" alt="${esc(p.name)}"></span>
    </button>
    <figcaption><b>${esc(p.name)}</b>${p.text ? `<span>${esc(p.text)}</span>` : ""}</figcaption>
  </figure>`;

const galleryHtml = (photos, layout, placeholderCount, label) =>
  `<div class="l-${layout}">${photos.length
    ? photos.map(photoFigure).join("")
    : Array.from({length: placeholderCount}, (_, k) => PLACEHOLDER(label, k + 1)).join("")}</div>`;

SECTIONS.gallery = {
  note: f => photosOf(f).length
    ? "Tap or click any photo to enlarge it."
    : "These are placeholders. Add your photos in js/data/media.js and they will appear here.",
  render: f => galleryHtml(photosOf(f), f.layout, f.ph, f.label)
};
