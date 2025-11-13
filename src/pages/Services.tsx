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
  const servicesRef = useRef<HTMLDivElement>(null);

  // Enhanced particle system
  useEffect(() => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
    }));
    setParticles(newParticles);
    setIsLoaded(true);
  }, []);

  // Service scroll animation
  useEffect(() => {
    const handleScroll = () => {
      if (!servicesRef.current) return;
      
      const services = servicesRef.current.children;
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (let i = 0; i < services.length; i++) {
        const service = services[i] as HTMLElement;
        const rect = service.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = rect.bottom + window.scrollY;
        
        if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
          setActiveService(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesList = [
    {
      title: 'Web Design',
      description: 'Beautiful, modern interfaces that captivate your audience and drive engagement through thoughtful user experience design.',
      icon: Palette,
      features: ['Responsive Design', 'User Experience', 'Brand Alignment', 'Modern Aesthetics']
    },
    {
      title: 'Web Development',
      description: 'High-performance websites built with cutting-edge technology stacks for blazing fast load times and seamless interactions.',
      icon: Code,
      features: ['React/Next.js', 'Performance Optimized', 'Clean Code', 'SEO Ready']
    },
    {
      title: 'SEO Optimization',
      description: 'Comprehensive search engine optimization strategies to increase visibility and drive qualified organic traffic to your business.',
      icon: Search,
      features: ['Keyword Strategy', 'Technical SEO', 'Content Optimization', 'Analytics']
    },
    {
      title: 'Geo Targeting',
      description: 'Advanced location-based marketing solutions to reach your target audience in specific geographic regions effectively.',
      icon: Target,
      features: ['Local SEO', 'Regional Campaigns', 'Location Analytics', 'Market Research']
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design approaches that create intuitive, engaging experiences focused on conversion and user satisfaction.',
      icon: Layers,
      features: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing']
    },
    {
      title: 'Website Maintenance',
      description: 'Proactive maintenance and continuous improvement services to keep your digital presence secure and up-to-date.',
      icon: Wrench,
      features: ['Security Updates', 'Performance Monitoring', 'Content Updates', 'Backup Solutions']
    },
    {
      title: 'Performance Analytics',
      description: 'Data-driven insights and comprehensive analytics to measure, understand, and optimize your digital performance.',
      icon: TrendingUp,
      features: ['KPI Tracking', 'Conversion Analysis', 'User Behavior', 'ROI Measurement']
    },
    {
      title: 'E-Commerce Solutions',
      description: 'Complete online store development with integrated payment systems, inventory management, and sales optimization.',
      icon: BarChart3,
      features: ['Payment Integration', 'Inventory System', 'Sales Analytics', 'Mobile Commerce']
    },
    {
      title: 'Security & SSL',
      description: 'Enterprise-grade security measures and SSL implementation to protect your business and customer data.',
      icon: Shield,
      features: ['SSL Certificates', 'Security Audits', 'Data Protection', 'Compliance']
    },
    {
      title: 'Consultation & Strategy',
      description: 'Strategic digital consulting to align your online presence with business objectives and market opportunities.',
      icon: Zap,
      features: ['Digital Strategy', 'Competitive Analysis', 'Growth Planning', 'Implementation Roadmap']
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6]"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animation: `floatParticle ${8 + Math.random() * 8}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Animated Gradient Blobs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-full blur-[120px] opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] rounded-full blur-[120px] opacity-15 animate-pulse-slower"></div>

        {/* Main Content */}
        <div className={`relative z-10 max-w-4xl mx-auto px-6 text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Kinetic Typography Heading */}
          <div className="overflow-hidden">
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] mb-8 leading-none transform transition-all duration-700 hover:scale-105">
              OUR SERVICES
            </h1>
          </div>

          {/* Animated Subheading */}
          <div className="overflow-hidden">
            <p className="text-xl md:text-2xl text-[#94a3b8] mb-12 max-w-3xl mx-auto leading-relaxed transform transition-all duration-700 delay-300">
              Crafting digital excellence through innovative solutions and cutting-edge technology
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-6 justify-center flex-wrap transform transition-all duration-700 delay-500">
            <button
              onClick={() => onNavigate('contact')}
              className="group relative px-12 py-4 rounded-full bg-transparent border-2 border-[#1e3a8a] text-[#f1f5f9] font-semibold text-lg overflow-hidden transition-all duration-300 hover:border-[#3b82f6] hover:scale-105"
            >
              <span className="relative z-10">Start Your Project</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            
            <button
              onClick={() => onNavigate('portfolio')}
              className="px-12 py-4 rounded-full border-2 border-[#334155] text-[#f1f5f9] font-semibold text-lg hover:bg-[#1e3a8a] hover:border-[#3b82f6] hover:scale-105 transition-all duration-300"
            >
              View Our Work
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#3b82f6] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#3b82f6] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Showcase - Rally Inspired */}
      <section ref={servicesRef} className="relative py-20 bg-[#0a0a0a]">
        {/* Sticky Navigation */}
        <div className="sticky top-0 z-20 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#1e3a8a]/30">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex overflow-x-auto space-x-8 hide-scrollbar">
              {servicesList.map((service, index) => {
                const Icon = service.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      const element = document.getElementById(`service-${index}`);
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`flex items-center space-x-3 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 ${
                      activeService === index
                        ? 'bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white shadow-lg'
                        : 'text-[#94a3b8] hover:text-white hover:bg-[#1e3a8a]/20'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{service.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Services Display */}
        <div className="max-w-7xl mx-auto px-6">
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
                {/* Content Side */}
                <div className={`flex-1 ${isEven ? 'pr-12' : 'pl-12'}`}>
                  <div className={`max-w-2xl ${isEven ? 'ml-auto' : 'mr-auto'}`}>
                    {/* Service Icon */}
                    <div className="mb-8 transform transition-all duration-500 hover:scale-110">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] rounded-2xl flex items-center justify-center shadow-2xl">
                        <Icon className="text-white" size={32} />
                      </div>
                    </div>

                    {/* Service Title */}
                    <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] mb-6">
                      {service.title}
                    </h2>

                    {/* Service Description */}
                    <p className="text-xl text-[#94a3b8] mb-8 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-3 text-[#cbd5e1]"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] rounded-full"></div>
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => onNavigate('contact')}
                      className="group relative px-8 py-4 bg-transparent border-2 border-[#1e3a8a] text-[#f1f5f9] font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
                    >
                      <span className="relative z-10">Get {service.title}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                  </div>
                </div>

                {/* Visual Side */}
                <div className="flex-1 relative">
                  <div className={`relative ${isEven ? 'ml-12' : 'mr-12'}`}>
                    {/* Main Visual Container */}
                    <div className="relative bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] rounded-3xl p-8 transform transition-all duration-500 hover:scale-105 hover:rotate-1">
                      <div className="bg-[#0a0a0a] rounded-2xl p-8 h-96 flex items-center justify-center">
                        <div className="text-center">
                          <Icon className="text-[#3b82f6] mx-auto mb-4" size={48} />
                          <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                          <p className="text-[#94a3b8]">Interactive Preview</p>
                        </div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#3b82f6] to-[#60a5fa] rounded-2xl blur-xl opacity-30 animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] rounded-2xl blur-xl opacity-20 animate-pulse-slow"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-32 bg-gradient-to-br from-[#0a0a0a] via-[#0f172a] to-[#1e3a8a] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#3b82f6] rounded-full blur-[100px] opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#1e3a8a] rounded-full blur-[120px] opacity-15"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#cbd5e1] to-[#94a3b8] mb-8">
            READY TO BEGIN?
          </h2>
          
          <p className="text-xl text-[#94a3b8] mb-12 max-w-2xl mx-auto leading-relaxed">
            Let's transform your digital presence with our premium services. Get started with a free consultation today.
          </p>

          <div className="flex gap-6 justify-center flex-wrap">
            <button
              onClick={() => onNavigate('contact')}
              className="group relative px-16 py-5 rounded-full bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10">Start Your Project Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>

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

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }

        @keyframes pulse-slower {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}