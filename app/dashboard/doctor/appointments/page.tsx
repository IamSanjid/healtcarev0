import db from "@/lib/db";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import AppointmentCard from "./appointment-card";

export default async function DoctorAppointmentsPage() {
  const session = await getSession();
  if (!session || session.user.role !== "DOCTOR") {
    redirect("/login");
  }

  const doctor = await db.doctor.findUnique({
    where: { userId: session.user.id },
  });

  if (!doctor) redirect("/login");

  const appointments = await db.appointment.findMany({
    where: { doctorId: doctor.id },
    include: {
      student: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
        <p className="text-muted-foreground italic">"Manage your consultations and patient schedule."</p>
      </div>

      <div className="grid gap-6">
        {appointments.length === 0 ? (
          <Card className="border-dashed flex flex-col items-center justify-center p-16 text-center bg-muted/20 rounded-3xl">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle className="mb-2">No appointments scheduled</CardTitle>
            <CardDescription className="max-w-xs">
              When students book sessions with you, they will appear here.
            </CardDescription>
          </Card>
        ) : (
          appointments.map((appt) => (
            <AppointmentCard key={appt.id} appt={appt} />
          ))
        )}
      </div>
    </div>
  );
}
