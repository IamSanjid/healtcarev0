import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { Badge } from "@/components/ui/badge";
import { 
  Stethoscope, 
  Calendar, 
  PhoneCall, 
  Heart,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />

        {/* Services Section */}
        <section className="py-32 container px-6 mx-auto max-w-7xl">
          <div className="text-center mb-20 space-y-6">
            <Badge variant="outline" className="rounded-full px-5 py-1.5 border-primary/30 text-primary  uppercase tracking-widest text-[10px] bg-primary/5">
              Service Excellence
            </Badge>
            <h2 className="text-4xl md:text-6xl  tracking-tighter leading-tight">
              Comprehensive Care for <br /> 
              <span className="text-gradient">the UIU Family</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
              We provide a seamless digital health experience, connecting students and staff with certified campus physicians.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                title: "Digital Consultation", 
                desc: "Submit your symptoms and receive instant prescriptions directly from our campus doctors.",
                icon: Stethoscope,
                color: "bg-blue-600",
                link: "/dashboard/student/complaints"
              },
              { 
                title: "Appointment Booking", 
                desc: "Skip the queue by booking physical or remote sessions with available specialists instantly.",
                icon: Calendar,
                color: "bg-violet-600",
                link: "/dashboard/student/appointments/book"
              },
              { 
                title: "Emergency Support", 
                desc: "Immediate access to university medical center contacts and local ambulance services.",
                icon: PhoneCall,
                color: "bg-rose-600",
                link: "/emergency"
              }
            ].map((s, idx) => (
              <div key={idx} className="group relative p-10 rounded-[3.5rem] bg-muted/20 border-2 border-transparent hover:border-primary/10 hover:bg-white dark:hover:bg-card hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 text-left">
                <div className={`h-16 w-16 rounded-[1.8rem] ${s.color} text-white flex items-center justify-center mb-8 shadow-xl shadow-${s.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                  <s.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl  mb-4 tracking-tight">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium mb-8">
                  {s.desc}
                </p>
                <Link href={s.link} className="flex items-center gap-2 text-sm  text-primary group-hover:gap-4 transition-all uppercase tracking-widest">
                  Explore Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Help Banner */}
        <section className="pb-32 px-6 container mx-auto max-w-6xl">
           <div className="relative overflow-hidden p-12 md:p-20 rounded-[4rem] bg-primary text-primary-foreground text-center shadow-2xl shadow-primary/30 group">
              <div className="absolute top-0 right-0 p-20 opacity-10 group-hover:scale-150 transition-transform duration-[3s]">
                 <Heart className="h-64 w-64 fill-white" />
              </div>
              <div className="relative z-10 space-y-8">
                 <h3 className="text-4xl md:text-5xl  tracking-tighter max-w-3xl mx-auto leading-tight">
                    Your health doesn't wait. <br /> Neither do our doctors.
                 </h3>
                 <p className="text-primary-foreground/80 text-xl font-medium max-w-xl mx-auto leading-relaxed">
                    Join over 2,000 UIU students who manage their medical needs through our secure platform.
                 </p>
                 <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/register" className="h-14 px-10 bg-white text-primary rounded-2xl  text-lg flex items-center justify-center hover:scale-105 transition-all active:scale-95 shadow-xl shadow-black/10">
                       Get Started for Free
                    </Link>
                    <Link href="/doctors" className="h-14 px-10 border-2 border-white/30 text-white rounded-2xl  text-lg flex items-center justify-center hover:bg-white/10 transition-all backdrop-blur-sm">
                       Find a Specialist
                    </Link>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <footer className="bg-muted/5 border-t border-border/50 py-20 selection:bg-primary/10">
        <div className="container px-6 mx-auto max-w-7xl grid md:grid-cols-4 gap-16">
          <div className="col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-[1.2rem] bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Heart className="h-6 w-6 fill-white" />
              </div>
              <span className="text-2xl  tracking-tighter">UIU Health</span>
            </div>
            <p className="text-muted-foreground max-w-md font-medium text-lg leading-relaxed">
              Serving the UIU community with excellence in healthcare since 2026. Your university medical portal for every urgent need.
            </p>
          </div>
          <div>
            <h4 className=" mb-8 uppercase tracking-widest text-xs text-primary">Healthcare</h4>
            <ul className="space-y-5 text-sm font-bold text-muted-foreground">
              <li><Link href="/doctors" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Medical Specialists</Link></li>
              <li><Link href="/emergency" className="hover:text-primary transition-colors hover:translate-x-1 inline-block text-destructive">Emergency Care</Link></li>
              <li><Link href="/resources" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Student Resources</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Common Questions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className=" mb-8 uppercase tracking-widest text-xs text-primary">Contact UIU</h4>
            <ul className="space-y-5 text-sm font-bold text-muted-foreground">
               <li className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase opacity-50">Support Email</span>
                  healthcenter@uiu.ac.bd
               </li>
               <li className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase opacity-50">Emergency Hotline</span>
                  +880 1234-56789
               </li>
               <li className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase opacity-50">Physical Center</span>
                  Block A, UIU Campus
               </li>
            </ul>
          </div>
        </div>
        <div className="container px-6 mx-auto max-w-7xl pt-20 border-t border-border/50 mt-20 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px]  uppercase tracking-[0.2em] text-muted-foreground/40">
           <p>© 2026 United International University. Medical Division.</p>
           <div className="flex gap-10">
              <Link href="#" className="hover:text-primary">Policy</Link>
              <Link href="#" className="hover:text-primary">Terms</Link>
              <Link href="#" className="hover:text-primary">Accessibility</Link>
           </div>
        </div>
      </footer>
    </div>
  );
}
