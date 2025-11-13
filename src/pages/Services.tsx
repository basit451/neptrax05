import { useState, useEffect } from 'react';
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
import ScrollReveal from '../components/ScrollReveal';

interface ServicesProps {
  onNavigate: (section: string) => void;
}

interface Particle {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
}

export default function Services({ onNavigate }: ServicesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 8 + Math.random() * 6,
    }));
    setParticles(newParticles);
  }, []);

  const servicesList = [
    {
      title: 'Web Design',
      description: 'Beautiful, modern interfaces that captivate your audience',
      icon: Palette,
      details: 'Custom designs tailored to your brand identity and user needs'
    },
    {
      title: 'Web Development',
      description: 'Fast, responsive websites built with cutting-edge technology',
      icon: Code,
      details: 'Performance-optimized development for seamless user experiences'
    },
    {
      title: 'SEO Optimization',
      description: 'Higher search rankings and increased organic visibility',
      icon: Search,
      details: 'Strategic optimization to drive qualified traffic to your site'
    },
    {
      title: 'Geo Targeting',
      description: 'Local market reach and location-based marketing strategies',
      icon: Target,
      details: 'Targeted campaigns designed for local business growth'
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered experiences that drive engagement and conversions',
      icon: Layers,
      details: 'Research-backed design solutions that prioritize user needs'
    },
    {
      title: 'Website Maintenance',
      description: 'Ongoing support and updates to keep your site running smoothly',
      icon: Wrench,
      details: 'Proactive maintenance and continuous improvement services'
    },
    {
      title: 'Performance Analytics',
      description: 'Data-driven insights to measure and improve your digital presence',
      icon: TrendingUp,
      details: 'Comprehensive reporting and actionable recommendations'
    },
    {
      title: 'E-Commerce Solutions',
      description: 'Complete online store setup and optimization for maximum sales',
      icon: BarChart3,
      details: 'Integrated payment systems and inventory management'
    },
    {
      title: 'Security & SSL',
      description: 'Robust security measures to protect your business and customers',
      icon: Shield,
      details: 'Enterprise-grade security and compliance standards'
    },
    {
      title: 'Consultation & Strategy',
      description: 'Expert guidance to align your digital strategy with business goals',
      icon: Zap,
      details: 'Strategic planning and implementation roadmaps'
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: 'rgba(30, 58, 138, 0.4)',
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animation: `float ${particle.duration}s infinite ease-in-out`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d1117] to-[#1a1a2e] opacity-80"></div>

        <div className="absolute top-32 right-32 w-96 h-96 bg-[#1e3a8a] rounded-full blur-[120px] opacity-15 animate-blobSlow"></div>
        <div className="absolute bottom-32 left-32 w-96 h-96 bg-[#2563eb] rounded-full blur-[120px] opacity-15 animate-blobSlow2"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal direction="up" delay={0} depth={2}>
            <h1 className="text-5xl md:text-7xl font-bold text-[#f1f5f9] mb-6 leading-tight">
              Our{' '}
              <span className="bg-gradient-to-r from-[#1e3a8a] via-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">
                Services
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150} depth={2}>
            <p className="text-xl md:text-2xl text-[#abbcd4] mb-8 max-w-3xl mx-auto leading-relaxed">
              Crafting digital experiences that inspire and convert
            </p>
          </ScrollReveal>

          <ScrollReveal direction="fade" delay={300} depth={2}>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1e3a8a] text-[#f1f5f9] font-medium hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all"
              >
                Get Started
              </button>
              <button
                onClick={() => onNavigate('portfolio')}
                className="px-8 py-3 rounded-full border border-[#8f9eb3] text-[#f1f5f9] font-medium hover:bg-[#1e3a8a] hover:border-[#2563eb] transition-all"
              >
                View Portfolio
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal direction="up" delay={0} depth={1}>
            <h2 className="text-4xl font-bold text-[#f1f5f9] text-center mb-16">
              Comprehensive Solutions
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, index) => {
              const Icon = service.icon;
              return (
                <ScrollReveal
                  key={index}
                  direction={index % 2 === 0 ? 'up' : 'up'}
                  delay={index * 80}
                  depth={2}
                >
                  <div className="group relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] to-transparent opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300"></div>
                    <div className="relative bg-[#1e293b] rounded-2xl p-8 h-full hover:bg-[#1e3a8a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] border border-[#334155] group-hover:border-[#2563eb]">
                      <Icon className="text-[#2563eb] mb-4 group-hover:text-[#60a5fa] transition-colors" size={36} />
                      <h3 className="text-2xl font-bold text-[#f1f5f9] mb-3 group-hover:text-[#60a5fa] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-[#abbcd4] mb-4 text-sm leading-relaxed">
                        {service.description}
                      </p>
                      <p className="text-[#8f9eb3] text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {service.details}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#0f172a] via-[#0d1117] to-[#1e3a8a]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="up" delay={0} depth={2}>
              <div>
                <h2 className="text-4xl font-bold text-[#f1f5f9] mb-6">
                  Why Choose Us?
                </h2>
                <ul className="space-y-4">
                  {[
                    'Custom solutions tailored to your business needs',
                    'Performance-focused approach with measurable results',
                    'Dedicated support throughout your project',
                    'Latest technologies and best practices',
                    'Transparent communication and regular updates',
                    '100% client satisfaction guarantee'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa] flex-shrink-0"></div>
                      <span className="text-[#abbcd4]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200} depth={2}>
              <div className="space-y-6">
                <div className="bg-[#1e293b] rounded-2xl p-6 border border-[#334155] hover:border-[#2563eb] transition-colors">
                  <h3 className="text-lg font-bold text-[#f1f5f9] mb-2">Quick Turnaround</h3>
                  <p className="text-[#abbcd4] text-sm">Most projects completed within 2-4 weeks</p>
                </div>
                <div className="bg-[#1e293b] rounded-2xl p-6 border border-[#334155] hover:border-[#2563eb] transition-colors">
                  <h3 className="text-lg font-bold text-[#f1f5f9] mb-2">Expert Team</h3>
                  <p className="text-[#abbcd4] text-sm">5+ years of industry experience and proven track record</p>
                </div>
                <div className="bg-[#1e293b] rounded-2xl p-6 border border-[#334155] hover:border-[#2563eb] transition-colors">
                  <h3 className="text-lg font-bold text-[#f1f5f9] mb-2">Ongoing Support</h3>
                  <p className="text-[#abbcd4] text-sm">Continuous maintenance and optimization included</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0d1117]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal direction="up" delay={0} depth={2}>
            <h2 className="text-4xl font-bold text-[#f1f5f9] mb-6">
              Ready to Transform Your Digital Presence?
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="fade" delay={150} depth={2}>
            <p className="text-[#94a3b8] text-lg mb-8">
              Let's discuss which services are right for your business goals
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300} depth={2}>
            <button
              onClick={() => onNavigate('contact')}
              className="px-12 py-4 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1e3a8a] text-[#f1f5f9] font-medium text-lg hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.7)] transition-all"
            >
              Book a Consultation
            </button>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(30px, -30px);
            opacity: 0.6;
          }
        }

        @keyframes blobSlow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes blobSlow2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-30px, 50px) scale(0.9);
          }
          66% {
            transform: translate(20px, -20px) scale(1.1);
          }
        }

        .animate-blobSlow {
          animation: blobSlow 8s infinite;
        }

        .animate-blobSlow2 {
          animation: blobSlow2 8s infinite;
        }
      `}</style>
    </div>
  );
}
