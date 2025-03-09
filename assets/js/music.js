const musicdata = [
  { src: "/moments/music/1.ogg", name: "Astronomia" },
  { src: "/moments/music/2.ogg", name: "Once Upon A Time" },
  { src: "/moments/music/3.ogg", name: "逆时针向" },
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
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
  title.textContent = musicdata[index].name;

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
  index = (index - 1 + musicdata.length) % musicdata.length;
  Play("");
};

const Play = (time) => {
  audio.src = musicdata[index].src;
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
  index = (index + 1) % musicdata.length;
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
    index = (index + 1) % musicdata.length;
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

Play(index);