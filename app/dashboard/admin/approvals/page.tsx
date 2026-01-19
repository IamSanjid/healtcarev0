import db from "@/lib/db";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, User, ShieldCheck, Mail, GraduationCap, MapPin } from "lucide-react";

export default async function AdminApprovalsPage() {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const pendingDoctors = await db.doctor.findMany({
    where: { approved: false },
    include: {
      user: true,
    },
    orderBy: {
      user: { createdAt: "desc" },
    },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Doctor Approvals</h1>
        <p className="text-muted-foreground italic">"Verify and authorize medical professionals to join the platform."</p>
      </div>

      {pendingDoctors.length === 0 ? (
        <Card className="border-dashed flex flex-col items-center justify-center p-16 text-center bg-muted/20 rounded-3xl">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <ShieldCheck className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="mb-2">No pending approvals</CardTitle>
          <CardDescription className="max-w-xs">
            All doctors currently registered have been verified and approved.
          </CardDescription>
        </Card>
      ) : (
        <div className="grid gap-6">
          {pendingDoctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden border-none shadow-md rounded-3xl bg-card">
              <CardContent className="p-0 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-muted/30">
                {/* Profile Brief Section */}
                <div className="p-8 lg:w-80 flex flex-col items-center justify-center bg-primary/5 text-center shrink-0">
                  <div className="h-24 w-24 rounded-3xl bg-background shadow-xl flex items-center justify-center p-1 mb-4 ring-4 ring-primary/10">
                    <div className="h-full w-full rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
                      <User className="h-10 w-10" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{doctor.user.name}</h3>
                  <Badge variant="secondary" className="px-3 py-1 rounded-full bg-primary/10 text-primary border-none uppercase text-[10px] tracking-widest font-bold">
                    {doctor.specialization}
                  </Badge>
                </div>

                {/* Details Section */}
                <div className="p-8 flex-1 space-y-6">
                   <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                         <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Contact Details</h4>
                         <div className="space-y-3">
                            <p className="text-sm flex items-center gap-2.5 font-medium"><Mail className="h-4 w-4 text-primary" /> {doctor.user.email}</p>
                            <p className="text-sm flex items-center gap-2.5 font-medium text-muted-foreground"><ShieldCheck className="h-4 w-4" /> BMDC License: P-XXXXX</p>
                         </div>
                      </div>
                      <div className="space-y-4">
                         <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Academic Background</h4>
                         <div className="space-y-3">
                            <p className="text-sm flex items-center gap-2.5 font-medium"><GraduationCap className="h-4 w-4 text-primary" /> MBBS, UIU Medical College</p>
                            <p className="text-sm flex items-center gap-2.5 font-medium text-muted-foreground"><MapPin className="h-4 w-4" /> Chamber 4, Zone B</p>
                         </div>
                      </div>
                   </div>
                   <div className="pt-4 border-t border-muted/30">
                      <p className="text-xs text-muted-foreground leading-relaxed italic max-w-2xl">
                         "The above professional has provided certificates and identification. Please verify the credentials across the official database before approving access."
                      </p>
                   </div>
                </div>

                {/* Actions Section */}
                <div className="p-8 lg:w-56 flex flex-col justify-center gap-3 shrink-0 bg-muted/5">
                   <Button className="w-full rounded-xl h-12 bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20 gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Approve
                   </Button>
                   <Button variant="outline" className="w-full rounded-xl h-11 border-destructive/20 text-destructive hover:bg-destructive/10 gap-2">
                      <XCircle className="h-5 w-5" />
                      Reject
                   </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
