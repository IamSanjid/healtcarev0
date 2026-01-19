import { getSession } from "@/lib/auth-utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Calendar, 
  Clock, 
  MessageSquare, 
  AlertCircle,
  Stethoscope,
  TrendingUp,
  Heart
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function StudentDashboard() {
  const session = await getSession();
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
          <p className="text-muted-foreground mt-1">Daily health summary and upcoming activities.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
            <Link href="/dashboard/student/appointments/book" className="flex-1 md:flex-none">
                <Button className="w-full rounded-xl gap-2 font-semibold">
                    <Calendar className="h-4 w-4" /> Book Now
                </Button>
            </Link>
            <Link href="/dashboard/student/complaints" className="flex-1 md:flex-none">
                <Button variant="outline" className="w-full rounded-xl gap-2 border-primary/20 text-primary">
                    <AlertCircle className="h-4 w-4" /> Help Me
                </Button>
            </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm bg-primary/5 group relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-primary">
            <CardTitle className="text-sm font-medium">Coming Up Next</CardTitle>
            <Calendar className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Tomorrow</div>
            <p className="text-xs text-muted-foreground mt-1 text-primary/70">Dr. Sarah Ahmed at 10:30 AM</p>
            <div className="absolute -bottom-6 -right-6 h-20 w-20 bg-primary/10 rounded-full group-hover:scale-150 transition-transform" />
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-secondary/5 group relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-secondary">
            <CardTitle className="text-sm font-medium">Health Status</CardTitle>
            <Activity className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">Excellent</div>
            <p className="text-xs text-muted-foreground mt-1">Based on last checkup</p>
            <div className="absolute -bottom-6 -right-6 h-20 w-20 bg-secondary/10 rounded-full group-hover:scale-150 transition-transform" />
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-accent/5 group relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-accent">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">03 New</div>
            <p className="text-xs text-muted-foreground mt-1">Response from Doctor</p>
            <div className="absolute -bottom-6 -right-6 h-20 w-20 bg-accent/10 rounded-full group-hover:scale-150 transition-transform" />
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-muted group relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Steps Today</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,452</div>
            <p className="text-xs text-muted-foreground mt-1">85% of daily goal</p>
            <div className="absolute -bottom-6 -right-6 h-20 w-20 bg-muted-foreground/10 rounded-full group-hover:scale-150 transition-transform" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-sm bg-card/60 rounded-[2rem]">
          <CardHeader className="flex flex-row items-center px-8 pt-8">
            <div className="flex-1">
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Scheduled medical consultations.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="rounded-full">View All</Button>
          </CardHeader>
          <CardContent className="px-8 pb-8 space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-3xl bg-background border border-muted/50 group hover:ring-2 hover:ring-primary/10 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-bold">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">General Physical Checkup</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" /> Dr. Sarah Ahmed • <span className="text-primary font-medium">Online</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="rounded-full px-3 py-1 bg-primary/5 text-primary border-primary/20">CONFIRMED</Badge>
                  <p className="text-[10px] text-muted-foreground mt-2 uppercase font-bold tracking-widest">Oct 24, 2026</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-sm bg-card/40 rounded-[2rem]">
            <CardHeader className="px-8 pt-8 outline-none border-none">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Health Tips</CardTitle>
                    <Heart className="h-5 w-5 text-destructive" />
                </div>
                <CardDescription>Stay healthy while studying.</CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8 space-y-4">
                 <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-background/50 border-l-4 border-primary">
                        <p className="text-sm font-semibold mb-1">Stay Hydrated</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">Ensure you drink at least 8 glasses of water a day to maintain focus.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-background/50 border-l-4 border-secondary">
                        <p className="text-sm font-semibold mb-1">Take Screen Breaks</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">Follow the 20-20-20 rule to reduce eye strain from digital devices.</p>
                    </div>
                    <div className="pt-2">
                        <Button className="w-full bg-muted text-foreground hover:bg-muted/80 rounded-xl" variant="secondary">Explore Library</Button>
                    </div>
                 </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
