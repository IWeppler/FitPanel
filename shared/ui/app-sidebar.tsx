"use client";

import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  Receipt,
  TrendingUp,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/features/auth/api/logout-action";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Alumnos", url: "/alumnos", icon: Users },
  { title: "Turnos", url: "/turnos", icon: Calendar },
  { title: "Pagos", url: "/pagos", icon: DollarSign },
  { title: "Gastos", url: "/gastos", icon: Receipt },
  { title: "Reportes", url: "/reportes", icon: TrendingUp },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Image
            src="/lvem.jpg"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="heading-page">LVEM</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2 font-inter">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.url}
                tooltip={item.title}
              >
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <form action={logoutAction}>
              <SidebarMenuButton
                type="submit"
                className="font-inter font-medium text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer w-full"
              >
                <LogOut />
                <span>Cerrar Sesión</span>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
