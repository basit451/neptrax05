import { useState, useEffect, useRef } from 'react';
import {
  Palette,
  Code,
  MessageCircle,
  Users,
  Brush,
  Megaphone,
  Search,
  Bot,
  Smartphone,
  BarChart,
  ShoppingCart,
  PenTool
} from 'lucide-react';

interface ServicesProps {
  onNavigate: (section: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  const services = [
    {
      title: 'Custom Website Design',
      description: 'Tailored website designs that capture your brand essence and drive user engagement with modern aesthetics and intuitive interfaces.',
      icon: Palette,
      image: 'demo.png'
    },
    {
      title: 'Full-Stack Web Development',
      description: 'Robust web applications built with cutting-edge technologies for optimal performance, scalability, and seamless user experiences.',
      icon: Code,
      image: 'demo.png'
    },
    {
      title: 'AI-Powered Chatbots',
      description: 'Intelligent chatbot solutions that enhance customer service, automate responses, and provide 24/7 support for your business.',
      icon: MessageCircle,
      image: 'demo.png'
    },
    {
      title: 'Social Media Management & Growth',
      description: 'Comprehensive social media strategies to build your online presence, engage your audience, and drive meaningful growth across platforms.',
      icon: Users,
      image: 'demo.png'
    },
    {
      title: 'Brand Identity & Visual Design',
      description: 'Complete brand development including logos, style guides, and visual assets that communicate your unique value proposition.',
      icon: Brush,
      image: 'demo.png'
    },
    {
      title: 'Social Media & Digital Advertising',
      description: 'Targeted advertising campaigns across social platforms to reach your ideal audience and maximize ROI.',
      icon: Megaphone,
      image: 'demo.png'
    },
    {
      title: 'SEO Optimization & Growth Strategy',
      description: 'Data-driven SEO strategies to improve search rankings, increase organic traffic, and drive sustainable business growth.',
      icon: Search,
      image: 'demo.png'
    },
    {
      title: 'AI Automation Agents',
      description: 'Custom AI solutions that automate repetitive tasks, streamline workflows, and enhance operational efficiency.',
      icon: Bot,
      image: 'demo.png'
    },
    {
      title: 'Mobile App Design & Development',
      description: 'Native and cross-platform mobile applications designed for exceptional user experiences and technical excellence.',
      icon: Smartphone,
      image: 'demo.png'
    },
    {
      title: 'Marketing Audit & Strategic Planning',
      description: 'In-depth analysis of your marketing efforts with strategic roadmaps for optimization and accelerated growth.',
      icon: BarChart,
      image: 'demo.png'
    },
    {
      title: 'E-Commerce Store Development',
      description: 'Feature-rich online stores with secure payment systems, inventory management, and optimized shopping experiences.',
      icon: ShoppingCart,
      image: 'demo.png'
    },
    {
      title: 'Content Creation & Copywriting',
      description: 'Compelling content and persuasive copy that resonates with your audience and drives conversion across all channels.',
      icon: PenTool,
      image: 'demo.png'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#0f172a] to-[#1e1b4b]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent"></div>
        
        <div className={`relative z-10 max-w-6xl mx-auto px-6 text-center transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              OUR SERVICES
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital solutions to elevate your brand and drive measurable results
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="relative py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  ref={el => cardsRef.current[index] = el}
                  className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-6 border border-gray-800 hover:border-cyan-500/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10"
                >
                  {/* Number Badge */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <Icon className="w-8 h-8 text-cyan-400 mb-3 transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Hover Effect Elements */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                    <div className="absolute inset-[1px] rounded-2xl bg-[#0a0a0a]"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </section>

      {/* Enhanced Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(34, 211, 238, 0.6);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        /* Staggered animation for cards */
        .service-card {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}