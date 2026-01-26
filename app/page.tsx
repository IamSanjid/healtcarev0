import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { Badge } from "@/components/ui/badge";
import { 
  Stethoscope, 
  Calendar, 
  PhoneCall, 
  Heart,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/10">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />

        {/* Features Grid */}
        <section className="py-24 lg:py-40 bg-muted/20">
           <div className="container px-6 mx-auto max-w-7xl">
              <div className="grid lg:grid-cols-3 gap-16 items-center">
                 <div className="lg:col-span-1 space-y-6">
                    <Badge variant="outline" className="rounded-full px-4 py-1.5 border-primary/20 text-primary bg-primary/5 uppercase tracking-widest text-[10px] font-medium">Why UIU Health?</Badge>
                    <h2 className="text-4xl lg:text-3xl tracking-tight leading-tight font-medium">
                       Smart Healthcare for <br />
                       <span className="text-primary italic">Smart Students.</span>
                    </h2>
                    <p className="text-muted-foreground text-lg font-light leading-relaxed">
                       We've reimagined campus healthcare. No more long queues or messy paperwork. Everything you need is right here.
                    </p>
                    <div className="space-y-4 pt-4">
                       {[
                         { icon: ShieldCheck, text: "Strictly Private & Encrypted" },
                         { icon: Zap, text: "Instant Dispatch & Response" },
                         { icon: Activity, text: "Integrated Medical History" }
                       ].map((item, i) => (
                         <div key={i} className="flex items-center gap-3 text-sm font-medium">
                            <div className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                               <item.icon className="h-3.5 w-3.5" />
                            </div>
                            {item.text}
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
                    {[
                      { 
                        title: "Digital Consultation", 
                        desc: "Submit your symptoms and receive expert medical advice or prescriptions within minutes from our campus physicians.",
                        icon: Stethoscope,
                        color: "text-primary",
                        bg: "bg-primary/5",
                        link: "/dashboard/student/complaints"
                      },
                      { 
                        title: "Appointment Booking", 
                        desc: "Schedule physical visits or remote video calls with specialists instantly without leaving your current location.",
                        icon: Calendar,
                        color: "text-secondary",
                        bg: "bg-secondary/5",
                        link: "/dashboard/student/appointments/book"
                      },
                      { 
                        title: "Emergency Hub", 
                        desc: "24/7 access to ambulance dispatch, regional hospital contacts, and life-saving first aid guides.",
                        icon: PhoneCall,
                        color: "text-destructive",
                        bg: "bg-destructive/5",
                        link: "/emergency"
                      },
                      { 
                        title: "Medical Records", 
                        desc: "Your entire medical history, prescriptions, and test results organized in one secure dashboard.",
                        icon: Activity,
                        color: "text-amber-500",
                        bg: "bg-amber-500/5",
                        link: "/dashboard/student"
                      },
                      { 
                        title: "Mental Wellness", 
                        desc: "Access our exclusive 'Care Corner' for stress management, psychiatrist appointments, and motivational resources.",
                        icon: Sparkles,
                        color: "text-primary",
                        bg: "bg-primary/5",
                        link: "/wellness"
                      }
                    ].map((s, idx) => (
                      <Card key={idx} className="group p-8 rounded-[3rem] border-none bg-white dark:bg-card hover:shadow-2xl transition-all duration-500 flex flex-col items-start gap-6 cursor-pointer">
                         <div className={`h-14 w-14 rounded-2xl ${s.bg} ${s.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <s.icon className="h-7 w-7" />
                         </div>
                         <div className="space-y-3">
                            <h3 className="text-xl font-medium tracking-tight">{s.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed font-light italic opacity-80">{s.desc}</p>
                         </div>
                         <Button variant="ghost" className={`p-0 h-auto ${s.color} gap-2 hover:bg-transparent text-xs uppercase tracking-widest font-medium mt-auto group-hover:gap-4 transition-all`} asChild>
                            <Link href={s.link}>Learn More <ArrowRight className="h-3 w-3" /></Link>
                         </Button>
                      </Card>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* Immersive CTA Section */}
        <section className="py-24 lg:py-40 bg-background overflow-hidden relative">
           <div className="container px-6 mx-auto max-w-5xl text-center relative z-10 space-y-12">
              <div className="space-y-6">
                 <h2 className="text-5xl lg:text-7xl tracking-tighter leading-none font-medium">
                    Ready to prioritize <br />
                    <span className="text-primary underline decoration-primary/20 underline-offset-8 italic font-light">your well-being?</span>
                 </h2>
                 <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed italic">
                    Join the UIU health network today. It's free for all registered students and faculty members of United International University.
                 </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                 <Button className="h-16 px-12 rounded-[1.8rem] bg-primary text-white text-lg font-medium shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all" asChild>
                    <Link href="/register">Create Portal Account</Link>
                 </Button>
                 <Button variant="outline" className="h-16 px-12 rounded-[1.8rem] border-muted text-lg font-medium hover:bg-muted/50 transition-all italic" asChild>
                    <Link href="/emergency">Crisis Support Hub</Link>
                 </Button>
              </div>
           </div>
           
           {/* Decorative blurred circles - subtle only */}
           <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
           <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
        </section>
      </main>

      <footer className="bg-white dark:bg-card border-t border-muted/30 py-24 selection:bg-primary/5 overflow-hidden">
        <div className="container px-6 mx-auto max-w-7xl grid lg:grid-cols-4 gap-20">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                <Heart className="h-5 w-5 fill-white" />
              </div>
              <span className="text-2xl font-medium tracking-tighter">UIU Healthcare</span>
            </div>
            <p className="text-muted-foreground max-w-md font-light text-lg leading-relaxed italic">
              "Providing excellence and personalized care to the UIU community. Your health is our first and only priority."
            </p>
            <div className="flex gap-4">
               {/* Minimal social placeholders if needed, or just spacers */}
            </div>
          </div>
          
          <div>
            <h4 className="mb-8 uppercase tracking-[0.2em] text-[10px] text-primary font-medium">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium text-muted-foreground/60">
              <li><Link href="/doctors" className="hover:text-primary transition-colors">Medical Specialists</Link></li>
              <li><Link href="/emergency" className="hover:text-destructive transition-colors">Emergency Dispatch</Link></li>
              <li><Link href="/resources" className="hover:text-primary transition-colors">Student Resources</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">Support Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-8 uppercase tracking-[0.2em] text-[10px] text-primary font-medium">University Contact</h4>
            <ul className="space-y-6 text-sm font-medium">
               <li className="flex flex-col gap-1.5">
                  <span className="text-[10px] uppercase opacity-40 font-medium tracking-widest text-muted-foreground">Main Dispatch</span>
                  <p className="text-foreground tracking-tight font-medium">+880 1234-56789</p>
               </li>
               <li className="flex flex-col gap-1.5">
                  <span className="text-[10px] uppercase opacity-40 font-medium tracking-widest text-muted-foreground">Digital Support</span>
                  <p className="text-foreground tracking-tight font-medium">healthcenter@uiu.ac.bd</p>
               </li>
               <li className="flex flex-col gap-1.5">
                  <span className="text-[10px] uppercase opacity-40 font-medium tracking-widest text-muted-foreground">Location</span>
                  <p className="text-foreground tracking-tight opacity-80 font-light">Block A, UIU Main Campus</p>
               </li>
            </ul>
          </div>
        </div>
        
        <div className="container px-6 mx-auto max-w-7xl pt-16 border-t border-muted/20 mt-16 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40 font-medium overflow-hidden">
           <p>© 2026 United International University. Medical Division.</p>
           <div className="flex gap-10">
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Portal Terms</Link>
           </div>
        </div>
      </footer>
    </div>
  );
}

function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`shadow-sm bg-white dark:bg-card border border-muted/20 ${className}`}>
      {children}
    </div>
  );
}
