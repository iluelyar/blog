import { kslide } from "/kui/kblog/kslide/kslide.js";
import { kmain } from "/kui/kblog/kmain/kmain.js";
import { kpanel } from "/kui/kblog/kpanel/kpanel.js";
import { kcontr } from "/kui/kblog/kcontr/kcontr.js";
import { kmoment } from "/kui/kblog/kmoment/kmoment.js";
import { kview } from "/kui/kblog/kview/kview.js";
import { kcode } from "/kui/kblog/kcode/kcode.js";
import { card_album } from "/kui/kcard/card_album.js";
import { music_player } from "/kui/ktool/music_player.js";
import { card_progress } from "/kui/kcard/card_progress.js";

const kui = {
  kslide,
  kmain,
  kpanel,
  kcontr,
  kmoment,
  kview,
  kcode,
  card_album,
  music_player,
  card_progress,
};

const initializedElements = new WeakMap();
const tags = Object.keys(kui);

async function createui(el) {
  if (initializedElements.has(el)) return;
  initializedElements.set(el, true);

  const tag = el.tagName.toLowerCase();
  const fn = kui[tag];
  if (!fn) return;

  try {
    await fn(el);
    await new Promise(requestAnimationFrame);

    for (const child of el.querySelectorAll("*")) {
      await createui(child);
    }
  } catch (err) {
    console.error(`[组件挂载失败] <${tag}>`, err);
  }
}

export async function setup() {
  const allElements = tags.flatMap(tag => [...document.querySelectorAll(tag)]);

  for (const el of allElements) {
    await createui(el);
  }

  const observer = new MutationObserver(async (mutations) => {
    const newElements = new Set();

    for (const { addedNodes } of mutations) {
      for (const node of addedNodes) {
        if (!(node instanceof HTMLElement)) continue;

        if (kui[node.tagName.toLowerCase()]) {
          newElements.add(node);
        }
        for (const child of node.querySelectorAll("*")) {
          if (kui[child.tagName.toLowerCase()]) {
            newElements.add(child);
          }
        }
      }
    }

    const elements = [...newElements].sort((a, b) =>
      a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
    );

    for (const el of elements) {
      await createui(el);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
