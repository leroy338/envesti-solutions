"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { AuthHeader } from "./components/auth-header";
import { Sidebar } from "./components/sidebar";
import { useState, useCallback } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleSetMobileMenuOpen = useCallback((open: boolean) => {
    setIsMobileMenuOpen(open);
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <AuthHeader 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={handleSetMobileMenuOpen}
      />
      <div className="flex-1 flex">
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={handleSetMobileMenuOpen}
        />
        <div className="flex-1 flex flex-col lg:ml-64">
          <div className="flex-1 p-4 sm:p-6">
            {children}
          </div>
          
          <footer className="w-full flex flex-col sm:flex-row items-center justify-center border-t mx-auto text-center text-xs gap-4 sm:gap-8 py-6 sm:py-8 px-4">
            <p>
              Powered by{" "}
              <a
                href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                target="_blank"
                className="font-bold hover:underline"
                rel="noreferrer"
              >
                Supabase
              </a>
            </p>
            <ThemeSwitcher />
          </footer>
        </div>
      </div>
    </main>
  );
}
