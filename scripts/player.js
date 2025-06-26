let kmp_i = 0;
let kmp_isloop = true;

const kmp_data = [
  {
    source: "/m/music/1.ogg",
    src: "/assets/img/cover.png",
    name: "Music A",
  },
  {
    source: "/m/music/2.ogg",
    src: "/assets/img/cover.png",
    name: "Music B",
  },
  {
    source: "/m/music/3.ogg",
    src: "/assets/img/cover.png",
    name: "Music C",
  },
];

const audio = _(".kmp audio");
const kmp_img = _(".kmp-img");
const kmp_name = _(".kmp-name");
const kmp_prr = _(".kmp-prr");
const kmp_bar = _(".kmp-bar");
const kmp_ct = _(".kmp-ct");
const kmp_tt = _(".kmp-tt");
const kmp_loop = _(".kmp-loop");
const kmp_prev = _(".kmp-prev");
const kmp_toggle = _(".kmp-toggle");
const kmp_next = _(".kmp-next");

const kmp_loop_icon = _(".kmp-loop img");
const kmp_toggle_icon = _(".kmp-toggle img");

const Format = (seconds) => {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${minutes}:${secs}`;
};

const Load = () => {
  kmp_img.style.backgroundImage = "url('" + kmp_data[kmp_i].src + "')";
  kmp_name.textContent = kmp_data[kmp_i].name;
};

const Update = () => {
  kmp_bar.style.left = (audio.currentTime / audio.duration - 1) * 100 + "%";

  kmp_ct.textContent = Format(audio.currentTime);
  kmp_tt.textContent = isNaN(audio.duration) ? "00:00" : Format(audio.duration);

  kmp_loop_icon.src = kmp_isloop
    ? "/assets/icon/ll.svg"
    : "/assets/icon/sl.svg";
  kmp_toggle_icon.src = audio.paused
    ? "/assets/icon/pause.svg"
    : "/assets/icon/play.svg";
};

const Prev = () => {
  kmp_i = (kmp_i - 1 + kmp_data.length) % kmp_data.length;
  Play();
};

const Play = (time = "0") => {
  audio.src = kmp_data[kmp_i].source;
  audio.currentTime = time;
  audio.play();
  Load();
};

const Pause = () => {
  audio.pause();
};

const Toggle = () => {
  const time = audio.currentTime;
  audio.paused ? Play(time) : Pause();
};

const Next = () => {
  kmp_i = (kmp_i + 1) % kmp_data.length;
  Play();
};

const To = (e) => {
  const width = kmp_prr.offsetWidth;
  const percent = (e.offsetX / width) * 100;
  audio.currentTime = (percent / 100) * audio.duration;
};

const Loop = () => {
  kmp_isloop = !kmp_isloop;
};

const End = () => {
  if (!kmp_isloop) {
    Play();
  } else {
    kmp_i = (kmp_i + 1) % kmp_data.length;
    Play();
  }
};

audio.addEventListener("loadedmetadata", Update);
audio.addEventListener("timeupdate", Update);
audio.addEventListener("ended", End);

kmp_loop.addEventListener("click", Loop);
kmp_prev.addEventListener("click", Prev);
kmp_toggle.addEventListener("click", Toggle);
kmp_next.addEventListener("click", Next);
kmp_prr.addEventListener("click", To);

Play(0);