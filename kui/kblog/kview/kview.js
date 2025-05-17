export async function kview(el) {
  if (el.dataset.inited) return;
  el.dataset.inited = "true";

  const [htmlText, cssText] = await Promise.all([
    fetch("/kui/kblog/kview/kview.html").then((res) => res.text()),
    fetch("/kui/kblog/kview/kview.css").then((res) => res.text()),
  ]);

  document.head.append($$("style", { text: cssText }));
  el.innerHTML += htmlText;
}
