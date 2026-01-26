import db from "@/lib/db";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Search, 
  Filter, 
  User, 
  ChevronRight, 
  Clock, 
  FileText, 
  Calendar,
  History
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

export default async function PatientHistoryPage() {
  const session = await getSession();
  if (!session || session.user.role !== "DOCTOR") {
    redirect("/login");
  }

  const doctor = await db.doctor.findUnique({
    where: { userId: session.user.id }
  });

  if (!doctor) redirect("/login");

  // Fetch unique patients who have had appointments or forms with this doctor
  const appointments = await db.appointment.findMany({
    where: { doctorId: doctor.id },
    include: { student: true },
    orderBy: { date: 'desc' }
  });

  const forms = await db.healthForm.findMany({
    where: { doctorId: doctor.id },
    include: { student: true },
    orderBy: { createdAt: 'desc' }
  });

  // Unique patient mapping
  const patientsMap = new Map();

  appointments.forEach(apt => {
    if (!patientsMap.has(apt.studentId)) {
      patientsMap.set(apt.studentId, {
        id: apt.studentId,
        name: apt.student.name,
        email: apt.student.email,
        lastInteraction: apt.date,
        type: 'Appointment',
        count: 1
      });
    } else {
      const p = patientsMap.get(apt.studentId);
      p.count++;
      if (apt.date > p.lastInteraction) p.lastInteraction = apt.date;
    }
  });

  forms.forEach(form => {
    if (!patientsMap.has(form.studentId)) {
      patientsMap.set(form.studentId, {
        id: form.studentId,
        name: form.student.name,
        email: form.student.email,
        lastInteraction: form.createdAt,
        type: 'Health Form',
        count: 1
      });
    } else {
      const p = patientsMap.get(form.studentId);
      p.count++;
      if (form.createdAt > p.lastInteraction) p.lastInteraction = form.createdAt;
    }
  });

  const patients = Array.from(patientsMap.values()).sort((a, b) => b.lastInteraction.getTime() - a.lastInteraction.getTime());

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-medium tracking-tight">Patient History</h1>
          <p className="text-muted-foreground font-light italic text-sm">"Comprehensive history of all students you have treated."</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              className="w-full pl-10 pr-4 py-2 bg-muted/30 border-none rounded-xl text-sm font-light focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-xl border-muted/50">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {patients.length === 0 ? (
          <Card className="border-none shadow-sm bg-card/40 rounded-[2.5rem] p-16 text-center">
            <div className="h-20 w-20 bg-muted/30 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
              <Users className="h-10 w-10 text-muted-foreground opacity-40" />
            </div>
            <h2 className="text-xl font-medium mb-2">No patients yet</h2>
            <p className="text-muted-foreground font-light mb-0 max-w-sm mx-auto italic leading-relaxed">You haven't treated any patients yet. Your patient records will appear here as you review forms and complete appointments.</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            <div className="flex items-center justify-between px-6 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium mb-1">
               <span className="flex-1">Patient Details</span>
               <span className="hidden md:block w-48 text-center">Last Interaction</span>
               <span className="hidden md:block w-32 text-center">Interactions</span>
               <span className="w-12"></span>
            </div>
            {patients.map((patient) => (
              <Card key={patient.id} className="border-none shadow-sm bg-white dark:bg-card/50 rounded-[2rem] group hover:bg-white dark:hover:bg-card hover:shadow-xl transition-all overflow-hidden border-l-4 border-l-transparent hover:border-l-primary/40">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-6">
                    <div className="flex-1 flex items-center gap-4">
                       <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                          <User className="h-6 w-6" />
                       </div>
                       <div>
                          <h3 className="font-medium text-lg leading-tight group-hover:text-primary transition-colors">{patient.name}</h3>
                          <p className="text-xs text-muted-foreground font-light">{patient.email}</p>
                       </div>
                    </div>
                    
                    <div className="hidden md:flex w-48 flex-col items-center">
                       <div className="flex items-center gap-1.5 text-sm font-medium">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          {format(new Date(patient.lastInteraction), 'MMM dd, yyyy')}
                       </div>
                       <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-light mt-1">via {patient.type}</p>
                    </div>

                    <div className="hidden md:flex w-32 justify-center">
                       <Badge variant="outline" className="rounded-full px-3 py-1 border-muted text-muted-foreground font-medium bg-muted/10">
                          {patient.count} records
                       </Badge>
                    </div>

                    <div className="w-12 flex justify-end">
                       <Button variant="ghost" size="icon" className="rounded-xl group-hover:bg-primary/10 group-hover:text-primary" asChild>
                          <Link href={`/dashboard/doctor/patients/${patient.id}`}>
                            <ChevronRight className="h-5 w-5" />
                          </Link>
                       </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
         <Card className="border-none bg-primary/5 rounded-[2.5rem] p-8 space-y-4">
            <h3 className="text-xl font-medium flex items-center gap-3">
               <FileText className="h-6 w-6 text-primary" /> Report Summary
            </h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
               You have treated a total of <span className="text-primary font-medium">{patients.length} individual students</span>. Maintaining detailed history helps in providing better recurring care.
            </p>
         </Card>
         <Card className="border-none bg-secondary/5 rounded-[2.5rem] p-8 space-y-4">
            <h3 className="text-xl font-medium flex items-center gap-3">
               <History className="h-6 w-6 text-secondary" /> Interaction Analytics
            </h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed italic">
               The average interaction frequency per patient is <span className="text-secondary font-medium">{(patients.reduce((acc, p) => acc + p.count, 0) / (patients.length || 1)).toFixed(1)}</span> times. Most common interaction type is <span className="font-medium">Appointment</span>.
            </p>
         </Card>
      </div>
    </div>
  );
}
