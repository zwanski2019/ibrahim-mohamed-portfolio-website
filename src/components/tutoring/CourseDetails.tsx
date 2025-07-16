import React from 'react';
import { ArrowLeft, Play, Star, Users, Clock, Award, BookOpen, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CourseDetails = () => {
  const course = {
    title: "Complete Web Development Bootcamp 2024",
    instructor: "Mohamed Ibrahim (Zwanski)",
    rating: 4.8,
    students: 1240,
    duration: "40 hours",
    price: 89.99,
    originalPrice: 199.99,
    description: "Master modern web development with React, Node.js, and MongoDB. Build real-world projects and get job-ready skills.",
    image: "/placeholder.svg",
    imageAlt: "Complete Web Development Bootcamp 2024 - Learn React, Node.js, and modern web development",
    curriculum: [
      { title: "HTML & CSS Fundamentals", duration: "4 hours", lessons: 12 },
      { title: "JavaScript Essentials", duration: "8 hours", lessons: 24 },
      { title: "React Development", duration: "12 hours", lessons: 30 },
      { title: "Backend with Node.js", duration: "10 hours", lessons: 25 },
      { title: "Database & MongoDB", duration: "6 hours", lessons: 15 },
    ],
    features: [
      "Lifetime access",
      "Certificate of completion",
      "30-day money-back guarantee",
      "Mobile and TV access",
      "Assignments and quizzes"
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative mb-6">
              <img 
                src={course.image} 
                alt={course.imageAlt}
                className="w-full h-64 object-cover rounded-lg"
              />
              <Button 
                size="lg"
                className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
              >
                <Play className="h-8 w-8 text-white" />
              </Button>
            </div>

            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{course.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{course.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>{course.students} students</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <span>English</span>
              </div>
            </div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Course Curriculum</h3>
                <div className="space-y-4">
                  {course.curriculum.map((section, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-purple-600" />
                        <div>
                          <h4 className="font-semibold">{section.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {section.lessons} lessons • {section.duration}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Preview
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-purple-600">${course.price}</span>
                    <span className="text-lg text-muted-foreground line-through">${course.originalPrice}</span>
                  </div>
                  <Badge variant="destructive" className="text-sm">
                    55% OFF - Limited Time
                  </Badge>
                </div>

                <Button className="w-full mb-4 bg-purple-600 hover:bg-purple-700">
                  Enroll Now
                </Button>
                <Button variant="outline" className="w-full mb-6">
                  Add to Wishlist
                </Button>

                <div className="space-y-3">
                  <h4 className="font-semibold">This course includes:</h4>
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-3">Instructor</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">ZW</span>
                    </div>
                    <div>
                      <p className="font-semibold">{course.instructor}</p>
                      <p className="text-sm text-muted-foreground">Web Developer & Instructor</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
