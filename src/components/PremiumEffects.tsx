import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, ShieldCheck, Heart, Sparkles } from "lucide-react";

/* 1. SCROLL PROGRESS INDICATOR */
export function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 h-[3px] z-[100] bg-white/5 pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-brand-blue-400 via-brand-blue-500 to-emerald-400 shadow-[0_0_12px_rgba(14,165,233,0.8)] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

/* 2. PREMIUM CLINICAL LOADING SCREEN */
export function PremiumLoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const statuses = [
    "Establishing Secured Connection...",
    "Validating HIPAA Protocols...",
    "Parsing Multi-Generational Family Records...",
    "Optimizing Cardiac & Heartbeat Telemetry...",
    "Readying Dr. Anantpal's Private Panel..."
  ];

  useEffect(() => {
    // Increment progress counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 500); // fade out duration
          return 100;
        }
        // Speed up near the end or increment randomly
        const nextVal = prev + Math.floor(Math.random() * 15) + 5;
        return Math.min(nextVal, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Stagger statuses based on progress
    if (progress < 25) setStatusIndex(0);
    else if (progress < 50) setStatusIndex(1);
    else if (progress < 75) setStatusIndex(2);
    else if (progress < 95) setStatusIndex(3);
    else setStatusIndex(4);
  }, [progress]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#02040a] flex flex-col items-center justify-center text-center px-4"
        >
          {/* Subtle moving abstract matrix lines */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.06)_0%,transparent_70%)] pointer-events-none" />

          <div className="space-y-8 max-w-sm relative z-10">
            {/* Pulsing Medical Core Icon */}
            <div className="relative flex items-center justify-center mx-auto w-20 h-20">
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute inset-0 rounded-2xl border border-brand-blue-500/20 bg-brand-blue-500/5 shadow-[0_0_40px_rgba(14,165,233,0.15)]"
              />
              <Activity className="w-10 h-10 text-brand-blue-400 animate-pulse" />
            </div>

            <div className="space-y-3">
              <h1 className="text-xl font-display font-medium text-white tracking-widest uppercase">
                DR. ANANTPAL SINGH
              </h1>
              <p className="text-[10px] font-mono text-gray-500 tracking-[0.3em] uppercase">
                Family Clinic & Emergency Care
              </p>
            </div>

            {/* Custom progress tracker bar */}
            <div className="space-y-2">
              <div className="w-full h-[1px] bg-white/5 rounded-full overflow-hidden relative">
                <motion.div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-brand-blue-500 to-emerald-400"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
              
              <div className="flex justify-between items-center text-[9px] font-mono text-gray-400 uppercase tracking-wider">
                <span className="text-brand-blue-400 font-bold">{progress}% SECURED</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> HIPAA CERTIFIED
                </span>
              </div>
            </div>

            {/* Live status ticker */}
            <div className="h-6 overflow-hidden">
              <motion.p
                key={statusIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-[10px] font-mono text-gray-500 tracking-wider"
              >
                {statuses[statusIndex]}
              </motion.p>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* 3. MAGNETIC BUTTON ACTIONS (Subtle physics bounce on cursor proximity) */
interface MagneticButtonProps {
  children: React.ReactElement;
  range?: number;
}
export function MagneticButton({ children, range = 35 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < range) {
      // Pull element slightly towards the mouse coordinate
      setPosition({ x: dx * 0.35, y: dy * 0.35 });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)"
      }}
    >
      {children}
    </div>
  );
}

/* 4. DYNAMIC COSMIC LIGHT RAYS BACKGROUND EFFECT */
export function CosmicLightRays() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      <div className="absolute top-[-10%] left-[20%] w-[45vw] h-[80vh] bg-brand-blue-500/10 rounded-full blur-[140px] transform -rotate-12 animate-pulse" style={{ animationDuration: "12s" }} />
      <div className="absolute bottom-[-10%] right-[10%] w-[35vw] h-[70vh] bg-emerald-500/5 rounded-full blur-[130px] transform rotate-45 animate-pulse" style={{ animationDuration: "18s" }} />
    </div>
  );
}
