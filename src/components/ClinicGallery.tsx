import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight, Eye, ShieldCheck, HelpCircle } from "lucide-react";

interface GalleryImage {
  id: string;
  category: "doctor" | "spaces" | "cases";
  title: string;
  description: string;
  url: string;
  localPath: string; // Documented path for local assets
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "dr-portrait-1",
    category: "doctor",
    title: "Dr. Anantpal Singh",
    description: "Senior family physician and critical care consultant with 30+ years of dedicated healing practice.",
    url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
    localPath: "/assets/dr_anantpal_portrait.jpg"
  },
  {
    id: "dr-consultation-1",
    category: "doctor",
    title: "Personalized Patient Consultation",
    description: "An unhurried, meticulous diagnostic review centered entirely on patient symptoms and cellular health.",
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    localPath: "/assets/dr_consultation_session.jpg"
  },
  {
    id: "clinic-exterior",
    category: "spaces",
    title: "Clinic Exterior (Creado Apartments)",
    description: "Pristine private clinic facade conveniently located on Juhu Road near Juhu Market with dedicated parking.",
    url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    localPath: "/assets/clinic_exterior_juhu.jpg"
  },
  {
    id: "clinic-reception",
    category: "spaces",
    title: "Executive Reception Area",
    description: "A calming, quiet arrival lobby designed to reduce patient stress and eliminate extended waiting intervals.",
    url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    localPath: "/assets/clinic_reception_lobby.jpg"
  },
  {
    id: "clinic-consultation-room",
    category: "spaces",
    title: "Clinical Consultation Suite",
    description: "Where diagnostic analysis takes place, equipped with advanced monitoring coordinates.",
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
    localPath: "/assets/clinic_consultation_room.jpg"
  },
  {
    id: "clinic-treatment-area",
    category: "spaces",
    title: "Advanced Emergency Care Suite",
    description: "Configured with high-fidelity emergency life support systems, pediatric diagnostics, and sterile procedure apparatus.",
    url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    localPath: "/assets/clinic_treatment_area.jpg"
  }
];

