import React, { useEffect, useRef } from 'react';

interface Column {
  x: number;
  y: number;
  speed: number;
  char: string;
  opacity: number;
  trail: Array<{ y: number; opacity: number }>;
}

export const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Numeric characters for Matrix effect
    const chars = '0123456789';
    const charArray = chars.split('');

    // Create rain columns
    const columns: Column[] = [];
    const columnWidth = 25;
    const numColumns = Math.ceil(canvas.width / columnWidth);

    for (let i = 0; i < numColumns; i++) {
      columns.push({
        x: i * columnWidth,
        y: Math.random() * canvas.height,
        speed: Math.random() * 3 + 2,
        char: charArray[Math.floor(Math.random() * charArray.length)],
        opacity: Math.random() * 0.6 + 0.4,
        trail: [],
      });
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with semi-transparent black for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle grid background
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.01)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw and update rain columns
      columns.forEach((column) => {
        // Set text properties for main character
        ctx.font = 'bold 16px "Courier New", monospace';
        ctx.fillStyle = `rgba(0, 255, 131, ${Math.min(column.opacity, 1)})`;
        ctx.shadowColor = 'rgba(0, 255, 131, 0.9)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Draw main character
        ctx.fillText(column.char, column.x, column.y);

        // Draw trailing characters with fading effect
        column.trail.forEach((trailChar, index) => {
          ctx.fillStyle = `rgba(0, 255, 131, ${trailChar.opacity * 0.6})`;
          ctx.shadowBlur = 8;
          ctx.fillText(column.char, column.x, trailChar.y);
        });

        // Update trail
        column.trail.unshift({ y: column.y, opacity: column.opacity });
        if (column.trail.length > 8) {
          column.trail.pop();
        }

        // Update trail opacity
        column.trail.forEach((trail, index) => {
          trail.opacity = column.opacity * (1 - index / column.trail.length);
        });

        // Update position
        column.y += column.speed;

        // Reset column when it goes off screen
        if (column.y > canvas.height) {
          column.y = -20;
          column.speed = Math.random() * 3 + 2;
          column.opacity = Math.random() * 0.6 + 0.4;
          column.trail = [];
        }

        // Randomly change character
        if (Math.random() < 0.02) {
          column.char = charArray[Math.floor(Math.random() * charArray.length)];
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: '#000000',
        mixBlendMode: 'screen',
      }}
    />
  );
};
