"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Users, ShieldAlert, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const heroImages = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80",
];

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col overflow-hidden bg-background">
      {/* BACKGROUND LAYERS */}
      {heroImages.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ 
            opacity: currentImage === index ? 0.4 : 0,
            scale: currentImage === index ? 1 : 1.05
          }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent z-10" />

      {/* HERO CONTENT */}
      <main className="relative z-20 flex-grow flex flex-col justify-center px-6 lg:px-12 pt-20">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/20 text-primary bg-primary/5 rounded-full flex items-center gap-2 font-medium uppercase tracking-widest text-[10px]">
              <Sparkles className="h-3 w-3" /> University Medical Portal
            </Badge>

            <h1 className="text-5xl md:text-5xl lg:text-6xl tracking-tighter leading-[0.9] font-medium text-foreground">
              Modern Care for <br />
              <span className="text-primary italic font-light">the UIU Family</span>
            </h1>
           
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed font-light">
              Elevating your health experience with a seamless digital portal. 
              Book certified specialists, track records, and access critical support instantly.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Button 
                asChild
                className="h-14 px-10 rounded-2xl bg-primary text-white hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 border-none font-medium text-base"
              >
                <Link href="/register">
                   Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                className="h-14 px-10 rounded-2xl border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-all font-medium text-sm italic"
              >
                <Link href="/wellness" className="flex items-center gap-2">
                   <Sparkles className="w-4 h-4" /> Care Corner
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                className="h-14 px-10 rounded-2xl border-muted hover:bg-muted/50 transition-all font-medium text-sm italic"
              >
                <Link href="/emergency">
                   Emergency Help
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-8 mt-16 pt-8 border-t border-muted w-full">
               <div className="space-y-1">
                  <div className="text-2xl font-medium tracking-tight">2K+</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Active Students</div>
               </div>
               <div className="space-y-1">
                  <div className="text-2xl font-medium tracking-tight">50+</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Certified Doctors</div>
               </div>
               <div className="space-y-1">
                  <div className="text-2xl font-medium tracking-tight">24/7</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Emergency Support</div>
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
             <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white dark:border-white/5">
                <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80" alt="Hospital Interior" className="w-full h-[600px] object-cover" />
             </div>
             {/* Decorative element */}
             <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-[3rem] -z-10 blur-3xl" />
             <div className="absolute -top-10 -left-10 w-64 h-64 bg-secondary/10 rounded-[3rem] -z-10 blur-3xl" />
          </motion.div>
        </div>
      </main>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
         <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll to explore</span>
         <div className="w-px h-12 bg-linear-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
