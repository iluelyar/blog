const $ = (selector) => document.querySelector(selector);
const $$ = (tagname, classname, idname, content) => {
  const element = document.createElement(tagname);
  if (classname) element.className = classname;
  if (idname) element.id = idname;
  if (content) element.innerText = content;
  return element;
};

$(".kcontrols-left").addEventListener("click", () => {
  if (
    $(".kleft-container").style.left === "-300px" ||
    $(".kleft-container").style.left === ""
  ) {
    $(".kleft-container").style.left = "8px";
    $(".kright-container").style.right = "-300px";
  } else {
    $(".kleft-container").style.left = "-300px";
  }
});

$(".kcontrols-right").addEventListener("click", () => {
  if (
    $(".kright-container").style.right === "-300px" ||
    $(".kright-container").style.right === ""
  ) {
    $(".kright-container").style.right = "8px";
    $(".kleft-container").style.left = "-300px";
  } else {
    $(".kright-container").style.right = "-300px";
  }
});

$(".author-avatar").addEventListener("click", () => {
  window.location.href = "/index.html";
});

const music = [
  {
    name: "Jiaye - Tony Igy-Astronomia",
    src: "/moments/music/Jiaye - Tony Igy-Astronomia.ogg",
  },
  {
    name: "Once Upon A Time",
    src: "/moments/music/Once Upon A Time.ogg",
  },
  { name: "逆时针向", src: "/moments/music/逆时针向.ogg" },
];

const audio = document.getElementById("audio");
const name = document.getElementById("name");
const progress = document.getElementById("progress");
const progressbar = document.getElementById("progressbar");
const ctime = document.getElementById("ctime");
const ttime = document.getElementById("ttime");
const loop = document.getElementById("loop");
const prev = document.getElementById("prev");
const toggle = document.getElementById("toggle");
const next = document.getElementById("next");

let index = 0;
let isloop = true;
let isplay = false;

const Format = (seconds) => {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${minutes}:${secs}`;
};

const Update = () => {
  name.textContent = music[index].name;

  const percent = (audio.currentTime / audio.duration) * 100;
  progressbar.style.left = `${percent - 100}%`;

  ctime.textContent = Format(audio.currentTime);
  ttime.textContent = isNaN(audio.duration) ? "00:00" : Format(audio.duration);

  loop.querySelector("img").src = isloop
    ? "/assets/svg/listloop.svg"
    : "/assets/svg/singleloop.svg";
  toggle.querySelector("img").src = audio.paused
    ? "/assets/svg/pause.svg"
    : "/assets/svg/play.svg";
};

const Prev = () => {
  index = (index - 1 + music.length) % music.length;
  Play("");
};

const Play = (time) => {
  audio.src = music[index].src;
  audio.currentTime = time;
  audio.play();
  isplay = true;
};

const Pause = () => {
  audio.pause();
  isplay = false;
};

const Toggle = () => {
  const time = audio.currentTime;
  if (audio.paused) {
    Play(time);
  } else {
    Pause();
  }
};

const Next = () => {
  index = (index + 1) % music.length;
  Play("");
};

const To = (e) => {
  const offsetX = e.offsetX;
  const width = progress.offsetWidth;
  const percent = (offsetX / width) * 100;
  audio.currentTime = (percent / 100) * audio.duration;
};

const Loop = () => {
  isloop = !isloop;
  loop.querySelector("img").src = isloop
    ? "/assets/svg/listloop.svg"
    : "/assets/svg/singleloop.svg";
};

const End = () => {
  if (!isloop) {
    Play(index);
  } else {
    index = (index + 1) % music.length;
    Play(index);
  }
};

// 事件监听
audio.addEventListener("loadedmetadata", Update); // 音频元数据加载后更新显示
audio.addEventListener("timeupdate", Update); // 播放过程中持续更新进度
audio.addEventListener("ended", End); // 音乐播放完毕后处理

// 控制按钮点击事件
loop.addEventListener("click", Loop);
prev.addEventListener("click", Prev);
toggle.addEventListener("click", Toggle);
next.addEventListener("click", Next);
progress.addEventListener("click", To);

Play(index);
