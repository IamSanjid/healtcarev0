"use client";

import { toggleDoctorStatus } from "@/lib/actions-health";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Power, Sparkles, ShieldCheck, Clock } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { AvailabilityStatus } from "@/generated/prisma/client";

interface AvailabilityPageProps {
  doctor: {
    id: string;
    availability: AvailabilityStatus;
  };
}

export default function AvailabilityClientPage({ doctor }: AvailabilityPageProps) {
  const [status, setStatus] = useState<AvailabilityStatus>(doctor.availability);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleDoctorStatus(status);
      if (result.success && result.status) {
        setStatus(result.status as AvailabilityStatus);
        toast.success(`You are now ${result.status.toLowerCase()}`);
      } else {
        toast.error(result.error || "Failed to update status");
      }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Status & Availability</h1>
          <p className="text-muted-foreground italic">"Control your visibility to students."</p>
        </div>
        <Badge variant={status === "ONLINE" ? "default" : "secondary"} className="h-7 px-4 rounded-full font-bold uppercase tracking-wider">
          {status}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className={`rounded-[2.5rem] border-none shadow-2xl overflow-hidden transition-all duration-500 ${status === 'ONLINE' ? 'bg-green-500/10 ring-4 ring-green-500/20' : 'bg-muted/30'}`}>
          <CardHeader className="p-10 pb-4 text-center">
            <div className={`h-24 w-24 rounded-3xl mx-auto mb-6 flex items-center justify-center transition-all duration-500 ${status === 'ONLINE' ? 'bg-green-500 text-white shadow-lg shadow-green-500/50 scale-110' : 'bg-muted text-muted-foreground'}`}>
               <Power className="h-10 w-10" />
            </div>
            <CardTitle className="text-2xl font-bold">Visibility Toggle</CardTitle>
            <CardDescription className="text-base mt-2">
              {status === "ONLINE" 
                ? "Students can see you and book appointments now." 
                : "Your profile is hidden from the booking list."}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-10 pt-4">
            <Button 
                onClick={handleToggle} 
                disabled={isPending}
                size="lg"
                className={`w-full h-16 rounded-2xl text-lg font-bold shadow-xl transition-all active:scale-95 ${status === 'ONLINE' ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground' : 'bg-green-600 hover:bg-green-700 text-white'}`}
            >
              {isPending ? "Updating..." : status === "ONLINE" ? "Go Offline" : "Go Online"}
            </Button>
            
            <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground font-medium uppercase tracking-widest">
                <div className="flex items-center gap-1.5 italic">
                    <ShieldCheck className="h-3.5 w-3.5" /> Secure
                </div>
                <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                <div className="flex items-center gap-1.5 italic">
                    <Clock className="h-3.5 w-3.5" /> Real-time
                </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
                <CardHeader className="p-8 pb-4">
                    <div className="flex items-center gap-2 text-primary mb-2">
                        <Sparkles className="h-5 w-5" />
                        <h4 className="font-bold text-sm uppercase tracking-widest">Visibility Rule</h4>
                    </div>
                </CardHeader>
                <CardContent className="px-8 pb-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
                    <p>When you are <strong>ONLINE</strong>, your name appears in the student booking portal. Students can request immediate or scheduled appointments.</p>
                    <p>When you are <strong>OFFLINE</strong>, you will not receive new appointment requests, but you can still manage your existing ones.</p>
                </CardContent>
            </Card>

            <div className="p-8 rounded-[2rem] bg-secondary/10 border-2 border-dashed border-secondary/20">
                <p className="text-xs text-secondary-foreground font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4" /> 
                    Last updated: Just now
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
