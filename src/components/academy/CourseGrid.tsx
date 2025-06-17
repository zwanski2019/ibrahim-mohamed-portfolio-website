
import { useState } from "react";
import CourseCard from "./CourseCard";
import { Skeleton } from "@/components/ui/skeleton";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  external_url: string;
  platform: string;
  instructor_name: string;
  difficulty: string;
  duration_hours: number;
  language: string;
  tags: string[];
  rating: number;
  enrollment_count: number;
  is_featured: boolean;
  categories: { name: string; icon: string } | null;
}

interface CourseGridProps {
  courses: Course[];
  isLoading: boolean;
  userEnrollments: string[];
}

const CourseGrid = ({ courses, isLoading, userEnrollments }: CourseGridProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold mb-2">No courses found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search criteria or browse different categories.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          {courses.length} course{courses.length !== 1 ? 's' : ''} found
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            List
          </button>
        </div>
      </div>

      <div className={
        viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
      }>
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isEnrolled={userEnrollments.includes(course.id)}
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseGrid;
