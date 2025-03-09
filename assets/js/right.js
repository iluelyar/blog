const momentdata = [
  {
    avatar: "/assets/png/avatar.png",
    name: "K5938",
    moreLink: "/moments/index.html",
    time: "25/02/24 一 雨",
    content: "开学",
  },
  {
    avatar: "/assets/png/avatar.png",
    name: "K5938",
    moreLink: "/moments/index.html",
    time: "25/02/24 一 雨",
    content: "我上早八",
  },
  {
    avatar: "/assets/png/avatar.png",
    name: "K5938",
    moreLink: "/moments/index.html",
    time: "25/02/25 二 雨",
    content: "我上早八",
  },
  {
    avatar: "/assets/png/avatar.png",
    name: "K5938",
    moreLink: "/moments/index.html",
    time: "25/02/25 二 雨",
    content: "“今天阳光明媚，风也温柔” —— 群友",
  },
];

const moment = $(".moment");

momentdata.forEach((data) => {
  const item = $$("div","moment-item");
  item.innerHTML = `
    <div class="moment-avatar">
      <img src="${data.avatar}" alt="${data.name}" />
    </div>
    <div class="moment-name">${data.name}</div>
    <div class="moment-more" onclick="window.location.href='${moment.moreLink}'">
      <img src="/assets/svg/moment.svg" alt="more" />
    </div>
    <div class="moment-time">${data.time}</div>
    <div class="moment-content">${data.content}</div>
  `;
  moment.appendChild(item);
});
