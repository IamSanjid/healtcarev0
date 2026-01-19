"use client";

import { useTransition } from "react";
import { createPrescription } from "@/lib/actions-health";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { PenTool, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function PrescriptionForm({ formId }: { formId: string }) {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await createPrescription(formData);
      if (result.success) {
        toast.success("Prescription issued successfully!");
      } else {
        toast.error(result.error || "Failed to issue prescription");
      }
    });
  }

  return (
    <Card className="rounded-3xl border-none shadow-xl bg-card border-t-8 border-primary ring-1 ring-primary/5 sticky top-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PenTool className="h-5 w-5 text-primary" />
          Issue Prescription
        </CardTitle>
        <CardDescription>Provide medication and follow-up instructions.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6 text-left">
          <input type="hidden" name="formId" value={formId} />
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Medications</label>
            <Textarea 
                name="medicines"
                required
                className="min-h-[120px] bg-muted/40 border-none rounded-2xl p-4 focus-visible:ring-primary" 
                placeholder="Enter medicine names and doses..." 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Required Tests (Optional)</label>
            <Input 
                name="tests"
                className="bg-muted/40 border-none rounded-xl h-12 px-4 focus-visible:ring-primary" 
                placeholder="Blood tests, X-rays, etc." 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Doctor's Notes</label>
            <Textarea 
                name="notes"
                className="min-h-[80px] bg-muted/40 border-none rounded-2xl p-4 focus-visible:ring-primary" 
                placeholder="Additional instructions..." 
            />
          </div>
          
          <Button 
            className="w-full h-12 rounded-2xl text-base shadow-lg shadow-primary/20 bg-primary hover:scale-[1.02] transition-transform font-bold"
            type="submit"
            disabled={isPending}
          >
            {isPending ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <FileText className="h-5 w-5 mr-2" />}
            {isPending ? "Finalizing..." : "Finalize Prescription"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
