import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import AcademyHero from "@/components/academy/AcademyHero";
import CourseGrid from "@/components/academy/CourseGrid";
import CategoryFilter from "@/components/academy/CategoryFilter";
import { SearchBar } from "@/components/SearchBar";
import { useUserEnrollments } from "@/hooks/useAcademy";
import { useLanguage } from "@/context/LanguageContext";

const Academy = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficulty, setDifficulty] = useState<string>("all");
  const { t } = useLanguage();

  const { data: categories } = useQuery({
    queryKey: ['academy-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('active', true)
        .order('sort_order');
      
      if (error) throw error;
      return data;
    }
  });

  const { data: courses, isLoading } = useQuery({
    queryKey: ['academy-courses', selectedCategory, searchQuery, difficulty],
    queryFn: async () => {
      let query = supabase
        .from('courses')
        .select(`
          *,
          categories:category_id(name, icon),
          course_enrollments(id)
        `)
        .eq('is_active', true);

      if (selectedCategory !== "all") {
        query = query.eq('category_id', selectedCategory);
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,tags.cs.{${searchQuery}}`);
      }

      if (difficulty !== "all") {
        query = query.eq('difficulty', difficulty as "beginner" | "intermediate" | "advanced");
      }

      query = query.order('is_featured', { ascending: false })
                   .order('enrollment_count', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  const { data: userEnrollments } = useUserEnrollments();

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <AcademyHero />
          
          <section className="py-12 bg-muted/20">
            <div className="container mx-auto px-4">
              {/* Search and Filters */}
              <div className="mb-8 space-y-4">
                <div className="max-w-2xl mx-auto">
                  <SearchBar
                    placeholder={t("academy.searchPlaceholder")}
                    onSearch={setSearchQuery}
                  />
                </div>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-border bg-background"
                  >
                    <option value="all">{t("academy.allLevels")}</option>
                    <option value="beginner">{t("academy.beginner")}</option>
                    <option value="intermediate">{t("academy.intermediate")}</option>
                    <option value="advanced">{t("academy.advanced")}</option>
                  </select>
                </div>
              </div>

              {/* Category Filter */}
              <CategoryFilter
                categories={categories || []}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              {/* Course Grid */}
              <CourseGrid
                courses={courses || []}
                isLoading={isLoading}
                userEnrollments={userEnrollments || []}
              />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Academy;
