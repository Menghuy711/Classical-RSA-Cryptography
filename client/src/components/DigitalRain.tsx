import React, { useEffect, useRef } from 'react';

interface RainColumn {
  x: number;
  y: number;
  speed: number;
  chars: string;
  opacity: number;
}

export const DigitalRain: React.FC = () => {
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

    // Characters to display (binary and hex)
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
    const charArray = chars.split('');

    // Create rain columns
    const columns: RainColumn[] = [];
    const columnWidth = 20;
    const numColumns = Math.ceil(canvas.width / columnWidth);

    for (let i = 0; i < numColumns; i++) {
      columns.push({
        x: i * columnWidth,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 1,
        chars: '',
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with semi-transparent black for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 40;
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
        // Generate random character
        const randomChar = charArray[Math.floor(Math.random() * charArray.length)];

        // Set text properties
        ctx.font = 'bold 14px "Courier New", monospace';
        ctx.fillStyle = `rgba(0, 255, 131, ${column.opacity})`;
        ctx.shadowColor = 'rgba(0, 255, 131, 0.8)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Draw character
        ctx.fillText(randomChar, column.x, column.y);

        // Update position
        column.y += column.speed;

        // Reset column when it goes off screen
        if (column.y > canvas.height) {
          column.y = -20;
          column.speed = Math.random() * 2 + 1;
          column.opacity = Math.random() * 0.5 + 0.3;
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
