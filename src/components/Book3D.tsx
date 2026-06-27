import { useState } from "react";
import { BookItem } from "../types";
import { BookOpen, Sparkles, Award } from "lucide-react";

interface Book3DProps {
  book: BookItem;
  key?: string | number;
}

export default function Book3D({ book }: Book3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 p-8 rounded-3xl glass-panel relative overflow-hidden group">
      {/* Dynamic glow in background */}
      <div 
        className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[100px] opacity-15 transition-all duration-700 group-hover:opacity-25"
        style={{ backgroundColor: book.accentColor }}
      />
      
      {/* 3D Book Stage */}
      <div 
        className="relative w-[180px] h-[260px] perspective-1000 py-4 flex-shrink-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Book Container with 3D preserve */}
        <div 
          className="relative w-full h-full preserve-3d transition-all duration-700 ease-out"
          style={{
            transform: isHovered 
              ? "rotateY(-28deg) rotateX(10deg) rotateZ(-3deg)" 
              : "rotateY(-10deg) rotateX(4deg) rotateZ(0deg)",
            boxShadow: isHovered 
              ? "[-20px_35px_45px_rgba(3,7,18,0.7)]" 
              : "[-10px_15px_25px_rgba(3,7,18,0.55)]",
          }}
        >
          {/* Spine (side depth of the book) */}
          <div 
            className="absolute left-0 top-0 h-full w-[26px] origin-left preserve-3d"
            style={{
              transform: "rotateY(-90deg) translateX(-13px)",
              background: `linear-gradient(90deg, ${book.coverColor} 0%, rgba(3,7,18,0.4) 30%, ${book.coverColor} 70%, rgba(3,7,18,0.85) 100%)`,
              borderRight: "1px solid rgba(255, 255, 255, 0.15)",
              borderLeft: "1px solid rgba(0, 0, 0, 0.2)"
            }}
          >
            {/* Spine Title (Vertical) */}
            <div className="absolute inset-0 flex items-center justify-center [writing-mode:vertical-rl] text-[7px] uppercase font-mono tracking-widest text-white/70">
              Dr. Anantpal Singh — {book.title}
            </div>
          </div>

          {/* Front Cover */}
          <div 
            className="absolute inset-0 w-full h-full rounded-r-lg overflow-hidden preserve-3d z-20 backface-hidden"
            style={{
              background: `linear-gradient(135deg, ${book.coverColor} 0%, #030712 100%)`,
              border: "1.5px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "inset 0 0 40px rgba(255, 255, 255, 0.04)"
            }}
          >
            {/* Elegant Cover Graphics */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between h-full relative">
              {/* Foil Stamp Border */}
              <div 
                className="absolute inset-2 border border-dashed rounded opacity-30 pointer-events-none"
                style={{ borderColor: book.accentColor }}
              />

              {/* Header */}
              <div className="flex justify-between items-center z-10">
                <span className="text-[7px] tracking-[0.25em] font-mono text-white/50 uppercase">First Edition</span>
                <Award className="w-3.5 h-3.5 text-amber-400" />
              </div>

              {/* Center Graphics */}
              <div className="flex flex-col items-center justify-center my-auto py-2 z-10 text-center">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2.5 relative"
                  style={{ background: `radial-gradient(circle, ${book.accentColor}33 0%, transparent 70%)` }}
                >
                  <BookOpen className="w-5 h-5" style={{ color: book.accentColor }} />
                  {/* Subtle pulsing rings */}
                  <div className="absolute inset-0 rounded-full border border-white/10 scale-125 animate-pulse" />
                </div>
                
                <h3 className="text-sm font-display font-semibold tracking-wide text-white leading-tight uppercase px-1">
                  {book.title}
                </h3>
                <div 
                  className="w-8 h-[2px] my-1.5"
                  style={{ backgroundColor: book.accentColor }}
                />
                <p className="text-[7.5px] text-white/60 font-sans tracking-wide leading-relaxed uppercase max-w-[120px]">
                  {book.subtitle}
                </p>
              </div>

              {/* Author Footer */}
              <div className="text-center z-10">
                <p className="text-[7px] uppercase tracking-widest font-mono text-white/80">Dr. Anantpal Singh</p>
                <p className="text-[5px] text-white/40 font-mono mt-0.5">Juhu, Mumbai</p>
              </div>
            </div>
            
            {/* Luxury Cover Shine Reflection Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 mix-blend-overlay pointer-events-none" />
          </div>

          {/* Book Pages Thickness (Edge of the book) */}
          <div 
            className="absolute right-0 top-0 h-full w-[20px] origin-right"
            style={{
              transform: "rotateY(90deg) translateZ(10px)",
              background: "linear-gradient(to right, #ffffff 0%, #eaeaea 25%, #d1d1d1 50%, #f4f4f4 75%, #bfbfbf 100%)",
              boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.35)"
            }}
          >
            {/* Multi-layered paper lines effect */}
            <div className="w-full h-full bg-[linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:100%_3px]" />
          </div>

          {/* Back Cover */}
          <div 
            className="absolute inset-0 w-full h-full rounded-r-lg preserve-3d"
            style={{
              transform: "translateZ(-20px) rotateY(180deg)",
              background: "#030712",
              border: "1.5px solid rgba(255, 255, 255, 0.05)"
            }}
          >
            <div className="absolute inset-4 flex flex-col justify-between h-full border border-white/5 p-2 text-white/30 text-[5px] font-mono leading-relaxed">
              <div>
                <p className="uppercase text-white/60 mb-1">Blurb Summary</p>
                <p>An inspiring exploration of medical wisdom, lifestyle design, and healing paradigms. Synthesizing thirty years of primary medicine with quantum health perspectives.</p>
              </div>
              <div className="flex justify-between items-end border-t border-white/10 pt-2">
                <span>ISBN 978-3-16-148410-0</span>
                <span>MUMBAI PRESS</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Book Information Content */}
      <div className="flex-1 space-y-4 text-left z-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" /> Author Showcase
          </span>
          <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-brand-blue-400 bg-brand-blue-400/10 border border-brand-blue-400/20 rounded-full">
            Medical Literature
          </span>
        </div>

        <div>
          <h4 className="text-2xl font-display font-medium text-white group-hover:text-brand-blue-400 transition-colors duration-300">
            {book.title}
          </h4>
          <p className="text-sm font-sans font-medium text-white/50 italic mt-1">
            {book.subtitle}
          </p>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed max-w-xl">
          {book.description}
        </p>

        <div className="h-[1px] bg-white/10 w-full" />

        <div className="flex items-center gap-6 text-xs text-gray-400 font-mono">
          <div>
            <p className="text-white/60 uppercase text-[10px]">Author</p>
            <p className="text-white font-sans mt-0.5">Dr. Anantpal Singh</p>
          </div>
          <div>
            <p className="text-white/60 uppercase text-[10px]">Format</p>
            <p className="text-white font-sans mt-0.5">Hardcover Limited / PDF</p>
          </div>
          <div>
            <p className="text-white/60 uppercase text-[10px]">Availability</p>
            <p className="text-brand-blue-400 font-sans mt-0.5">Complementary for Patients</p>
          </div>
        </div>

        <button 
          onClick={() => {
            const el = document.getElementById("booking-section");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl border border-white/10 hover:border-brand-blue-400 bg-white/5 hover:bg-brand-blue-500/10 text-white hover:text-brand-blue-400 text-xs uppercase tracking-wider font-mono transition-all duration-300 shadow-sm"
        >
          Request Complimentary Copy
        </button>
      </div>
    </div>
  );
}
