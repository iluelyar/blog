const container = $(".kmoment");

fetch("/assets/json/moment.json")
  .then((response) => response.json())
  .then((kmoments) => {
    kmoments.forEach((kmoment) => {
      const item = $$("div", "kmoment-item");
      item.innerHTML = `
        <div class="kmoment-avatar">
          <img src="${kmoment.avatar}" alt="${kmoment.name}" />
        </div>
        <div class="kmoment-name">${kmoment.name}</div>
        <div class="kmoment-more" onclick="window.location.href='${kmoment.moreLink}'">
          <img src="/assets/svg/moment.svg" alt="more" />
        </div>
        <div class="kmoment-time">${kmoment.time}</div>
        <div class="kmoment-content">${kmoment.content}</div>
      `;

      container.appendChild(item);
    });
  });
