"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Smile, 
  Frown, 
  Meh, 
  Zap, 
  CloudRain, 
  Moon, 
  Sun, 
  Wind,
  Brain,
  Coffee,
  Ghost,
  DollarSign,
  Briefcase,
  Users,
  GraduationCap,
  ArrowRight,
  Sparkles,
  Trophy,
  Library
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const stressTypes = [
  { 
    id: "academic", 
    label: "Academic Pressure", 
    icon: GraduationCap, 
    color: "text-blue-500", 
    bg: "bg-blue-500/5",
    advice: "Break your tasks into tiny segments. Use the Pomodoro technique (25min study, 5min break).",
    activity: "Try 10 minutes of focused belly breathing before starting a heavy chapter.",
    tip: "Progress is better than perfection. Aim to finish, not to be flawless.",
    mascotMsg: "I know those exams feel like huge mountains right now. But mountains are just many small stones. Let's tackle one stone at a time, okay?"
  },
  { 
    id: "financial", 
    label: "Financial Stress", 
    icon: DollarSign, 
    color: "text-green-500", 
    bg: "bg-green-500/5",
    advice: "Create a simple monthly budget. Knowing where your money goes reduces anxiety.",
    activity: "Walk to campus or pack a lunch today. Small savings build confidence.",
    tip: "You don't have to carry this alone. Talk to a trusted mentor about budgeting.",
    mascotMsg: "Money talk can be so heavy! Remember, your worth isn't defined by your bank balance. Taking a small step to organize is a big win."
  },
  { 
    id: "career", 
    label: "Career Anxiety", 
    icon: Briefcase, 
    color: "text-purple-500", 
    bg: "bg-purple-500/5",
    advice: "Focus on building skills, not just landing a job. Your journey is unique.",
    activity: "Update one section of your CV today. Just one.",
    tip: "Networking is just making friends who do what you want to do.",
    mascotMsg: "The future is a big place, and it's okay not to have the map yet. You're building the skills you need every single day!"
  },
  { 
    id: "social", 
    label: "Loneliness", 
    icon: Users, 
    color: "text-pink-500", 
    bg: "bg-pink-500/5",
    advice: "Digital connection isn't the same as physical presence. Step outside.",
    activity: "Join a UIU club meeting today. Even if you just listen.",
    tip: "Vulnerability is the bridge to connection. Reach out to one person.",
    mascotMsg: "I'm right here with you! Sometimes the world feels quiet, but there are so many friendly souls at UIU waiting to meet someone just like you."
  },
  { 
    id: "health", 
    label: "Health Concerns", 
    icon: CloudRain, 
    color: "text-amber-500", 
    bg: "bg-amber-500/5",
    advice: "Your body is your home. Listen to its subtle signals.",
    activity: "Drink a glass of water right now and take a walk near the UIU lake.",
    tip: "Sleep is the best meditation. Aim for 7 hours tonight.",
    mascotMsg: "Your body is doing so much for you! Let's give it a little extra love today with some water and a nice deep breath."
  },
  { 
    id: "existential", 
    label: "General Overwhelm", 
    icon: Wind, 
    color: "text-teal-500", 
    bg: "bg-teal-500/5",
    advice: "You are doing your best. Sometimes existing is enough.",
    activity: "Write down 3 things you are grateful for. Right here, right now.",
    tip: "The sky is still blue behind the clouds. This will pass.",
    mascotMsg: "Everything is happening all at once, isn't it? It's okay to press pause. Just breathe with me for a second. You've got this."
  }
];

