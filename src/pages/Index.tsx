import { useEffect } from "react";
import AffiliateProgram from "@/components/AffiliateProgram";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DynamicSkills from "@/components/dynamic/DynamicSkills";
import DynamicProjects from "@/components/dynamic/DynamicProjects";
import DynamicExperience from "@/components/dynamic/DynamicExperience";
import YouTubeVideos from "@/components/YouTubeVideos";
import Playground from "@/components/Playground";
import EnhancedContact from "@/components/EnhancedContact";
import Footer from "@/components/Footer";
import AcademyHero from "@/components/academy/AcademyHero";
import CourseGrid from "@/components/academy/CourseGrid";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import SupportBanner from "@/components/SupportBanner";

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
        <SupportBanner />
        <AffiliateProgram />
        <Navbar />
        
        <main>
          <Hero />
          <DynamicSkills />
          <DynamicProjects />
          <DynamicExperience />
          <YouTubeVideos />
          
          {/* Enhanced Academy Section */}
          <section className="py-20 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16 animate-on-scroll">
                <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Zwanski Academy
                </h2>
                <p className="text-2xl text-slate-300 max-w-4xl mx-auto mb-8">
                  Free Learning for All - Master new skills with our comprehensive courses
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <div className="px-6 py-3 bg-purple-500/20 rounded-full border border-purple-500/30 text-purple-300 font-semibold">
                    📚 50+ Courses
                  </div>
                  <div className="px-6 py-3 bg-blue-500/20 rounded-full border border-blue-500/30 text-blue-300 font-semibold">
                    🎓 5000+ Students
                  </div>
                  <div className="px-6 py-3 bg-indigo-500/20 rounded-full border border-indigo-500/30 text-indigo-300 font-semibold">
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
                  <a
                    href="/academy"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-2xl shadow-purple-500/25"
                  >
                    View All Courses
                  </a>
                  <a
                    href="/academy"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-2xl shadow-blue-500/25"
                  >
                    Become an Instructor
                  </a>
                </div>
              </div>
            </div>
          </section>
          
          <Playground />
          <EnhancedContact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
