
import React from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Briefcase } from "lucide-react";

const Freelancers = () => {
  const freelancers = [
    {
      id: 1,
      name: "Ahmed Ben Ali",
      title: "Full Stack Developer",
      location: "Tunis, Tunisia",
      rating: 4.9,
      reviews: 127,
      hourlyRate: 25,
      skills: ["React", "Node.js", "MongoDB", "TypeScript"],
      avatar: "",
      completedProjects: 89,
    },
    {
      id: 2,
      name: "Fatima Gharbi",
      title: "UI/UX Designer",
      location: "Sfax, Tunisia",
      rating: 4.8,
      reviews: 94,
      hourlyRate: 20,
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      avatar: "",
      completedProjects: 56,
    },
    {
      id: 3,
      name: "Mohamed Trabelsi",
      title: "Digital Marketing Specialist",
      location: "Sousse, Tunisia",
      rating: 4.7,
      reviews: 78,
      hourlyRate: 18,
      skills: ["SEO", "Google Ads", "Social Media", "Analytics"],
      avatar: "",
      completedProjects: 43,
    },
  ];

  return (
    <React.Fragment>
      <Helmet>
        <title>Find Freelancers - SOS Jobs</title>
        <meta name="description" content="Find talented freelancers in Tunisia for your projects" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find Top Freelancers
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Connect with skilled professionals ready to bring your projects to life
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">Available Freelancers</h2>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {freelancers.length} professionals available
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freelancers.map((freelancer) => (
              <Card key={freelancer.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={freelancer.avatar} />
                      <AvatarFallback className="text-lg">
                        {freelancer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{freelancer.name}</h3>
                      <p className="text-muted-foreground mb-2">{freelancer.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{freelancer.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{freelancer.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({freelancer.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{freelancer.completedProjects} projects</span>
                    </div>
                    <div className="font-semibold text-green-600">
                      ${freelancer.hourlyRate}/hr
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {freelancer.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {freelancer.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{freelancer.skills.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      Contact
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Freelancers;
