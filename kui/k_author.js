class KAuthor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._data = null;
  }

  static get observedAttributes() {
    return ["cover", "avatar", "name", "desc", "color"];
  }

  attributeChangedCallback() {
    this.render();
  }

  set data(val) {
    this._data = val;
    this.render();
  }

  get data() {
    return this._data;
  }

  render() {
    const cover =
      this.getAttribute("cover") ||
      this._data?.cover ||
      "https://picsum.photos/1000";
    const avatar =
      this.getAttribute("avatar") ||
      this._data?.avatar ||
      "https://picsum.photos/200";
    const name =
      this.getAttribute("name") ?? this._data?.name ?? "ilue.top/1.html";
    const desc =
      this.getAttribute("desc") ?? this._data?.desc ?? "ilue.top/1.html";
    const color = this.getAttribute("color") ?? this._data?.color ?? "#fff";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          border-radius: 16px;
          position: relative;
          color: ${color};
        }
        .image {
          position: relative;
        }
        .cover {
          width: 100%;
          height: 200px;
          border-radius: 16px;
          object-fit: cover;
          vertical-align: bottom;
        }
        .avatar {
          width: 56px;
          height: 56px;
          border-radius: 8px;
          position: absolute;
          top: 16px;
          left: 16px;
          object-fit: cover;
          background: #fff;
        }
        .name {
          position: absolute;
          top: 80px;
          left: 16px;
          font-size: 16px;
          font-weight: bold;
        }
        .desc {
          position: absolute;
          bottom: 0;
          padding: 16px;
          font-size: 12px;
          opacity: 0.8;
        }
      </style>
      <div class="image">
        <img class="cover" src="${cover}" alt="cover" />
        <img class="avatar" src="${avatar}" alt="avatar" />
        <div class="name">${name}</div>
        <div class="desc">${desc}</div>
      </div>
    `;
  }
}

customElements.define("k-author", KAuthor);
