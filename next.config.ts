import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['@supabase/ssr'],
  // Ensure proper handling of route groups
  trailingSlash: false,
};

export default nextConfig;
