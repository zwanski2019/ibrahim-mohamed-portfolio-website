
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

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="axeptio-hero">
            <div className="axeptio-hero-content">
              <h1 className="axeptio-heading mb-6">
                Newsletter Signup
              </h1>
              
              <p className="axeptio-subheading mb-10">
                Subscribe to our newsletter and stay updated with the latest 
                developments, insights, and resources from Zwanski Tech.
              </p>
              
              <div className="axeptio-card max-w-lg mx-auto">
                <NewsletterForm />
              </div>
            </div>
          </section>
          
          {/* Benefits Section */}
          <section className="axeptio-section bg-secondary/30">
            <div className="axeptio-container">
              <h2 className="axeptio-subheading text-center mb-12">
                Benefits of Joining Our Newsletter
              </h2>
              
              <div className="axeptio-grid-3">
                {[
                  {
                    title: "Exclusive Content",
                    description: "Be the first to access new resources and content not available anywhere else.",
                    icon: "✨"
                  },
                  {
                    title: "Regular Updates",
                    description: "Receive updates on our latest projects, insights and developments.",
                    icon: "📧"
                  },
                  {
                    title: "Special Offers",
                    description: "Get access to special discounts and offers exclusively for newsletter subscribers.",
                    icon: "🎁"
                  }
                ].map((benefit, index) => (
                  <div 
                    key={index} 
                    className="axeptio-card-feature"
                  >
                    <div className="text-4xl mb-4">{benefit.icon}</div>
                    <h3 className="axeptio-feature-title">{benefit.title}</h3>
                    <p className="axeptio-feature-description">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Testimonials Section */}
          <section className="axeptio-section">
            <div className="axeptio-container">
              <h2 className="axeptio-subheading text-center mb-12">
                What Our Community Says
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {[
                  {
                    quote: "The newsletter has been a source of inspiration and valuable insights in my inbox every week!",
                    author: "Alex Morgan",
                    role: "Creative Developer"
                  },
                  {
                    quote: "I've discovered so many useful resources through this newsletter.",
                    author: "Jamie Lewis",
                    role: "Digital Artist"
                  }
                ].map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="axeptio-card relative"
                  >
                    <div className="absolute -top-3 -left-3 text-4xl text-primary">❝</div>
                    <div className="pt-4">
                      <p className="italic mb-4 axeptio-body">{testimonial.quote}</p>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
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
