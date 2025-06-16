
import { useState } from "react";
import { useJobPosts } from "@/hooks/useJobPosts";
import { JobCard } from "@/components/marketplace/JobCard";
import { JobSearchFilters } from "@/components/marketplace/JobSearchFilters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Plus, MapPin, Briefcase } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Jobs = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    category: "",
    jobType: "",
    salaryRange: [0, 5000],
    urgency: [] as string[],
  });

  const { data: jobs, isLoading, error } = useJobPosts({
    location: filters.location || undefined,
    category: filters.category || undefined,
  });

  const handleApply = (jobId: string) => {
    console.log("Apply to job:", jobId);
    // TODO: Implement job application logic
  };

  const handleViewDetails = (job: any) => {
    console.log("View job details:", job);
    // TODO: Navigate to job details page
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      category: "",
      jobType: "",
      salaryRange: [0, 5000],
      urgency: [],
    });
  };

  return (
    <>
      <Helmet>
        <title>Jobs - SOS Services</title>
        <meta name="description" content="Find jobs and services in Tunisia" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find Your Next Opportunity
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Discover thousands of jobs and services across Tunisia
              </p>
              
              {/* Quick Search */}
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs..."
                    className="pl-10 h-12 bg-background text-foreground"
                  />
                </div>
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Location..."
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    className="pl-10 h-12 bg-background text-foreground"
                  />
                </div>
                <Button size="lg" variant="secondary" className="h-12 px-8">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-4">
                <JobSearchFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={clearFilters}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-semibold">
                    Available Jobs
                  </h2>
                  {jobs && (
                    <span className="text-muted-foreground">
                      {jobs.length} jobs found
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    Filters
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Post Job
                  </Button>
                </div>
              </div>

              {/* Jobs Grid */}
              {isLoading ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <Skeleton className="h-6 w-3/4 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3 mb-4" />
                        <div className="flex gap-2 mb-4">
                          <Skeleton className="h-6 w-16" />
                          <Skeleton className="h-6 w-20" />
                        </div>
                        <div className="flex gap-2">
                          <Skeleton className="h-8 flex-1" />
                          <Skeleton className="h-8 flex-1" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : error ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Error loading jobs
                    </h3>
                    <p className="text-muted-foreground">
                      Please try again later
                    </p>
                  </CardContent>
                </Card>
              ) : jobs && jobs.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {jobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onApply={handleApply}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      No jobs found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search criteria or check back later
                    </p>
                    <Button onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
