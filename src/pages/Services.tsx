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
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
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

        {/* Enhanced Background with Red Tones */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#1e3a8a] to-[#dc2626] rounded-full blur-[120px] opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#dc2626] to-[#60a5fa] rounded-full blur-[120px] opacity-15 animate-pulse-slower"></div>
        
        {/* Depth Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#1a1a1a] opacity-80"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(30, 58, 138, 0.1) 0%, transparent 50%)`,
        }}></div>

        {/* Main Content */}
        <div className={`relative z-10 max-w-4xl mx-auto px-6 text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Fixed Heading */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] via-[#dc2626] to-[#3b82f6] mb-8 leading-tight">
              Our Services
            </h1>
          </div>

          {/* Fixed Subheading */}
          <div className="mb-12">
            <p className="text-xl md:text-2xl text-[#94a3b8] max-w-3xl mx-auto leading-relaxed">
              Crafting digital excellence through innovative solutions and cutting-edge technology
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-6 justify-center flex-wrap">
            <button
              onClick={() => onNavigate('contact')}
              className="group relative px-12 py-4 rounded-full bg-transparent border-2 border-[#1e3a8a] text-[#f1f5f9] font-semibold text-lg overflow-hidden transition-all duration-300 hover:border-[#dc2626] hover:scale-105"
            >
              <span className="relative z-10">Start Your Project</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#dc2626] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            
            <button
              onClick={() => onNavigate('portfolio')}
              className="px-12 py-4 rounded-full border-2 border-[#334155] text-[#f1f5f9] font-semibold text-lg hover:bg-[#1e3a8a] hover:border-[#dc2626] hover:scale-105 transition-all duration-300"
            >
              View Our Work
            </button>
          </div>
        </div>
      </section>

      {/* Compact Services Showcase */}
      <section className="relative py-20 bg-[#0a0a0a]">
        {/* Sticky Navigation */}
        <div className="sticky top-0 z-20 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#1e3a8a]/30">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex overflow-x-auto space-x-4 hide-scrollbar">
              {servicesList.map((service, index) => {
                const Icon = service.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      const element = document.getElementById(`service-${index}`);
                      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`flex items-center space-x-3 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 text-sm ${
                      activeService === index
                        ? 'bg-gradient-to-r from-[#1e3a8a] to-[#dc2626] text-white shadow-lg'
                        : 'text-[#94a3b8] hover:text-white hover:bg-[#1e3a8a]/20'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{service.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Compact Services Grid */}
        <div ref={servicesRef} className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, index) => {
              const Icon = service.icon;
              
              return (
                <div
                  key={index}
                  id={`service-${index}`}
                  className="group relative bg-[#0f0f0f] rounded-2xl p-6 border border-[#1e1e1e] hover:border-[#1e3a8a] transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#1e3a8a]/20"
                >
                  {/* Service Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1e3a8a] to-[#dc2626] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="text-white" size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f1f5f9] to-[#94a3b8]">
                      {service.title}
                    </h3>
                  </div>

                  {/* Service Description */}
                  <p className="text-[#94a3b8] text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center space-x-2 text-[#cbd5e1] text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#3b82f6] to-[#dc2626] rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => onNavigate('contact')}
                    className="w-full py-2 bg-transparent border border-[#1e3a8a] text-[#f1f5f9] text-sm font-medium rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a] hover:to-[#dc2626]"
                  >
                    Learn More
                  </button>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/5 to-[#dc2626]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] via-[#dc2626] to-[#3b82f6] mb-6">
              Why Choose Us?
            </h2>
            <p className="text-xl text-[#94a3b8] max-w-2xl mx-auto">
              We deliver exceptional results through our proven process and dedicated approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group text-center p-8 bg-[#0f0f0f] rounded-2xl border border-[#1e1e1e] hover:border-[#1e3a8a] transition-all duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1e3a8a] to-[#dc2626] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#f1f5f9] mb-4">Fast Delivery</h3>
              <p className="text-[#94a3b8] leading-relaxed">
                Most projects completed within 2-4 weeks with rapid iteration and quick turnaround times
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group text-center p-8 bg-[#0f0f0f] rounded-2xl border border-[#1e1e1e] hover:border-[#dc2626] transition-all duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-[#dc2626] to-[#3b82f6] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#f1f5f9] mb-4">Expert Team</h3>
              <p className="text-[#94a3b8] leading-relaxed">
                5+ years of industry experience with proven track record of successful project delivery
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group text-center p-8 bg-[#0f0f0f] rounded-2xl border border-[#1e1e1e] hover:border-[#3b82f6] transition-all duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3b82f6] to-[#1e3a8a] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#f1f5f9] mb-4">Ongoing Support</h3>
              <p className="text-[#94a3b8] leading-relaxed">
                Continuous maintenance, optimization, and support to ensure your long-term success
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] via-[#dc2626] to-[#3b82f6] mb-6">
            Start Your Project Today
          </h2>
          
          <p className="text-xl text-[#94a3b8] mb-8 max-w-2xl mx-auto">
            Ready to transform your digital presence? Let's discuss your project requirements and create something amazing together.
          </p>

          <div className="flex gap-6 justify-center flex-wrap">
            <button
              onClick={() => onNavigate('contact')}
              className="group relative px-12 py-4 rounded-full bg-gradient-to-r from-[#1e3a8a] to-[#dc2626] text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10">Get Free Consultation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#dc2626] to-[#3b82f6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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