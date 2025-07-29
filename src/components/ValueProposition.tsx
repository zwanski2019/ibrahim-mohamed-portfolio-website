import { Wrench, Rocket, Shield, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const ValueProposition = () => {
  const { t } = useLanguage();

  const pillars = [
    {
      icon: Wrench,
      title: "FIX",
      subtitle: "Device Repair & Recovery",
      description: "Professional repair services for all your devices with data recovery and warranty.",
      color: "from-emerald-400 to-green-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
      services: ["Smartphone Repair", "Laptop Recovery", "Data Retrieval", "Hardware Diagnostics"]
    },
    {
      icon: Rocket,
      title: "BUILD",
      subtitle: "Custom Development",
      description: "Tailored web applications, software solutions, and digital platforms for your business.",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      services: ["Web Development", "Custom Software", "Mobile Apps", "Cloud Solutions"]
    },
    {
      icon: Shield,
      title: "SECURE",
      subtitle: "Cybersecurity Solutions",
      description: "Comprehensive security audits, penetration testing, and protection strategies.",
      color: "from-red-400 to-orange-500",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      services: ["Security Audits", "Wazuh Installation", "Threat Detection", "Compliance"]
    },
    {
      icon: GraduationCap,
      title: "TEACH",
      subtitle: "Education & Training",
      description: "Learn cybersecurity, programming, and IT skills through our comprehensive academy.",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      services: ["Cybersecurity Courses", "Programming Training", "Certifications", "Workshops"]
    }
  ];

  return (
    <section className="axeptio-section">
      <div className="axeptio-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
              ⚡ Our 4-Pillar Approach
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">Fix.</span>{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Build.</span>{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Secure.</span>{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Teach.</span>
          </h2>
          <p className="axeptio-body text-lg max-w-3xl mx-auto">
            From device repair to cybersecurity education, we provide comprehensive IT solutions 
            that empower individuals and businesses to succeed in the digital world.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Card 
                key={index} 
                className={`axeptio-card group hover:scale-105 transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 ${pillar.bgColor}`}
              >
                <CardContent className="p-6 text-center">
                  {/* Icon */}
                  <div className="mb-4 mx-auto">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${pillar.color} text-white`}>
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2">
                    <span className={`bg-gradient-to-r ${pillar.color} bg-clip-text text-transparent`}>
                      {pillar.title}
                    </span>
                  </h3>

                  {/* Subtitle */}
                  <h4 className="font-semibold text-foreground mb-3">
                    {pillar.subtitle}
                  </h4>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Services List */}
                  <div className="space-y-1 mb-4">
                    {pillar.services.map((service, idx) => (
                      <div key={idx} className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                        <span className={`w-1 h-1 rounded-full bg-gradient-to-r ${pillar.color}`} />
                        {service}
                      </div>
                    ))}
                  </div>

                  {/* Action */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className={`text-xs font-medium bg-gradient-to-r ${pillar.color} bg-clip-text text-transparent`}>
                      Learn More →
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground">
              Whether you need emergency repairs, custom development, security solutions, or want to learn new skills, 
              we're here to help you succeed.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services">
              <Button size="lg" className="px-8">
                Explore All Services
              </Button>
            </Link>
            <Link to="/academy">
              <Button variant="outline" size="lg" className="px-8">
                Start Learning Today
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;