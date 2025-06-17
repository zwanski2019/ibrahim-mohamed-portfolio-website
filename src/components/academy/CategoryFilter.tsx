
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import * as Icons from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: string;
  sort_order: number;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.BookOpen;
    return IconComponent;
  };

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-6 text-center">Browse by Category</h3>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => onCategoryChange("all")}
          className="flex items-center gap-2"
        >
          <Icons.Grid3X3 className="h-4 w-4" />
          All Categories
        </Button>
        
        {categories.map((category) => {
          const IconComponent = getIcon(category.icon);
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => onCategoryChange(category.id)}
              className="flex items-center gap-2"
            >
              <IconComponent className="h-4 w-4" />
              {category.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
