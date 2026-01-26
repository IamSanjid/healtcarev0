"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bell, 
  Lock, 
  Eye, 
  Smartphone, 
  Globe, 
  ShieldCheck,
  Moon,
  Sun,
  UserCog
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Settings saved successfully");
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl">
      <div>
        <h1 className="text-3xl font-medium tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm font-light italic">"Personalize your health portal experience and security."</p>
      </div>

      <div className="grid gap-8">
        {/* Appearance Section */}
        <section className="space-y-4">
           <div className="flex items-center gap-2 px-1">
              <Eye className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-medium tracking-tight">Appearance</h2>
           </div>
           <Card className="border-none shadow-sm bg-card/60 rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-8 space-y-6">
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <Label className="text-base font-medium">Dark Mode</Label>
                       <p className="text-xs text-muted-foreground font-light">Switch between light and dark theme.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-muted/40 p-1.5 rounded-2xl">
                       <Button 
                         variant={theme === 'light' ? 'default' : 'ghost'} 
                         size="sm" 
                         className="rounded-xl px-4 h-9" 
                         onClick={() => setTheme('light')}
                       >
                         <Sun className="h-4 w-4 mr-2" /> Light
                       </Button>
                       <Button 
                         variant={theme === 'dark' ? 'default' : 'ghost'} 
                         size="sm" 
                         className="rounded-xl px-4 h-9" 
                         onClick={() => setTheme('dark')}
                       >
                         <Moon className="h-4 w-4 mr-2" /> Dark
                       </Button>
                    </div>
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
           <Card className="border-none shadow-sm bg-card/60 rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-8 space-y-8">
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <Label className="text-base font-medium">Email Notifications</Label>
                       <p className="text-xs text-muted-foreground font-light">Receive appointment reminders and prescription updates via email.</p>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                 </div>
                 <div className="h-px bg-muted/50 w-full" />
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <Label className="text-base font-medium">SMS Alerts</Label>
                       <p className="text-xs text-muted-foreground font-light">Get emergency alerts and quick updates on your phone.</p>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                 </div>
                 <div className="h-px bg-muted/50 w-full" />
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <Label className="text-base font-medium">Push Notifications</Label>
                       <p className="text-xs text-muted-foreground font-light">Real-time alerts in your web browser or desktop.</p>
                    </div>
                    <Switch className="data-[state=checked]:bg-primary" />
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
           <Card className="border-none shadow-sm bg-card/60 rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-8 space-y-8">
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <Label className="text-sm font-medium ml-1">Current Password</Label>
                       <Input type="password" placeholder="••••••••" className="h-12 bg-muted/30 border-none rounded-2xl" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <Label className="text-sm font-medium ml-1">New Password</Label>
                          <Input type="password" placeholder="Min 8 characters" className="h-12 bg-muted/30 border-none rounded-2xl" />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-sm font-medium ml-1">Confirm New Password</Label>
                          <Input type="password" placeholder="Repeat new password" className="h-12 bg-muted/30 border-none rounded-2xl" />
                       </div>
                    </div>
                    <Button variant="outline" className="rounded-xl border-primary/20 text-primary h-11 px-6">Change Password</Button>
                 </div>
                 <div className="h-px bg-muted/50 w-full" />
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <Label className="text-base font-medium">Two-Factor Authentication</Label>
                       <p className="text-xs text-muted-foreground font-light">Add an extra layer of security to your account.</p>
                    </div>
                    <Button variant="secondary" className="rounded-xl h-10 px-6 font-medium">Enable 2FA</Button>
                 </div>
              </CardContent>
           </Card>
        </section>

        <div className="pt-4 flex justify-end gap-3">
           <Button variant="ghost" className="rounded-2xl h-14 px-8 font-medium">Reset to Defaults</Button>
           <Button 
             className="rounded-2xl h-14 px-12 font-medium bg-primary text-white shadow-xl shadow-primary/20"
             onClick={handleSave}
             disabled={loading}
           >
             {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save All Settings"}
           </Button>
        </div>
      </div>
    </div>
  );
}

function Loader2({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`animate-spin ${className}`}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
