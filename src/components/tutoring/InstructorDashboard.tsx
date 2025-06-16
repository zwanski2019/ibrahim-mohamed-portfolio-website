
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, DollarSign, Star, TrendingUp, BookOpen, PlayCircle } from "lucide-react";

const InstructorDashboard = () => {
  const stats = [
    { title: "Total Students", value: "2,847", icon: Users, change: "+12%" },
    { title: "Total Revenue", value: "$28,950", icon: DollarSign, change: "+8%" },
    { title: "Average Rating", value: "4.8", icon: Star, change: "+0.2" },
    { title: "Course Views", value: "45,230", icon: TrendingUp, change: "+15%" },
  ];

  const courses = [
    { title: "Web Development Bootcamp", students: 1240, revenue: "$12,400", rating: 4.8 },
    { title: "React Masterclass", students: 890, revenue: "$8,900", rating: 4.9 },
    { title: "UI/UX Design Course", students: 717, revenue: "$7,170", rating: 4.7 },
  ];

  return (
    <section id="instructor" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Instructor Dashboard</h2>
          <p className="text-xl text-muted-foreground">Share your knowledge and earn money</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change}</p>
                    </div>
                    <IconComponent className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Courses</CardTitle>
              <CardDescription>Manage your course portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-purple-600" />
                      <div>
                        <h4 className="font-semibold">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {course.students} students • {course.rating} ⭐
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{course.revenue}</p>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                Create New Course
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Become an Instructor</CardTitle>
              <CardDescription>Start teaching and earning today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <PlayCircle className="h-5 w-5 text-green-600" />
                <span>Create engaging video content</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-600" />
                <span>Reach thousands of students</span>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-purple-600" />
                <span>Earn money from your expertise</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                Start Teaching
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InstructorDashboard;
