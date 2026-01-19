import db from "@/lib/db";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, FileText, HelpCircle, AlertTriangle, ArrowRight, Sparkles, Layout } from "lucide-react";
import Link from "next/link";

export default async function AdminContentPage() {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const sections = [
    {
      title: "Health Resources",
      desc: "Manage articles, guides, and health tips for students.",
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-500/10",
      count: "12 Articles",
      url: "/dashboard/admin/content/resources"
    },
    {
      title: "Frequently Asked Questions",
      desc: "Update common questions and support documentation.",
      icon: HelpCircle,
      color: "text-purple-600",
      bg: "bg-purple-500/10",
      count: "8 Questions",
      url: "/dashboard/admin/content/faq"
    },
    {
      title: "Emergency Information",
      desc: "Maintain ambulance contacts and emergency procedures.",
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-500/10",
      count: "4 Guides",
      url: "/dashboard/admin/content/emergency"
    },
    {
       title: "Landing Page Sections",
       desc: "Customize hero text, features, and statistics on homepage.",
       icon: Layout,
       color: "text-orange-600",
       bg: "bg-orange-500/10",
       count: "6 Sections",
       url: "/dashboard/admin/content/landing"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground/90">Content Management</h1>
          <p className="text-muted-foreground italic">"Control the public information and educational resources."</p>
        </div>
        <Button variant="outline" className="rounded-xl h-11 gap-2 shadow-sm">
           <Sparkles className="h-4 w-4" /> Global Settings
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <Card key={section.title} className="rounded-3xl border-none shadow-sm hover:shadow-lg transition-all group overflow-hidden bg-card border border-transparent hover:border-primary/10">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-8">
                <div className={`h-16 w-16 rounded-2xl ${section.bg} ${section.color} flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-sm`}>
                  <section.icon className="h-8 w-8" />
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Status</p>
                   <p className="font-bold text-sm text-foreground/80">{section.count}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-8">
                <CardTitle className="text-2xl font-bold">{section.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{section.desc}</CardDescription>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-muted/30">
                 <Button variant="ghost" className="p-0 text-muted-foreground hover:text-primary transition-colors hover:bg-transparent">
                    View Public Page
                 </Button>
                 <Button className="rounded-xl px-6 h-11 gap-2 bg-primary shadow-lg shadow-primary/20 group/btn">
                    <Edit className="h-4 w-4" />
                    Manage Content
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                 </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
