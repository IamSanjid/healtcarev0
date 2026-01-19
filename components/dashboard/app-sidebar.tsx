"use client";

import * as React from "react";
import {
  Activity,
  Calendar,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Bell,
  User,
  ShieldCheck,
  Users,
  Settings,
  HelpCircle,
  FileSearch,
  CheckCircle2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { logout } from "@/lib/actions-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AppSidebarProps {
  user: {
    name: string;
    role: "STUDENT" | "DOCTOR" | "ADMIN";
  };
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname();

  const getMenuItems = () => {
    switch (user.role) {
      case "STUDENT":
        return [
          { title: "Overview", icon: LayoutDashboard, url: "/dashboard/student" },
          { title: "Book Appointment", icon: Calendar, url: "/dashboard/student/appointments/book" },
          { title: "My Appointments", icon: ClipboardList, url: "/dashboard/student/appointments" },
          { title: "Health Complaint", icon: FileSearch, url: "/dashboard/student/complaints" },
          { title: "Prescriptions", icon: FileText, url: "/dashboard/student/prescriptions" },
          { title: "Messages", icon: MessageSquare, url: "/dashboard/student/messages" },
          { title: "Notifications", icon: Bell, url: "/dashboard/student/notifications" },
        ];
      case "DOCTOR":
        return [
          { title: "Today's View", icon: LayoutDashboard, url: "/dashboard/doctor" },
          { title: "Manage Availability", icon: Calendar, url: "/dashboard/doctor/availability" },
          { title: "My Appointments", icon: ClipboardList, url: "/dashboard/doctor/appointments" },
          { title: "Health Forms", icon: FileSearch, url: "/dashboard/doctor/forms" },
          { title: "Patient History", icon: Users, url: "/dashboard/doctor/patients" },
          { title: "Messages", icon: MessageSquare, url: "/dashboard/doctor/messages" },
        ];
      case "ADMIN":
        return [
          { title: "System Overview", icon: LayoutDashboard, url: "/dashboard/admin" },
          { title: "User Management", icon: Users, url: "/dashboard/admin/users" },
          { title: "Doctor Approvals", icon: CheckCircle2, url: "/dashboard/admin/approvals" },
          { title: "Content Management", icon: Settings, url: "/dashboard/admin/content" },
          { title: "Analytics", icon: Activity, url: "/dashboard/admin/analytics" },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Activity className="h-5 w-5" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="font-bold tracking-tight truncate leading-none">UIU Health</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-1">
              {user.role} Portal
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Profile">
                  <Link href={`/dashboard/${user.role.toLowerCase()}/profile`}>
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <Link href={`/dashboard/${user.role.toLowerCase()}/settings`}>
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <form action={logout}>
              <SidebarMenuButton type="submit" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
