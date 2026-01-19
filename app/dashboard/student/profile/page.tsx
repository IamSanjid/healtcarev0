import db from "@/lib/db";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Mail, Shield, Edit, Phone, MapPin, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session || session.user.role !== "STUDENT") {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) redirect("/login");

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground italic">"Manage your personal information and account settings."</p>
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-8">
        <div className="space-y-6">
          <Card className="rounded-3xl border-none shadow-md overflow-hidden bg-card text-center">
            <div className="h-32 bg-gradient-to-br from-primary/20 to-secondary/20" />
            <CardContent className="px-6 pb-8 -mt-16">
              <div className="relative inline-block mb-4">
                <div className="h-32 w-32 rounded-3xl bg-background shadow-xl flex items-center justify-center p-1 ring-4 ring-background">
                  <div className="h-full w-full rounded-2xl bg-muted flex items-center justify-center text-muted-foreground overflow-hidden">
                    <User className="h-16 w-16" />
                  </div>
                </div>
                <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 h-9 w-9 rounded-xl shadow-lg border-4 border-background">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="text-xl font-bold mb-1">{user.name}</h2>
              <Badge variant="secondary" className="rounded-full px-3 py-1 bg-primary/10 text-primary border-none mb-4 uppercase text-[10px] tracking-widest font-bold">
                {user.role}
              </Badge>
              <div className="text-sm text-muted-foreground space-y-2">
                <p className="flex items-center justify-center gap-2"><Mail className="h-3 w-3" /> {user.email}</p>
                <p className="flex items-center justify-center gap-2 text-[10px] opacity-70"><Shield className="h-3 w-3" /> UID: {user.id.slice(0, 8)}...</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-none shadow-sm bg-primary/5">
             <CardContent className="p-4 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary/70">Academic Info</h4>
                <div className="space-y-3">
                   <div className="flex items-center gap-3">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <div className="text-xs">
                         <p className="font-bold">United International University</p>
                         <p className="text-muted-foreground">Computer Science & Engineering</p>
                      </div>
                   </div>
                </div>
             </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-3xl border-none shadow-sm bg-card">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-lg">Personal Information</CardTitle>
              <CardDescription>Update your contact details and basic information.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user.name} className="bg-muted/30 border-none rounded-xl h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue={user.email} disabled className="bg-muted/10 border-none rounded-xl h-11 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                       <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       <Input id="phone" placeholder="+880 1XXX-XXXXXX" className="pl-10 bg-muted/30 border-none rounded-xl h-11" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Campus Address</Label>
                    <div className="relative">
                       <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       <Input id="location" placeholder="Aged 3, Room 402..." className="pl-10 bg-muted/30 border-none rounded-xl h-11" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <Button variant="outline" className="rounded-xl px-6 h-11">Cancel</Button>
                  <Button className="rounded-xl px-8 h-11 shadow-lg shadow-primary/20">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-none shadow-sm bg-destructive/5 border border-destructive/10">
            <CardHeader>
              <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
              <CardDescription>Actions that cannot be undone.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
               <Button variant="destructive" className="rounded-xl h-11 px-6">Deactivate Account</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
