const $ = (selector, scope = document) => scope.querySelector(selector);

const $$ = (
  tag,
  { className = "", id = "", text = "", html = "", attrs = {} } = {}
) => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (id) el.id = id;
  if (text) el.textContent = text;
  if (html) el.innerHTML = html;
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  return el;
};

const $a = (
  href,
  {
    text = "",
    className = "",
    id = "",
    target = "_blank",
    rel = "noopener",
    attrs = {},
  } = {}
) => {
  const el = document.createElement("a");
  el.href = href;
  el.textContent = text;
  el.className = className;
  el.id = id;
  el.target = target;
  el.rel = rel;
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  return el;
};

const $img = (src, { alt = "", className = "", id = "", attrs = {} } = {}) => {
  const el = document.createElement("img");
  el.src = src;
  el.alt = alt;
  el.className = className;
  el.id = id;
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  return el;
};
