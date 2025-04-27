export async function kcode(el) {
  if (el.dataset.inited) return;
  el.dataset.inited = "true";

  const [kcodeHtmlText, kcodeCssText] = await Promise.all([
    fetch("/kui/kcode/kcode.html").then((res) => res.text()),
    fetch("/kui/kcode/kcode.css").then((res) => res.text()),
  ]);

  document.head.append($$("style", { text: kcodeCssText }));
  el.innerHTML = kcodeHtmlText;

  const htmlPath = el.dataset.html;
  const cssPath = el.dataset.css;

  const [preHtmlText, preCssText] = await Promise.all([
    htmlPath ? fetch(htmlPath).then((res) => res.text()) : Promise.resolve(""),
    cssPath ? fetch(cssPath).then((res) => res.text()) : Promise.resolve(""),
  ]);

  const htmlBox = $(".html-box", el);
  const cssBox = $(".css-box", el);
  const copyHtmlBtn = $(".copy-html", el);
  const copyCssBtn = $(".copy-css", el);

  if (htmlBox) htmlBox.textContent = preHtmlText.trim();
  if (cssBox) cssBox.textContent = preCssText.trim();

  if (copyHtmlBtn) {
    copyHtmlBtn.addEventListener("click", async () => {
      await navigator.clipboard.writeText(preHtmlText.trim());
      copyHtmlBtn.textContent = "已复制";
      setTimeout(() => (copyHtmlBtn.textContent = "复制"), 1500);
    });
  }

  if (copyCssBtn) {
    copyCssBtn.addEventListener("click", async () => {
      await navigator.clipboard.writeText(preCssText.trim());
      copyCssBtn.textContent = "已复制";
      setTimeout(() => (copyCssBtn.textContent = "复制"), 1500);
    });
  }
}
