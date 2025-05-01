export async function music_player(el) {
  if (el.dataset.inited) return;
  el.dataset.inited = "true";

  const [htmlText, cssText, jsText] = await Promise.all([
    fetch("/kui/ktool/music_player.html").then((res) => res.text()),
    fetch("/kui/ktool/music_player.css").then((res) => res.text()),
    fetch("/kui/ktool/play_music.js").then((res) => res.text()),
  ]);
  
  el.innerHTML = htmlText;
  document.head.append($$("style", { text: cssText }));
  document.body.append($$("script", { text: jsText }));
}
