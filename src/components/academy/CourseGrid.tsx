
import { useState } from "react";
import CourseCard from "./CourseCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/context/LanguageContext";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  external_url: string;
  platform: string;
  instructor_name: string;
  instructor_id: string | null;
  category_id: string | null;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration_hours: number;
  language: string;
  tags: string[];
  rating: number;
  total_ratings: number;
  enrollment_count: number;
  is_featured: boolean;
  is_active: boolean;
  is_premium?: boolean | null;
  slug: string;
  created_at: string;
  updated_at: string;
  categories: {
    name: string;
    icon: string;
  } | null;
  course_enrollments: any[];
}

interface CourseGridProps {
  courses: Course[];
  isLoading: boolean;
  userEnrollments: string[];
  showFeaturedOnly?: boolean;
  subscriptionStatus?: string | null;
}

const CourseGrid = ({ courses, isLoading, userEnrollments, showFeaturedOnly = false, subscriptionStatus }: CourseGridProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (!courses.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold mb-4">{t("academy.noCoursesFound")}</h3>
        <p className="text-muted-foreground">
          {t("academy.noCoursesDescription")}
        </p>
      </div>
    );
  }

  const displayedCourses = showFeaturedOnly ? courses.slice(0, 6) : courses;

  return (
    <div className="space-y-6">
      {!showFeaturedOnly && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {t("academy.showingCourses")} {courses.length} {courses.length !== 1 ? t("academy.coursePlural") : t("academy.course")}
          </p>
          
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {t("academy.gridView")}
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {t("academy.listView")}
            </button>
          </div>
        </div>
      )}

      <div className={
        viewMode === "grid" || showFeaturedOnly
          ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          : "space-y-4"
      }>
        {displayedCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isEnrolled={userEnrollments.includes(course.id)}
            viewMode={showFeaturedOnly ? "grid" : viewMode}
            subscriptionStatus={subscriptionStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseGrid;
