
import { useState } from "react";
import { ArrowRight, Mail, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";

const NewsletterCTA = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <section className="craft-section bg-gradient-to-br from-craft-mint/5 to-craft-blue/5">
        <div className="craft-container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="craft-card p-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-craft-gray-900 mb-4">
                Welcome to the Zwanski Tech Community!
              </h3>
              <p className="text-craft-gray-600 mb-6">
                Thank you for subscribing. You'll receive our latest updates, tech insights, and exclusive content directly in your inbox.
              </p>
              <Button 
                onClick={() => setIsSubscribed(false)}
                variant="outline"
                className="border-craft-gray-300 text-craft-gray-700 hover:bg-craft-gray-50"
              >
                Subscribe Another Email
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="craft-section bg-gradient-to-br from-craft-mint/5 to-craft-blue/5">
      <div className="craft-container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="craft-card p-12 hover-lift">
            {/* Icon */}
            <div className="w-16 h-16 bg-craft-mint/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Sparkles className="h-8 w-8 text-craft-mint" />
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl font-bold text-craft-gray-900 mb-6">
              Stay Ahead of the <span className="craft-text-gradient">Tech Curve</span>
            </h2>
            
            <p className="text-xl text-craft-gray-600 mb-8 max-w-2xl mx-auto">
              Get exclusive insights, industry updates, and practical tips delivered to your inbox. 
              Join 1,000+ tech professionals who trust our expertise.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-craft-mint/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-3 w-3 text-craft-mint" />
                </div>
                <div>
                  <h4 className="font-semibold text-craft-gray-900 mb-1">Weekly Tech Insights</h4>
                  <p className="text-sm text-craft-gray-600">Latest trends and innovations in technology</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-craft-mint/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-3 w-3 text-craft-mint" />
                </div>
                <div>
                  <h4 className="font-semibold text-craft-gray-900 mb-1">Exclusive Tutorials</h4>
                  <p className="text-sm text-craft-gray-600">Step-by-step guides and best practices</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-craft-mint/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-3 w-3 text-craft-mint" />
                </div>
                <div>
                  <h4 className="font-semibold text-craft-gray-900 mb-1">Early Access</h4>
                  <p className="text-sm text-craft-gray-600">First to know about new services and tools</p>
                </div>
              </div>
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 px-4 text-base border-craft-gray-300 focus:border-craft-mint focus:ring-craft-mint"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 px-8 bg-craft-mint hover:bg-craft-mint/90 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    "Subscribing..."
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            <p className="text-xs text-craft-gray-500 mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterCTA;
