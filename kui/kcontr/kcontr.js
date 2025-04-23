export async function kcontr(el) {
  if (el.dataset.inited) return;
  el.dataset.inited = "true";

  const [htmlText, cssText] = await Promise.all([
    fetch("/kui/kcontr/kcontr.html").then((res) => res.text()),
    fetch("/kui/kcontr/kcontr.css").then((res) => res.text()),
  ]);

  document.head.append($$("style", "", "", cssText));
  el.innerHTML = htmlText;

  const slideBtn = $(".slide-btn", el); 
  const panelBtn = $(".panel-btn", el); 
  const kslide = $("kslide");
  const kpanel = $("kpanel");

  slideBtn.addEventListener("click", () => {
    if (kslide) kslide.classList.toggle("open");
    if (kpanel) kpanel.classList.remove("open");
  });

  panelBtn.addEventListener("click", () => {
    if (kpanel) kpanel.classList.toggle("open");
    if (kslide) kslide.classList.remove("open");
  });
}
