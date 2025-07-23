import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import DynamicSkills from "@/components/dynamic/DynamicSkills";
import DynamicProjects from "@/components/dynamic/DynamicProjects";
import DynamicExperience from "@/components/dynamic/DynamicExperience";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import QuickContact from "@/components/QuickContact";
import YouTubeVideos from "@/components/YouTubeVideos";
import EnhancedContact from "@/components/EnhancedContact";
import Footer from "@/components/Footer";
import AcademyHero from "@/components/academy/AcademyHero";
import CourseGrid from "@/components/academy/CourseGrid";
import { Button } from "@/components/ui/button";
import { SEOHelmet } from "@/components/SEOHelmet";
import { organizationStructuredData, localBusinessStructuredData, websiteStructuredData, faqStructuredData } from "@/data/structuredData";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";

const Index = () => {
  console.log("Landing page loaded");
  const { user } = useAuth();
  const { t } = useLanguage();

  // Fetch courses for the home page with error handling and longer cache
  const { data: courses, isLoading } = useQuery({
    queryKey: ['featured-courses'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select(`
            *,
            categories:category_id(name, icon),
            course_enrollments(id)
          `)
          .eq('is_active', true)
          .eq('is_featured', true)
          .order('enrollment_count', { ascending: false })
          .limit(6);

        if (error) {
          console.warn('Failed to load courses:', error);
          return [];
        }
        return data || [];
      } catch (error) {
        console.warn('Failed to load courses:', error);
        return [];
      }
    },
    staleTime: 15 * 60 * 1000, // 15 minutes - longer cache
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
    refetchOnWindowFocus: false
  });

  // Fetch user enrollments if logged in with error handling and longer cache
  const { data: userEnrollments } = useQuery({
    queryKey: ['user-enrollments', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      try {
        const { data, error } = await supabase
          .from('course_enrollments')
          .select(`
            *,
            courses:course_id(*)
          `)
          .eq('user_id', user.id);

        if (error) {
          console.warn('Failed to load user enrollments:', error);
          return [];
        }
        return data || [];
      } catch (error) {
        console.warn('Failed to load user enrollments:', error);
        return [];
      }
    },
    enabled: !!user?.id,
    staleTime: 10 * 60 * 1000, // 10 minutes - longer cache
    gcTime: 20 * 60 * 1000, // 20 minutes
    retry: 1,
    refetchOnWindowFocus: false
  });

  // Minimal animation setup for better performance
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Make everything visible immediately for accessibility
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        (element as HTMLElement).style.opacity = '1';
        (element as HTMLElement).style.transform = 'none';
      });
      return;
    }

    // Simplified intersection observer for progressive loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '20px'
    });

    // Immediate visibility for better perceived performance
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((element) => {
      (element as HTMLElement).style.opacity = '1';
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [])

  const structuredDataItems = [
    organizationStructuredData,
    localBusinessStructuredData,
    websiteStructuredData,
    faqStructuredData
  ];

  // Render with error boundary and fallback
  const renderPageContent = () => {
    try {
      return (
        <>
          <SEOHelmet 
            title="Zwanski Tech - Professional IT Services & Digital Education Platform"
            description="Expert IT services in Tunisia: computer repair, cybersecurity, web development, and digital education. Professional solutions for businesses and individuals."
            keywords="IT services Tunisia, computer repair, cybersecurity, web development, digital education, Zwanski Tech"
            canonical="https://zwanski.org/"
            structuredData={structuredDataItems}
          />
          
          <div className="min-h-screen bg-background text-foreground homepage-content" style={{opacity: 1, visibility: 'visible', display: 'block'}}>
        <Navbar />
        
        {/* Hero Section */}
        <section className="animate-on-scroll">
          <Hero />
        </section>

        {/* Value Proposition */}
        <section className="animate-on-scroll">
          <ValueProposition />
        </section>

        {/* Services Section */}
        <section className="animate-on-scroll">
          <Services />
        </section>

        {/* Testimonials */}
        <section className="animate-on-scroll">
          <Testimonials />
        </section>

        {/* Dynamic Skills */}
        <section className="animate-on-scroll">
          <DynamicSkills />
        </section>

        {/* Dynamic Projects */}
        <section className="animate-on-scroll">
          <DynamicProjects />
        </section>

        {/* Dynamic Experience */}
        <section className="animate-on-scroll">
          <DynamicExperience />
        </section>

        {/* YouTube Videos Section */}
        <section className="animate-on-scroll">
          <YouTubeVideos />
        </section>

        {/* Academy Section */}
        <section className="py-24 bg-secondary/10 animate-on-scroll">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {"Zwanski Academy"}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {"Master new technologies with our comprehensive courses designed for real-world application"}
              </p>
            </div>

            <div className="mb-12">
              <AcademyHero />
            </div>

            {/* Featured Courses */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-8 text-center">Featured Courses</h3>
              <CourseGrid 
                courses={courses || []} 
                isLoading={isLoading}
                userEnrollments={userEnrollments?.map(enrollment => enrollment.course_id) || []}
              />
            </div>

            {/* Academy CTA */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Link to="/academy">
                    View All Courses
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/academy/instructor">
                    Become an Instructor
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced SEO Content Section */}
        <section className="py-24 bg-background animate-on-scroll">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Comprehensive IT Solutions for Modern Businesses</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Professional IT Services</h3>
                  <p className="text-muted-foreground mb-4">
                    Our expert team provides comprehensive IT solutions including computer repair, 
                    network setup, data recovery, and system optimization. We serve both individual 
                    clients and businesses across Tunisia with reliable, efficient service.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Computer diagnosis and repair</li>
                    <li>Network installation and maintenance</li>
                    <li>Data backup and recovery solutions</li>
                    <li>System performance optimization</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Cybersecurity Excellence</h3>
                  <p className="text-muted-foreground mb-4">
                    Protect your digital assets with our advanced cybersecurity services. 
                    From vulnerability assessments to security implementation, we ensure 
                    your systems remain secure against evolving threats.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Security audits and assessments</li>
                    <li>Firewall configuration and management</li>
                    <li>Malware removal and prevention</li>
                    <li>Employee security training</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Web Development Services</h3>
                  <p className="text-muted-foreground mb-4">
                    Create powerful web applications and websites that drive your business forward. 
                    Our development team specializes in modern technologies and responsive design 
                    to deliver exceptional user experiences.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Custom web application development</li>
                    <li>E-commerce platform creation</li>
                    <li>Responsive website design</li>
                    <li>API development and integration</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Digital Education Platform</h3>
                  <p className="text-muted-foreground mb-4">
                    Access our comprehensive learning platform featuring courses in programming, 
                    cybersecurity, and digital marketing. Learn from industry experts and advance 
                    your technical skills with hands-on projects.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Programming and web development courses</li>
                    <li>Cybersecurity certification programs</li>
                    <li>Digital marketing training</li>
                    <li>Practical project-based learning</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-secondary/5 animate-on-scroll">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Find answers to common questions about our IT services and digital education platform.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-2">What types of devices do you repair?</h3>
                <p className="text-muted-foreground">
                  We repair computers, laptops, tablets, smartphones, and various electronic devices. 
                  Our technicians are experienced with all major brands and operating systems.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-2">How quickly can you respond to IT emergencies?</h3>
                <p className="text-muted-foreground">
                  We offer same-day service for urgent repairs and can provide emergency support 
                  within 2-4 hours for critical business systems.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-2">Do you offer training programs?</h3>
                <p className="text-muted-foreground">
                  Yes, our Zwanski Academy offers comprehensive courses in programming, cybersecurity, 
                  and digital marketing. Courses are available online with flexible scheduling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-background animate-on-scroll">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Why Choose Zwanski Tech?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience the difference with our professional approach, expertise, and commitment to excellence.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Proven Excellence</h3>
                <p className="text-muted-foreground">
                  Over 5 years of experience delivering high-quality IT solutions with a 98% customer satisfaction rate.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Fast Response</h3>
                <p className="text-muted-foreground">
                  Quick turnaround times and emergency support available to minimize downtime for your business.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert Knowledge</h3>
                <p className="text-muted-foreground">
                  Certified professionals with expertise in latest technologies and industry best practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Sections */}
        <section className="animate-on-scroll">
          <QuickContact />
        </section>
        
        <section className="animate-on-scroll">
          <EnhancedContact />
        </section>

            <Footer />
          </div>
        </>
      );
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Homepage rendering error:', error);
      }
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Welcome to Zwanski Tech</h1>
            <p className="text-muted-foreground mb-4">Loading our services...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      );
    }
  };

  return renderPageContent();
};

export default Index;