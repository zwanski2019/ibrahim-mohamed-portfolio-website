
import { Briefcase, Users, TrendingUp, MapPin, Clock, DollarSign, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export default function ForumHomePage() {
  const featuredJobs = [
    {
      id: 1,
      title: "Senior Web Developer",
      company: "TechStart Tunisia",
      location: "Tunis",
      salary: "2000-3000 TND",
      type: "Full-time",
      posted: "2 days ago",
      applicants: 12,
      tags: ["React", "Node.js", "TypeScript"]
    },
    {
      id: 2,
      title: "Graphic Designer",
      company: "Creative Agency",
      location: "Sfax",
      salary: "1500-2000 TND",
      type: "Part-time",
      posted: "1 day ago",
      applicants: 8,
      tags: ["Photoshop", "Illustrator", "UI/UX"]
    },
    {
      id: 3,
      title: "Content Writer",
      company: "Marketing Pro",
      location: "Remote",
      salary: "1000-1500 TND",
      type: "Freelance",
      posted: "3 hours ago",
      applicants: 5,
      tags: ["Arabic", "French", "SEO"]
    }
  ];

  const topServices = [
    {
      id: 1,
      name: "Home Cleaning",
      provider: "CleanPro Services",
      rating: 4.8,
      reviews: 156,
      price: "50 TND/hour",
      location: "Tunis"
    },
    {
      id: 2,
      name: "Plumbing Services",
      provider: "FixIt Fast",
      rating: 4.9,
      reviews: 89,
      price: "80 TND/visit",
      location: "Sousse"
    },
    {
      id: 3,
      name: "Web Development",
      provider: "Mohamed Zwanski",
      rating: 5.0,
      reviews: 45,
      price: "100 TND/hour",
      location: "Tunis"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to SOS Services Forum
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Tunisia's premier job marketplace and services platform. Connect with opportunities, 
          share experiences, and grow your professional network.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/jobs">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Browse Jobs</h3>
                <p className="text-sm text-gray-600">Find your next opportunity</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/services">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Find Services</h3>
                <p className="text-sm text-gray-600">Get professional help</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="flex items-center p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold">Post Job/Service</h3>
              <p className="text-sm text-gray-600">Start hiring or offering</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Jobs */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Jobs</h2>
          <Link to="/jobs">
            <Button variant="outline">View All Jobs</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <p className="text-sm text-gray-600">{job.company}</p>
                  </div>
                  <Badge variant="outline">{job.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {job.salary}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {job.posted}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-gray-500">{job.applicants} applicants</span>
                    <Button size="sm">Apply Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Top Services */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Top Rated Services</h2>
          <Link to="/services">
            <Button variant="outline">View All Services</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.provider}</p>
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{service.provider.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{service.rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({service.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {service.location}
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-semibold text-green-600">{service.price}</span>
                    <Button size="sm" variant="outline">Contact</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* About Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Mohamed (Zwanski)</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-6">
            Welcome to my portfolio and the SOS Services platform! I'm Mohamed Ibrahim, known as Zwanski, 
            a passionate web developer and full-stack engineer based in Tunis, Tunisia. This platform 
            showcases both my personal work and serves as a comprehensive job marketplace for Tunisia.
          </p>
          <div className="flex justify-center space-x-4">
            <Button>View Portfolio</Button>
            <Button variant="outline">Contact Me</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
