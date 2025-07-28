// All imports stay the same...
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
import NewsletterForm from "@/components/NewsletterForm";
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
  const {
    user
  } = useAuth();
  const {
    t
  } = useLanguage();
  const {
    data: courses,
    isLoading
  } = useQuery({
    queryKey: ["featured-courses"],
    queryFn: async () => {
      try {
        const {
          data,
          error
        } = await supabase.from("courses").select(`
            *,
            categories:category_id(name, icon),
            course_enrollments(id)
          `).eq("is_active", true).eq("is_featured", true).order("enrollment_count", {
          ascending: false
        }).limit(6);
        if (error) {
          console.warn("Failed to load courses:", error);
          return [];
        }
        return data || [];
      } catch (error) {
        console.warn("Failed to load courses:", error);
        return [];
      }
    },
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false
  });
  const {
    data: userEnrollments
  } = useQuery({
    queryKey: ["user-enrollments", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      try {
        const {
          data,
          error
        } = await supabase.from("course_enrollments").select(`
            *,
            courses:course_id(*)
          `).eq("user_id", user.id);
        if (error) {
          console.warn("Failed to load user enrollments:", error);
          return [];
        }
        return data || [];
      } catch (error) {
        console.warn("Failed to load user enrollments:", error);
        return [];
      }
    },
    enabled: !!user?.id,
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false
  });
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = document.querySelectorAll(".animate-on-scroll");
    if (prefersReducedMotion) {
      elements.forEach(element => {
        (element as HTMLElement).style.opacity = "1";
        (element as HTMLElement).style.transform = "none";
      });
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "20px"
    });
    elements.forEach(element => {
      (element as HTMLElement).style.opacity = "1";
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  const structuredDataItems = [organizationStructuredData, localBusinessStructuredData, websiteStructuredData, faqStructuredData];
  const renderPageContent = () => {
    try {
      return <>
          <SEOHelmet title="Zwanski Tech - Professional IT Services & Digital Education Platform" description="Expert IT services in Tunisia: computer repair, cybersecurity, web development, and digital education. Professional solutions for businesses and individuals." keywords="IT services Tunisia, computer repair, cybersecurity, web development, digital education, Zwanski Tech" canonical="https://zwanski.org/" structuredData={structuredDataItems} />

          <main id="main-content" className="flex flex-col min-h-screen bg-background text-foreground homepage-content" style={{
          opacity: 1,
          visibility: "visible",
          display: "block"
        }}>
            <Navbar />

            <section className="animate-on-scroll">
              <Hero />
            </section>

            <section id="next-section" className="animate-on-scroll">
              <ValueProposition />
            </section>

            <section className="animate-on-scroll">
              <Services />
            </section>

            <section className="animate-on-scroll">
              <Testimonials />
            </section>

            <section className="animate-on-scroll">
              <DynamicSkills />
            </section>

            <section className="animate-on-scroll">
              <DynamicProjects />
            </section>

            <section className="animate-on-scroll">
              <DynamicExperience />
            </section>

            <section className="animate-on-scroll">
              <YouTubeVideos />
            </section>

            <section className="py-24 bg-secondary/10 animate-on-scroll">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Zwanski Academy
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Master new technologies with our comprehensive courses designed for real-world application
                  </p>
                </div>

                <div className="mb-12">
                  <AcademyHero />
                </div>

                <div className="mb-12">
                  <h3 className="text-2xl font-bold mb-8 text-center">Featured Courses</h3>
                  <CourseGrid courses={courses || []} isLoading={isLoading} userEnrollments={userEnrollments?.map(enrollment => enrollment.course_id) || []} />
                </div>

                <div className="text-center">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Link to="/academy">View All Courses</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link to="/academy/instructor">Become an Instructor</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            

            

            

            <section className="animate-on-scroll">
              <QuickContact />
            </section>

            <section className="animate-on-scroll">
              <EnhancedContact />
            </section>

            <section className="py-24 animate-on-scroll">
              <div className="container mx-auto px-4">
                <div className="max-w-xl mx-auto">
                  <NewsletterForm />
                </div>
              </div>
            </section>

            <Footer />
          </main>
        </>;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("renderPageContent error:", error);
      }
      return <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Welcome to Zwanski Tech</h1>
            <p className="text-muted-foreground mb-4">Loading our services...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>;
    }
  };
  return renderPageContent();
};
export default Index;