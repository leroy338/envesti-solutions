"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "../components/modal";
import { OrganizationEditForm } from "../components/organization-edit-form";
import { 
  Building2,
  Users,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  Shield,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  Edit
} from "lucide-react";

// Type for organization data from Supabase
type Organization = Tables<'organizations'>;

// Additional display data (non-database fields)
const displayData = {
  licenseNumber: "FC-2024-001",
  lastInspection: "2024-01-15",
  nextInspection: "2024-07-15"
};

const complianceMetrics = [
  {
    title: "Compliance Score",
    value: "98%",
    change: "+2%",
    description: "This quarter",
    icon: Shield,
    color: "text-green-600"
  },
  {
    title: "Active Cases",
    value: "24",
    change: "+3",
    description: "This month",
    icon: Users,
    color: "text-blue-600"
  },
  {
    title: "Team Members",
    value: "12",
    change: "+1",
    description: "This quarter",
    icon: Building2,
    color: "text-purple-600"
  },
  {
    title: "Training Hours",
    value: "1,247",
    change: "+156",
    description: "This year",
    icon: Award,
    color: "text-orange-600"
  }
];

const departments = [
  {
    name: "Case Management",
    head: "Emily Rodriguez",
    members: 5,
    description: "Direct case work and child placement services"
  },
  {
    name: "Compliance & Training",
    head: "David Thompson",
    members: 3,
    description: "Ensuring regulatory compliance and staff training"
  },
  {
    name: "Administration",
    head: "Sarah Davis",
    members: 2,
    description: "Administrative support and documentation"
  },
  {
    name: "Supervision",
    head: "Michael Brown",
    members: 2,
    description: "Team supervision and quality assurance"
  }
];

const recentActivities = [
  {
    id: 1,
    action: "Compliance inspection completed",
    date: "2024-01-15",
    status: "completed",
    details: "Annual state inspection passed with 98% score"
  },
  {
    id: 2,
    action: "New team member onboarded",
    date: "2024-01-10",
    status: "completed",
    details: "Sarah Johnson joined Case Management team"
  },
  {
    id: 3,
    action: "Training program updated",
    date: "2024-01-08",
    status: "completed",
    details: "Child safety protocols training refreshed"
  },
  {
    id: 4,
    action: "License renewal submitted",
    date: "2024-01-05",
    status: "pending",
    details: "Annual license renewal application submitted"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "overdue":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle size={16} className="text-green-600" />;
    case "pending":
      return <Clock size={16} className="text-yellow-600" />;
    case "overdue":
      return <FileText size={16} className="text-red-600" />;
    default:
      return <Clock size={16} className="text-gray-600" />;
  }
};

