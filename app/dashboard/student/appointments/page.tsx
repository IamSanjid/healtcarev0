import db from "@/lib/db";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Stethoscope, 
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock3
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default async function StudentAppointments() {
  const session = await getSession();
  if (!session || session.user.role !== "STUDENT") {
    redirect("/login");
  }

  const appointments = await db.appointment.findMany({
    where: { studentId: session.user.id },
    include: {
      doctor: {
        include: {
          user: true
        }
      }
    },
    orderBy: { date: 'asc' }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CONFIRMED": return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "PENDING": return <Clock3 className="h-4 w-4 text-amber-500" />;
      case "CANCELLED": return <XCircle className="h-4 w-4 text-destructive" />;
      case "COMPLETED": return <CheckCircle2 className="h-4 w-4 text-primary" />;
      default: return <Clock3 className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED": return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-none rounded-full px-3">Confirmed</Badge>;
      case "PENDING": return <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-none rounded-full px-3">Pending</Badge>;
      case "CANCELLED": return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20 border-none rounded-full px-3">Cancelled</Badge>;
      case "COMPLETED": return <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none rounded-full px-3">Completed</Badge>;
      default: return <Badge variant="outline" className="rounded-full px-3">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
          <p className="text-muted-foreground mt-1 text-sm font-light">View and manage your scheduled medical consultations.</p>
        </div>
        <Link href="/dashboard/student/appointments/book">
          <Button className="rounded-2xl gap-2 h-12 px-6 shadow-lg shadow-primary/20">
            <Calendar className="h-4 w-4" /> Book New Appointment
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {appointments.length === 0 ? (
          <Card className="border-none shadow-sm bg-card/40 rounded-[2.5rem] p-12 text-center">
            <div className="h-20 w-20 bg-muted/30 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-10 w-10 text-muted-foreground opacity-50" />
            </div>
            <h2 className="text-xl font-medium mb-2">No appointments yet</h2>
            <p className="text-muted-foreground font-light mb-8 max-w-sm mx-auto">You haven't scheduled any medical consultations yet. Book your first one today!</p>
            <Link href="/dashboard/student/appointments/book">
              <Button variant="outline" className="rounded-xl border-dashed">Schedule Now</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-4">
             {appointments.map((apt) => (
                <Card key={apt.id} className="border-none shadow-sm bg-card/60 rounded-[2rem] overflow-hidden group hover:bg-white dark:hover:bg-card transition-all">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row items-stretch">
                      <div className="w-full md:w-48 bg-muted/30 p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-muted/50">
                         <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-1">{format(new Date(apt.date), 'MMMM')}</span>
                         <span className="text-5xl font-medium leading-none mb-1">{format(new Date(apt.date), 'dd')}</span>
                         <span className="text-sm text-muted-foreground font-light">{format(new Date(apt.date), 'EEEE')}</span>
                      </div>
                      <div className="flex-1 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                             {getStatusIcon(apt.status)}
                             {getStatusBadge(apt.status)}
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-xl font-medium">Dr. {apt.doctor.user.name}</h3>
                            <p className="text-sm text-muted-foreground font-light italic flex items-center gap-1.5">
                              <Stethoscope className="h-3.5 w-3.5" /> {apt.doctor.specialization}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-4 pt-1">
                             <div className="flex items-center gap-2 text-xs text-muted-foreground font-light">
                               <Clock className="h-3.5 w-3.5" /> {format(new Date(apt.date), 'hh:mm a')}
                             </div>
                             <div className="flex items-center gap-2 text-xs text-muted-foreground font-light">
                               <MapPin className="h-3.5 w-3.5" /> UIU Medical Center
                             </div>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                           <Button variant="outline" className="rounded-xl border-muted flex-1 md:flex-none">Cancel</Button>
                           <Button className="rounded-xl flex-1 md:flex-none">Reschedule</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
             ))}
          </div>
        )}
      </div>

      <Card className="border-none bg-primary/5 rounded-[2.5rem] p-8">
         <CardHeader className="p-0 mb-4">
            <CardTitle className="flex items-center gap-2 text-lg text-primary font-medium">
               <AlertCircle className="h-5 w-5" /> Important Note
            </CardTitle>
         </CardHeader>
         <CardContent className="p-0">
            <p className="text-sm text-muted-foreground leading-relaxed font-light">
               Please arrive at least 10 minutes before your scheduled appointment time. If you need to cancel or reschedule, try to do so at least 24 hours in advance. Bring your UIU Student ID card with you.
            </p>
         </CardContent>
      </Card>
    </div>
  );
}
