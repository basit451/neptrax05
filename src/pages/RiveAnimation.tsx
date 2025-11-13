'use client';
import { useEffect, useRef } from 'react';

// Note: This is a placeholder. You'll need to install @rive-app/canvas and add your Rive file
const RiveAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // This is a simplified placeholder implementation
    // For full Rive functionality, you'll need to:
    // 1. Install: npm install @rive-app/canvas
    // 2. Import and use the Rive component properly
    // 3. Add your .riv file to the public folder

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Fallback animation (similar to Rive's interactive style)
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Clear with fade
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.02;

      // Draw interactive shapes that respond to time
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      for (let i = 0; i < 5; i++) {
        const radius = 50 + i * 40;
        const angle = time * 0.5 + i * 0.5;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.arc(x, y, 20 + Math.sin(time + i) * 10, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${210 + i * 30}, 70%, 60%, 0.6)`;
        ctx.fill();
        
        // Glow effect
        ctx.shadowColor = `hsl(${210 + i * 30}, 70%, 60%)`;
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    animate();

  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-sm bg-black/50 px-4 py-2 rounded-lg">
          Rive Animation Placeholder - Add .riv file to enable
        </div>
      </div>
    </div>
  );
};

export default RiveAnimation;