import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import YouTubeVideos from "@/components/YouTubeVideos";
import Playground from "@/components/Playground";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
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
    <ThemeProvider>
      <Helmet>
        <title>Mohamed Ibrahim (Zwanski) | Web Developer & Full-Stack Engineer</title>
        <meta 
          name="description" 
          content="Official portfolio of Mohamed Ibrahim (Zwanski) - Web Developer & Full-Stack Engineer based in Tunis, Tunisia. Specialized in WordPress, PHP, React, and UI/UX Design."
        />
        <meta name="author" content="Mohamed Ibrahim (Zwanski)" />
        <meta name="keywords" content="Zwanski, Mohamed Ibrahim, Web Developer, Tunis, Tunisia, PHP, WordPress, React, Full-Stack, Portfolio" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zwanski2019.github.io/zwanski-store/" />
        <meta property="og:title" content="Mohamed Ibrahim (Zwanski) | Web Developer & Full-Stack Engineer" />
        <meta property="og:description" content="Official portfolio of Mohamed Ibrahim (Zwanski) - Web Developer & Full-Stack Engineer based in Tunis, Tunisia." />
        <meta property="og:image" content="/og-image.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://zwanski2019.github.io/zwanski-store/" />
        <meta property="twitter:title" content="Mohamed Ibrahim (Zwanski) | Web Developer & Full-Stack Engineer" />
        <meta property="twitter:description" content="Official portfolio of Mohamed Ibrahim (Zwanski) - Web Developer & Full-Stack Engineer based in Tunis, Tunisia." />
        <meta property="twitter:image" content="/og-image.png" />
        
        {/* Canonical link */}
        <link rel="canonical" href="https://zwanski2019.github.io/zwanski-store/" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <Skills />
          <Projects />
          <Experience />
          <YouTubeVideos />
          <Playground />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
