class KSlide extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.addSearchListener();
  }

  render() {
    const navLinks = [
      { href: "/index.html", icon: "menu" },
      { href: "/m.html", icon: "moment" },
      { href: "/n.html", icon: "note" },
      { href: "/v.html", icon: "visual" },
      { href: "/d.html", icon: "tool" },
      { href: "/p.html", icon: "project" },
    ];

    const style = `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      a { text-decoration: none; color: inherit; }
      .kslide {
        width: 300px;
        height: calc(100vh - 16px);
        padding: 40px 16px;
        border: 1px solid #fff5;
        backdrop-filter: blur(8px);
        position: sticky;
        top: 8px;
        border-radius: 16px;
        transition: all 0.5s ease;
        z-index: 999;
        overflow: auto;
      }
      .author {
        width: 100%;
        height: 56px;
        display: grid;
        grid-template-columns: 56px 1fr;
        grid-template-rows: 32px 24px;
        column-gap: 16px;
      }
      .author-avatar {
        width: 56px;
        height: 56px;
        background: url(/assets/png/avatar.png) center/cover;
        border-radius: 16px;
        grid-row: 1 / 3;
        transform: rotateZ(-15deg);
      }
      .author-name { font-size: 2em; }
      .author-desc { font-size: 0.9em; }
      .nav {
        width: 100%;
        margin: 24px 0 0 0;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
      }
      .nav-item {
        height: 40px;
        border-radius: 8px;
        border: 1px solid #fff5;
        display: flex;     
        transition: background 0.2s ease;
        cursor: pointer;
      }
      .nav-item:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      .nav-item img {
        width: 20px;
        height: 20px;
        margin: auto;
      }
      .search {
        margin: 8px 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .search-box {
        border: 1px solid #fff5;
        border-radius: 8px;
        display: flex;
      }
      .search-box .search-icon {
        width: 40px;
        height: 40px;
        display: flex;
      }
      .search-box .search-icon img {
        width: 16px;
        height: 16px;
        margin: auto;
      }
      .search-box input {
        width: calc(100% - 48px);
        background: none;
        outline: none;
        border: none;
        color: white;
        caret-color: white;
        font-family: JM, "宋体";
      }
      .search-box input::placeholder {
        font-family: JM, "宋体";
        color: white;
      }
      .search-result {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .result-item {
        border: 1px solid #fff5;
        border-radius: 8px;
        transition: background 0.2s ease;
        cursor: pointer;
      }
      .result-item:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      .result-title {
        height: 40px;
        padding: 0 16px;
        line-height: 42px;
        font-size: 0.9em;
      }
      @media (max-width: 640px) {
        .kslide {
          position: fixed;
          top: 8px;
          left: -300px;
        }
      }
      @media (min-width: 641px) and (max-width: 1080px) {
        .kslide {
          position: fixed;
          top: 8px;
        }
      }
      @media (min-width: 1081px) {
        .kslide {
          position: fixed;
          top: 8px;
        }
      }
      .kslide[data-slide="0"] {
          left: -300px;
      }
      .kslide[data-slide="1"] {
          left: 0px;
      }
    `;

    const html = `
      <div class="kslide">
        <div class="author">
          <div class="author-avatar"></div>
          <div class="author-name">K5938</div>
          <div class="author-desc">要么庸俗，要么孤独</div>
        </div>
        <div class="nav">
          ${navLinks
            .map(
              (link) => `
            <a href="${link.href}">
              <div class="nav-item">
                <img src="/assets/svg/${link.icon}.svg" alt="${link.icon}" />
              </div>
            </a>
          `
            )
            .join("")}
        </div>
        <div class="search">
          <div class="search-box">
            <div class="search-icon">
              <img src="/assets/svg/search.svg" alt="search" />
            </div>
            <input class="search-input" type="text" placeholder="搜索" autocomplete="off" />
          </div>
          <div class="search-result"></div>
        </div>
      </div>
    `;

    this.shadowRoot.innerHTML = `<style>${style}</style>${html}`;
  }

  addSearchListener() {
    const slideBtn = this.shadowRoot.querySelector(".controls-slide");
    slideBtn.addEventListener("click", () => {
      const currentState = this.shadowRoot
        .querySelector(".kslide")
        .getAttribute("data-slide");
      const newState = currentState === "1" ? "0" : "1";
      this.shadowRoot
        .querySelector(".kslide")
        .setAttribute("data-slide", newState);
    });

    const input = this.shadowRoot.querySelector(".search-input");
    const result = this.shadowRoot.querySelector(".search-result");

    const datas = [
      { title: "HTML + CSS 实现文件夹图片卡片效果", link: "/1.html" },
      { title: "JavaScript 实现待办事项排序功能", link: "/todo-sort.html" },
      { title: "大学生时间管理技巧", link: "/study-tips.html" },
      { title: "KChart 图表库初探", link: "/kchart-intro.html" },
      { title: "如何使用 D3.js 绘制饼图", link: "/d3-pie.html" },
    ];

    const renderResult = (results) => {
      if (results.length === 0) {
        result.innerHTML = `
          <div class="result-item">
            <div class="result-title">未找到相关结果</div>
          </div>
        `;
      } else {
        result.innerHTML = results
          .map(
            (data) => `
                <div class="result-item">
                  <a href="${data.link}">
                    <div class="result-title">${data.title}</div>
                  </a>
                </div>`
          )
          .join("");
      }
    };

    renderResult(datas);

    input.addEventListener("input", () => {
      const keyword = input.value.trim().toLowerCase();
      const filtered = !keyword
        ? datas
        : datas.filter((data) => data.title.toLowerCase().includes(keyword));
      renderResult(filtered);
    });
  }
}

customElements.define("k-slide", KSlide);
