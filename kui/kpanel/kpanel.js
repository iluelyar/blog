export function kpanel() {
  document.querySelectorAll("kpanel").forEach(async (el) => {
    if (el.dataset.inited) return;
    el.dataset.inited = "true";

    const [htmlText, cssText] = await Promise.all([
      fetch("/kui/kpanel/kpanel.html").then((res) => res.text()),
      fetch("/kui/kpanel/kpanel.css").then((res) => res.text()),
    ]);

    document.head.append($$("style", "", "", cssText));
    el.innerHTML += htmlText;
  });
}
