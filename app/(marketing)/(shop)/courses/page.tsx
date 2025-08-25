"use client";

import { NavMenu } from "../../components/nav-menu";
import { Hero } from "../../../../components/hero";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { useState } from "react";
import { Search, Star, Clock, Users, BookOpen, DollarSign } from "lucide-react";
import Image from "next/image";

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  lessons: number;
  image: string;
  tags: string[];
  featured?: boolean;
}

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Compliance", "Leadership", "Technical Skills", "Soft Skills", "Industry Specific"];

  const sampleCourses: Course[] = [
    {
      id: "1",
      title: "Workplace Safety & Compliance",
      description: "Comprehensive training on workplace safety regulations, hazard identification, and compliance requirements for various industries.",
      instructor: "Sarah Johnson",
      duration: "8 hours",
      level: "Beginner",
      category: "Compliance",
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.8,
      students: 1247,
      lessons: 24,
      image: "/images/workplace-safety.jpg",
      tags: ["OSHA", "Safety", "Compliance", "Workplace"],
      featured: true
    },
    {
      id: "2",
      title: "Effective Leadership & Management",
      description: "Develop essential leadership skills including communication, team building, conflict resolution, and strategic thinking.",
      instructor: "Michael Chen",
      duration: "12 hours",
      level: "Intermediate",
      category: "Leadership",
      price: 199.99,
      rating: 4.9,
      students: 892,
      lessons: 32,
      image: "/images/leadership.jpg",
      tags: ["Leadership", "Management", "Communication", "Team Building"]
    },
    {
      id: "3",
      title: "Data Privacy & GDPR Compliance",
      description: "Learn about data protection regulations, privacy best practices, and how to implement GDPR compliance in your organization.",
      instructor: "Emily Rodriguez",
      duration: "6 hours",
      level: "Intermediate",
      category: "Compliance",
      price: 179.99,
      rating: 4.7,
      students: 567,
      lessons: 18,
      image: "/images/data-privacy.jpg",
      tags: ["GDPR", "Data Privacy", "Compliance", "Security"]
    },
    {
      id: "4",
      title: "Project Management Fundamentals",
      description: "Master the basics of project management including planning, execution, monitoring, and successful project delivery.",
      instructor: "David Thompson",
      duration: "10 hours",
      level: "Beginner",
      category: "Technical Skills",
      price: 159.99,
      rating: 4.6,
      students: 743,
      lessons: 28,
      image: "/images/project-management.jpg",
      tags: ["Project Management", "Planning", "Execution", "Monitoring"]
    },
    {
      id: "5",
      title: "Customer Service Excellence",
      description: "Enhance customer service skills with proven techniques for handling difficult situations and building customer relationships.",
      instructor: "Lisa Wang",
      duration: "5 hours",
      level: "Beginner",
      category: "Soft Skills",
      price: 129.99,
      rating: 4.5,
      students: 1023,
      lessons: 20,
      image: "/images/customer-service.jpg",
      tags: ["Customer Service", "Communication", "Problem Solving", "Relationships"]
    },
    {
      id: "6",
      title: "Healthcare Compliance & HIPAA",
      description: "Comprehensive training on healthcare compliance, HIPAA regulations, patient privacy, and medical record management.",
      instructor: "Dr. Robert Martinez",
      duration: "7 hours",
      level: "Intermediate",
      category: "Industry Specific",
      price: 189.99,
      rating: 4.8,
      students: 456,
      lessons: 22,
      image: "/images/healthcare-compliance.jpg",
      tags: ["HIPAA", "Healthcare", "Compliance", "Patient Privacy"]
    }
  ];

  const filteredCourses = sampleCourses.filter(course => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center overflow-x-hidden">
      <NavMenu />
      <div className="h-16"></div> {/* Spacer for fixed navigation */}
      
      <Hero
        style="transparent"
        title="Professional Development Courses"
        subtitle="Advance your career with expert-led training"
      />

      <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter Section */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search courses, instructors, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Course Count */}
          <div className="mb-8">
            <p className="text-muted-foreground">
              Showing {filteredCourses.length} of {sampleCourses.length} courses
            </p>
          </div>

          {/* Courses Grid */}
          <div id="courses" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="h-full flex flex-col hover:shadow-lg transition-all duration-300 group">
                {/* Course Image */}
                <div className="relative">
                                  <div className="aspect-video overflow-hidden rounded-t-lg">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                  {course.featured && (
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                  <Badge className={`absolute top-3 right-3 ${getLevelColor(course.level)}`}>
                    {course.level}
                  </Badge>
                </div>

                <CardHeader className="pb-4">
                  <div className="space-y-2">
                    <Badge variant="outline" className="w-fit">
                      {course.category}
                    </Badge>
                    <CardTitle className="text-xl font-semibold text-foreground line-clamp-2">
                      {course.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      by {course.instructor}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <CardDescription className="text-base text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {course.description}
                  </CardDescription>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {course.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-4">
                  <div className="w-full space-y-3">
                    {/* Pricing */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-2xl font-bold text-foreground">
                          ${course.price}
                        </span>
                        {course.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">
                            ${course.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button className="flex-1" variant="default">
                        Add to Cart
                      </Button>
                      <Button className="flex-1" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or category filter
              </p>
              <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
