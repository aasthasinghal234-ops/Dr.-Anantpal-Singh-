import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Award, Landmark, Stethoscope, Star, Heart } from "lucide-react";

export default function AffiliationsTicker() {
  const partners = [
    {
      name: "Indian Medical Association (IMA)",
      subtitle: "Lifetime Member",
      icon: Stethoscope,
      color: "text-blue-400 group-hover:text-blue-300",
      glow: "shadow-[0_0_20px_rgba(59,130,246,0.3)] border-blue-500/30"
    },
    {
      name: "Maharashtra Medical Council (MMC)",
      subtitle: "Regd. Board Practitioner",
      icon: ShieldCheck,
      color: "text-emerald-400 group-hover:text-emerald-300",
      glow: "shadow-[0_0_20px_rgba(16,185,129,0.3)] border-emerald-500/30"
    },
    {
      name: "Juhu Medical Association (JMA)",
      subtitle: "Active Committee Member",
      icon: Award,
      color: "text-amber-400 group-hover:text-amber-300",
      glow: "shadow-[0_0_20px_rgba(245,158,11,0.3)] border-amber-500/30"
    },
    {
      name: "KEM Hospital Alumni Union",
      subtitle: "General Medicine Graduate",
      icon: Landmark,
      color: "text-indigo-400 group-hover:text-indigo-300",
      glow: "shadow-[0_0_20px_rgba(99,102,241,0.3)] border-indigo-500/30"
    },
    {
      name: "National Health Authority (NHA)",
      subtitle: "Digital Health Partner",
      icon: Heart,
      color: "text-rose-400 group-hover:text-rose-300",
      glow: "shadow-[0_0_20px_rgba(244,63,94,0.3)] border-rose-500/30"
    },
    {
      name: "Association of Medical Consultants",
      subtitle: "Specialist Consultant",
      icon: Star,
      color: "text-purple-400 group-hover:text-purple-300",
      glow: "shadow-[0_0_20px_rgba(168,85,247,0.3)] border-purple-500/30"
    }
  ];

  return (
    <div className="space-y-6 pt-12 border-t border-white/5">
      <div className="text-center space-y-1">
        <p className="text-[10px] font-mono uppercase text-gray-500 tracking-[0.3em] font-bold">
          AUTHORIZED CLINICAL GUARDIANSHIP
        </p>
        <h3 className="text-sm font-sans text-gray-400 tracking-wide font-light">
          Certified &amp; Affiliated with Reputable Medical Boards and Press
        </h3>
      </div>

      {/* Infinite marquee loop containing 2 copies for endless roll */}
      <div className="relative w-full overflow-hidden py-4 select-none">
        {/* Subtle horizontal blur fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-brand-dark-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-brand-dark-950 to-transparent z-10 pointer-events-none" />

        <div className="flex w-[200%] gap-4 animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
          
          {/* Ticker Batch 1 */}
          <div className="flex justify-around items-center w-1/2 gap-6">
            {partners.map((partner, idx) => {
              const IconComponent = partner.icon;
              return (
                <div 
                  key={`b1-${idx}`}
                  className="group flex items-center gap-3 bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 rounded-2xl px-5 py-3 transition-all duration-300 cursor-pointer grayscale hover:grayscale-0"
                >
                  <div className={`p-2 rounded-xl bg-white/5 border border-white/5 transition-all duration-300 group-hover:bg-brand-dark-950 group-hover:${partner.glow}`}>
                    <IconComponent className={`w-4 h-4 ${partner.color}`} />
                  </div>
                  <div className="text-left">
                    <h5 className="text-xs font-display font-medium text-gray-400 group-hover:text-white transition-colors">
                      {partner.name}
                    </h5>
                    <p className="text-[9px] font-mono text-gray-600 group-hover:text-gray-400 transition-colors">
                      {partner.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ticker Batch 2 (Duplicate for loop) */}
          <div className="flex justify-around items-center w-1/2 gap-6">
            {partners.map((partner, idx) => {
              const IconComponent = partner.icon;
              return (
                <div 
                  key={`b2-${idx}`}
                  className="group flex items-center gap-3 bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 rounded-2xl px-5 py-3 transition-all duration-300 cursor-pointer grayscale hover:grayscale-0"
                >
                  <div className={`p-2 rounded-xl bg-white/5 border border-white/5 transition-all duration-300 group-hover:bg-brand-dark-950 group-hover:${partner.glow}`}>
                    <IconComponent className={`w-4 h-4 ${partner.color}`} />
                  </div>
                  <div className="text-left">
                    <h5 className="text-xs font-display font-medium text-gray-400 group-hover:text-white transition-colors">
                      {partner.name}
                    </h5>
                    <p className="text-[9px] font-mono text-gray-600 group-hover:text-gray-400 transition-colors">
                      {partner.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
