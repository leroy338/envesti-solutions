"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Search, 
  Plus, 
  Phone, 
  Building2,
  User,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Grid3X3,
  List
} from "lucide-react";

interface Person {
  id: number;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  role: string | null;
  organization: string | null;
  team: string | null;
  created_at: string;
  userId: string | null;
}

export default function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const supabase = createClient();
        
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          throw new Error("User not authenticated");
        }

        // Fetch all people in the organization
        const { data, error } = await supabase
          .from("profile")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setPeople(data || []);
      } catch (err) {
        console.error("Error fetching people:", err);
        setError(err instanceof Error ? err.message : "Failed to load people");
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const filteredPeople = people.filter(person => {
    const matchesSearch = !searchTerm || 
      `${person.first_name || ''} ${person.last_name || ''}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.phone_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.role?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === "all" || person.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role: string | null) => {
    if (!role) return "bg-gray-100 text-gray-800 border-gray-200";
    
    switch (role.toLowerCase()) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">People</h1>
        <Card>
          <CardContent className="p-6">
            <p className="text-red-600">Error loading people: {error}</p>
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
          <h1 className="text-3xl font-bold text-foreground">People</h1>
          <p className="text-muted-foreground">Manage organization members and their roles</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center border border-input rounded-md">
            <Button
              variant={viewMode === "cards" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("cards")}
              className="rounded-r-none border-r border-input"
            >
              <Grid3X3 size={16} />
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="rounded-l-none"
            >
              <List size={16} />
            </Button>
          </div>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            Add Person
          </Button>
        </div>
      </div>

      {/* Organization Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} />
            Organization Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{people.length}</div>
              <div className="text-sm text-muted-foreground">Total People</div>
            </div>
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {people.filter(p => p.role === 'case_worker').length}
              </div>
              <div className="text-sm text-muted-foreground">Case Workers</div>
            </div>
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {people.filter(p => p.role === 'supervisor').length}
              </div>
              <div className="text-sm text-muted-foreground">Supervisors</div>
            </div>
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {people.filter(p => p.role === 'admin').length}
              </div>
              <div className="text-sm text-muted-foreground">Admins</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search people by name, phone, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background text-sm"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="organization_admin">Organization Admin</option>
                <option value="supervisor">Supervisor</option>
                <option value="case_worker">Case Worker</option>
                <option value="trainer">Trainer</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* People Display */}
      {filteredPeople.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Users size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No people found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterRole !== "all" 
                ? "Try adjusting your search or filter criteria."
                : "Get started by adding people to your organization."
              }
            </p>
            <Button>
              <Plus size={16} className="mr-2" />
              Add First Person
            </Button>
          </CardContent>
        </Card>
      ) : viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPeople.map((person) => (
            <Card key={person.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {person.first_name && person.last_name 
                          ? `${person.first_name} ${person.last_name}`
                          : "Unnamed User"
                        }
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Added {formatDate(person.created_at)}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {person.phone_number && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={14} className="text-muted-foreground" />
                    <span>{person.phone_number}</span>
                  </div>
                )}
                
                {person.role && (
                  <div className="flex items-center gap-2">
                    <Badge className={getRoleBadgeColor(person.role)}>
                      {person.role.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                )}

                {person.organization && (
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 size={14} className="text-muted-foreground" />
                    <span className="truncate">{person.organization}</span>
                  </div>
                )}

                {person.team && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users size={14} className="text-muted-foreground" />
                    <span className="truncate">{person.team}</span>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit size={14} className="mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Trash2 size={14} className="mr-1" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr className="text-left">
                    <th className="px-6 py-4 font-medium text-muted-foreground">Name</th>
                    <th className="px-6 py-4 font-medium text-muted-foreground">Role</th>
                    <th className="px-6 py-4 font-medium text-muted-foreground">Phone</th>
                    <th className="px-6 py-4 font-medium text-muted-foreground">Organization</th>
                    <th className="px-6 py-4 font-medium text-muted-foreground">Team</th>
                    <th className="px-6 py-4 font-medium text-muted-foreground">Added</th>
                    <th className="px-6 py-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPeople.map((person) => (
                    <tr key={person.id} className="border-b border-border hover:bg-accent/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <User size={16} className="text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {person.first_name && person.last_name 
                                ? `${person.first_name} ${person.last_name}`
                                : "Unnamed User"
                              }
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {person.role ? (
                          <Badge className={getRoleBadgeColor(person.role)}>
                            {person.role.replace("_", " ").toUpperCase()}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {person.phone_number ? (
                          <div className="flex items-center gap-2">
                            <Phone size={14} className="text-muted-foreground" />
                            <span>{person.phone_number}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {person.organization ? (
                          <div className="flex items-center gap-2">
                            <Building2 size={14} className="text-muted-foreground" />
                            <span className="truncate max-w-[200px]">{person.organization}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {person.team ? (
                          <div className="flex items-center gap-2">
                            <Users size={14} className="text-muted-foreground" />
                            <span className="truncate max-w-[150px]">{person.team}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {formatDate(person.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit size={14} className="mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 size={14} className="mr-1" />
                            Remove
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