export default function WellnessOverviewPage() {
  const [selectedStress, setSelectedStress] = useState<typeof stressTypes[0] | null>(null);

  return (
    <div className="relative min-h-[140vh] -m-6 lg:-m-12 p-6 lg:p-12 overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <img 
           src="/wellness_bg.png" 
           alt="Wellness Background" 
           className="w-full h-full object-cover fixed opacity-40 dark:opacity-20" 
         />
         <div className="absolute inset-0 bg-background/30 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 space-y-16 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="max-w-4xl space-y-6">
          <Badge variant="outline" className="px-4 py-1.5 border-primary/20 text-primary bg-primary/10 backdrop-blur-md rounded-full font-medium uppercase tracking-widest text-[10px]">
            Mental Wellness Corner
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-4xl font-medium tracking-tight leading-tight italic">
            Breathe In. <span className="text-primary not-italic font-light">Breathe Out.</span>
          </h1>
          <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl italic">
            "How are you truly feeling today? Take a moment to acknowledge your state. We are here to guide you back to balance."
          </p>
        </div>

        {/* Stress Prompt */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-primary/10 rounded-xl backdrop-blur-md">
                <Brain className="h-6 w-6 text-primary" />
             </div>
             <h2 className="text-2xl font-medium tracking-tight">What's weighing on you?</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stressTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedStress(type)}
                className={cn(
                  "p-6 rounded-[2.5rem] flex flex-col items-center gap-4 transition-all duration-500 border backdrop-blur-sm outline-none",
                  selectedStress?.id === type.id 
                    ? "bg-primary text-white shadow-2xl shadow-primary/30 scale-105 border-primary" 
                    : "bg-white/50 dark:bg-card/30 border-white/20 hover:border-primary/40 hover:bg-white/80 dark:hover:bg-card/50 group"
                )}
              >
                <div className={cn(
                  "h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                  selectedStress?.id === type.id ? "bg-white/20 scale-110" : type.bg + " " + type.color + " group-hover:scale-110"
                )}>
                  <type.icon className="h-6 w-6" />
                </div>
                <span className="text-[10px] uppercase font-medium tracking-widest text-center">{type.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Mascot Interaction Section */}
        <section className="min-h-[300px] flex flex-col items-center justify-center relative py-10">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-4xl w-full">
             {/* Mascot */}
             <motion.div 
               animate={{ 
                 y: [0, -20, 0],
                 rotate: [0, 2, -2, 0]
               }}
               transition={{ 
                 duration: 6, 
                 repeat: Infinity, 
                 ease: "easeInOut" 
               }}
               className="relative shrink-0"
             >
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] opacity-60 -z-10" />
                <img 
                  src="/mascot.png" 
                  alt="Wellness Mascot" 
                  className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
                />
             </motion.div>

             {/* Speech Bubble */}
             <div className="flex-1 relative">
               <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedStress ? selectedStress.id : 'default'}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -30 }}
                    transition={{ type: "spring", damping: 22, stiffness: 120 }}
                    className="bg-white/80 dark:bg-card/80 backdrop-blur-xl p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-white/40 dark:border-white/5 relative"
                  >
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 dark:bg-card/80 backdrop-blur-xl border-l border-b border-white/40 dark:border-white/5 rotate-45 hidden md:block" />
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-white/80 dark:bg-card/80 backdrop-blur-xl border-l border-t border-white/40 dark:border-white/5 rotate-45 md:hidden" />
                    
                    <p className="text-xl md:text-2xl font-light italic leading-relaxed text-foreground antialiased">
                      {selectedStress 
                        ? selectedStress.mascotMsg 
                        : "Hi there! I'm Cloudie. Select a topic above so I can give you some tailored support!"}
                    </p>
                  </motion.div>
               </AnimatePresence>
             </div>
          </div>
        </section>

        {/* Redesigned Useful Info Section */}
        <AnimatePresence>
          {selectedStress && (
            <motion.section 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              <div className="text-center space-y-3">
                 <h3 className="text-3xl font-medium tracking-tight">Your Personalized Healing Path</h3>
                 <p className="text-muted-foreground font-light italic">"Three simple steps to regain your inner peace."</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                 {[
                   { title: "The Strategy", content: selectedStress.advice, icon: Zap, color: "text-primary", bg: "bg-primary/10" },
                   { title: "Relief Activity", content: selectedStress.activity, icon: Coffee, color: "text-secondary", bg: "bg-secondary/10" },
                   { title: "Growth Mindset", content: selectedStress.tip, icon: Sparkles, color: "text-amber-500", bg: "bg-amber-500/10" }
                 ].map((item, idx) => (
                   <div key={idx} className="group relative">
                      <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-secondary/20 to-amber-500/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <Card className="relative border-none bg-white/60 dark:bg-card/40 backdrop-blur-md shadow-xl rounded-[3rem] overflow-hidden hover:-translate-y-2 transition-transform duration-500">
                         <div className={`h-2 w-full ${item.bg.replace('/10', '/40')}`} />
                         <CardHeader className="p-10 pb-4">
                            <div className={`h-14 w-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-6`}>
                               <item.icon className="h-7 w-7" />
                            </div>
                            <CardTitle className="text-2xl font-medium">{item.title}</CardTitle>
                         </CardHeader>
                         <CardContent className="p-10 pt-0">
                            <p className="text-lg text-muted-foreground font-light leading-relaxed italic opacity-90">"{item.content}"</p>
                            <Button variant="ghost" className="mt-8 p-0 h-auto text-xs uppercase tracking-[0.2em] font-medium transition-all group-hover:gap-4 gap-2">
                               Start Practice <ArrowRight className="h-3 w-3" />
                            </Button>
                         </CardContent>
                      </Card>
                   </div>
                 ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Immersive Quick Links */}
        <section className="space-y-8">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-xl backdrop-blur-md">
                 <Sparkles className="h-6 w-6 text-secondary" />
              </div>
              <h2 className="text-2xl font-medium tracking-tight">Expand Your Wellness</h2>
           </div>

           <div className="grid md:grid-cols-2 gap-8">
              <Link href="/wellness/success" className="group">
                 <Card className="border-none bg-linear-to-br from-primary/10 to-primary/5 dark:from-primary/20 backdrop-blur-md rounded-[3.5rem] p-12 flex flex-col items-start gap-8 hover:shadow-2xl transition-all duration-700 relative overflow-hidden h-[400px]">
                    <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000 group-hover:scale-125">
                       <Trophy className="h-64 w-64" />
                    </div>
                    <div className="h-16 w-16 bg-white dark:bg-card rounded-2xl flex items-center justify-center text-primary shadow-xl group-hover:bg-primary group-hover:text-white transition-all">
                       <Trophy className="h-8 w-8" />
                    </div>
                    <div className="space-y-4 max-w-sm">
                       <h3 className="text-3xl font-medium tracking-tight group-hover:text-primary transition-colors">Academic Flow</h3>
                       <p className="text-lg text-muted-foreground font-light leading-relaxed italic opacity-80">
                          Master your study habits and campus life with UIU-specific routines and club activities.
                       </p>
                    </div>
                    <div className="mt-auto flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all">
                       Enter The Flow <ArrowRight className="h-5 w-5" />
                    </div>
                 </Card>
              </Link>

              <Link href="/wellness/library" className="group">
                 <Card className="border-none bg-linear-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 backdrop-blur-md rounded-[3.5rem] p-12 flex flex-col items-start gap-8 hover:shadow-2xl transition-all duration-700 relative overflow-hidden h-[400px]">
                    <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:-rotate-12 transition-transform duration-1000 group-hover:scale-125">
                       <Library className="h-64 w-64" />
                    </div>
                    <div className="h-16 w-16 bg-white dark:bg-card rounded-2xl flex items-center justify-center text-secondary shadow-xl group-hover:bg-secondary group-hover:text-white transition-all">
                       <Library className="h-8 w-8" />
                    </div>
                    <div className="space-y-4 max-w-sm">
                       <h3 className="text-3xl font-medium tracking-tight group-hover:text-secondary transition-colors">Digital Zen</h3>
                       <p className="text-lg text-muted-foreground font-light leading-relaxed italic opacity-80">
                          Escape into curated stories, films, and books designed to soothe the campus-weary mind.
                       </p>
                    </div>
                    <div className="mt-auto flex items-center gap-2 text-secondary font-medium group-hover:gap-4 transition-all">
                       Find Your Zen <ArrowRight className="h-5 w-5" />
                    </div>
                 </Card>
              </Link>
           </div>
        </section>

        {/* Seek Help Banner - Immersive Final CTA */}
        <section className="relative px-12 py-24 md:px-24 md:py-32 rounded-[5rem] overflow-hidden group">
           <div className="absolute inset-0 z-0">
              <img src="/wellness_bg.png" alt="CTA BG" className="w-full h-full object-cover scale-150 group-hover:scale-100 transition-transform duration-[20s]" />
              <div className="absolute inset-0 bg-primary/80 backdrop-blur-lg" />
           </div>
           
           <div className="relative z-10 text-center space-y-10">
              <div className="space-y-4">
                 <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-md border-none rounded-full px-6 py-2 font-medium tracking-widest text-[10px]">
                    PRIVATE & COMPASSIONATE
                 </Badge>
                 <h2 className="text-4xl md:text-6xl text-white tracking-tighter font-medium leading-[1.1]">
                    You don't have to carry <br /> 
                    <span className="italic font-light opacity-80 decoration-white/30 underline underline-offset-8">the world alone.</span>
                 </h2>
              </div>
              <p className="text-xl text-white/70 font-light max-w-2xl mx-auto italic leading-relaxed">
                 Our psychiatrists offer a judgment-free sanctuary. Every session is fully confidential and integrated into the UIU Care ecosystem.
              </p>
              <div className="pt-6">
                 <Button className="h-18 px-14 rounded-[2.5rem] bg-white text-primary text-xl font-medium shadow-[0_20px_60px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all outline-none" asChild>
                    <Link href="/wellness/help">Book Session with Specialist</Link>
                 </Button>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}


