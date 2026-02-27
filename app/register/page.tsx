"use client";

import { register } from "@/lib/actions-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, ArrowLeft, Loader2, User, Stethoscope, Mail, Lock, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const router = useRouter();

  const validateEmail = (val: string) => {
    setEmail(val);
    if (!val) {
      setEmailError("");
    } else if (!val.toLowerCase().endsWith("uiu.ac.bd")) {
      setEmailError("Must be a valid @uiu.ac.bd email");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (val: string) => {
    setPassword(val);
    if (!val) {
      setPasswordError("");
    } else if (val.length < 8) {
      setPasswordError("Minimum 8 characters required");
    } else {
      setPasswordError("");
    }
  };

  const isFormValid = email.toLowerCase().endsWith("uiu.ac.bd") && password.length >= 8 && email && password;

  async function handleSubmit(formData: FormData) {
    if (!isFormValid) return;
    setLoading(true);
    setError("");
    try {
      const result = await register(formData);
      if (result.success) {
        router.push(`/dashboard/${result.role}`);
      } else {
        setError(result.error || "Failed to create account");
        setLoading(false);
      }
    } catch (e: any) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row bg-white dark:bg-background overflow-hidden selection:bg-secondary/10">
      {/* Left Side: Form */}
      <div className="w-full lg:w-[45%] p-6 lg:p-8 pb-4  flex flex-col items-center lg:items-start relative h-full">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors  ">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        <div className="w-full max-w-sm mx-auto lg:mx-0 flex-1 flex flex-col justify-center space-y-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
              <div className="p-2 bg-secondary/5 text-secondary rounded-xl">
                <Shield className="h-7 w-7" />
              </div>
              <span className="text-xl font-medium tracking-tight">UIUSPRS</span>
            </div>
            <h1 className="text-4xl font-medium tracking-tight text-foreground">Create Account</h1>
            <p className="text-muted-foreground font-light text-base leading-tight">
              Join our university medical community for better care
            </p>
          </div>

          <Card className="border-none shadow-2xl shadow-black/5 dark:shadow-white/5 rounded-[2.5rem] bg-white dark:bg-card/50">
             <CardContent className="p-2 space-y-2">
               <form action={handleSubmit} className="space-y-4 p-4">
                 <div className="flex flex-col gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                      <Input name="name" placeholder="John Doe" required className="h-11 rounded-2xl bg-muted/30 border-none focus-visible:ring-secondary/20 font-light  placeholder-slate-600 placeholder:opacity-50" />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">UIU Email</Label>
                        <Input 
                          name="email" 
                          type="email" 
                          value={email}
                          onChange={(e) => validateEmail(e.target.value)}
                          placeholder="student@uiu.ac.bd" 
                          required 
                          className={cn(
                            "h-11 rounded-2xl bg-muted/30 border-none focus-visible:ring-secondary/20 font-light text-sm",
                            emailError && "ring-1 ring-destructive/50 bg-destructive/5"
                          )} 
                        />
                        {emailError && <p className="text-[10px] text-destructive ml-2 font-medium">{emailError}</p>}
                    </div>
                 </div>

                 <div className="space-y-1.5">
                   <Label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Secure Password</Label>
                   <Input 
                    name="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => validatePassword(e.target.value)}
                    required 
                    className={cn(
                      "h-11 rounded-2xl bg-muted/30 border-none focus-visible:ring-secondary/20 font-light text-sm",
                      passwordError && "ring-1 ring-destructive/50 bg-destructive/5"
                    )}
                   />
                   {passwordError && <p className="text-[10px] text-destructive ml-2 font-medium">{passwordError}</p>}
                 </div>

                 <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Identify as</Label>
                    <RadioGroup name="role" defaultValue="STUDENT" className="grid grid-cols-2 gap-2">
                      <div>
                        <RadioGroupItem value="STUDENT" id="STUDENT" className="peer sr-only" />
                        <Label
                          htmlFor="STUDENT"
                          className="flex items-center gap-2 rounded-2xl border border-muted bg-popover p-3 hover:bg-accent cursor-pointer transition-all font-medium peer-data-[state=checked]:border-secondary peer-data-[state=checked]:bg-secondary/5 text-xs"
                        >
                          <User className="h-3.5 w-3.5" />
                          Student
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="DOCTOR" id="DOCTOR" className="peer sr-only" />
                        <Label
                          htmlFor="DOCTOR"
                          className="flex items-center gap-2 rounded-2xl border border-muted bg-popover p-3 hover:bg-accent cursor-pointer transition-all font-medium peer-data-[state=checked]:border-secondary peer-data-[state=checked]:bg-secondary/5 text-xs"
                        >
                          <Stethoscope className="h-3.5 w-3.5" />
                          Doctor
                        </Label>
                      </div>
                    </RadioGroup>
                 </div>

                 {error && (
                   <div className="p-3 bg-destructive/5 border border-destructive/10 text-destructive text-[11px] rounded-xl font-light">
                     {error}
                   </div>
                 )}

                 <Button 
                   type="submit" 
                   className="w-full h-12 rounded-2xl text-sm font-medium bg-secondary hover:bg-secondary/90 text-white shadow-xl shadow-secondary/10 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" 
                   disabled={loading || !isFormValid}
                 >
                   {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Complete Registration"}
                 </Button>
               </form>
             </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground font-light">
            Already have an account? <Link href="/login" className="text-secondary font-medium hover:underline">Sign in instead</Link>
          </p>
        </div>
      </div>

      {/* Right Side: Visuals */}
      <div className="hidden lg:flex w-full lg:w-[55%] bg-linear-to-br from-[#1e3a8a] via-[#1e40af] to-[#1e1b4b] p-12 flex-col justify-between text-white relative overflow-hidden m-2 rounded-[3rem] h-[calc(100vh-7rem)]">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 space-y-4">
          <h2 className="text-3xl font-medium tracking-tighter leading-none">Modern Health <br />Management</h2>
          <p className="text-lg text-white/70 font-light max-w-md leading-relaxed">
            Register today to get access to 24/7 medical records, online appointments, and specialized doctor consultations.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
          <div className="space-y-1">
            <div className="text-3xl font-medium">500+</div>
            <div className="text-[10px] text-white/50 uppercase tracking-widest font-medium">Verified Doctors</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-medium">10k+</div>
            <div className="text-[10px] text-white/50 uppercase tracking-widest font-medium">Monthly Users</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-medium">10s</div>
            <div className="text-[10px] text-white/50 uppercase tracking-widest font-medium">Average Response</div>
          </div>
        </div>

        <div className="relative z-10 flex gap-6">
           <div className="flex-1 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center gap-6">
              <div className="h-14 w-14 rounded-2xl bg-secondary/20 flex items-center justify-center">
                 <UserPlus className="h-7 w-7 text-secondary" />
              </div>
              <div className="space-y-1">
                 <div className="text-base font-medium">Quick Onboarding</div>
                 <p className="text-[10px] text-white/50 font-light leading-relaxed">Get started in less than 2 minutes with your university credentials.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
