import { useState, useEffect } from "react";
import { 
  Heart, 
  UserPlus, 
  Search, 
  FileText, 
  Sparkles, 
  Users, 
  ArrowRight, 
  HelpCircle,
  Activity,
  Smile,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ShieldCheck,
  Brain
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* SCENE-SPECIFIC VECTORS AND INTERACTIVE CANVAS GRAPHICS */
function SceneGraphic({ type }: { type: "worried" | "consult" | "diagnosis" | "treatment" | "recovery" | "happy" }) {
  const [pulseVal, setPulseVal] = useState(0);

  useEffect(() => {
    const int = setInterval(() => {
      setPulseVal((v) => (v + 1) % 100);
    }, 40);
    return () => clearInterval(int);
  }, []);

  if (type === "worried") {
    // Scene 1: Chaotic, disorganized network representation of worry
    return (
      <div className="relative w-full h-32 flex items-center justify-center bg-red-500/5 rounded-2xl border border-red-500/10 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Moving chaotic lines */}
          <path 
            d={`M 20 60 Q 120 ${30 + Math.sin(pulseVal * 0.1) * 20} 220 70 T 420 ${50 + Math.cos(pulseVal * 0.1) * 25}`} 
            fill="none" 
            stroke="#f87171" 
            strokeWidth="1.5" 
            className="opacity-40"
          />
          <path 
            d={`M 10 80 Q 150 ${90 + Math.cos(pulseVal * 0.08) * 30} 280 40 T 450 ${80 + Math.sin(pulseVal * 0.08) * 15}`} 
            fill="none" 
            stroke="#fbbf24" 
            strokeWidth="1" 
            className="opacity-30"
          />
          {/* Chaotic jittery nodes */}
          <circle cx="80" cy={50 + Math.sin(pulseVal * 0.2) * 5} r="4" fill="#f87171" className="animate-ping" />
          <circle cx="180" cy={70 + Math.cos(pulseVal * 0.25) * 6} r="3" fill="#f87171" />
          <circle cx="280" cy={35 + Math.sin(pulseVal * 0.15) * 8} r="5" fill="#fbbf24" className="animate-pulse" />
          <circle cx="380" cy={85 + Math.cos(pulseVal * 0.3) * 5} r="3" fill="#f87171" />
        </svg>
        <div className="relative z-10 flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-widest bg-brand-dark-950/80 px-3 py-1 rounded-full border border-red-500/20">
          <Brain className="w-3.5 h-3.5 animate-bounce" />
          <span>Chaotic Stress State</span>
        </div>
      </div>
    );
  }

  if (type === "consult") {
    // Scene 2: Two symmetrical waves combining in phase - resonance of Doctor and Patient
    return (
      <div className="relative w-full h-32 flex items-center justify-center bg-sky-500/5 rounded-2xl border border-sky-500/10 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Two harmonized wave paths */}
          <path 
            d={`M 20 64 Q 110 ${30 + Math.sin(pulseVal * 0.05) * 15} 220 64 T 420 ${64 + Math.sin(pulseVal * 0.05) * 15}`} 
            fill="none" 
            stroke="#38bdf8" 
            strokeWidth="2.5" 
            className="opacity-80"
          />
          <path 
            d={`M 20 64 Q 110 ${98 - Math.sin(pulseVal * 0.05) * 15} 220 64 T 420 ${64 - Math.sin(pulseVal * 0.05) * 15}`} 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="1.5" 
            className="opacity-60"
          />
        </svg>
        <div className="relative z-10 flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-widest bg-brand-dark-950/80 px-3 py-1 rounded-full border border-sky-500/20">
          <UserPlus className="w-3.5 h-3.5 animate-pulse" />
          <span>Empathetic Dialogue Resonance</span>
        </div>
      </div>
    );
  }

  if (type === "diagnosis") {
    // Scene 3: Precise diagnostic scanning grid with target tracking circles
    return (
      <div className="relative w-full h-32 flex items-center justify-center bg-brand-blue-500/5 rounded-2xl border border-brand-blue-500/10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:16px_16px]" />
        
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Scanning sweep laser line */}
          <line 
            x1="0" 
            y1={16 + (pulseVal * 1.1) % 100} 
            x2="450" 
            y2={16 + (pulseVal * 1.1) % 100} 
            stroke="rgba(14, 165, 233, 0.4)" 
            strokeWidth="2" 
          />
          {/* Target lock overlay */}
          <circle cx="225" cy="64" r={15 + Math.sin(pulseVal * 0.1) * 5} fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
          <circle cx="225" cy="64" r="3" fill="#34d399" />
          <line x1="200" y1="64" x2="250" y2="64" stroke="#0ea5e9" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="225" y1="39" x2="225" y2="89" stroke="#0ea5e9" strokeWidth="0.5" strokeDasharray="3 3" />
        </svg>
        <div className="relative z-10 flex items-center gap-2 text-xs font-mono text-brand-blue-400 uppercase tracking-widest bg-brand-dark-950/90 px-3 py-1 rounded-full border border-brand-blue-500/30">
          <Search className="w-3.5 h-3.5 animate-spin" />
          <span>Precision Scan: L3-L4 TARGET SECURED</span>
        </div>
      </div>
    );
  }

  if (type === "treatment") {
    // Scene 4: Tailored plan step-by-step clean visual roadmap grid
    return (
      <div className="relative w-full h-32 flex items-center justify-around bg-indigo-500/5 rounded-2xl border border-indigo-500/10 overflow-hidden p-3">
        <div className="flex items-center gap-3 relative z-10 w-full px-4">
          {[
            { label: "Restoration", val: "Dosage", color: "border-brand-blue-500 text-brand-blue-400" },
            { label: "Activity", val: "Curated", color: "border-indigo-400 text-indigo-400" },
            { label: "Nutrient", val: "Support", color: "border-emerald-400 text-emerald-400" }
          ].map((item, idx) => (
            <div key={idx} className="flex-1 bg-brand-dark-950/80 border border-white/5 rounded-xl p-2.5 text-center space-y-1">
              <span className="text-[8px] font-mono uppercase text-gray-500 block">Stage 0{idx + 1}</span>
              <p className="text-[11px] font-sans font-medium text-white">{item.label}</p>
              <span className={`inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 border ${item.color}`}>
                {item.val}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "recovery") {
    // Scene 5: Beautiful stabilized clinical heartbeat line
    return (
      <div className="relative w-full h-32 flex items-center justify-center bg-emerald-500/5 rounded-2xl border border-emerald-500/10 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Cardiac heartbeat line path */}
          <path 
            d="M 10 64 L 120 64 L 140 44 L 155 94 L 170 14 L 185 74 L 195 64 L 320 64 L 340 44 L 355 94 L 370 14 L 385 74 L 395 64 L 440 64" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="3" 
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-90"
            strokeDasharray="1000"
            strokeDashoffset={pulseVal * 10}
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
        </svg>
        <div className="relative z-10 flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest bg-brand-dark-950/80 px-3 py-1 rounded-full border border-emerald-500/20 shadow-lg">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>Restored Vitals: 72 BPM STABLE</span>
        </div>
      </div>
    );
  }

  // Scene 6: Happy Family glowing circles radiating outward representing longevity
  return (
    <div className="relative w-full h-32 flex items-center justify-center bg-pink-500/5 rounded-2xl border border-pink-500/10 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="225" cy="64" r={10 + (pulseVal * 0.4)} fill="none" stroke="rgba(244, 114, 182, 0.15)" strokeWidth="2" />
        <circle cx="225" cy="64" r={25 + (pulseVal * 0.4)} fill="none" stroke="rgba(244, 114, 182, 0.08)" strokeWidth="1" />
        <circle cx="225" cy="64" r={40 + (pulseVal * 0.4)} fill="none" stroke="rgba(244, 114, 182, 0.04)" strokeWidth="0.5" />
      </svg>
      <div className="relative z-10 flex items-center gap-2 text-xs font-mono text-pink-400 uppercase tracking-widest bg-brand-dark-950/80 px-3 py-1 rounded-full border border-pink-500/20">
        <Users className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
        <span>Multi-Generational Wellness</span>
      </div>
    </div>
  );
}

export default function PatientJourney() {
  const [currentScene, setCurrentScene] = useState(0);

  const scenes = [
    {
      step: "01",
      title: "Silent Anxiety & Worry",
      phase: "Symptom Onset",
      sentiment: "Worry & Doubt",
      sentimentColor: "text-red-400 bg-red-400/5 border-red-400/20",
      icon: AlertTriangle,
      iconColor: "text-red-400 bg-red-400/10 border-red-400/20",
      narrative: "You experience sudden, persistent discomfort or chronic symptoms. Reading unverified advice online only multiplies your dread. You seek clarity, security, and a professional who will actually listen.",
      emotionalQuote: "“Will I be okay? I just want someone who understands.”",
      visualGraphic: "worried" as const,
      metrics: { label: "Patient Anxiety Index", value: "85% High Strain" }
    },
    {
      step: "02",
      title: "The Attentive Consultation",
      phase: "Empathetic Hearing",
      sentiment: "Calm & Heard",
      sentimentColor: "text-sky-400 bg-sky-400/5 border-sky-400/20",
      icon: UserPlus,
      iconColor: "text-sky-400 bg-sky-400/10 border-sky-400/20",
      narrative: "You step into Dr. Anantpal's calm Juhu clinic. No rushed schedules. Dr. Singh reviews your full clinical history, asking meticulous questions and offering immediate reassurance. The worry begins to lift.",
      emotionalQuote: "“For the first time, a doctor sat with me for 30 minutes, hearing every detail.”",
      visualGraphic: "consult" as const,
      metrics: { label: "Patient Comfort Rating", value: "99% Empathetic" }
    },
    {
      step: "03",
      title: "Meticulous & Precise Diagnosis",
      phase: "Uncovering Root Causes",
      sentiment: "Clarity & Truth",
      sentimentColor: "text-brand-blue-400 bg-brand-blue-400/5 border-brand-blue-400/20",
      icon: Search,
      iconColor: "text-brand-blue-400 bg-brand-blue-400/10 border-brand-blue-400/20",
      narrative: "Using top-tier diagnostic methods, Dr. Singh looks past superficial symptoms to find the underlying dysfunction. He walks you through the physiology using simple, visual medical explanations.",
      emotionalQuote: "“We didn't just guess. He ran exact tests and found exactly where my system was struggling.”",
      visualGraphic: "diagnosis" as const,
      metrics: { label: "Diagnostic Accuracy", value: "Gold Standard Precision" }
    },
    {
      step: "04",
      title: "Tailored Restorative Plan",
      phase: "Bespoke Treatment",
      sentiment: "Empowered Path",
      sentimentColor: "text-indigo-400 bg-indigo-400/5 border-indigo-400/20",
      icon: FileText,
      iconColor: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
      narrative: "No heavy, unnecessary prescription loads. Dr. Singh charts a step-by-step roadmap tailored specifically for your lifestyle, mixing medical treatment with targeted, daily restorative guides.",
      emotionalQuote: "“The schedule was clear. He explained the purpose of every single dosage.”",
      visualGraphic: "treatment" as const,
      metrics: { label: "Unneeded Drugs Avoided", value: "Meticulously Curated" }
    },
    {
      step: "05",
      title: "Restoration & Healing",
      phase: "Active Recovery",
      sentiment: "Progress & Hope",
      sentimentColor: "text-emerald-400 bg-emerald-400/5 border-emerald-400/20",
      icon: Activity,
      iconColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      narrative: "With proactive weekly follow-ups and constant accessibility via WhatsApp/Phone, you make measurable recovery gains. Sleep restores, pain diminishes, and confidence returns.",
      emotionalQuote: "“His emergency hotline was a lifeline. I felt protected every single day.”",
      visualGraphic: "recovery" as const,
      metrics: { label: "Average Recovery Pace", value: "Optimized & Protected" }
    },
    {
      step: "06",
      title: "Restored Family Longevity",
      phase: "Thriving Tomorrow",
      sentiment: "Ultimate Joy",
      sentimentColor: "text-pink-400 bg-pink-400/5 border-pink-400/20",
      icon: Users,
      iconColor: "text-pink-400 bg-pink-400/10 border-pink-400/20",
      narrative: "You return fully to the warmth of your family life. Because Dr. Singh treats multi-generational households, your kids, parents, and grandchildren now share the same trusted clinical guardian.",
      emotionalQuote: "“He saved my father, treated my daughter, and restored my health. Our absolute family doctor.”",
      visualGraphic: "happy" as const,
      metrics: { label: "Generational Care Span", value: "3+ Decades Trusted" }
    }
  ];

  return (
    <div className="relative">
      {/* Narrative Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Interactive Nav Steps */}
        <div className="lg:col-span-5 space-y-3 order-2 lg:order-1">
          <p className="text-[10px] font-mono uppercase text-gray-500 tracking-[0.25em] text-left">
            Interactive Journey Sequence:
          </p>
          <div className="space-y-2">
            {scenes.map((scene, index) => {
              const IconComp = scene.icon;
              const isActive = currentScene === index;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentScene(index)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center gap-4 transition-all duration-300 relative overflow-hidden group ${
                    isActive 
                      ? "bg-brand-blue-500/10 border-brand-blue-400 shadow-[0_4px_20px_rgba(14,165,233,0.1)]" 
                      : "bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl border flex-shrink-0 transition-transform duration-300 ${
                    isActive ? "bg-brand-blue-500 text-white scale-110" : "bg-white/5 border-white/5 text-gray-500"
                  }`}>
                    <IconComp className="w-4 h-4" />
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-brand-blue-400 tracking-wider">
                        {scene.phase}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[8.5px] font-mono uppercase border tracking-widest ${scene.sentimentColor}`}>
                        {scene.sentiment}
                      </span>
                    </div>
                    <h5 className={`text-sm font-sans font-medium mt-1 truncate ${isActive ? "text-white" : "text-gray-400"}`}>
                      {scene.title}
                    </h5>
                  </div>

                  <div className="text-xs font-mono text-gray-600 font-bold pr-1">
                    {scene.step}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Animated Cinematic Screen */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-br from-brand-dark-950 to-brand-dark-900 p-6 sm:p-8 min-h-[490px] flex flex-col justify-between shadow-2xl relative">
            {/* Soft decorative visual grids & glows */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-5 flex-grow flex flex-col justify-between relative z-10"
              >
                {/* Scene Meta Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-left">
                    <span className="text-xs font-mono text-brand-blue-400 font-bold bg-brand-blue-400/10 border border-brand-blue-400/20 px-2 py-0.5 rounded-md">
                      SCENE {scenes[currentScene].step}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">• {scenes[currentScene].phase}</span>
                  </div>
                  <div className={`px-2.5 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase border ${scenes[currentScene].sentimentColor}`}>
                    {scenes[currentScene].sentiment}
                  </div>
                </div>

                {/* Interactive Motion Graphic Vector */}
                <SceneGraphic type={scenes[currentScene].visualGraphic} />

                {/* Cinematic Story Title & Content */}
                <div className="space-y-3 text-left">
                  <h4 className="text-2xl sm:text-3xl font-display font-medium text-white tracking-tight">
                    {scenes[currentScene].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                    {scenes[currentScene].narrative}
                  </p>
                </div>

                {/* Emotional Patient quote card */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden text-left">
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-brand-blue-400" />
                  <p className="text-xs text-brand-blue-200 italic font-sans leading-relaxed">
                    {scenes[currentScene].emotionalQuote}
                  </p>
                  <p className="text-[9.5px] font-mono text-gray-500 uppercase tracking-widest mt-2">
                    — verified clinical milestone case
                  </p>
                </div>

                {/* Bottom Stats Meta */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-white/5 pt-4">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-blue-400 animate-pulse" />
                    <div>
                      <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">
                        {scenes[currentScene].metrics.label}
                      </p>
                      <p className="text-xs text-white font-mono font-semibold">
                        {scenes[currentScene].metrics.value}
                      </p>
                    </div>
                  </div>

                  {/* Manual Steppers */}
                  <div className="flex items-center gap-2 self-end">
                    <button
                      onClick={() => setCurrentScene((prev) => (prev > 0 ? prev - 1 : scenes.length - 1))}
                      className="w-8 h-8 rounded-lg border border-white/10 hover:border-brand-blue-400 bg-white/5 hover:bg-brand-blue-500/10 flex items-center justify-center text-gray-400 hover:text-white transition-all text-xs font-mono cursor-pointer"
                    >
                      ←
                    </button>
                    <span className="text-[11px] font-mono text-gray-500 px-1">
                      {currentScene + 1} / {scenes.length}
                    </span>
                    <button
                      onClick={() => setCurrentScene((prev) => (prev < scenes.length - 1 ? prev + 1 : 0))}
                      className="w-8 h-8 rounded-lg border border-white/10 hover:border-brand-blue-400 bg-white/5 hover:bg-brand-blue-500/10 flex items-center justify-center text-gray-400 hover:text-white transition-all text-xs font-mono cursor-pointer"
                    >
                      →
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
