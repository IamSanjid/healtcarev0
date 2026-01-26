"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Navigation, 
  ExternalLink,
  Info,
  Building,
  Clock
} from "lucide-react";

const locations = [
  { name: "United Hospital", type: "Major Tertiary Care", time: "8 mins", distance: "2.4 km", coords: "23.8041,90.4150" },
  { name: "Evercare Hospital", type: "Multispecialty", time: "12 mins", distance: "4.1 km", coords: "23.8123,90.4312" },
  { name: "Ibn Sina Badda", type: "Diagnostic & Clinic", time: "5 mins", distance: "1.2 km", coords: "23.7812,90.4267" },
  { name: "AMZ Hospital Badda", type: "Emergency Care", time: "4 mins", distance: "0.9 km", coords: "23.7845,90.4255" },
];

export default function MapsPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-4">
        <Badge className="bg-amber-500/10 text-amber-600 border-none rounded-full px-4 py-1.5 font-medium uppercase tracking-widest text-[10px]">Navigation</Badge>
        <h1 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl italic leading-tight">
          Hospital <span className="text-amber-600 font-light underline decoration-amber-500/20 underline-offset-8">Maps</span>
        </h1>
        <p className="text-lg text-muted-foreground font-light max-w-xl leading-relaxed">
          Locate the nearest medical facilities from United International University. Times displayed are estimated based on current traffic.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-xl font-medium tracking-tight flex items-center gap-2 mb-2">
            <Building className="h-5 w-5 text-amber-600" /> Nearby Facilities
          </h2>
          <div className="space-y-4">
            {locations.map((loc) => (
              <Card key={loc.name} className="border-none bg-white dark:bg-card shadow-sm hover:shadow-lg transition-all rounded-[2rem] group cursor-pointer border-l-4 border-l-transparent hover:border-l-amber-500">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-lg leading-tight group-hover:text-amber-600 transition-colors">{loc.name}</h3>
                    <Badge variant="outline" className="text-[10px] bg-muted/50 rounded-lg px-2 py-0.5 border-none">{loc.distance}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4 font-light italic">{loc.type}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                       <div className="flex items-center gap-1.5 bg-amber-500/5 text-amber-600 px-2 py-1 rounded-full">
                         <Clock className="h-3 w-3" /> {loc.time}
                       </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-muted/30 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-sm">
                      <Navigation className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-amber-500/5 border-none rounded-[2rem] p-6 mt-8">
            <div className="flex gap-4 items-start">
              <Info className="h-5 w-5 text-amber-600 shrink-0 mt-1" />
              <p className="text-xs text-amber-600/80 leading-relaxed font-light">
                For ambulance transport to these locations, please contact UIU Medical Dispatch at <span className="font-medium">+880 1234-99999</span> immediately.
              </p>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-medium tracking-tight flex items-center gap-2">
              <MapPin className="h-5 w-5 text-rose-500" /> Interactive View
            </h2>
            <Button variant="outline" className="rounded-xl gap-2 font-medium border-muted shadow-sm hover:bg-white transition-all" asChild>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" /> Open in Google Maps
              </a>
            </Button>
          </div>
          <div className="rounded-[4rem] border-8 border-white dark:border-white/5 shadow-2xl overflow-hidden bg-muted/20 relative group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d14607.274340335208!2d90.41244!3d23.81290!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1shospitals%20near%20United%20International%20University%20Dhaka!5e0!3m2!1sen!2sbd!4v1234567890123" 
              width="100%" 
              height="600" 
              style={{border: 0}} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full grayscale transition-all duration-1000 group-hover:grayscale-0"
            />
            {/* Minimal overlay to prevent accidental scrolls while browsing the page */}
            <div className="absolute inset-x-0 bottom-0 p-8 pointer-events-none">
               <div className="bg-white/80 dark:bg-card/80 backdrop-blur-md p-4 rounded-[2rem] border border-white/20 shadow-xl inline-flex items-center gap-4 pointer-events-auto max-w-sm">
                  <div className="h-10 w-10 bg-primary text-white rounded-2xl flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold leading-none mb-1">UIU Medical Center</h4>
                    <p className="text-[10px] text-muted-foreground">Current Location • Block A, Level 1</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
