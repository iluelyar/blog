export async function kslide(el) {
  if (el.dataset.inited) return;
  el.dataset.inited = "true";

  const [htmlText, cssText, dataList] = await Promise.all([
    fetch("/kui/kblog/kslide/kslide.html").then((res) => res.text()),
    fetch("/kui/kblog/kslide/kslide.css").then((res) => res.text()),
    fetch("/kui/kblog/kslide/data.json").then((res) => res.json()),
  ]);

  document.head.append($$("style", { html: cssText }));
  el.innerHTML += htmlText;

  const input = $(".search-input", el);
  const result = $(".search-result", el);

  const renderResult = (list) => {
    result.innerHTML = "";
    (list.length ? list : [{ title: "未找到相关结果", link: "" }]).forEach(
      (d) => {
        const link = $a(d.link, {
          className: "result-title",
          target: "_self",
        });
        const item = $$("div", { className: "result-item", text: d.title });
        link.append(item);
        result.append(link);
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
}
