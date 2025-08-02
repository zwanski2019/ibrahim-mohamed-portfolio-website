import { useState, useEffect } from "react";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/context/LanguageContext";

interface Testimonial {
  id: string;
  name: string;
  position?: string;
  company?: string;
  avatar_url?: string;
  content: string;
  rating: number;
  featured: boolean;
  sort_order?: number;
  created_at?: string;
}

const Testimonials = () => {
  const { t } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    // Set fallback data immediately for better performance
    setTestimonials(fallbackTestimonials);
    setIsLoading(false);
    
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(6);

      // Only update if we got actual data
      if (!error && data && data.length > 0) {
        setTestimonials(data);
      }
    } catch (error) {
      // Silently fail - we already have fallback data
      console.warn("Could not load testimonials from database, using fallback data");
    }
  };

  const fallbackTestimonials: Testimonial[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      position: "CTO",
      company: "TechStart Inc.",
      content: "Zwanski Tech delivered exceptional web development services. Their team built our entire platform from scratch with incredible attention to detail and performance.",
      rating: 5,
      featured: true,
      sort_order: 1
    },
    {
      id: "2",
      name: "Ahmed Hassan",
      position: "IT Manager", 
      company: "Digital Solutions LLC",
      content: "Outstanding cybersecurity implementation. They secured our entire infrastructure and provided excellent Wazuh monitoring setup. Highly professional team.",
      rating: 5,
      featured: true,
      sort_order: 2
    },
    {
      id: "3",
      name: "Maria Garcia",
      position: "Founder",
      company: "Local Business Hub",
      content: "Quick and reliable device repair service. They recovered all my data from a damaged laptop and had it working like new within 24 hours.",
      rating: 5,
      featured: true,
      sort_order: 3
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-muted-foreground"
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <section className="axeptio-section bg-secondary/30">
        <div className="axeptio-container">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="axeptio-section bg-secondary/30">
      <div className="axeptio-container">
        <div className="text-center mb-12">
          <h2 className="axeptio-heading text-3xl md:text-4xl mb-4">
            What Our Clients Say
          </h2>
          <p className="axeptio-body max-w-2xl mx-auto">
            Don't just take our word for it. See what our satisfied clients have to say about our services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="axeptio-card p-8 md:p-12 relative">
            <Quote className="absolute top-6 left-6 h-8 w-8 text-primary/20" />
            
            <CardContent className="space-y-6">
              {/* Rating */}
              <div className="flex justify-center gap-1">
                {renderStars(currentTestimonial.rating)}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-lg md:text-xl text-center font-medium leading-relaxed text-foreground">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Client Info */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={currentTestimonial.avatar_url || ""}
                    alt={currentTestimonial.name || "Client avatar"}
                  />
                  <AvatarFallback className="text-lg font-semibold">
                    {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-center">
                  <h4 className="font-semibold text-foreground">
                    {currentTestimonial.name}
                  </h4>
                  {currentTestimonial.position && (
                    <p className="text-muted-foreground">
                      {currentTestimonial.position}
                      {currentTestimonial.company && ` at ${currentTestimonial.company}`}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;