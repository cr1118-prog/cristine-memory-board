/* Favorite movie: video, story, cast picker, cinema-frame photos. */

const castMember = (c, i) => `
  <button class="cm" type="button" data-cast="${i}" aria-pressed="false">
    <span class="av">${MEDIA.cast[i] ? `<img loading="lazy" src="${esc(MEDIA.cast[i])}" alt="">` : esc(c.role[0])}</span>
    <b>${esc(c.role)}</b><span class="who">${esc(c.name)}</span>
  </button>`;

SECTIONS.movie = {
  note: () => "Press play, pick a character to meet the cast, and tap any photo to enlarge it.",
  render: f => `<div class="stack">${videoBox(MEDIA.movie, "movie")}
    <div class="syn rv"><h3>Story</h3>${SYNOPSIS.split("\n\n").map(p => `<p>${esc(p)}</p>`).join("")}</div>
    <div class="rv"><h3>The cast</h3>
      <div class="cast">${CAST.map(castMember).join("")}</div>
      <div class="bio" id="bio" aria-live="polite"></div></div>
    <div class="rv"><h3>Photos</h3>${galleryHtml(photosOf(f), "cine", 4, "Movie still")}</div>
  </div>`,
  mount: root => {
    const bio = $("#bio", root), members = $$(".cm", root);
    const show = (i, instant) => {
      const c = CAST[i];
      members.forEach((m, k) => m.setAttribute("aria-pressed", k === i));
      bio.style.opacity = 0;
      setTimeout(() => { bio.innerHTML = `<b>${esc(c.role)}</b> · ${esc(c.name)}<br><span>${esc(c.bio)}</span>`; bio.style.opacity = 1; }, instant || CALM ? 0 : 180);
    };
    members.forEach((m, i) => m.addEventListener("click", () => show(i)));
    show(0, true);
  }
};
