"use client";

import { login } from "@/lib/actions-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, ArrowLeft, Loader2, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    try {
      const result = await login(formData);
      if (result.success) {
        router.push(`/dashboard/${result.role}`);
      } else {
        setError(result.error || "Invalid credentials");
        setLoading(false);
      }
    } catch (e: any) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  }

  return (
    <div className="h-95vh w-full flex flex-col lg:flex-row bg-white dark:bg-background overflow-hidden selection:bg-secondary/10">
      {/* Left Side: Form */}
      <div className="w-full lg:w-[45%] p-2 lg:p-10 pb-3 flex flex-col items-center lg:items-start relative h-full">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group mb-6">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        <div className="w-full max-w-sm mx-auto lg:mx-0 flex-1 flex flex-col justify-center space-y-1">
          <div className="space-y-3 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
              <div className="p-2 bg-secondary/5 text-secondary rounded-xl">
                <Shield className="h-7 w-7" />
              </div>
              <span className="text-xl font-medium tracking-tight">UIUSPRS</span>
            </div>
            <h1 className="text-4xl font-medium tracking-tight text-foreground">Welcome Back</h1>
           
          </div>

          <div className="p-2 bg-secondary/5 border border-secondary/10 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-secondary font-medium text-xs capitalize">
              <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
              UIU Email Required
            </div>
            <p className="text-[10px] text-muted-foreground font-light">
              Use format: <code className="bg-white dark:bg-card px-1 py-0.5 rounded border">yourname@department.uiu.ac.bd</code>
            </p>
          </div>

          <Card className="border-none shadow-2xl shadow-black/5 dark:shadow-white/5 rounded-[2.5rem] bg-white dark:bg-card/50 overflow-hidden">
             <CardContent className=" space-y-6">
             
               <form action={handleSubmit} className="space-y-4">
                 <div className="space-y-1.5">
                   <Label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">UIU Email Address</Label>
                   <div className="relative">
                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <Input 
                       name="email" 
                       type="email" 
                       placeholder="name@uiu.ac.bd" 
                       required 
                       className="h-12 pl-12 rounded-2xl bg-muted/30 border-none focus-visible:ring-secondary/20 text-sm font-light"
                     />
                   </div>
                 </div>

                 <div className="space-y-1.5">
                   <div className="flex justify-between items-center px-1">
                     <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Password</Label>
                     <Link href="#" className="text-[10px] text-secondary font-medium hover:underline">Forgot?</Link>
                   </div>
                   <div className="relative">
                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <Input 
                       name="password" 
                       type="password" 
                       required 
                       className="h-12 pl-12 rounded-2xl bg-muted/30 border-none focus-visible:ring-secondary/20 text-sm font-light"
                     />
                   </div>
                 </div>

                 {error && (
                   <div className="p-3 bg-destructive/5 border border-destructive/10 text-destructive text-xs rounded-xl font-light">
                     {error}
                   </div>
                 )}

                 <Button 
                   type="submit" 
                   className="w-full h-12 rounded-2xl text-sm font-medium bg-secondary hover:bg-secondary/90 text-white shadow-xl shadow-secondary/10 transition-all active:scale-95" 
                   disabled={loading}
                 >
                   {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Sign In"}
                 </Button>

                 
               </form>

               <div className="pt-2 text-center space-y-1">
                  <p className="text-[10px] text-muted-foreground font-light">
                    Secured by <span className="font-medium">Antigravity Auth</span>
                  </p>
                  <p className="text-[9px] text-secondary font-medium uppercase tracking-widest">
                    Development Mode
                  </p>
               </div>
             </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground font-light">
            Don't have an account? <Link href="/register" className="text-secondary font-medium hover:underline">Join the community</Link>
          </p>
        </div>
      </div>

      {/* Right Side: Visuals */}
      <div className="hidden lg:flex w-full lg:w-[55%] bg-linear-to-br from-[#1e3a8a] via-[#1e40af] to-[#1e1b4b] p-12 flex-col justify-between text-white relative overflow-hidden m-4 rounded-[3rem] h-[calc(100vh-7rem)]">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 space-y-4">
          <h2 className="text-3xl font-medium tracking-tighter leading-none">Join the UIU <br />Community</h2>
          <p className="text-lg text-white/70 font-light max-w-md leading-relaxed">
            Transparent reporting system designed by students, for students. Manage your health journey with ease.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
          <div className="space-y-1">
            <div className="text-3xl font-medium">1000+</div>
            <div className="text-[10px] text-white/50 uppercase tracking-widest font-medium">Reports Resolved</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-medium">95%</div>
            <div className="text-[10px] text-white/50 uppercase tracking-widest font-medium">Success Rate</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-medium">24/7</div>
            <div className="text-[10px] text-white/50 uppercase tracking-widest font-medium">Available Support</div>
          </div>
        </div>

        <div className="relative z-10 flex gap-4">
          <div className="flex-1 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-3">
             <div className="flex items-center gap-3">
               <div className="h-8 w-8 rounded-full bg-linear-to-tr from-orange-400 to-rose-400 p-0.5">
                  <div className="h-full w-full rounded-full bg-black/20" />
               </div>
               <div>
                 <div className="text-xs font-medium">Sarah Ahmed</div>
                 <div className="text-[9px] text-white/40 uppercase tracking-tight">@sarahcse22</div>
               </div>
             </div>
             <p className="text-xs font-light leading-relaxed text-white/80 italic">
               "The reporting system made it so easy to get my medical issues resolved quickly! Truly a life saver."
             </p>
          </div>

          <div className="flex-1 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-3">
             <div className="flex items-center gap-3">
               <div className="h-8 w-8 rounded-full bg-linear-to-tr from-blue-400 to-indigo-400 p-0.5">
                  <div className="h-full w-full rounded-full bg-black/20" />
               </div>
               <div>
                 <div className="text-xs font-medium">Rafiq Hassan</div>
                 <div className="text-[9px] text-white/40 uppercase tracking-tight">@rafiq.eee23</div>
               </div>
             </div>
             <p className="text-xs font-light leading-relaxed text-white/80 italic">
               "Transparent and efficient. I could track my medical record from start to finish. Highly recommend!"
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
