export async function kmoment(el) {
  if (el.dataset.inited) return;
  el.dataset.inited = "true";

  const [htmlText, cssText, dataList] = await Promise.all([
    fetch("/kui/kmoment/kmoment.html").then((res) => res.text()),
    fetch("/kui/kmoment/kmoment.css").then((res) => res.text()),
    fetch("/kui/kmoment/data.json").then((res) => res.json()),
  ]);

  document.head.append($$("style", { text: cssText }));
  el.innerHTML += htmlText;

  function renderContent(content) {
    const contbox = $$("div", { className: "moment-content" });

    if (content.text) {
      content.text.forEach((text) => {
        const textElement = $$("p", { className: "moment-text", text });
        contbox.appendChild(textElement);
      });
    }

    if (content.images) {
      const grid = $$("div", { className: "moment-grid" });
      content.images.forEach((img) => {
        const imgDiv = $$("div", { className: "moment-img" });
        imgDiv.appendChild($img(img, { alt: "image" }));
        grid.appendChild(imgDiv);
      });
      contbox.appendChild(grid);
    }

    if (content.video) {
      const video = $$("video", { attrs: { controls: "" } });
      video.innerHTML = `<source src="${content.video}" type="video/mp4">`;
      contbox.appendChild(video);
    }

    if (content.audio) {
      const audio = $$("audio", { attrs: { controls: true } });
      audio.innerHTML = `<source src="${content.audio}" type="audio/mpeg">`;
      contbox.appendChild(audio);
    }

    if (content.link) {
      const linkElement = $$("a", {
        className: "moment-link",
        href: content.link,
        target: "_blank",
        text: "🔗 点击查看链接",
      });
      contbox.appendChild(linkElement);
    }

    return contbox;
  }

  dataList.forEach((data) => {
    const item = $$("div", { className: "moment-item" });

    const avatarDiv = $$("div", { className: "moment-avatar" });
    avatarDiv.appendChild($img(data.avatar, { alt: data.name }));

    const nameDiv = $$("div", { className: "moment-name", text: data.name });

    const moreDiv = $$("div", { className: "moment-more" });
    const moreImg = $img("/src/icon/moment.svg", { alt: "more" });
    moreDiv.appendChild(moreImg);
    moreDiv.addEventListener(
      "click",
      () => (window.location.href = data.moreLink)
    );

    const timeDiv = $$("div", { className: "moment-time", text: data.time });

    item.append(avatarDiv, nameDiv, moreDiv, timeDiv);

    if (data.content) {
      item.append(renderContent(data.content));
    }

    el.append(item);
  });
}
