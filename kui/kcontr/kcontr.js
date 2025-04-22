export function kcontr() {
  document.querySelectorAll("kcontr").forEach(async (el) => {
    if (el.dataset.inited) return;
    el.dataset.inited = "true";
    const [htmlText, cssText, dataList] = await Promise.all([
      fetch("/kui/kcontr/kcontr.html").then((res) => res.text()),
      fetch("/kui/kcontr/kcontr.css").then((res) => res.text()),
    ]);
    document.head.append($$("style", "", "", cssText));
    el.innerHTML = htmlText;

    $(".slide-btn").addEventListener("click", () => {
      $("kslide").classList.toggle("open");
      $("kpanel").classList.remove("open");
    });

    $(".panel-btn").addEventListener("click", () => {
      $("kpanel").classList.toggle("open");
      $("kslide").classList.remove("open");
    });
  });
}
