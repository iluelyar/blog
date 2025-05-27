class KIcon extends HTMLElement {
  static get observedAttributes() {
    return ["src", "name", "fill", "size"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback() {
    this.render();
  }

  async render() {
    const src = this.getAttribute("src") || "";
    const name = this.getAttribute("name") || "";
    const fill = this.getAttribute("fill") || "currentColor";
    const size = this.getAttribute("size") || "24";

    const url = `${src}/${name}.svg`;
    const res = await fetch(url);
    const raw = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(raw, "image/svg+xml");
    const svg = doc.querySelector("svg");

    svg.setAttribute("fill", fill);
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          width: ${size}px;
          height: ${size}px;
        }
        svg {
          display: block;
        }
      </style>
    `;
    this.shadowRoot.appendChild(svg);
  }
}

customElements.define("k-icon", KIcon);
