import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// This helps Vercel understand the route structure during build
export const dynamic = 'force-dynamic';

export default async function ProtectedPage() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getClaims();
    if (error || !data?.claims) {
      redirect("/login");
    }

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Coming Soon
          </h1>
          <p className="text-xl text-muted-foreground">
            We&apos;re working hard to bring you something amazing.
          </p>
        </div>
        
        <div className="space-y-4">
          <p className="text-lg text-foreground/80">
            Thank you for signing up! Our team is currently building the next generation of tools and features.
          </p>
          
          <div className="bg-accent p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              You&apos;re logged in as: <span className="font-medium text-foreground">{data.claims.email}</span>
            </p>
          </div>
        </div>
        
        <div className="pt-4">
          <p className="text-sm text-muted-foreground">
            We&apos;ll notify you as soon as we&apos;re ready to launch.
          </p>
        </div>
      </div>
    </div>
  );
  } catch {
    // If there's an error during authentication, redirect to login
    redirect("/login");
  }
}
