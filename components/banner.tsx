"use client";

import { Mail, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BannerProps {
  email: string;
  phone: string;
}

export function Banner({ email, phone }: BannerProps) {
  return (
    <>
      {/* Mobile/Tablet View - Connect Badge with Dropdown (no green background) */}
      <div className="flex sm:hidden px-3 sm:px-5 py-2 sm:py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 h-auto rounded-full shadow-md"
            >
              <Badge variant="outline" className="bg-green-500 border-green-600 text-white font-semibold">
                Connect
              </Badge>
              <ChevronDown className="ml-2 h-4 w-4 text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-white border-green-200 shadow-lg">
            <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 hover:bg-green-50">
              <Mail size={16} className="text-green-600" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-grey-900">Email</span>
                <a href={`mailto:${email}`} className="text-sm text-green-600 hover:underline">
                  {email}
                </a>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 hover:bg-green-50">
              <Phone size={16} className="text-green-600" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-grey-900">Phone</span>
                <a href={`tel:${phone}`} className="text-sm text-green-600 hover:underline">
                  {phone}
                </a>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop View - Full Green Banner */}
      <div className="hidden sm:block w-full bg-green-500 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 py-2 sm:py-3">
          <div className="flex flex-row justify-between items-center gap-6 text-sm">
            {/* Left side - Contact Info */}
            <div className="flex flex-row items-center gap-6">
              <div className="flex items-center gap-2 text-grey-900 font-semibold hover:text-grey-800 transition-colors">
                <Mail size={16} />
                <a href={`mailto:${email}`} className="hover:underline">
                  {email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-grey-900 font-semibold hover:text-grey-800 transition-colors">
                <Phone size={16} />
                <a href={`tel:${phone}`} className="hover:underline">
                  {phone}
                </a>
              </div>
            </div>

            {/* Right side - Action Buttons */}
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="px-3 py-1 h-auto text-grey-900 font-semibold hover:text-grey-800 hover:bg-green-200/30"
              >
                English
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="px-3 py-1 h-auto text-grey-900 font-semibold hover:text-grey-800 hover:bg-green-200/30"
              >
                Partners
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}