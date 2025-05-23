export async function kmain(el) {
  if (el.dataset.inited) return;
  el.dataset.inited = "true";

  const [htmlText, cssText] = await Promise.all([
    fetch("/kui/kblog/kmain/kmain.html").then((res) => res.text()),
    fetch("/kui/kblog/kmain/kmain.css").then((res) => res.text()),
  ]);

  document.head.append($$("style", { text: cssText }));
  el.innerHTML += htmlText;
}
