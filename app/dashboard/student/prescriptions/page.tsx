import db from "@/lib/db";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, User } from "lucide-react";
import { format } from "date-fns";

export default async function PrescriptionsPage() {
  const session = await getSession();
  if (!session || session.user.role !== "STUDENT") {
    redirect("/login");
  }

  const prescriptions = await db.prescription.findMany({
    where: {
      form: {
        studentId: session.user.id,
      },
    },
    include: {
      form: true,
      doctor: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Prescriptions</h1>
        <p className="text-muted-foreground italic">"Your medical history and prescribed medications."</p>
      </div>

      {prescriptions.length === 0 ? (
        <Card className="border-dashed flex flex-col items-center justify-center p-12 text-center bg-muted/20 rounded-3xl">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="mb-2">No prescriptions found</CardTitle>
          <CardDescription className="max-w-xs">
            Any prescriptions issued by doctors after your consultations will appear here.
          </CardDescription>
        </Card>
      ) : (
        <div className="grid gap-6">
          {prescriptions.map((prescription) => (
            <Card key={prescription.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow rounded-2xl bg-card">
              <div className="bg-primary/5 px-6 py-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                    Reported Complaint
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(prescription.createdAt, "PPP")}
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="h-8 gap-1.5 rounded-full">
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </Button>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Prescribed Medicines</h4>
                      <div className="bg-muted/30 p-4 rounded-xl text-sm leading-relaxed whitespace-pre-wrap">
                        {prescription.medicines}
                      </div>
                    </div>
                    {prescription.tests && (
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Required Tests</h4>
                        <div className="bg-muted/30 p-4 rounded-xl text-sm leading-relaxed whitespace-pre-wrap">
                          {prescription.tests}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Doctor's Notes</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {prescription.notes || "No additional notes provided."}
                      </p>
                    </div>
                    <div className="pt-4 border-t flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{prescription.doctor?.user.name || "Unknown Doctor"}</p>
                        <p className="text-xs text-muted-foreground">{prescription.doctor?.specialization}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
