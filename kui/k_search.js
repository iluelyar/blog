class KSearch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._data = [];
  }

  set data(val) {
    if (!Array.isArray(val)) return;
    this._data = val;
    this.render();
  }

  get data() {
    return this._data;
  }

  connectedCallback() {
    const attr = this.getAttribute("data");
    if (attr) {
      try {
        const parsed = JSON.parse(attr);
        if (Array.isArray(parsed)) this.data = parsed;
      } catch (e) {
        console.warn("无效 data 属性：", e);
      }
    } else {
      this.render();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .search-box {
          border: 1px solid #000;
          border-radius: 8px;
          display: flex;
          align-items: center;
        }
        .search-icon {
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .search-input {
          flex-grow: 1;
          color: #000;
          caret-color: #000;
          background: transparent;
          border: none;
          outline: none;
          font-family: FangYuan;
          font-size: 1em;
          padding: 0 8px;
        }
        .search-input::placeholder {
          color: #000;
        }
        .search-result {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 8px;
        }
        .result-item {
          height: 40px;
          padding: 0 16px;
          border: 1px solid #000;
          border-radius: 8px;
          white-space: nowrap;
          line-height: 40px;
          font-size: 0.9em;
          color: #000;
          cursor: pointer;
          overflow-x: auto;
        }
        .result-item::-webkit-scrollbar {
          display: none;
        }
        a {
          text-decoration: none;
          color: inherit;
        }
      </style>
      <div class="search-box">
        <div class="search-icon">
          <k-icon src="src/icon" name="search" size="18"></k-icon>
        </div>
        <input class="search-input" placeholder="搜索" />
      </div>
      <div class="search-result"></div>
    `;
    const input = this.shadowRoot.querySelector(".search-input");

    input.addEventListener("input", () => {
      const keyword = input.value.trim().toLowerCase();
      const filtered = keyword
        ? this.data.filter((d) => d.title.toLowerCase().includes(keyword))
        : this.data;
      this.renderResult(filtered);
    });

    this.renderResult(this.data);
  }

  renderResult(list) {
    const result = this.shadowRoot.querySelector(".search-result");
    result.innerHTML = "";

    if (!list.length) {
      const noResult = document.createElement("div");
      noResult.textContent = "未找到相关结果";
      noResult.className = "result-item";
      result.appendChild(noResult);
      return;
    }

    list.forEach((d) => {
      const link = document.createElement("a");
      link.href = d.link || "https://ilue.top";
      link.target = "_self";

      const item = document.createElement("div");
      item.className = "result-item";
      item.textContent = d.title;

      link.appendChild(item);
      result.appendChild(link);
    });
  }
}

customElements.define("k-search", KSearch);
