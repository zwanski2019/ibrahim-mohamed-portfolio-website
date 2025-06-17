
import { useState } from "react";
import { useJobPosts } from "@/hooks/useJobPosts";
import { JobCard } from "@/components/marketplace/JobCard";
import { JobSearchFilters } from "@/components/marketplace/JobSearchFilters";
import { JobPostForm } from "@/components/marketplace/JobPostForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MapPin, Briefcase, ArrowLeft, Users, TrendingUp, Clock, Star } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Jobs = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    category: "",
    jobType: "",
    salaryRange: [0, 5000],
    urgency: [] as string[],
  });

  const { data: jobs, isLoading, error, refetch } = useJobPosts({
    search: filters.search || undefined,
    location: filters.location || undefined,
    category: filters.category || undefined,
  });

  const handleApply = (jobId: string) => {
    console.log("Apply to job:", jobId);
    // TODO: Implement job application logic
  };

  const handleViewDetails = (job: any) => {
    console.log("View job details:", job);
    // TODO: Navigate to job details page or show modal
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      location: "",
      category: "",
      jobType: "",
      salaryRange: [0, 5000],
      urgency: [],
    });
  };

  const handleJobPosted = () => {
    setShowJobForm(false);
    refetch();
  };

  const stats = [
    { label: "Active Jobs", value: "1,234", icon: Briefcase, change: "+12%" },
    { label: "Companies", value: "456", icon: Users, change: "+8%" },
    { label: "Job Seekers", value: "12,345", icon: Users, change: "+15%" },
    { label: "Success Rate", value: "94%", icon: Star, change: "+2%" },
  ];

  const categories = [
    { name: "Technology", count: 234, color: "bg-blue-500" },
    { name: "Design", count: 156, color: "bg-purple-500" },
    { name: "Marketing", count: 189, color: "bg-green-500" },
    { name: "Sales", count: 145, color: "bg-orange-500" },
    { name: "Finance", count: 123, color: "bg-red-500" },
    { name: "Healthcare", count: 178, color: "bg-teal-500" },
  ];

  if (showJobForm) {
    return (
      <>
        <Helmet>
          <title>Post a Job - SOS Jobs</title>
          <meta name="description" content="Post a job on SOS Jobs marketplace in Tunisia" />
        </Helmet>

        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
              <Button 
                variant="ghost" 
                onClick={() => setShowJobForm(false)}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Jobs
              </Button>
            </div>
            
            <JobPostForm 
              onSuccess={handleJobPosted}
              onCancel={() => setShowJobForm(false)}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>SOS Jobs - Find Work & Hire Talent in Tunisia</title>
        <meta name="description" content="Find jobs and hire professionals in Tunisia's premier job marketplace" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Find Your Dream Job in Tunisia
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Connect with top employers and discover opportunities across all industries
              </p>
              
              {/* Quick Search */}
              <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Job title, skills, or company..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-10 h-14 text-lg bg-background text-foreground"
                  />
                </div>
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Location (Tunis, Sfax, Remote...)"
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    className="pl-10 h-14 text-lg bg-background text-foreground"
                  />
                </div>
                <Button size="lg" variant="secondary" className="h-14 px-8 text-lg">
                  <Search className="h-5 w-5 mr-2" />
                  Search Jobs
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="h-6 w-6 mr-2" />
                      <span className="text-2xl font-bold">{stat.value}</span>
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                    <p className="text-sm opacity-90">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
            <p className="text-muted-foreground">Explore opportunities in trending industries</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {categories.map((category) => (
              <Card key={category.name} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 ${category.color} rounded-lg mb-3 mx-auto flex items-center justify-center`}>
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} jobs</p>
                </CardContent>
              </Card>
            ))}
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
                    Latest Job Opportunities
                  </h2>
                  {jobs && (
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      {jobs.length} jobs available
                    </Badge>
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
                  <Button onClick={() => setShowJobForm(true)} size="lg">
                    <Plus className="h-5 w-5 mr-2" />
                    Post Job
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                      <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Posted Today</p>
                      <p className="text-xl font-semibold">47 new jobs</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">This Week</p>
                      <p className="text-xl font-semibold">238 applications</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                      <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Companies</p>
                      <p className="text-xl font-semibold">156 hiring</p>
                    </div>
                  </CardContent>
                </Card>
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
                    <p className="text-muted-foreground mb-4">
                      Please try again later
                    </p>
                    <Button onClick={() => refetch()}>
                      Try Again
                    </Button>
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
                      Try adjusting your search criteria or be the first to post a job!
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                      <Button onClick={() => setShowJobForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Post First Job
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-muted py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have found their dream jobs through SOS Jobs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setShowJobForm(true)}>
                <Plus className="h-5 w-5 mr-2" />
                Post a Job
              </Button>
              <Button size="lg" variant="outline">
                <Search className="h-5 w-5 mr-2" />
                Browse All Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
