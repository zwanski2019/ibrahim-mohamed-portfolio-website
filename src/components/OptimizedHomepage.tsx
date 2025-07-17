import { Suspense, lazy } from "react";
import { TestimonialSkeleton, ProjectCardSkeleton, CourseCardSkeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

// Lazy load heavy components
const DynamicSkills = lazy(() => import("@/components/dynamic/DynamicSkills"));
const DynamicProjects = lazy(() => import("@/components/dynamic/DynamicProjects"));
const DynamicExperience = lazy(() => import("@/components/dynamic/DynamicExperience"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const YouTubeVideos = lazy(() => import("@/components/YouTubeVideos"));
const AcademyHero = lazy(() => import("@/components/academy/AcademyHero"));
const CourseGrid = lazy(() => import("@/components/academy/CourseGrid"));
const QuickContact = lazy(() => import("@/components/QuickContact"));
const EnhancedContact = lazy(() => import("@/components/EnhancedContact"));

interface OptimizedHomepageProps {
  courses: any[];
  isLoadingCourses: boolean;
  userEnrollments: any[];
}

export default function OptimizedHomepage({ 
  courses, 
  isLoadingCourses, 
  userEnrollments 
}: OptimizedHomepageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ contentVisibility: 'auto' }}>
      <Navbar />
      
      {/* Above-the-fold content - loaded immediately */}
      <section>
        <Hero />
      </section>

      <section>
        <ValueProposition />
      </section>

      <section>
        <Services />
      </section>

      {/* Below-the-fold content - lazy loaded */}
      <Suspense fallback={<TestimonialSkeleton />}>
        <section>
          <Testimonials />
        </section>
      </Suspense>

      <Suspense fallback={<div className="h-96 animate-pulse bg-muted/30" />}>
        <section>
          <DynamicSkills />
        </section>
      </Suspense>

      <Suspense fallback={
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      }>
        <section>
          <DynamicProjects />
        </section>
      </Suspense>

      <Suspense fallback={<div className="h-64 animate-pulse bg-muted/30" />}>
        <section>
          <DynamicExperience />
        </section>
      </Suspense>

      <Suspense fallback={<div className="h-96 animate-pulse bg-muted/30" />}>
        <section>
          <YouTubeVideos />
        </section>
      </Suspense>

      {/* Academy Section */}
      <Suspense fallback={
        <section className="py-24 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      }>
        <section className="py-24 bg-secondary/10">
          <div className="container mx-auto px-4">
            <AcademyHero />
            <CourseGrid 
              courses={courses || []} 
              isLoading={isLoadingCourses}
              userEnrollments={userEnrollments?.map(enrollment => enrollment.course_id) || []}
            />
          </div>
        </section>
      </Suspense>

      {/* Contact sections */}
      <Suspense fallback={<div className="h-64 animate-pulse bg-muted/30" />}>
        <section>
          <QuickContact />
        </section>
      </Suspense>
      
      <Suspense fallback={<div className="h-96 animate-pulse bg-muted/30" />}>
        <section>
          <EnhancedContact />
        </section>
      </Suspense>

      <Footer />
    </div>
  );
}