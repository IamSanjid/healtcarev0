"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Sparkles, 
  Trophy, 
  Library, 
  Stethoscope,
  LayoutGrid,
  ChevronRight,
  BrainCircuit
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { name: "Mindful Overview", href: "/wellness", icon: Sparkles },
  { name: "Academic & Habits", href: "/wellness/success", icon: Trophy },
  { name: "Inspiration Library", href: "/wellness/library", icon: Library },
  { name: "Expert Support", href: "/wellness/help", icon: Stethoscope },
];

export default function WellnessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background selection:bg-primary/10">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-white dark:bg-card border-r border-muted/30 p-6 lg:p-8 flex flex-col gap-10">
        <div className="flex items-center gap-3 px-2">
          <div className="p-2 bg-primary/10 text-primary rounded-xl">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-medium tracking-tight">Care Corner</h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Mental Health Hub</p>
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
                    ? "bg-primary text-white shadow-xl shadow-primary/20" 
                    : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "group-hover:text-primary")} />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                {isActive && <ChevronRight className="h-4 w-4 opacity-50" />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-6">
          <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 space-y-3">
            <p className="text-[10px] uppercase tracking-widest text-primary font-medium">Feeling Overwhelmed?</p>
            <p className="text-xs text-muted-foreground font-light leading-relaxed italic">"It's okay not to be okay. Take a deep breath and explore our resources."</p>
            <Button variant="link" className="p-0 h-auto text-xs text-primary font-medium underline-offset-4" asChild>
                <Link href="/wellness/help">Talk to a Professional</Link>
            </Button>
          </div>
          
          <Link href="/" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 font-medium">
            <LayoutGrid className="h-3 w-3" />
            <span>Back to UIU Health</span>
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 max-h-screen overflow-y-auto bg-muted/10">
        <div className="p-6 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}

import { Button } from "@/components/ui/button";
