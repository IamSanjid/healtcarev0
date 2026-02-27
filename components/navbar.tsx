"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, Moon, Sun, ShieldAlert, LogIn } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Doctors", href: "/doctors" },
    { name: "Care Corner", href: "/wellness" },
    { name: "Resources", href: "/resources" },
    { name: "Emergency", href: "/emergency" },
    { name: "FAQ", href: "/faq" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const isSolid = isScrolled || pathname !== "/";

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500  ${
          isSolid 
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-4" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* LEFT: HAMBURGER & BRAND */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsOpen(true)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-lg group pointer-events-auto ${
                isSolid 
                  ? "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20" 
                  : "bg-white/10 backdrop-blur-md border border-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              <Menu className="w-5 h-5 group-hover:rotate-180 transition duration-500" />
            </button>
            <Link href="/" className="group flex items-center gap-2 font-medium ">
              <span className={`text-2xl tracking-tighter transition-all ${
                isSolid ? "text-foreground" : "text-white"
              }`} style={{ fontFamily: "var(--font-figtree), sans-serif" }}>
                <span className="text-primary font-light italic">UIU Healthcare</span>
              </span>
            </Link>
          </div>

          {/* RIGHT: THEME & AUTH/EMERGENCY */}
          <div className="flex items-center gap-3">
             <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={`rounded-full w-10 h-10 transition-all active:scale-90 ${
                  isSolid 
                    ? "hover:bg-muted" 
                    : "text-white hover:bg-white/10"
                }`}
              >
                {isDark ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4" />}
              </Button>

              <div className="hidden sm:flex items-center gap-2">
                <Button 
                  asChild
                  variant="destructive"
                  size="sm"
                  className="rounded-full px-5 h-10 font-medium text-[11px] uppercase tracking-widest shadow-lg shadow-destructive/20 hover:scale-105 active:scale-95 border-none"
                >
                  <Link href="/emergency">Emergency</Link>
                </Button>
                
                <Button className=" rounded-full bg-blue-500 px-5 h-10 font-semibold text-[11px] uppercase tracking-widest shadow-lg shadow-destructive/20 hover:scale-105 active:scale-95 border-none">
                  <Link href="/wellness">Care Corner</Link>
                </Button>


                <Button 
                  asChild
                  size="sm"
                  className={`rounded-full px-5 h-10 font-medium text-[11px] uppercase transition-all hover:scale-105 active:scale-95 border-none ${
                    isSolid
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-white text-primary hover:bg-white/90"
                  }`}
                >
                  <Link href="/login" className="flex items-center gap-2">
                    Login <LogIn className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
          </div>

        </div>
      </nav>

      {/* DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed top-0 left-0 z-[70] h-full w-[340px] bg-background/95 backdrop-blur-2xl border-r border-border p-10 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-16">
                 <div className="text-2xl font-medium tracking-tighter" style={{ fontFamily: "var(--font-figtree), sans-serif" }}>
                   UIU<span className="text-primary font-light italic">.care</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-full hover:bg-muted transition-colors active:scale-90"
                >
                  <X className="w-6 h-6 text-muted-foreground" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl font-light text-foreground/40 hover:text-foreground transition-all flex items-center group py-1 tracking-tighter"
                      style={{ fontFamily: "var(--font-figtree), sans-serif" }}
                    >
                      <span className="w-0 group-hover:w-6 h-1 bg-primary mr-0 group-hover:mr-4 transition-all rounded-full opacity-0 group-hover:opacity-100" />
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto space-y-12">
                 <div className="space-y-4">
                    <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground opacity-50">Quick Access</p>
                    <div className="grid grid-cols-2 gap-3">
                       <Link href="/login" onClick={() => setIsOpen(false)} className="h-12 bg-muted rounded-2xl flex items-center justify-center font-medium text-xs hover:bg-primary hover:text-white transition-colors">Portal</Link>
                       <Link href="/register" onClick={() => setIsOpen(false)} className="h-12 bg-muted rounded-2xl flex items-center justify-center font-medium text-xs hover:bg-primary hover:text-white transition-colors">Join</Link>
                    </div>
                 </div>

                 <div className="pt-8 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                       <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">System Online</span>
                    </div>
                    <Heart className="w-4 h-4 text-primary fill-primary/20" />
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}