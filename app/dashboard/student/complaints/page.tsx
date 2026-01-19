"use client";

import { submitHealthForm } from "@/lib/actions-health";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  AlertTriangle, 
  Send, 
  History,
  Info,
  Thermometer,
  ShieldAlert,
  Loader2
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useTransition } from "react";
import { toast } from "sonner";

export default function HealthComplaints() {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await submitHealthForm(formData);
      if (result.success) {
        toast.success("Health complaint submitted successfully!");
        (document.getElementById("complaint-form") as HTMLFormElement)?.reset();
      } else {
        toast.error(result.error || "Failed to submit complaint");
      }
    });
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Health Complaints</h1>
          <p className="text-muted-foreground mt-1">Submit your health issues directly to the medical staff.</p>
        </div>
        <Button variant="outline" className="rounded-xl gap-2 font-semibold border-muted shadow-sm">
            <History className="h-4 w-4" /> My Submissions
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <Card className="lg:col-span-3 border-none shadow-2xl rounded-[2.5rem] overflow-hidden p-1">
          <div className="bg-primary/5 p-8 text-center sm:text-left rounded-t-[2.2rem]">
            <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-6 w-6 text-primary" /> New Symptoms Report
            </CardTitle>
            <CardDescription className="mt-2 leading-relaxed">Provide detail to help the doctor understand your condition.</CardDescription>
          </div>
          <CardContent className="pt-8 px-8 pb-10 space-y-6 text-left">
            <form action={handleSubmit} id="complaint-form" className="space-y-6">
                <div className="space-y-3">
                    <Label htmlFor="symptoms" className="text-sm font-bold flex items-center gap-2">
                        How are you feeling?
                    </Label>
                    <Textarea 
                        id="symptoms"
                        name="symptoms"
                        placeholder="Describe your symptoms (e.g. fever, headache since morning)..." 
                        className="min-h-[150px] rounded-2xl bg-muted/20 border-none p-4"
                        required
                    />
                </div>

                <div className="space-y-4">
                    <Label className="text-sm font-bold">Urgency Level</Label>
                    <RadioGroup defaultValue="NORMAL" name="urgency" className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                         <div className="relative">
                            <RadioGroupItem value="NORMAL" id="normal" className="peer sr-only" />
                            <Label htmlFor="normal" className="flex items-center gap-3 p-4 rounded-2xl border-2 border-muted cursor-pointer hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all">
                                <div className="h-4 w-4 rounded-full bg-primary/20" />
                                <div>
                                    <p className="font-bold text-sm">Normal</p>
                                    <p className="text-[10px] text-muted-foreground">General checkup</p>
                                </div>
                            </Label>
                         </div>
                         <div className="relative">
                            <RadioGroupItem value="URGENT" id="urgent" className="peer sr-only" />
                            <Label htmlFor="urgent" className="flex items-center gap-3 p-4 rounded-2xl border-2 border-muted cursor-pointer hover:bg-accent peer-data-[state=checked]:border-secondary peer-data-[state=checked]:bg-secondary/5 transition-all">
                                <div className="h-4 w-4 rounded-full bg-secondary/20" />
                                <div>
                                    <p className="font-bold text-sm">Urgent</p>
                                    <p className="text-[10px] text-muted-foreground">Needs attention</p>
                                </div>
                            </Label>
                         </div>
                         <div className="relative">
                            <RadioGroupItem value="EMERGENCY" id="emergency" className="peer sr-only" />
                            <Label htmlFor="emergency" className="flex items-center gap-3 p-4 rounded-2xl border-2 border-muted cursor-pointer hover:bg-accent peer-data-[state=checked]:border-destructive peer-data-[state=checked]:bg-destructive/5 transition-all">
                                <div className="h-4 w-4 rounded-full bg-destructive/20" />
                                <div>
                                    <p className="font-bold text-sm text-destructive">Serious</p>
                                    <p className="text-[10px] text-muted-foreground">Pain or distress</p>
                                </div>
                            </Label>
                         </div>
                    </RadioGroup>
                </div>

                <div className="pt-4">
                    <Button className="w-full h-12 rounded-xl text-md font-bold shadow-lg" type="submit" disabled={isPending}>
                        {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="mr-2 h-4 w-4" />}
                        {isPending ? "Submitting..." : "Submit Complaint"}
                    </Button>
                </div>
            </form>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6 text-left">
            <Card className="border-none bg-destructive/5 border-l-4 border-l-destructive rounded-none rounded-r-3xl">
                <CardHeader className="p-6">
                    <CardTitle className="text-xl text-destructive flex items-center gap-2">
                        <ShieldAlert className="h-5 w-5" /> Emergency Note
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                    <p className="text-sm text-destructive/80 leading-relaxed">
                        If you are experiencing chest pain or difficulty breathing, call the campus medical line.
                    </p>
                    <div className="mt-4 p-4 bg-destructive text-white rounded-2xl text-center font-bold text-xl">
                        +880 1234-99999
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none bg-muted/30 rounded-[2rem]">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-lg">How it works</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-4 text-sm text-muted-foreground">
                    <div className="flex gap-4">
                        <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">1</div>
                        <p>Your report is sent to the next available doctor.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">2</div>
                        <p>Doctor reviews and provides advice or prescription.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">3</div>
                        <p>You'll receive a notification on status change.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
