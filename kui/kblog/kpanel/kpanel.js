export async function kpanel(el) {
  if (el.dataset.inited) return;
  el.dataset.inited = "true";

  const [htmlText] = await Promise.all([
    fetch("/kui/kblog/kpanel/kpanel.html").then((res) => res.text()),
  ]);

  el.innerHTML += htmlText;
}
