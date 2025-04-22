class KBlogContr extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        .controls {
          width: 40px;
          position: fixed;
          right: 24px;
          bottom: 24px;
          border: 1px solid #fff5;
          backdrop-filter: blur(8px);
          border-radius: 8px;
          overflow: hidden;
          z-index: 999;
        }
        .controls-slide,
        .controls-panel {
          width: 40px;
          height: 40px;
          display: flex;
          cursor: pointer;
        }
        .controls-slide img,
        .controls-panel img {
          width: 24px;
          height: 24px;
          margin: auto;
        }

        @media (max-width: 640px) {
          .controls-slide { display: flex; }
          .controls-panel { display: flex; }
        }
        @media (min-width: 641px) and (max-width: 1080px) {
          .controls-slide { display: none; }
          .controls-panel { display: flex; }
        }
        @media (min-width: 1081px) {
          .controls { display: none; }
        }
      </style>
      <div class="controls">
        <div class="controls-slide" title="展开左侧菜单">
          <img src="/assets/svg/slider.svg" alt="slide" />
        </div>
        <div class="controls-panel" title="展开右侧卡片">
          <img src="/assets/svg/bar.svg" alt="panel" />
        </div>
      </div>
    `;

    const slideBtn = this.shadowRoot.querySelector(".controls-slide");
    const panelBtn = this.shadowRoot.querySelector(".controls-panel");

    // 控制左侧菜单
    slideBtn.addEventListener("click", () => {
      const currentState = document
        .querySelector(".blog")
        .getAttribute("data-slide");
      const newState = currentState === "1" ? "0" : "1"; // 切换状态
      document.querySelector(".blog").setAttribute("data-slide", newState);
      document.querySelector(".blog").setAttribute("data-panel", "0"); // 隐藏右侧卡片
    });

    // 控制右侧卡片面板
    panelBtn.addEventListener("click", () => {
      const currentState = document
        .querySelector(".blog")
        .getAttribute("data-panel");
      const newState = currentState === "1" ? "0" : "1"; // 切换状态
      document.querySelector(".blog").setAttribute("data-panel", newState);
      document.querySelector(".blog").setAttribute("data-slide", "0"); // 隐藏左侧菜单
    });
  }
}

customElements.define("k-blog-contr", KBlogContr);
