"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShieldAlert, 
  HeartPulse, 
  Book, 
  Map as MapIcon, 
  Phone,
  LayoutGrid,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { name: "Quick Help", href: "/emergency", icon: ShieldAlert },
  { name: "First Aid Guides", href: "/emergency/first-aid", icon: HeartPulse },
  { name: "Phonebook", href: "/emergency/phonebook", icon: Book },
  { name: "Hospital Maps", href: "/emergency/maps", icon: MapIcon },
];

export default function EmergencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background selection:bg-destructive/10">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-white dark:bg-card border-r border-muted/30 p-6 lg:p-8 flex flex-col gap-10">
        <div className="flex items-center gap-3 px-2">
          <div className="p-2 bg-destructive/10 text-destructive rounded-xl">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-medium tracking-tight">Emergency</h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Hub & Resources</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group",
                  isActive 
                    ? "bg-destructive text-white shadow-xl shadow-destructive/20" 
                    : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "group-hover:text-destructive")} />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                {isActive && <ChevronRight className="h-4 w-4 opacity-50" />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-6">
          <div className="p-6 bg-destructive/5 rounded-3xl border border-destructive/10 space-y-3">
            <p className="text-[10px] uppercase tracking-widest text-destructive font-medium">24/7 Hotline</p>
            <a href="tel:999" className="text-2xl font-medium text-destructive block">999</a>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">National Emergency Service Bangladesh</p>
          </div>
          
          <Link href="/" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors px-2">
            <LayoutGrid className="h-3 w-3" />
            <span>Back to Portal Home</span>
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 max-h-screen overflow-y-auto bg-muted/20">
        <div className="p-6 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
