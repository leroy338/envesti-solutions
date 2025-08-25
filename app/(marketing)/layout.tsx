import { NavMenu } from "./components/nav-menu";
import { Footer } from "./components/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <NavMenu />
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="flex-1 flex flex-col gap-20 max-w-7xl p-5">
          {children}
        </div>
        
<Footer />
      </div>
    </main>
  );
}
