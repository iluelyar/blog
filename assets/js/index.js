const $ = (selector) => document.querySelector(selector);

const $$ = (tag, name, id, text) => {
  const el = document.createElement(tag);
  if (name) el.className = name;
  if (id) el.id = id;
  if (text) el.innerText = text;
  return el;
};

const $a = (href, text = "", name = "", id = "") => {
  const el = document.createElement("a");
  el.href = href;
  if (text) el.innerText = text;
  if (name) el.className = name;
  if (id) el.id = id;
  return el;
};

const $img = (src, alt = "", name = "", id = "") => {
  const el = document.createElement("img");
  el.src = src;
  el.alt = alt;
  if (name) el.className = name;
  if (id) el.id = id;
  return el;
};