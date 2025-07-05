function KCube(target) {
  this.canvas = target;

  this.scene = new THREE.Scene();
  this.scene.background = null;

  this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  this.camera.position.set(20, 6, 20);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  this.scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 10, 7);
  this.scene.add(directionalLight);

  this.renderer = new THREE.WebGLRenderer({
    canvas: this.canvas,
    antialias: true,
    alpha: true,
  });

  this.camera.lookAt(new THREE.Vector3(0, 0, 0));

  this.setRendererSize();
  window.addEventListener("resize", this.setRendererSize.bind(this));
}

KCube.prototype.setRendererSize = function () {
  const rect = this.canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  this.camera.aspect = width / height;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(width, height, false);

  this.render();
};

KCube.prototype.generate = function (x, y, z, size = 1) {
  if (x === 0 || y === 0 || z === 0) return null;
  x = x < 0 ? x + 1 : x;
  y = y < 0 ? y + 1 : y;
  z = z < 0 ? z + 1 : z;

  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshPhongMaterial({
    color: 0x0077ff,
    shininess: 100,
    specular: 0x555555,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(x + size / 2 - 1, y + size / 2 - 1, z + size / 2 - 1);

  this.scene.add(cube);
};

KCube.prototype.ctrl = function (options = {}) {
  const camera = this.camera;
  const dom = this.renderer.domElement;

  const target = options.target || new THREE.Vector3(0, 0, 0);

  let isDragging = false;
  let lastX, lastY;

  const panSpeed = 0.1;

  dom.addEventListener("mousedown", (e) => {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
  });

  dom.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(camera.up, forward).normalize();

    const pan = new THREE.Vector3();
    pan.add(right.multiplyScalar(dx * panSpeed));
    pan.add(forward.multiplyScalar(dy * panSpeed));

    target.add(pan);
    camera.position.add(pan);

    camera.lookAt(target);
  });

  dom.addEventListener("mouseup", (e) => {
    if (e.button === 0) {
      isDragging = false;
    }
  });
  dom.addEventListener("mouseleave", () => {
    isDragging = false;
  });

  const radiusMin = options.radiusMin || 2;
  const radiusMax = options.radiusMax || 50;
  let radius = camera.position.distanceTo(target);

  dom.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      radius += e.deltaY * 0.01;
      radius = Math.max(radiusMin, Math.min(radiusMax, radius));

      const dir = new THREE.Vector3();
      dir.subVectors(camera.position, target).normalize();

      camera.position.copy(dir.multiplyScalar(radius).add(target));
      camera.lookAt(target);
    },
    { passive: false }
  );

  let touchStartDist = 0;
  let lastTouchCenter = null;

  dom.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        isDragging = false;
        // 双指开始
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchStartDist = Math.hypot(dx, dy);
        lastTouchCenter = {
          x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
          y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
        };
      }
    },
    { passive: true }
  );

  dom.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length === 1 && isDragging) {
        const touch = e.touches[0];
        const dx = touch.clientX - lastX;
        const dz = touch.clientY - lastY;
        lastX = touch.clientX;
        lastY = touch.clientY;

        const pan = new THREE.Vector3();
        const panSpeed = 0.02;

        const right = new THREE.Vector3();
        const forward = new THREE.Vector3();
        camera.getWorldDirection(forward);
        forward.y = 0;
        forward.normalize();
        right.crossVectors(camera.up, forward).normalize();

        pan.add(right.multiplyScalar(-dx * panSpeed));
        pan.add(forward.multiplyScalar(dz * panSpeed));

        target.add(pan);
        camera.position.add(pan);
        update();
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);

        // 双指缩放
        const zoom = touchStartDist - dist;
        radius += zoom * 0.01;
        radius = Math.max(radiusMin, Math.min(radiusMax, radius));
        touchStartDist = dist;

        // 双指平移
        const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        const dxCenter = centerX - lastTouchCenter.x;
        const dyCenter = centerY - lastTouchCenter.y;

        const pan = new THREE.Vector3();
        const panSpeed = 0.02;

        const right = new THREE.Vector3();
        const forward = new THREE.Vector3();
        camera.getWorldDirection(forward);
        forward.y = 0;
        forward.normalize();
        right.crossVectors(camera.up, forward).normalize();

        pan.add(right.multiplyScalar(-dxCenter * panSpeed));
        pan.add(forward.multiplyScalar(dyCenter * panSpeed));

        target.add(pan);
        camera.position.add(pan);

        lastTouchCenter = { x: centerX, y: centerY };

        update();
      }
    },
    { passive: false }
  );

  dom.addEventListener(
    "touchend",
    () => {
      isDragging = false;
      lastTouchCenter = null;
    },
    { passive: true }
  );
};

KCube.prototype.render = function () {
  if (this.controls) this.controls.update();
  this.renderer.render(this.scene, this.camera);
};

window.KCube = KCube;
