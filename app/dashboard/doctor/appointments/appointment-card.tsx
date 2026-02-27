"use client";

import { useTransition } from "react";
import { updateAppointmentStatus } from "@/lib/actions-health";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, CheckCircle2, XCircle, MoreVertical, MessageSquare, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { AppointmentStatus } from "@/generated/prisma/client";

interface AppointmentCardProps {
  appt: {
    id: string;
    date: Date;
    status: AppointmentStatus;
    student: {
      name: string;
      email: string;
    };
  };
}

export default function AppointmentCard({ appt }: AppointmentCardProps) {
  const [isPending, startTransition] = useTransition();

  const handleUpdate = (status: AppointmentStatus) => {
    startTransition(async () => {
      const result = await updateAppointmentStatus(appt.id, status);
      if (result.success) {
        toast.success(`Appointment marked as ${status.toLowerCase()}`);
      } else {
        toast.error(result.error || "Failed to update status");
      }
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING": return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-none font-medium uppercase text-[10px]">Pending</Badge>;
      case "CONFIRMED": return <Badge variant="outline" className="bg-green-500/10 text-green-600 border-none font-medium uppercase text-[10px]">Confirmed</Badge>;
      case "COMPLETED": return <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-none font-medium uppercase text-[10px]">Completed</Badge>;
      case "CANCELLED": return <Badge variant="outline" className="bg-destructive/10 text-destructive border-none font-medium uppercase text-[10px]">Cancelled</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all rounded-3xl bg-card group relative">
      <CardContent className="p-0 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-muted/30">
        <div className="p-6 md:w-64 flex flex-col items-center justify-center bg-primary/5 text-center shrink-0">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex flex-col items-center justify-center text-primary mb-3">
             <span className="text-xl font-bold leading-none">{format(new Date(appt.date), "dd")}</span>
             <span className="text-[10px] font-bold uppercase tracking-widest">{format(new Date(appt.date), "MMM")}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground mb-3">
             <Clock className="h-3.5 w-3.5" />
             {format(new Date(appt.date), "p")}
          </div>
          {getStatusBadge(appt.status)}
        </div>

        <div className="p-6 flex-1 flex flex-col justify-center text-left">
          <div className="flex items-center gap-4 mb-4">
             <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <User className="h-6 w-6" />
             </div>
             <div>
                <h4 className="text-lg font-bold">{appt.student.name}</h4>
                <p className="text-sm text-muted-foreground">{appt.student.email}</p>
             </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
             <Button variant="outline" size="sm" className="rounded-full h-9 border-muted-foreground/20 hover:bg-primary/5 hover:text-primary transition-colors gap-2">
                <MessageSquare className="h-3.5 w-3.5" />
                Quick Chat
             </Button>
          </div>
        </div>

        <div className="p-6 md:w-48 flex flex-col justify-center gap-3 shrink-0">
          {appt.status === "PENDING" && (
            <>
              <Button 
                onClick={() => handleUpdate("CONFIRMED" as AppointmentStatus)}
                disabled={isPending}
                className="w-full rounded-xl bg-green-600 hover:bg-green-700 h-10 shadow-lg shadow-green-600/20 gap-2 font-bold"
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                Confirm
              </Button>
              <Button 
                onClick={() => handleUpdate("CANCELLED" as AppointmentStatus)}
                disabled={isPending}
                variant="outline" 
                className="w-full rounded-xl h-10 border-destructive/20 text-destructive hover:bg-destructive/10 gap-2 font-bold"
              >
                <XCircle className="h-4 w-4" />
                Decline
              </Button>
            </>
          )}
          {appt.status === "CONFIRMED" && (
            <Button 
                onClick={() => handleUpdate("COMPLETED" as AppointmentStatus)}
                disabled={isPending}
                className="w-full rounded-xl h-10 shadow-lg shadow-primary/20 gap-2 font-bold"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              Mark Completed
            </Button>
          )}
          {appt.status === "COMPLETED" && (
            <div className="flex flex-col items-center gap-2 text-muted-foreground opacity-50">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
                <span className="text-xs font-bold uppercase">Finished</span>
            </div>
          )}
          {appt.status === "CANCELLED" && (
            <div className="flex flex-col items-center gap-2 text-muted-foreground opacity-50">
                <XCircle className="h-8 w-8 text-destructive" />
                <span className="text-xs font-bold uppercase">Cancelled</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
