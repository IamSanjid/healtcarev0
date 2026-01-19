import { getSession } from "@/lib/auth-utils";
import db from "@/lib/db";
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
  if (!session) return null;

  const doctor = await db.doctor.findUnique({
    where: { userId: session.user.id },
  });

  if (!doctor) return null;

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
          <h1 className="text-3xl font-bold tracking-tight">Doctor Overview</h1>
          <p className="text-muted-foreground mt-1">Manage your patients, availability, and consultations.</p>
        </div>
        <div className="flex items-center gap-3 bg-secondary/10 px-4 py-2 rounded-2xl border border-secondary/20">
            <div className={`h-3 w-3 rounded-full ${doctor.availability === 'ONLINE' ? 'bg-green-500 animate-pulse' : 'bg-muted'}`} />
            <span className="text-sm font-bold text-secondary">{doctor.availability === 'ONLINE' ? 'Currently Online' : 'Currently Offline'}</span>
            <Button asChild size="sm" variant="ghost" className="h-8 text-[10px] font-bold uppercase tracking-wider">
                <Link href="/dashboard/doctor/availability">Change Status</Link>
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-primary">
            <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
            <Calendar className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointmentsToday} Patients</div>
            <p className="text-xs text-muted-foreground mt-1 text-green-500 font-medium">
                {completedToday} completed • {appointmentsToday - completedToday} remaining
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-secondary">
            <CardTitle className="text-sm font-medium">New Health Forms</CardTitle>
            <FileSearch className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingFormsCount} Pending</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting review</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-accent">
            <CardTitle className="text-sm font-medium">Verified Status</CardTitle>
            <CheckCircle className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doctor.approved ? "Active" : "Pending"}</div>
            <p className="text-xs text-muted-foreground mt-1">Medical License Verified</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Specialization</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold line-clamp-1">{doctor.specialization}</div>
            <p className="text-xs text-muted-foreground mt-1">Primary Department</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-sm bg-card/60 rounded-[2.5rem]">
          <CardHeader className="flex flex-row items-center px-10 pt-10">
            <div className="flex-1 text-left">
              <CardTitle>Upcoming Patients</CardTitle>
              <CardDescription>Scheduled consultations for the next 24 hours.</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="rounded-full">
                <Link href="/dashboard/doctor/appointments">Manage All</Link>
            </Button>
          </CardHeader>
          <CardContent className="px-10 pb-10 space-y-6">
            {upcomingAppointments.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground bg-background/30 rounded-3xl border border-dashed">
                    <Calendar className="h-8 w-8 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">No confirmed appointments for today.</p>
                </div>
            ) : upcomingAppointments.map((appt) => (
              <div key={appt.id} className="flex items-center justify-between p-4 rounded-3xl bg-background/50 border border-muted group hover:border-primary/30 transition-all text-left">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border">
                    <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                        {appt.student.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-sm">{appt.student.name}</h3>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                       <Clock className="h-3 w-3" /> {format(appt.date, "p")} • Patient
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                    <Button asChild size="sm" className="rounded-lg h-8 px-4 text-[10px] font-bold">
                        <Link href="/dashboard/doctor/appointments">DETAILS</Link>
                    </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-sm bg-secondary/5 rounded-[2.5rem]">
            <CardHeader className="px-10 pt-10">
                <CardTitle className="flex justify-between items-center text-lg text-left">
                    Latest Health Forms
                    <FileSearch className="h-5 w-5 text-secondary" />
                </CardTitle>
            </CardHeader>
            <CardContent className="px-10 pb-10 space-y-4">
                 <div className="grid gap-3">
                    {latestForms.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground opacity-60">
                            <p className="text-xs italic">No pending forms to review.</p>
                        </div>
                    ) : latestForms.map(form => (
                        <div key={form.id} className="p-4 rounded-2xl bg-background/40 border border-secondary/10 flex flex-col gap-2 text-left">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold">{form.student.name}</span>
                                <Badge variant={form.urgency === 'EMERGENCY' ? 'destructive' : 'secondary'} className="text-[9px] h-4">
                                    {form.urgency}
                                </Badge>
                            </div>
                            <p className="text-[10px] text-muted-foreground line-clamp-2 italic">"{form.symptoms}"</p>
                            <Button asChild size="sm" variant="ghost" className="h-6 p-0 text-[10px] text-secondary hover:bg-transparent hover:underline self-start">
                                <Link href={`/dashboard/doctor/forms/${form.id}`}>Review Form</Link>
                            </Button>
                        </div>
                    ))}
                 </div>
                 {latestForms.length > 0 && (
                     <Button asChild variant="ghost" size="sm" className="w-full h-8 text-secondary font-bold text-[10px]">
                         <Link href="/dashboard/doctor/forms">VIEW ALL FORMS <ArrowRight className="ml-1 h-3 w-3" /></Link>
                     </Button>
                 )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
