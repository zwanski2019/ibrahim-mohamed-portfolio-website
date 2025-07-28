import { SEOHelmet } from "@/components/SEOHelmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IMEIChecker from "@/components/IMEIChecker";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Smartphone,
  Wrench,
  Zap,
  Globe,
  Shield,
  Code,
  FileText,
  Clock,
  Image
} from "lucide-react";

const Tools = () => {
  console.log("Tools component is loading successfully");
  const { t } = useLanguage();

  const featuredTools = [
    {
      id: "imei-checker",
      title: t("nav.freeImeiCheck"),
      description: t("imei.description"),
      icon: Smartphone,
      component: <IMEIChecker />,
      featured: true
    }
  ];

  const comingSoonTools = [
    {
      id: "password-generator",
      title: t("password.title"),
      description: t("password.description"),
      icon: Shield,
      comingSoon: true
    },
    {
      id: "qr-generator",
      title: t("qr.title"),
      description: t("qr.description"),
      icon: Code,
      comingSoon: true
    },
    {
      id: "url-shortener",
      title: t("url.title"),
      description: t("url.description"),
      icon: Globe,
      comingSoon: true
    },
    {
      id: "color-picker",
      title: t("color.title"),
      description: t("color.description"),
      icon: Zap,
      comingSoon: true
    },
    {
      id: "json-formatter",
      title: t("json.title"),
      description: t("json.description"),
      icon: FileText,
      comingSoon: true
    },
    {
      id: "timezone-converter",
      title: t("timezone.title"),
      description: t("timezone.description"),
      icon: Clock,
      comingSoon: true
    },
    {
      id: "image-compressor",
      title: t("compressor.title"),
      description: t("compressor.description"),
      icon: Image,
      comingSoon: true
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Free Tools - ZWANSKI TECH"
        description="Free online tools including IMEI checker, password generator, QR code generator and more. Professional utility tools for developers and users."
        canonical="https://zwanski.org/tools"
      />
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Wrench className="h-8 w-8 text-primary" />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold">
                    Free <span className="text-gradient">Tools</span>
                  </h1>
                </div>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Professional-grade utilities and tools to help you work more efficiently. 
                  All tools are free to use and privacy-focused.
                </p>
              </div>
            </div>
          </section>

          {/* Featured Tool Section */}
          {featuredTools.map((tool) => (
            <section key={tool.id} className="py-16 bg-primary/5">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      <tool.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">
                      {tool.title}
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {tool.description}
                  </p>
                </div>
                
                <div className="max-w-4xl mx-auto">
                  {tool.component}
                </div>
              </div>
            </section>
          ))}

          {/* Coming Soon Tools */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  More Tools <span className="text-gradient">Coming Soon</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We're constantly developing new tools to help you be more productive. 
                  Here's what's coming next.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {comingSoonTools.map((tool) => (
                  <Card key={tool.id} className="relative overflow-hidden">
                    <div className="absolute top-2 right-2 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
                      Coming Soon
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <tool.icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">
                        {tool.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-4">
                  Have a suggestion for a tool? Let us know!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/support" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Suggest a Tool
                  </a>
                  <a 
                    href="/newsletter" 
                    className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    Get Notified of New Tools
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Tools;