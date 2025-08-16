
import { useState } from "react";
import { Search, Star, Users, Clock, PlayCircle, BookOpen, Code, Palette, BarChart3, Globe, Camera, Music } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const TutoringPlatform = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", name: "All Courses", icon: BookOpen },
    { id: "programming", name: "Programming", icon: Code },
    { id: "design", name: "Design", icon: Palette },
    { id: "business", name: "Business", icon: BarChart3 },
    { id: "marketing", name: "Marketing", icon: Globe },
    { id: "photography", name: "Photography", icon: Camera },
    { id: "music", name: "Music", icon: Music },
  ];

  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp 2024",
      instructor: "Mohamed Ibrahim",
      rating: 4.8,
      students: 12540,
      duration: "40 hours",
      price: 89.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
      category: "programming",
      bestseller: true,
      level: "Beginner to Advanced"
    },
    {
      id: 2,
      title: "React & Next.js - Complete Guide",
      instructor: "Sarah Johnson",
      rating: 4.9,
      students: 8750,
      duration: "32 hours",
      price: 79.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
      category: "programming",
      bestseller: false,
      level: "Intermediate"
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      instructor: "Alex Chen",
      rating: 4.7,
      students: 5420,
      duration: "28 hours",
      price: 69.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=225&fit=crop",
      category: "design",
      bestseller: true,
      level: "All Levels"
    },
    {
      id: 4,
      title: "Digital Marketing Strategy 2024",
      instructor: "Emma Wilson",
      rating: 4.6,
      students: 9830,
      duration: "24 hours",
      price: 59.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
      category: "marketing",
      bestseller: false,
      level: "Beginner"
    },
    {
      id: 5,
      title: "Python for Data Science",
      instructor: "Dr. James Smith",
      rating: 4.8,
      students: 15600,
      duration: "45 hours",
      price: 94.99,
      originalPrice: 219.99,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
      category: "programming",
      bestseller: true,
      level: "Intermediate to Advanced"
    },
    {
      id: 6,
      title: "Photography Fundamentals",
      instructor: "Lisa Rodriguez",
      rating: 4.5,
      students: 3240,
      duration: "18 hours",
      price: 49.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=225&fit=crop",
      category: "photography",
      bestseller: false,
      level: "Beginner"
    },
    {
      id: 7,
      title: "Business Analytics with Excel",
      instructor: "Michael Brown",
      rating: 4.7,
      students: 7890,
      duration: "30 hours",
      price: 74.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
      category: "business",
      bestseller: true,
      level: "Intermediate"
    },
    {
      id: 8,
      title: "Music Production with Logic Pro",
      instructor: "David Lee",
      rating: 4.6,
      students: 4560,
      duration: "22 hours",
      price: 64.99,
      originalPrice: 139.99,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
      category: "music",
      bestseller: false,
      level: "All Levels"
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredCourses = courses.filter(course => course.bestseller).slice(0, 3);

  return (
    <section id="tutoring" className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-indigo-950/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
            Zwanski Academy
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Learn from industry experts and advance your career with our comprehensive online courses
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <input
              type="text"
              placeholder="Search for courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`flex items-center gap-2 px-6 py-3 ${
                  selectedCategory === category.id 
                    ? "bg-purple-600 hover:bg-purple-700" 
                    : "hover:bg-purple-50 dark:hover:bg-purple-900/20"
                }`}
              >
                <IconComponent size={18} />
                {category.name}
              </Button>
            );
          })}
        </div>

        {/* Featured Courses */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Featured Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-0 shadow-lg">
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    BESTSELLER
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <PlayCircle className="text-white h-16 w-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h4>
                  <p className="text-muted-foreground text-sm mb-3">by {course.instructor}</p>
                  
                  <div className="flex items-center gap-4 mb-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-purple-600">${course.price}</span>
                      <span className="text-muted-foreground line-through">${course.originalPrice}</span>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Courses */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-8">
            All Courses ({filteredCourses.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {course.bestseller && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      BESTSELLER
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {course.level}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-1 line-clamp-2 h-10">{course.title}</h4>
                  <p className="text-muted-foreground text-xs mb-2">by {course.instructor}</p>
                  
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-purple-600">${course.price}</span>
                      <span className="text-xs text-muted-foreground line-through">${course.originalPrice}</span>
                    </div>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-xs">
                      Enroll
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Learning?</h3>
          <p className="text-xl mb-6 opacity-90">Join thousands of students already learning with us</p>
          <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
            Browse All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TutoringPlatform;
