
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, MapPin, Filter, X } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { useLanguage } from "@/context/LanguageContext";

interface JobSearchFiltersProps {
  filters: {
    search: string;
    location: string;
    category: string;
    jobType: string;
    salaryRange: number[];
    urgency: string[];
  };
  onFiltersChange: (filters: any) => void;
  onClearFilters: () => void;
}

export const JobSearchFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters 
}: JobSearchFiltersProps) => {
  const { data: categories = [] } = useCategories();
  const { t } = useLanguage();
  
  const jobTypes = [
    { value: "full-time", label: t("jobs.fullTime") },
    { value: "part-time", label: t("jobs.partTime") },
    { value: "contract", label: t("jobs.contract") },
    { value: "freelance", label: t("jobs.freelance") }
  ];

  const urgencyLevels = [
    { value: "low", label: t("jobs.urgency.low") },
    { value: "medium", label: t("jobs.urgency.medium") },
    { value: "high", label: t("jobs.urgency.high") }
  ];
  
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== ""
  );

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {t("jobs.filters")}
          </CardTitle>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              {t("jobs.clear")}
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">{t("jobs.searchJobs")}</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder={t("jobs.searchPlaceholder")}
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">{t("jobs.location")}</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="location"
              placeholder={t("jobs.locationPlaceholder")}
              value={filters.location}
              onChange={(e) => updateFilter('location', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>{t("jobs.category")}</Label>
          <Select 
            value={filters.category || undefined} 
            onValueChange={(value) => updateFilter('category', value || "")}
          >
            <SelectTrigger>
              <SelectValue placeholder={t("jobs.selectCategory")} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.icon} {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Job Type */}
        <div className="space-y-2">
          <Label>{t("jobs.jobType")}</Label>
          <Select 
            value={filters.jobType || undefined} 
            onValueChange={(value) => updateFilter('jobType', value || "")}
          >
            <SelectTrigger>
              <SelectValue placeholder={t("jobs.selectJobType")} />
            </SelectTrigger>
            <SelectContent>
              {jobTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Salary Range */}
        <div className="space-y-3">
          <Label>{t("jobs.salaryRange")}</Label>
          <div className="px-2">
            <Slider
              value={filters.salaryRange}
              onValueChange={(value) => updateFilter('salaryRange', value)}
              max={5000}
              min={0}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>{filters.salaryRange[0]} TND</span>
              <span>{filters.salaryRange[1]} TND</span>
            </div>
          </div>
        </div>

        {/* Urgency */}
        <div className="space-y-3">
          <Label>{t("jobs.urgencyLevel")}</Label>
          <div className="space-y-2">
            {urgencyLevels.map((level) => (
              <div key={level.value} className="flex items-center space-x-2">
                <Checkbox
                  id={level.value}
                  checked={filters.urgency.includes(level.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateFilter('urgency', [...filters.urgency, level.value]);
                    } else {
                      updateFilter('urgency', filters.urgency.filter((u: string) => u !== level.value));
                    }
                  }}
                />
                <Label 
                  htmlFor={level.value} 
                  className="cursor-pointer"
                >
                  {level.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="space-y-2">
            <Label>{t("jobs.activeFilters")}</Label>
            <div className="flex flex-wrap gap-1">
              {filters.search && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {t("common.search")}: {filters.search}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => updateFilter('search', '')}
                  />
                </Badge>
              )}
              {filters.location && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {t("jobs.location")}: {filters.location}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => updateFilter('location', '')}
                  />
                </Badge>
              )}
              {filters.category && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.category}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => updateFilter('category', '')}
                  />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
