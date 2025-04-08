class KSlide extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // 影子 DOM
  }

  connectedCallback() {
    this.render();
    this.addSearchListener();
  }

  static get observedAttributes() {
    return ["author-name", "author-desc"];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const authorName = this.getAttribute("author-name") || "K5938";
    const authorDesc = this.getAttribute("author-desc") || "要么庸俗，要么孤独";

    this.shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        a {
          text-decoration: none;
          color: inherit;
        }
        .left {
          width: 300px;
          height: calc(100vh - 16px);
          padding: 40px 16px;
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
        .author-name { 
          font-size: 2em;
        }       
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
          cursor: pointer;
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
        .search-result .result-item {
          border: 1px solid #fff5;
          border-radius: 8px;
        }
        .search-result .result-title {
          height: 40px;
          padding: 0 16px;
          line-height: 42px;
          font-size: 0.9em;
        }
      </style>
  
      <div class="left">
        <div class="author">
          <div class="author-avatar"></div>
          <div class="author-name">${authorName}</div>
          <div class="author-desc">${authorDesc}</div>
        </div>
        <div class="nav">
          ${this.createNavItems()}
        </div>
        <div class="search">
          <div class="search-box">
            <div class="search-icon">
              <img src="/assets/svg/search.svg" alt="" />
            </div>
            <input class="search-input" type="text" placeholder="搜索" autocomplete="off" />
          </div>
          <div class="search-result"></div>
        </div>
      </div>
    `;
  }

  createNavItems() {
    const links = [
      { href: "/index.html", icon: "menu" },
      { href: "/moments.html", icon: "moment" },
      { href: "/notes.html", icon: "note" },
      { href: "/visuals.html", icon: "visual" },
      { href: "/devtools.html", icon: "tool" },
      { href: "/projects.html", icon: "project" },
    ];
    return links
      .map(
        (link) => `
          <a href="${link.href}">
            <div class="nav-item">
              <img src="/assets/svg/${link.icon}.svg" alt="" />
            </div>
          </a>
        `
      )
      .join("");
  }

  addSearchListener() {
    const input = this.shadowRoot.querySelector(".search-input");
    const result = this.shadowRoot.querySelector(".search-result");

    const datas = [
      { title: "HTML + CSS 实现文件夹图片卡片效果", link: "/1.html" },
    ];

    const rend = (results) => {
      result.innerHTML = results.length === 0 ? `
        <div class="result-item">
          <div class="result-title">未找到相关结果</div>
        </div>
      `
      : results.map((data) => `
        <div class="result-item">
          <a href="${data.link}">
            <div class="result-title">${data.title}</div>
          </a>
        </div>
      `).join("");
    };

    rend(datas);

    input.addEventListener("input", () => {
      const keyword = input.value.trim().toLowerCase();

      if (!keyword) {
        rend(datas);
        return;
      }

      const fr = datas.filter((data) =>
        data.title.toLowerCase().includes(keyword)
      );
      rend(fr);
    });
  }
}

customElements.define("k-slide", KSlide);