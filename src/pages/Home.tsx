import {
  Sparkles,
  Rocket,
  ShoppingCart,
  Briefcase,
  Users,
  Code,
  Palette,
  Search,
  Target,
  Layers,
  Wrench,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import Silk from '../components/Silk';
import ScrollReveal from '../components/ScrollReveal';
import MissionSection from '../components/MissionSection';

interface HomeProps {
  onNavigate: (section: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const clients = [
    { icon: Briefcase, title: 'Local Service Businesses', description: 'Plumbers, electricians, consultants' },
    { icon: Rocket, title: 'SaaS Startups', description: 'Cloud-based software companies' },
    { icon: Sparkles, title: 'AI Startups', description: 'Machine learning innovations' },
    { icon: ShoppingCart, title: 'E-Commerce Brands', description: 'Online retail businesses' },
    { icon: Users, title: 'Agencies & Freelancers', description: 'Creative professionals' },
  ];

  const services = [
    { icon: Palette, title: 'Web Design', description: 'Beautiful, modern interfaces' },
    { icon: Code, title: 'Web Development', description: 'Fast, responsive websites' },
    { icon: Search, title: 'SEO Optimization', description: 'Higher search rankings' },
    { icon: Target, title: 'GEO Targeting', description: 'Local market reach' },
    { icon: Layers, title: 'UI/UX Design', description: 'User-centered experiences' },
    { icon: Wrench, title: 'Website Maintenance', description: 'Ongoing support & updates' },
  ];

  const stats = [
    { number: '100+', label: 'Sites Built' },
    { number: '50+', label: 'Verified Reviews' },
    { number: '5+', label: 'Years Experience' },
    { number: '100%', label: 'Client Satisfaction Rate' },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-100">
          <Silk
            speed={8}
            scale={1}
            color="#13717d"
            noiseIntensity={0.5}
            rotation={0}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0d1117] to-[#1e3a8a] opacity-70"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#2563eb] rounded-full blur-[120px] opacity-20 animate-blobSlow"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#1e3a8a] rounded-full blur-[120px] opacity-20 animate-blobSlow2"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-24 lg:pt-32">
          <div className="max-w-3xl">
            <ScrollReveal direction="up" delay={100} depth={2}>
              <h1 className="text-5xl md:text-7xl lg:text-6xl font text-[#f1f5f9] mb-6 leading-tight">
                Launch your brand online <br />
                <span className="bg-gradient-to-r from-[#2e4fdc] to-[#4da6ff] bg-clip-text text-transparent">
                  with a website built to
                </span>
                <br />
                convert & scale.
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200} depth={2}>
              <p className="text-lg md:text-xl text-[#abbcd4] mb-10 max-w-2xl leading-relaxed">
                Guiding startups and small businesses from idea to digital success with websites built for performance and growth.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300} depth={2}>
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-16 py-3 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1e3a8a] text-[#f1f5f9] font-medium hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all"
                >
                  Book a Call
                </button>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="group px-10 py-3 rounded-full bg-transparent border border-[#8f9eb3] text-[#f1f5f9] font-medium hover:brightness-125 transition-all flex items-center justify-center gap-2"
                >
                  View Our Work
                  <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="fade" delay={400} depth={2}>
              <div>
                <h3 className="text-sm text-[#abbcd4] font-bold mb-2 text-center sm:text-left ml-1">
                  Trusted by Industry Leaders
                </h3>
                <div className="flex items-center justify-center sm:justify-start gap-12 flex-wrap">
                  <img
                    src="/brand logo/google.png"
                    alt="Google"
                    className="h-8 filter brightness-0 saturate-0"
                    style={{ filter: 'brightness(0) saturate(100%) invert(1) sepia(1) saturate(0.5) hue-rotate(200deg) brightness(0.9)' }}
                  />
                  <img
                    src="/brand logo/stripe.png"
                    alt="Stripe"
                    className="h-14 filter brightness-0 saturate-0"
                    style={{ filter: 'brightness(0) saturate(100%) invert(1) sepia(1) saturate(0.5) hue-rotate(200deg) brightness(0.9)' }}
                  />
                  <img
                    src="/brand logo/vercel.png"
                    alt="Vercel"
                    className="h-14 filter brightness-0 saturate-0"
                    style={{ filter: 'brightness(0) saturate(100%) invert(1) sepia(1) saturate(0.5) hue-rotate(200deg) brightness(0.9)' }}
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <MissionSection />

      <section className="py-20 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal direction="up" delay={0} depth={1}>
            <h2 className="text-4xl font-bold text-[#f1f5f9] text-center mb-4">
              Who We Work With
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="fade" delay={100} depth={1}>
            <p className="text-[#94a3b8] text-center mb-12">
              We partner with businesses of all sizes across industries
            </p>
          </ScrollReveal>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-5xl">
              {clients.slice(0, 3).map((client, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 100} depth={2}>
                  <div className="bg-[#1e293b] rounded-2xl p-6 hover:bg-[#1e3a8a] hover:scale-105 transition all shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] h-full">
                    <client.icon className="text-[#2563eb] mb-4" size={32} />
                    <h3 className="text-xl font-bold text-[#f1f5f9] mb-2">{client.title}</h3>
                    <p className="text-[#94a3b8] text-sm">{client.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              {clients.slice(3).map((client, index) => (
                <ScrollReveal key={index + 3} direction="up" delay={(index + 3) * 100} depth={2}>
                  <div className="bg-[#1e293b] rounded-2xl p-6 hover:bg-[#1e3a8a] hover:scale-105 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] h-full">
                    <client.icon className="text-[#2563eb] mb-4" size={32} />
                    <h3 className="text-xl font-bold text-[#f1f5f9] mb-2">{client.title}</h3>
                    <p className="text-[#94a3b8] text-sm">{client.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#f1f5f9] text-center mb-12">
            Our Credentials
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 100} depth={2}>
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-[#2563eb] to-[#3b82f6] bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-[#94a3b8]">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#0f172a] to-[#1e3a8a]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal direction="up" delay={0} depth={2}>
            <h2 className="text-4xl font-bold text-[#f1f5f9] mb-6">
              Ready to Start Your Project?
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="fade" delay={150} depth={2}>
            <p className="text-[#94a3b8] text-lg mb-8">
              Let's discuss how we can help your business grow online
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={250} depth={2}>
            <button
              onClick={() => onNavigate('contact')}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1e3a8a] text-[#f1f5f9] font-medium text-lg hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.7)] transition-all"
            >
              Book a Call
            </button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
