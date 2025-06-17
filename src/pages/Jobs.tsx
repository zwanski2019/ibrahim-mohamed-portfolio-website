
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JobCard } from "@/components/marketplace/JobCard";
import { JobSearchFilters } from "@/components/marketplace/JobSearchFilters";
import { JobMap } from "@/components/marketplace/JobMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useJobPosts } from "@/hooks/useJobPosts";
import { Loader2, Map, List } from "lucide-react";
import { JobPost } from "@/types/marketplace";

const Jobs = () => {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    category: "",
    jobType: "",
    salaryRange: [0, 5000],
    urgency: [] as string[],
  });

  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);

  const { data: jobs = [], isLoading, error } = useJobPosts(filters);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      location: "",
      category: "",
      jobType: "",
      salaryRange: [0, 5000],
      urgency: [],
    });
  };

  const handleJobSelect = (job: JobPost) => {
    setSelectedJob(job);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-destructive">
                Error loading jobs. Please try again later.
              </p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Find Your Next Job</h1>
          <p className="text-xl text-muted-foreground">
            Discover opportunities in Tunisia's growing job market
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <JobSearchFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    Jobs Available ({jobs.length})
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="list" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="list" className="flex items-center gap-2">
                      <List className="h-4 w-4" />
                      List View
                    </TabsTrigger>
                    <TabsTrigger value="map" className="flex items-center gap-2">
                      <Map className="h-4 w-4" />
                      Map View
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="list" className="mt-6">
                    {isLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin" />
                        <span className="ml-2">Loading jobs...</span>
                      </div>
                    ) : jobs.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No jobs found matching your criteria.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {jobs.map((job) => (
                          <JobCard
                            key={job.id}
                            job={job}
                            onViewDetails={handleJobSelect}
                            onApply={(jobId) => console.log('Apply to job:', jobId)}
                          />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="map" className="mt-6">
                    <JobMap 
                      jobs={jobs} 
                      onJobSelect={handleJobSelect}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Jobs;
