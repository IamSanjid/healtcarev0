"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Dna, 
  Brain, 
  Sparkles, 
  ArrowRight,
  Apple,
  Moon,
  Wind,
  Heart
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ResourcesPage() {
  return (
    <div className="py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-3xl mb-12 text-center md:text-left mx-auto md:mx-0">
        <Badge variant="outline" className="mb-4 text-primary border-primary/20 bg-primary/5">Wellness Library</Badge>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-6">
          Your Guide to <span className="text-primary italic">Better Living</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed font-medium">
          Explore our curated resources for physical health, mental well-being, and specialized care for the university community.
        </p>
      </div>

      <Tabs defaultValue="physical" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md h-12 mb-8 bg-muted/50 p-1 rounded-2xl">
          <TabsTrigger value="physical" className="data-[state=active]:bg-background rounded-xl font-bold">Physical</TabsTrigger>
          <TabsTrigger value="mental" className="data-[state=active]:bg-background rounded-xl font-bold">Mental</TabsTrigger>
          <TabsTrigger value="girls" className="data-[state=active]:bg-background rounded-xl font-bold">Girls Health</TabsTrigger>
        </TabsList>

        <TabsContent value="physical" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Nutrition Guide", desc: "Healthy eating habits for students on a budget.", Icon: Apple },
              { title: "Sleep Hygiene", desc: "How to improve your sleep quality during exams.", Icon: Moon },
              { title: "Campus Fitness", desc: "Overview of gym facilities and sports clubs.", Icon: Dna },
            ].map((item) => (
              <Card key={item.title} className="group hover:border-primary/50 transition-all border-none bg-muted/30 shadow-none rounded-[2.5rem] p-4">
                <CardHeader>
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform shadow-lg shadow-primary/5">
                    <item.Icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl ">{item.title}</CardTitle>
                  <CardDescription className="text-muted-foreground font-medium">{item.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="p-0 text-primary hover:bg-transparent hover:underline group font-bold">
                    Read more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mental" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Stress Management", desc: "Practical techniques to handle academic stress.", Icon: Brain },
              { title: "Mindfulness", desc: "Simple meditation practices for focus.", Icon: Wind },
              { title: "Counseling Services", desc: "How to reach out to local counselors.", Icon: Sparkles },
            ].map((item) => (
              <Card key={item.title} className="group hover:border-secondary/50 transition-all border-none bg-muted/30 shadow-none rounded-[2.5rem] p-4">
                <CardHeader>
                  <div className="h-14 w-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4 text-secondary group-hover:scale-110 transition-transform shadow-lg shadow-secondary/5">
                    <item.Icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl ">{item.title}</CardTitle>
                  <CardDescription className="text-muted-foreground font-medium">{item.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="p-0 text-secondary hover:bg-transparent hover:underline group font-bold">
                    Read more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="girls" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Reproductive Health", desc: "Essential information and campus support.", Icon: Sparkles },
              { title: "Hygiene & Wellness", desc: "Maintaining health during college years.", Icon: Wind },
              { title: "Safe Spaces", desc: "Locations and communities for female students.", Icon: Heart },
            ].map((item) => (
              <Card key={item.title} className="group hover:border-accent/50 transition-all border-none bg-muted/30 shadow-none rounded-[2.5rem] p-4">
                <CardHeader>
                  <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 text-accent group-hover:scale-110 transition-transform shadow-lg shadow-accent/5">
                    <item.Icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl ">{item.title}</CardTitle>
                  <CardDescription className="text-muted-foreground font-medium">{item.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="p-0 text-accent hover:bg-transparent hover:underline group font-bold">
                    Read more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
