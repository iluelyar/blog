export async function card_album(el) {
  if (el.dataset.inited) return;
  el.dataset.inited = "true";

  const [htmlText, cssText] = await Promise.all([
    fetch("/kui/kcard/card_album.html").then((res) => res.text()),
    fetch("/kui/kcard/card_album.css").then((res) => res.text()),
  ]);

  document.head.append($$("style", { text: cssText }));
  el.innerHTML = htmlText;
}
