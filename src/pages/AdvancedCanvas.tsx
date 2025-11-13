'use client';
import { useEffect, useRef } from 'react';

interface FlowParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  history: { x: number; y: number }[];
  life: number;
  maxLife: number;
}

const AdvancedCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 150 });

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

    // Flow field configuration
    const fieldResolution = 25;
    const fieldSize = {
      cols: Math.ceil(canvas.width / fieldResolution),
      rows: Math.ceil(canvas.height / fieldResolution)
    };
    
    const flowField: number[][] = [];
    for (let y = 0; y < fieldSize.rows; y++) {
      flowField[y] = [];
      for (let x = 0; x < fieldSize.cols; x++) {
        flowField[y][x] = Math.random() * Math.PI * 2;
      }
    }

    // Create particles
    const particles: FlowParticle[] = [];
    const particleCount = Math.min(150, window.innerWidth / 8);

    const colorPalette = [
      'hsla(210, 100%, 60%, 0.8)',
      'hsla(220, 100%, 65%, 0.7)',
      'hsla(230, 100%, 70%, 0.6)',
      'hsla(240, 100%, 75%, 0.5)',
      'hsla(250, 100%, 80%, 0.4)',
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0,
        vy: 0,
        size: Math.random() * 3 + 1,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        history: [],
        life: 0,
        maxLife: 200 + Math.random() * 100
      });
    }

    // Mouse handlers
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

    // Update flow field with Perlin-like noise
    const updateFlowField = (time: number) => {
      for (let y = 0; y < fieldSize.rows; y++) {
        for (let x = 0; x < fieldSize.cols; x++) {
          const value = Math.sin(x * 0.1 + time * 0.001) * 
                       Math.cos(y * 0.1 + time * 0.0008) * 
                       Math.sin((x + y) * 0.05 + time * 0.0005) * 
                       Math.PI;
          flowField[y][x] = value;
        }
      }
    };

    // Animation loop
    const animate = (time: number) => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Clear with fade effect for beautiful trails
      ctx.fillStyle = 'rgba(10, 10, 10, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update flow field
      updateFlowField(time);

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.life++;
        
        // Respawn particles that have lived too long
        if (particle.life > particle.maxLife) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.history = [];
          particle.life = 0;
          particle.vx = 0;
          particle.vy = 0;
        }

        // Get grid cell for flow field
        const gridX = Math.floor(particle.x / fieldResolution);
        const gridY = Math.floor(particle.y / fieldResolution);
        
        if (gridX >= 0 && gridX < fieldSize.cols && gridY >= 0 && gridY < fieldSize.rows) {
          const angle = flowField[gridY][gridX];
          
          // Apply flow field force
          const force = 0.3;
          particle.vx += Math.cos(angle) * force;
          particle.vy += Math.sin(angle) * force;
          
          // Add some randomness
          particle.vx += (Math.random() - 0.5) * 0.1;
          particle.vy += (Math.random() - 0.5) * 0.1;
          
          // Limit velocity
          const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
          const maxSpeed = 3;
          if (speed > maxSpeed) {
            particle.vx = (particle.vx / speed) * maxSpeed;
            particle.vy = (particle.vy / speed) * maxSpeed;
          }
        }

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRef.current.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
          particle.vx -= Math.cos(angle) * force * 0.8;
          particle.vy -= Math.sin(angle) * force * 0.8;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Add to history
        particle.history.push({ x: particle.x, y: particle.y });
        if (particle.history.length > 25) {
          particle.history.shift();
        }

        // Draw particle trail with gradient
        if (particle.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(particle.history[0].x, particle.history[0].y);
          
          // Calculate gradient based on speed and life
          const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
          const lifeRatio = particle.life / particle.maxLife;
          const hue = 210 + speed * 10 + lifeRatio * 40;
          
          for (let i = 1; i < particle.history.length; i++) {
            const point = particle.history[i];
            const alpha = (i / particle.history.length) * 0.4;
            
            ctx.lineTo(point.x, point.y);
            ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${alpha})`;
            ctx.lineWidth = particle.size * (i / particle.history.length);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();
          }
        }

        // Draw current particle position with glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    animate(0);

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

export default AdvancedCanvas;