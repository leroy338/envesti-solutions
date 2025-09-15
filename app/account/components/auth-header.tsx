"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, User, Menu, X } from "lucide-react";

interface AuthHeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function AuthHeader({ isMobileMenuOpen, setIsMobileMenuOpen }: AuthHeaderProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Error signing out:", error);
        return;
      }
      
      // Redirect to home page after successful sign out
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full flex justify-between items-center border-b border-b-foreground/10 h-16 px-4 lg:px-5 bg-background/80 backdrop-blur-md transition-all duration-200">
      {/* Left side - Mobile Menu Button + Logo */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden h-8 w-8 p-0 hover:bg-accent"
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
        
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/envesti-logo.svg"
            alt="Envesti Solutions"
            width={163}
            height={47}
            className="h-6 sm:h-8 w-auto"
            priority
          />
        </Link>
        <Badge variant="secondary" className="text-xs font-medium border-green-500 hidden sm:inline-flex">
          Compliance
        </Badge>
      </div>

      {/* Right side - Avatar and Theme Switcher */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* User Avatar */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 rounded-full p-0 hover:bg-accent"
        >
          <User size={16} className="text-foreground" />
        </Button>

        {/* Theme Switcher */}
        <ThemeSwitcher />

        {/* Logout Button */}
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2 sm:px-3 text-xs"
          onClick={handleSignOut}
        >
          <LogOut size={14} className="sm:mr-1" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    </nav>
  );
}
