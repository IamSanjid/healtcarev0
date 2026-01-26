import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  PhoneCall, 
  Heart, 
  MapPin, 
  Info,
  ShieldAlert
} from "lucide-react";
import Link from "next/link";

export default function EmergencyPage() {
  const contacts = [
    { title: "University Medical Center", phone: "+880 1234-56789", location: "Block A, Level 1" },
    { title: "Ambulance Support (UIU)", phone: "+880 1234-99999", location: "On-site" },
    { title: "Mental Health Urgent Care", phone: "+880 1234-11111", location: "Student Lounge" },
    { title: "Nearest Hospital (United)", phone: "+880 1911-554433", location: "Gulshan 2" },
  ];

  return (
    <div className="py-10 md:py-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
        <div className="max-w-2xl space-y-4">
          <Badge variant="destructive" className="px-4 py-1.5 flex items-center gap-2 w-fit rounded-full uppercase tracking-widest text-[10px]  shadow-lg shadow-destructive/20">
            <ShieldAlert className="h-3 w-3" /> Emergency Support
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Quick Help in <span className="text-destructive italic">Urgent Situations</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed font-medium">
            If you or someone else is in immediate danger, please use the contacts below or follow the first aid guides.
          </p>
        </div>
        <Card className="w-full md:w-[380px] bg-destructive/5 border-destructive/20 rounded-[2.5rem] shadow-2xl shadow-destructive/5 overflow-hidden md:self-start p-0">
          <div className="bg-destructive text-white px-6 py-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <PhoneCall className="h-5 w-5" /> Quick Dial
            </CardTitle>
          </div>
          <CardContent className="px-6 pb-6">
            <div className="space-y-6">
              {contacts.slice(0, 2).map((c) => (
                <div key={c.phone} className="flex flex-col gap-1 border-b border-destructive/10 pb-4 last:border-0 last:pb-0">
                  <span className="text-xs  uppercase tracking-widest text-muted-foreground">{c.title}</span>
                  <a href={`tel:${c.phone}`} className="text-2xl  text-destructive hover:scale-105 transition-transform inline-block">
                    {c.phone}
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* CPR Guide Section */}
        <div className="lg:col-span-2 space-y-10">
          <h2 className="text-3xl  flex items-center gap-3 tracking-tight">
            <Heart className="h-8 w-8 text-destructive fill-destructive/10" /> Step-by-Step CPR Guide
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { id: "01", title: "Check the Scene", desc: "Make sure the environment is safe for both you and the victim." },
              { id: "02", title: "Check Response", desc: "Tap shoulder and shout \"Are you OK?\". Look for normal breathing." },
              { id: "03", title: "Call for Help", desc: "Call campus security or ambulance immediately or ask someone else to do it." },
              { id: "04", title: "Chest Compressions", desc: "Push hard and fast in the center of the chest (100-120 beats per minute)." }
            ].map((step) => (
              <div key={step.id} className="relative p-8 rounded-[2rem] bg-muted/30 border border-transparent hover:border-destructive/20 transition-all group overflow-hidden">
                <span className="absolute -top-2 -right-0.5 text-8xl  text-destructive/5 group-hover:text-destructive/10 transition-colors">{step.id}</span>
                <h3 className="font-bold text-xl mb-3 relative z-10">{step.title}</h3>
                <p className="text-muted-foreground font-medium text-sm leading-relaxed relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>

          <Card className="bg-primary/5 border-primary/20 rounded-[2.5rem] border-none shadow-none p-4">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-primary ">
                <Info className="h-5 w-5" /> Pro Tip: Stay Calm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed font-medium text-muted-foreground/80">
                The rhythm of the song "Stayin' Alive" is the correct tempo for chest compressions. Keep going until paramedics arrive or an AED is ready.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Hospital Map / Contacts List */}
        <div className="space-y-8">
          <h2 className="text-2xl  tracking-tight">Important Contacts</h2>
          <div className="space-y-4">
            {contacts.map((contact) => (
              <Card key={contact.phone} className="border-none bg-muted/40 shadow-none rounded-3xl group hover:bg-white dark:hover:bg-card transition-all">
                <CardHeader className="p-5 flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle className="text-base font-bold">{contact.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1 font-medium italic">
                      <MapPin className="h-3 w-3" /> {contact.location}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-2xl bg-background/50 group-hover:bg-primary group-hover:text-white transition-all shadow-sm" asChild>
                     <a href={`tel:${contact.phone}`}><PhoneCall className="h-4 w-4" /></a>
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="pt-6">
            <h3 className="text-xl  mb-6 flex items-center gap-2 tracking-tight">
              <MapPin className="h-6 w-6 text-primary" /> Nearest Medical Center
            </h3>
            <div className="rounded-[3rem] border-4 border-white dark:border-white/5 shadow-2xl overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d14607.274340335208!2d90.41244!3d23.81290!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1shospitals%20near%20United%20International%20University%20Dhaka!5e0!3m2!1sen!2sbd!4v1234567890123" 
                width="100%" 
                height="400" 
                style={{border: 0}} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
