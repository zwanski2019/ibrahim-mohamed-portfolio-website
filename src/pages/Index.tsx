
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
        title="Zwanski Tech – IT Services, Web Development & Unlocking Solutions"
        description="Zwanski Tech offers expert IT support, website design, computer repair, and iPhone/Android unlocking services. Trusted by individuals and businesses in Tunisia."
        keywords="IT services Tunisia, web development, computer repair Tunis, unlocking solutions, cybersecurity, device repair, IMEI unlock, website design, tech support, iPhone unlock, Android unlock"
        ogImage="https://zwanski.org/og-image.png"
        canonical="https://zwanski.org/"
        structuredData={[organizationStructuredData, localBusinessStructuredData, websiteStructuredData, faqStructuredData]}
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

          {/* Enhanced SEO Content Section */}
          <section className="py-16 bg-secondary/20">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Expert IT Services & Digital Education in Tunisia</h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Professional IT Support & Device Repair in Tunis</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Zwanski Tech has been serving Tunisia's digital community since 2019, specializing in comprehensive IT support services across Tunis, Sfax, and Sousse. 
                      Our expert team provides professional computer repair Tunisia, smartphone troubleshooting, IMEI unlocking services, and tech support Tunisia. 
                      With over 300 successfully repaired devices and a 98% customer satisfaction rate, we've established ourselves as 
                      Tunisia's premier IT service provider. From hardware diagnostics to software optimization, our technical expertise 
                      covers laptop repair Tunis, desktop computer maintenance, and mobile device restoration throughout Tunisia.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Cybersecurity & Web Development Excellence</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Our cybersecurity education Tunisia and consulting services help businesses strengthen their digital defenses. 
                      We conduct thorough security audits, implement robust protection systems, and provide ongoing monitoring across Tunis and nationwide. 
                      Our web development Tunisia team creates modern, responsive websites using cutting-edge technologies like React, Node.js, and TypeScript. 
                      Whether you need a corporate website, e-commerce platform Tunisia, or custom web application, our tech consulting Tunisia 
                      delivers solutions that drive business growth and digital transformation Tunisia.
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Zwanski Academy: Online IT Courses Tunisia</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      The Zwanski Academy represents our commitment to digital education and skill development in Tunisia. 
                      Our comprehensive online learning platform offers IT courses Tunisia in web development, cybersecurity education, and programming tutorials. 
                      Students gain practical, industry-relevant skills through hands-on projects covering digital marketing Tunisia, software development, 
                      and technology certification programs. With multilingual support in Arabic, French, and English, we make quality tech education 
                      accessible to learners in Tunis, Sfax, Sousse, and throughout Tunisia's digital transformation journey.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Tech Jobs & Freelance Opportunities Tunisia</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Our job marketplace connects talented Tunisian developers and IT professionals Tunisia with local and international opportunities. 
                      We facilitate freelance projects Tunisia, remote work positions, and tech consulting engagements across various technology sectors. 
                      Employers benefit from access to pre-vetted technical talent, while job seekers gain exposure to quality IT jobs Tunisia 
                      that match their skills and career goals. The platform supports digital nomad opportunities, startup collaborations, 
                      and professional networking within Tunisia's growing technology ecosystem and innovation hubs.
                    </p>
                  </div>
                </div>

                {/* FAQ Section for SEO */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions - IT Services Tunisia</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-card rounded-lg p-6 border border-border">
                        <h4 className="font-semibold mb-3 text-primary">What IT services do you offer in Tunisia?</h4>
                        <p className="text-muted-foreground text-sm">
                          We provide comprehensive IT support including computer repair, smartphone troubleshooting, IMEI unlocking, 
                          cybersecurity consulting, web development, and digital education through Zwanski Academy across Tunis, Sfax, and Sousse.
                        </p>
                      </div>
                      <div className="bg-card rounded-lg p-6 border border-border">
                        <h4 className="font-semibold mb-3 text-primary">How much does computer repair cost in Tunisia?</h4>
                        <p className="text-muted-foreground text-sm">
                          Our computer repair costs vary by issue complexity. We offer free diagnostics and transparent pricing for laptop repair, 
                          desktop maintenance, and hardware replacement throughout Tunisia. Contact us for a personalized quote.
                        </p>
                      </div>
                      <div className="bg-card rounded-lg p-6 border border-border">
                        <h4 className="font-semibold mb-3 text-primary">Do you offer remote IT support in Tunisia?</h4>
                        <p className="text-muted-foreground text-sm">
                          Yes, we provide 24/7 remote IT support for software issues, cybersecurity concerns, and technical troubleshooting 
                          across Tunisia. Our team can assist with system optimization, malware removal, and software installation remotely.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="bg-card rounded-lg p-6 border border-border">
                        <h4 className="font-semibold mb-3 text-primary">What programming languages do you teach at Zwanski Academy?</h4>
                        <p className="text-muted-foreground text-sm">
                          Our online courses cover JavaScript, Python, React, Node.js, PHP, and mobile development. We offer beginner to advanced 
                          programming tutorials with practical projects and certification upon completion.
                        </p>
                      </div>
                      <div className="bg-card rounded-lg p-6 border border-border">
                        <h4 className="font-semibold mb-3 text-primary">Can you help with cybersecurity for small businesses in Tunisia?</h4>
                        <p className="text-muted-foreground text-sm">
                          Absolutely! We specialize in cybersecurity consulting for SMEs, offering security audits, firewall setup, 
                          employee training, and ongoing monitoring to protect your business data and customer information.
                        </p>
                      </div>
                      <div className="bg-card rounded-lg p-6 border border-border">
                        <h4 className="font-semibold mb-3 text-primary">How long does website development take in Tunisia?</h4>
                        <p className="text-muted-foreground text-sm">
                          Website development typically takes 2-8 weeks depending on complexity. We create responsive, modern websites 
                          optimized for Tunisian businesses with multilingual support and mobile-first design.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center bg-card rounded-lg p-8 border border-border">
                  <h3 className="text-2xl font-bold mb-4">Why Choose Zwanski Tech for IT Services Tunisia?</h3>
                  <div className="grid sm:grid-cols-4 gap-6 text-center mb-6">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">5+</div>
                      <p className="text-muted-foreground text-sm">Years Serving Tunisia</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">300+</div>
                      <p className="text-muted-foreground text-sm">Devices Successfully Repaired</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">98%</div>
                      <p className="text-muted-foreground text-sm">Customer Satisfaction Rate</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                      <p className="text-muted-foreground text-sm">Technical Support</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6 text-left mb-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-primary">Local Expertise</h4>
                      <p className="text-muted-foreground text-sm">Based in Tunis with deep understanding of Tunisia's tech landscape and business needs.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-primary">Multilingual Support</h4>
                      <p className="text-muted-foreground text-sm">Service available in Arabic, French, and English to serve all Tunisian communities.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-primary">Certified Professionals</h4>
                      <p className="text-muted-foreground text-sm">Our team holds international certifications in cybersecurity, web development, and IT support.</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground max-w-3xl mx-auto">
                    As Tunisia's leading IT service provider, Zwanski Tech combines local expertise with international standards. 
                    From device repair in Tunis to online education nationwide, we're your trusted partner for digital transformation. 
                    Contact us today for professional IT support, web development, or cybersecurity consulting in Tunisia.
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
