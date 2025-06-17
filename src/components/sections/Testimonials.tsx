
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Testimonials = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Solutions",
      image: "/placeholder.svg",
      rating: 5,
      content: "Zwanski Tech transformed our outdated website into a modern, responsive platform that increased our conversions by 150%. Their attention to detail and technical expertise is unmatched."
    },
    {
      name: "Michael Chen",
      role: "Founder, E-Commerce Plus",
      image: "/placeholder.svg",
      rating: 5,
      content: "The team's cybersecurity audit saved us from potential data breaches. Their comprehensive approach and ongoing support give us peace of mind in today's digital landscape."
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director, InnovateCorp",
      image: "/placeholder.svg",
      rating: 5,
      content: "From concept to deployment, Zwanski Tech delivered exactly what we needed. Their mobile app development skills and project management made the entire process seamless."
    },
    {
      name: "David Kim",
      role: "Operations Manager, RetailHub",
      image: "/placeholder.svg",
      rating: 5,
      content: "Their IMEI repair service fixed devices we thought were beyond recovery. Professional, fast, and incredibly knowledgeable. Highly recommend their technical services."
    },
    {
      name: "Lisa Thompson",
      role: "Startup Founder, HealthTech Pro",
      image: "/placeholder.svg",
      rating: 5,
      content: "Working with Zwanski Tech was a game-changer. They didn't just build our platform; they understood our vision and delivered a solution that exceeded expectations."
    },
    {
      name: "James Wilson",
      role: "CTO, FinanceFlow",
      image: "/placeholder.svg",
      rating: 5,
      content: "The custom Chrome extension they developed streamlined our workflow by 60%. Their development process was transparent, and the final product was flawless."
    }
  ];

  return (
    <section className="craft-section bg-white">
      <div className="craft-container">
        <div className="text-center mb-16 craft-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-craft-gray-900 mb-6">
            What Our <span className="craft-text-gradient">Clients Say</span>
          </h2>
          <p className="text-xl text-craft-gray-600 max-w-3xl mx-auto">
            Discover how we've helped businesses transform their digital presence and achieve remarkable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="craft-card p-8 hover-lift group"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="h-8 w-8 text-craft-mint/30 group-hover:text-craft-mint/50 transition-colors duration-300" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-4 w-4 text-yellow-400 fill-current" 
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-craft-gray-600 leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-craft-mint/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-craft-mint font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-craft-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-craft-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-16 pt-16 border-t border-craft-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-craft-gray-900 mb-2">98%</div>
              <div className="text-craft-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-craft-gray-900 mb-2">300+</div>
              <div className="text-craft-gray-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-craft-gray-900 mb-2">50+</div>
              <div className="text-craft-gray-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-craft-gray-900 mb-2">24/7</div>
              <div className="text-craft-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
