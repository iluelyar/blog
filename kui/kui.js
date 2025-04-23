import { kslide } from "./kslide/kslide.js";
import { kmain } from "./kmain/kmain.js";
import { kpanel } from "./kpanel/kpanel.js";
import { kcontr } from "./kcontr/kcontr.js";
import { km } from "./km/km.js";

const kui = {
  kslide,
  kmain,
  kpanel,
  kcontr,
  km,
};

async function createui(el) {
  const tag = el.tagName.toLowerCase();
  const fn = kui[tag];
  try {
    if (fn) await fn(el);
  } catch (err) {
    console.error(`[组件挂载失败] <${tag}>`, err);
  }

  el.querySelectorAll?.("*").forEach((child) => {
    const childtag = child.tagName.toLowerCase();
    if (kui[childtag]) {
      createui(child);
    }
  });
}

export async function setup() {
  const tags = Object.keys(kui);
  for (const tag of tags) {
    const nodes = document.querySelectorAll(tag);
    for (const el of nodes) {
      await createui(el);
    }
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        createui(node);
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}