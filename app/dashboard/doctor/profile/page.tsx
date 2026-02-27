import db from "@/lib/db";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Mail, Shield, Edit, Phone, MapPin, Stethoscope, Award, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function DoctorProfilePage() {
  const session = await getSession();
  if (!session || session.user.role !== "DOCTOR") {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      doctorProfile: true,
    },
  });

  if (!user || !user.doctorProfile) redirect("/login");

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl">
      <div>
        <h1 className="text-3xl font-medium tracking-tight">Doctor Profile</h1>
        <p className="text-muted-foreground italic font-light">"Manage your professional information and account credentials."</p>
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        <div className="space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-md overflow-hidden bg-white dark:bg-card text-center">
            <div className="h-32 bg-linear-to-br from-primary/20 to-secondary/20" />
            <CardContent className="px-6 pb-8 -mt-16">
              <div className="relative inline-block mb-4">
                <div className="h-32 w-32 rounded-[2rem] bg-background shadow-xl flex items-center justify-center p-1 ring-4 ring-background">
                  <div className="h-full w-full rounded-[1.8rem] bg-muted flex items-center justify-center text-muted-foreground overflow-hidden">
                    <User className="h-16 w-16" />
                  </div>
                </div>
                <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 h-9 w-9 rounded-xl shadow-lg border-4 border-background">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="text-xl font-medium mb-1">Dr. {user.name}</h2>
              <Badge variant="secondary" className="rounded-full px-3 py-1 bg-primary/10 text-primary border-none mb-4 uppercase text-[10px] tracking-widest font-medium">
                {user.doctorProfile.specialization || "Medical Specialist"}
              </Badge>
              <div className="text-sm text-muted-foreground space-y-2 font-light">
                <p className="flex items-center justify-center gap-2"><Mail className="h-3 w-3" /> {user.email}</p>
                <p className="flex items-center justify-center gap-2 text-[10px] opacity-70"><Shield className="h-3 w-3" /> ID: {user.doctorProfile.id.slice(0, 8)}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm bg-primary/5">
             <CardContent className="p-6 space-y-4">
                <h4 className="text-[10px] font-medium uppercase tracking-widest text-primary/70">Professional Info</h4>
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white dark:bg-card text-primary shadow-sm">
                        <Stethoscope className="h-4 w-4" />
                      </div>
                      <div className="text-xs">
                         <p className="font-medium">Specialization</p>
                         <p className="text-muted-foreground font-light">{user.doctorProfile.specialization}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white dark:bg-card text-secondary shadow-sm">
                        <Award className="h-4 w-4" />
                      </div>
                      <div className="text-xs">
                         <p className="font-medium">Experience</p>
                         <p className="text-muted-foreground font-light">Verified Campus Doctor</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white dark:bg-card text-amber-500 shadow-sm">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className="text-xs">
                         <p className="font-medium">Availability</p>
                         <p className="text-muted-foreground font-light uppercase tracking-tighter text-[10px]">{user.doctorProfile.availability}</p>
                      </div>
                   </div>
                </div>
             </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white dark:bg-card">
            <CardHeader className="border-b border-muted/30 pb-6 p-8">
              <CardTitle className="text-xl font-medium">Professional Profile</CardTitle>
              <CardDescription className="font-light italic">Update your medical credentials and contact details.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-medium uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                    <Input id="name" defaultValue={user.name} className="bg-muted/30 border-none rounded-2xl h-12 font-light" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialization" className="text-xs font-medium uppercase tracking-widest text-muted-foreground ml-1">Specialization</Label>
                    <Input id="specialization" defaultValue={user.doctorProfile.specialization} className="bg-muted/30 border-none rounded-2xl h-12 font-light" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-medium uppercase tracking-widest text-muted-foreground ml-1">Medical Hotline</Label>
                    <div className="relative">
                       <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       <Input id="phone" placeholder="+880 1XXX-XXXXXX" className="pl-12 bg-muted/30 border-none rounded-2xl h-12 font-light" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-xs font-medium uppercase tracking-widest text-muted-foreground ml-1">Assigned Clinic</Label>
                    <div className="relative">
                       <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       <Input id="location" placeholder="Block A, Room 102..." className="pl-12 bg-muted/30 border-none rounded-2xl h-12 font-light" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-xs font-medium uppercase tracking-widest text-muted-foreground ml-1">Professional Bio</Label>
                  <textarea 
                    id="bio" 
                    className="w-full min-h-[120px] p-4 bg-muted/30 border-none rounded-3xl font-light text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Describe your medical background..."
                  ></textarea>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <Button variant="ghost" className="rounded-2xl px-8 h-12 font-medium">Cancel</Button>
                  <Button className="rounded-2xl px-12 h-12 shadow-xl shadow-primary/20 bg-primary text-white font-medium">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-destructive/5 border border-destructive/10">
            <CardHeader className="p-8">
              <CardTitle className="text-lg font-medium text-destructive">Account Security</CardTitle>
              <CardDescription className="font-light italic">Critical account management actions.</CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8 pt-0 flex gap-4">
               <Button variant="outline" className="rounded-xl h-11 px-6 font-medium border-destructive/20 text-destructive hover:bg-destructive/5 transition-all">Reset Password</Button>
               <Button variant="destructive" className="rounded-xl h-11 px-6 font-medium">Disable Profile</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
