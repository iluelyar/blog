const data = [
  {
    icon: "/assets/img/cover.png",
    title: "KChart 图表",
    link: "/kchart",
  },
  { icon: "/assets/img/cover.png", title: "KCard 卡片", link: "/kcard" },
  { icon: "/assets/img/cover.png", title: "KTool 工具", link: "/ktool" },
  { icon: "/assets/img/cover.png", title: "KUI 组件库", link: "/kui" },
];

const i = _(".search-input");
const o = _(".search-result");

i.addEventListener("input", () => {
  const keyword = i.value.trim().toLowerCase();
  const filtered = keyword
    ? data.filter((d) => d.title.toLowerCase().includes(keyword))
    : data;
  render(filtered);
});

function render(list = []) {
  o.innerHTML = "";

  const keyword = i.value.trim().toLowerCase();

  if (!list.length) {
    list = [{ icon: "/assets/icon/wh.svg", title: "未找到结果", link: "" }];
  }

  list.forEach((item) => {
    const link = _a(item.link, "result-item");
    const icon = _img(item.icon);
    const div = _k();

    if (keyword && item.title.toLowerCase().includes(keyword)) {
      const regex = new RegExp(`(${keyword})`, "gi");
      div.innerHTML = item.title.replace(regex, `<span>$1</span>`);
    } else {
      div.innerText = item.title;
    }

    link.append(icon, div);
    o.append(link);
  });
}

window.addEventListener("pageshow", () => {
  const keyword = i.value.trim().toLowerCase();
  const filtered = keyword
    ? data.filter((d) => d.title.toLowerCase().includes(keyword))
    : data;
  render(filtered);
});

render(data);
