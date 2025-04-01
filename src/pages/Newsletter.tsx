
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewsletterForm from "../components/NewsletterForm";
import { Sparkles, Stars, Wand2 } from "lucide-react";

export default function Newsletter() {
  return (
    <>
      <Helmet>
        <title>Magic Newsletter - Join the Enchantment</title>
        <meta
          name="description"
          content="Join our magical newsletter and stay updated with the latest enchanted developments and spellbinding news."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          {/* Hero Section with Magical Theme */}
          <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background to-purple-900/20">
            {/* Animated Stars Background */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-10 left-10 animate-pulse-slow">
                <Stars className="h-8 w-8 text-purple-300/70" />
              </div>
              <div className="absolute top-1/4 right-1/4 animate-float">
                <Sparkles className="h-6 w-6 text-amber-300/70" />
              </div>
              <div className="absolute bottom-1/3 left-1/3 animate-spin-slow">
                <Stars className="h-10 w-10 text-blue-300/70" />
              </div>
              <div className="absolute bottom-20 right-20 animate-pulse-slow">
                <Sparkles className="h-7 w-7 text-purple-300/70" />
              </div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-3xl mx-auto">
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <Wand2 className="h-16 w-16 text-primary animate-float" />
                    <div className="absolute -top-2 -right-2 h-8 w-8 bg-purple-500/20 rounded-full blur-xl animate-pulse-slow"></div>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-gradient">Join the Magic</span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
                  Subscribe to our enchanted newsletter and be the first to receive
                  spellbinding updates, magical offers, and mystical insights.
                </p>
                
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg blur-xl opacity-75 animate-pulse-slow"></div>
                  <div className="relative bg-card rounded-lg border border-border p-8 shadow-xl">
                    <NewsletterForm />
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Benefits Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                The <span className="text-gradient">Benefits</span> of Joining Our Magical Circle
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Exclusive Content",
                    description: "Be the first to access our magical resources and special content not available anywhere else.",
                    icon: "✨"
                  },
                  {
                    title: "Mystical Updates",
                    description: "Receive regular updates on our latest projects, insights and magical developments.",
                    icon: "🔮"
                  },
                  {
                    title: "Special Offers",
                    description: "Get access to special discounts and offers exclusively for our newsletter subscribers.",
                    icon: "🎁"
                  }
                ].map((benefit, index) => (
                  <div 
                    key={index} 
                    className="bg-card border border-border rounded-xl p-6 card-transform-3d shadow-3d"
                  >
                    <div className="text-4xl mb-4">{benefit.icon}</div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Testimonials Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                What Our <span className="text-gradient">Magical Community</span> Says
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {[
                  {
                    quote: "The newsletter has been a source of inspiration and magic in my inbox every week!",
                    author: "Alex Morgan",
                    role: "Creative Developer"
                  },
                  {
                    quote: "I've discovered so many enchanting resources through this magical newsletter.",
                    author: "Jamie Lewis",
                    role: "Digital Artist"
                  }
                ].map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="bg-card border border-border rounded-xl p-6 relative card-transform-3d"
                  >
                    <div className="absolute -top-3 -left-3 text-4xl">❝</div>
                    <div className="pt-4">
                      <p className="italic mb-4">{testimonial.quote}</p>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                          {testimonial.author[0]}
                        </div>
                        <div className="ml-3">
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
