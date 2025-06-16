
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Users, Clock, PlayCircle, Download, Certificate, Infinity, Globe, ChevronDown, ChevronRight } from "lucide-react";

const CourseDetails = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const courseModules = [
    {
      title: "Getting Started",
      duration: "2 hours",
      lessons: [
        "Course Introduction",
        "Setting up Development Environment",
        "Your First Web Page",
        "Understanding HTML Structure"
      ]
    },
    {
      title: "HTML Fundamentals",
      duration: "4 hours",
      lessons: [
        "HTML Elements and Tags",
        "Working with Text",
        "Lists and Tables",
        "Forms and Input Elements",
        "Semantic HTML"
      ]
    },
    {
      title: "CSS Styling",
      duration: "6 hours",
      lessons: [
        "CSS Basics and Selectors",
        "Colors and Typography",
        "Box Model and Layout",
        "Flexbox and Grid",
        "Responsive Design"
      ]
    },
    {
      title: "JavaScript Programming",
      duration: "8 hours",
      lessons: [
        "JavaScript Fundamentals",
        "DOM Manipulation",
        "Event Handling",
        "Async Programming",
        "Working with APIs"
      ]
    }
  ];

  const features = [
    { icon: Clock, text: "40 hours on-demand video" },
    { icon: Download, text: "15 downloadable resources" },
    { icon: Infinity, text: "Full lifetime access" },
    { icon: Globe, text: "Access on mobile and TV" },
    { icon: Certificate, text: "Certificate of completion" },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Complete Web Development Bootcamp 2024
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                Learn HTML, CSS, JavaScript, React, Node.js, and more. Build real projects and get job-ready skills.
              </p>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.8</span>
                  <span className="text-muted-foreground">(12,540 ratings)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>45,230 students</span>
                </div>
              </div>

              <p className="text-muted-foreground">
                Created by <span className="text-purple-600 font-semibold">Mohamed Ibrahim</span> • 
                Last updated 12/2024 • English
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b mb-8">
              <div className="flex space-x-8">
                {["overview", "curriculum", "reviews", "instructor"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                      activeTab === tab
                        ? "border-purple-600 text-purple-600"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">What you'll learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Build responsive websites with HTML5 and CSS3",
                      "Master JavaScript programming fundamentals",
                      "Create dynamic web apps with React",
                      "Build full-stack applications with Node.js",
                      "Work with databases and APIs",
                      "Deploy applications to production",
                      "Understand modern development workflows",
                      "Build a professional portfolio"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-green-600"></div>
                        </div>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Requirements</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• No programming experience needed</li>
                    <li>• A computer with internet connection</li>
                    <li>• Willingness to learn and practice</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Description</h3>
                  <div className="prose max-w-none text-muted-foreground">
                    <p className="mb-4">
                      Welcome to the most comprehensive web development course on the internet! 
                      This course is designed to take you from absolute beginner to job-ready developer.
                    </p>
                    <p className="mb-4">
                      You'll learn by building real projects, not just watching videos. By the end of this course, 
                      you'll have built multiple websites and web applications that you can add to your portfolio.
                    </p>
                    <p>
                      The course is constantly updated with new content and technologies to ensure you're 
                      learning the most current and in-demand skills.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "curriculum" && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Course Curriculum</h3>
                <div className="space-y-4">
                  {courseModules.map((module, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div 
                        className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 flex items-center justify-between"
                        onClick={() => setExpandedModule(expandedModule === index ? null : index)}
                      >
                        <div className="flex items-center gap-3">
                          {expandedModule === index ? 
                            <ChevronDown className="h-5 w-5" /> : 
                            <ChevronRight className="h-5 w-5" />
                          }
                          <div>
                            <h4 className="font-semibold">{module.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {module.lessons.length} lessons • {module.duration}
                            </p>
                          </div>
                        </div>
                      </div>
                      {expandedModule === index && (
                        <div className="border-t bg-gray-50/50 dark:bg-gray-800/30">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="p-4 border-b last:border-b-0 flex items-center gap-3">
                              <PlayCircle className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{lesson}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Student Reviews</h3>
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <Card key={review}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white font-semibold">
                            JD
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold">John Doe</span>
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground">
                              Excellent course! The instructor explains everything clearly and the projects 
                              are very practical. I was able to build my first website within the first week.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "instructor" && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Meet Your Instructor</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white text-2xl font-semibold">
                        MI
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold mb-2">Mohamed Ibrahim</h4>
                        <p className="text-muted-foreground mb-4">
                          Full-Stack Developer & Instructor with 8+ years of experience
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <div className="font-semibold">4.8</div>
                            <div className="text-sm text-muted-foreground">Rating</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold">45,230</div>
                            <div className="text-sm text-muted-foreground">Students</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold">12</div>
                            <div className="text-sm text-muted-foreground">Courses</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold">8+</div>
                            <div className="text-sm text-muted-foreground">Years</div>
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          I'm passionate about teaching and helping students achieve their goals. 
                          I've worked with companies like Google and Microsoft, and now I'm dedicated 
                          to sharing my knowledge through online education.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop" 
                  alt="Course preview"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-t-lg">
                  <PlayCircle className="h-16 w-16 text-white" />
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-purple-600">$89.99</span>
                    <span className="text-lg text-muted-foreground line-through">$199.99</span>
                  </div>
                  <p className="text-sm text-red-600 font-semibold">55% off • Limited time offer</p>
                </div>

                <div className="space-y-3 mb-6">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-3">
                    Enroll Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    Add to Wishlist
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">This course includes:</h4>
                  {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <IconComponent className="h-4 w-4 text-muted-foreground" />
                        <span>{feature.text}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
