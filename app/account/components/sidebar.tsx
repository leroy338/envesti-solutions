"use client";

import Link from "next/link";
import { 
  LayoutDashboard,
  Building2, 
  Users, 
  Baby,
  GraduationCap,
  User,
  ChevronRight,
  UserCheck,
  Folder,
  Building
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Icon mapping for different folder names
const getIconForFolder = (folderName: string) => {
  const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    dashboard: LayoutDashboard,
    organization: Building2,
    team: Users,
    kids: Baby,
    training: GraduationCap,
    profile: User,
    people: UserCheck,
    departments: Building,
    default: Folder
  };
  
  return iconMap[folderName] || iconMap.default;
};

// Generate display name from folder name
const getDisplayName = (folderName: string) => {
  return folderName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Generate description from folder name
const getDescription = (folderName: string) => {
  const descriptions: Record<string, string> = {
    dashboard: "Overview and key metrics",
    organization: "Organization management and settings",
    team: "Team members and structure",
    kids: "Kids database and case management",
    training: "Training courses and compliance",
    profile: "Your account and preferences",
    people: "Manage organization members",
    departments: "Department structure and management"
  };
  
  return descriptions[folderName] || `${getDisplayName(folderName)} management`;
};

// Dynamic navigation structure based on folder structure
const getNavigationItems = () => {
  const basePath = "/account";
  
  // Define the folder structure manually for now
  // In a real implementation, this could be generated from file system
  const folderStructure = [
    {
      name: "dashboard",
      hasSubItems: false
    },
    {
      name: "organization", 
      hasSubItems: true,
      subItems: [
        { name: "people" },
        { name: "departments" }
      ]
    },
    {
      name: "team",
      hasSubItems: false
    },
    {
      name: "kids", 
      hasSubItems: false
    },
    {
      name: "training",
      hasSubItems: false
    }
  ];
  
  return folderStructure.map(folder => {
    const item: {
      name: string;
      href: string;
      icon: React.ComponentType<{ size?: number; className?: string }>;
      description: string;
      subItems?: Array<{
        name: string;
        href: string;
        icon: React.ComponentType<{ size?: number; className?: string }>;
        description: string;
      }>;
    } = {
      name: getDisplayName(folder.name),
      href: `${basePath}/${folder.name}`,
      icon: getIconForFolder(folder.name),
      description: getDescription(folder.name)
    };
    
    if (folder.hasSubItems && folder.subItems) {
      item.subItems = folder.subItems.map((subItem: { name: string }) => ({
        name: getDisplayName(subItem.name),
        href: `${basePath}/${folder.name}/${subItem.name}`,
        icon: getIconForFolder(subItem.name),
        description: getDescription(subItem.name)
      }));
    }
    
    return item;
  });
};

const navigationItems = getNavigationItems();

const profileItem = {
  name: "Profile",
  href: "/account/profile",
  icon: User,
  description: "Your account and preferences"
};

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname, setIsMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      
      if (sidebar && !sidebar.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  const isItemActive = (item: { href: string }) => {
    // Only highlight parent if it's the exact current page, not if a subitem is active
    return item.href === pathname;
  };

  const isSubItemActive = (subItem: { href: string }) => {
    return subItem.href === pathname;
  };

  const hasActiveSubItem = (item: { subItems?: Array<{ href: string }> }) => {
    if (!item.subItems) return false;
    return item.subItems.some((subItem: { href: string }) => subItem.href === pathname);
  };

  // Shared navigation component
  const NavigationContent = () => (
    <>
      {/* Main Navigation */}
      <div className="p-6 flex-1 overflow-y-auto">
        <h2 className="text-lg font-semibold text-foreground mb-6">Navigation</h2>
        
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = isItemActive(item);
            const Icon = item.icon;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            
            return (
              <div key={item.name}>
                {/* Top Level Item */}
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : hasActiveSubItem(item)
                      ? "text-foreground bg-accent/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon 
                    size={18} 
                    className={cn(
                      "transition-colors",
                      isActive 
                        ? "text-primary-foreground" 
                        : hasActiveSubItem(item)
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    )} 
                  />
                  <span className="flex-1">{item.name}</span>
                </Link>
                
                {/* Sub Items - Always Visible */}
                {hasSubItems && item.subItems && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((subItem: { name: string; href: string; icon: React.ComponentType<{ size?: number; className?: string }> }) => {
                      const isSubActive = isSubItemActive(subItem);
                      const SubIcon = subItem.icon;
                      
                      return (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group relative",
                            isSubActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                          )}
                        >
                          {/* Left border line */}
                          <div className={cn(
                            "absolute left-0 top-0 bottom-0 w-0.5 rounded-r",
                            isSubActive ? "bg-primary" : "bg-border"
                          )} />
                          <SubIcon 
                            size={16} 
                            className={cn(
                              "transition-colors ml-2",
                              isSubActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                            )} 
                          />
                          <span className="flex-1">{subItem.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Profile Section - Fixed at bottom */}
      <div className="p-6 border-t border-border flex-shrink-0">
        <nav>
          {(() => {
            const isActive = pathname === profileItem.href;
            const Icon = profileItem.icon;
            
            return (
              <Link
                href={profileItem.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <Icon 
                  size={18} 
                  className={cn(
                    "transition-colors",
                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )} 
                />
                <span className="flex-1">{profileItem.name}</span>
                <ChevronRight 
                  size={16} 
                  className={cn(
                    "transition-transform opacity-0 group-hover:opacity-100",
                    isActive ? "text-primary-foreground" : "text-muted-foreground"
                  )} 
                />
              </Link>
            );
          })()}
        </nav>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" />
      )}

      {/* Mobile Sidebar */}
      <div
        id="mobile-sidebar"
        className={cn(
          "lg:hidden fixed top-0 left-0 z-40 w-64 bg-background border-r border-border h-full transform transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <NavigationContent />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-background border-r border-border h-[calc(100vh-4rem)] fixed left-0 top-16 flex-col overflow-hidden">
        <NavigationContent />
      </div>
    </>
  );
}
