'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ShaderBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Aurora Shader Material
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      uniform vec2 resolution;
      varying vec2 vUv;

      // Simplex Noise Function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);

        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);

        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;

        i = mod289(i);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));

        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);

        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);

        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);

        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }

      void main() {
        vec2 uv = vUv;
        uv.x *= resolution.x / resolution.y;
        
        // Aurora effect using multiple noise layers
        float t = time * 0.1;
        
        // Base aurora layer
        float n1 = snoise(vec3(uv * 3.0, t));
        float n2 = snoise(vec3(uv * 6.0 + 2.0, t * 1.3));
        float n3 = snoise(vec3(uv * 12.0 + 4.0, t * 1.7));
        
        // Combine noise layers
        float aurora = n1 * 0.6 + n2 * 0.3 + n3 * 0.1;
        aurora = smoothstep(0.3, 0.7, aurora);
        
        // Color gradient for aurora
        vec3 color1 = vec3(0.1, 0.5, 0.8); // Deep blue
        vec3 color2 = vec3(0.3, 0.8, 0.9); // Electric teal
        vec3 color3 = vec3(0.6, 0.9, 1.0); // Light cyan
        vec3 color4 = vec3(0.8, 0.4, 1.0); // Purple
        
        // Create color bands based on aurora intensity
        vec3 finalColor = mix(color1, color2, smoothstep(0.0, 0.3, aurora));
        finalColor = mix(finalColor, color3, smoothstep(0.3, 0.6, aurora));
        finalColor = mix(finalColor, color4, smoothstep(0.6, 1.0, aurora));
        
        // Add vertical gradient
        float verticalGradient = smoothstep(0.0, 0.5, uv.y);
        finalColor *= verticalGradient;
        
        // Add pulsing effect
        float pulse = sin(time * 0.5) * 0.1 + 0.9;
        finalColor *= pulse;
        
        gl_FragColor = vec4(finalColor, 0.8);
      }
    `;

    const uniforms = {
      time: { value: 0.0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      side: THREE.DoubleSide
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    camera.position.z = 1;

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      material.uniforms.time.value = elapsedTime;
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

export default ShaderBackground;