"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  Baby,
  AlertTriangle,
  FileText,
  Users,
  Building2,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Eye
} from "lucide-react";

// Mock data
const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const kidsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    caseNumber: "FC-2024-001",
    age: 14,
    status: "Active",
    lastNote: "2 days ago",
    caseWorker: "Emily Rodriguez"
  },
  {
    id: 2,
    name: "Michael Chen",
    caseNumber: "FC-2024-002",
    age: 16,
    status: "Active",
    lastNote: "1 day ago",
    caseWorker: "David Thompson"
  },
  {
    id: 3,
    name: "Lisa Wang",
    caseNumber: "FC-2024-003",
    age: 12,
    status: "Review",
    lastNote: "5 days ago",
    caseWorker: "Emily Rodriguez"
  },
  {
    id: 4,
    name: "James Wilson",
    caseNumber: "FC-2024-004",
    age: 15,
    status: "Active",
    lastNote: "3 days ago",
    caseWorker: "Sarah Davis"
  }
];

const overdueTraining = [
  {
    id: 1,
    title: "Child Safety Protocols",
    dueDate: "3 days ago",
    assignedTo: "Emily Rodriguez"
  },
  {
    id: 2,
    title: "Documentation Standards",
    dueDate: "1 week ago",
    assignedTo: "David Thompson"
  },
  {
    id: 3,
    title: "Crisis Intervention",
    dueDate: "2 weeks ago",
    assignedTo: "Sarah Davis"
  }
];

const pastDueNotes = [
  {
    id: 1,
    kidName: "Sarah Johnson",
    noteTitle: "Monthly Review",
    dueDate: "2 days ago",
    caseWorker: "Emily Rodriguez"
  },
  {
    id: 2,
    kidName: "Michael Chen",
    noteTitle: "Behavioral Assessment",
    dueDate: "1 week ago",
    caseWorker: "David Thompson"
  }
];

const teamMembers = [
  {
    id: 1,
    name: "Emily Rodriguez",
    role: "Senior Case Worker",
    status: "Online",
    kidsCount: 8
  },
  {
    id: 2,
    name: "David Thompson",
    role: "Case Worker",
    status: "Online",
    kidsCount: 6
  },
  {
    id: 3,
    name: "Sarah Davis",
    role: "Case Worker",
    status: "Away",
    kidsCount: 5
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "Supervisor",
    status: "Online",
    kidsCount: 0
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800";
    case "Review":
      return "bg-yellow-100 text-yellow-800";
    case "Online":
      return "bg-green-100 text-green-800";
    case "Away":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Online":
      return <CheckCircle size={12} className="text-green-600" />;
    case "Away":
      return <Clock size={12} className="text-yellow-600" />;
    default:
      return <XCircle size={12} className="text-gray-600" />;
  }
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Plus size={16} className="mr-2" />
            Add Kid
          </Button>
          <Button size="sm">
            <Eye size={16} className="mr-2" />
            View All
          </Button>
        </div>
      </div>

      {/* Today's Date Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Calendar size={24} className="text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Today is {today}</h3>
              <p className="text-blue-700">You have 4 active cases and 3 overdue training items</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kids List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Baby size={20} />
              Active Kids
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {kidsData.map((kid) => (
                <div key={kid.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Baby size={18} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{kid.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {kid.caseNumber} • Age {kid.age} • {kid.caseWorker}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(kid.status)}>
                      {kid.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Last note: {kid.lastNote}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Overdue Training */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle size={20} />
                Overdue Training
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {overdueTraining.map((training) => (
                  <div key={training.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-semibold text-sm">{training.title}</h4>
                    <p className="text-xs text-red-600 mt-1">
                      Due: {training.dueDate}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Assigned to: {training.assignedTo}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Past Due Notes */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <FileText size={20} />
                Past Due Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pastDueNotes.map((note) => (
                  <div key={note.id} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <h4 className="font-semibold text-sm">{note.noteTitle}</h4>
                    <p className="text-xs text-orange-600 mt-1">
                      Kid: {note.kidName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Due: {note.dueDate} • {note.caseWorker}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                      <Users size={18} className="text-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {getStatusIcon(member.status)}
                      <span className="text-xs text-muted-foreground">{member.status}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {member.kidsCount} kids
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Organization Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 size={20} />
              Organization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-accent/50 rounded-lg">
              <h3 className="font-semibold text-lg">Envesti Solutions</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Foster Care Compliance Management
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">License:</span>
                  <span className="font-medium">FC-2024-001</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">State:</span>
                  <span className="font-medium">California</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Cases:</span>
                  <span className="font-medium">4</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Team Members:</span>
                  <span className="font-medium">4</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
