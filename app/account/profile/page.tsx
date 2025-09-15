"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Building2, 
  Users, 
  Phone, 
  Calendar,
  Edit,
  Shield,
  Save,
  X
} from "lucide-react";

interface UserProfile {
  id: number;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  role: string | null;
  organization: string | null;
  team: string | null;
  userId: string | null;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [noProfile, setNoProfile] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: ""
  });
  const [saving, setSaving] = useState(false);
  const [userMetadata, setUserMetadata] = useState({
    ip: "",
    location: "",
    timezone: "",
    userAgent: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const supabase = createClient();
        
        // Get current user
        const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();
        if (userError || !authUser) {
          throw new Error("User not authenticated");
        }

        setUser(authUser);

        // Fetch user profile
        const { data, error } = await supabase
          .from("profile")
          .select("*")
          .eq("userId", authUser.id)
          .single();

        if (error) {
          // If no profile found, set noProfile flag to show build profile message
          if (error.code === 'PGRST116') {
            setNoProfile(true);
          } else {
            throw error;
          }
        } else {
          setProfile(data);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchUserMetadata = async () => {
      try {
        // Get timezone
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Get user agent
        const userAgent = navigator.userAgent;
        
        // Try to get IP and location (this will work in some environments)
        let ip = "Unknown";
        let location = "Unknown";
        
        try {
          const ipResponse = await fetch('https://api.ipify.org?format=json');
          const ipData = await ipResponse.json();
          ip = ipData.ip || "Unknown";
          
          // Try to get location from IP
          try {
            const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
            const locationData = await locationResponse.json();
            if (locationData.city && locationData.region) {
              location = `${locationData.city}, ${locationData.region}, ${locationData.country_name}`;
            }
          } catch (locationError) {
            console.log("Could not fetch location:", locationError);
          }
        } catch (ipError) {
          console.log("Could not fetch IP:", ipError);
        }
        
        setUserMetadata({
          ip,
          location,
          timezone,
          userAgent: userAgent.substring(0, 100) + "..." // Truncate for display
        });
      } catch (error) {
        console.error("Error fetching user metadata:", error);
      }
    };

    fetchUserMetadata();
  }, []);

  const handleCreateProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from("profile")
        .insert({
          first_name: formData.first_name || null,
          last_name: formData.last_name || null,
          phone_number: formData.phone_number || null,
          role: null,
          organization: null,
          team: null,
          userId: user.id
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      setProfile(data);
      setNoProfile(false);
      setShowCreateForm(false);
      setFormData({
        first_name: "",
        last_name: "",
        phone_number: ""
      });
    } catch (err) {
      console.error("Error creating profile:", err);
      setError(err instanceof Error ? err.message : "Failed to create profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <Card>
          <CardContent className="p-6">
            <p className="text-red-600">Error loading profile: {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (noProfile && !showCreateForm) {
    console.log("Rendering noProfile section, showCreateForm:", showCreateForm);
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground">Complete your profile to get started</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <User size={48} className="text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Build Your Profile
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Complete your profile information to access all features and personalize your experience.
            </p>
            <div className="space-y-4">
              <button 
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 w-full sm:w-auto"
                onClick={() => {
                  console.log("Create Profile button clicked");
                  setShowCreateForm(true);
                }}
                type="button"
              >
                <Edit size={16} className="mr-2" />
                Create Profile
              </button>
              <p className="text-xs text-muted-foreground">
                This will help us customize your experience and connect you with the right team.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* User Metadata */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield size={20} />
              Session Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-muted-foreground">User ID:</span>
                  <p className="font-mono text-xs bg-accent/50 p-2 rounded mt-1 break-all">
                    {user?.id || "Loading..."}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">IP Address:</span>
                  <p className="font-mono text-xs bg-accent/50 p-2 rounded mt-1">
                    {userMetadata.ip}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-muted-foreground">Location:</span>
                  <p className="text-xs bg-accent/50 p-2 rounded mt-1">
                    {userMetadata.location}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Timezone:</span>
                  <p className="text-xs bg-accent/50 p-2 rounded mt-1">
                    {userMetadata.timezone}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <span className="font-medium text-muted-foreground">User Agent:</span>
              <p className="text-xs bg-accent/50 p-2 rounded mt-1 font-mono break-all">
                {userMetadata.userAgent}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showCreateForm) {
    console.log("Rendering showCreateForm section");
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create Profile</h1>
            <p className="text-muted-foreground">Fill in your information to get started</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowCreateForm(false)}
            className="flex items-center gap-2"
          >
            <X size={16} />
            Cancel
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={20} />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); handleCreateProfile(); }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  type="tel"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={saving} className="flex items-center gap-2">
                  <Save size={16} />
                  {saving ? "Creating..." : "Create Profile"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowCreateForm(false)}
                  disabled={saving}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };


  const getRoleBadgeColor = (roleName: string) => {
    switch (roleName) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "organization_admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "supervisor":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "case_worker":
        return "bg-green-100 text-green-800 border-green-200";
      case "trainer":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!profile) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">Loading profile...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">Manage your account information and preferences</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Edit size={16} />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={20} />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {profile?.first_name && profile?.last_name 
                    ? `${profile.first_name} ${profile.last_name}`
                    : user?.email || "User"
                  }
                </h3>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-3">
              {profile.phone_number && (
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-muted-foreground" />
                  <span className="text-sm">{profile.phone_number}</span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-muted-foreground" />
                <span className="text-sm">Member since: {formatDate(profile.created_at)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Organization & Role Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 size={20} />
              Organization & Role
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Organization */}
            {profile.organization && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Organization
                </h4>
                <div className="p-3 bg-accent/50 rounded-lg">
                  <h5 className="font-semibold">{profile.organization}</h5>
                </div>
              </div>
            )}

            {/* Team */}
            {profile.team && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Team
                </h4>
                <div className="p-3 bg-accent/50 rounded-lg">
                  <h5 className="font-semibold">{profile.team}</h5>
                </div>
              </div>
            )}

            {/* Role */}
            {profile.role && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Role
                </h4>
                <div className="p-3 bg-accent/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={16} className="text-muted-foreground" />
                    <Badge className={getRoleBadgeColor(profile.role)}>
                      {profile.role.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Account Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} />
            Account Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Kids Assigned</div>
            </div>
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Notes Created</div>
            </div>
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Training Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
