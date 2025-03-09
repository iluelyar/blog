const resultdata = [
  {
    "title": "HTML + CSS 实现文件夹图片卡片效果",
    "link": "/1.html"
  }
];

const result = $(".search-result");
const input = $(".search-input");

resultdata.forEach((data) => {
  const item = $$("div", "result-item");
  item.innerHTML = `
    <a href="${data.link}">
      <div class="result-title">${data.title}</div>
    </a>
  `;
  result.append(item);
});

input.addEventListener("input", () => {
  const keyword = input.value.toLowerCase();
  document.querySelectorAll(".card").forEach((item) => {
    const title = item.querySelector(".title").innerText.toLowerCase();
    if (title.includes(keyword)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});