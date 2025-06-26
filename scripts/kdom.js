const _ = (selector) => document.querySelector(selector);

const _k = (cls = "", text = "", tag = "div", id = "") => {
  const el = document.createElement(tag);
  if (text) el.innerText = text;
  if (cls) el.className = cls;
  if (id) el.id = id;
  return el;
};

const _a = (
  href = "#",
  cls = "",
  text = "",
  id = "",
  name = "",
  target = "_self"
) => {
  const el = document.createElement("a");
  el.href = href;
  if (text) el.innerText = text;
  if (cls) el.className = cls;
  if (id) el.id = id;
  if (target) el.target = target;
  if (name) el.name = name;
  return el;
};

const _img = (src = "", cls = "", id = "", alt = "") => {
  const el = document.createElement("img");
  el.src = src;
  if (cls) el.className = cls;
  if (id) el.id = id;
  if (alt) el.alt = alt;
  return el;
};
