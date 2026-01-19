import { getSession } from "@/lib/auth-utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Activity, 
  BarChart3,
  Server,
  AlertCircle,
  Stethoscope
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminDashboard() {
  const session = await getSession();
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Admin</h1>
        <p className="text-muted-foreground mt-1">High-level overview of university health system performance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground mt-1">+12 today</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-secondary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Verified Doctors</CardTitle>
            <Stethoscope className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-1">03 pending approval</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-accent/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Complaints Today</CardTitle>
            <Activity className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground mt-1">65% resolved</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-muted">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Server Health</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground mt-1 text-green-500 font-medium">Optimal</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 text-left">
        <Card className="lg:col-span-4 border-none shadow-sm bg-card/60 rounded-[2.5rem]">
          <CardHeader className="flex flex-row items-center px-10 pt-10">
            <div className="flex-1 text-left">
              <CardTitle>Doctor Approval Queue</CardTitle>
              <CardDescription>Verify registration requests from medical staff.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="rounded-full">Manage Users</Button>
          </CardHeader>
          <CardContent className="px-10 pb-10 space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-5 rounded-3xl bg-background/50 border border-muted group hover:border-secondary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary">
                    <UserPlus className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Dr. Imran Khan</h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-widest font-bold">Psychiatry • 10m ago</p>
                  </div>
                </div>
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="rounded-xl h-9 border-secondary/20 text-secondary hover:bg-secondary/5">Decline</Button>
                    <Button size="sm" className="rounded-xl h-9 bg-secondary hover:bg-secondary/90 text-white">Approve</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-sm bg-primary/5 rounded-[2.5rem]">
            <CardHeader className="px-10 pt-10 text-left outline-none border-none">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">System Alerts</CardTitle>
                    <BarChart3 className="h-5 w-5 text-primary" />
                </div>
            </CardHeader>
            <CardContent className="px-10 pb-10 space-y-4">
                 <div className="space-y-3">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-background/50 border-l-4 border-accent text-left">
                        <AlertCircle className="h-5 w-5 text-accent mt-0.5" />
                        <div>
                            <p className="text-sm font-bold">New Policy Updated</p>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed text-left">System-wide health data privacy policy updated.</p>
                            <Button size="sm" variant="link" className="p-0 h-auto text-xs font-bold text-accent mt-2">NOTIFY ALL</Button>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-background/50 border-l-4 border-primary text-left">
                        <Users className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                            <p className="text-sm font-bold">High User Traffic</p>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">200+ active sessions detected.</p>
                        </div>
                    </div>
                 </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
