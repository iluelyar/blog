export function kmain() {
  document.querySelectorAll("kmain").forEach(async (el) => {
    if (el.dataset.inited) return;
    el.dataset.inited = "true";

    const [htmlText, cssText] = await Promise.all([
      fetch("/kui/kmain/kmain.html").then((res) => res.text()),
      fetch("/kui/kmain/kmain.css").then((res) => res.text()),
    ]);

    document.head.append($$("style", "", "", cssText));
    el.innerHTML += htmlText;
  });
}
