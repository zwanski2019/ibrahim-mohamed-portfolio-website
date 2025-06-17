
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Users, Lightbulb, Code, Globe, Heart } from "lucide-react";

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
      <Helmet>
        <title>About Us - Zwanski Tech</title>
        <meta name="description" content="Learn about Zwanski Tech's mission to provide free tech education and quality development services worldwide." />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              About <span className="text-gradient">Zwanski Tech</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Empowering the next generation of developers through free education and innovative solutions.
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  What We Do
                </CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technologies We Use</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why Choose Zwanski Tech?</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Get Involved</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Join our growing community and be part of the mission to make tech education accessible to everyone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/academy"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Start Learning
                  </a>
                  <a 
                    href="/jobs"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    Find Opportunities
                  </a>
                  <a 
                    href="/support"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                  >
                    Support Our Mission
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
