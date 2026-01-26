"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  HeartPulse, 
  Flame, 
  Wind, 
  Droplets, 
  Stethoscope,
  Info,
  ChevronRight,
  Search
} from "lucide-react";
import { useState } from "react";

const guides = [
  {
    id: "cpr",
    title: "CPR (Adult)",
    icon: HeartPulse,
    color: "text-rose-500",
    bg: "bg-rose-500/5",
    steps: [
      { id: "01", title: "Check Scene", desc: "Ensure safety for you and the victim." },
      { id: "02", title: "Check Response", desc: "Tap shoulder and shout. Check breathing." },
      { id: "03", title: "Call for Help", desc: "Call 999 or campus medical team." },
      { id: "04", title: "Compressions", desc: "Push hard & fast (100-120 bpm) in center of chest." }
    ]
  },
  {
    id: "burns",
    title: "Burn Injuries",
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-orange-500/5",
    steps: [
      { id: "01", title: "Stop the Burn", desc: "Remove heat source. For chemicals, flush with water." },
      { id: "02", title: "Cool", desc: "Run cool (not cold) tap water for 10-20 mins." },
      { id: "03", title: "Protect", desc: "Cover with loose sterile bandage or plastic wrap." },
      { id: "04", title: "Never", desc: "Do not apply ice, butter, or ointments to the burn." }
    ]
  },
  {
    id: "choking",
    title: "Choking (Heimlich)",
    icon: Wind,
    color: "text-blue-500",
    bg: "bg-blue-500/5",
    steps: [
      { id: "01", title: "Assess", desc: "Ask \"Are you choking?\". Can they cough/speak?" },
      { id: "02", title: "Give 5 Back Blows", desc: "Hit firmly between shoulder blades with palm." },
      { id: "03", title: "Give 5 Abdominal Thrusts", desc: "Pull inward and upward above the navel." },
      { id: "04", title: "Repeat", desc: "Repeat 5-and-5 until object is clear or help arrives." }
    ]
  },
  {
    id: "fainting",
    title: "Fainting / Heatstroke",
    icon: Droplets,
    color: "text-amber-500",
    bg: "bg-amber-500/5",
    steps: [
      { id: "01", title: "Lie Down", desc: "Place person on their back. Elevate legs 12 inches." },
      { id: "02", title: "Loosen Clothing", desc: "Loosen belts, collars, or tight garments." },
      { id: "03", title: "Monitor", desc: "Check breathing. Ensure plenty of fresh air." },
      { id: "04", title: "Recovery", desc: "If vomiting, turn person on their side." }
    ]
  }
];

export default function FirstAidPage() {
  const [search, setSearch] = useState("");

  const filteredGuides = guides.filter(g => 
    g.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-4">
          <Badge variant="outline" className="text-primary border-primary/20 rounded-full px-4 py-1 font-medium">Encyclopedia</Badge>
          <h1 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl italic">
            First Aid <span className="text-destructive font-light underline decoration-destructive/20 underline-offset-8">Guides</span>
          </h1>
          <p className="text-lg text-muted-foreground font-light max-w-xl leading-relaxed">
            Quick, actionable instructions for common medical emergencies. Read these carefully or use them as a reference in a crisis.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search guides..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-card border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 transition-all font-light"
          />
        </div>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        {filteredGuides.map((guide) => (
          <Card key={guide.id} className="border-none bg-white dark:bg-card/50 shadow-sm hover:shadow-xl transition-all rounded-[3rem] overflow-hidden flex flex-col">
            <div className={`p-8 ${guide.bg} flex items-center justify-between`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-white dark:bg-card shadow-sm ${guide.color}`}>
                  <guide.icon className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-medium tracking-tight">{guide.title}</h2>
              </div>
              <ChevronRight className={`h-5 w-5 ${guide.color} opacity-40`} />
            </div>
            
            <CardContent className="p-10 flex-1 flex flex-col gap-8">
              <div className="grid gap-6">
                {guide.steps.map((step) => (
                  <div key={step.id} className="flex gap-5 group">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center text-xs font-medium text-muted-foreground group-hover:bg-destructive group-hover:text-white transition-colors">
                      {step.id}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg leading-none mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-none rounded-[3rem] p-10 mt-16">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="h-20 w-20 shrink-0 bg-primary text-white rounded-[2rem] flex items-center justify-center shadow-xl shadow-primary/20">
            <Info className="h-10 w-10" />
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-medium tracking-tight text-primary">Pre-Emergency Preparation</h3>
            <p className="text-muted-foreground font-light leading-relaxed max-w-2xl">
              Knowledge is your first line of defense. Consider attending UIU's monthly first aid workshops to get hands-on experience and certification from professional paramedics.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
               <Badge variant="outline" className="rounded-full border-primary/20 text-primary px-4 py-1.5 font-medium">Next Workshop: Oct 30</Badge>
               <Badge variant="outline" className="rounded-full border-primary/20 text-primary px-4 py-1.5 font-medium">Location: Medical Center</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
