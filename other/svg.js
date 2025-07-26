export const svgNS = "http://www.w3.org/2000/svg";

export function createSvgElement(tag, attrs = {}) {
  const el = document.createElementNS(svgNS, tag);
  for (const [key, val] of Object.entries(attrs)) {
    el.setAttribute(key, val);
  }
  return el;
}

export function createSvgContainer(viewBox = "-100 -100 200 200") {
  const svg = createSvgElement("svg", { viewBox });
  return svg;
}

// 弧度与角度转换函数
export function degToRad(deg) {
  return deg * (Math.PI / 180);
}
export function radToDeg(rad) {
  return rad * (180 / Math.PI);
}

// 根据角度和半径获取坐标
export function getCoordinate(deg, radius) {
  return {
    x: Math.cos(degToRad(deg)) * radius,
    y: Math.sin(degToRad(deg)) * radius,
  };
}
