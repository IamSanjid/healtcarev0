"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Library, 
  Film, 
  BookOpen, 
  PlayCircle, 
  Quote, 
  Sparkles,
  ArrowRight,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WellnessLibraryPage() {
  const media = [
    {
      type: "Movies",
      icon: Film,
      color: "text-indigo-500",
      bg: "bg-indigo-500/5",
      items: [
        { title: "Inside Out", desc: "A masterpiece on emotional complexity and the importance of sadness." },
        { title: "Good Will Hunting", desc: "A powerful story about healing, mentorship, and self-discovery." },
        { title: "The Pursuit of Happyness", desc: "A classic tale of grit and staying resilient in the darkest hours." }
      ]
    },
    {
      type: "Books",
      icon: BookOpen,
      color: "text-emerald-500",
      bg: "bg-emerald-500/5",
      items: [
        { title: "Atomic Habits", desc: "The ultimate guide on how tiny changes lead to remarkable results." },
        { title: "Man's Search for Meaning", desc: "Viktor Frankl's insights on finding purpose in suffering." },
        { title: "Quiet: The Power of Introverts", desc: "Understanding the strength of a reflective and quiet mind." }
      ]
    },
    {
      type: "Videos",
      icon: PlayCircle,
      color: "text-rose-500",
      bg: "bg-rose-500/5",
      items: [
        { title: "Brené Brown: Vulnerability", desc: "A TED talk on how embracing our flaws connects us deeper." },
        { title: "The Philosophy of Stoicism", desc: "Quick daily strategies to maintain peace in academic chaos." },
        { title: "Simon Sinek: Your 'Why'", desc: "Finding the motivation behind your university choices." }
      ]
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-3xl space-y-4">
        <Badge variant="outline" className="px-4 py-1.5 border-primary/20 text-primary bg-primary/5 rounded-full font-medium uppercase tracking-widest text-[10px]">
          Inspiration Library
        </Badge>
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight italic">
          Fuel for the <span className="text-primary not-italic font-light">Resilient Soul</span>
        </h1>
        <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-xl italic">
          "Sometimes a single story can change the way you see your entire world. Explore our hand-picked collection."
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {media.map((cat, i) => (
          <div key={i} className="space-y-6">
            <div className="flex items-center gap-3 px-2">
               <div className={`p-2 rounded-xl ${cat.bg} ${cat.color}`}>
                  <cat.icon className="h-5 w-5" />
               </div>
               <h2 className="text-xl font-medium tracking-tight">{cat.type}</h2>
            </div>
            
            <div className="space-y-4">
               {cat.items.map((item, j) => (
                 <Card key={j} className="border-none shadow-sm bg-white dark:bg-card/50 rounded-[2rem] hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer overflow-hidden border-l-4 border-l-transparent hover:border-l-primary/30">
                    <CardHeader className="pb-2">
                       <CardTitle className="text-base font-medium group-hover:text-primary transition-colors">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <p className="text-xs text-muted-foreground leading-relaxed font-light italic opacity-80">"{item.desc}"</p>
                       <Button variant="ghost" className="p-0 h-auto text-[10px] uppercase tracking-widest font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read Review <ArrowRight className="h-3 w-3" />
                       </Button>
                    </CardContent>
                 </Card>
               ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8">
         <Card className="border-none bg-primary/5 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 p-12 opacity-5 pointer-events-none group-hover:scale-150 transition-transform duration-[10s]">
               <Quote className="h-48 w-48 text-primary" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
               <Heart className="h-10 w-10 text-primary mx-auto opacity-40 fill-primary/10" />
               <p className="text-2xl md:text-3xl font-light italic leading-relaxed text-muted-foreground">
                  "The cave you fear to enter holds the treasure you seek. Most of your obstacles are just thoughts."
               </p>
               <div className="h-px w-20 bg-primary/20 mx-auto" />
               <p className="text-[10px] uppercase tracking-[0.4em] font-medium text-primary">Joseph Campbell</p>
            </div>
         </Card>
      </div>

      <div className="flex justify-center pt-8">
         <Button variant="outline" className="rounded-full px-10 h-14 border-muted hover:bg-muted/50 transition-all gap-3 font-medium italic">
            <Sparkles className="h-5 w-5 text-primary" /> Suggest a Resource to the Library
         </Button>
      </div>
    </div>
  );
}
