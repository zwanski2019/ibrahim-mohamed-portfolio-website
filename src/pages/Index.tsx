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
import TutoringPlatform from "@/components/tutoring/TutoringPlatform";
import InstructorDashboard from "@/components/tutoring/InstructorDashboard";
import { Helmet } from "react-helmet-async";

const Index = () => {
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
        <title>SOS Jobs | Find Jobs & Freelancers - Professional Marketplace</title>
        <meta 
          name="description" 
          content="SOS Jobs - Professional job marketplace connecting employers with talented freelancers. Find your next job or hire skilled professionals."
        />
        <meta name="author" content="SOS Jobs Team" />
        <meta name="keywords" content="SOS Jobs, job marketplace, freelancers, remote work, hiring, jobs, employment" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zwanski.org/" />
        <meta property="og:title" content="SOS Jobs | Find Jobs & Freelancers - Professional Marketplace" />
        <meta property="og:description" content="Professional job marketplace connecting employers with talented freelancers." />
        <meta property="og:image" content="/og-image.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://zwanski.org/" />
        <meta property="twitter:title" content="SOS Jobs | Find Jobs & Freelancers - Professional Marketplace" />
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
          <TutoringPlatform />
          <InstructorDashboard />
          <Playground />
          <DynamicContact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