export default function ClinicGallery() {
  const [activeTab, setActiveTab] = useState<"all" | "doctor" | "spaces" | "cases">("all");
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [beforeAfterVal, setBeforeAfterVal] = useState<number>(50); // percentage for the slider
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const filteredImages = GALLERY_IMAGES.filter(
    (img) => activeTab === "all" || img.category === activeTab
  );

  const handleNextImage = () => {
    if (!selectedImage) return;
    const currentIdx = filteredImages.findIndex((img) => img.id === selectedImage.id);
    const nextIdx = (currentIdx + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIdx]);
    setZoomScale(1);
  };

  const handlePrevImage = () => {
    if (!selectedImage) return;
    const currentIdx = filteredImages.findIndex((img) => img.id === selectedImage.id);
    const prevIdx = (currentIdx - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIdx]);
    setZoomScale(1);
  };

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(prev - 0.25, 0.75));
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, filteredImages]);

  return (
    <div className="space-y-12 w-full">
      
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-white/5 pb-6">
        {(["all", "doctor", "spaces", "cases"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
              activeTab === tab
                ? "bg-brand-blue-500 text-white shadow-[0_4px_15px_rgba(14,165,233,0.3)]"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {tab === "all" ? "All Media" : tab === "doctor" ? "Dr. Anantpal Singh" : tab === "spaces" ? "Clinic Environment" : "Clinical Case Studies"}
          </button>
        ))}
      </div>

      {/* Grid Layout & Before/After Section depending on selected tab */}
      {activeTab === "cases" ? (
        /* INTERACTIVE BEFORE/AFTER SECTION */
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Interactive Clinical Study</span>
            <h3 className="text-xl md:text-2xl font-display text-white">Postural Alignment & Vertebral Recovery</h3>
            <p className="text-xs text-gray-400 max-w-lg mx-auto font-light">
              Slide the central partition to review therapeutic posture realignment achieved after a custom 6-month orthopaedic care program led by Dr. Anantpal Singh.
            </p>
          </div>

          <div 
            ref={sliderContainerRef}
            className="relative h-[320px] md:h-[480px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl select-none group"
          >
            {/* Before state (Vertebral stress / compression) */}
            <div className="absolute inset-0 bg-[#070b13]">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200" 
                alt="Before treatment"
                className="w-full h-full object-cover filter saturate-50 brightness-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-red-500/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono uppercase text-white tracking-widest">
                Before: Spinal Strain
              </div>
              
              {/* Overlay graphics showing misalignment */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 300 50 Q 220 200 310 400" fill="none" stroke="#f87171" strokeWidth="5" strokeDasharray="8 6" className="animate-pulse" />
                <circle cx="260" cy="200" r="14" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2" />
                <text x="290" y="205" fill="#f87171" className="text-[10px] font-mono tracking-widest">L3-L4 DEPRESSION</text>
              </svg>
            </div>

            {/* After state (Decompressed, optimal posture) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${beforeAfterVal}%` }}
            >
              <div className="absolute inset-0 w-full h-full bg-[#050810] min-w-[320px] md:min-w-[896px]">
                <img 
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200" 
                  alt="After treatment"
                  className="w-full h-full object-cover filter saturate-100 brightness-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-emerald-500/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono uppercase text-white tracking-widest whitespace-nowrap">
                  After: Realignment Achieved
                </div>

                {/* Overlay graphics showing healthy alignment */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg">
                  <path d="M 300 50 Q 300 200 300 400" fill="none" stroke="#34d399" strokeWidth="5" />
                  <circle cx="300" cy="200" r="14" fill="rgba(52, 211, 153, 0.2)" stroke="#10b981" strokeWidth="2" />
                  <text x="325" y="205" fill="#34d399" className="text-[10px] font-mono tracking-widest">DECOMPRESSED Alignment</text>
                </svg>
              </div>
            </div>

            {/* Input Slider Controller (Invisible overlay that captures mouse drag) */}
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={beforeAfterVal} 
              onChange={(e) => setBeforeAfterVal(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />

            {/* Sliding Divider Bar Indicator */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white z-20 pointer-events-none"
              style={{ left: `${beforeAfterVal}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-brand-blue-500 border-2 border-white flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.5)]">
                <div className="flex gap-0.5 text-white">
                  <span className="text-[9px] font-bold">◂</span>
                  <span className="text-[9px] font-bold">▸</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center bg-brand-dark-950/60 border border-white/5 rounded-2xl p-4 font-mono text-[10px] text-gray-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Patient Privacy Retained
            </span>
            <span className="text-right">Drag the slider left or right to inspect rehabilitation changes.</span>
          </div>
        </motion.div>
      ) : (
        /* STANDARD GALLERY LAYOUT WITH ZOOM & PROGRESSIVE SKELETON LOAD */
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, idx) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 10 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedImage(img)}
              >
                {/* Image Frame Glass Card */}
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-brand-dark-900 border border-white/5 shadow-lg group-hover:border-brand-blue-500/40 group-hover:shadow-[0_10px_30px_rgba(14,165,233,0.15)] transition-all duration-500">
                  
                  {/* Skeleton Loader Overlay */}
                  {!loadedImages[img.id] && (
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-dark-900 via-brand-dark-950 to-brand-dark-900 animate-pulse flex items-center justify-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 rounded-full border-2 border-t-brand-blue-400 border-brand-blue-400/20 animate-spin" />
                        <span className="text-[9px] font-mono tracking-widest text-gray-600 uppercase">Securing Asset Stream...</span>
                      </div>
                    </div>
                  )}

                  {/* Progressive Image Element */}
                  <img
                    src={img.url}
                    alt={img.title}
                    onLoad={() => handleImageLoad(img.id)}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${
                      loadedImages[img.id] ? "opacity-90 scale-100 filter brightness-[0.85] saturate-[0.85] group-hover:brightness-100 group-hover:saturate-100" : "opacity-0"
                    }`}
                  />

                  {/* Dark Elegant Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-950 via-transparent to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none" />

                  {/* Hover Floating Actions Indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-dark-950/80 backdrop-blur-md p-2 rounded-xl border border-white/10">
                    <Eye className="w-4 h-4 text-brand-blue-400" />
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 bg-brand-dark-950/80 backdrop-blur-md border border-white/5 px-2.5 py-1 rounded-lg text-[8px] font-mono uppercase tracking-widest text-brand-blue-400">
                    {img.category === "doctor" ? "Faculty" : "Clinic Space"}
                  </div>

                  {/* Bottom Captions Overlay */}
                  <div className="absolute bottom-4 inset-x-4 space-y-1">
                    <h4 className="text-sm font-display font-medium text-white group-hover:text-brand-blue-400 transition-colors duration-300">
                      {img.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 line-clamp-1 group-hover:text-gray-300 font-light">
                      {img.description}
                    </p>
                  </div>
                </div>

                {/* Local Photo Upload Help Comment overlay for engineers */}
                <div className="absolute -bottom-5 right-0 text-[8px] font-mono text-gray-600 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Local Target: <span className="text-gray-400">{img.localPath}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* LIGHTBOX MODAL WITH ULTRA REFINEMENT */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl px-4 py-8"
          >
            {/* Upper Action Bar */}
            <div className="absolute top-4 inset-x-4 md:inset-x-8 flex items-center justify-between z-10">
              <div className="font-mono text-xs text-gray-400">
                <span className="text-brand-blue-400 font-bold uppercase mr-2">{selectedImage.category}</span>
                {filteredImages.findIndex((img) => img.id === selectedImage.id) + 1} / {filteredImages.length}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Zoom In */}
                <button
                  onClick={handleZoomIn}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5 transition-all"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                {/* Zoom Out */}
                <button
                  onClick={handleZoomOut}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5 transition-all"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all ml-4"
                  title="Close (ESC)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Stage Panel */}
            <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center">
              
              {/* Left Navigation Chevron */}
              <button
                onClick={handlePrevImage}
                className="absolute left-0 md:-left-16 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/5 z-20 transition-all hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Lightbox Photo Display Wrapper */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 max-h-[65vh] w-full flex items-center justify-center bg-brand-dark-950">
                <motion.img
                  key={selectedImage.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: zoomScale }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ cursor: zoomScale > 1 ? "grab" : "default" }}
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[65vh] max-w-full object-contain pointer-events-auto origin-center transition-transform duration-200"
                />
              </div>

              {/* Right Navigation Chevron */}
              <button
                onClick={handleNextImage}
                className="absolute right-0 md:-right-16 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/5 z-20 transition-all hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Caption Sheet */}
            <div className="w-full max-w-2xl text-center mt-6 space-y-2 relative z-10 px-4">
              <motion.div
                key={`caption-${selectedImage.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <h3 className="text-xl font-display font-medium text-white">
                  {selectedImage.title}
                </h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed max-w-lg mx-auto">
                  {selectedImage.description}
                </p>
                <div className="pt-4 border-t border-white/5 flex items-center justify-center gap-1.5 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  <HelpCircle className="w-3.5 h-3.5 text-brand-blue-400" />
                  <span>Interactive Preview Mode • Real Photo Slot Available</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
