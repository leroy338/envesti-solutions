"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users,
  UserPlus,
  Mail,
  Phone,
  Award,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Baby,
  FileText,
  TrendingUp,
  MoreHorizontal
} from "lucide-react";

// Mock team data
const teamMembers = [
  {
    id: 1,
    name: "Emily Rodriguez",
    role: "Senior Case Worker",
    department: "Case Management",
    email: "emily.rodriguez@envesti.com",
    phone: "(555) 123-4567",
    hireDate: "2020-03-15",
    status: "Online",
    kidsCount: 8,
    completedTraining: 12,
    pendingTraining: 1,
    lastActivity: "2 hours ago",
    avatar: "ER",
    isSupervisor: true
  },
  {
    id: 2,
    name: "David Thompson",
    role: "Case Worker",
    department: "Case Management",
    email: "david.thompson@envesti.com",
    phone: "(555) 234-5678",
    hireDate: "2021-06-20",
    status: "Online",
    kidsCount: 6,
    completedTraining: 10,
    pendingTraining: 2,
    lastActivity: "1 hour ago",
    avatar: "DT",
    isSupervisor: false
  },
  {
    id: 3,
    name: "Sarah Davis",
    role: "Case Worker",
    department: "Case Management",
    email: "sarah.davis@envesti.com",
    phone: "(555) 345-6789",
    hireDate: "2021-09-10",
    status: "Away",
    kidsCount: 5,
    completedTraining: 8,
    pendingTraining: 3,
    lastActivity: "4 hours ago",
    avatar: "SD",
    isSupervisor: false
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "Supervisor",
    department: "Supervision",
    email: "michael.brown@envesti.com",
    phone: "(555) 456-7890",
    hireDate: "2019-11-05",
    status: "Online",
    kidsCount: 0,
    completedTraining: 15,
    pendingTraining: 0,
    lastActivity: "30 minutes ago",
    avatar: "MB",
    isSupervisor: true
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Training Coordinator",
    department: "Compliance & Training",
    email: "lisa.wang@envesti.com",
    phone: "(555) 567-8901",
    hireDate: "2022-01-15",
    status: "Online",
    kidsCount: 0,
    completedTraining: 18,
    pendingTraining: 0,
    lastActivity: "1 hour ago",
    avatar: "LW",
    isSupervisor: false
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Administrative Assistant",
    department: "Administration",
    email: "james.wilson@envesti.com",
    phone: "(555) 678-9012",
    hireDate: "2022-04-01",
    status: "Offline",
    kidsCount: 0,
    completedTraining: 6,
    pendingTraining: 4,
    lastActivity: "1 day ago",
    avatar: "JW",
    isSupervisor: false
  }
];

const teamStats = [
  {
    title: "Total Team Members",
    value: "6",
    change: "+1",
    description: "This quarter",
    icon: Users,
    color: "text-blue-600"
  },
  {
    title: "Active Cases",
    value: "19",
    change: "+3",
    description: "This month",
    icon: Baby,
    color: "text-green-600"
  },
  {
    title: "Training Completion",
    value: "87%",
    change: "+5%",
    description: "This quarter",
    icon: Award,
    color: "text-purple-600"
  },
  {
    title: "Online Members",
    value: "4",
    change: "+1",
    description: "Currently",
    icon: CheckCircle,
    color: "text-orange-600"
  }
];

const recentActivities = [
  {
    id: 1,
    action: "Sarah Davis completed Child Safety Training",
    time: "2 hours ago",
    type: "training"
  },
  {
    id: 2,
    action: "New case assigned to Emily Rodriguez",
    time: "4 hours ago",
    type: "case"
  },
  {
    id: 3,
    action: "David Thompson submitted monthly report",
    time: "6 hours ago",
    type: "report"
  },
  {
    id: 4,
    action: "Michael Brown conducted team meeting",
    time: "1 day ago",
    type: "meeting"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Online":
      return "bg-green-100 text-green-800";
    case "Away":
      return "bg-yellow-100 text-yellow-800";
    case "Offline":
      return "bg-gray-100 text-gray-800";
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
    case "Offline":
      return <AlertTriangle size={12} className="text-gray-600" />;
    default:
      return <Clock size={12} className="text-gray-600" />;
  }
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case "training":
      return <Award size={16} className="text-purple-600" />;
    case "case":
      return <Baby size={16} className="text-blue-600" />;
    case "report":
      return <FileText size={16} className="text-green-600" />;
    case "meeting":
      return <Users size={16} className="text-orange-600" />;
    default:
      return <Clock size={16} className="text-gray-600" />;
  }
};

export default function TeamPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team</h1>
          <p className="text-muted-foreground">Manage your team members and track their performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FileText size={16} className="mr-2" />
            Export Report
          </Button>
          <Button>
            <UserPlus size={16} className="mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamStats.map((stat, index) => {
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-primary">{member.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{member.name}</h4>
                        {member.isSupervisor && (
                          <Badge variant="outline" className="text-xs">
                            <Shield size={12} className="mr-1" />
                            Supervisor
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      <p className="text-xs text-muted-foreground">{member.department}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(member.status)}
                        <Badge className={getStatusColor(member.status)}>
                          {member.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {member.kidsCount} kids • {member.completedTraining} training
                      </p>
                      {member.pendingTraining > 0 && (
                        <p className="text-xs text-orange-600">
                          {member.pendingTraining} pending
                        </p>
                      )}
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
                <div key={activity.id} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award size={20} />
            Team Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Training Status */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Training Status
              </h4>
              <div className="space-y-2">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between text-sm">
                    <span className="truncate">{member.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(member.completedTraining / (member.completedTraining + member.pendingTraining)) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {member.completedTraining}/{member.completedTraining + member.pendingTraining}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Case Load Distribution */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Case Load Distribution
              </h4>
              <div className="space-y-2">
                {teamMembers.filter(m => m.kidsCount > 0).map((member) => (
                  <div key={member.id} className="flex items-center justify-between text-sm">
                    <span className="truncate">{member.name}</span>
                    <Badge variant="outline">{member.kidsCount} cases</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Quick Contact
              </h4>
              <div className="space-y-2">
                {teamMembers.slice(0, 4).map((member) => (
                  <div key={member.id} className="flex items-center justify-between text-sm">
                    <span className="truncate">{member.name}</span>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Mail size={12} />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Phone size={12} />
                      </Button>
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