export default function OrganizationsPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [organizationData, setOrganizationData] = useState<Organization | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch organization data
  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const supabase = createClient();
        
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          setError("User not authenticated");
          return;
        }

        // Get user's profile to find organization_id and role
        const { data: profile, error: profileError } = await supabase
          .from("profile")
          .select("organization_id, role")
          .eq("userId", user.id)
          .single();

        if (profileError) {
          setError("Failed to fetch user profile");
          return;
        }

        setUserRole(profile?.role || null);

        // If user has an organization, fetch it
        if (profile?.organization_id) {
          const { data: organization, error: orgError } = await supabase
            .from("organizations")
            .select("*")
            .eq("id", profile.organization_id)
            .single();

          if (orgError) {
            setError("Failed to fetch organization data");
            return;
          }

          setOrganizationData(organization);
        } else if (profile?.role !== "Super Admin") {
          setError("User is not associated with any organization");
          return;
        }
      } catch (err) {
        console.error("Error fetching organization:", err);
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganization();
  }, []);

  const handleEditOrganization = () => {
    setIsEditModalOpen(true);
  };

  const handleCreateOrganization = () => {
    setIsCreateModalOpen(true);
  };

  const handleSaveOrganization = async (data: Organization) => {
    if (!organizationData) return;
    
    setIsSaving(true);
    try {
      const supabase = createClient();
      
      const { error } = await supabase
        .from("organizations")
        .update({
          name: data.name,
          description: data.description,
          industry: data.industry,
          website: data.website,
          phone_number: data.phone_number,
          email: data.email,
          address_line1: data.address_line1,
          address_line2: data.address_line2,
          city: data.city,
          state_province: data.state_province,
          postal_code: data.postal_code,
          country: data.country,
          founded_date: data.founded_date,
          number_of_employees: data.number_of_employees,
          updated_at: new Date().toISOString()
        })
        .eq("id", organizationData.id);

      if (error) {
        throw error;
      }

      // Update local state
      setOrganizationData({ ...organizationData, ...data });
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error saving organization:", error);
      setError("Failed to save organization changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateNewOrganization = async (data: Organization) => {
    setIsSaving(true);
    try {
      const supabase = createClient();
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error("User not authenticated");
      }

      // Create organization with only the fields that have values
      const organizationData = {
        name: data.name,
        description: data.description || null,
        industry: data.industry || null,
        website: data.website || null,
        phone_number: data.phone_number || null,
        email: data.email || null,
        address_line1: data.address_line1 || null,
        address_line2: data.address_line2 || null,
        city: data.city || null,
        state_province: data.state_province || null,
        postal_code: data.postal_code || null,
        country: data.country || null,
        founded_date: data.founded_date || null,
        number_of_employees: data.number_of_employees || null,
        status: "active"
      };

      const { data: newOrganization, error: createError } = await supabase
        .from("organizations")
        .insert(organizationData)
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      // Update user's profile to associate with the new organization
      const { error: updateProfileError } = await supabase
        .from("profile")
        .update({ organization_id: newOrganization.id })
        .eq("userId", user.id);

      if (updateProfileError) {
        throw updateProfileError;
      }

      // Update local state
      setOrganizationData(newOrganization);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating organization:", error);
      setError("Failed to create organization");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleCancelCreate = () => {
    setIsCreateModalOpen(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Organization</h1>
            <p className="text-muted-foreground">Loading organization data...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-0 pb-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Organization</h1>
            <p className="text-muted-foreground">Error loading organization data</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-red-500 mb-4">
                <Shield size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Unable to Load Organization</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // No organization state
  if (!organizationData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Organization</h1>
            <p className="text-muted-foreground">
              {userRole === "Super Admin" 
                ? "Create or manage your organization" 
                : "No organization found"
              }
            </p>
          </div>
          {userRole === "Super Admin" && (
            <Button onClick={handleCreateOrganization}>
              <Building2 size={16} className="mr-2" />
              Create Organization
            </Button>
          )}
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-muted-foreground mb-4">
                <Building2 size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {userRole === "Super Admin" 
                  ? "Ready to Create Your Organization?" 
                  : "No Organization Associated"
                }
              </h3>
              <p className="text-muted-foreground mb-4">
                {userRole === "Super Admin" 
                  ? "As a Super Admin, you can create a new organization to get started with managing your team and compliance requirements."
                  : "You are not currently associated with any organization."
                }
              </p>
              {userRole === "Super Admin" && (
                <Button onClick={handleCreateOrganization} size="lg">
                  <Building2 size={20} className="mr-2" />
                  Create Organization
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Create Organization Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={handleCancelCreate}
          title="Create Organization"
          size="xl"
        >
          <OrganizationEditForm
            initialData={{
              id: "",
              name: "",
              description: "",
              industry: "",
              website: "",
              phone_number: "",
              email: "",
              address_line1: "",
              address_line2: "",
              city: "",
              state_province: "",
              postal_code: "",
              country: "",
              founded_date: "",
              number_of_employees: 0,
              status: "active",
              created_at: "",
              updated_at: ""
            }}
            onSave={handleCreateNewOrganization}
            onCancel={handleCancelCreate}
            isLoading={isSaving}
            isCreateMode={true}
          />
        </Modal>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Organization</h1>
          <p className="text-muted-foreground">Manage your organization settings and view key metrics</p>
        </div>
        <div className="flex items-center gap-3">
          {userRole === "Super Admin" && (
            <Button variant="outline" onClick={handleCreateOrganization}>
              <Building2 size={16} className="mr-2" />
              Create New Organization
            </Button>
          )}
          <Button variant="outline">
            <FileText size={16} className="mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Organization Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 size={32} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900">{organizationData.name}</h2>
                <p className="text-blue-700 mt-1">{organizationData.description || "No description available"}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-blue-600">
                  <div className="flex items-center gap-1">
                    <Award size={16} />
                    <span>License: {displayData.licenseNumber}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{organizationData.state_province || "Not specified"}</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {organizationData.status || "Active"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {complianceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600">{metric.change}</span> {metric.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Organization Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Building2 size={20} />
                Organization Details
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleEditOrganization}
                className="flex items-center gap-2"
              >
                <Edit size={16} />
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-muted-foreground" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">
                    {organizationData.address_line1 ? (
                      <>
                        {organizationData.address_line1}
                        {organizationData.address_line2 && `, ${organizationData.address_line2}`}
                        {organizationData.city && `, ${organizationData.city}`}
                        {organizationData.state_province && `, ${organizationData.state_province}`}
                        {organizationData.postal_code && ` ${organizationData.postal_code}`}
                      </>
                    ) : (
                      "No address provided"
                    )}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-muted-foreground" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{organizationData.phone_number || "No phone number"}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-muted-foreground" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{organizationData.email || "No email address"}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-muted-foreground" />
                <div>
                  <p className="font-medium">Founded</p>
                  <p className="text-sm text-muted-foreground">
                    {organizationData.founded_date ? new Date(organizationData.founded_date).getFullYear() : "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-3">Compliance Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Inspection:</span>
                  <span className="font-medium">{displayData.lastInspection}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Inspection:</span>
                  <span className="font-medium">{displayData.nextInspection}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">License Status:</span>
                  <Badge className="bg-green-100 text-green-800">Valid</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Departments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} />
              Departments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departments.map((dept, index) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{dept.name}</h4>
                    <Badge variant="outline">{dept.members} members</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{dept.description}</p>
                  <p className="text-xs text-muted-foreground">Head: {dept.head}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp size={20} />
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                <div className="flex-shrink-0">
                  {getStatusIcon(activity.status)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{activity.action}</h4>
                  <p className="text-sm text-muted-foreground">{activity.details}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{activity.date}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Organization Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCancelEdit}
        title="Edit Organization"
        size="xl"
      >
        <OrganizationEditForm
          initialData={organizationData}
          onSave={handleSaveOrganization}
          onCancel={handleCancelEdit}
          isLoading={isSaving}
        />
      </Modal>

      {/* Create Organization Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={handleCancelCreate}
        title="Create Organization"
        size="xl"
      >
        <OrganizationEditForm
          initialData={{
            id: "",
            name: "",
            description: "",
            industry: "",
            website: "",
            phone_number: "",
            email: "",
            address_line1: "",
            address_line2: "",
            city: "",
            state_province: "",
            postal_code: "",
            country: "",
            founded_date: "",
            number_of_employees: 0,
            status: "active",
            created_at: "",
            updated_at: ""
          }}
          onSave={handleCreateNewOrganization}
          onCancel={handleCancelCreate}
          isLoading={isSaving}
          isCreateMode={true}
        />
      </Modal>
    </div>
  );
}
