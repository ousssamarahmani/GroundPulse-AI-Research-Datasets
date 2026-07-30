import React, { useEffect, useRef } from 'react';

interface OscilloscopeCanvasProps {
  snr: number;
  isAnomaly: boolean;
  carrierLock: boolean;
}

export const OscilloscopeCanvas: React.FC<OscilloscopeCanvasProps> = ({ snr, isAnomaly, carrierLock }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let phase = 0;

    const render = () => {
      phase += 0.05;
      const width = (canvas.width = canvas.parentElement?.clientWidth || 600);
      const height = (canvas.height = 160);

      ctx.clearRect(0, 0, width, height);

      // Background grid lines
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 1;

      // Draw horizontal baseline
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Vertical divisions
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Sine Wave Parameters
      ctx.strokeStyle = carrierLock ? '#ffffff' : '#71717a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      const amplitude = Math.max(5, Math.min(60, (snr / 20.0) * 50));
      const freq = isAnomaly ? 0.08 : 0.04;
      const noiseLevel = isAnomaly ? 15 : Math.max(1, 12 - snr);

      for (let x = 0; x < width; x++) {
        const noise = (Math.random() - 0.5) * noiseLevel;
        const y = height / 2 + Math.sin(x * freq + phase) * amplitude + noise;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw oscilloscope reticle crosshair in middle
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 20, 0, Math.PI * 2);
      ctx.stroke();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [snr, isAnomaly, carrierLock]);

  return (
    <div className="w-full relative bg-black border border-zinc-800 p-2">
      <div className="absolute top-2 left-3 font-mono text-[10px] text-zinc-400 uppercase tracking-widest z-10 bg-black/80 px-1">
        RF Signal Oscilloscope Trace [5 MHz Span]
      </div>
      <canvas ref={canvasRef} className="w-full h-40 block" />
    </div>
  );
};
