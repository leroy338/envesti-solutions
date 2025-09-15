"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  MousePointer, 
  TrendingUp,
  Plus,
  Mail,
  Phone,
  Building2,
  User
} from "lucide-react";

// Mock KPI data
const kpiData = [
  {
    title: "Upcoming Cases",
    value: "3",
    icon: Plus,
    description: "This month"
  },
  {
    title: "Assigned Cases",
    value: "8",
    icon: MousePointer,
    description: "Website"
  },
  {
    title: "Overdue Notes",
    value: "3",
    icon: TrendingUp,
    description: "Total value"
  }
];

// Mock leads data
const mockLeads = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    phone: "(555) 123-4567",
    age: 14,
    caseNumber: "FC-2024-001",
    status: "Active"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "mchen@innovateinc.com",
    phone: "(555) 234-5678",
    age: 16,
    caseNumber: "FC-2024-002",
    status: "Active"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@startupco.com",
    phone: "(555) 345-6789",
    age: 12,
    caseNumber: "FC-2024-003",
    status: "Active"
  },
  {
    id: 4,
    name: "David Thompson",
    email: "dthompson@enterprise.com",
    phone: "(555) 456-7890",
    age: 15,
    caseNumber: "FC-2024-004",
    status: "Active"
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lwang@growthtech.com",
    phone: "(555) 567-8901",
    age: 13,
    caseNumber: "FC-2024-005",
    status: "Active"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800";
    case "Active":
      return "bg-yellow-100 text-yellow-800";
    case "Review":
      return "bg-purple-100 text-purple-800";
    case "Active":
      return "bg-green-100 text-green-800";
    case "New":
      return "bg-blue-100 text-blue-800";
    case "Review":
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cases</h1>
          <p className="text-muted-foreground">Manage and track your potential customers</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
          <Plus size={16} />
          Add Case
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {kpi.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} />
            Recent Cases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Case Number</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Phone</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Age</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User size={16} className="text-primary" />
                        </div>
                        <span className="font-medium">{lead.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-muted-foreground" />
                        {lead.email}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-muted-foreground" />
                        {lead.phone}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Building2 size={14} className="text-muted-foreground" />
                        {lead.caseNumber}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-xs">
                        {lead.caseNumber}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`text-xs ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
