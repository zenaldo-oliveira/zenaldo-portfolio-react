import { useEffect, useRef } from "react";

export default function HyperspaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationId = null;
    let stars = [];
    let lastTime = 0;

    const mouse = { x: 0, y: 0 };
    const camera = { x: 0, y: 0 };

    const depth = 1400;
    const speed = 340;

    function createStar(randomDepth = true) {
      return {
        x: (Math.random() - 0.5) * width * 2.5,
        y: (Math.random() - 0.5) * height * 2.5,
        z: randomDepth ? Math.random() * depth + 1 : depth,
        brightness: 0.5 + Math.random() * 0.5,
        size: 0.5 + Math.random() * 1.4,
      };
    }

    function resize() {
      const bounds = canvas.getBoundingClientRect();

      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        750,
        Math.max(140, Math.round((width * height) / 1700)),
      );

      stars = Array.from({ length: count }, () => createStar());
    }

    function project(star, z) {
      const perspective = 520 / Math.max(z, 1);

      return {
        x: width / 2 + camera.x + star.x * perspective,
        y: height / 2 + camera.y + star.y * perspective,
      };
    }

    function drawFrame(timestamp) {
      const delta = lastTime
        ? Math.min((timestamp - lastTime) / 1000, 0.05)
        : 0;

      lastTime = timestamp;

      camera.x += (mouse.x - camera.x) * Math.min(1, delta * 2);
      camera.y += (mouse.y - camera.y) * Math.min(1, delta * 2);

      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(
        width / 2 + camera.x,
        height / 2 + camera.y,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8,
      );

      glow.addColorStop(0, "rgba(15, 48, 100, 0.24)");
      glow.addColorStop(0.5, "rgba(8, 20, 52, 0.13)");
      glow.addColorStop(1, "rgba(3, 7, 18, 0)");

      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        let star = stars[i];

        const previousZ = star.z;
        star.z -= speed * delta;

        if (star.z <= 1) {
          stars[i] = createStar(false);
          continue;
        }

        const start = project(star, previousZ);
        const end = project(star, star.z);

        if (
          end.x < -100 ||
          end.x > width + 100 ||
          end.y < -100 ||
          end.y > height + 100
        ) {
          stars[i] = createStar(false);
          continue;
        }

        const proximity = 1 - star.z / depth;
        const alpha = Math.min(1, Math.max(0.12, proximity * star.brightness));

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);

        ctx.strokeStyle = `rgba(150, 205, 255, ${alpha})`;
        ctx.lineWidth = Math.min(3.5, star.size * (0.5 + proximity * 2));

        ctx.lineCap = "round";
        ctx.stroke();
      }

      animationId = requestAnimationFrame(drawFrame);
    }

    function drawStaticFrame() {
      camera.x = 0;
      camera.y = 0;

      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, width, height);

      for (const star of stars) {
        const position = project(star, star.z);

        ctx.beginPath();
        ctx.arc(position.x, position.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(170, 210, 255, 0.65)";
        ctx.fill();
      }
    }

    function onMouseMove(event) {
      const bounds = canvas.getBoundingClientRect();

      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;

      mouse.x = (0.5 - x) * width * 0.16;
      mouse.y = (0.5 - y) * height * 0.16;
    }

    function onMouseLeave() {
      mouse.x = 0;
      mouse.y = 0;
    }

    function start() {
      cancelAnimationFrame(animationId);
      animationId = null;
      lastTime = 0;

      if (reducedMotion.matches) {
        drawStaticFrame();
      } else {
        animationId = requestAnimationFrame(drawFrame);
      }
    }

    function onVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
        animationId = null;
      } else {
        start();
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      start();
    });

    resizeObserver.observe(canvas);

    const interactionArea = canvas.parentElement;

    interactionArea?.addEventListener("pointermove", onMouseMove, {
      passive: true,
    });

    interactionArea?.addEventListener("pointerleave", onMouseLeave);

    document.addEventListener("visibilitychange", onVisibilityChange);

    reducedMotion.addEventListener("change", start);

    resize();
    start();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();

      interactionArea?.removeEventListener("pointermove", onMouseMove);

      interactionArea?.removeEventListener("pointerleave", onMouseLeave);

      document.removeEventListener("visibilitychange", onVisibilityChange);

      reducedMotion.removeEventListener("change", start);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="entrada-hyperspace" aria-hidden="true" />
  );
}
