"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Dumbbell, 
  GraduationCap, 
  Activity, 
  Target, 
  Flame, 
  Zap, 
  Clock,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WellnessSuccessPage() {
  const categories = [
    {
      title: "Academic Strategy",
      icon: GraduationCap,
      color: "text-blue-500",
      bg: "bg-blue-500/5",
      tips: [
        { title: "Deep Work Blocks", desc: "Schedule 90-minute blocks of no distraction. Your brain needs time to enter 'the zone'." },
        { title: "Active Recall", desc: "Don't just re-read. Test yourself. Close the book and write what you remember." },
        { title: "The 5-Minute Rule", desc: "If you're procrastinating, promise to work for just 5 mins. Usually, you'll continue." }
      ]
    },
    {
      title: "Physical Vigor",
      icon: Dumbbell,
      color: "text-rose-500",
      bg: "bg-rose-500/5",
      tips: [
        { title: "UIU Campus Gym", desc: "Visit the Block A Basement gym. 30 mins of lifting boosts serotonin for hours." },
        { title: "Lake-side Walk", desc: "A 10-minute sun-exposed walk by the university lake resets your circadian rhythm." },
        { title: "Morning Mobility", desc: "5 mins of stretching before classes prevents physical fatigue and brain fog." }
      ]
    },
    {
      title: "Sports & Community",
      icon: Activity,
      color: "text-amber-500",
      bg: "bg-amber-500/5",
      tips: [
        { title: "Join UIU Sports Club", desc: "Playing in a team releases oxytocin and builds resilience against academic stress." },
        { title: "Intra-University Events", desc: "Participating in competitions (even if you lose) builds a growth mindset." },
        { title: "Social Accountability", desc: "Find a 'study and gym' buddy. Committing to someone else keeps you consistent." }
      ]
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-3xl space-y-4">
        <Badge variant="outline" className="px-4 py-1.5 border-primary/20 text-primary bg-primary/5 rounded-full font-medium uppercase tracking-widest text-[10px]">
          Performance & Habits
        </Badge>
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight italic">
          Achieving <span className="text-primary not-italic font-light">Campus Excellence</span>
        </h1>
        <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-xl italic">
          "Success is not just about grades; it's about the harmony between your mind, body, and community."
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <div key={i} className="space-y-6">
            <div className="flex items-center gap-3 px-2">
               <div className={`p-2 rounded-xl ${cat.bg} ${cat.color}`}>
                  <cat.icon className="h-5 w-5" />
               </div>
               <h2 className="text-xl font-medium tracking-tight">{cat.title}</h2>
            </div>
            
            <div className="space-y-4">
               {cat.tips.map((tip, j) => (
                 <Card key={j} className="border-none shadow-sm bg-white dark:bg-card/50 rounded-[2rem] hover:ring-2 hover:ring-primary/5 transition-all group overflow-hidden">
                    <CardHeader className="pb-2">
                       <CardTitle className="text-base font-medium">{tip.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-xs text-muted-foreground leading-relaxed font-figtree font-light italic opacity-80">{tip.desc}</p>
                    </CardContent>
                 </Card>
               ))}
            </div>
          </div>
        ))}
      </div>

      <Card className="bg-primary rounded-[3.5rem] p-10 md:p-16 text-primary-foreground relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
            <Trophy className="h-48 w-48" />
         </div>
         <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center text-left">
            <div className="space-y-6">
               <h3 className="text-3xl md:text-4xl font-medium tracking-tight leading-tight">Master your time, <br /> master your life.</h3>
               <p className="text-primary-foreground/70 font-light italic leading-relaxed">
                  Most students fail not due to lack of talent, but lack of a system. Start your habit tracking today with our curated templates.
               </p>
               <Button className="bg-white text-primary rounded-2xl h-12 px-8 font-medium hover:scale-105 transition-all shadow-xl shadow-black/10">
                  Join Study Groups
               </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
               {[
                 { label: "Deep Work", val: "4 hrs/day", icon: Target },
                 { label: "Active Recall", icon: Flame },
                 { label: "Sleep Cycle", val: "7.5 hrs", icon: Clock },
                 { label: "Quick Sprint", icon: Zap }
               ].map((stat, k) => (
                 <div key={k} className="p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 flex flex-col gap-2">
                    <stat.icon className="h-5 w-5 opacity-60" />
                    <span className="text-[10px] uppercase font-medium tracking-widest opacity-60">{stat.label}</span>
                    {stat.val && <span className="text-lg font-medium tracking-tight">{stat.val}</span>}
                 </div>
               ))}
            </div>
         </div>
      </Card>
    </div>
  );
}
