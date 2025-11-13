import { useState, useEffect, useRef } from 'react';
import {
  Palette,
  Code,
  Search,
  Target,
  Layers,
} from 'lucide-react';
import ThreeJSParticles from './ThreeJSParticles'; // Adjust path as needed
// import CanvasParticleField from './CanvasParticleField'; // Uncomment to use this instead

interface ServicesProps {
  onNavigate: (section: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const [activeService, setActiveService] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Loading animation delay
    setTimeout(() => setIsLoaded(true), 500);
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
      {/* Enhanced Hero Section with WebGL Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        
        {/* WebGL/Canvas Background - CHOOSE ONE */}
        <ThreeJSParticles />
        {/* <CanvasParticleField /> */}
        
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40 z-1"></div>

        {/* Main Content */}
        <div className={`relative z-10 max-w-6xl mx-auto px-6 text-center transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          
          {/* Premium Heading */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-glow-enhanced">
                OUR SERVICES
              </span>
            </h1>
            <div className="w-48 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full animate-pulse"></div>
          </div>

          {/* Subtitle */}
          <div className="mb-12">
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              Crafting digital excellence through innovative solutions that transform your vision into reality
            </p>
          </div>

          {/* CTA Button */}
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

      {/* Services Showcase Section */}
      <section className="relative py-20 bg-gradient-to-b from-[#0a0a0a] to-[#0f172a]">
        {/* Sticky Navigation */}
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
                    <Icon size={20} className={activeService === index ? 'animate-pulse' : ''} />
                    <span className="font-medium">{service.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Services Display */}
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
                {/* Content Side */}
                <div className={`flex-1 ${isEven ? 'pr-12' : 'pl-12'}`}>
                  <div className={`max-w-2xl transform transition-all duration-1000 ${
                    isEven ? 'ml-auto translate-x-0' : 'mr-auto translate-x-0'
                  }`}>
                    <h2 className={`text-5xl font-black bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-6 transform transition-all duration-700 hover:scale-105`}>
                      {service.title}
                    </h2>

                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-3 text-gray-400 transform transition-all duration-500 hover:translate-x-2 hover:text-white group"
                        >
                          <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full animate-pulse group-hover:scale-150 transition-transform duration-300`}></div>
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visual Side */}
                <div className="flex-1 relative">
                  <div className={`relative transform transition-all duration-500 hover:scale-105 ${
                    isEven ? 'ml-12' : 'mr-12'
                  }`}>
                    <div className={`relative bg-gradient-to-br ${service.color} rounded-3xl p-1 transform transition-all duration-500 hover:rotate-1 hover:shadow-2xl service-card-enhanced group`}>
                      <div className="bg-[#0a0a0a] rounded-2xl p-8 h-80 flex items-center justify-center relative overflow-hidden">
                        <div 
                          className="absolute inset-0 opacity-[0.03]"
                          style={{
                            backgroundImage: `
                              radial-gradient(circle at 25% 25%, #3b82f6 1px, transparent 1px),
                              radial-gradient(circle at 75% 75%, #60a5fa 1px, transparent 1px)
                            `,
                            backgroundSize: '50px 50px',
                          }}
                        />
                        
                        <div className="text-center relative z-10">
                          <Icon className={`text-transparent bg-gradient-to-br ${service.color} bg-clip-text mx-auto mb-4 animate-bounce`} size={48} />
                          <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                          <p className="text-gray-400">Interactive Preview</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Animation Styles */}
      <style jsx>{`
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

        .animate-glow-enhanced {
          animation: glow-enhanced 3s ease-in-out infinite;
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