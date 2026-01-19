import db from "@/lib/db";
import { getSession } from "@/lib/auth-utils";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, ClipboardList, CheckCircle, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import PrescriptionForm from "./prescription-form";

export default async function FormDetailPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  const { id } = await params;
  
  if (!session || session.user.role !== "DOCTOR") {
    redirect("/login");
  }

  const form = await db.healthForm.findUnique({
    where: { id },
    include: {
      student: true,
      prescription: true,
    },
  });

  if (!form) notFound();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <Link href="/dashboard/doctor/forms" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
         <ArrowLeft className="h-4 w-4" /> Back to Forms
      </Link>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 space-y-6">
           <Card className="rounded-3xl border-none shadow-sm overflow-hidden bg-card">
              <CardHeader className="border-b bg-muted/20">
                 <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-none">Patient Intake</Badge>
                    <span className="text-xs text-muted-foreground">{format(form.createdAt, "PPP")}</span>
                 </div>
                 <CardTitle className="text-2xl mt-2">{form.student.name}</CardTitle>
                 <CardDescription>{form.student.email}</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                 <div className="grid gap-6">
                    <div className="space-y-2">
                       <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          <ClipboardList className="h-3.5 w-3.5" /> Reported Symptoms
                       </h4>
                       <div className="p-6 rounded-2xl bg-muted/30 text-lg leading-relaxed italic">
                          "{form.symptoms}"
                       </div>
                    </div>

                    <div className="flex gap-8">
                       <div className="space-y-1">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Urgency Level</h4>
                          <p className={`font-bold ${form.urgency.toLowerCase() === 'high' ? 'text-red-500' : 'text-primary'}`}>
                             {form.urgency.toUpperCase()}
                          </p>
                       </div>
                       <div className="space-y-1">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</h4>
                          <p className="font-bold">General Checkup</p>
                       </div>
                    </div>
                 </div>
              </CardContent>
           </Card>

           {form.prescription && (
              <Card className="rounded-3xl border-none shadow-md bg-green-500/5 ring-1 ring-green-500/20 overflow-hidden">
                 <CardHeader className="bg-green-500/10 flex flex-row items-center gap-3 py-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <CardTitle className="text-lg text-green-700">Prescription Issued</CardTitle>
                 </CardHeader>
                 <CardContent className="p-6 space-y-4">
                    <div className="text-left">
                       <h5 className="text-xs font-bold uppercase tracking-widest text-green-800/60 mb-2">Medicines</h5>
                       <p className="text-sm border-l-2 border-green-200 pl-3 py-1 font-medium">{form.prescription.medicines}</p>
                    </div>
                    {form.prescription.tests && (
                       <div className="text-left">
                          <h5 className="text-xs font-bold uppercase tracking-widest text-green-800/60 mb-2">Required Tests</h5>
                          <p className="text-sm border-l-2 border-green-200 pl-3 py-1 font-medium">{form.prescription.tests}</p>
                       </div>
                    )}
                    {form.prescription.notes && (
                        <div className="text-left">
                            <h5 className="text-xs font-bold uppercase tracking-widest text-green-800/60 mb-2">Notes</h5>
                            <p className="text-sm border-l-2 border-green-200 pl-3 py-1 font-medium italic">{form.prescription.notes}</p>
                        </div>
                    )}
                 </CardContent>
              </Card>
           )}
        </div>

        {!form.prescription && (
          <aside className="w-full md:w-[400px]">
             <PrescriptionForm formId={form.id} />
          </aside>
        )}
      </div>
    </div>
  );
}
