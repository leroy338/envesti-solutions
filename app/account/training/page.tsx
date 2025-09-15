"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap,
  BookOpen,
  Clock,
  CheckCircle,
  AlertTriangle,
  Award,
  Play,
  Download,
  Calendar,
  Target,
  TrendingUp,
  Plus,
  Filter,
  Search
} from "lucide-react";

// Mock training data
const trainingCourses = [
  {
    id: 1,
    title: "Child Safety Protocols",
    description: "Comprehensive training on child safety procedures and emergency response protocols.",
    duration: "4 hours",
    type: "Required",
    status: "Available",
    progress: 0,
    dueDate: "2024-02-15",
    assignedBy: "Lisa Wang",
    category: "Safety",
    difficulty: "Intermediate"
  },
  {
    id: 2,
    title: "Documentation Standards",
    description: "Learn proper documentation practices for case files and compliance reporting.",
    duration: "2 hours",
    type: "Required",
    status: "In Progress",
    progress: 65,
    dueDate: "2024-02-20",
    assignedBy: "Michael Brown",
    category: "Compliance",
    difficulty: "Beginner"
  },
  {
    id: 3,
    title: "Crisis Intervention",
    description: "Advanced techniques for handling crisis situations and de-escalation strategies.",
    duration: "6 hours",
    type: "Elective",
    status: "Completed",
    progress: 100,
    dueDate: "2024-01-30",
    assignedBy: "Emily Rodriguez",
    category: "Skills",
    difficulty: "Advanced"
  },
  {
    id: 4,
    title: "Cultural Sensitivity Training",
    description: "Understanding diverse backgrounds and cultural considerations in foster care.",
    duration: "3 hours",
    type: "Required",
    status: "Overdue",
    progress: 25,
    dueDate: "2024-01-25",
    assignedBy: "Sarah Davis",
    category: "Cultural",
    difficulty: "Beginner"
  },
  {
    id: 5,
    title: "Legal Requirements",
    description: "Overview of state and federal legal requirements for foster care agencies.",
    duration: "5 hours",
    type: "Required",
    status: "Available",
    progress: 0,
    dueDate: "2024-03-01",
    assignedBy: "Lisa Wang",
    category: "Legal",
    difficulty: "Intermediate"
  },
  {
    id: 6,
    title: "Trauma-Informed Care",
    description: "Understanding trauma and implementing trauma-informed care practices.",
    duration: "4 hours",
    type: "Elective",
    status: "Completed",
    progress: 100,
    dueDate: "2024-01-15",
    assignedBy: "David Thompson",
    category: "Care",
    difficulty: "Intermediate"
  }
];

const trainingStats = [
  {
    title: "Total Courses",
    value: "24",
    change: "+3",
    description: "This quarter",
    icon: BookOpen,
    color: "text-blue-600"
  },
  {
    title: "Completed",
    value: "18",
    change: "+5",
    description: "This month",
    icon: CheckCircle,
    color: "text-green-600"
  },
  {
    title: "In Progress",
    value: "4",
    change: "+1",
    description: "Currently",
    icon: Clock,
    color: "text-orange-600"
  },
  {
    title: "Overdue",
    value: "2",
    change: "-1",
    description: "This week",
    icon: AlertTriangle,
    color: "text-red-600"
  }
];

const recentCompletions = [
  {
    id: 1,
    course: "Trauma-Informed Care",
    user: "Emily Rodriguez",
    completedDate: "2024-01-15",
    score: 95
  },
  {
    id: 2,
    course: "Crisis Intervention",
    user: "David Thompson",
    completedDate: "2024-01-14",
    score: 88
  },
  {
    id: 3,
    course: "Documentation Standards",
    user: "Sarah Davis",
    completedDate: "2024-01-12",
    score: 92
  }
];

const upcomingDeadlines = [
  {
    id: 1,
    course: "Child Safety Protocols",
    dueDate: "2024-02-15",
    daysLeft: 5,
    assignedTo: "All Staff"
  },
  {
    id: 2,
    course: "Documentation Standards",
    dueDate: "2024-02-20",
    daysLeft: 10,
    assignedTo: "Case Workers"
  },
  {
    id: 3,
    course: "Legal Requirements",
    dueDate: "2024-03-01",
    daysLeft: 20,
    assignedTo: "All Staff"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800";
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Available":
      return "bg-gray-100 text-gray-800";
    case "Overdue":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "Required":
      return "bg-red-100 text-red-800";
    case "Elective":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800";
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800";
    case "Advanced":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function TrainingPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Training</h1>
          <p className="text-muted-foreground">Manage training courses, track progress, and ensure compliance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus size={16} className="mr-2" />
            Create Course
          </Button>
        </div>
      </div>

      {/* Training Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trainingStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600">{stat.change}</span> {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Filter size={16} className="mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Training Courses */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap size={20} />
              Training Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trainingCourses.map((course) => (
                <div key={course.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{course.title}</h4>
                        <Badge className={getTypeColor(course.type)}>
                          {course.type}
                        </Badge>
                        <Badge variant="outline" className={getDifficultyColor(course.difficulty)}>
                          {course.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Target size={12} />
                          {course.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          Due: {course.dueDate}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(course.status)}>
                        {course.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Play size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  {course.status === "In Progress" && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Assigned by: {course.assignedBy}</span>
                    {course.status === "Available" && (
                      <Button size="sm" variant="outline">
                        Start Course
                      </Button>
                    )}
                    {course.status === "In Progress" && (
                      <Button size="sm">
                        Continue
                      </Button>
                    )}
                    {course.status === "Completed" && (
                      <Button size="sm" variant="outline">
                        View Certificate
                      </Button>
                    )}
                    {course.status === "Overdue" && (
                      <Button size="sm" variant="destructive">
                        Complete Now
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Completions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award size={20} />
                Recent Completions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentCompletions.map((completion) => (
                  <div key={completion.id} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-sm">{completion.course}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {completion.user} • {completion.completedDate}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-green-600">Score: {completion.score}%</span>
                      <CheckCircle size={16} className="text-green-600" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar size={20} />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="p-3 border border-border rounded-lg">
                    <h4 className="font-semibold text-sm">{deadline.course}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Due: {deadline.dueDate}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Assigned to: {deadline.assignedTo}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-orange-600">
                        {deadline.daysLeft} days left
                      </span>
                      <AlertTriangle size={16} className="text-orange-600" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Training Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp size={20} />
            Training Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course Categories */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Course Categories
              </h4>
              <div className="space-y-2">
                {["Safety", "Compliance", "Skills", "Cultural", "Legal", "Care"].map((category) => (
                  <div key={category} className="flex items-center justify-between text-sm">
                    <span>{category}</span>
                    <Badge variant="outline">
                      {Math.floor(Math.random() * 5) + 1} courses
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Completion Rates */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Completion Rates
              </h4>
              <div className="space-y-2">
                {["Required Courses", "Elective Courses", "Safety Training", "Compliance Training"].map((type) => (
                  <div key={type} className="flex items-center justify-between text-sm">
                    <span>{type}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {Math.floor(Math.random() * 40) + 60}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
