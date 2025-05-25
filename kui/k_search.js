function _0x3893() {
  const _0x1c0756 = [
    "getAttribute",
    "length",
    "8533899RQYhTJ",
    "forEach",
    "k-search",
    "attachShadow",
    "className",
    "div",
    ".search-input",
    "attributeChangedCallback",
    "\x0a\x20\x20\x20\x20\x20\x20<style>\x0a\x20\x20\x20\x20\x20\x20\x20\x20.search-box\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x201px\x20solid\x20#000;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x208px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20display:\x20flex;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20align-items:\x20center;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20.search-icon\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20width:\x2040px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20height:\x2040px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20display:\x20flex;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20justify-content:\x20center;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20align-items:\x20center;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20.search-input\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20flex-grow:\x201;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20#000;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20caret-color:\x20#000;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20transparent;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x20none;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20outline:\x20none;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-family:\x20FangYuan;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-size:\x201em;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x200\x208px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20.search-input::placeholder\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20#000;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20.search-result\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20display:\x20flex;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20flex-direction:\x20column;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20gap:\x208px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin-top:\x208px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20.result-item\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20height:\x2040px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x200\x2016px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x201px\x20solid\x20#000;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x208px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20white-space:\x20nowrap;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20line-height:\x2040px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-size:\x200.9em;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20#000;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20cursor:\x20pointer;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20overflow-x:\x20auto;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20.result-item::-webkit-scrollbar\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20display:\x20none;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20a\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20text-decoration:\x20none;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20inherit;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20</style>\x0a\x20\x20\x20\x20\x20\x20<div\x20class=\x22search-box\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22search-icon\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<k-icon\x20src=\x22src/icon\x22\x20name=\x22search\x22\x20size=\x2218\x22></k-icon>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<input\x20class=\x22search-input\x22\x20placeholder=\x22搜索\x22\x20/>\x0a\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20<div\x20class=\x22search-result\x22></div>\x0a\x20\x20\x20\x20",
    "filter",
    "_self",
    "parse",
    "toLowerCase",
    "innerHTML",
    "connectedCallback",
    "3801jatNMW",
    "setDataFromAttr",
    "146796xuzDzZ",
    "1070oBBgll",
    "title",
    "createElement",
    "4550252UfLOTB",
    "open",
    "textContent",
    "487176NeSVWd",
    "80LasyMT",
    "renderResult",
    "link",
    "shadowRoot",
    "includes",
    "12388730XeikIM",
    "attachEvents",
    "isArray",
    "appendChild",
    "observedAttributes",
    "data",
    "44618gBIjDb",
    "input",
    "536ixDiwm",
    "result-item",
    "define",
  ];
  _0x3893 = function () {
    return _0x1c0756;
  };
  return _0x3893();
}
const _0xf7c3d = _0x59ea;
function _0x59ea(_0x3c4493, _0x2fce3e) {
  const _0x3893c6 = _0x3893();
  return (
    (_0x59ea = function (_0x59ea31, _0x4999f1) {
      _0x59ea31 = _0x59ea31 - 0x121;
      let _0x4239fb = _0x3893c6[_0x59ea31];
      return _0x4239fb;
    }),
    _0x59ea(_0x3c4493, _0x2fce3e)
  );
}
(function (_0x31cb13, _0x4483c0) {
  const _0x279862 = _0x59ea,
    _0x168449 = _0x31cb13();
  while (!![]) {
    try {
      const _0x28adbe =
        -parseInt(_0x279862(0x137)) / 0x1 +
        (-parseInt(_0x279862(0x138)) / 0x2) *
          (parseInt(_0x279862(0x135)) / 0x3) +
        parseInt(_0x279862(0x13b)) / 0x4 +
        (-parseInt(_0x279862(0x13f)) / 0x5) *
          (-parseInt(_0x279862(0x13e)) / 0x6) +
        (parseInt(_0x279862(0x14a)) / 0x7) *
          (-parseInt(_0x279862(0x121)) / 0x8) +
        parseInt(_0x279862(0x126)) / 0x9 +
        -parseInt(_0x279862(0x144)) / 0xa;
      if (_0x28adbe === _0x4483c0) break;
      else _0x168449["push"](_0x168449["shift"]());
    } catch (_0x284c25) {
      _0x168449["push"](_0x168449["shift"]());
    }
  }
})(_0x3893, 0xda582);
class KSearch extends HTMLElement {
  constructor() {
    const _0x104433 = _0x59ea;
    super(),
      this[_0x104433(0x129)]({ mode: _0x104433(0x13c) }),
      (this["data"] = []);
  }
  static get [_0xf7c3d(0x148)]() {
    const _0x3b3bfc = _0xf7c3d;
    return [_0x3b3bfc(0x149)];
  }
  [_0xf7c3d(0x134)]() {
    const _0x432ee3 = _0xf7c3d;
    this["renderUI"](),
      this[_0x432ee3(0x136)](),
      this["renderResult"](this[_0x432ee3(0x149)]),
      this["attachEvents"]();
  }
  [_0xf7c3d(0x12d)](_0x4cb125, _0x3284b8, _0x40b8de) {
    const _0x1142b5 = _0xf7c3d;
    _0x4cb125 === _0x1142b5(0x149) &&
      (this[_0x1142b5(0x136)](),
      this[_0x1142b5(0x140)](this[_0x1142b5(0x149)]));
  }
  [_0xf7c3d(0x136)]() {
    const _0x140473 = _0xf7c3d,
      _0x47dcd2 = this[_0x140473(0x124)](_0x140473(0x149));
    let _0x43ccc0 = [];
    try {
      _0x43ccc0 = JSON[_0x140473(0x131)](_0x47dcd2);
    } catch {
      const _0x16c933 = window[_0x47dcd2];
      if (Array[_0x140473(0x146)](_0x16c933)) _0x43ccc0 = _0x16c933;
    }
    this["data"] = Array[_0x140473(0x146)](_0x43ccc0) ? _0x43ccc0 : [];
  }
  [_0xf7c3d(0x145)]() {
    const _0x3f9f66 = _0xf7c3d,
      _0x5b53a5 = this[_0x3f9f66(0x142)]["querySelector"](_0x3f9f66(0x12c));
    _0x5b53a5["addEventListener"](_0x3f9f66(0x14b), () => {
      const _0x52002f = _0x3f9f66,
        _0xf9c886 = _0x5b53a5["value"]["trim"]()["toLowerCase"](),
        _0x458615 = !_0xf9c886
          ? this[_0x52002f(0x149)]
          : this[_0x52002f(0x149)][_0x52002f(0x12f)]((_0x4e421b) =>
              _0x4e421b[_0x52002f(0x139)]
                [_0x52002f(0x132)]()
                [_0x52002f(0x143)](_0xf9c886)
            );
      this[_0x52002f(0x140)](_0x458615);
    });
  }
  ["renderUI"]() {
    const _0x307612 = _0xf7c3d;
    this[_0x307612(0x142)][_0x307612(0x133)] = _0x307612(0x12e);
  }
  [_0xf7c3d(0x140)](_0x3e5075 = []) {
    const _0x3fd78f = _0xf7c3d,
      _0x5688f7 = this[_0x3fd78f(0x142)]["querySelector"](".search-result");
    _0x5688f7["innerHTML"] = "";
    if (!_0x3e5075[_0x3fd78f(0x125)]) {
      const _0x3bd0ed = document[_0x3fd78f(0x13a)](_0x3fd78f(0x12b));
      (_0x3bd0ed[_0x3fd78f(0x13d)] = "未找到相关结果"),
        (_0x3bd0ed[_0x3fd78f(0x12a)] = "result-item"),
        _0x5688f7[_0x3fd78f(0x147)](_0x3bd0ed);
      return;
    }
    _0x3e5075[_0x3fd78f(0x127)]((_0x2b56e9) => {
      const _0x4d95c0 = _0x3fd78f,
        _0x494ee5 = document[_0x4d95c0(0x13a)]("a");
      (_0x494ee5["href"] = _0x2b56e9[_0x4d95c0(0x141)] || "#"),
        (_0x494ee5["target"] = _0x4d95c0(0x130));
      const _0x1b2e18 = document[_0x4d95c0(0x13a)](_0x4d95c0(0x12b));
      (_0x1b2e18["className"] = _0x4d95c0(0x122)),
        (_0x1b2e18[_0x4d95c0(0x13d)] = _0x2b56e9[_0x4d95c0(0x139)]),
        _0x494ee5[_0x4d95c0(0x147)](_0x1b2e18),
        _0x5688f7[_0x4d95c0(0x147)](_0x494ee5);
    });
  }
}
customElements[_0xf7c3d(0x123)](_0xf7c3d(0x128), KSearch);
