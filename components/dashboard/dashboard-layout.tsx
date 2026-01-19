"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: {
    name: string;
    role: "STUDENT" | "DOCTOR" | "ADMIN";
  };
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset className="bg-muted/30">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-background/50 backdrop-blur-sm px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="hidden md:flex">
                <p className="text-sm font-medium text-muted-foreground italic">Welcome back, <span className="text-foreground font-bold not-italic">{user.name}</span></p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center relative">
               <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
               <input className="bg-muted h-9 w-48 rounded-full pl-9 pr-4 text-xs border-none focus:ring-1 focus:ring-primary focus:w-64 transition-all" placeholder="Search data..." />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
            </Button>
            <ModeToggle />
            <div className="flex items-center gap-3 pl-2 border-l">
                 <div className="text-right hidden lg:block">
                     <p className="text-xs font-bold leading-none">{user.name}</p>
                     <p className="text-[10px] text-muted-foreground uppercase tracking-tight mt-1 font-semibold">{user.role}</p>
                 </div>
                 <Avatar className="h-9 w-9 border shadow-sm cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                    </AvatarFallback>
                 </Avatar>
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
