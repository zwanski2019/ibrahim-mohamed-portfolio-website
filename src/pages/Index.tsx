
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
      <Helmet>
        <title>ZWANSKI TECH | Your Partner in Building, Repairing & Securing Digital Futures</title>
        <meta 
          name="description" 
          content="Digital Solutions, Reimagined. Fix. Build. Secure. Empower. Professional IT services, web development, device repair, cybersecurity, and more."
        />
        <meta name="author" content="ZWANSKI TECH Team" />
        <meta name="keywords" content="ZWANSKI TECH, IT services, web development, device repair, cybersecurity, IMEI repair, BIOS repair, remote support" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zwanski.org/" />
        <meta property="og:title" content="ZWANSKI TECH | Your Partner in Building, Repairing & Securing Digital Futures" />
        <meta property="og:description" content="Digital Solutions, Reimagined. Fix. Build. Secure. Empower." />
        <meta property="og:image" content="/og-image.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://zwanski.org/" />
        <meta property="twitter:title" content="ZWANSKI TECH | Your Partner in Building, Repairing & Securing Digital Futures" />
        <meta property="twitter:description" content="Digital Solutions, Reimagined. Fix. Build. Secure. Empower." />
        <meta property="twitter:image" content="/og-image.png" />
        
        {/* Canonical link */}
        <link rel="canonical" href="https://zwanski.org/" />
      </Helmet>
      
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
          
          <QuickContact />
          <EnhancedContact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
