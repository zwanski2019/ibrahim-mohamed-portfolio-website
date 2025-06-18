
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
    color: 'from-blue-500 to-cyan-500',
    path: '/services#web-development'
  },
  {
    id: 'it-support',
    title: 'IT Support',
    description: 'Technical support and troubleshooting for all your devices',
    icon: LifeBuoy,
    color: 'from-green-500 to-emerald-500',
    path: '/services#it-support'
  },
  {
    id: 'wordpress',
    title: 'WordPress Development',
    description: 'Custom WordPress themes, plugins, and optimization',
    icon: Layout,
    color: 'from-purple-500 to-violet-500',
    path: '/services#wordpress'
  },
  {
    id: 'seo',
    title: 'SEO Optimization',
    description: 'Improve your search engine rankings and visibility',
    icon: Search,
    color: 'from-orange-500 to-red-500',
    path: '/services#seo'
  },
  {
    id: 'security',
    title: 'System Security',
    description: 'Security audits, implementation, and monitoring solutions',
    icon: Shield,
    color: 'from-red-500 to-pink-500',
    path: '/services#system-security'
  },
  {
    id: 'custom-tools',
    title: 'Custom Development',
    description: 'Tailored tools and automation solutions for your business',
    icon: Code,
    color: 'from-indigo-500 to-blue-500',
    path: '/services#custom-tools'
  },
  {
    id: 'imei-frp-remote',
    title: 'IMEI, FRP & Remote',
    description: 'Unlock devices, bypass FRP, and utilize remote tools with our fast, secure, and reliable delivery system.',
    icon: Smartphone,
    color: 'from-cyan-500 to-teal-500',
    path: '/services#imei-frp-remote'
  },
  {
    id: 'server-cards-games',
    title: 'Server, Cards & Games',
    description: 'Gain access to a wide array of servers, digital credits, and essential tools for various online services and gaming.',
    icon: Server,
    color: 'from-violet-500 to-purple-500',
    path: '/services#server-cards-games'
  },
  {
    id: 'expert-support',
    title: 'Expert Support',
    description: 'Our dedicated professionals provide expert support to ensure your operations run smoothly and efficiently at all times.',
    icon: Users,
    color: 'from-emerald-500 to-green-500',
    path: '/services#expert-support'
  },
  {
    id: 'attractive-prices',
    title: 'Attractive Prices',
    description: 'We offer highly competitive and affordable solutions, providing great value for distributors and resellers alike.',
    icon: DollarSign,
    color: 'from-yellow-500 to-orange-500',
    path: '/services#attractive-prices'
  },
  {
    id: 'trusted-secure',
    title: 'Trusted & Secure',
    description: 'Benefit from our advanced security measures designed to protect your data and ensure safe, reliable service delivery.',
    icon: Lock,
    color: 'from-red-500 to-rose-500',
    path: '/services#trusted-secure'
  },
  {
    id: 'money-back-guarantee',
    title: 'Money Back Guarantee',
    description: 'Your satisfaction is our priority. We offer a full refund if you are not completely satisfied with our services.',
    icon: RotateCcw,
    color: 'from-pink-500 to-rose-500',
    path: '/services#money-back-guarantee'
  },
  {
    id: 'distributor-tools',
    title: 'Distributor For All Tools',
    description: 'Your one-stop source for a comprehensive range of software tools available on the market, all under one roof.',
    icon: Package,
    color: 'from-slate-500 to-gray-500',
    path: '/services#distributor-tools'
  },
  {
    id: 'user-friendly-interface',
    title: 'User-Friendly Interface',
    description: 'Experience our platform\'s intuitive and easy-to-navigate design, making your tasks simpler and more efficient.',
    icon: MousePointer,
    color: 'from-indigo-500 to-purple-500',
    path: '/services#user-friendly-interface'
  }
];

const ServiceCards = () => {
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="section-container">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Our <span className="text-gradient bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">Services</span>
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto">
            Professional services tailored to meet your business needs. Click on any service to learn more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => handleCardClick(service.path)}
                className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:bg-slate-700/50 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 animate-on-scroll"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon with gradient background */}
                <div className={`relative mb-4 w-16 h-16 rounded-lg bg-gradient-to-br ${service.color} p-0.5`}>
                  <div className="w-full h-full bg-slate-800 rounded-lg flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
