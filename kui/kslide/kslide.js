export function kslide() {
  document.querySelectorAll("kslide").forEach(async (el) => {
    if (el.dataset.inited) return;
    el.dataset.inited = "true";
    const [htmlText, cssText, dataList] = await Promise.all([
      fetch("/kui/kslide/kslide.html").then((res) => res.text()),
      fetch("/kui/kslide/kslide.css").then((res) => res.text()),
      fetch("/kui/kslide/data.json").then((res) => res.json()),
    ]);
    document.head.append($$("style", "", "", cssText));
    el.innerHTML = htmlText;
    const input = el.querySelector(".search-input");
    const result = el.querySelector(".search-result");
    const renderResult = (list) => {
      result.innerHTML = "";
      (list.length ? list : [{ title: "未找到相关结果", link: "" }]).forEach(
        (d) => {
          const item = $$("div", "result-item");
          const link = $a(d.link, d.title, "result-title");
          item.append(link);
          result.append(item);
        }
      );
    };
    renderResult(dataList);
    input.addEventListener("input", () => {
      const keyword = input.value.trim().toLowerCase();
      const filtered = !keyword
        ? dataList
        : dataList.filter((d) => d.title.toLowerCase().includes(keyword));
      renderResult(filtered);
    });
  });
}