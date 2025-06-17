
import { useEffect } from "react";
import AffiliateProgram from "@/components/AffiliateProgram";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DynamicSkills from "@/components/dynamic/DynamicSkills";
import DynamicProjects from "@/components/dynamic/DynamicProjects";
import DynamicExperience from "@/components/dynamic/DynamicExperience";
import YouTubeVideos from "@/components/YouTubeVideos";
import Playground from "@/components/Playground";
import DynamicContact from "@/components/dynamic/DynamicContact";
import Footer from "@/components/Footer";
import AcademyHero from "@/components/academy/AcademyHero";
import CourseGrid from "@/components/academy/CourseGrid";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();

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
        <title>ZWANSKI TECH | Find Jobs & Freelancers - Professional Marketplace</title>
        <meta 
          name="description" 
          content="ZWANSKI TECH - Professional job marketplace connecting employers with talented freelancers. Find your next job or hire skilled professionals."
        />
        <meta name="author" content="ZWANSKI TECH Team" />
        <meta name="keywords" content="ZWANSKI TECH, job marketplace, freelancers, remote work, hiring, jobs, employment" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zwanski.org/" />
        <meta property="og:title" content="ZWANSKI TECH | Find Jobs & Freelancers - Professional Marketplace" />
        <meta property="og:description" content="Professional job marketplace connecting employers with talented freelancers." />
        <meta property="og:image" content="/og-image.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://zwanski.org/" />
        <meta property="twitter:title" content="ZWANSKI TECH | Find Jobs & Freelancers - Professional Marketplace" />
        <meta property="twitter:description" content="Professional job marketplace connecting employers with talented freelancers." />
        <meta property="twitter:image" content="/og-image.png" />
        
        {/* Canonical link */}
        <link rel="canonical" href="https://zwanski.org/" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <AffiliateProgram />
        <Navbar />
        <main>
          <Hero />
          <DynamicSkills />
          <DynamicProjects />
          <DynamicExperience />
          <YouTubeVideos />
          
          {/* Real Academy Section */}
          <section className="py-16 bg-muted/20">
            <div className="container mx-auto px-4">
              <AcademyHero />
              
              <div className="mt-12">
                <h3 className="text-3xl font-bold text-center mb-8">Featured Courses</h3>
                <CourseGrid
                  courses={courses || []}
                  isLoading={isLoading}
                  userEnrollments={userEnrollments || []}
                  showFeaturedOnly={true}
                />
                
                <div className="text-center mt-12">
                  <a
                    href="/academy"
                    className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    View All Courses
                  </a>
                </div>
              </div>
            </div>
          </section>
          
          <Playground />
          <DynamicContact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
