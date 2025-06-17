
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Cloud, Shield, Key, Globe, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Infrastructure() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Technical Infrastructure - Zwanski Tech</title>
        <meta name="description" content="Our robust technical infrastructure powered by AWS and Rocket.Chat for reliable service delivery." />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                Technical <span className="text-gradient">Infrastructure</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Our robust infrastructure built on AWS EC2 with enterprise-grade security and reliability
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Server Specifications */}
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-6 w-6 text-blue-500" />
                    Server Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Product:</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Rocket.Chat Server
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Version:</span>
                    <span className="text-green-600 font-mono">6.13.0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Instance Type:</span>
                    <Badge variant="outline" className="font-mono">t2.large</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Status:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-600 font-medium">Active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AWS Configuration */}
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="h-6 w-6 text-orange-500" />
                    AWS Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Region:</span>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      Europe (Paris)
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium">AMI ID:</span>
                    <div className="bg-muted p-2 rounded font-mono text-sm">
                      ami-0f2e223be2493de1d
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium">VPC:</span>
                    <div className="bg-muted p-2 rounded font-mono text-sm">
                      vpc-09a4d6f95edaf5fd7
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium">Subnet:</span>
                    <div className="bg-muted p-2 rounded font-mono text-sm">
                      subnet-0656e8842ec7b28b9
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Security & Networking */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-green-500" />
                    Security Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Security Group:</span>
                    <Badge variant="outline" className="text-green-700 border-green-300">
                      zwanski security
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium">Key Pair:</span>
                    <div className="bg-muted p-2 rounded font-mono text-sm flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      zwanski tech security
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700 dark:text-green-400">
                        Enterprise Security
                      </span>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Advanced security protocols with VPC isolation and encrypted connections
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Performance & Reliability */}
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-6 w-6 text-yellow-500" />
                    Performance & Reliability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Uptime:</span>
                      <span className="text-green-600 font-bold">99.9%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Response Time:</span>
                      <span className="text-blue-600 font-bold">&lt;200ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Monitoring:</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        24/7 Active
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                        Global Accessibility
                      </span>
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      Optimized for European users with low-latency connections
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Technical Support */}
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-center">Technical Support & Consultation</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Need help with similar infrastructure setup or have questions about our technical stack?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:support@zwanski.org"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    Contact Technical Team
                  </a>
                  <a
                    href="/services"
                    className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
                  >
                    View Our Services
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
