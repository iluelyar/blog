function Kthree(target, bg, cx, cy, cz, tx, ty, tz) {
  this.canvas = canvas;

  this.scene = new THREE.Scene();
  this.scene.background = bg;

  this.camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );

  this.camera.position.set(cx, cy, cz);
  this.camera.lookAt(tx, ty, tz);

  this.renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });

  this.renderer.setPixelRatio(window.devicePixelRatio);

  this.update();
  window.addEventListener("resize", () => this.update());

  this.animate();
}

Kthree.prototype.update = function () {
  const rect = this.canvas.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;

  this.camera.aspect = w / h;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(w, h, false);
};

Kthree.prototype.render = function () {
  this.renderer.render(this.scene, this.camera);
};

Kthree.prototype.animate = function () {
  this.render();
  requestAnimationFrame(() => this.animate());
};

Kthree.prototype.axes = function (d) {
  const axesHelper = new THREE.AxesHelper(d);
  this.scene.add(axesHelper);
};

Kthree.prototype.box = function (
  sx,
  sy,
  sz,
  x,
  y,
  z,
  diffuseMap,
  repeat = 1,
  opacity = 1,
  metalness = 0,
  roughness = 1
) {
  const loader = new THREE.TextureLoader();
  const tex = loader.load(diffuseMap, (t) => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat, repeat);
  });

  const geo = new THREE.BoxGeometry(sx, sy, sz);
  geo.attributes.uv2 = geo.attributes.uv;

  const mat = new THREE.MeshStandardMaterial({
    map: tex,
    transparent: opacity < 1,
    opacity,
    metalness,
    roughness,
  });

  const box = new THREE.Mesh(geo, mat);
  box.position.set(x + sx / 2, y + sy / 2, z + sz / 2);
  this.scene.add(box);
  return box;
};

Kthree.prototype.light = function (x, y, z) {
  const ambient = new THREE.AmbientLight(0xffffff, 0.3);
  this.scene.add(ambient);

  const dir = new THREE.DirectionalLight(0xffffff, 0.8);
  dir.position.set(x, y, z);
  dir.castShadow = true;
  this.scene.add(dir);
};

Kthree.prototype.control = function (cx, cy, cz, tx, ty, tz) {
  const dom = this.renderer.domElement;
  let isDragging = false;
  let lastX = 0;
  let lastY = 0;

  let angleXZ = Math.atan2(cx - tx, cz - tz);
  let distance = Math.sqrt((cx - tx) ** 2 + (cy - ty) ** 2 + (cz - tz) ** 2);
  let elevation = cy - ty;

  const updateCamera = () => {
    const radiusXZ = Math.sqrt(distance ** 2 - elevation ** 2);
    const posX = Math.sin(angleXZ) * radiusXZ + tx;
    const posY = ty + elevation;
    const posZ = Math.cos(angleXZ) * radiusXZ + tz;
    this.camera.position.set(posX, posY, posZ);
    this.camera.lookAt(tx, ty, tz);
  };

  updateCamera();

  dom.addEventListener("mousedown", (e) => {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
  });

  dom.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;

    angleXZ -= dx * 0.01;
    elevation += dy * 0.1; 

    const maxElev = distance * 0.95;
    const minElev = -maxElev;
    elevation = Math.max(minElev, Math.min(maxElev, elevation));

    updateCamera();

    lastX = e.clientX;
    lastY = e.clientY;
  });

  ["mouseup", "mouseleave"].forEach((event) =>
    dom.addEventListener(event, () => (isDragging = false))
  );
};

window.Kthree = Kthree;