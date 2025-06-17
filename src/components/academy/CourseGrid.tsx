
import { useState } from "react";
import CourseCard from "./CourseCard";
import { Skeleton } from "@/components/ui/skeleton";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  instructor_name: string;
  duration_hours: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  price: number;
  is_featured: boolean;
  enrollment_count: number;
  external_url: string | null;
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
}

const CourseGrid = ({ courses, isLoading, userEnrollments, showFeaturedOnly = false }: CourseGridProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
        <h3 className="text-2xl font-semibold mb-4">No courses found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria.
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
            Showing {courses.length} course{courses.length !== 1 ? 's' : ''}
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
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              List
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
          />
        ))}
      </div>
    </div>
  );
};

export default CourseGrid;
