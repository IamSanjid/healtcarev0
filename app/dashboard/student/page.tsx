import db from "@/lib/db";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
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
  Heart,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default async function StudentDashboard() {
  const session = await getSession();
  if (!session || session.user.role !== "STUDENT") {
    redirect("/login");
  }

  // Fetch real data
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      appointments: {
        where: { status: { in: ['CONFIRMED', 'PENDING'] }, date: { gte: new Date() } },
        include: { doctor: { include: { user: true } } },
        orderBy: { date: 'asc' },
        take: 3
      },
      messagesRecv: {
        where: { read: false },
      }
    }
  });

  if (!user) redirect("/login");

  const nextApt = user.appointments[0];
  const unreadMessagesCount = user.messagesRecv.length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-medium tracking-tight">Student Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm font-light italic">Welcome back, {user.name.split(' ')[0]}! Here's your health summary.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
            <Link href="/dashboard/student/appointments/book" className="flex-1 md:flex-none">
                <Button className="w-full rounded-2xl gap-2 font-medium h-12 px-6 shadow-lg shadow-primary/10">
                    <Calendar className="h-4 w-4" /> Book Now
                </Button>
            </Link>
            <Link href="/dashboard/student/complaints" className="flex-1 md:flex-none">
                <Button variant="outline" className="w-full rounded-2xl gap-2 border-primary/20 text-primary h-12 px-6">
                    <AlertCircle className="h-4 w-4" /> Help Me
                </Button>
            </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 font-figtree">
        <Card className="border-none shadow-sm bg-primary/5 group relative overflow-hidden rounded-[2rem]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-primary">
            <CardTitle className="text-xs font-medium uppercase tracking-widest opacity-70">Coming Up Next</CardTitle>
            <Calendar className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium tracking-tight">
                {nextApt ? format(new Date(nextApt.date), 'EEEE') : "None"}
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 text-primary/70 font-medium">
                {nextApt ? `Dr. ${nextApt.doctor.user.name} at ${format(new Date(nextApt.date), 'p')}` : "No upcoming visits"}
            </p>
            <div className="absolute -bottom-6 -right-6 h-20 w-20 bg-primary/10 rounded-full group-hover:scale-150 transition-transform" />
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-secondary/5 group relative overflow-hidden rounded-[2rem]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-secondary">
            <CardTitle className="text-xs font-medium uppercase tracking-widest opacity-70">Health Status</CardTitle>
            <Activity className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium tracking-tight text-secondary">Excellent</div>
            <p className="text-[10px] text-muted-foreground mt-1 font-medium">Synced with UIU Records</p>
            <div className="absolute -bottom-6 -right-6 h-20 w-20 bg-secondary/10 rounded-full group-hover:scale-150 transition-transform" />
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-accent/5 group relative overflow-hidden rounded-[2rem]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-accent">
            <CardTitle className="text-xs font-medium uppercase tracking-widest opacity-70">New Messages</CardTitle>
            <MessageSquare className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium tracking-tight text-accent">{unreadMessagesCount.toString().padStart(2, '0')} New</div>
            <p className="text-[10px] text-muted-foreground mt-1 font-medium">From UIU Medical Team</p>
            <div className="absolute -bottom-6 -right-6 h-20 w-20 bg-accent/10 rounded-full group-hover:scale-150 transition-transform" />
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-muted/40 group relative overflow-hidden rounded-[2rem]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium uppercase tracking-widest opacity-70">Steps Today</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium tracking-tight">8,452</div>
            <p className="text-[10px] text-muted-foreground mt-1 font-medium italic">85% of daily goal</p>
            <div className="absolute -bottom-6 -right-6 h-20 w-20 bg-muted-foreground/10 rounded-full group-hover:scale-150 transition-transform" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-sm bg-card/60 rounded-[3rem] overflow-hidden">
          <CardHeader className="flex flex-row items-center px-10 pt-10">
            <div className="flex-1">
              <CardTitle className="text-2xl font-medium tracking-tight">Upcoming Appointments</CardTitle>
              <CardDescription className="text-sm font-light">Your scheduled medical consultations.</CardDescription>
            </div>
            <Link href="/dashboard/student/appointments">
              <Button variant="ghost" size="sm" className="rounded-full gap-1 group text-primary hover:bg-primary/5">
                View All <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="px-10 pb-10 mt-6 space-y-4">
            {user.appointments.length === 0 ? (
                <div className="py-10 text-center space-y-3">
                   <div className="h-16 w-16 bg-muted/30 rounded-2xl flex items-center justify-center mx-auto text-muted-foreground opacity-50">
                      <Calendar className="h-8 w-8" />
                   </div>
                   <p className="text-muted-foreground font-light text-sm italic">No upcoming appointments found.</p>
                </div>
            ) : (
                user.appointments.map((apt) => (
                    <div key={apt.id} className="flex items-center justify-between p-6 rounded-[2rem] bg-background/40 border border-muted/30 group hover:ring-2 hover:ring-primary/5 transition-all cursor-pointer">
                        <div className="flex items-center gap-5">
                            <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                                <Stethoscope className="h-7 w-7" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-medium text-lg tracking-tight">{apt.doctor.specialization}</h3>
                                <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-light">
                                    <Clock className="h-3.5 w-3.5" /> Dr. {apt.doctor.user.name} • <span className="text-primary/70 font-medium">UIU Clinic</span>
                                </p>
                            </div>
                        </div>
                        <div className="text-right space-y-2">
                            <Badge className={`rounded-full px-3 py-1 text-[10px] tracking-widest border-none font-medium ${
                                apt.status === 'CONFIRMED' ? 'bg-green-500/10 text-green-600' : 'bg-amber-500/10 text-amber-600'
                            }`}>
                                {apt.status}
                            </Badge>
                            <p className="text-[10px] text-muted-foreground uppercase font-medium tracking-[0.15em] font-figtree">
                                {format(new Date(apt.date), 'MMM dd, p')}
                            </p>
                        </div>
                    </div>
                ))
            )}
          </CardContent>
        </Card>
 
        <Card className="lg:col-span-3 border-none shadow-sm bg-card/40 rounded-[3rem] overflow-hidden">
            <CardHeader className="px-10 pt-10 outline-none border-none">
                <div className="flex justify-between items-center mb-1">
                    <CardTitle className="text-2xl font-medium tracking-tight">Health Tips</CardTitle>
                    <div className="p-2 bg-destructive/5 rounded-xl">
                        <Heart className="h-5 w-5 text-destructive fill-destructive/10" />
                    </div>
                </div>
                <CardDescription className="text-sm font-light">Stay healthy while studying.</CardDescription>
            </CardHeader>
            <CardContent className="px-10 pb-10 mt-6 space-y-6">
                 <div className="space-y-5">
                    <div className="p-6 rounded-[2rem] bg-white/40 border border-white/50 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/40" />
                        <p className="text-base font-medium mb-1 tracking-tight">Stay Hydrated</p>
                        <p className="text-xs text-muted-foreground leading-relaxed font-light italic">Ensure you drink at least 8 glasses of water a day to maintain focus during intensive study sessions.</p>
                    </div>
                    <div className="p-6 rounded-[2rem] bg-white/40 border border-white/50 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary" />
                        <p className="text-base font-medium mb-1 tracking-tight">Take Screen Breaks</p>
                        <p className="text-xs text-muted-foreground leading-relaxed font-light italic">Follow the 20-20-20 rule: every 20 mins, look at something 20 feet away for 20 seconds.</p>
                    </div>
                    <div className="pt-4">
                        <Button className="w-full bg-muted/60 text-foreground hover:bg-muted rounded-[1.5rem] h-14 font-medium transition-all" variant="secondary">Explore Library</Button>
                    </div>
                 </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
