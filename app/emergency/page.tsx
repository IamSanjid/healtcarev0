"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  PhoneCall, 
  ShieldAlert,
  ArrowRight,
  Stethoscope,
  Ambulance,
  MessageSquare,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";

export default function EmergencyOverviewPage() {
  const primaryContacts = [
    { title: "University Medical Dispatch", phone: "+880 1234-99999", type: "Ambulance & Emergency" },
    { title: "On-Campus Security", phone: "+880 1234-56789", type: "Security & Safety" },
    { title: "Mental Health Support", phone: "+880 1234-11111", type: "Urgent Counseling" },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <div className="flex flex-col xl:flex-row justify-between items-start gap-12">
        <div className="max-w-3xl space-y-8">
          <Badge variant="destructive" className="px-5 py-2 flex items-center gap-2 w-fit rounded-full uppercase tracking-widest text-[10px] shadow-2xl shadow-destructive/20 border-none font-medium bg-destructive animate-pulse">
            <ShieldAlert className="h-4 w-4" /> Priority Support Available
          </Badge>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-none italic">
              Emergency <span className="text-destructive font-light not-italic">Assistance</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed font-light max-w-2xl">
              Rapid response tools for students and faculty. If you are experiencing a life-threatening situation, dial the primary dispatch immediately.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/emergency/first-aid">
              <Button className="rounded-full h-16 px-10 text-lg bg-destructive hover:bg-destructive/90 text-white shadow-2xl shadow-destructive/20 transition-all active:scale-95 gap-3">
                <Stethoscope className="h-6 w-6" /> View First Aid
              </Button>
            </Link>
            <Link href="/emergency/phonebook">
              <Button variant="outline" className="rounded-full h-16 px-10 text-lg border-muted-foreground/20 hover:bg-white transition-all gap-3 italic">
                Hospital Contacts <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Contacts Card */}
        <Card className="w-full xl:w-[450px] border-none bg-white dark:bg-card shadow-2xl shadow-black/5 rounded-[3.5rem] overflow-hidden p-1 flex flex-col">
          <div className="bg-destructive text-white p-10 space-y-2 rounded-t-[3.2rem]">
            <CardTitle className="text-2xl flex items-center gap-3 font-medium">
              <PhoneCall className="h-6 w-6" /> Hotline Dispatch
            </CardTitle>
            <p className="text-destructive-foreground/70 text-sm font-light">Direct connection to UIU medical team.</p>
          </div>
          <CardContent className="p-10 space-y-8">
            {primaryContacts.map((contact, i) => (
              <div key={contact.phone} className={`flex flex-col gap-1 ${i !== primaryContacts.length - 1 ? 'border-b border-muted/50 pb-6' : ''}`}>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">{contact.title}</span>
                <div className="flex justify-between items-center group">
                  <a href={`tel:${contact.phone}`} className="text-3xl font-medium text-destructive group-hover:translate-x-1 transition-transform">{contact.phone}</a>
                  <Button size="icon" className="h-10 w-10 rounded-xl bg-destructive/5 text-destructive border-destructive/10 group-hover:bg-destructive group-hover:text-white transition-all shadow-sm">
                    <PhoneCall className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground font-light mt-1 italic opacity-60">{contact.type}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 pt-8">
         <Card className="border-none bg-primary/5 rounded-[3rem] p-8 space-y-4 hover:shadow-xl transition-all cursor-pointer group">
            <div className="h-14 w-14 rounded-2xl bg-white dark:bg-card shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
               <Ambulance className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-medium tracking-tight">Ambulance Services</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">Book a medical transport for non-critical transfers or medical checkups off-campus.</p>
            <Button variant="ghost" className="p-0 h-auto text-primary gap-2 hover:bg-transparent" asChild>
               <Link href="/emergency/phonebook">View Service Providers <ArrowRight className="h-4 w-4" /></Link>
            </Button>
         </Card>

         <Card className="border-none bg-secondary/5 rounded-[3rem] p-8 space-y-4 hover:shadow-xl transition-all cursor-pointer group">
            <div className="h-14 w-14 rounded-2xl bg-white dark:bg-card shadow-sm flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
               <MessageSquare className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-medium tracking-tight">Report a Hazard</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">Seen an unsafe condition on campus? Report it immediately to the safety department.</p>
            <Button variant="ghost" className="p-0 h-auto text-secondary gap-2 hover:bg-transparent">Submit Hazard Report <ArrowRight className="h-4 w-4" /></Button>
         </Card>

         <Card className="border-none bg-amber-500/5 rounded-[3rem] p-8 space-y-4 hover:shadow-xl transition-all cursor-pointer group">
            <div className="h-14 w-14 rounded-2xl bg-white dark:bg-card shadow-sm flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all">
               <AlertTriangle className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-medium tracking-tight">Safety Protocol</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">Understand the campus-wide evacuation and safety protocols for natural disasters.</p>
            <Button variant="ghost" className="p-0 h-auto text-amber-500 gap-2 hover:bg-transparent">Read Protocols <ArrowRight className="h-4 w-4" /></Button>
         </Card>
      </div>
    </div>
  );
}
