import { useState, useEffect, useRef } from 'react';
import {
  Palette,
  Code,
  Search,
  Target,
  Layers,
  Wrench,
  TrendingUp,
  Zap,
  BarChart3,
  Shield
} from 'lucide-react';

interface ServicesProps {
  onNavigate: (section: string) => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

export default function Services({ onNavigate }: ServicesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [activeService, setActiveService] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const servicesRef = useRef<HTMLDivElement>(null);

  // Enhanced particle system with mouse interaction
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.5 + Math.random() * 2,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
    }));
    setParticles(newParticles);
    
    // Loading animation delay
    setTimeout(() => setIsLoaded(true), 800);
  }, []);

  // Mouse move effect for particles
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Service scroll animation with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(servicesRef.current?.children || []).indexOf(entry.target);
            setActiveService(index);
          }
        });
      },
      { threshold: 0.6 }
    );

    const serviceElements = servicesRef.current?.children;
    if (serviceElements) {
      Array.from(serviceElements).forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  const servicesList = [
    {
      title: 'Web Design',
      description: 'Beautiful, modern interfaces that captivate your audience and drive engagement through thoughtful user experience design.',
      icon: Palette,
      features: ['Responsive Design', 'User Experience', 'Brand Alignment', 'Modern Aesthetics'],
      color: 'from-purple-500 to-blue-500'
    },
    {
      title: 'Web Development',
      description: 'High-performance websites built with cutting-edge technology stacks for blazing fast load times and seamless interactions.',
      icon: Code,
      features: ['React/Next.js', 'Performance Optimized', 'Clean Code', 'SEO Ready'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'SEO Optimization',
      description: 'Comprehensive search engine optimization strategies to increase visibility and drive qualified organic traffic to your business.',
      icon: Search,
      features: ['Keyword Strategy', 'Technical SEO', 'Content Optimization', 'Analytics'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Geo Targeting',
      description: 'Advanced location-based marketing solutions to reach your target audience in specific geographic regions effectively.',
      icon: Target,
      features: ['Local SEO', 'Regional Campaigns', 'Location Analytics', 'Market Research'],
      color: 'from-red-500 to-orange-500'
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design approaches that create intuitive, engaging experiences focused on conversion and user satisfaction.',
      icon: Layers,
      features: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing'],
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Enhanced Hero Section with Visible Effects */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        {/* Interactive Animated Background */}
        <div className="absolute inset-0">
          
          {/* ==================== ANIMATION OPTIONS ==================== */}
          {/* UNCOMMENT ONE OPTION AT A TIME TO TEST */}

          {/* Option 1: Gradient Flow / Animated Gradient */}
          {/* <div className="absolute inset-0 bg-gradient-animated"></div> */}

          {/* Option 2: Floating Particles */}
          {/* <div className="absolute inset-0">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-float-particle"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animationDelay: `${particle.id * 0.1}s`,
                  filter: 'blur(1px)',
                }}
              />
            ))}
          </div> */}

          {/* Option 3: Liquid Wave Background */}
           <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-[40%] animate-liquid-wave opacity-30 blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[30%] animate-liquid-wave-reverse opacity-40 blur-xl animation-delay-2000"></div>
          </div>

          {/* Option 4: Glassmorphism Light Sweep */}
          {/* <div className="absolute inset-0 bg-glass-sweep"></div> */}

          {/* Option 5: Noise Gradient Overlay */}
          {/* <div className="absolute inset-0 bg-noise-gradient"></div> */}

          {/* Option 6: Particle Lines / Network Animation */}
          {/* <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-[2px] h-[2px] bg-cyan-400 animate-network-node"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/20 to-transparent animate-network-pulse"></div>
          </div> */}

          {/* Option 7: Rotating 3D Shapes */}
          {/* <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500 to-blue-500 animate-rotate-3d opacity-20 blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 animate-rotate-3d-reverse opacity-15 blur-2xl animation-delay-1000"></div>
          </div> */}

          {/* Option 8: Moving Stripes / Gradient Sweep */}
          {/* <div className="absolute inset-0 bg-stripes-animated"></div> */}

          {/* Option 9: Parallax Blur Layers */}
          {/* <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-blue-900/30 animate-parallax-slow opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 via-transparent to-blue-900/20 animate-parallax-medium opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-bl from-indigo-900/25 via-transparent to-purple-900/25 animate-parallax-fast opacity-35"></div>
          </div> */}

          {/* Option 10: Aurora Effect */}
          {/* <div className="absolute inset-0 bg-aurora-effect"></div> */}

          {/* Dark Overlay for Better Contrast */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Main Content with Entrance Animations */}
        <div className={`relative z-10 max-w-6xl mx-auto px-6 text-center transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          
          {/* Premium Heading with Enhanced Effects */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-glow-enhanced">
                OUR SERVICES
              </span>
            </h1>
            {/* Animated underline with enhanced effect */}
            <div className="w-48 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full animate-sweep-glow"></div>
          </div>

          {/* Enhanced Subtitle */}
          <div className="mb-12">
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed animate-fade-in-up-enhanced">
              Crafting digital excellence through innovative solutions that transform your vision into reality
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex gap-6 justify-center flex-wrap">
            <button
              onClick={() => onNavigate('contact')}
              className="group relative px-12 py-4 rounded-full bg-transparent border-2 border-cyan-400/50 text-white font-semibold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/25 backdrop-blur-sm"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Start Your Project</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Services Showcase with Scroll Animations */}
      <section className="relative py-20 bg-gradient-to-b from-[#0a0a0a] to-[#0f172a]">
        {/* Sticky Navigation with Enhanced Design */}
        <div className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-cyan-500/20 py-4">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex overflow-x-auto space-x-4 hide-scrollbar">
              {servicesList.map((service, index) => {
                const Icon = service.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      const element = document.getElementById(`service-${index}`);
                      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className={`flex items-center space-x-3 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-500 transform backdrop-blur-sm border ${
                      activeService === index
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-cyan-400/50 text-white shadow-lg scale-105 shadow-cyan-500/25'
                        : 'text-gray-400 border-gray-600/30 hover:text-white hover:border-cyan-400/30 hover:scale-102 hover:bg-white/5'
                    }`}
                  >
                    <Icon size={20} className={activeService === index ? 'animate-pulse-enhanced' : ''} />
                    <span className="font-medium">{service.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Services Display with Enhanced Animations */}
        <div ref={servicesRef} className="max-w-7xl mx-auto px-6">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={index}
                id={`service-${index}`}
                className={`min-h-[90vh] flex items-center justify-center py-20 ${
                  isEven ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content Side with Enhanced Animation */}
                <div className={`flex-1 ${isEven ? 'pr-12' : 'pl-12'}`}>
                  <div className={`max-w-2xl transform transition-all duration-1000 ${
                    isEven ? 'ml-auto translate-x-0' : 'mr-auto translate-x-0'
                  }`}>
                    {/* Enhanced Service Title */}
                    <h2 className={`text-5xl font-black bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-6 transform transition-all duration-700 hover:scale-105`}>
                      {service.title}
                    </h2>

                    {/* Enhanced Service Description */}
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed animate-text-reveal">
                      {service.description}
                    </p>

                    {/* Enhanced Features Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-3 text-gray-400 transform transition-all duration-500 hover:translate-x-2 hover:text-white group"
                          style={{ animationDelay: `${featureIndex * 0.1}s` }}
                        >
                          <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full animate-pulse-enhanced group-hover:scale-150 transition-transform duration-300`}></div>
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visual Side with Enhanced Effects */}
                <div className="flex-1 relative">
                  <div className={`relative transform transition-all duration-500 hover:scale-105 ${
                    isEven ? 'ml-12' : 'mr-12'
                  }`}>
                    {/* Enhanced Visual Container */}
                    <div className={`relative bg-gradient-to-br ${service.color} rounded-3xl p-1 transform transition-all duration-500 hover:rotate-1 hover:shadow-2xl service-card-enhanced group`}>
                      <div className="bg-[#0a0a0a] rounded-2xl p-8 h-80 flex items-center justify-center relative overflow-hidden">
                        {/* Enhanced Background Pattern */}
                        <div 
                          className="absolute inset-0 opacity-[0.03]"
                          style={{
                            backgroundImage: `
                              radial-gradient(circle at 25% 25%, #3b82f6 1px, transparent 1px),
                              radial-gradient(circle at 75% 75%, #60a5fa 1px, transparent 1px)
                            `,
                            backgroundSize: '50px 50px',
                            animation: 'patternMove 15s linear infinite'
                          }}
                        />
                        
                        <div className="text-center relative z-10">
                          <Icon className={`text-transparent bg-gradient-to-br ${service.color} bg-clip-text mx-auto mb-4 animate-float-enhanced`} size={48} />
                          <h3 className="text-2xl font-bold text-white mb-2 animate-pulse-enhanced">{service.title}</h3>
                          <p className="text-gray-400">Interactive Preview</p>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Floating Elements */}
                    <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${service.color} rounded-2xl blur-xl opacity-30 animate-float-enhanced animation-delay-1000`}></div>
                    <div className={`absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br ${service.color} rounded-2xl blur-xl opacity-20 animate-float-enhanced-reverse animation-delay-2000`}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Enhanced Animation Styles */}
      <style jsx>{`
        /* Base Animations */
        @keyframes floatParticle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translate(20px, -20px) scale(1.1);
            opacity: 0.7;
          }
          50% {
            transform: translate(-15px, 15px) scale(0.9);
            opacity: 0.5;
          }
          75% {
            transform: translate(-20px, -15px) scale(1.05);
            opacity: 0.6;
          }
        }

        @keyframes patternMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Option 1: Gradient Flow */
        .bg-gradient-animated {
          background: linear-gradient(270deg, #ff00cc, #3333ff, #00ffcc, #ff00cc);
          background-size: 800% 800%;
          animation: gradientShift 12s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Option 2: Floating Particles */
        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          33% {
            transform: translate(15px, -25px) scale(1.2);
            opacity: 0.6;
          }
          66% {
            transform: translate(-20px, 15px) scale(0.8);
            opacity: 0.4;
          }
        }

        /* Option 3: Liquid Wave */
        @keyframes liquid-wave {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
          25% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            transform: translate(-50%, -50%) scale(1.1) rotate(90deg);
          }
          50% {
            border-radius: 50% 60% 30% 60% / 60% 50% 60% 40%;
            transform: translate(-50%, -50%) scale(0.9) rotate(180deg);
          }
          75% {
            border-radius: 40% 60% 70% 30% / 60% 40% 60% 40%;
            transform: translate(-50%, -50%) scale(1.05) rotate(270deg);
          }
        }

        @keyframes liquid-wave-reverse {
          0%, 100% {
            border-radius: 40% 60% 70% 30% / 60% 40% 60% 40%;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
          25% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: translate(-50%, -50%) scale(0.9) rotate(-90deg);
          }
          50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            transform: translate(-50%, -50%) scale(1.1) rotate(-180deg);
          }
          75% {
            border-radius: 50% 60% 30% 60% / 60% 50% 60% 40%;
            transform: translate(-50%, -50%) scale(0.95) rotate(-270deg);
          }
        }

        /* Option 4: Glassmorphism Light Sweep */
        .bg-glass-sweep {
          background: 
            linear-gradient(125deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(14, 165, 233, 0.1) 100%),
            radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.2) 0%, transparent 50%);
          animation: lightSweep 8s ease-in-out infinite;
        }

        @keyframes lightSweep {
          0%, 100% {
            background-position: 0% 0%, 0% 0%, 100% 100%;
          }
          50% {
            background-position: 100% 100%, 100% 100%, 0% 0%;
          }
        }

        /* Option 5: Noise Gradient Overlay */
        .bg-noise-gradient {
          background: 
            url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"),
            linear-gradient(125deg, #0f172a, #1e3a8a, #3b82f6);
          background-size: 200px 200px, cover;
          animation: noiseMove 4s ease-in-out infinite;
        }

        @keyframes noiseMove {
          0%, 100% { background-position: 0 0, 0% 50%; }
          50% { background-position: 100px 100px, 100% 50%; }
        }

        /* Option 6: Network Animation */
        @keyframes network-node {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
            box-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.8), 0 0 30px rgba(34, 211, 238, 0.4);
          }
        }

        @keyframes network-pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }

        /* Option 7: Rotating 3D Shapes */
        @keyframes rotate-3d {
          0% {
            transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
          100% {
            transform: translate(-50%, -50%) rotateX(360deg) rotateY(180deg) rotateZ(90deg);
            border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
          }
        }

        @keyframes rotate-3d-reverse {
          0% {
            transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          100% {
            transform: translate(-50%, -50%) rotateX(-360deg) rotateY(-180deg) rotateZ(-90deg);
            border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%;
          }
        }

        /* Option 8: Moving Stripes */
        .bg-stripes-animated {
          background: 
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(59, 130, 246, 0.1) 10px,
              rgba(59, 130, 246, 0.1) 20px
            ),
            linear-gradient(135deg, #0f172a, #1e3a8a);
          background-size: 200% 200%;
          animation: stripesMove 6s linear infinite;
        }

        @keyframes stripesMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 100% 100%;
          }
        }

        /* Option 9: Parallax Blur Layers */
        @keyframes parallax-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes parallax-medium {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(15px) translateX(-15px);
          }
        }

        @keyframes parallax-fast {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-10px) translateX(20px);
          }
        }

        /* Option 10: Aurora Effect */
        .bg-aurora-effect {
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(34, 211, 238, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 40%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #0f172a, #1e3a8a);
          animation: auroraFloat 15s ease-in-out infinite;
        }

        @keyframes auroraFloat {
          0%, 100% {
            background-position: 20% 20%, 80% 80%, 40% 40%, 0% 0%;
          }
          50% {
            background-position: 30% 30%, 70% 70%, 50% 50%, 100% 100%;
          }
        }

        /* Enhanced Component Animations */
        @keyframes glow-enhanced {
          0%, 100% {
            text-shadow: 
              0 0 20px rgba(34, 211, 238, 0.6),
              0 0 40px rgba(34, 211, 238, 0.4),
              0 0 60px rgba(34, 211, 238, 0.2);
          }
          50% {
            text-shadow: 
              0 0 30px rgba(34, 211, 238, 0.8),
              0 0 60px rgba(34, 211, 238, 0.6),
              0 0 80px rgba(34, 211, 238, 0.4);
          }
        }

        @keyframes sweep-glow {
          0% {
            width: 0%;
            opacity: 0;
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.8);
          }
          50% {
            width: 100%;
            opacity: 1;
            box-shadow: 0 0 30px rgba(34, 211, 238, 1);
          }
          100% {
            width: 0%;
            opacity: 0;
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.8);
            margin-left: 100%;
          }
        }

        @keyframes fade-in-up-enhanced {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes text-reveal {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-enhanced {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(5deg);
          }
          66% {
            transform: translateY(5px) rotate(-3deg);
          }
        }

        @keyframes float-enhanced-reverse {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(10px) rotate(-5deg);
          }
          66% {
            transform: translateY(-5px) rotate(3deg);
          }
        }

        @keyframes pulse-enhanced {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        /* Animation Classes */
        .animate-gradient-shift {
          animation: gradientShift 12s ease infinite;
        }

        .animate-float-particle {
          animation: float-particle 6s ease-in-out infinite;
        }

        .animate-liquid-wave {
          animation: liquid-wave 8s ease-in-out infinite;
        }

        .animate-liquid-wave-reverse {
          animation: liquid-wave-reverse 10s ease-in-out infinite;
        }

        .animate-network-node {
          animation: network-node 4s ease-in-out infinite;
        }

        .animate-network-pulse {
          animation: network-pulse 6s ease-in-out infinite;
        }

        .animate-rotate-3d {
          animation: rotate-3d 20s linear infinite;
        }

        .animate-rotate-3d-reverse {
          animation: rotate-3d-reverse 25s linear infinite;
        }

        .animate-parallax-slow {
          animation: parallax-slow 8s ease-in-out infinite;
        }

        .animate-parallax-medium {
          animation: parallax-medium 6s ease-in-out infinite;
        }

        .animate-parallax-fast {
          animation: parallax-fast 4s ease-in-out infinite;
        }

        .animate-glow-enhanced {
          animation: glow-enhanced 3s ease-in-out infinite;
        }

        .animate-sweep-glow {
          animation: sweep-glow 4s ease-in-out infinite;
        }

        .animate-fade-in-up-enhanced {
          animation: fade-in-up-enhanced 1.2s ease-out forwards;
        }

        .animate-text-reveal {
          animation: text-reveal 1s ease-out forwards;
        }

        .animate-float-enhanced {
          animation: float-enhanced 4s ease-in-out infinite;
        }

        .animate-float-enhanced-reverse {
          animation: float-enhanced-reverse 5s ease-in-out infinite;
        }

        .animate-pulse-enhanced {
          animation: pulse-enhanced 2s ease-in-out infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .service-card-enhanced {
          box-shadow: 
            0 0 0 1px rgba(59, 130, 246, 0.1),
            0 0 40px rgba(59, 130, 246, 0.1);
          transition: all 0.5s ease;
        }

        .service-card-enhanced:hover {
          box-shadow: 
            0 0 0 1px rgba(59, 130, 246, 0.3),
            0 0 60px rgba(59, 130, 246, 0.2),
            0 0 100px rgba(59, 130, 246, 0.1);
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}