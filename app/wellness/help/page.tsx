import db from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Settings, 
  Calendar, 
  ShieldCheck, 
  MapPin, 
  Stethoscope,
  Sparkles,
  Heart,
  MessageSquare
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default async function SeekHelpPage() {
  // Fetch doctors specialized in mental health related fields
  const psychiatrists = await db.doctor.findMany({
    where: {
      OR: [
        { specialization: { contains: "Psychiatry", mode: "insensitive" } },
        { specialization: { contains: "Mental", mode: "insensitive" } },
        { specialization: { contains: "Psychology", mode: "insensitive" } },
        { specialization: { contains: "Counseling", mode: "insensitive" } },
      ]
    },
    include: {
      user: true
    }
  });

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-4xl space-y-6">
        <Badge variant="outline" className="px-4 py-1.5 border-primary/20 text-primary bg-primary/5 rounded-full font-medium uppercase tracking-widest text-[10px]">
          Confidential Expert Support
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight italic">
          Talk to <span className="text-primary not-italic font-light underline decoration-primary/20 underline-offset-8">a Professional</span>
        </h1>
        <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl italic">
          "Your mental health is just as important as your physical health. Our team of specialists is dedicated to providing a safe, non-judgmental space for you."
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Psychiatrist list */}
        <div className="space-y-6">
           <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-medium tracking-tight flex items-center gap-2">
                 <ShieldCheck className="h-5 w-5 text-primary" /> Verified Specialists
              </h2>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">{psychiatrists.length} Specialists Available</span>
           </div>

           {psychiatrists.length === 0 ? (
             <Card className="border-none shadow-sm bg-muted/30 rounded-[3rem] p-12 text-center">
                <p className="text-muted-foreground font-light italic text-sm">No specialized mental health experts are currently listed in the system. Please contact the main medical center for a referral.</p>
                <Button className="mt-6 rounded-2xl bg-primary" asChild>
                   <Link href="/emergency/phonebook">View Phonebook</Link>
                </Button>
             </Card>
           ) : (
             <div className="grid gap-6">
                {psychiatrists.map((dr) => (
                   <Card key={dr.id} className="border-none shadow-sm bg-white dark:bg-card/50 rounded-[3rem] group hover:shadow-2xl transition-all overflow-hidden border border-transparent hover:border-primary/10">
                      <CardContent className="p-8">
                         <div className="flex items-center gap-6">
                            <Avatar className="h-20 w-20 rounded-[1.8rem] border-4 border-background shadow-lg transition-transform group-hover:scale-105 duration-500">
                               <AvatarFallback className="bg-primary/5 text-primary text-xl font-medium">
                                  {dr.user.name.split(' ').map(n => n[0]).join('')}
                               </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                               <div className="flex items-center justify-between">
                                  <h3 className="text-xl font-medium tracking-tight">Dr. {dr.user.name}</h3>
                                  <Badge className="bg-primary/5 text-primary border-none text-[9px] uppercase tracking-widest font-medium rounded-full px-3 py-1 italic">
                                     {dr.availability}
                                  </Badge>
                               </div>
                               <p className="text-sm text-primary font-medium opacity-80 italic">{dr.specialization}</p>
                               <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-light pt-2">
                                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> UIU Medical Center</span>
                                  <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Verified Specialist</span>
                               </div>
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-muted/30">
                            <Button variant="outline" className="rounded-2xl h-12 gap-2 border-muted hover:bg-muted/50 transition-all font-medium text-xs tracking-widest uppercase italic" asChild>
                               <Link href={`/dashboard/student/messages?to=${dr.userId}`}>Consult Chat</Link>
                            </Button>
                            <Button className="rounded-2xl h-12 gap-2 bg-primary text-white shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all font-medium text-xs tracking-widest uppercase" asChild>
                               <Link href="/dashboard/student/appointments/book">Book Appointment</Link>
                            </Button>
                         </div>
                      </CardContent>
                   </Card>
                ))}
             </div>
           )}
        </div>

        {/* Right: Helpful Info */}
        <div className="space-y-8">
           <Card className="border-none bg-primary rounded-[3rem] p-10 md:p-12 text-primary-foreground relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                 <Heart className="h-64 w-64" />
              </div>
              <div className="relative z-10 space-y-6">
                 <h3 className="text-3xl font-medium tracking-tight leading-tight">Your privacy is <br /> our priority.</h3>
                 <p className="text-primary-foreground/70 font-light italic leading-relaxed">
                    All mental health sessions are strictly confidential. No data is shared with your academic department or family without your explicit consent.
                 </p>
                 <div className="space-y-4 pt-4">
                    {[
                      { icon: ShieldCheck, text: "HIPAA Compliant Data Storage" },
                      { icon: MessageSquare, text: "Private One-on-One Sessions" },
                      { icon: Stethoscope, text: "Board-Certified Psychiatrists" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-medium">
                         <div className="h-6 w-6 rounded-lg bg-white/20 flex items-center justify-center">
                            <item.icon className="h-3.5 w-3.5" />
                         </div>
                         {item.text}
                      </div>
                    ))}
                 </div>
              </div>
           </Card>

           <Card className="border-none shadow-sm bg-white dark:bg-card/50 rounded-[3rem] p-10 space-y-6">
              <h3 className="text-xl font-medium tracking-tight flex items-center gap-2">
                 <Sparkles className="h-5 w-5 text-amber-500" /> What to expect?
              </h3>
              <div className="space-y-6">
                 {[
                   { q: "Initial Consultation", a: "A 45-minute friendly chat where we understand your background and current state." },
                   { q: "Personalized Roadmap", a: "Creating a plan that works with your academic schedule and personal life." },
                   { q: "Ongoing Guidance", a: "Recurring sessions or group therapy based on what makes you feel best." }
                 ].map((step, k) => (
                   <div key={k} className="flex gap-4">
                      <div className="shrink-0 h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-medium">{k+1}</div>
                      <div className="space-y-1">
                         <p className="text-sm font-medium">{step.q}</p>
                         <p className="text-xs text-muted-foreground font-light italic">{step.a}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
