const $ = (selector) => document.querySelector(selector);
const $$ = (tag, cla, id, text) => {
  const el = document.createElement(tag);
  if (cla) el.className = cla;
  if (text) el.innerText = text;
  if (id) el.id = id;
  return el;
};

$(".controls-left").addEventListener("click", () => {
  if ($(".left").style.left === "-300px" || $(".left").style.left === "") {
    $(".left").style.left = "8px";
    $(".right").style.right = "-300px";
  } else {
    $(".left").style.left = "-300px";
  }
});

$(".controls-right").addEventListener("click", () => {
  if ($(".right").style.right === "-300px" || $(".right").style.right === "") {
    $(".right").style.right = "8px";
    $(".left").style.left = "-300px";
  } else {
    $(".right").style.right = "-300px";
  }
});

$(".author-avatar").addEventListener("click", () => {
  window.location.href = "/index.html";
});