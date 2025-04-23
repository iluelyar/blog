export async function kpanel(el) {
  if (el.dataset.inited) return;
  el.dataset.inited = "true";

  const [htmlText, cssText] = await Promise.all([
    fetch("/kui/kpanel/kpanel.html").then((res) => res.text()),
    fetch("/kui/kpanel/kpanel.css").then((res) => res.text()),
  ]);

  document.head.append($$("style", { html: cssText }));
  el.innerHTML += htmlText;
}
