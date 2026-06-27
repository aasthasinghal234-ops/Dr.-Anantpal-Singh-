import { useState, useEffect } from "react";
import { 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  Navigation, 
  Compass, 
  Camera, 
  Milestone, 
  Car, 
  Info,
  ChevronRight,
  Sparkles,
  Sun,
  Moon,
  Zap,
  Calendar,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function MapSection() {
  const address = "Creado Apartments, 7, Juhu Rd, Near Juhu Market, Juhu, Mumbai, Maharashtra 400049";
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=7+Juhu+Rd+Market+Juhu+Mumbai+Maharashtra+400049`;

  const [activeTab, setActiveTab] = useState<"map" | "gallery" | "route">("map");
  const [selectedLandmark, setSelectedLandmark] = useState<number | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // Map settings
  const [mapTheme, setMapTheme] = useState<"night" | "day">("night");
  const [zoomStage, setZoomStage] = useState<"mumbai" | "juhu" | "clinic">("clinic");
  const [pinDropped, setPinDropped] = useState(true);

  // Map zoom trigger
  const runZoomSimulation = () => {
    setPinDropped(false);
    setZoomStage("mumbai");
    setTimeout(() => {
      setZoomStage("juhu");
      setTimeout(() => {
        setZoomStage("clinic");
        setPinDropped(true);
      }, 1500);
    }, 1200);
  };

  // Compute query coordinates based on stage
  const getMapIframeUrl = () => {
    let q = "";
    let z = "16";
    if (zoomStage === "mumbai") {
      q = "Mumbai, Maharashtra";
      z = "11";
    } else if (zoomStage === "juhu") {
      q = "Juhu, Mumbai";
      z = "14";
    } else {
      q = "7, Juhu Rd, Near Juhu Market, Juhu, Mumbai, Maharashtra 400049";
      z = "18";
    }
    return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=${z}&ie=UTF8&iwloc=&output=embed`;
  };

  // Gallery Data using Unsplash (Real-world luxury clinical spaces)
  const galleryItems = [
    {
      title: "Clinic Exterior Facade",
      description: "Conveniently located on Juhu Road. Prominent elegant brass signage with clean night lighting and nearby valet parking coordinates.",
      tag: "FRONT FACADE",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Patient Healing Reception Lounge",
      description: "Designed with low-anxiety acoustics, custom circadian warm lights, and plush single-patient armchairs to reduce wait times.",
      tag: "RECEPTION SUITE",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Private Consultation Chamber",
      description: "Equipped with specialized high-contrast clinical imaging screens and an unhurried, peaceful diagnostic atmosphere.",
      tag: "CONSULTING SUITE",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    }
  ];

  // Nearby Landmarks
  const landmarks = [
    {
      name: "Juhu Beach Chowpatty",
      distance: "400 meters",
      time: "5 Mins Walk",
      type: "Coastal Landmark",
      tip: "Walk past the coastline circle directly onto Juhu Tara Road."
    },
    {
      name: "Juhu Post Office Crossroad",
      distance: "150 meters",
      time: "2 Mins Walk",
      type: "Public Marker",
      tip: "Located directly opposite the main post office crossing."
    },
    {
      name: "JW Marriott Juhu Hotel",
      distance: "800 meters",
      time: "10 Mins Walk",
      type: "Luxury Node",
      tip: "Easy cab/auto ride or walk past the beach roundabout."
    },
    {
      name: "Nanavati Max Super Specialty",
      distance: "2.4 kilometers",
      time: "8 Mins Drive",
      type: "Tertiary Hospital",
      tip: "Primary referral route for major clinical cases."
    }
  ];

  // Pre-planned Route steps
  const routeSteps = [
    {
      instruction: "Arrive at Juhu Circle / S.V. Road Junction",
      detail: "Head south-west on Juhu Tara Road towards Juhu Beach.",
      duration: "3 mins",
      icon: Car
    },
    {
      instruction: "Turn Left onto Juhu Road at Juhu Chowpatty",
      detail: "Pass the coast. Stay right towards Juhu Post Office.",
      duration: "2 mins",
      icon: Milestone
    },
    {
      instruction: "Arrive at Creado Apartments, 7 Juhu Road",
      detail: "Ground floor location, 50 meters before Juhu Market. Dedicated clinical parking coordinates active.",
      duration: "Immediate",
      icon: MapPin
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      
      {/* LEFT COLUMN: CONTROL & DIRECTORY PANEL */}
      <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden border border-white/5 bg-brand-dark-950/75 shadow-2xl">
        <div className="absolute -left-12 -top-12 w-48 h-48 bg-brand-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-6 relative z-10 flex-grow">
          {/* Header */}
          <div className="space-y-1">
            <span className="px-3 py-1 text-[9px] font-mono uppercase tracking-widest text-brand-blue-400 bg-brand-blue-400/10 border border-brand-blue-400/20 rounded-full inline-block">
              SECURED ACCESS COORDINATES
            </span>
            <h4 className="text-2xl font-display font-medium text-white tracking-tight">
              Interactive Location
            </h4>
            <p className="text-xs text-gray-400 font-mono">
              JUHU ROAD • MUMBAI, MAHARASHTRA
            </p>
          </div>

          {/* Interactive Navigation Mode tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-white/[0.02] border border-white/5 rounded-xl text-xs font-mono">
            <button
              onClick={() => setActiveTab("map")}
              className={`py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 ${
                activeTab === "map"
                  ? "bg-brand-blue-500 text-white shadow-md font-medium"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Map Info</span>
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 ${
                activeTab === "gallery"
                  ? "bg-brand-blue-500 text-white shadow-md font-medium"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Spaces</span>
            </button>
            <button
              onClick={() => setActiveTab("route")}
              className={`py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 ${
                activeTab === "route"
                  ? "bg-brand-blue-500 text-white shadow-md font-medium"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              <Milestone className="w-3.5 h-3.5" />
              <span>Route Plan</span>
            </button>
          </div>

          {/* TAB CONTENTS */}
          <div className="min-h-[260px] relative">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: COORDINATES MAP DETAIL */}
              {activeTab === "map" && (
                <motion.div
                  key="map-info-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {/* Address coordinates */}
                  <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue-500/10 border border-brand-blue-500/20 flex items-center justify-center text-brand-blue-400 flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 text-left">
                      <p className="text-[9px] uppercase tracking-wider font-mono text-gray-500">Official Postal Coordinates</p>
                      <p className="text-xs text-gray-200 leading-relaxed font-sans">
                        {address}
                      </p>
                    </div>
                  </div>

                  {/* Consultation hours and quick contact coordinates */}
                  <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue-500/10 border border-brand-blue-500/20 flex items-center justify-center text-brand-blue-400 flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5 text-left w-full">
                      <p className="text-[9px] uppercase tracking-wider font-mono text-gray-500">Clinical Consulting Hours</p>
                      <div className="text-[11px] text-gray-300 space-y-1 font-mono">
                        <div className="flex justify-between">
                          <span>Morning Slots:</span>
                          <span className="text-white">09:00 AM - 12:30 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Evening Slots:</span>
                          <span className="text-white">04:00 PM - 07:30 PM</span>
                        </div>
                      </div>
                      <p className="text-emerald-400 font-sans text-[10px] flex items-center gap-1 mt-1 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                        24x7 Direct Emergency Hotlines Active
                      </p>
                    </div>
                  </div>

                  {/* Landmarks highlights */}
                  <div className="space-y-2 pt-1 text-left">
                    <p className="text-[9px] font-mono uppercase text-gray-500 tracking-wider flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-brand-blue-400" />
                      Travel Landmarks Advisory:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {landmarks.map((lm, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedLandmark(selectedLandmark === idx ? null : idx)}
                          className={`p-2 text-left rounded-xl border text-[11px] transition-all duration-300 ${
                            selectedLandmark === idx
                              ? "bg-brand-blue-500/15 border-brand-blue-400 text-white shadow-lg"
                              : "bg-white/[0.01] border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                          }`}
                        >
                          <div className="font-sans font-medium truncate">{lm.name}</div>
                          <div className="flex items-center justify-between text-[9px] font-mono text-brand-blue-400 mt-0.5">
                            <span>{lm.distance}</span>
                            <span>{lm.time}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Landmark tip popup */}
                    <AnimatePresence>
                      {selectedLandmark !== null && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-3 bg-brand-blue-500/5 border border-brand-blue-500/10 rounded-xl text-xs space-y-1 overflow-hidden text-left"
                        >
                          <div className="flex items-center justify-between font-mono text-[9px] text-brand-blue-400 uppercase font-bold">
                            <span>{landmarks[selectedLandmark].type}</span>
                            <span>ROUTE TIP</span>
                          </div>
                          <p className="text-gray-300 font-sans italic leading-relaxed">
                            "{landmarks[selectedLandmark].tip}"
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: LUXURIOUS CLINIC SPACES */}
              {activeTab === "gallery" && (
                <motion.div
                  key="gallery-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-brand-dark-900 group">
                    <img
                      src={galleryItems[activeGalleryIndex].image}
                      alt={galleryItems[activeGalleryIndex].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-950 via-brand-dark-950/30 to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-2 py-0.5 text-[8px] font-mono tracking-widest text-white bg-brand-blue-500/90 rounded-md border border-white/10 font-bold uppercase">
                      {galleryItems[activeGalleryIndex].tag}
                    </span>

                    <div className="absolute bottom-3 inset-x-3 text-left">
                      <h5 className="text-sm font-display font-medium text-white">
                        {galleryItems[activeGalleryIndex].title}
                      </h5>
                      <p className="text-[11px] text-gray-300 leading-relaxed mt-1 font-light font-sans">
                        {galleryItems[activeGalleryIndex].description}
                      </p>
                    </div>
                  </div>

                  {/* Carousel navigation nodes */}
                  <div className="flex items-center justify-center gap-2">
                    {galleryItems.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveGalleryIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          activeGalleryIndex === i
                            ? "bg-brand-blue-400 scale-125 w-5"
                            : "bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Go to space slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 3: ALIGNED ARRIVAL ROUTE */}
              {activeTab === "route" && (
                <motion.div
                  key="route-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  <p className="text-[9px] font-mono text-brand-blue-400 uppercase tracking-widest text-left">
                    Clinical Arrival Workflow Sequence
                  </p>
                  
                  <div className="relative pl-6 space-y-4 text-left">
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-brand-blue-500 via-brand-blue-400/40 to-transparent" />

                    {routeSteps.map((step, idx) => {
                      const StepIcon = step.icon;
                      return (
                        <div key={idx} className="relative space-y-1">
                          {/* Pulsing map nodes */}
                          <div className="absolute -left-6 top-1.5 w-6 h-6 rounded-full bg-brand-dark-950 border-2 border-brand-blue-500 flex items-center justify-center text-brand-blue-400 scale-90 z-10">
                            <StepIcon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-sans font-semibold text-white">
                              {step.instruction}
                            </h5>
                            <span className="text-[9px] font-mono text-brand-blue-400 uppercase bg-brand-blue-500/10 px-1.5 py-0.5 rounded">
                              {step.duration}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                            {step.detail}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* BOTTOM GLOBAL BUTTON ACTIONS */}
        <div className="pt-6 border-t border-white/5 relative z-10 flex flex-col sm:flex-row gap-3">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-5 py-3.5 rounded-xl bg-brand-blue-500 hover:bg-brand-blue-600 text-white font-mono text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_15px_rgba(14,165,233,0.35)] hover:scale-[1.01]"
          >
            <Navigation className="w-3.5 h-3.5 fill-current" />
            <span>📍 Visit Clinic</span>
          </a>
          <a
            href="tel:+919322245341"
            className="px-5 py-3.5 rounded-xl border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 text-red-400 font-mono text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all duration-300"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>📞 Call Now</span>
          </a>
        </div>
      </div>

      {/* RIGHT COLUMN: HIGH-FIDELITY MAP CANVAS WITH FLOW CONTROLLER */}
      <div className="lg:col-span-7 h-[460px] lg:h-auto rounded-3xl overflow-hidden glass-panel border border-white/5 relative group p-2 shadow-2xl bg-[#03060d] flex flex-col justify-between">
        
        {/* UPPER CONTROLLERS */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between select-none pointer-events-auto">
          {/* Glowing Clinic Status */}
          <div className="px-3 py-1.5 rounded-xl bg-brand-dark-950/90 border border-white/10 backdrop-blur-md flex items-center gap-2 text-[9px] font-mono text-white shadow-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold">DR. ANANTPAL SINGH CLINIC • ONLINE NOW</span>
          </div>

          {/* Controller tools */}
          <div className="flex items-center gap-1.5">
            {/* Run zoom sequence simulation */}
            <button
              onClick={runZoomSimulation}
              className="px-3 py-1.5 rounded-xl bg-brand-blue-500 hover:bg-brand-blue-600 text-white font-mono text-[9px] uppercase font-bold tracking-wider flex items-center gap-1 border border-brand-blue-400/20 shadow-lg transition-all active:scale-95 cursor-pointer"
              title="Simulate Mumbai-to-Juhu landing sequence"
            >
              <Zap className="w-3 h-3 text-amber-300 animate-pulse" />
              <span>Simulate Radar</span>
            </button>

            {/* Day/Night map filter toggle */}
            <button
              onClick={() => setMapTheme(mapTheme === "night" ? "day" : "night")}
              className="p-1.5 rounded-xl bg-brand-dark-950/90 hover:bg-white/10 text-gray-300 border border-white/10 backdrop-blur-md shadow-lg transition-all active:scale-95 cursor-pointer"
              title="Toggle Day/Night Map Layout Theme"
            >
              {mapTheme === "night" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-brand-blue-400" />
              )}
            </button>
          </div>
        </div>

        {/* MAP STAGE DISPLAY WRAPPER */}
        <div className="relative flex-grow rounded-2xl overflow-hidden h-full">
          <iframe
            src={getMapIframeUrl()}
            width="100%"
            height="100%"
            className="border-0 h-full w-full pointer-events-auto transition-all duration-700"
            allowFullScreen
            loading="lazy"
            title="Interactive Diagnostic Google Map Coordinate System"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ 
              filter: mapTheme === "night" 
                ? "grayscale(0.7) invert(0.92) contrast(1.18) hue-rotate(185deg) brightness(0.9)" 
                : "grayscale(0.15) contrast(1.02) saturate(1.05)" 
            }}
          />

          {/* Sky-dropping interactive locator pin */}
          <AnimatePresence>
            {pinDropped && (
              <motion.div 
                initial={{ y: -300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                {/* Hover display popup */}
                <div className="relative flex flex-col items-center">
                  
                  {/* Floating luxury label card */}
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: -45 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className="absolute bg-brand-dark-950/90 border border-white/15 backdrop-blur-md p-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-center min-w-[200px]"
                  >
                    <h5 className="text-[11px] font-display font-medium text-white uppercase tracking-wider">
                      Dr. Anantpal Singh Clinic
                    </h5>
                    <p className="text-[9px] font-mono text-brand-blue-400 mt-0.5 font-bold">
                      Emergency Care &amp; Family Physician
                    </p>
                    <p className="text-[8px] text-gray-400 mt-1 font-mono">
                      Juhu Road, Mumbai
                    </p>
                    
                    {/* Tiny inline CTA controls */}
                    <div className="flex gap-1.5 mt-2 justify-center border-t border-white/5 pt-2">
                      <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="px-1.5 py-0.5 rounded bg-brand-blue-500 text-[8px] font-mono text-white hover:bg-brand-blue-600">
                        📍 Visit
                      </a>
                      <a href="tel:+919322245341" className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] font-mono text-gray-300 hover:bg-white/10">
                        📞 Call
                      </a>
                      <a href="#booking-section" className="px-1.5 py-0.5 rounded bg-emerald-500 text-[8px] font-mono text-white hover:bg-emerald-600">
                        📅 Book
                      </a>
                    </div>
                  </motion.div>

                  {/* Pulsing locator rings */}
                  <div className="absolute -inset-4 rounded-full bg-brand-blue-500/40 animate-ping opacity-75" />
                  <div className="absolute -inset-8 rounded-full bg-brand-blue-500/15 animate-pulse opacity-50" />
                  
                  {/* Real Clinic micro photo thumbnail inside marker pin */}
                  <div className="relative w-10 h-10 rounded-full bg-brand-blue-500 border-2 border-white shadow-2xl flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=100" 
                      alt="Clinic pin thumbnail" 
                      className="w-full h-full object-cover filter brightness-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Overlay radar telemetry log lines */}
          <div className="absolute bottom-4 left-4 z-10 font-mono text-[8px] text-gray-500 space-y-0.5 uppercase tracking-widest pointer-events-none bg-brand-dark-950/40 p-2 rounded-md">
            <p>LAT: 19.1022° N</p>
            <p>LNG: 72.8256° E</p>
            <p>Z-RES: {zoomStage.toUpperCase()} ({mapTheme.toUpperCase()})</p>
          </div>
          
          {/* Ambient vignette */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-brand-dark-950 to-transparent opacity-95 pointer-events-none" />
        </div>
      </div>

    </div>
  );
}
