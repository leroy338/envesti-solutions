"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Building2, 
  Users, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Department {
  id: string;
  name: string;
  description: string;
  head_of_department: string;
  employee_count: number;
  budget: number;
  created_at: string;
  updated_at: string;
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>([]);

  // Mock data for now - replace with actual Supabase query
  const mockDepartments: Department[] = useMemo(() => [
    {
      id: "1",
      name: "Human Resources",
      description: "Manages recruitment, employee relations, and organizational development",
      head_of_department: "Sarah Johnson",
      employee_count: 12,
      budget: 850000,
      created_at: "2024-01-15T10:00:00Z",
      updated_at: "2024-01-15T10:00:00Z"
    },
    {
      id: "2", 
      name: "Engineering",
      description: "Software development, technical architecture, and product innovation",
      head_of_department: "Michael Chen",
      employee_count: 45,
      budget: 2500000,
      created_at: "2024-01-10T09:00:00Z",
      updated_at: "2024-01-20T14:30:00Z"
    },
    {
      id: "3",
      name: "Marketing",
      description: "Brand management, digital marketing, and customer acquisition",
      head_of_department: "Emily Rodriguez",
      employee_count: 18,
      budget: 1200000,
      created_at: "2024-01-12T11:00:00Z",
      updated_at: "2024-01-18T16:45:00Z"
    },
    {
      id: "4",
      name: "Finance",
      description: "Financial planning, accounting, and budget management",
      head_of_department: "David Thompson",
      employee_count: 8,
      budget: 600000,
      created_at: "2024-01-08T08:00:00Z",
      updated_at: "2024-01-22T12:15:00Z"
    },
    {
      id: "5",
      name: "Sales",
      description: "Customer acquisition, relationship management, and revenue growth",
      head_of_department: "Lisa Wang",
      employee_count: 25,
      budget: 1800000,
      created_at: "2024-01-05T07:30:00Z",
      updated_at: "2024-01-25T09:20:00Z"
    },
    {
      id: "6",
      name: "Operations",
      description: "Process optimization, quality assurance, and operational efficiency",
      head_of_department: "Robert Kim",
      employee_count: 15,
      budget: 950000,
      created_at: "2024-01-20T13:00:00Z",
      updated_at: "2024-01-28T11:30:00Z"
    }
  ], []);

  useEffect(() => {
    // Simulate loading
    const loadDepartments = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDepartments(mockDepartments);
      setFilteredDepartments(mockDepartments);
      setIsLoading(false);
    };

    loadDepartments();
  }, [mockDepartments]);

  useEffect(() => {
    const filtered = departments.filter(dept =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head_of_department.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDepartments(filtered);
  }, [searchTerm, departments]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Departments</h1>
            <p className="text-muted-foreground">Manage your organization&apos;s departments</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                  <div className="h-8 bg-muted rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Departments</h1>
            <p className="text-muted-foreground">Manage your organization&apos;s departments</p>
        </div>
        
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Department
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Button variant="outline" className="w-full sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Total Departments</p>
                <p className="text-2xl font-bold">{departments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Total Employees</p>
                <p className="text-2xl font-bold">
                  {departments.reduce((sum, dept) => sum + dept.employee_count, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Total Budget</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(departments.reduce((sum, dept) => sum + dept.budget, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Departments Grid */}
      {filteredDepartments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No departments found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm ? "No departments match your search criteria." : "Get started by creating your first department."}
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Department
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((department) => (
            <Card key={department.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{department.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {department.description}
                    </CardDescription>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Department
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Department
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Department Head */}
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Head of Department</p>
                    <p className="text-sm text-muted-foreground">{department.head_of_department}</p>
                  </div>
                </div>

                {/* Employee Count */}
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Employees</p>
                    <p className="text-sm text-muted-foreground">{department.employee_count} members</p>
                  </div>
                </div>

                {/* Budget */}
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Annual Budget</p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(department.budget)}</p>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Last updated: {formatDate(department.updated_at)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
