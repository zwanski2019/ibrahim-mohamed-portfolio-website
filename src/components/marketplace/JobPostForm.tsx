
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, Form } from "@/components/heroui";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/heroui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, Plus, AlertCircle } from "lucide-react";
import { useCreateJobPost } from "@/hooks/useJobPosts";
import { useCategories } from "@/hooks/useCategories";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { geocodeLocation } from "@/utils/geocoding";

const jobPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(1, "Please select a category"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  job_type: z.enum(["full-time", "part-time", "contract", "freelance"]),
  salary_type: z.enum(["hourly", "fixed", "monthly"]),
  salary_min: z.number().min(0, "Minimum salary must be positive"),
  salary_max: z.number().optional(),
  urgency: z.enum(["low", "medium", "high"]).default("medium"),
});

type JobPostFormData = z.infer<typeof jobPostSchema>;

interface JobPostFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const JobPostForm = ({ onSuccess, onCancel }: JobPostFormProps) => {
  const { t } = useLanguage();
  const [requirements, setRequirements] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState("");
  const [newBenefit, setNewBenefit] = useState("");

  const { user, isLoading: authLoading } = useAuth();
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const createJobPost = useCreateJobPost();

  const form = useForm<JobPostFormData>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      urgency: "medium",
    },
  });

  if (authLoading) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">{t("jobs.loading")}</p>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You must be logged in to post a job. Please sign in to continue.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (categoriesError) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load categories. Please try again later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const onSubmit = async (data: JobPostFormData) => {
    if (!user?.id) {
      toast.error("You must be logged in to post a job");
      return;
    }

    try {
      // Geocode the location to get coordinates
      const geocodingResult = await geocodeLocation(data.location);
      let coordinates = null;
      
      if (geocodingResult) {
        coordinates = {
          latitude: geocodingResult.coordinates.latitude,
          longitude: geocodingResult.coordinates.longitude
        };
        console.log('Geocoded location:', data.location, '→', coordinates);
      } else {
        console.warn('Could not geocode location:', data.location);
      }

      await createJobPost.mutateAsync({
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        job_type: data.job_type,
        salary_type: data.salary_type,
        salary_min: data.salary_min,
        employer_id: user.id,
        requirements,
        benefits,
        salary_max: data.salary_max,
        urgency: data.urgency,
        latitude: coordinates?.latitude,
        longitude: coordinates?.longitude,
      });

      toast.success("Job posted successfully!");
      onSuccess?.();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to post job";
      toast.error(errorMessage);
      console.error("Job post error:", error);
    }
  };

  const addRequirement = () => {
    if (newRequirement.trim() && !requirements.includes(newRequirement.trim())) {
      setRequirements([...requirements, newRequirement.trim()]);
      setNewRequirement("");
    }
  };

  const addBenefit = () => {
    if (newBenefit.trim() && !benefits.includes(newBenefit.trim())) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const removeRequirement = (req: string) => {
    setRequirements(requirements.filter(r => r !== req));
  };

  const removeBenefit = (benefit: string) => {
    setBenefits(benefits.filter(b => b !== benefit));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t("jobs.postNewJob")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" aria-label="post-job-form">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("jobs.jobTitle")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("jobs.jobTitlePlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("jobs.jobDescription")}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t("jobs.jobDescriptionPlaceholder")}
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("jobs.category")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={categoriesLoading}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={categoriesLoading ? t("jobs.loading") : t("jobs.selectCategory")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.icon} {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("jobs.location")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("jobs.locationPlaceholderForm")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="job_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("jobs.jobType")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("jobs.selectType")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="full-time">{t("jobs.fullTime")}</SelectItem>
                        <SelectItem value="part-time">{t("jobs.partTime")}</SelectItem>
                        <SelectItem value="contract">{t("jobs.contract")}</SelectItem>
                        <SelectItem value="freelance">{t("jobs.freelance")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salary_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("jobs.salaryRange")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("jobs.selectType")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hourly">{t("jobs.hourly")}</SelectItem>
                        <SelectItem value="fixed">{t("jobs.fixedPrice")}</SelectItem>
                        <SelectItem value="monthly">{t("jobs.monthly")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="urgency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("jobs.urgencyLevel")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("jobs.selectUrgency")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">{t("jobs.low")}</SelectItem>
                        <SelectItem value="medium">{t("jobs.medium")}</SelectItem>
                        <SelectItem value="high">{t("jobs.high")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="salary_min"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("jobs.minimumSalary")}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="500"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salary_max"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("jobs.maximumSalary")}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="1000"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Requirements */}
            <div className="space-y-3">
              <FormLabel>{t("jobs.requirements")}</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder={t("jobs.addRequirement")}
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                />
                <Button type="button" onClick={addRequirement} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {requirements.map((req) => (
                  <Badge key={req} variant="secondary" className="flex items-center gap-1">
                    {req}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeRequirement(req)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              <FormLabel>{t("jobs.benefits")}</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder={t("jobs.addBenefit")}
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                />
                <Button type="button" onClick={addBenefit} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {benefits.map((benefit) => (
                  <Badge key={benefit} variant="outline" className="flex items-center gap-1">
                    {benefit}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeBenefit(benefit)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                disabled={createJobPost.isPending}
                className="flex-1"
              >
                {createJobPost.isPending ? t("jobs.posting") : t("jobs.postJob")}
              </Button>
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  {t("jobs.cancel")}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
