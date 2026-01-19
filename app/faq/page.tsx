"use client";

import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Search, Inbox } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FAQPage() {
  const faqs = [
    {
      q: "How do I book an appointment?",
      a: "First, register and log in as a student. Then, navigate to 'Book Appointment' in your dashboard, select a doctor and an available time slot."
    },
    {
      q: "Is the medical center open on weekends?",
      a: "The physical medical center is open 9:00 AM - 5:00 PM on weekdays. However, emergency ambulance services and the online portal are available 24/7."
    },
    {
      q: "Are the counseling sessions confidential?",
      a: "Yes, all mental health and physical health consultations are strictly confidential between you and the healthcare provider."
    },
    {
      q: "Can I get a prescription through the portal?",
      a: "Yes, after a consultation, doctors can issue digital prescriptions which you can view and download from your student dashboard."
    },
    {
      q: "Who can access this system?",
      a: "Currently, only registered students, verified doctors, and administrative staff of the university can access the system."
    }
  ];

  return (
    <div className="py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
      <div className="text-center mb-12 space-y-4">
        <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-widest text-[10px]  px-4 py-1.5 rounded-full">Support Center</Badge>
        <h1 className="text-4xl md:text-6xl  tracking-tight mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground text-lg font-medium italic">"Your health questions, answered by our experts."</p>
      </div>

      <div className="relative mb-16 max-w-2xl mx-auto group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input className="pl-12 h-14 bg-muted/50 border-none rounded-2xl shadow-inner text-lg font-medium" placeholder="Search for questions..." />
      </div>

      <div className="space-y-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-none mb-4 rounded-[2rem] bg-muted/40 px-8 py-2 overflow-hidden hover:bg-muted/60 transition-colors">
              <AccordionTrigger className="hover:no-underline text-xl font-bold text-left tracking-tight py-6">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-medium text-lg leading-relaxed pb-8">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-24 p-12 rounded-[3.5rem] bg-primary text-primary-foreground text-center shadow-2xl shadow-primary/20 relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-1000">
           <Inbox className="h-64 w-64" />
        </div>
        <div className="relative z-10">
          <h3 className="text-3xl  mb-3 tracking-tight">Still have questions?</h3>
          <p className="opacity-80 font-medium mb-8 text-lg">Our support team is here to help you 24/7 with any medical concerns.</p>
          <Button size="lg" className="rounded-2xl px-10 h-14 bg-white text-primary hover:scale-105 transition-all  text-lg shadow-xl shadow-black/10">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
