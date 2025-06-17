
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FreelancerCard } from "@/components/marketplace/FreelancerCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useFreelancerProfiles, FreelancerProfile } from "@/hooks/useFreelancerProfiles";
import { Search, Filter, X, Plus } from "lucide-react";
import { Loader2 } from "lucide-react";

const Freelancers = () => {
  const [filters, setFilters] = useState({
    search: "",
    skills: [] as string[],
    minRate: 0,
    maxRate: 200,
    location: "",
  });

  const [selectedFreelancer, setSelectedFreelancer] = useState<FreelancerProfile | null>(null);

  const { data: freelancers = [], isLoading, error } = useFreelancerProfiles(filters);

  const handleFiltersChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      skills: [],
      minRate: 0,
      maxRate: 200,
      location: "",
    });
  };

  const handleContact = (freelancerId: string) => {
    console.log('Contact freelancer:', freelancerId);
    // TODO: Implement messaging system
  };

  const handleViewProfile = (freelancer: FreelancerProfile) => {
    setSelectedFreelancer(freelancer);
    console.log('View profile:', freelancer);
    // TODO: Implement profile modal or navigation
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== "" && value !== 0 && value !== 200
  );

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-destructive">
                Error loading freelancers. Please try again later.
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">Find Talented Freelancers</h1>
              <p className="text-xl text-muted-foreground">
                Connect with skilled professionals ready to bring your projects to life
              </p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Join as Freelancer
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </CardTitle>
                  {hasActiveFilters && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleClearFilters}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <Label htmlFor="search">Search Freelancers</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Name, skills, title..."
                      value={filters.search}
                      onChange={(e) => handleFiltersChange('search', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, region..."
                    value={filters.location}
                    onChange={(e) => handleFiltersChange('location', e.target.value)}
                  />
                </div>

                {/* Hourly Rate Range */}
                <div className="space-y-3">
                  <Label>Hourly Rate (TND)</Label>
                  <div className="px-2">
                    <Slider
                      value={[filters.minRate, filters.maxRate]}
                      onValueChange={(value) => {
                        handleFiltersChange('minRate', value[0]);
                        handleFiltersChange('maxRate', value[1]);
                      }}
                      max={200}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>{filters.minRate} TND</span>
                      <span>{filters.maxRate} TND</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  Available Freelancers ({freelancers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="ml-2">Loading freelancers...</span>
                  </div>
                ) : freelancers.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No freelancers found matching your criteria.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {freelancers.map((freelancer) => (
                      <FreelancerCard
                        key={freelancer.id}
                        freelancer={freelancer}
                        onContact={handleContact}
                        onViewProfile={handleViewProfile}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Freelancers;
