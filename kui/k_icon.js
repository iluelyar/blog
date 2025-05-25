const _0x43b046 = _0xf484;
(function (_0x4b5145, _0x44f6a2) {
  const _0x5ca6ee = _0xf484,
    _0x5513bf = _0x4b5145();
  while (!![]) {
    try {
      const _0x66fdb0 =
        parseInt(_0x5ca6ee(0x1c7)) / 0x1 +
        parseInt(_0x5ca6ee(0x1c9)) / 0x2 +
        -parseInt(_0x5ca6ee(0x1cb)) / 0x3 +
        (parseInt(_0x5ca6ee(0x1c2)) / 0x4) *
          (parseInt(_0x5ca6ee(0x1c5)) / 0x5) +
        (parseInt(_0x5ca6ee(0x1bc)) / 0x6) *
          (-parseInt(_0x5ca6ee(0x1bd)) / 0x7) +
        parseInt(_0x5ca6ee(0x1c3)) / 0x8 +
        -parseInt(_0x5ca6ee(0x1c4)) / 0x9;
      if (_0x66fdb0 === _0x44f6a2) break;
      else _0x5513bf["push"](_0x5513bf["shift"]());
    } catch (_0x337e7b) {
      _0x5513bf["push"](_0x5513bf["shift"]());
    }
  }
})(_0x37ac, 0x353e2);
function _0x37ac() {
  const _0x379d27 = [
    "currentColor",
    "querySelector",
    "px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20svg\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20display:\x20block;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20</style>\x0a\x20\x20\x20\x20",
    "fill",
    "k-icon",
    "define",
    "attributeChangedCallback",
    "render",
    "svg",
    "2294778dPMWiX",
    "7hrZuTM",
    "px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20height:\x20",
    "image/svg+xml",
    "name",
    "appendChild",
    "4akNZZF",
    "3179160Qpvpij",
    "88668WGRDxJ",
    "548305FkvEYd",
    "attachShadow",
    "407414IuuHSR",
    "text",
    "107012biKRbX",
    "getAttribute",
    "1072737QbsFya",
    "height",
    "size",
    "\x0a\x20\x20\x20\x20\x20\x20<style>\x0a\x20\x20\x20\x20\x20\x20\x20\x20:host\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20display:\x20inline-block;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20width:\x20",
    "setAttribute",
    "innerHTML",
    "shadowRoot",
  ];
  _0x37ac = function () {
    return _0x379d27;
  };
  return _0x37ac();
}
class KIcon extends HTMLElement {
  static get ["observedAttributes"]() {
    const _0x5de014 = _0xf484;
    return ["src", _0x5de014(0x1c0), _0x5de014(0x1b6), _0x5de014(0x1cd)];
  }
  constructor() {
    const _0x28402f = _0xf484;
    super(), this[_0x28402f(0x1c6)]({ mode: "open" });
  }
  [_0x43b046(0x1b9)]() {
    const _0x2ef2f9 = _0x43b046;
    this[_0x2ef2f9(0x1ba)]();
  }
  async [_0x43b046(0x1ba)]() {
    const _0x778a26 = _0x43b046,
      _0x50b66f = this["getAttribute"]("src") || "",
      _0x37a113 = this[_0x778a26(0x1ca)](_0x778a26(0x1c0)) || "",
      _0x338c49 = this[_0x778a26(0x1ca)](_0x778a26(0x1b6)) || _0x778a26(0x1d2),
      _0x2a78aa = this["getAttribute"]("size") || "24",
      _0x302466 = _0x50b66f + "/" + _0x37a113 + ".svg",
      _0x37477b = await fetch(_0x302466),
      _0x1f0eea = await _0x37477b[_0x778a26(0x1c8)](),
      _0x5968ac = new DOMParser(),
      _0x47df63 = _0x5968ac["parseFromString"](_0x1f0eea, _0x778a26(0x1bf)),
      _0x11c2fa = _0x47df63[_0x778a26(0x1d3)](_0x778a26(0x1bb));
    _0x11c2fa["setAttribute"](_0x778a26(0x1b6), _0x338c49),
      _0x11c2fa[_0x778a26(0x1cf)]("width", _0x2a78aa),
      _0x11c2fa[_0x778a26(0x1cf)](_0x778a26(0x1cc), _0x2a78aa),
      (this[_0x778a26(0x1d1)][_0x778a26(0x1d0)] =
        _0x778a26(0x1ce) +
        _0x2a78aa +
        _0x778a26(0x1be) +
        _0x2a78aa +
        _0x778a26(0x1d4)),
      this["shadowRoot"][_0x778a26(0x1c1)](_0x11c2fa);
  }
}
function _0xf484(_0x54c4da, _0x4af292) {
  const _0x37acb2 = _0x37ac();
  return (
    (_0xf484 = function (_0xf484b, _0x6edaba) {
      _0xf484b = _0xf484b - 0x1b6;
      let _0x4df2c3 = _0x37acb2[_0xf484b];
      return _0x4df2c3;
    }),
    _0xf484(_0x54c4da, _0x4af292)
  );
}
customElements[_0x43b046(0x1b8)](_0x43b046(0x1b7), KIcon);
