import { motion } from "motion/react";
import { Star, Quote, Heart, Clock, ShieldCheck, Award, MessageCircle } from "lucide-react";

export default function ReviewMarquee() {
  // Highlight Statements Dataset
  const trustBadges = [
    { text: "Saved my father's life", icon: Heart, color: "text-red-400 bg-red-400/5 border-red-500/20" },
    { text: "Available 24x7 Emergency", icon: Clock, color: "text-emerald-400 bg-emerald-400/5 border-emerald-500/20" },
    { text: "Family doctor for 25+ years", icon: Award, color: "text-amber-400 bg-amber-400/5 border-amber-500/20" },
    { text: "Extremely Accurate Diagnosis", icon: ShieldCheck, color: "text-brand-blue-400 bg-brand-blue-400/5 border-brand-blue-400/20" },
    { text: "Covid Hero Citation", icon: Heart, color: "text-rose-400 bg-rose-400/5 border-rose-500/20" },
    { text: "Compassionate support", icon: MessageCircle, color: "text-indigo-400 bg-indigo-400/5 border-indigo-500/20" },
  ];

  // Live Patient Reviews Dataset
  const patientReviews = [
    {
      author: "Suraj Malhotra",
      date: "2 weeks ago",
      location: "Juhu Scheme, Mumbai",
      highlight: "Saved my father's life",
      content: "When my father had critical chest discomfort in the middle of the night, Dr. Singh answered immediately. He directed the ambulance and guided us through emergency triage. Exceptional diagnosis.",
      initials: "SM"
    },
    {
      author: "Priya Shah",
      date: "1 month ago",
      location: "Vile Parle West",
      highlight: "Family doctor for 25+ years",
      content: "He has been treating three generations of our family with extreme precision and compassion. He never prescribes unneeded medicine. The absolute gold standard of care in Juhu.",
      initials: "PS"
    },
    {
      author: "Aditya Roy",
      date: "3 weeks ago",
      location: "Santacruz West",
      highlight: "Accurate diagnosis",
      content: "I visited three other specialists for my chronic gut issue. Dr. Singh spent 40 minutes listening to my entire lifestyle history. His diagnosis was perfectly spot on and the remedy is working wonderfully.",
      initials: "AR"
    },
    {
      author: "Dr. Sandeep Mehta (Consulting Orthopedist)",
      date: "2 months ago",
      location: "Nanavati Hospital Associate",
      highlight: "Covid Hero & Peer Trust",
      content: "As a fellow medical professional, I can vouch for Dr. Singh's exceptional clinical logic and tireless efforts during critical health emergencies. Extremely respected across Mumbai.",
      initials: "SM"
    },
    {
      author: "Karan Johar (Patient's Son)",
      date: "5 days ago",
      location: "Juhu Tara Road",
      highlight: "Available 24x7 Support",
      content: "Our whole family goes to him. He is extremely gentle, unhurried, and represents the absolute highest integrity. Extremely grateful for his persistent availability on WhatsApp.",
      initials: "KJ"
    },
    {
      author: "Meenakshi Iyer",
      date: "3 weeks ago",
      location: "Andheri West",
      highlight: "Emergency Support",
      content: "Excellent diagnostic setup. Dr. Anantpal Singh is very calm, explains the entire treatment logic thoroughly, and respects patient privacy to the highest standards. Thank you, doctor!",
      initials: "MI"
    }
  ];

  return (
    <div className="space-y-12">
      {/* 1. Continuous Floating Highlight Badges (Infinite loop) */}
      <div className="relative w-full overflow-hidden py-2 select-none">
        {/* Left and right fades for luxury look */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#03060c] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#03060c] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-4 whitespace-nowrap min-w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 18,
            repeat: Infinity,
          }}
        >
          {[...trustBadges, ...trustBadges].map((badge, idx) => {
            const BadgeIcon = badge.icon;
            return (
              <div
                key={idx}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-full border text-xs sm:text-sm font-mono tracking-wide ${badge.color} hover:bg-white/[0.04] transition-all duration-300 shadow-[0_2px_10px_rgba(255,255,255,0.01)]`}
              >
                <BadgeIcon className="w-4 h-4" />
                <span className="font-semibold">{badge.text}</span>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* 2. Floating Live Reviews Grid (Dynamic entrance and interaction) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patientReviews.map((review, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-6 rounded-2xl glass-panel relative overflow-hidden border border-white/5 bg-brand-dark-950/60 shadow-xl group text-left flex flex-col justify-between min-h-[250px]"
          >
            {/* Ambient hover glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue-500/[0.02] rounded-full blur-3xl pointer-events-none group-hover:bg-brand-blue-500/[0.05] transition-all duration-500" />
            
            <div className="space-y-4">
              {/* Header: Stars & Highlights */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-brand-blue-400/10 border border-brand-blue-400/25 text-brand-blue-300">
                  {review.highlight}
                </span>
              </div>

              {/* Content Review */}
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-white/[0.01] pointer-events-none" />
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans relative z-10 pl-1">
                  "{review.content}"
                </p>
              </div>
            </div>

            {/* Author Meta */}
            <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-4">
              <div className="w-9 h-9 rounded-full bg-brand-blue-500/10 border border-brand-blue-500/20 flex items-center justify-center text-xs font-mono font-bold text-brand-blue-400">
                {review.initials}
              </div>
              <div>
                <p className="text-xs font-sans font-medium text-white">
                  {review.author}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500 mt-0.5">
                  <span>{review.location}</span>
                  <span>•</span>
                  <span>{review.date}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
