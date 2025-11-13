'use client';
import { useEffect, useRef } from 'react';

const LottieBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is a placeholder implementation
    // For full Lottie functionality, you'll need to:
    // 1. Install: npm install lottie-react or npm install lottie-web
    // 2. Import and use the Lottie component properly
    // 3. Add your Lottie JSON file to the public folder

    const container = containerRef.current;
    if (!container) return;

    // Create a simple fallback animation that mimics Lottie's smooth motion
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    container.appendChild(canvas);

    let time = 0;
    const shapes: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      color: string;
      rotation: number;
    }> = [];

    // Create floating shapes
    for (let i = 0; i < 8; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 30 + Math.random() * 70,
        speed: 0.2 + Math.random() * 0.3,
        color: `hsla(${200 + Math.random() * 80}, 70%, 60%, ${0.2 + Math.random() * 0.3})`,
        rotation: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      requestAnimationFrame(animate);
      
      // Clear with gentle fade
      ctx.fillStyle = 'rgba(10, 10, 10, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      shapes.forEach((shape, index) => {
        const progress = (time * shape.speed + index * 0.5) % (Math.PI * 2);
        
        // Smooth floating motion
        const floatX = Math.sin(progress) * 50;
        const floatY = Math.cos(progress * 1.3) * 30;
        
        // Pulsing size
        const pulse = Math.sin(time * 2 + index) * 0.2 + 0.8;
        const currentSize = shape.size * pulse;

        // Rotation
        shape.rotation += 0.005;

        // Save context for transformation
        ctx.save();
        ctx.translate(shape.x + floatX, shape.y + floatY);
        ctx.rotate(shape.rotation);

        // Draw smooth, organic shape (similar to Lottie vector graphics)
        ctx.beginPath();
        
        // Create a smooth blob shape
        const numPoints = 8;
        for (let i = 0; i < numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2;
          const radius = currentSize * (0.8 + Math.sin(progress * 4 + i) * 0.2);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();

        // Gradient fill
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, currentSize);
        gradient.addColorStop(0, shape.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fill();

        // Soft glow
        ctx.shadowColor = shape.color;
        ctx.shadowBlur = 30;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore();
      });
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-sm bg-black/50 px-4 py-2 rounded-lg">
          Lottie Animation Placeholder - Add Lottie JSON to enable
        </div>
      </div>
    </div>
  );
};

export default LottieBackground;