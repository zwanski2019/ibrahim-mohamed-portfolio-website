
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Cloud, Shield, Key, Globe, Zap, Lock, Database, Monitor } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Infrastructure() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Technical Infrastructure - Zwanski Tech</title>
        <meta name="description" content="Our robust technical infrastructure powered by AWS with enterprise-grade security and reliability." />
      </Helmet>

      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        
        <main className="flex-1 axeptio-section">
          <div className="axeptio-container max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="axeptio-heading">
                Technical Infrastructure
              </h1>
              <p className="axeptio-subheading max-w-3xl mx-auto">
                Enterprise-grade infrastructure built on AWS with advanced security protocols and 99.9% uptime guarantee
              </p>
            </div>

            <div className="axeptio-grid-3 lg:grid-cols-2 gap-8 mb-12">
              {/* Server Specifications */}
              <div className="axeptio-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-6 w-6 text-blue-500" />
                    Server Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Platform:</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Enterprise Chat Platform
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Version:</span>
                    <span className="text-green-600 font-mono">Latest Enterprise</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Instance Class:</span>
                    <Badge variant="outline" className="font-mono">Compute Optimized</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Status:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-600 font-medium">Operational</span>
                    </div>
                  </div>
                 </CardContent>
              </div>

              {/* AWS Configuration */}
              <div className="axeptio-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="h-6 w-6 text-orange-500" />
                    Cloud Architecture
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Provider:</span>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      Amazon Web Services
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Region:</span>
                    <Badge variant="outline">European Region</Badge>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium">Network:</span>
                    <div className="bg-muted p-2 rounded text-sm">
                      Private cloud with isolated networks
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium">Deployment:</span>
                    <div className="bg-muted p-2 rounded text-sm">
                      Enterprise security hardening
                    </div>
                  </div>
                 </CardContent>
              </div>
            </div>

            {/* Security & Compliance */}
            <div className="axeptio-grid-3 lg:grid-cols-2 gap-8 mb-12">
              <div className="axeptio-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-green-500" />
                    Security & Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Access Control:</span>
                    <Badge variant="outline" className="text-green-700 border-green-300">
                      Multi-Factor Auth
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium">Encryption:</span>
                    <div className="bg-muted p-2 rounded text-sm flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      End-to-end TLS 1.3 + AES-256
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Compliance:</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      GDPR Ready
                    </Badge>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700 dark:text-green-400">
                        Zero-Trust Architecture
                      </span>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Advanced security protocols with network isolation and encrypted connections
                    </p>
                  </div>
                 </CardContent>
              </div>

              {/* Performance & Reliability */}
              <div className="axeptio-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-6 w-6 text-yellow-500" />
                    Performance & Reliability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Uptime SLA:</span>
                      <span className="text-green-600 font-bold">99.9%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Response Time:</span>
                      <span className="text-blue-600 font-bold">&lt;200ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Load Balancing:</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Auto-Scaling
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                        Global CDN Integration
                      </span>
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      Optimized content delivery with edge locations across Europe
                    </p>
                  </div>
                 </CardContent>
              </div>
            </div>

            {/* Additional Technical Features */}
            <div className="axeptio-grid-3 lg:grid-cols-2 gap-8 mb-12">
              <div className="axeptio-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-6 w-6 text-purple-500" />
                    Data Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Database:</span>
                    <Badge variant="outline">Enterprise Database</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Backup Strategy:</span>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      Real-time Replication
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Data Retention:</span>
                    <span className="text-sm font-medium">Configurable</span>
                  </div>
                  <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Database className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-700 dark:text-purple-400">
                        Automated Backups
                      </span>
                    </div>
                    <p className="text-xs text-purple-600 dark:text-purple-400">
                      Continuous data protection with point-in-time recovery
                    </p>
                  </div>
                 </CardContent>
              </div>

              <div className="axeptio-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-6 w-6 text-indigo-500" />
                    Monitoring & Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Monitoring:</span>
                    <Badge variant="outline">24/7 Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Alerting:</span>
                    <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
                      Real-time Alerts
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Log Retention:</span>
                    <span className="text-sm font-medium">90 Days</span>
                  </div>
                  <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg border border-indigo-200/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Monitor className="h-4 w-4 text-indigo-600" />
                      <span className="text-sm font-medium text-indigo-700 dark:text-indigo-400">
                        Proactive Monitoring
                      </span>
                    </div>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400">
                      Advanced metrics and performance analytics with instant notifications
                    </p>
                  </div>
                 </CardContent>
              </div>
            </div>

            {/* Technical Consultation */}
            <div className="axeptio-card bg-secondary/30">
              <CardHeader>
                <CardTitle className="text-center">Infrastructure Consultation & Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Need help designing similar enterprise infrastructure or have questions about our technical architecture?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/services"
                    className="axeptio-button-primary"
                  >
                    Contact Technical Team
                  </a>
                  <a
                    href="/services"
                    className="axeptio-button-secondary"
                  >
                    View Our Services
                  </a>
                </div>
               </CardContent>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
