import { useState, useEffect, useRef } from 'react';
import ThreeJSParticles from './ThreeJSParticles'; // Adjust path as needed

// ... your interfaces and service list ...

export default function Services({ onNavigate }: ServicesProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* TEST SECTION - Simplified */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Component */}
        <ThreeJSParticles />
        
        {/* Simple overlay */}
        <div className="absolute inset-0 bg-black/30 z-1"></div>

        {/* Simple content */}
        <div className={`relative z-10 text-center transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-6xl font-bold text-white mb-4">
            TEST - Three.js Background
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            If you can see this text, the component is working
          </p>
          <div className="w-4 h-4 bg-green-500 rounded-full mx-auto animate-pulse"></div>
        </div>
      </section>
    </div>
  );
}