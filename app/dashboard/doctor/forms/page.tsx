import db from "@/lib/db";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileSearch, User, Clock, AlertTriangle, ArrowRight, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

export default async function DoctorFormsPage() {
  const session = await getSession();
  if (!session || session.user.role !== "DOCTOR") {
    redirect("/login");
  }

  const forms = await db.healthForm.findMany({
    include: {
      student: true,
      prescription: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "high": return <Badge variant="outline" className="bg-red-500/10 text-red-600 border-none px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">High Urgency</Badge>;
      case "medium": return <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-none px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Medium</Badge>;
      default: return <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-none px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Routine</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Health Forms</h1>
        <p className="text-muted-foreground italic">"Review student health complaints and provide medical guidance."</p>
      </div>

      <div className="grid gap-4">
        {forms.length === 0 ? (
          <Card className="border-dashed flex flex-col items-center justify-center p-16 text-center bg-muted/20 rounded-3xl">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <FileSearch className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle>No forms submitted yet</CardTitle>
          </Card>
        ) : (
          forms.map((form) => (
            <Card key={form.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all rounded-2xl bg-card border-l-4 group" style={{ borderLeftColor: form.urgency.toLowerCase() === 'high' ? 'rgb(239, 68, 68)' : 'rgb(226, 232, 240)' }}>
              <CardContent className="p-0 flex flex-col md:flex-row items-stretch">
                <div className="p-6 flex-1">
                   <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                         {getUrgencyBadge(form.urgency)}
                         <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {format(form.createdAt, "PP")}
                         </span>
                      </div>
                      {form.prescription ? (
                         <Badge variant="outline" className="bg-green-500/10 text-green-600 border-none gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold">
                            <CheckCircle className="h-3 w-3" />
                            Prescribed
                         </Badge>
                      ) : (
                         <Badge variant="secondary" className="px-3 py-1 rounded-full text-[10px] font-bold opacity-60">Pending Review</Badge>
                      )}
                   </div>

                   <h3 className="text-lg font-bold mb-2 line-clamp-1">{form.symptoms}</h3>
                   
                   <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                         <User className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{form.student.name}</span>
                   </div>
                </div>

                <div className="p-6 bg-muted/20 md:w-48 flex items-center justify-center border-t md:border-t-0 md:border-l border-muted/30">
                   <Button asChild variant="ghost" className="rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all gap-2 h-10 px-6">
                      <Link href={`/dashboard/doctor/forms/${form.id}`}>
                         Review <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                   </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
