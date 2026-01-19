"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function DoctorsPage() {
  const doctors = [
    {
      name: "Dr. Sarah Ahmed",
      specialization: "General Physician",
      status: "ONLINE",
      availability: "9:00 AM - 1:00 PM",
      location: "Room 102, Block A",
      image: "SA"
    },
    {
      name: "Dr. Mahfuzur Rahman",
      specialization: "Mental Health Counselor",
      status: "OFFLINE",
      availability: "2:00 PM - 5:00 PM",
      location: "Room 305, Block B",
      image: "MR"
    },
    {
      name: "Nurse Joya Gomez",
      specialization: "First Aid & Triage",
      status: "ONLINE",
      availability: "8:00 AM - 8:00 PM",
      location: "Emergency Wing",
      image: "JG"
    }
  ];
  return (
    <div className="py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div className="max-w-xl space-y-4">
          <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">Medical Staff</Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Meet Our <span className="text-primary italic">Healthcare Team</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Find and consult with our highly qualified medical professionals. Check their real-time availability below.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-10 h-11 bg-muted/50 border-none rounded-2xl" placeholder="Search by name or specialty..." />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <Card key={doctor.name} className="group hover:ring-2 hover:ring-primary/20 transition-all border-none bg-muted/30 shadow-none overflow-hidden rounded-[2rem]">
            <CardHeader className="flex flex-row items-center gap-4 pb-4">
              <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">{doctor.image}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-xl tracking-tight">{doctor.name}</CardTitle>
                <CardDescription className="text-primary font-bold text-[10px] uppercase tracking-widest">{doctor.specialization}</CardDescription>
              </div>
              <Badge variant={doctor.status === "ONLINE" ? "default" : "secondary"} className={doctor.status === "ONLINE" ? "bg-green-500 hover:bg-green-600 rounded-full" : "rounded-full"}>
                {doctor.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground font-medium">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Today: {doctor.availability}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{doctor.location}</span>
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl h-12 font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform" asChild>
                <Link href="/login">Book Appointment</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-20 p-12 rounded-[3rem] bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2">
          <h3 className="text-3xl  tracking-tight">Are you a healthcare provider?</h3>
          <p className="text-muted-foreground font-medium">Join our network and help make campus life healthier for everyone.</p>
        </div>
        <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5 h-14 px-10 rounded-2xl font-bold" asChild>
          <Link href="/register?role=doctor">Register as Doctor</Link>
        </Button>
      </div>
    </div>
  );
}
