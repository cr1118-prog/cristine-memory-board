/* Favorite song: video with synced lyrics (editable), story, bubble photos. */

SECTIONS.song = {
  note: () => "Press play and the lyrics will follow along with the music.",
  render: f => `<div class="stack"><p class="songname rv" id="songname">♪ Alive · Planetshakers<span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span></p>${videoBox(MEDIA.song, "song")}
    <div class="rv"><div class="lyr" id="lyr" aria-live="off"><p class="now">Add the lyrics below to follow along as the song plays.</p></div>
      <details class="lyr-edit"${LYRICS ? "" : " open"}><summary>Add or change lyrics</summary>
        <label for="lyr-text">Lyrics, one line per row</label>
        <textarea id="lyr-text" rows="8" spellcheck="false" placeholder="Paste the lyrics here, one line per row.">${esc(LYRICS)}</textarea>
        <button class="btn" id="lyr-save" type="button">Use these lyrics</button></details></div>
    <div class="why rv"><h3>Why I love this song</h3><p>${esc(WHY)}</p></div>
    <div class="rv"><h3>Photos</h3>${galleryHtml(photosOf(f), "circles", 5, "Song photo")}</div>
  </div>`,
  mount: root => {
    const video = $("video", root), now = $("#lyr .now", root);
    const parse = text => text.split("\n").map(s => s.trim()).filter(Boolean);
    let lines = parse(LYRICS);
    const draw = i => {
      const text = lines.length
        ? lines[Math.max(0, Math.min(i, lines.length - 1))]
        : "Add the lyrics below to follow along as the song plays.";
      if (text === now.textContent) return;
      now.textContent = text;
      restartAnimation(now, "swap");
    };
    draw(0);
    $("#lyr-save", root).addEventListener("click", () => {
      lines = parse($("#lyr-text", root).value);
      toast(lines.length ? "Lyrics saved for this visit" : "Add a few lines first");
      draw(0);
    });
    const title = $("#songname", root);
    ["play", "pause", "ended"].forEach(ev => video?.addEventListener(ev, () => title.classList.toggle("playing", ev === "play")));
    video?.addEventListener("timeupdate", () => {
      if (lines.length && video.duration) draw(Math.floor(video.currentTime / video.duration * lines.length));
    });
  }
};
