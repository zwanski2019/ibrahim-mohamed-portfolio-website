
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
import { organizationStructuredData, localBusinessStructuredData, websiteStructuredData } from "@/data/structuredData";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";

const Index = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  // Fetch courses for the home page
  const { data: courses, isLoading } = useQuery({
    queryKey: ['featured-courses'],
    queryFn: async () => {
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

      if (error) throw error;
      return data;
    }
  });

  const { data: userEnrollments } = useQuery({
    queryKey: ['user-enrollments', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('course_enrollments')
        .select('course_id')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data.map(e => e.course_id);
    },
    enabled: !!user
  });

  // Create gradient cursor effect
  useEffect(() => {
    const createGradientCursor = () => {
      const cursor = document.createElement('div');
      cursor.classList.add('gradient-cursor');
      document.body.appendChild(cursor);
      
      const onMouseMove = (e: MouseEvent) => {
        cursor.style.opacity = '1';
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      };
      
      const onMouseLeave = () => {
        cursor.style.opacity = '0';
      };
      
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseleave', onMouseLeave);
      
      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseleave', onMouseLeave);
        document.body.removeChild(cursor);
      };
    };
    
    // Only create gradient cursor on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
      return createGradientCursor();
    }
  }, []);
  
  // Add scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      
      animatedElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('is-visible');
        }
      });
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <SEOHelmet
        title="ZWANSKI TECH | Your Partner in Building, Repairing & Securing Digital Futures"
        description="Digital Solutions, Reimagined. Fix. Build. Secure. Empower. Professional IT services, web development, device repair, cybersecurity, and more."
        keywords="ZWANSKI TECH, IT services, web development, device repair, cybersecurity, IMEI repair, BIOS repair, remote support"
        ogImage="https://zwanski.org/og-image.png"
        canonical="https://zwanski.org/"
        structuredData={[organizationStructuredData, localBusinessStructuredData, websiteStructuredData]}
      />
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main>
          <Hero />
          <ValueProposition />
          <Services />
          <Testimonials />
          <DynamicSkills />
          <DynamicProjects />
          <DynamicExperience />
          <YouTubeVideos />
          
          {/* Clean Academy Section */}
          <section className="axeptio-section bg-secondary/30">
            <div className="axeptio-container">
              <div className="text-center mb-16">
                <h2 className="axeptio-heading mb-6">
                  {t("academy.title")}
                </h2>
                <p className="axeptio-subheading max-w-3xl mx-auto mb-8">
                  {t("academy.subtitle")}
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <div className="px-6 py-3 bg-background border border-border rounded-lg text-foreground font-medium shadow-sm">
                    📚 50+ {t("academy.freeCourses")}
                  </div>
                  <div className="px-6 py-3 bg-background border border-border rounded-lg text-foreground font-medium shadow-sm">
                    🎓 5000+ {t("academy.globalStudents")}
                  </div>
                  <div className="px-6 py-3 bg-background border border-border rounded-lg text-foreground font-medium shadow-sm">
                    ⭐ 4.8/5 Rating
                  </div>
                </div>
              </div>
              
              <div className="mb-12">
                <CourseGrid
                  courses={courses || []}
                  isLoading={isLoading}
                  userEnrollments={userEnrollments || []}
                  showFeaturedOnly={true}
                />
              </div>
              
              <div className="text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/academy">
                    <Button size="lg" className="axeptio-button-primary">
                      {t("academy.viewAllCourses")}
                    </Button>
                  </Link>
                  <Link to="/academy">
                    <Button variant="outline" size="lg" className="axeptio-button-secondary">
                      {t("academy.becomeInstructor")}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* SEO Content Section */}
          <section className="py-16 bg-secondary/20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Expert IT Services & Digital Education in Tunisia</h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Professional IT Support & Device Repair</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Zwanski Tech has been serving Tunisia's digital community since 2019, specializing in comprehensive IT support services. 
                      Our expert team provides professional computer repair, smartphone troubleshooting, and IMEI unlocking services. 
                      With over 300 successfully repaired devices and a 98% customer satisfaction rate, we've established ourselves as 
                      Tunisia's premier IT service provider. From hardware diagnostics to software optimization, our technical expertise 
                      covers all aspects of modern device maintenance and repair.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Cybersecurity & Web Development Excellence</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Our cybersecurity consulting services help businesses in Tunis and across Tunisia strengthen their digital defenses. 
                      We conduct thorough security audits, implement robust protection systems, and provide ongoing monitoring to ensure 
                      your digital assets remain secure. Additionally, our web development team creates modern, responsive websites using 
                      cutting-edge technologies like React, Node.js, and TypeScript. Whether you need a corporate website, e-commerce platform, 
                      or custom web application, our developers deliver solutions that drive business growth.
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Zwanski Academy: Digital Skills Education</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      The Zwanski Academy represents our commitment to digital education and skill development in Tunisia. 
                      Our comprehensive online learning platform offers courses in web development, cybersecurity, and IT fundamentals. 
                      Students gain practical, industry-relevant skills through hands-on projects and real-world scenarios. 
                      With multilingual support in Arabic, French, and English, we make quality tech education accessible to all Tunisians. 
                      Our courses are designed by industry professionals with 5+ years of experience in their respective fields.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Freelance Marketplace & Job Opportunities</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Our job marketplace connects talented Tunisian developers and IT professionals with local and international opportunities. 
                      We facilitate freelance projects, full-time positions, and consulting engagements across various technology sectors. 
                      Employers benefit from access to pre-vetted technical talent, while job seekers gain exposure to quality opportunities 
                      that match their skills and career goals. The platform supports remote work arrangements and provides tools for 
                      project management, secure payments, and professional networking within Tunisia's growing tech ecosystem.
                    </p>
                  </div>
                </div>
                
                <div className="text-center bg-card rounded-lg p-8 border border-border">
                  <h3 className="text-2xl font-bold mb-4">Why Choose Zwanski Tech?</h3>
                  <div className="grid sm:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">5+</div>
                      <p className="text-muted-foreground">Years of Experience</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">300+</div>
                      <p className="text-muted-foreground">Devices Repaired</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">98%</div>
                      <p className="text-muted-foreground">Customer Satisfaction</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
                    Based in Tunis, Tunisia, Zwanski Tech combines local expertise with international standards to deliver 
                    exceptional IT services and digital education. Contact us today to discuss your technology needs or 
                    explore our academy to advance your digital skills.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <QuickContact />
          <EnhancedContact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
