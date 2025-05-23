const data = [
  { src: "/m/music/1.ogg", name: "Astronomia" },
  { src: "/m/music/2.ogg", name: "Once Upon A Time" },
  { src: "/m/music/3.ogg", name: "逆时针向" },
];

const audio = document.querySelector(".music-audio");
const name = document.querySelector(".music-name");
const progress = document.querySelector(".music-progress");
const progressbar = document.querySelector(".music-progressbar");
const ctime = document.querySelector(".music-ctime");
const ttime = document.querySelector(".music-ttime");
const loop = document.querySelector(".music-loop");
const prev = document.querySelector(".music-prev");
const toggle = document.querySelector(".music-toggle");
const next = document.querySelector(".music-next");
const open = document.querySelector(".music-ul");
const list = document.querySelector(".music-li");

let index = 0;
let isloop = true;
let isplay = false;

data.forEach((item, idx) => {
  const mitem = document.createElement("div");
  mitem.classList.add("music-item");
  mitem.textContent = item.name;

  mitem.addEventListener("click", () => {
    index = idx;
    Play("");
  });

  list.append(mitem);
});

const Format = (seconds) => {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${minutes}:${secs}`;
};

const Update = () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressbar.style.left = `${percent - 100}%`;

  ctime.textContent = Format(audio.currentTime);
  ttime.textContent = isNaN(audio.duration) ? "00:00" : Format(audio.duration);

  loop.querySelector("img").src = isloop
    ? "/src/icon/listloop.svg"
    : "/src/icon/singleloop.svg";
  toggle.querySelector("img").src = audio.paused
    ? "/src/icon/pause.svg"
    : "/src/icon/play.svg";
};

const Prev = () => {
  index = (index - 1 + data.length) % data.length;
  Play("");
};

const Play = (time) => {
  name.textContent = data[index].name;
  audio.src = data[index].src;
  audio.currentTime = time;
  audio.play();
  isplay = true;
  Update();
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
  index = (index + 1) % data.length;
  Play("");
};

const To = (e) => {
  const progressBox = progress;
  const offsetX = e.offsetX;
  const width = progressBox.offsetWidth;
  const percent = (offsetX / width) * 100;
  audio.currentTime = (percent / 100) * audio.duration;
};

const Loop = () => {
  isloop = !isloop;
  loop.querySelector("img").src = isloop
    ? "/src/icon/listloop.svg"
    : "/src/icon/singleloop.svg";
};

const End = () => {
  if (!isloop) {
    Play(index);
  } else {
    index = (index + 1) % data.length;
    Play(index);
  }
};

audio.addEventListener("loadedmetadata", Update);
audio.addEventListener("timeupdate", Update);
audio.addEventListener("ended", End);

loop.addEventListener("click", Loop);
prev.addEventListener("click", Prev);
toggle.addEventListener("click", Toggle);
next.addEventListener("click", Next);
progress.addEventListener("click", To);

open.addEventListener("click", () => {
  name.classList.toggle("active");
  open.classList.toggle("active");
  list.classList.toggle("active");
});

Play(index);