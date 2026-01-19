import { getSession } from "@/lib/auth-utils";
import db from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DoctorCard from "./doctor-card";

export default async function BookAppointment() {
  const session = await getSession();
  
  const doctors = await db.doctor.findMany({
    where: { 
        availability: "ONLINE" 
    },
    include: {
      user: true,
    }
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Book Appointment</h1>
        <p className="text-muted-foreground mt-1 text-lg">Choose an online healthcare professional and book a session.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6 text-left">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-primary" /> Doctors Online
            </h2>
            <div className="grid gap-4">
                {doctors.length === 0 ? (
                    <Card className="border-dashed bg-muted/20 rounded-[2rem]">
                        <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                            <Info className="h-8 w-8 mb-2 opacity-20" />
                            <p>No doctors are currently <Badge variant="secondary" className="bg-primary/5 text-primary">ONLINE</Badge>. Please check back later.</p>
                        </CardContent>
                    </Card>
                ) : (
                    doctors.map((doctor) => (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                    ))
                )}
            </div>
        </div>

        <div className="space-y-6 text-left">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-secondary" /> Frequently Asked
            </h2>
            <Card className="border-none shadow-sm bg-secondary/5 p-2 rounded-[2rem]">
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                         <p className="font-bold text-sm">Is there a fee?</p>
                         <p className="text-xs text-muted-foreground leading-relaxed">No, all medical consultations are free for students of UIU.</p>
                    </div>
                    <div className="space-y-2 border-t pt-4">
                         <p className="font-bold text-sm">Can I cancel?</p>
                         <p className="text-xs text-muted-foreground leading-relaxed">Yes, you can cancel up to 2 hours before the appointment.</p>
                    </div>
                    <div className="space-y-2 border-t pt-4">
                         <p className="font-bold text-sm">Emergency Cases</p>
                         <p className="text-xs text-muted-foreground leading-relaxed">For life-threatening emergencies, contact the ambulance immediately.</p>
                         <Link href="/emergency" className="inline-block mt-2">
                            <Button variant="destructive" size="sm" className="rounded-full">Emergency Info</Button>
                         </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
