import { useEffect, useRef } from "react";

export default function DNABackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track resizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = canvas.width = entry.contentRect.width || window.innerWidth;
        height = canvas.height = entry.contentRect.height || window.innerHeight;
      }
    });
    resizeObserver.observe(canvas.parentElement || document.body);

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Particle class for medical cells/crosses/particles
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      type: "dot" | "cross" | "ring";
      color: string;
      rotation: number;
      rotSpeed: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 60;

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.8) * 0.6 - 0.2, // Drift upwards slowly
        size: Math.random() * 6 + 2,
        alpha: Math.random() * 0.5 + 0.1,
        type: Math.random() > 0.85 ? "cross" : Math.random() > 0.7 ? "ring" : "dot",
        color: Math.random() > 0.6 ? "#0ea5e9" : "#38bdf8",
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    // DNA configuration
    let rotationAngle = 0;
    const basePairsCount = 28;
    const dnaHelixRadius = 110;
    const dnaSpeed = 0.006;

    // Draw helper for a 3D medical cross
    const drawCross = (cx: number, cy: number, size: number, color: string, alpha: number, angle: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = size * 0.3;
      
      // Horizontal bar
      ctx.moveTo(-size / 2, 0);
      ctx.lineTo(size / 2, 0);
      // Vertical bar
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(0, size / 2);
      ctx.stroke();
      ctx.restore();
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Draw subtle background ambient glow near mouse
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          10,
          mouse.x,
          mouse.y,
          width * 0.25
        );
        gradient.addColorStop(0, "rgba(14, 165, 233, 0.06)");
        gradient.addColorStop(1, "rgba(14, 165, 233, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw mathematical 3D DNA structure
      rotationAngle += dnaSpeed + (mouse.active ? (mouse.x - width / 2) / width * 0.015 : 0);
      
      const centerX = width * 0.78; // Offset to the right for widescreen elegance
      const centerY = height * 0.5;

      // Adjust for mobile screens
      const actualCenterX = width < 768 ? width * 0.5 : centerX;
      const actualCenterY = width < 768 ? height * 0.45 : centerY;
      const radiusScale = width < 768 ? 0.75 : 1;

      // Draw connector lines (bonds) and nodes
      for (let i = 0; i < basePairsCount; i++) {
        // Position along the helix axis (Y-axis vertical stretch)
        const progress = i / basePairsCount;
        const yOffset = (progress - 0.5) * (height * 0.8);
        const y = actualCenterY + yOffset;

        // Helix 1 coordinates
        const theta1 = rotationAngle + progress * Math.PI * 4;
        const x1_3d = Math.cos(theta1) * dnaHelixRadius * radiusScale;
        const z1_3d = Math.sin(theta1) * dnaHelixRadius * radiusScale; // depth

        // Helix 2 coordinates (180 degrees offset)
        const theta2 = theta1 + Math.PI;
        const x2_3d = Math.cos(theta2) * dnaHelixRadius * radiusScale;
        const z2_3d = Math.sin(theta2) * dnaHelixRadius * radiusScale; // depth

        // Apply mouse-following tilt/parallax to coordinates
        const xParallax = mouse.active ? (mouse.x - width / 2) * 0.08 : 0;
        const yParallax = mouse.active ? (mouse.y - height / 2) * 0.04 : 0;

        const x1 = actualCenterX + x1_3d + xParallax;
        const x2 = actualCenterX + x2_3d + xParallax;
        const finalY = y + yParallax;

        // Depth sorting effect (scale and opacity depending on Z depth)
        const sizeMultiplier1 = (z1_3d + dnaHelixRadius) / (dnaHelixRadius * 2) * 0.6 + 0.4;
        const sizeMultiplier2 = (z2_3d + dnaHelixRadius) / (dnaHelixRadius * 2) * 0.6 + 0.4;

        // Draw connecting ladder rungs (only if in front or faded if behind)
        ctx.beginPath();
        const rungGrad = ctx.createLinearGradient(x1, finalY, x2, finalY);
        rungGrad.addColorStop(0, `rgba(14, 165, 233, ${sizeMultiplier1 * 0.3})`);
        rungGrad.addColorStop(0.5, `rgba(56, 189, 248, ${Math.min(sizeMultiplier1, sizeMultiplier2) * 0.1})`);
        rungGrad.addColorStop(1, `rgba(16, 185, 129, ${sizeMultiplier2 * 0.3})`);
        ctx.strokeStyle = rungGrad;
        ctx.lineWidth = 1 * Math.min(sizeMultiplier1, sizeMultiplier2);
        ctx.moveTo(x1, finalY);
        ctx.lineTo(x2, finalY);
        ctx.stroke();

        // Node 1 (Medical Cyan Blue Strand)
        ctx.beginPath();
        ctx.arc(x1, finalY, 6 * sizeMultiplier1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 165, 233, ${sizeMultiplier1 * 0.85})`;
        ctx.shadowBlur = 10 * sizeMultiplier1;
        ctx.shadowColor = "#0ea5e9";
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow

        // Node 2 (Emerald/Mint Healthy Strand)
        ctx.beginPath();
        ctx.arc(x2, finalY, 6 * sizeMultiplier2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${sizeMultiplier2 * 0.85})`;
        ctx.shadowBlur = 10 * sizeMultiplier2;
        ctx.shadowColor = "#38bdf8";
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow

        // Add connecting small rungs within the base pairs
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.arc((x1 + x2) / 2, finalY, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
          ctx.fill();
        }
      }

      // Draw slowly rotating 3D Medical Cross in center-right background
      const crossSize = width < 768 ? 60 : 100;
      const crossX = actualCenterX;
      const crossY = actualCenterY + Math.sin(rotationAngle * 1.5) * 20; // gentle float
      
      ctx.save();
      ctx.shadowBlur = 30;
      ctx.shadowColor = "rgba(14, 165, 233, 0.4)";
      drawCross(
        crossX,
        crossY,
        crossSize,
        "rgba(14, 165, 233, 0.08)",
        0.3,
        rotationAngle * 0.3
      );
      ctx.restore();

      // Render floating medical particles & holographic symbols
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Interact with mouse (gravity repulsion)
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180 * 1.5;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Draw particle
        if (p.type === "cross") {
          drawCross(p.x, p.y, p.size * 1.8, p.color, p.alpha, p.rotation);
        } else if (p.type === "ring") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1;
          ctx.globalAlpha = p.alpha;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1.0; // reset alpha
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="dna-canvas"
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
