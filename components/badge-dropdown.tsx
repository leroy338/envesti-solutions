"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface BadgeDropdownItem {
  icon: React.ReactNode;
  label: string;
  text: string;
  href?: string;
  onClick?: () => void;
}

interface BadgeDropdownProps {
  badgeText: string;
  items: BadgeDropdownItem[];
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  badgeClassName?: string;
  dropdownClassName?: string;
  itemClassName?: string;
}

export function BadgeDropdown({
  badgeText,
  items,
  badgeVariant = "outline",
  badgeClassName = "",
  dropdownClassName = "",
  itemClassName = "",
}: BadgeDropdownProps) {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add your form submission logic here
  };

  const handleItemClick = (item: BadgeDropdownItem) => {
    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge 
          variant={badgeVariant} 
          className={`bg-green-500 border-white text-white font-semibold cursor-pointer hover:bg-green-600 transition-colors shadow-[0_2px_4px_rgba(0,0,0,0.3)] ${badgeClassName}`}
        >
          {badgeText}
          <ChevronDown className="ml-2 h-3 w-3 text-white" />
        </Badge>
      </DropdownMenuTrigger>
        <DropdownMenuContent className={`w-80 bg-white border-green-500 shadow-lg p-4 ${dropdownClassName}`}>
          {/* Contact Info Items */}
          {items.map((item, index) => (
            <DropdownMenuItem 
              key={index}
              className={`flex items-center gap-3 px-0 py-2 hover:bg-transparent ${itemClassName}`}
              onClick={() => handleItemClick(item)}
            >
              <div className="text-green-600">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-grey-900">{item.label}</span>
                {item.href ? (
                  <a 
                    href={item.href} 
                    className="text-sm text-green-600 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.text}
                  </a>
                ) : (
                  <span className="text-sm text-green-600">{item.text}</span>
                )}
              </div>
            </DropdownMenuItem>
          ))}
          
          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>
          
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                className="h-8 text-sm"
                placeholder="Enter first name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                className="h-8 text-sm"
                placeholder="Enter last name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="h-8 text-sm"
                placeholder="Enter email address"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              size="sm" 
              className="w-full bg-green-500 hover:bg-green-600 text-white text-sm h-8"
            >
              Connect
            </Button>
            
            <Button 
              asChild
              size="sm" 
              variant="ghost"
              className="w-full text-green-600 hover:text-green-700 hover:bg-green-50 text-sm h-8 border border-green-200"
            >
              <Link href="/schedule-meeting">
                Schedule a Consultation
              </Link>
            </Button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
  );
}
