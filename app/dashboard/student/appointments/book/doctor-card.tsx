"use client";

import { useTransition } from "react";
import { bookAppointment } from "@/lib/actions-health";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Video, Loader2, CalendarCheck } from "lucide-react";
import { toast } from "sonner";
import { AvailabilityStatus } from "@/generated/prisma/client";

interface DoctorCardProps {
  doctor: {
    id: string;
    specialization: string;
    availability: AvailabilityStatus;
    user: {
      name: string;
    };
  };
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const [isPending, startTransition] = useTransition();

  const handleBook = (type: "physical" | "remote") => {
    startTransition(async () => {
      // For now, we book for "today + 1 hour" as a simplified flow
      const bookingDate = new Date();
      bookingDate.setHours(bookingDate.getHours() + 1);
      
      const result = await bookAppointment(doctor.id, bookingDate.toISOString());
      
      if (result.success) {
        toast.success(`Successfully booked ${type} appointment with ${doctor.user.name}`);
      } else {
        toast.error(result.error || "Failed to book appointment");
      }
    });
  };

  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow group cursor-pointer overflow-hidden rounded-3xl bg-card/50">
      <CardHeader className="flex flex-row items-center gap-4 pb-4">
        <Avatar className="h-14 w-14 border shadow-sm group-hover:ring-2 group-hover:ring-primary/20 transition-all">
          <AvatarFallback className="bg-primary/5 text-primary font-bold">
            {doctor.user.name.split(" ").map(n => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-xl">{doctor.user.name}</CardTitle>
          <CardDescription className="text-primary font-medium">{doctor.specialization}</CardDescription>
        </div>
        <Badge variant={doctor.availability === "ONLINE" ? "default" : "secondary"} className="rounded-full">
          {doctor.availability}
        </Badge>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground mb-4 bg-muted/30 p-4 rounded-2xl">
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" /> 
            <span>Available Now</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            <span>UIU Medical Center</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            className="flex-1 rounded-xl h-11 font-bold" 
            onClick={() => handleBook("physical")}
            disabled={isPending || doctor.availability !== "ONLINE"}
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CalendarCheck className="h-4 w-4 mr-2" />}
            In-Person
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 rounded-xl h-11 border-primary/20 text-primary font-bold"
            onClick={() => handleBook("remote")}
            disabled={isPending || doctor.availability !== "ONLINE"}
          >
            <Video className="h-4 w-4 mr-2" /> Remote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
