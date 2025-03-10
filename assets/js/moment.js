fetch('/assets/json/momentdata.json')
  .then(response => response.json())
  .then(momentdata => {
    const moment = $(".moment");

    function renderContent(content) {
      const contbox = $$("div", "moment-content");

      if (content.text) {
        content.text.forEach((text) => {
          const textElement = $$("p", "moment-text");
          textElement.textContent = text;
          contbox.appendChild(textElement);
        });
      }

      if (content.images) {
        const grid = $$("div", "moment-grid");
        content.images.forEach((img) => {
          const imgDiv = $$("div", "moment-img");
          imgDiv.innerHTML = `<img src="${img}" alt="image" />`;
          grid.appendChild(imgDiv);
        });
        contbox.appendChild(grid);
      }

      if (content.video) {
        contbox.innerHTML += `<video controls><source src="${content.video}" type="video/mp4"></video>`;
      }

      if (content.audio) {
        contbox.innerHTML += `<audio controls><source src="${content.audio}" type="audio/mpeg"></audio>`;
      }

      if (content.link) {
        const linkElement = $$("a", "moment-link");
        linkElement.href = content.link;
        linkElement.target = "_blank";
        linkElement.textContent = "🔗 点击查看链接";
        contbox.appendChild(linkElement);
      }

      return contbox;
    }

    momentdata.forEach((data) => {
      const item = $$("div", "moment-item");
      item.innerHTML = `
        <div class="moment-avatar">
          <img src="${data.avatar}" alt="${data.name}" />
        </div>
        <div class="moment-name">${data.name}</div>
        <div class="moment-more" onclick="window.location.href='${data.moreLink}'">
          <img src="/assets/svg/moment.svg" alt="more" />
        </div>
        <div class="moment-time">${data.time}</div>
      `;

      if (data.content) {
        item.appendChild(renderContent(data.content));
      }

      moment.appendChild(item);
    });
  })