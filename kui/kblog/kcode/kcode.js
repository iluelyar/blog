export async function kcode(el) {
  if (el.dataset.inited) return;
  el.dataset.inited = "true";

  const htmlPath = el.dataset.html;
  const cssPath = el.dataset.css;
  const jsPath = el.dataset.js;

  const data = {
    htmlFilePath: htmlPath,
    cssFilePath: cssPath,
    jsFileName: jsPath ? jsPath.split("/").pop() : null,
    htmlFileName: htmlPath.split("/").pop(),
    cssFileName: cssPath.split("/").pop(),
    jsFileName: jsPath ? jsPath.split("/").pop() : null,
    outHtml: await fetch("/kui/kblog/kcode/kcode.html").then((res) =>
      res.text()
    ),
    outCss: await fetch("/kui/kblog/kcode/kcode.css").then((res) => res.text()),
    innerHtml: await fetch(htmlPath).then((res) => res.text()),
    innerCss: await fetch(cssPath).then((res) => res.text()),
    innerJs: await fetch(jsPath).then((res) => res.text()),
  };

  document.head.append($$("style", { text: data.outCss }));

  el.innerHTML = data.outHtml;

  renderHtmlBlock(el, data);
  renderCssBlock(el, data);
  if (jsPath) {
    renderJsBlock(el, data);
  }
}

function renderHtmlBlock(el, data) {
  const htmlBox = $(".kcode-html", el);
  const codeBox = $(".kcode-body", htmlBox);
  const title = $(".kcode-title", htmlBox);
  const copyBtn = $(".kcode-copy", htmlBox);
  const wrapBtn = $(".kcode-wrap", htmlBox);

  title.textContent = data.htmlFileName;
  codeBox.textContent = data.innerHtml.trim();

  copyBtn.onclick = () => {
    navigator.clipboard.writeText(data.innerHtml.trim()).then(() => {});
  };

  let wrapped = true;
  wrapBtn.onclick = () => {
    wrapped = !wrapped;
    codeBox.style.whiteSpace = wrapped ? "pre-wrap" : "pre";
  };
}

function renderCssBlock(el, data) {
  const cssBox = $(".kcode-css", el);
  const codeBox = $(".kcode-body", cssBox);
  const title = $(".kcode-title", cssBox);
  const copyBtn = $(".kcode-copy", cssBox);
  const wrapBtn = $(".kcode-wrap", cssBox);

  title.textContent = data.cssFileName;
  codeBox.textContent = data.innerCss.trim();

  copyBtn.onclick = () => {
    navigator.clipboard.writeText(data.innerCss.trim()).then(() => {
      alert("CSS 代码已复制！");
    });
  };

  let wrapped = true;
  wrapBtn.onclick = () => {
    wrapped = !wrapped;
    codeBox.style.whiteSpace = wrapped ? "pre-wrap" : "pre";
  };
}

function renderJsBlock(el, data) {
  const jsBox = $(".kcode-js", el);
  jsBox.style.display = "block";

  const codeBox = $(".kcode-body", jsBox);
  const title = $(".kcode-title", jsBox);
  const copyBtn = $(".kcode-copy", jsBox);
  const wrapBtn = $(".kcode-wrap", jsBox);

  title.textContent = data.jsFileName;
  codeBox.textContent = data.innerJs.trim();

  copyBtn.onclick = () => {
    navigator.clipboard.writeText(data.innerJs.trim()).then(() => {
      alert("JS 代码已复制！");
    });
  };

  let wrapped = true;
  wrapBtn.onclick = () => {
    wrapped = !wrapped;
    codeBox.style.whiteSpace = wrapped ? "pre-wrap" : "pre";
  };
}
