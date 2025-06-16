
import { useState } from "react";
import { Search, Bell, User, MessageSquare, Briefcase, Star, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

interface ForumLayoutProps {
  children: React.ReactNode;
}

export default function ForumLayout({ children }: ForumLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const forumCategories = [
    { name: "Jobs & Opportunities", icon: Briefcase, count: 145, color: "bg-blue-500" },
    { name: "Services Marketplace", icon: Star, count: 89, color: "bg-green-500" },
    { name: "General Discussion", icon: MessageSquare, count: 234, color: "bg-purple-500" },
    { name: "Success Stories", icon: TrendingUp, count: 67, color: "bg-orange-500" },
  ];

  const recentPosts = [
    {
      id: 1,
      title: "Looking for experienced web developer in Tunis",
      author: "Ahmed Ben Ali",
      category: "Jobs",
      replies: 12,
      views: 156,
      lastActivity: "2 hours ago",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Best practices for freelancing in Tunisia",
      author: "Sarah Mansouri",
      category: "Discussion",
      replies: 8,
      views: 89,
      lastActivity: "4 hours ago",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Cleaning services available in Sfax area",
      author: "Mohamed Triki",
      category: "Services",
      replies: 5,
      views: 45,
      lastActivity: "6 hours ago",
      avatar: "/placeholder.svg"
    }
  ];

  const stats = [
    { label: "Total Jobs", value: "1,234", trend: "+12%" },
    { label: "Active Users", value: "5,678", trend: "+8%" },
    { label: "Success Rate", value: "89%", trend: "+3%" },
    { label: "Services", value: "456", trend: "+15%" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SOS</span>
                </div>
                <span className="text-xl font-bold text-gray-900">SOS Services</span>
              </Link>
            </div>

            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search jobs, services, discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Post Job
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{stat.label}</span>
                    <div className="text-right">
                      <div className="font-semibold">{stat.value}</div>
                      <div className="text-xs text-green-600">{stat.trend}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {forumCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}>
                        <category.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-sm">{category.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900">Recent Activity</h1>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Latest</Button>
                  <Button variant="outline" size="sm">Popular</Button>
                  <Button variant="outline" size="sm">Trending</Button>
                </div>
              </div>

              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.avatar} />
                          <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline">{post.category}</Badge>
                            <span className="text-sm text-gray-500">{post.lastActivity}</span>
                          </div>
                          
                          <h3 className="font-semibold text-lg mb-2 hover:text-blue-600">
                            {post.title}
                          </h3>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">by {post.author}</span>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{post.replies} replies</span>
                              <span>{post.views} views</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
