class KNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._data = {};
  }
  set data(val) {
    this._data = val;
    this.render();
  }
  get data() {
    return this._data;
  }

  connectedCallback() {
    this.render();
  }
  render() {
    const d = this._data || {};
    const src = d.src;
    const columns = d.columns || 3;
    const borderColor = d.borderColor || "#000";
    const iconFill = d.iconFill || "#000";
    const iconSize = d.iconSize || "20";
    const items = d.items || [];

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: grid;
          grid-template-columns: repeat(${columns}, 1fr);
          gap: 8px;
        }
        a {
          text-decoration: none;
          color: inherit;
        }
        .item {
          height: 40px;
          border-radius: 8px;
          border: 1px solid var(--border-color, ${borderColor});
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: border-color 0.3s ease;
        }
        .item:hover {
          border-color: var(--fill-color, ${iconFill});
        }
      </style>
      ${items
        .map((item = {}) => {
          const {
            href = "",
            name = "",
            borderColor: itemBorderColor = borderColor,
            iconFill: itemIconFill = iconFill,
            iconSize: itemIconSize = iconSize,
          } = item;
          return `
            <a href="${href}">
              <div class="item" style="--border-color: ${itemBorderColor || borderColor};--fill-color: ${itemIconFill || iconFill};">
                <k-icon src="${src}" name="${name}" fill="${itemIconFill || iconFill}" size="${itemIconSize || iconSize}"></k-icon>
              </div>
            </a>`;}).join("")}
    `;
  }
}

customElements.define("k-nav", KNav);
