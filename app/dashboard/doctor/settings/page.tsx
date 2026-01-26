"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bell, 
  Lock, 
  Eye, 
  Smartphone, 
  ShieldCheck,
  Moon,
  Sun,
  Stethoscope,
  Calendar,
  CloudLightning,
  Loader2
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { toast } from "sonner";

export default function DoctorSettingsPage() {
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Doctor preferences updated");
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl">
      <div>
        <h1 className="text-3xl font-medium tracking-tight">System Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm font-light italic">"Configure your workspace, notifications, and professional availability."</p>
      </div>

      <div className="grid gap-10">
        {/* Practice Management */}
        <section className="space-y-4">
           <div className="flex items-center gap-2 px-1">
              <Stethoscope className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-medium tracking-tight">Practice Preferences</h2>
           </div>
           <Card className="border-none shadow-sm bg-white dark:bg-card/60 rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-8 space-y-8">
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <Label className="text-base font-medium">Automatic Availability</Label>
                       <p className="text-xs text-muted-foreground font-light">Set status to Online automatically during your scheduled hours.</p>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                 </div>
                 <div className="h-px bg-muted/50 w-full" />
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <Label className="text-base font-medium">Remote Consultation</Label>
                       <p className="text-xs text-muted-foreground font-light">Allow students to book video-based remote sessions via the portal.</p>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                 </div>
                 <div className="h-px bg-muted/50 w-full" />
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <Label className="text-base font-medium">Emergency Bypass</Label>
                       <p className="text-xs text-muted-foreground font-light">Allow urgent health forms to trigger high-priority alerts on your devices.</p>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                 </div>
              </CardContent>
           </Card>
        </section>

        {/* Notifications Section */}
        <section className="space-y-4">
           <div className="flex items-center gap-2 px-1">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-medium tracking-tight">Notifications</h2>
           </div>
           <Card className="border-none shadow-sm bg-white dark:bg-card/60 rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-8 space-y-8">
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <Label className="text-base font-medium">New Case Alerts</Label>
                       <p className="text-xs text-muted-foreground font-light">Receive notifications for every new health form submitted to you.</p>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                 </div>
                 <div className="h-px bg-muted/50 w-full" />
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <Label className="text-base font-medium">Appointment Reminders</Label>
                       <p className="text-xs text-muted-foreground font-light">Get daily summaries of your scheduled appointments via email.</p>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                 </div>
              </CardContent>
           </Card>
        </section>

        {/* Appearance Section */}
        <section className="space-y-4">
           <div className="flex items-center gap-2 px-1">
              <Eye className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-medium tracking-tight">Appearance</h2>
           </div>
           <Card className="border-none shadow-sm bg-white dark:bg-card/60 rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-8 space-y-6">
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <Label className="text-base font-medium">Visual Theme</Label>
                       <p className="text-xs text-muted-foreground font-light">Switch between light and dark clinical themes.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-muted/40 p-1.5 rounded-2xl">
                       <Button 
                         variant={theme === 'light' ? 'default' : 'ghost'} 
                         size="sm" 
                         className="rounded-xl px-4 h-9 font-medium" 
                         onClick={() => setTheme('light')}
                       >
                         <Sun className="h-4 w-4 mr-2" /> Light
                       </Button>
                       <Button 
                         variant={theme === 'dark' ? 'default' : 'ghost'} 
                         size="sm" 
                         className="rounded-xl px-4 h-9 font-medium" 
                         onClick={() => setTheme('dark')}
                       >
                         <Moon className="h-4 w-4 mr-2" /> Dark
                       </Button>
                    </div>
                 </div>
              </CardContent>
           </Card>
        </section>

        {/* Security Section */}
        <section className="space-y-4">
           <div className="flex items-center gap-2 px-1">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-medium tracking-tight">Security</h2>
           </div>
           <Card className="border-none shadow-sm bg-white dark:bg-card/60 rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-8 space-y-8">
                 <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <Label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">New Password</Label>
                          <Input type="password" placeholder="••••••••" className="h-12 bg-muted/30 border-none rounded-2xl font-light" />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Confirm Password</Label>
                          <Input type="password" placeholder="••••••••" className="h-12 bg-muted/30 border-none rounded-2xl font-light" />
                       </div>
                    </div>
                    <Button variant="outline" className="rounded-xl border-primary/20 text-primary h-11 px-6 font-medium bg-primary/5">Update Security Credentials</Button>
                 </div>
                 <div className="h-px bg-muted/50 w-full" />
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <Label className="text-base font-medium">Digital Signature</Label>
                       <p className="text-xs text-muted-foreground font-light">Use your encrypted digital signature on all issued prescriptions.</p>
                    </div>
                    <Badge className="bg-green-500/10 text-green-600 border-none rounded-full px-3 py-1 font-medium italic">Active</Badge>
                 </div>
              </CardContent>
           </Card>
        </section>

        <div className="pt-6 flex justify-end gap-3">
           <Button variant="ghost" className="rounded-2xl h-14 px-8 font-medium">Discard Changes</Button>
           <Button 
             className="rounded-2xl h-14 px-12 font-medium bg-primary text-white shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
             onClick={handleSave}
             disabled={loading}
           >
             {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <CloudLightning className="h-5 w-5 mr-2" />}
             Save Professional Preferences
           </Button>
        </div>
      </div>
    </div>
  );
}
