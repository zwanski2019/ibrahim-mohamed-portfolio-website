
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Monitor, 
  LifeBuoy, 
  Layout, 
  Search, 
  Shield, 
  Code,
  Smartphone,
  Server,
  Users,
  DollarSign,
  Lock,
  RotateCcw,
  Package,
  MousePointer
} from 'lucide-react';

const services = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom websites and web applications using modern technologies',
    icon: Monitor,
    color: 'from-blue-500 to-emerald-500',
    path: '/services#web-development'
  },
  {
    id: 'it-support',
    title: 'IT Support',
    description: 'Technical support and troubleshooting for all your devices',
    icon: LifeBuoy,
    color: 'from-emerald-500 to-blue-500',
    path: '/services#it-support'
  },
  {
    id: 'wordpress',
    title: 'WordPress Development',
    description: 'Custom WordPress themes, plugins, and optimization',
    icon: Layout,
    color: 'from-blue-500 to-emerald-500',
    path: '/services#wordpress'
  },
  {
    id: 'seo',
    title: 'SEO Optimization',
    description: 'Improve your search engine rankings and visibility',
    icon: Search,
    color: 'from-emerald-500 to-blue-500',
    path: '/services#seo'
  },
  {
    id: 'security',
    title: 'System Security',
    description: 'Security audits, implementation, and monitoring solutions',
    icon: Shield,
    color: 'from-blue-500 to-emerald-500',
    path: '/services#system-security'
  },
  {
    id: 'custom-tools',
    title: 'Custom Development',
    description: 'Tailored tools and automation solutions for your business',
    icon: Code,
    color: 'from-emerald-500 to-blue-500',
    path: '/services#custom-tools'
  },
  {
    id: 'imei-frp-remote',
    title: 'IMEI, FRP & Remote',
    description: 'Unlock devices, bypass FRP, and utilize remote tools with our fast, secure, and reliable delivery system.',
    icon: Smartphone,
    color: 'from-blue-500 to-emerald-500',
    path: '/services#imei-frp-remote'
  },
  {
    id: 'server-cards-games',
    title: 'Server, Cards & Games',
    description: 'Gain access to a wide array of servers, digital credits, and essential tools for various online services and gaming.',
    icon: Server,
    color: 'from-emerald-500 to-blue-500',
    path: '/services#server-cards-games'
  },
  {
    id: 'expert-support',
    title: 'Expert Support',
    description: 'Our dedicated professionals provide expert support to ensure your operations run smoothly and efficiently at all times.',
    icon: Users,
    color: 'from-blue-500 to-emerald-500',
    path: '/services#expert-support'
  },
  {
    id: 'attractive-prices',
    title: 'Attractive Prices',
    description: 'We offer highly competitive and affordable solutions, providing great value for distributors and resellers alike.',
    icon: DollarSign,
    color: 'from-emerald-500 to-blue-500',
    path: '/services#attractive-prices'
  },
  {
    id: 'trusted-secure',
    title: 'Trusted & Secure',
    description: 'Benefit from our advanced security measures designed to protect your data and ensure safe, reliable service delivery.',
    icon: Lock,
    color: 'from-blue-500 to-emerald-500',
    path: '/services#trusted-secure'
  },
  {
    id: 'money-back-guarantee',
    title: 'Money Back Guarantee',
    description: 'Your satisfaction is our priority. We offer a full refund if you are not completely satisfied with our services.',
    icon: RotateCcw,
    color: 'from-emerald-500 to-blue-500',
    path: '/services#money-back-guarantee'
  },
  {
    id: 'distributor-tools',
    title: 'Distributor For All Tools',
    description: 'Your one-stop source for a comprehensive range of software tools available on the market, all under one roof.',
    icon: Package,
    color: 'from-blue-500 to-emerald-500',
    path: '/services#distributor-tools'
  },
  {
    id: 'user-friendly-interface',
    title: 'User-Friendly Interface',
    description: 'Experience our platform\'s intuitive and easy-to-navigate design, making your tasks simpler and more efficient.',
    icon: MousePointer,
    color: 'from-emerald-500 to-blue-500',
    path: '/services#user-friendly-interface'
  }
];

const ServiceCards = () => {
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Professional services tailored to meet your business needs. Click on any service to learn more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => handleCardClick(service.path)}
                className="group p-8 rounded-3xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer relative overflow-hidden"
              >
                {/* Background glow effects */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  {/* Icon with gradient background */}
                  <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-emerald-500/20 w-fit">
                    <IconComponent className="h-8 w-8 text-blue-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
