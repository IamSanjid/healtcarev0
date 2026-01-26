import { getSession } from "@/lib/auth-utils";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Clock, 
  Calendar, 
  FileSearch, 
  CheckCircle,
  Stethoscope,
  TrendingUp,
  Activity,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format, startOfDay, endOfDay } from "date-fns";

export default async function DoctorDashboard() {
  const session = await getSession();
  if (!session || session.user.role !== "DOCTOR") {
    redirect("/login");
  }

  const doctor = await db.doctor.findUnique({
    where: { userId: session.user.id },
    include: { user: true }
  });

  if (!doctor) redirect("/login");

  // Stats
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());

  const appointmentsToday = await db.appointment.count({
    where: {
      doctorId: doctor.id,
      date: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
  });

  const completedToday = await db.appointment.count({
    where: {
      doctorId: doctor.id,
      status: "COMPLETED",
      date: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
  });

  const pendingFormsCount = await db.healthForm.count({
    where: {
      status: "SUBMITTED",
    },
  });

  // Lists
  const upcomingAppointments = await db.appointment.findMany({
    where: {
      doctorId: doctor.id,
      status: "CONFIRMED",
      date: {
        gte: new Date(),
      },
    },
    include: {
      student: true,
    },
    take: 3,
    orderBy: {
      date: "asc",
    },
  });

  const latestForms = await db.healthForm.findMany({
    where: {
        status: "SUBMITTED"
    },
    include: {
      student: true,
    },
    take: 2,
    orderBy: {
      createdAt: "desc",
    },
  });
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-medium tracking-tight">Doctor Overview</h1>
          <p className="text-muted-foreground mt-1 text-sm font-light italic">"Welcome back, Dr. {doctor.user.name.split(' ')[0]}! Managing UIU Health today."</p>
        </div>
        <div className="flex items-center gap-3 bg-secondary/10 px-6 py-3 rounded-[1.5rem] border border-secondary/20 shadow-sm shadow-secondary/5">
            <div className={`h-2.5 w-2.5 rounded-full ${doctor.availability === 'ONLINE' ? 'bg-green-500 animate-pulse' : 'bg-muted'}`} />
            <span className="text-sm font-medium text-secondary">{doctor.availability === 'ONLINE' ? 'Currently Online' : 'Currently Offline'}</span>
            <Button asChild size="sm" variant="ghost" className="h-8 text-[10px] font-medium uppercase tracking-[0.2em] text-secondary hover:bg-secondary/10 ml-2 rounded-xl">
                <Link href="/dashboard/doctor/availability">Change Status</Link>
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 font-figtree">
        <Card className="border-none shadow-sm bg-primary/5 rounded-[2rem] relative overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-primary">
            <CardTitle className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-70">Appointments Today</CardTitle>
            <Calendar className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium tracking-tight">{appointmentsToday} Patients</div>
            <p className="text-[10px] text-muted-foreground mt-1 font-medium italic">
                {completedToday} completed • {appointmentsToday - completedToday} remaining
            </p>
            <div className="absolute -bottom-6 -right-6 h-16 w-16 bg-primary/10 rounded-full group-hover:scale-150 transition-transform" />
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-secondary/5 rounded-[2rem] relative overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-secondary">
            <CardTitle className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-70">New Health Forms</CardTitle>
            <FileSearch className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium tracking-tight text-secondary">{pendingFormsCount} Pending</div>
            <p className="text-[10px] text-muted-foreground mt-1 font-medium font-figtree">Awaiting initial review</p>
            <div className="absolute -bottom-6 -right-6 h-16 w-16 bg-secondary/10 rounded-full group-hover:scale-150 transition-transform" />
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-accent/5 rounded-[2rem] relative overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-accent">
            <CardTitle className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-70">Verified Status</CardTitle>
            <Activity className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium tracking-tight text-accent">{doctor.approved ? "Active" : "Pending"}</div>
            <p className="text-[10px] text-muted-foreground mt-1 font-medium">Licensed UIU Personnel</p>
            <div className="absolute -bottom-6 -right-6 h-16 w-16 bg-accent/10 rounded-full group-hover:scale-150 transition-transform" />
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-muted/40 rounded-[2rem] relative overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-70">Specialization</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-medium tracking-tight line-clamp-1">{doctor.specialization}</div>
            <p className="text-[10px] text-muted-foreground mt-1 font-medium italic">Primary Department</p>
            <div className="absolute -bottom-6 -right-6 h-16 w-16 bg-muted-foreground/10 rounded-full group-hover:scale-150 transition-transform" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-sm bg-card/60 rounded-[3rem] overflow-hidden">
          <CardHeader className="flex flex-row items-center px-10 pt-10">
            <div className="flex-1 text-left">
              <CardTitle className="text-2xl font-medium tracking-tight">Upcoming Patients</CardTitle>
              <CardDescription className="text-sm font-light">Your scheduled consultations for the next 24 hours.</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="rounded-full text-primary hover:bg-primary/5">
                <Link href="/dashboard/doctor/appointments">Manage All</Link>
            </Button>
          </CardHeader>
          <CardContent className="px-10 pb-10 mt-6 space-y-4">
            {upcomingAppointments.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground bg-background/30 rounded-[2.5rem] border border-dashed border-muted/50">
                    <Calendar className="h-10 w-10 mx-auto mb-4 opacity-20" />
                    <p className="text-sm font-light italic">No confirmed appointments for today.</p>
                </div>
            ) : upcomingAppointments.map((appt) => (
              <div key={appt.id} className="flex items-center justify-between p-6 rounded-[2rem] bg-background/50 border border-muted/30 group hover:ring-2 hover:ring-primary/5 transition-all text-left">
                <div className="flex items-center gap-5">
                  <Avatar className="h-14 w-14 rounded-2xl border-none shadow-sm">
                    <AvatarFallback className="bg-primary/5 text-primary text-sm font-medium">
                        {appt.student.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-medium text-lg tracking-tight leading-none">{appt.student.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-light">
                       <Clock className="h-3 w-3" /> {format(appt.date, "p")} • Patient Record
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                    <Button asChild variant="ghost" className="rounded-xl h-10 px-5 text-[10px] font-medium tracking-widest uppercase hover:bg-primary/5 hover:text-primary transition-all">
                        <Link href="/dashboard/doctor/appointments">DETAILS</Link>
                    </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-sm bg-secondary/5 rounded-[3rem] overflow-hidden">
            <CardHeader className="px-10 pt-10">
                <CardTitle className="flex justify-between items-center text-2xl font-medium tracking-tight text-left">
                    Latest Health Forms
                    <div className="p-2 bg-secondary/10 rounded-xl">
                      <FileSearch className="h-5 w-5 text-secondary" />
                    </div>
                </CardTitle>
                <CardDescription className="text-sm font-light">Direct symptoms reported by students.</CardDescription>
            </CardHeader>
            <CardContent className="px-10 pb-10 mt-6 space-y-4">
                 <div className="grid gap-4">
                    {latestForms.length === 0 ? (
                        <div className="py-12 text-center text-muted-foreground opacity-60 italic font-light">
                            <p className="text-xs">No pending health forms found.</p>
                        </div>
                    ) : latestForms.map(form => (
                        <div key={form.id} className="p-6 rounded-[2rem] bg-white/50 border border-secondary/10 flex flex-col gap-3 text-left relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-all">
                                <Activity className="h-10 w-10 text-secondary" />
                            </div>
                            <div className="flex justify-between items-center relative z-10">
                                <span className="text-base font-medium tracking-tight leading-none">{form.student.name}</span>
                                <Badge className={`rounded-full border-none text-[9px] font-medium px-2 py-0.5 tracking-tighter ${
                                  form.urgency === 'EMERGENCY' ? 'bg-destructive/10 text-destructive' : 'bg-secondary/10 text-secondary'
                                }`}>
                                    {form.urgency}
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-light italic opacity-80">"{form.symptoms}"</p>
                            <Button asChild variant="ghost" className="h-auto p-0 text-[10px] text-secondary hover:bg-transparent tracking-widest uppercase font-medium self-start group-hover:gap-2 transition-all">
                                <Link href={`/dashboard/doctor/forms/${form.id}`} className="flex items-center gap-1">Review Now <ArrowRight className="h-3 w-3" /></Link>
                            </Button>
                        </div>
                    ))}
                 </div>
                 {latestForms.length > 0 && (
                     <div className="pt-4">
                        <Button asChild variant="outline" className="w-full h-14 rounded-[1.5rem] bg-secondary/10 border-none text-secondary font-medium text-xs tracking-widest uppercase hover:bg-secondary/20 transition-all">
                            <Link href="/dashboard/doctor/forms">SEE ALL SYMPTOM REPORTS</Link>
                        </Button>
                     </div>
                 )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

