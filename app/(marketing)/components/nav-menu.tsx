"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { BadgeDropdown } from "@/components/badge-dropdown";
import { useState, useEffect } from "react";
import { Menu, X, Mail, Phone, ChevronDown, Users, BookOpen, Building2, GraduationCap, Monitor, FileText, HelpCircle, Shield, FileSpreadsheet, Info, PhoneCall, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const contactItems = [
    {
      icon: <Mail size={16} />,
      label: "Email",
      text: "contact@envesti.com",
      href: "mailto:contact@envesti.com"
    },
    {
      icon: <Phone size={16} />,
      label: "Phone",
      text: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    }
  ];

  const navigationItems = [
    {
      label: "Training Solutions",
      href: "/training",
      description: "Comprehensive training programs and instructional design services to elevate your organization's learning capabilities.",
      icon: <GraduationCap size={24} className="text-primary" />,
      submenu: [
        { 
          label: "In Person Training", 
          href: "/in-person",
          description: "Face-to-face training sessions with expert instructors for hands-on learning experiences.",
          icon: <Users size={20} className="text-primary" />
        },
        { 
          label: "Online Training Hosting", 
          href: "/online-training",
          description: "Robust online learning platforms and hosting solutions for remote training delivery.",
          icon: <Monitor size={20} className="text-primary" />
        },
        { 
          label: "Instruction Design", 
          href: "/instruction-design",
          description: "Custom instructional design and curriculum development tailored to your learning objectives.",
          icon: <BookOpen size={20} className="text-primary" />
        }
      ]
    },
    {
      label: "Resources",
      href: "/resources",
      description: "Access our comprehensive library of learning resources, tools, and educational content.",
      icon: <FileText size={24} className="text-primary" />,
      submenu: [
        { 
          label: "Learning Management System", 
          href: "/resources/lms",
          description: "Advanced LMS platform for managing, tracking, and delivering training programs efficiently.",
          icon: <Monitor size={20} className="text-primary" />
        },
        { 
          label: "Blog", 
          href: "https://inspire.ghost.io",
          description: "Latest insights, tips, and trends in corporate training and professional development.",
          icon: <FileText size={20} className="text-primary" />
        },
        { 
          label: "FAQs", 
          href: "/resources/faqs",
          description: "Frequently asked questions about our services, training programs, and learning solutions.",
          icon: <HelpCircle size={20} className="text-primary" />
        },
        { 
          label: "Company EEO Policies", 
          href: "/resources/eeo-policies",
          description: "Our commitment to equal employment opportunity and inclusive workplace practices.",
          icon: <Shield size={20} className="text-primary" />
        },
        { 
          label: "Whitepaper", 
          href: "/resources/whitepaper",
          description: "In-depth research and analysis on learning and development best practices.",
          icon: <FileSpreadsheet size={20} className="text-primary" />
        }
      ]
    },
    {
      label: "Company",
      href: "/company",
      description: "Learn about our mission, values, and the team behind Envesti Solutions.",
      icon: <Building2 size={24} className="text-primary" />,
      submenu: [
        { 
          label: "About Us", 
          href: "/about-us",
          description: "Discover our story, expertise, and commitment to transforming workplace learning.",
          icon: <Info size={20} className="text-primary" />
        },
        { 
          label: "Contact", 
          href: "/schedule-meeting",
          description: "Get in touch with our team for consultations, support, or partnership opportunities.",
          icon: <PhoneCall size={20} className="text-primary" />
        },
        { 
          label: "Careers", 
          href: "/careers",
          description: "Join our team and help shape the future of corporate training and development.",
          icon: <Briefcase size={20} className="text-primary" />
        }
      ]
    }
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
      isScrolled 
        ? "bg-background/80 backdrop-blur-md border-b border-foreground/10 shadow-lg" 
        : "bg-transparent border-b border-transparent"
    )}>
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center p-3 px-5 h-16">
        {/* Logo/Brand */}
        <div className="flex items-center font-semibold gap-4">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/envesti-logo.svg"
              alt="Envesti Solutions"
              width={163}
              height={47}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <BadgeDropdown 
            badgeText="Connect" 
            items={contactItems}
            badgeClassName="text-xs px-2 py-0.5"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navigationItems.map((item) => (
            <div key={item.label} className="relative group">
              <button
                onClick={() => handleDropdownToggle(item.label)}
                className="flex items-center gap-1 font-bold hover:text-primary transition-colors py-2"
              >
                {item.label}
                <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
              </button>
              
              {/* Desktop Dropdown */}
              <div className="absolute top-full left-0 mt-1 w-[600px] bg-background border border-foreground/10 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
                <div className="flex">
                  {/* Left Column - Highlight Card */}
                  <div className="w-1/2 p-6 border-r border-foreground/10">
                    <div className="bg-accent/50 rounded-lg p-4 h-full">
                      <div className="flex items-center gap-3 mb-3">
                        {hoveredItem 
                          ? item.submenu.find(sub => sub.label === hoveredItem)?.icon || item.icon
                          : item.icon
                        }
                        <h3 className="text-lg font-semibold text-foreground">
                          {hoveredItem || item.label}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {hoveredItem 
                          ? item.submenu.find(sub => sub.label === hoveredItem)?.description || item.description
                          : item.description
                        }
                      </p>
                    </div>
                  </div>
                  
                  {/* Right Column - Menu Items */}
                  <div className="w-1/2 p-6">
                    <div className="space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors rounded-md"
                          onMouseEnter={() => setHoveredItem(subItem.label)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right side - Auth buttons and theme switcher */}
        <div className="hidden md:flex items-center gap-4">
          <Button asChild size="sm" variant="outline">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button 
            asChild 
            size="sm"
            className="bg-gradient-to-r from-black to-green-500 hover:from-black hover:to-green-600 text-white border-0"
          >
            <Link href="/courses">Shop Envesti Courses</Link>
          </Button>
          <ThemeSwitcher />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeSwitcher />
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="p-2"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background/90 backdrop-blur-md border-b border-foreground/10 shadow-lg z-[100]">
          <div className="flex flex-col p-4 space-y-4">
            {navigationItems.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => handleDropdownToggle(item.label)}
                  className="flex items-center justify-between w-full font-bold hover:text-primary transition-colors py-2"
                >
                  {item.label}
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${
                      activeDropdown === item.label ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {/* Mobile Dropdown */}
                {activeDropdown === item.label && (
                  <div className="ml-4 mt-2 space-y-2 border-l border-foreground/10 pl-4">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="pt-4 border-t border-t-foreground/10">
              <div className="flex flex-col gap-2">
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-black to-green-500 hover:from-black hover:to-green-600 text-white border-0"
                >
                  <Link href="/courses" onClick={() => setIsMenuOpen(false)}>
                    Shop Envesti Courses
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}