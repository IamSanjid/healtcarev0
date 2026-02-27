"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  MapPin, 
  Search, 
  Building2,
  Ambulance,
  HeartPulse,
  Filter
} from "lucide-react";
import { useState } from "react";

const hospitalDirectory = [
  { name: "Evercare Hospital Dhaka", phone: "10678", area: "Bashundhara", type: "Full Service", category: "Hospital" },
  { name: "United Hospital", phone: "01914001403", area: "Gulshan 2", type: "Emergency", category: "Hospital" },
  { name: "Ibn Sina Diagnostic", phone: "10615", area: "Badda", type: "Diagnostic", category: "Diagnostic" },
  { name: "Badda General Hospital", phone: "01790776722", area: "Uttar Badda", type: "General", category: "Hospital" },
  { name: "AMZ Hospital", phone: "01847-331010", area: "Badda", type: "General", category: "Hospital" },
  { name: "Popular Diagnostic", phone: "09666787809", area: "Badda", type: "Diagnostic", category: "Diagnostic" },
  { name: "Shahabuddin Medical", phone: "01717439218", area: "Gulshan 2", type: "Medical College", category: "Medical College" },
  { name: "Labaid Diagnostic", phone: "02-8835981", area: "Gulshan 2", type: "Diagnostic", category: "Diagnostic" },
  { name: "National Healthline", phone: "16263", area: "National", type: "Telemedicine", category: "Helpline" },
  { name: "Fire Service Ambulance", phone: "9555555", area: "Dhaka", type: "Ambulance", category: "Ambulance" },
  { name: "Ambulist Badda", phone: "01710060020", area: "Badda", type: "Ambulance", category: "Ambulance" },
];

export default function PhonebookPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(hospitalDirectory.map(h => h.category)))];

  const filteredHospitals = hospitalDirectory.filter(h => 
    (filter === "All" || h.category === filter) &&
    (h.name.toLowerCase().includes(search.toLowerCase()) || h.area.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-end gap-8">
        <div className="space-y-4">
          <Badge className="bg-primary/10 text-primary border-none rounded-full px-4 py-1.5 font-medium uppercase tracking-widest text-[10px]">Directory</Badge>
          <h1 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl italic leading-tight">
            Hospital <span className="text-primary font-light underline decoration-primary/20 underline-offset-8">Phonebook</span>
          </h1>
          <p className="text-lg text-muted-foreground font-light max-w-xl leading-relaxed">
            Essential contacts for hospitals, diagnostic centers, and ambulance services in the Dhaka Gulshan & Badda region.
          </p>
        </div>
        
        <div className="w-full lg:w-fit flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by name or area..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-4 bg-white dark:bg-card border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 transition-all font-light"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full sm:w-48 pl-11 pr-8 py-4 bg-white dark:bg-card border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 transition-all font-light appearance-none"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredHospitals.map((hospital) => (
          <Card key={hospital.name} className="border-none bg-white dark:bg-card shadow-sm hover:shadow-2xl transition-all rounded-[2.5rem] overflow-hidden group">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 rounded-[1.5rem] bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {hospital.category === 'Ambulance' ? <Ambulance className="h-6 w-6" /> : <Building2 className="h-6 w-6" />}
                </div>
                <Badge variant="outline" className="rounded-full font-medium border-primary/10 text-muted-foreground group-hover:text-primary transition-colors text-[10px] px-3">
                  {hospital.area}
                </Badge>
              </div>
              
              <div className="space-y-1 mb-6">
                <h3 className="text-xl font-medium tracking-tight h-14 overflow-hidden">{hospital.name}</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium opacity-60 italic">{hospital.type}</p>
              </div>

              <div className="flex items-center justify-between gap-4 pt-4 border-t border-muted/50">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium mb-1">Hotline</p>
                  <span className="text-2xl font-medium text-primary tracking-tight">{hospital.phone}</span>
                </div>
                <Button className="rounded-full px-6 h-12 font-medium bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all" asChild>
                  <a href={`tel:${hospital.phone}`}>Call</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredHospitals.length === 0 && (
          <div className="col-span-full py-20 text-center space-y-4">
             <div className="h-20 w-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto text-muted-foreground opacity-30">
               <Search className="h-10 w-10" />
             </div>
             <p className="text-muted-foreground font-light italic text-lg">No hospitals found matching your search.</p>
             <Button variant="ghost" onClick={() => {setSearch(""); setFilter("All");}} className="text-primary hover:bg-primary/5">Clear Filters</Button>
          </div>
        )}
      </div>

      <div className="p-10 bg-secondary/10 rounded-[3rem] border border-secondary/10 flex flex-col md:flex-row gap-10 items-center">
         <div className="p-6 bg-white dark:bg-card rounded-[2rem] shadow-xl shadow-secondary/5 text-secondary">
           <Phone className="h-10 w-10" />
         </div>
         <div className="space-y-4 text-center md:text-left">
           <h3 className="text-2xl font-medium tracking-tight text-secondary">National Healthcare Helpline</h3>
           <p className="max-w-xl text-muted-foreground font-light leading-relaxed">
             Dial <span className="text-secondary font-medium">16263</span> for Shastho Batayon, providing 24/7 doctor advice and information on hospitals near you across Bangladesh.
           </p>
           <Button variant="secondary" className="rounded-xl px-10 h-14 shadow-lg shadow-secondary/10" asChild>
             <a href="tel:16263">Dial 16263 Now</a>
           </Button>
         </div>
      </div>
    </div>
  );
}
