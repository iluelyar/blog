const slideBtn = document.querySelector(".slide-btn");
const panelBtn = document.querySelector(".panel-btn");
const slide = document.querySelector(".slide");
const panel = document.querySelector(".panel");

slideBtn.addEventListener("click", () => {
  const slideLeft = getComputedStyle(slide).left;
  const isSlideOpen = slideLeft === "8px";

  slide.style.left = isSlideOpen ? "-300px" : "8px";
  if (!isSlideOpen) panel.style.right = "-300px";
});

panelBtn.addEventListener("click", () => {
  const panelRight = getComputedStyle(panel).right;
  const isPanelOpen = panelRight === "8px";

  panel.style.right = isPanelOpen ? "-300px" : "8px";
  if (!isPanelOpen) slide.style.left = "-300px";
});
