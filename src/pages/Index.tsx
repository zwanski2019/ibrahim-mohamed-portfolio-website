
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Jobs from "@/pages/Jobs";
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
        <title>SOS Jobs - Find Work & Hire Talent in Tunisia</title>
        <meta 
          name="description" 
          content="SOS Jobs - The premier job marketplace in Tunisia. Find freelance work, full-time positions, and hire talented professionals across all industries."
        />
        <meta name="author" content="SOS Jobs" />
        <meta name="keywords" content="SOS Jobs, Tunisia Jobs, Freelance, Hire Talent, Job Board, Employment" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SOS Jobs - Find Work & Hire Talent in Tunisia" />
        <meta property="og:description" content="The premier job marketplace in Tunisia. Find freelance work, full-time positions, and hire talented professionals." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="SOS Jobs - Find Work & Hire Talent in Tunisia" />
        <meta property="twitter:description" content="The premier job marketplace in Tunisia. Find freelance work, full-time positions, and hire talented professionals." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main>
          <Jobs />
        </main>
      </div>
    </>
  );
};

export default Index;
