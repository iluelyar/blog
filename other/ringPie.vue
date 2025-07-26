<script setup>
import { ref, watch, onMounted } from 'vue';

import { degToRad, radToDeg, getCoordinate } from './svg.js';

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  showBase: {
    type: Boolean,
    default: true,
  },
  showLine: {
    type: Boolean,
    default: true,
  },
});

const svgRef = ref(null);

function createPathData(val, i, deg0, total) {
  const r4 = 60;
  const r1 = 30;
  const r6 = 4;
  const deg1 = (val / total) * 360;
  const deg2 = radToDeg(Math.asin(r6 / (r4 - r6)));
  const r5 = (Math.sin(degToRad(deg2)) * r1) / (1 - Math.sin(degToRad(deg2)));
  const r2 = Math.sqrt((r1 + r5) ** 2 - r5 ** 2);
  const r3 = Math.sqrt((r4 - r6) ** 2 - r6 ** 2);

  const { x: x11, y: y11 } = getCoordinate(deg0 + deg2, r1);
  const { x: x12, y: y12 } = getCoordinate(deg0, r2);
  const { x: x13, y: y13 } = getCoordinate(deg0, r3);
  const { x: x14, y: y14 } = getCoordinate(deg0 + deg2, r4);

  const { x: x21, y: y21 } = getCoordinate(deg0 + deg1 - deg2, r1);
  const { x: x22, y: y22 } = getCoordinate(deg0 + deg1, r2);
  const { x: x23, y: y23 } = getCoordinate(deg0 + deg1, r3);
  const { x: x24, y: y24 } = getCoordinate(deg0 + deg1 - deg2, r4);

  const flag = deg1 > 180 ? 1 : 0;

  return `
    M ${x11} ${y11}
    A ${r5} ${r5} 0 ${flag} 1 ${x12} ${y12}
    L ${x13} ${y13}
    A ${r6} ${r6} 0 ${flag} 1 ${x14} ${y14}
    A ${r4} ${r4} 0 ${flag} 1 ${x24} ${y24}
    A ${r6} ${r6} 0 ${flag} 1 ${x23} ${y23}
    L ${x22} ${y22}
    A ${r5} ${r5} 0 ${flag} 1 ${x21} ${y21}
    A ${r1} ${r1} 0 ${flag} 0 ${x11} ${y11}
    Z
  `;
}

function renderBase(svg, data) {
  const total = data.reduce((sum, v) => sum + v, 0);
  let deg0 = 0;
  data.forEach((val, i) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", createPathData(val, i, deg0, total).trim());
    path.setAttribute("fill", `hsl(${i * 30}, 80%, 50%)`);
    path.setAttribute("stroke", "#fff");
    path.setAttribute("stroke-width", "1");
    svg.appendChild(path);
    deg0 += (val / total) * 360;
  });
}

function renderLine(svg, data) {
  const total = data.reduce((sum, v) => sum + v, 0);
  let deg0 = 0;
  const r4 = 60;
  const r7 = 20;
  const r8 = 15;

  data.forEach((val, i) => {
    const deg1 = (val / total) * 360;
    const degMid = deg0 + deg1 / 2;
    const { x: x1, y: y1 } = getCoordinate(degMid, r4 - 1);
    const { x: x2, y: y2 } = getCoordinate(degMid, r4 + r7);
    const isLeft = degMid > 90 && degMid < 270;
    const x3 = isLeft ? x2 - r8 : x2 + r8;
    const y3 = y2;

    const createLine = (x1, y1, x2, y2) => {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute("stroke", `hsl(${i * 30}, 80%, 50%)`);
      line.setAttribute("stroke-width", 0.5);
      return line;
    };

    const radialLine = createLine(x1, y1, x2, y2);
    const horizontalLine = createLine(x2, y2, x3, y3);

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", x3);
    label.setAttribute("y", y3 - 4);
    label.setAttribute("font-size", 8);
    label.setAttribute("text-anchor", isLeft ? "start" : "end");
    label.setAttribute("dominant-baseline", "middle");
    label.setAttribute("fill", `hsl(${i * 30}, 80%, 50%)`);
    label.textContent = val;

    svg.append(radialLine, horizontalLine, label);
    deg0 += deg1;
  });
}

function clearSvg(svg) {
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }
}

watch(() => props.data, (newData) => {
  if (!svgRef.value) return;
  clearSvg(svgRef.value);
  if (props.showBase) renderBase(svgRef.value, newData);
  if (props.showLine) renderLine(svgRef.value, newData);
}, { immediate: true });

onMounted(() => {
  if (!svgRef.value) return;
  clearSvg(svgRef.value);
  if (props.showBase) renderBase(svgRef.value, props.data);
  if (props.showLine) renderLine(svgRef.value, props.data);
});
</script>

<template>
  <svg
    ref="svgRef"
    width="160"
    height="160"
    viewBox="-80 -80 160 160"
    xmlns="http://www.w3.org/2000/svg"
  ></svg>
</template>

<style scoped>
svg {
  display: block;
  margin: auto;
}
</style>
