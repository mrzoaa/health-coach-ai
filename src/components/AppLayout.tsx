import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      
      {/* Main content area with left margin for sidebar */}
      <main className="md:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
