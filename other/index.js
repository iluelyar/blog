document.getElementById("explode-btn").addEventListener("click", () => {
  const captureTarget = document.getElementById("target");
  const rect = captureTarget.getBoundingClientRect();

  html2canvas(captureTarget, { backgroundColor: null }).then((canvas) => {
    const w = canvas.width;
    const h = canvas.height;

    captureTarget.style.visibility = "hidden";

    const canvasWrapper = document.createElement("div");
    canvasWrapper.style.position = "fixed";
    canvasWrapper.style.left = rect.left + "px";
    canvasWrapper.style.top = rect.top + "px";
    canvasWrapper.style.width = rect.width + "px";
    canvasWrapper.style.height = rect.height + "px";
    canvasWrapper.style.zIndex = "9999";
    canvasWrapper.style.pointerEvents = "none";

    document.body.appendChild(canvasWrapper);

    const pieceSize = 20;
    const pieces = [];
    const scaleX = rect.width / w;
    const scaleY = rect.height / h;

    for (let y = 0; y < h; y += pieceSize) {
      for (let x = 0; x < w; x += pieceSize) {
        const pieceCanvas = document.createElement("canvas");
        pieceCanvas.width = pieceSize;
        pieceCanvas.height = pieceSize;
        pieceCanvas.style.position = "absolute";
        pieceCanvas.style.left = x * scaleX + "px";
        pieceCanvas.style.top = y * scaleY + "px";
        pieceCanvas.style.width = pieceSize * scaleX + "px";
        pieceCanvas.style.height = pieceSize * scaleY + "px";

        const pieceCtx = pieceCanvas.getContext("2d");
        pieceCtx.drawImage(
          canvas,
          x,
          y,
          pieceSize,
          pieceSize,
          0,
          0,
          pieceSize,
          pieceSize
        );

        canvasWrapper.appendChild(pieceCanvas);
        pieces.push(pieceCanvas);
      }
    }

    // 所有炸开动画的Promise集合
    const explodePromises = pieces.map((pieceCanvas) => {
      const dx = (Math.random() - 0.5) * 800;
      const dy = (Math.random() - 0.5) * 800;
      const rotate = (Math.random() - 0.5) * 720;

      // 保存位移和旋转，后续复原用
      pieceCanvas._explodeTransform = { dx, dy, rotate };

      const anim = pieceCanvas.animate(
        [
          { transform: "translate(0, 0) rotate(0deg)", opacity: 1 },
          {
            transform: `translate(${dx}px, ${dy}px) rotate(${rotate}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: 1000,
          easing: "ease-out",
          fill: "forwards",
        }
      );

      return anim.finished;
    });

    // 等所有炸开动画完成
    Promise.all(explodePromises).then(() => {
      // 等1秒缓冲
      setTimeout(() => {
        // 所有复原动画的Promise集合
        const restorePromises = pieces.map((pieceCanvas) => {
          const { dx, dy, rotate } = pieceCanvas._explodeTransform;

          const anim = pieceCanvas.animate(
            [
              {
                transform: `translate(${dx}px, ${dy}px) rotate(${rotate}deg)`,
                opacity: 0,
              },
              { transform: "translate(0, 0) rotate(0deg)", opacity: 1 },
            ],
            {
              duration: 1000,
              easing: "ease-in-out",
              fill: "forwards",
            }
          );

          return anim.finished;
        });

        // 复原动画全完后，可选择清理碎片
        Promise.all(restorePromises).then(() => {
          // 清理碎片，恢复原始元素显示
          canvasWrapper.remove();
          captureTarget.style.visibility = "visible";
        });
      }, 1000);
    });
  });
});
