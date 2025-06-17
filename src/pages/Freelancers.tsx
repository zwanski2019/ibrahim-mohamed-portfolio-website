import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FreelancerCard } from "@/components/marketplace/FreelancerCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useFreelancerProfiles } from "@/hooks/useFreelancerProfiles";
import { Search, Filter, MapPin, Star, Loader2 } from "lucide-react";

const Freelancers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [minRate, setMinRate] = useState<number>(0);
  const [maxRate, setMaxRate] = useState<number>(100);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const { data: freelancers = [], isLoading, error } = useFreelancerProfiles({
    skills: selectedSkills,
    minRate: minRate,
    maxRate: maxRate,
    location: locationFilter,
  });

  const handleSkillSelect = (skill: string) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };

  const handleRateChange = (value: number[]) => {
    setMinRate(value[0]);
    setMaxRate(value[1]);
  };

  const availableSkills = [
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
    "Digital Marketing",
    "Content Writing",
    "Data Analysis",
  ];

  const filteredFreelancers = freelancers.filter((freelancer) =>
    freelancer.user.full_name.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h1 className="text-4xl font-bold mb-4">Find Top Freelancers</h1>
          <p className="text-xl text-muted-foreground">
            Connect with talented freelancers in Tunisia
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      id="search"
                      placeholder="Search by name"
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      id="location"
                      placeholder="Filter by location"
                      className="pl-9"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Hourly Rate (TND)</Label>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{minRate}</span>
                    <span>{maxRate}</span>
                  </div>
                  <Slider
                    defaultValue={[minRate, maxRate]}
                    min={0}
                    max={100}
                    step={10}
                    onValueChange={handleRateChange}
                  />
                </div>

                <div>
                  <Label>Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {availableSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={selectedSkills.includes(skill) ? "default" : "outline"}
                        onClick={() => handleSkillSelect(skill)}
                        className="cursor-pointer"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button variant="secondary" className="w-full">
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    Freelancers Available ({filteredFreelancers.length})
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="ml-2">Loading freelancers...</span>
                  </div>
                ) : filteredFreelancers.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No freelancers found matching your criteria.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredFreelancers.map((freelancer) => (
                      <FreelancerCard key={freelancer.id} freelancer={freelancer} />
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

const Label = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
  <label
    htmlFor={htmlFor}
    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  >
    {children}
  </label>
);
