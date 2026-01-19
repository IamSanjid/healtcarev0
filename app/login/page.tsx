"use client";

import { login } from "@/lib/actions-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HeartPulse, ArrowRight, Loader2 } from "lucide-react";
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-md mx-auto py-12">
      <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden p-1 bg-white dark:bg-card">
        <div className="bg-primary/5 p-10 text-center space-y-3 rounded-t-[2.8rem]">
          <div className="h-16 w-16 bg-white dark:bg-background rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-2">
            <HeartPulse className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl  tracking-tight">Welcome Back</CardTitle>
          <CardDescription className="text-base font-medium">Login to your student health portal</CardDescription>
        </div>
        <CardContent className="pt-10 px-10 pb-6">
          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold text-sm ml-1 uppercase tracking-widest opacity-70">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="student@uiu.ac.bd" required className="h-14 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20 text-lg font-medium px-6" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <Label htmlFor="password" className="font-bold text-sm uppercase tracking-widest opacity-70">Password</Label>
                <Link href="#" className="text-xs text-primary font-bold hover:underline">Forgot password?</Link>
              </div>
              <Input id="password" name="password" type="password" required className="h-14 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20 text-lg font-medium px-6" />
            </div>
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm font-bold p-4 rounded-2xl border border-destructive/20 animate-shake">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full h-16 rounded-[2rem] text-lg  bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]" disabled={loading}>
              {loading ? <Loader2 className="h-6 w-6 animate-spin mr-2" /> : null}
              Sign In <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="pb-10 pt-4 justify-center">
          <p className="text-sm font-medium text-muted-foreground">
            Don't have an account? <Link href="/register" className="text-primary  hover:underline">Register now</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
