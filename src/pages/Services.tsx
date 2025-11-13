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
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
    }));
    setParticles(newParticles);
    
    // Loading animation delay
    setTimeout(() => setIsLoaded(true), 500);
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

  // Typewriter effect for hero text
  const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => (
    <span 
      className="inline-block overflow-hidden"
      style={{
        animation: `typewriter 2s steps(${text.length}) ${delay}s forwards, blink 0.8s infinite ${delay}s`
      }}
    >
      {text}
    </span>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Enhanced Hero Section with Visible Effects */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        {/* Interactive Animated Background */}
        <div className="absolute inset-0">
          {/* Animated Grid Background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(30, 58, 138, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(30, 58, 138, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }}
          />
          
          {/* Floating Particles with Mouse Interaction */}
          {particles.map((particle) => {
            const distanceX = Math.abs(particle.x - mousePosition.x);
            const distanceY = Math.abs(particle.y - mousePosition.y);
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            const isNearMouse = distance < 15;
            
            return (
              <div
                key={particle.id}
                className={`absolute rounded-full transition-all duration-300 ${
                  isNearMouse 
                    ? 'bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] scale-150' 
                    : 'bg-gradient-to-r from-[#1e3a8a] to-[#2563eb]'
                }`}
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${isNearMouse ? particle.size * 2 : particle.size}px`,
                  height: `${isNearMouse ? particle.size * 2 : particle.size}px`,
                  filter: isNearMouse ? 'blur(0px)' : 'blur(1px)',
                  animation: `floatParticle ${8 + Math.random() * 8}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            );
          })}

          {/* Animated Gradient Orbs */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-full blur-3xl opacity-20 animate-orbFloat"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] rounded-full blur-3xl opacity-15 animate-orbFloatReverse"></div>
          
          {/* Pulsing Rings */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-64 h-64 border-2 border-[#1e3a8a] rounded-full animate-pingSlow opacity-20"></div>
            <div className="w-96 h-96 border-2 border-[#3b82f6] rounded-full animate-pingSlower opacity-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        {/* Main Content with Entrance Animations */}
        <div className={`relative z-10 max-w-6xl mx-auto px-6 text-center transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          
          {/* Kinetic Typography with Staggered Letters */}
          <div className="mb-8 overflow-hidden">
            <h1 className="text-6xl md:text-8xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">
                {'OUR SERVICES'.split('').map((char, index) => (
                  <span
                    key={index}
                    className="inline-block animate-letterBounce"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            </h1>
          </div>

          {/* Typewriter Subtitle */}
          <div className="mb-12 overflow-hidden">
            <p className="text-xl md:text-2xl text-[#94a3b8] font-light max-w-3xl mx-auto leading-relaxed">
              <TypewriterText 
                text="Crafting digital excellence through innovative solutions" 
                delay={1.5}
              />
            </p>
          </div>

          {/* Animated CTA Buttons */}
          <div className="flex gap-6 justify-center flex-wrap">
            <button
              onClick={() => onNavigate('contact')}
              className="group relative px-12 py-4 rounded-full bg-transparent border-2 border-[#1e3a8a] text-[#f1f5f9] font-semibold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:border-[#3b82f6] hover:shadow-2xl hover:shadow-blue-500/25"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Start Your Project</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 -z-10"></div>
            </button>
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[#3b82f6] text-sm font-light animate-pulse">Scroll to Explore</span>
            <div className="w-6 h-10 border-2 border-[#3b82f6] rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gradient-to-b from-[#3b82f6] to-[#60a5fa] rounded-full mt-2 animate-scrollIndicator"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Showcase with Scroll Animations */}
      <section className="relative py-20 bg-[#0a0a0a]">
        {/* Sticky Navigation with Active Indicator */}
        <div className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1e3a8a]/30 py-4">
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
                    className={`flex items-center space-x-3 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-500 transform ${
                      activeService === index
                        ? 'bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white shadow-lg scale-105'
                        : 'text-[#94a3b8] hover:text-white hover:bg-[#1e3a8a]/30 hover:scale-102'
                    }`}
                  >
                    <Icon size={20} className={activeService === index ? 'animate-pulse' : ''} />
                    <span className="font-medium">{service.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Services Display with Scroll-Triggered Animations */}
        <div ref={servicesRef} className="max-w-7xl mx-auto px-6">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={index}
                id={`service-${index}`}
                className={`min-h-screen flex items-center justify-center py-20 ${
                  isEven ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content Side with Entrance Animation */}
                <div className={`flex-1 ${isEven ? 'pr-12' : 'pl-12'}`}>
                  <div className={`max-w-2xl transform transition-all duration-1000 ${
                    isEven ? 'ml-auto translate-x-0' : 'mr-auto translate-x-0'
                  }`}>
                    {/* Animated Service Icon */}
                    <div className="mb-8 transform transition-all duration-500 hover:scale-110 hover:rotate-12">
                      <div className="relative">
                        <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-2xl animate-glow`}>
                          <Icon className="text-white" size={32} />
                        </div>
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl blur-xl opacity-50 animate-pulse`}></div>
                      </div>
                    </div>

                    {/* Animated Service Title */}
                    <h2 className={`text-5xl font-black bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-6 transform transition-all duration-700`}>
                      {service.title}
                    </h2>

                    {/* Typewriter Service Description */}
                    <p className="text-xl text-[#94a3b8] mb-8 leading-relaxed animate-fadeInUp">
                      {service.description}
                    </p>

                    {/* Animated Features Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-3 text-[#cbd5e1] transform transition-all duration-500 hover:translate-x-2"
                          style={{ animationDelay: `${featureIndex * 0.1}s` }}
                        >
                          <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full animate-pulse`}></div>
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Magnetic Button Effect */}
                    <button
                      onClick={() => onNavigate('contact')}
                      className="group relative px-8 py-4 bg-transparent border-2 border-[#1e3a8a] text-[#f1f5f9] font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 magnetic-button"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <span>Get {service.title}</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                      <div className={`absolute inset-0 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                    </button>
                  </div>
                </div>

                {/* Visual Side with Hover Effects */}
                <div className="flex-1 relative">
                  <div className={`relative transform transition-all duration-500 hover:scale-105 ${
                    isEven ? 'ml-12' : 'mr-12'
                  }`}>
                    {/* Main Visual Container with 3D Effect */}
                    <div className={`relative bg-gradient-to-br ${service.color} rounded-3xl p-8 transform transition-all duration-500 hover:rotate-3 hover:shadow-2xl service-card-3d`}>
                      <div className="bg-[#0a0a0a] rounded-2xl p-8 h-96 flex items-center justify-center relative overflow-hidden">
                        {/* Animated Background Pattern */}
                        <div 
                          className="absolute inset-0 opacity-10"
                          style={{
                            backgroundImage: `
                              radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
                              radial-gradient(circle at 75% 75%, #1e3a8a 2px, transparent 2px)
                            `,
                            backgroundSize: '50px 50px',
                            animation: 'patternMove 10s linear infinite'
                          }}
                        />
                        
                        <div className="text-center relative z-10">
                          <Icon className={`text-transparent bg-gradient-to-br ${service.color} bg-clip-text mx-auto mb-4 animate-bounceSlow`} size={48} />
                          <h3 className="text-2xl font-bold text-white mb-2 animate-pulse">{service.title}</h3>
                          <p className="text-[#94a3b8]">Interactive Preview</p>
                        </div>
                      </div>
                    </div>

                    {/* Floating Animated Elements */}
                    <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${service.color} rounded-2xl blur-xl opacity-30 animate-float`}></div>
                    <div className={`absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br ${service.color} rounded-2xl blur-xl opacity-20 animate-floatReverse`}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Enhanced CTA Section with Particle Background */}
      <section className="relative py-32 bg-gradient-to-br from-[#0a0a0a] via-[#0f172a] to-[#1e3a8a] overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#3b82f6] rounded-full blur-3xl opacity-10 animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#1e3a8a] rounded-full blur-3xl opacity-15 animate-pulse-slower"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Animated Heading */}
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#cbd5e1] to-[#94a3b8] mb-8 animate-glowText">
            READY TO BEGIN?
          </h2>
          
          {/* Animated Subtitle */}
          <p className="text-xl text-[#94a3b8] mb-12 max-w-2xl mx-auto leading-relaxed animate-fadeInUp">
            Let's transform your digital presence with our premium services. Get started with a free consultation today.
          </p>

          {/* Super Button with Multiple Effects */}
          <button
            onClick={() => onNavigate('contact')}
            className="group relative px-16 py-5 rounded-full bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl super-button"
          >
            <span className="relative z-10 flex items-center gap-3">
              <span>Start Your Project Now</span>
              <span className="group-hover:translate-x-2 transition-transform duration-300">🚀</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
          </button>
        </div>
      </section>

      {/* Animation Styles */}
      <style jsx>{`
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

        @keyframes letterBounce {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.1);
          }
        }

        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes blink {
          0%, 50% {
            border-color: transparent;
          }
          51%, 100% {
            border-color: #3b82f6;
          }
        }

        @keyframes orbFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes orbFloatReverse {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-30px, 30px) scale(0.9);
          }
          66% {
            transform: translate(20px, -20px) scale(1.1);
          }
        }

        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
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

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.8);
          }
        }

        @keyframes glowText {
          0%, 100% {
            text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% {
            text-shadow: 0 0 30px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.6);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes floatReverse {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(20px) rotate(-180deg);
          }
        }

        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes scrollIndicator {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(20px);
            opacity: 0;
          }
        }

        @keyframes pingSlow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes pingSlower {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(3);
            opacity: 0;
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

        .animate-orbFloat {
          animation: orbFloat 8s ease-in-out infinite;
        }

        .animate-orbFloatReverse {
          animation: orbFloatReverse 10s ease-in-out infinite;
        }

        .animate-letterBounce {
          animation: letterBounce 2s ease-in-out infinite;
          display: inline-block;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-glowText {
          animation: glowText 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-floatReverse {
          animation: floatReverse 6s ease-in-out infinite;
        }

        .animate-bounceSlow {
          animation: bounceSlow 3s ease-in-out infinite;
        }

        .animate-scrollIndicator {
          animation: scrollIndicator 2s ease-in-out infinite;
        }

        .animate-pingSlow {
          animation: pingSlow 3s ease-out infinite;
        }

        .animate-pingSlower {
          animation: pingSlower 4s ease-out infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }

        .magnetic-button:hover {
          transform: scale(1.05) translateY(-2px);
        }

        .service-card-3d:hover {
          transform: perspective(1000px) rotateY(5deg) rotateX(5deg) scale(1.02);
        }

        .super-button:hover {
          box-shadow: 0 0 50px rgba(59, 130, 246, 0.5);
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