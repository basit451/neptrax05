'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const GSAPAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Create animated elements
    const elements: HTMLDivElement[] = [];
    const elementCount = 15;

    for (let i = 0; i < elementCount; i++) {
      const element = document.createElement('div');
      element.className = 'absolute rounded-full';
      element.style.width = `${20 + Math.random() * 60}px`;
      element.style.height = element.style.width;
      element.style.background = `radial-gradient(circle, 
        hsl(${210 + Math.random() * 60}, 70%, 60%) 0%, 
        hsl(${240 + Math.random() * 40}, 80%, 50%) 100%)`;
      element.style.opacity = '0.3';
      element.style.filter = 'blur(10px)';
      
      // Random starting position
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      
      container.appendChild(element);
      elements.push(element);
    }

    // GSAP animations
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    elements.forEach((element, index) => {
      // Create individual animation timeline for each element
      const elementTl = gsap.timeline({ repeat: -1, yoyo: true });
      
      // Morphing animation
      elementTl
        .to(element, {
          duration: 3 + Math.random() * 4,
          x: () => gsap.utils.random(-100, 100),
          y: () => gsap.utils.random(-100, 100),
          rotation: 360,
          scale: 0.5 + Math.random() * 1.5,
          borderRadius: '50% 30% 70% 40% / 60% 40% 60% 40%',
          ease: 'sine.inOut'
        })
        .to(element, {
          duration: 2 + Math.random() * 3,
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          rotation: -360,
          scale: 0.3 + Math.random() * 1.2,
          ease: 'power2.inOut'
        }, '-=2')
        .to(element, {
          duration: 4 + Math.random() * 2,
          x: () => gsap.utils.random(-150, 150),
          y: () => gsap.utils.random(-150, 150),
          borderRadius: '50%',
          rotation: 180,
          scale: 1 + Math.random(),
          ease: 'back.out(1.7)'
        }, '-=3');

      // Color animation
      gsap.to(element, {
        duration: 5 + Math.random() * 5,
        background: `radial-gradient(circle, 
          hsl(${270 + Math.random() * 60}, 80%, 60%) 0%, 
          hsl(${200 + Math.random() * 40}, 70%, 50%) 100%)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Opacity pulse
      gsap.to(element, {
        duration: 2 + Math.random() * 3,
        opacity: 0.1 + Math.random() * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    // Master timeline for coordinated movements
    tl.to(elements, {
      duration: 8,
      x: '+=50',
      y: '-=30',
      stagger: 0.1,
      ease: 'sine.inOut'
    })
    .to(elements, {
      duration: 6,
      x: '-=70',
      y: '+=40',
      stagger: -0.1,
      ease: 'power2.inOut'
    })
    .to(elements, {
      duration: 10,
      x: '+=20',
      y: '-=60',
      stagger: 0.05,
      ease: 'sine.inOut'
    });

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = (event.clientY / window.innerHeight) * 2 - 1;

      elements.forEach((element, index) => {
        gsap.to(element, {
          duration: 0.5,
          x: `+=${mouseX * 20}`,
          y: `+=${mouseY * 20}`,
          overwrite: 'auto'
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // Kill all GSAP animations
      gsap.globalTimeline.getChildren().forEach(timeline => timeline.kill());
      // Remove created elements
      elements.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
    />
  );
};

export default GSAPAnimation;