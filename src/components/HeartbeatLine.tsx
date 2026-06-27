import { useEffect, useRef } from "react";

interface HeartbeatLineProps {
  speed?: number; // frequency modifier
  color?: string; // shadow/stroke color
  height?: number;
  interactive?: boolean;
}

export default function HeartbeatLine({
  speed = 1.0,
  color = "#0ea5e9",
  height = 80,
  interactive = true,
}: HeartbeatLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = containerRef.current?.clientWidth || 400);
    canvas.height = height;

    const handleResize = () => {
      if (containerRef.current && canvas) {
        width = canvas.width = containerRef.current.clientWidth;
      }
    };

    window.addEventListener("resize", handleResize);

    // Physiological waveform formula variables
    let xOffset = 0;
    const points: { x: number; y: number }[] = [];

    // Pre-calculate standard physiological ECG beats
    const getECGValue = (x: number): number => {
      // Create repeating cycles
      const cycleWidth = 140 * speed;
      const t = x % cycleWidth;
      const center = cycleWidth * 0.5;
      const normalizedT = t - center;

      // Rest value (flat baseline)
      let val = 0;

      // P wave (at -30)
      if (normalizedT > -45 && normalizedT < -25) {
        val += Math.sin((normalizedT + 35) * Math.PI / 10) * 0.15;
      }
      
      // PR segment (flat)
      
      // QRS Complex
      // Q wave (at -12)
      if (normalizedT > -15 && normalizedT < -10) {
        val -= Math.sin((normalizedT + 12.5) * Math.PI / 2.5) * 0.3;
      }
      // R wave (at 0, major upward peak!)
      if (normalizedT > -10 && normalizedT < 10) {
        val += Math.cos(normalizedT * Math.PI / 10) * 2.2;
      }
      // S wave (at 12, major downward valley)
      if (normalizedT > 5 && normalizedT < 15) {
        val -= Math.sin((normalizedT - 10) * Math.PI / 5) * 0.7;
      }
      
      // T wave (at 35)
      if (normalizedT > 25 && normalizedT < 55) {
        val += Math.sin((normalizedT - 40) * Math.PI / 15) * 0.35;
      }

      // Inverse for canvas coordinates (so positive is up, center is baseline)
      return -val;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const baseline = height / 2;
      xOffset += 1.8 * speed;

      // Draw horizontal dashed grid lines
      ctx.beginPath();
      ctx.strokeStyle = "rgba(14, 165, 233, 0.04)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.moveTo(0, baseline);
      ctx.lineTo(width, baseline);
      ctx.moveTo(0, baseline - 25);
      ctx.lineTo(width, baseline - 25);
      ctx.moveTo(0, baseline + 25);
      ctx.lineTo(width, baseline + 25);
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dash

      // Calculate path points
      ctx.beginPath();
      
      // Horizontal gradient for fade on sides
      const lineGrad = ctx.createLinearGradient(0, 0, width, 0);
      lineGrad.addColorStop(0, "rgba(14, 165, 233, 0.05)");
      lineGrad.addColorStop(0.15, `${color}bb`);
      lineGrad.addColorStop(0.85, `${color}bb`);
      lineGrad.addColorStop(1, "rgba(14, 165, 233, 0.05)");

      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Shadow glow
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;

      for (let x = 0; x < width; x++) {
        // Sample ECG formula moving along the offset
        const yVal = getECGValue(x - xOffset);
        const y = baseline + yVal * 15;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      // Reset shadows
      ctx.shadowBlur = 0;

      // Draw the bright leading signal dot
      const leadX = (xOffset + width - 10) % width;
      const leadYVal = getECGValue(leadX - xOffset);
      const leadY = baseline + leadYVal * 15;

      ctx.beginPath();
      ctx.arc(leadX, leadY, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = 15;
      ctx.shadowColor = color;
      ctx.fill();
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [speed, color, height]);

  return (
    <div ref={containerRef} className="w-full relative select-none">
      <canvas ref={canvasRef} className="block w-full" />
    </div>
  );
}
