
import { SEOHelmet } from "@/components/SEOHelmet";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Users, Lightbulb, Code, Globe, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Heart,
      title: "Free Education",
      description: "We believe quality tech education should be accessible to everyone, regardless of financial background."
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Building a worldwide community of developers, learners, and tech enthusiasts."
    },
    {
      icon: Code,
      title: "Modern Technology",
      description: "Using cutting-edge technologies to solve real-world problems and teach practical skills."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Constantly exploring new ways to improve learning experiences and service delivery."
    }
  ];

  const technologies = [
    "React", "TypeScript", "Node.js", "Python", "React Native", 
    "Vue.js", "MongoDB", "PostgreSQL", "AWS", "Docker", "AI/ML"
  ];

  return (
    <>
      <SEOHelmet
        title="About Us - Zwanski Tech"
        description="Learn about Zwanski Tech's mission to provide free tech education and quality development services worldwide."
        canonical="https://zwanski.org/about"
      />

      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        
        <main className="flex-1 axeptio-section">
          <div className="axeptio-container max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="axeptio-heading">
                About Zwanski Tech
              </h1>
              <p className="axeptio-subheading max-w-2xl mx-auto">
                Empowering the next generation of developers through free education and innovative solutions.
              </p>
            </div>

            <div className="space-y-8">
              <div className="axeptio-card">
                <div className="axeptio-feature-icon">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="axeptio-feature-title">Our Mission</h2>
                <div className="axeptio-body">
                  <p>
                    At Zwanski Tech, we're on a mission to democratize technology education and provide 
                    world-class development services. We believe that everyone should have access to quality 
                    tech education, regardless of their economic background or geographic location.
                  </p>
                  <p>
                    Founded with the vision of bridging the gap between theoretical knowledge and practical 
                    application, we combine educational excellence with professional development services 
                    to create a comprehensive ecosystem for learners and businesses alike.
                  </p>
                </div>
              </div>

              <div className="axeptio-card">
                <div className="axeptio-feature-icon">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h2 className="axeptio-feature-title">What We Do</h2>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Education & Academy</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Free programming courses</li>
                        <li>• Interactive tutorials</li>
                        <li>• Project-based learning</li>
                        <li>• Certification programs</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Development Services</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Web application development</li>
                        <li>• Mobile app development</li>
                        <li>• UI/UX design</li>
                        <li>• Technical consulting</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Job Marketplace</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Connect freelancers with clients</li>
                        <li>• Vetted professional network</li>
                        <li>• Secure payment system</li>
                        <li>• Project management tools</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Free Tools</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• IMEI checker</li>
                        <li>• Computer model lookup</li>
                        <li>• Developer utilities</li>
                        <li>• Community resources</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="axeptio-card">
                <h2 className="axeptio-feature-title">Our Values</h2>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {values.map((value, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <value.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{value.title}</h3>
                          <p className="text-sm text-muted-foreground">{value.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="axeptio-card">
                <h2 className="axeptio-feature-title">Technologies We Use</h2>
                <div>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    We stay current with the latest technologies to provide modern solutions 
                    and teach relevant skills that employers actually need.
                  </p>
                </div>
              </div>

              <div className="axeptio-card">
                <h2 className="axeptio-feature-title">Why Choose Zwanski Tech?</h2>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">100%</div>
                      <div className="text-sm text-muted-foreground">Free Education</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                      <div className="text-sm text-muted-foreground">Community Support</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">Global</div>
                      <div className="text-sm text-muted-foreground">Reach & Impact</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="axeptio-card">
                <h2 className="axeptio-feature-title">Get Involved</h2>
                <div>
                  <p className="text-muted-foreground mb-4">
                    Join our growing community and be part of the mission to make tech education accessible to everyone.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="/academy"
                      className="axeptio-button-primary"
                    >
                      Start Learning
                    </a>
                    <a 
                      href="/jobs"
                      className="axeptio-button-secondary"
                    >
                      Find Opportunities
                    </a>
                    <a 
                      href="/support"
                      className="axeptio-button-secondary"
                    >
                      Support Our Mission
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
