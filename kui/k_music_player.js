class MusicPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._data = [];
  }

  set data(val) {
    if (!Array.isArray(val)) return;
    this._data = val;
    this.render();
  }

  get data() {
    return this._data;
  }

  connectedCallback() {
    const attr = this.getAttribute("data");
    if (attr) {
      try {
        const parsed = JSON.parse(attr);
        if (Array.isArray(parsed)) this.data = parsed;
      } catch (e) {
        console.warn("无效 data 属性：", e);
      }
    } else {
      this.render();
    }
  }

  render() {
    this.index = 0;
    this.isloop = true;
    this.isplay = false;

    this.shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .music {
          height: 240px;
          padding: 16px;
          background-color: #a63131;
          border-radius: 16px;
          display: grid;
          grid-template-columns: 1fr 40px 40px 40px 1fr;
          grid-template-rows: 1fr 8px 16px 40px;
          gap: 8px;
          color: #fff;
        }
        .music-audio {
          display: none;
        }
        .music-name {
          grid-column: 1 / 6;
          width: 100%;
          font-size: 2em;
          overflow: auto;
        }
        .music-li {
          grid-column: 1 / 6;
          width: 100%;
          flex-wrap: wrap;
          flex-direction: row;
          align-content: flex-start;
          gap: 8px;
          overflow: auto;
          display: none;
        }
        .music-li .music-item {
          display: inline-block;
          padding: 4px 8px;
          border: 1px solid #fff;
          border-radius: 4px;
          cursor: pointer;
        }
        .music-name.active {
          display: none;
        }
        .music-li.active {
          display: flex;
        }
        .music-progress {
          grid-column: 1/6;
          width: 100%;
          height: 8px;
          background-color: #fff5;
          border-radius: 8px;
          position: relative;
          overflow: hidden;
        }
        .music-progressbar {
          width: 100%;
          height: 100%;
          background-color: #fff;
          border-radius: 8px;
          position: absolute;
          left: -100%;
          top: 0;
          pointer-events: none;
        }
        .music-ttime {
          grid-column: 2/6;
          text-align: right;
        }
        .music-loop,
        .music-prev,
        .music-toggle,
        .music-next,
        .music-ul {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          border: 1px solid #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .music-ul {
          margin-left: auto;
        }
      </style>
      <div class="music">
        <audio class="music-audio"></audio>
        <div class="music-name"></div>
        <div class="music-li"></div>
        <div class="music-progress">
          <div class="music-progressbar"></div>
        </div>
        <div class="music-ctime">00:00</div>
        <div class="music-ttime">00:00</div>
        <div class="music-loop">
          <k-icon src="/src/icon" name="listloop" size="16"></k-icon>
        </div>
        <div class="music-prev">
          <k-icon src="/src/icon" name="prev" size="16"></k-icon>
        </div>
        <div class="music-toggle">
          <k-icon src="/src/icon" name="pause" size="16"></k-icon>
        </div>
        <div class="music-next">
          <k-icon src="/src/icon" name="next" size="16"></k-icon>
        </div>
        <div class="music-ul">
          <k-icon src="/src/icon" name="bar" size="16"></k-icon>
        </div>
      </div>
    `;

    const $ = (sel) => this.shadowRoot.querySelector(sel);
    this.audio = $(".music-audio");
    this.nameEl = $(".music-name");
    this.progress = $(".music-progress");
    this.progressBar = $(".music-progressbar");
    this.ctime = $(".music-ctime");
    this.ttime = $(".music-ttime");
    this.loopBtn = $(".music-loop");
    this.prevBtn = $(".music-prev");
    this.toggleBtn = $(".music-toggle");
    this.nextBtn = $(".music-next");
    this.openBtn = $(".music-ul");
    this.listEl = $(".music-li");

    this.loopIcon = this.loopBtn.querySelector("k-icon");
    this.toggleIcon = this.toggleBtn.querySelector("k-icon");

    this.Format = (seconds) => {
      const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
      const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
      return `${minutes}:${secs}`;
    };

    this.data.forEach((m, n) => {
      const item = document.createElement("div");
      item.classList.add("music-item");
      item.textContent = m.name;

      item.addEventListener("click", () => {
        this.index = n;
        this.Play("");
      });

      this.listEl.append(item);
    });

    this.Update = () => {
      this.nameEl.textContent = this.data[this.index].name;

      const percent = (this.audio.currentTime / this.audio.duration) * 100;
      this.progressBar.style.left = `${percent - 100}%`;

      this.ctime.textContent = this.Format(this.audio.currentTime);
      this.ttime.textContent = isNaN(this.audio.duration)
        ? "00:00"
        : this.Format(this.audio.duration);

      this.loopIcon.setAttribute(
        "name",
        this.isloop ? "listloop" : "singleloop"
      );
      this.toggleIcon.setAttribute(
        "name",
        this.audio.paused ? "pause" : "play"
      );
    };

    this.Prev = () => {
      this.index = (this.index - 1 + this.data.length) % this.data.length;
      this.Play(0);
    };

    this.Play = (time) => {
      this.audio.src = this.data[this.index].src;
      this.audio.currentTime = time;
      this.audio.play();
      this.isplay = true;
      this.Update();
    };

    this.Pause = () => {
      this.audio.pause();
      this.isplay = false;
    };

    this.Toggle = () => {
      const time = this.audio.currentTime;
      this.audio.paused ? this.Play(time) : this.Pause();
    };

    this.Next = () => {
      this.index = (this.index + 1) % this.data.length;
      this.Play(0);
    };

    this.To = (e) => {
      const width = this.progress.offsetWidth;
      const percent = (e.offsetX / width) * 100;
      this.audio.currentTime = (percent / 100) * this.audio.duration;
    };

    this.Loop = () => {
      this.isloop = !this.isloop;
      this.Update();
    };

    this.End = () => {
      if (!this.isloop) {
        this.Play(0);
      } else {
        this.index = (this.index + 1) % this.data.length;
        this.Play(0);
      }
    };

    this.audio.addEventListener("loadedmetadata", this.Update);
    this.audio.addEventListener("timeupdate", this.Update);
    this.audio.addEventListener("ended", this.End);

    this.loopBtn.addEventListener("click", this.Loop);
    this.prevBtn.addEventListener("click", this.Prev);
    this.toggleBtn.addEventListener("click", this.Toggle);
    this.nextBtn.addEventListener("click", this.Next);
    this.progress.addEventListener("click", this.To);

    this.openBtn.addEventListener("click", () => {
      this.nameEl.classList.toggle("active");
      this.openBtn.classList.toggle("active");
      this.listEl.classList.toggle("active");
    });

    this.Play(this.index);
  }
}

customElements.define("k-music-player", MusicPlayer);
