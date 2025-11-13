'use client';
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

const CanvasParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 120 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    // Create particles
    const particles: Particle[] = [];
    const particleCount = Math.min(200, window.innerWidth / 10);

    const colorPalette = [
      'hsla(210, 70%, 60%, 0.7)',  // Blue
      'hsla(220, 70%, 60%, 0.7)',  // Light Blue
      'hsla(230, 70%, 65%, 0.7)',  // Purple Blue
      'hsla(240, 70%, 70%, 0.7)',  // Purple
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2.5 + 1,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        opacity: Math.random() * 0.6 + 0.3
      });
    }

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Clear with fade effect for trails
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls with damping
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.9;
          particle.x = particle.x < 0 ? 0 : canvas.width;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.9;
          particle.y = particle.y < 0 ? 0 : canvas.height;
        }

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRef.current.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
          particle.vx -= Math.cos(angle) * force * 0.5;
          particle.vy -= Math.sin(angle) * force * 0.5;
        }

        // Draw particle with glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Glow effect
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 15;
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        
        // Reset shadow for connections
        ctx.shadowBlur = 0;

        // Draw connections to nearby particles
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - distance / 120) * 0.15;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
    };

    animate();

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};

export default CanvasParticleField;