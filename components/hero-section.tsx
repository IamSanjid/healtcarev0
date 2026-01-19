"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Users, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { ShinyText } from "@/components/ui/shiny-text";
import { Button } from "@/components/ui/button";

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
    <section className="relative w-full h-screen flex flex-col overflow-hidden bg-black ">
      {/* 1. BACKGROUND LAYERS */}
      {heroImages.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: currentImage === index ? 0.5 : 0,
            scale: currentImage === index ? 1 : 1.1
          }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

      {/* 2. OVERLAY GRIDS */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      {/* 3. HERO CONTENT */}
      <main className="relative z-20 flex-grow flex flex-col justify-end px-6 lg:px-12 py-32">
        <div className="w-full flex flex-col md:flex-row justify-between items-end gap-12">
          
          {/* TEXT CONTENT (Left Bottom Aligned) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl flex flex-col"
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="h-0.5 w-12 bg-primary rounded-full" />
              <span className="text-[10px]  uppercase tracking-[0.4em] text-white/50">University Medical Portal</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-[7rem] xl:text-[8rem] flex flex-wrap gap-x-6 gap-y-2  tracking-tighter text-white leading-[0.85]" style={{ fontFamily: "'Neue Machina', var(--font-outfit), sans-serif" }}>
              <ShinyText text="Campus" disabled={false} speed={4} color="#ffffff" shineColor="#a855f7" className="mr-2" /> 
              <div className="flex items-end gap-3">
                  <p className="text-4xl md:text-5xl italic  tracking-tight leading-[0.9] bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-600 bg-clip-text text-transparent transform translate-y-[-10px]">Health</p>
                  <p className="text-4xl md:text-5xl italic  tracking-tight leading-[0.9] bg-gradient-to-tl from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent transform translate-y-[-10px]">Care</p> 
              </div> 
            </h1>
           
            <p className="mt-10 text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed font-medium">
              The premium healthcare management system for the UIU community. 
              Book <span className="text-white px-2 py-1 bg-white/5 border border-white/10 rounded-lg">certified doctors</span>, access <span className="text-white px-2 py-1 bg-white/5 border border-white/10 rounded-lg">mental health support</span>, and manage your medical history <span className="font-bold underline decoration-primary underline-offset-4">securely</span>.
            </p>
          </motion.div>
  
          {/* BUTTON GROUP (Bottom Right) */}
          <div className="hidden md:flex flex-col items-end gap-6 mb-4">
            <Button 
               asChild
               className="h-14 px-20 rounded-full   bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(168,85,247,0.3)] hover:shadow-[0_20px_60px_rgba(168,85,247,0.5)] border-none"
            >
              <Link href="/register">
                 Join Portal <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline"
              className="h-14 px-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-all flex items-center gap-2 font-bold text-sm uppercase tracking-widest"
            >
              <Link href="/emergency">
                 Emergency Help
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Mobile Buttons */}
        <div className="md:hidden mt-12 grid grid-cols-1 gap-4">
           <Button 
              asChild
              className="w-full h-14 rounded-2xl  bg-white text-black hover:bg-white/90"
            >
              <Link href="/register">Join the Community</Link>
            </Button>
            <Button 
              asChild
              variant="outline"
              className="w-full h-14 rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold"
            >
              <Link href="/emergency">Emergency Help</Link>
            </Button>
        </div>
      </main>

      {/* 4. INDICATORS */}
      <div className="absolute bottom-10 right-12 hidden lg:flex items-center gap-4">
         <span className="text-[10px]  text-white/20 uppercase tracking-[0.3em]">Scroll for features</span>
         <div className="h-10 w-[1px] bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
