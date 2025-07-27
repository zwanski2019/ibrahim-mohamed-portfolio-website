
import { Heart, Share2, Coffee, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEOHelmet } from "@/components/SEOHelmet";

const Support = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEOHelmet
        title="Support Zwanski Tech - Keep Our Services Free"
        description="Learn how you can support Zwanski Tech and help us keep our courses, tools, and services completely free for everyone."
        canonical="https://zwanski.org/support"
      />

      <Navbar />
      
      <main className="flex-grow axeptio-section">
        <div className="axeptio-container">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="h-8 w-8 text-red-500" />
              <h1 className="axeptio-heading">
                Support Zwanski Tech
              </h1>
            </div>
            <p className="axeptio-subheading max-w-3xl mx-auto mb-8">
              Help us keep our courses, tools, and IT services completely free for everyone around the world.
            </p>
          </div>

          {/* Why We Need Support */}
          <div className="mb-16">
            <div className="axeptio-card bg-secondary/30">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Why Your Support Matters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Free for Everyone</h3>
                    <p className="text-sm text-muted-foreground">
                      All our courses, IMEI tools, and IT services remain completely free
                    </p>
                  </div>
                  <div>
                    <Coffee className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Quality Content</h3>
                    <p className="text-sm text-muted-foreground">
                      We can invest more time in creating high-quality educational content
                    </p>
                  </div>
                  <div>
                    <Star className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">New Features</h3>
                    <p className="text-sm text-muted-foreground">
                      Your support helps us develop new tools and expand our services
                    </p>
                  </div>
                </div>
               </CardContent>
            </div>
          </div>

          {/* Ways to Support */}
          <div className="mb-16">
            <h2 className="axeptio-subheading text-center mb-12">
              Simple Ways to Support Us
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Share Content */}
              <div className="axeptio-card">
                <CardHeader>
                  <Share2 className="h-8 w-8 text-blue-500 mb-2" />
                  <CardTitle>Share Our Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Share our courses, tools, or services with friends, colleagues, or on social media.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://t.me/zwanski_tech" target="_blank" rel="noopener noreferrer">
                        Telegram
                      </a>
                    </Button>
                  </div>
                 </CardContent>
              </div>

              {/* Use Our Services */}
              <div className="axeptio-card">
                <CardHeader>
                  <Heart className="h-8 w-8 text-red-500 mb-2" />
                  <CardTitle>Use Our Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Take our courses, use our IMEI checker, or hire us for IT services and web development.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" asChild>
                      <a href="/academy">Academy</a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="/services">Services</a>
                    </Button>
                  </div>
                 </CardContent>
              </div>
            </div>
          </div>

          {/* Transparency Section */}
          <div className="mb-16">
            <div className="axeptio-card bg-secondary/30">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Our Commitment to Transparency</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center max-w-2xl mx-auto">
                  <p className="text-muted-foreground mb-4">
                    We believe in being completely transparent about how we fund our free services:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="p-4 bg-background/50 rounded-lg">
                      <strong>Course Sales:</strong> Premium course certifications and advanced content
                    </div>
                    <div className="p-4 bg-background/50 rounded-lg">
                      <strong>IT Services:</strong> Professional services help fund free educational content
                    </div>
                  </div>
                </div>
               </CardContent>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="axeptio-card bg-secondary/30">
              <CardContent className="pt-8">
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4 animate-pulse" />
                <h3 className="text-2xl font-bold mb-4">Thank You for Your Support!</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Every page view, every share, and every course taken helps us continue our mission of providing free, 
                  high-quality education and IT services to everyone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/academy" className="axeptio-button-primary">
                    Explore Free Courses
                  </a>
                  <a href="/services" className="axeptio-button-secondary">
                    View Our Services
                  </a>
                </div>
               </CardContent>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;
