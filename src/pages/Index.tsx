
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ForumLayout from "@/components/layout/ForumLayout";
import ForumHomePage from "@/components/ForumHomePage";

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

  return (
    <>
      <Helmet>
        <title>SOS Services | Tunisia's Premier Job Marketplace & Professional Services</title>
        <meta 
          name="description" 
          content="SOS Services - Tunisia's leading job marketplace and professional services platform. Find jobs, hire talent, and connect with service providers across Tunisia. Created by Mohamed Ibrahim (Zwanski)."
        />
        <meta name="author" content="Mohamed Ibrahim (Zwanski)" />
        <meta name="keywords" content="SOS Services, Tunisia Jobs, Job Marketplace, Professional Services, Zwanski, Mohamed Ibrahim, Tunis, Employment, Freelance" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zwanski2019.github.io/zwanski-store/" />
        <meta property="og:title" content="SOS Services | Tunisia's Premier Job Marketplace" />
        <meta property="og:description" content="Find jobs, hire talent, and connect with professional services across Tunisia." />
        <meta property="og:image" content="/og-image.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://zwanski2019.github.io/zwanski-store/" />
        <meta property="twitter:title" content="SOS Services | Tunisia's Premier Job Marketplace" />
        <meta property="twitter:description" content="Find jobs, hire talent, and connect with professional services across Tunisia." />
        <meta property="twitter:image" content="/og-image.png" />
        
        {/* Canonical link */}
        <link rel="canonical" href="https://zwanski2019.github.io/zwanski-store/" />
      </Helmet>
      
      <ForumLayout>
        <ForumHomePage />
      </ForumLayout>
    </>
  );
};

export default Index;
