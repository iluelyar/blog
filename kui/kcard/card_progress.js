export async function card_progress(el) {
  if (el.dataset.inited) return;
  el.dataset.inited = "true";

  const [htmlText, cssText] = await Promise.all([
    fetch("/kui/kcard/card_progress.html").then((res) => res.text()),
    fetch("/kui/kcard/card_progress.css").then((res) => res.text()),
  ]);

  el.innerHTML = htmlText;
  document.head.append($$("style", { text: cssText }));

  const father = el.querySelector(".kcheckbox.father");
  const children = Array.from(el.querySelectorAll(".kcheckbox.child"));
  const label = el.querySelector(".card-progress-label");
  const percent = el.querySelector(".card-progress-percent");
  const fill = el.querySelector(".card-progress-fill");

  function setChecked(el, state) {
    el.classList.toggle("checked", state);
    el.classList.remove("partial");
  }

  function updateFatherStatus() {
    const checkedCount = children.filter((c) =>
      c.classList.contains("checked")
    ).length;
    const totalCount = children.length;
    const percentValue = Math.round((checkedCount / totalCount) * 100);

    father.classList.remove("checked", "partial");

    if (checkedCount === totalCount) {
      father.classList.add("checked");
    } else if (checkedCount > 0) {
      father.classList.add("partial");
    }

    if (label) label.textContent = `${checkedCount}of${totalCount}`;
    if (percent) percent.textContent = `${percentValue}%`;
    if (fill) fill.style.width = `${percentValue}%`;
  }

  father.addEventListener("click", (e) => {
    e.preventDefault();
    const shouldCheckAll = !father.classList.contains("checked");
    children.forEach((child) => setChecked(child, shouldCheckAll));
    updateFatherStatus();
  });

  children.forEach((child, index) => {
    child.addEventListener("click", (e) => {
      e.preventDefault();
      const isChecked = child.classList.contains("checked");
      setChecked(child, !isChecked);
      updateFatherStatus();
    });
  });

  updateFatherStatus();
}
