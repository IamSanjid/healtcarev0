"use client";

import { register } from "@/lib/actions-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HeartPulse, ArrowRight, Loader2, User, Stethoscope } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-lg mx-auto py-12">
      <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden p-1 bg-white dark:bg-card">
        <div className="bg-secondary/5 p-10 text-center space-y-3 rounded-t-[2.8rem]">
          <div className="h-16 w-16 bg-white dark:bg-background rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-2">
            <HeartPulse className="h-10 w-10 text-secondary" />
          </div>
          <CardTitle className="text-3xl font-black tracking-tight">Create Account</CardTitle>
          <CardDescription className="text-base font-medium">Join our university health community</CardDescription>
        </div>
        <CardContent className="pt-10 px-10 pb-6">
          <form action={handleSubmit} className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-bold text-xs uppercase ml-1 opacity-70">Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required className="h-12 rounded-xl bg-muted/40 border-none font-medium px-4" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold text-xs uppercase ml-1 opacity-70">Email</Label>
                <Input id="email" name="email" type="email" placeholder="john@uiu.ac.bd" required className="h-12 rounded-xl bg-muted/40 border-none font-medium px-4" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-bold text-xs uppercase ml-1 opacity-70">Password</Label>
              <Input id="password" name="password" type="password" required className="h-12 rounded-xl bg-muted/40 border-none font-medium px-4" />
            </div>

            <div className="space-y-4">
              <Label className="font-bold text-xs uppercase ml-1 opacity-70">Register as a...</Label>
              <RadioGroup name="role" defaultValue="STUDENT" className="grid grid-cols-2 gap-4">
                <div>
                  <RadioGroupItem value="STUDENT" id="STUDENT" className="peer sr-only" />
                  <Label
                    htmlFor="STUDENT"
                    className="flex flex-col items-center justify-center rounded-2xl border-2 border-muted bg-popover p-5 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-secondary peer-data-[state=checked]:bg-secondary/5 [&:has([data-state=checked])]:border-secondary cursor-pointer transition-all font-bold"
                  >
                    <User className="mb-2 h-7 w-7" />
                    Student
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="DOCTOR" id="DOCTOR" className="peer sr-only" />
                  <Label
                    htmlFor="DOCTOR"
                    className="flex flex-col items-center justify-center rounded-2xl border-2 border-muted bg-popover p-5 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-secondary peer-data-[state=checked]:bg-secondary/5 [&:has([data-state=checked])]:border-secondary cursor-pointer transition-all font-bold"
                  >
                    <Stethoscope className="mb-2 h-7 w-7" />
                    Doctor
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm font-bold p-4 rounded-2xl border border-destructive/20 mb-4">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full h-16 rounded-[2rem] text-lg font-black bg-secondary hover:bg-secondary/90 text-white shadow-xl shadow-secondary/20 transition-all hover:scale-[1.02] active:scale-[0.98]" disabled={loading}>
              {loading ? <Loader2 className="h-6 w-6 animate-spin mr-2" /> : null}
              Create Account <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="pb-10 pt-4 justify-center">
          <p className="text-sm font-medium text-muted-foreground">
            Already have an account? <Link href="/login" className="text-secondary font-black hover:underline">Sign in</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
