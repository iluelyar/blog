let father = document.querySelector(".kcheckbox.father");
let fatherInput = father.querySelector("input");
let children = Array.from(document.querySelectorAll(".kcheckbox.child"));
let childInputs = children.map((c) => c.querySelector("input"));

function setChecked(el, state) {
  el.classList.toggle("checked", state);
  el.classList.remove("partial");
}

function updateFatherStatus() {
  const checkedCount = children.filter((c) =>
    c.classList.contains("checked")
  ).length;
  father.classList.remove("checked", "partial");

  if (checkedCount === children.length) {
    father.classList.add("checked");
  } else if (checkedCount > 0) {
    father.classList.add("partial");
  }
}

fatherInput.addEventListener("click", (e) => {
  e.preventDefault();
  const shouldCheckAll = !father.classList.contains("checked");
  children.forEach((child) => setChecked(child, shouldCheckAll));
  updateFatherStatus();
});

childInputs.forEach((input, index) => {
  input.addEventListener("click", (e) => {
    e.preventDefault();
    const child = children[index];
    const isChecked = child.classList.contains("checked");
    setChecked(child, !isChecked);
    updateFatherStatus();
  });
});

updateFatherStatus();
