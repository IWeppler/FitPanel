import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";
import { AppSidebar } from "@/shared/ui/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-zinc-50/50 font-sans">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="flex h-16 items-center border-b bg-white px-4 sticky top-0 z-10 shrink-0">
            <SidebarTrigger />
          </header>
          <div className="p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
