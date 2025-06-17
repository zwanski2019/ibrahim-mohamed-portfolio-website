
import { Heart, Eye, Share2, Coffee, Star, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Support = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Support Zwanski Tech - Keep Our Services Free</title>
        <meta 
          name="description" 
          content="Learn how you can support Zwanski Tech and help us keep our courses, tools, and services completely free for everyone."
        />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow py-16 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="h-8 w-8 text-red-500 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Support <span className="text-gradient">Zwanski Tech</span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Help us keep our courses, tools, and IT services completely free for everyone around the world.
            </p>
          </div>

          {/* Why We Need Support */}
          <div className="mb-16">
            <Card className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200/50">
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
            </Card>
          </div>

          {/* Ways to Support */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              Simple Ways to <span className="text-gradient">Support Us</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* View Ads */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Eye className="h-8 w-8 text-green-500 mb-2" />
                  <CardTitle>View Our Ads</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Simply browsing our site with ads enabled helps us earn revenue to keep everything free. We use both display ads and occasional direct links that open in new tabs.
                  </p>
                  <div className="text-sm text-green-600 font-medium">
                    ✓ Most impactful way to help
                  </div>
                </CardContent>
              </Card>

              {/* Share Content */}
              <Card className="hover:shadow-lg transition-shadow">
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
              </Card>

              {/* Use Our Services */}
              <Card className="hover:shadow-lg transition-shadow">
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
              </Card>

              {/* Referral Link */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <ExternalLink className="h-8 w-8 text-purple-500 mb-2" />
                  <CardTitle>Use Our Referral Link</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Support us by using our referral link when you sign up for advertising services.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href="https://beta.publishers.adsterra.com/referral/W8bs5LxFKN" 
                      rel="nofollow"
                      target="_blank"
                    >
                      Referral Link
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Transparency Section */}
          <div className="mb-16">
            <Card className="bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200/50">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Our Commitment to Transparency</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center max-w-2xl mx-auto">
                  <p className="text-muted-foreground mb-4">
                    We believe in being completely transparent about how we fund our free services:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="p-4 bg-background/50 rounded-lg">
                      <strong>Display Ads:</strong> Banner advertisements shown throughout the site
                    </div>
                    <div className="p-4 bg-background/50 rounded-lg">
                      <strong>Direct Link Ads:</strong> Occasional links that open in new tabs during user interactions
                    </div>
                    <div className="p-4 bg-background/50 rounded-lg">
                      <strong>IT Services:</strong> Professional services help fund free educational content
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200/50">
              <CardContent className="pt-8">
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4 animate-pulse" />
                <h3 className="text-2xl font-bold mb-4">Thank You for Your Support!</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Every page view, every share, and every course taken helps us continue our mission of providing free, 
                  high-quality education and IT services to everyone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <a href="/academy">Explore Free Courses</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/services">View Our Services</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;
