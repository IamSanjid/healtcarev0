"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Separator } from "@/components/ui/separator";
import { Bell, Search, User, LogOut, Settings, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/actions-auth";
import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: {
    id: string;
    name: string;
    role: "STUDENT" | "DOCTOR" | "ADMIN";
  };
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const rolePath = user.role.toLowerCase();

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset className="bg-muted/10">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-background/60 backdrop-blur-xl px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="hidden md:flex">
                <p className="text-sm font-light text-muted-foreground italic">
                    Welcome back, <span className="text-foreground font-medium not-italic">{user.name.split(' ')[0]}</span>
                </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center relative mr-2">
               <Search className="absolute left-3 h-3.5 w-3.5 text-muted-foreground/60" />
               <input className="bg-muted/40 h-9 w-48 rounded-xl pl-9 pr-4 text-xs border-none focus:ring-1 focus:ring-primary/20 focus:w-64 transition-all font-light" placeholder="Search resources..." />
            </div>
            
            <Link href={`/dashboard/${rolePath}/notifications`}>
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 group">
                <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-primary" />
              </Button>
            </Link>

            <ModeToggle />

            <div className="h-4 w-px bg-muted mx-1" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 pl-2 cursor-pointer group">
                  <div className="text-right hidden lg:block">
                      <p className="text-xs font-medium leading-none group-hover:text-primary transition-colors">{user.name}</p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1 font-medium opacity-60">{user.role}</p>
                  </div>
                  <Avatar className="h-9 w-9 border-2 border-background shadow-sm group-hover:ring-2 group-hover:ring-primary/20 transition-all">
                      <AvatarFallback className="bg-primary/5 text-primary text-xs font-medium uppercase">
                          {user.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl p-2 border-muted/50 shadow-xl">
                 <DropdownMenuLabel className="font-medium px-3 py-2">
                    <p className="text-sm">My Account</p>
                    <p className="text-[10px] text-muted-foreground font-light italic truncate">{user.name}</p>
                 </DropdownMenuLabel>
                 <DropdownMenuSeparator className="bg-muted/50" />
                 <Link href={`/dashboard/${rolePath}/profile`}>
                    <DropdownMenuItem className="rounded-xl gap-2 px-3 h-10 font-light cursor-pointer">
                       <UserCircle className="h-4 w-4 opacity-60" /> Profile
                    </DropdownMenuItem>
                 </Link>
                 <Link href={`/dashboard/${rolePath}/settings`}>
                    <DropdownMenuItem className="rounded-xl gap-2 px-3 h-10 font-light cursor-pointer">
                       <Settings className="h-4 w-4 opacity-60" /> Settings
                    </DropdownMenuItem>
                 </Link>
                 <DropdownMenuSeparator className="bg-muted/50" />
                 <form action={logout}>
                   <button type="submit" className="w-full">
                      <DropdownMenuItem className="rounded-xl gap-2 px-3 h-10 font-light cursor-pointer text-destructive focus:bg-destructive/5 focus:text-destructive">
                         <LogOut className="h-4 w-4" /> Log Out
                      </DropdownMenuItem>
                   </button>
                 </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        <main className="flex-1 p-6 md:p-10">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

