class KCardPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.addSlideListener();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .kpanel {
          width: 300px;
          height: calc(100vh - 16px);
          padding: 40px 16px;
          border: 1px solid #fff5;
          backdrop-filter: blur(8px);
          position: sticky;
          top: 8px;
          border-radius: 16px;
          transition: transform 0.5s ease;
          z-index: 999;
          overflow: auto;
        }

        /* 默认面板隐藏 */
        .kpanel[data-slide="0"] {
          transform: translateX(300px);
        }

        /* 展开面板 */
        .kpanel[data-slide="1"] {
          transform: translateX(0);
        }

        @media (max-width: 640px) {
          .kpanel {
            position: fixed;
            top: 8px;
            right: -300px;
          }
        }

        @media (min-width: 641px) and (max-width: 1080px) {
          .kpanel {
            position: fixed;
            top: 8px;
            right: -300px;
          }
        }

        @media (min-width: 1081px) {
          .kpanel {
            position: fixed;
            top: 8px;
          }
        }
      </style>
  
      <div class="kpanel">
        <slot></slot>
      </div>
    `;
  }

  // 监听面板的显示和隐藏
  addSlideListener() {
    const kpanel = this.shadowRoot.querySelector('.kpanel');
    const panelToggleButton = document.querySelector('.panel-toggle-button');

    panelToggleButton.addEventListener('click', () => {
      const currentState = kpanel.getAttribute('data-slide');
      const newState = currentState === '1' ? '0' : '1';
      kpanel.setAttribute('data-slide', newState);
    });
  }
}

customElements.define("k-card-panel", KCardPanel);
