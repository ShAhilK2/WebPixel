import AppSideBar from "@/components/app-sidebar";
import DashboardFooter from "@/components/dashboardfooter";
import DashboardHeader from "@/components/dashboardheader";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSideBar />
      <main className="w-full max-w-6xl mx-auto flex flex-col">
        <DashboardHeader />
        <div className="flex-1 w-full">{children}</div>
        <DashboardFooter />
      </main>
    </SidebarProvider>
  );
}
