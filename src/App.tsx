import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  Activity, 
  Phone, 
  BookOpen, 
  Calendar, 
  Award, 
  Shield, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X, 
  ArrowRight, 
  Baby, 
  Stethoscope, 
  HeartHandshake, 
  Home, 
  ShieldCheck, 
  Syringe, 
  UserCheck, 
  BriefcaseMedical, 
  Sparkles,
  MapPin,
  Clock,
  Star,
  Newspaper,
  Building2,
  Globe
} from "lucide-react";

import { Service, Review, TimelineEvent, StatItem, BookItem } from "./types";
import DNABackground from "./components/DNABackground";
import HeartbeatLine from "./components/HeartbeatLine";
import TiltCard from "./components/TiltCard";
import Book3D from "./components/Book3D";
import TestimonialCarousel from "./components/TestimonialCarousel";
import BookingForm from "./components/BookingForm";
import MapSection from "./components/MapSection";
import AnimatedCounter from "./components/AnimatedCounter";
import PatientJourney from "./components/PatientJourney";
import ReviewMarquee from "./components/ReviewMarquee";
import ClinicGallery from "./components/ClinicGallery";
import { PremiumLoadingScreen, ScrollProgressIndicator, CosmicLightRays } from "./components/PremiumEffects";
import AffiliationsTicker from "./components/AffiliationsTicker";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [scrolled, setScrolled] = useState(false);

  // Monitor scrolling to style the header glass
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Affiliations & Media Mentions Dataset
  const affiliations = [
    {
      id: "mmc",
      name: "Maharashtra Medical Council",
      shortName: "MMC MUMBAI",
      type: "medical",
      icon: Award,
      colorClass: "group-hover:text-emerald-400 group-hover:border-emerald-500/20 group-hover:bg-emerald-500/5",
      glowColor: "rgba(16, 185, 129, 0.15)",
      textAccent: "text-emerald-400",
      role: "Registered & Accredited Member"
    },
    {
      id: "ima",
      name: "Indian Medical Association",
      shortName: "IMA",
      type: "medical",
      icon: Activity,
      colorClass: "group-hover:text-red-400 group-hover:border-red-500/20 group-hover:bg-red-500/5",
      glowColor: "rgba(239, 68, 68, 0.15)",
      textAccent: "text-red-400",
      role: "Lifetime Member Council"
    },
    {
      id: "toi",
      name: "The Times of India",
      shortName: "TIMES OF INDIA",
      type: "press",
      icon: Newspaper,
      colorClass: "group-hover:text-amber-400 group-hover:border-amber-500/20 group-hover:bg-amber-500/5",
      glowColor: "rgba(245, 158, 11, 0.15)",
      textAccent: "text-amber-400",
      role: "Featured Health Expert"
    },
    {
      id: "ht",
      name: "Hindustan Times",
      shortName: "HINDUSTAN TIMES",
      type: "press",
      icon: Globe,
      colorClass: "group-hover:text-sky-400 group-hover:border-sky-500/20 group-hover:bg-sky-500/5",
      glowColor: "rgba(14, 165, 233, 0.15)",
      textAccent: "text-sky-400",
      role: "Medical Column Contributor"
    },
    {
      id: "mpc",
      name: "Mumbai Press Club",
      shortName: "MUMBAI PRESS",
      type: "press",
      icon: Building2,
      colorClass: "group-hover:text-indigo-400 group-hover:border-indigo-500/20 group-hover:bg-indigo-500/5",
      glowColor: "rgba(129, 140, 248, 0.15)",
      textAccent: "text-indigo-400",
      role: "Guest Health Panelist"
    },
    {
      id: "fi",
      name: "Forbes India",
      shortName: "FORBES INDIA",
      type: "press",
      icon: Sparkles,
      colorClass: "group-hover:text-yellow-500 group-hover:border-yellow-500/20 group-hover:bg-yellow-500/5",
      glowColor: "rgba(234, 179, 8, 0.15)",
      textAccent: "text-yellow-500",
      role: "Healthcare Leaders Focus"
    },
  ];

  // 1. Services Dataset
  const services: Service[] = [
    {
      id: "emergency",
      title: "Emergency Care",
      description: "24x7 prioritized rapid emergency support. Immediate response, paramedic coordination, and emergency stabilization.",
      iconName: "BriefcaseMedical",
      badge: "CRITICAL 24x7",
      features: ["Immediate triage", "Home stabilization", "Cardiac response", "Trauma care"],
    },
    {
      id: "paediatrics",
      title: "Paediatrics",
      description: "Compassionate, specialized healthcare for newborns, toddlers, and adolescents. Growth monitoring and pediatric immunization.",
      iconName: "Baby",
      badge: "SPECIALIST",
      features: ["Newborn checkups", "Development milestones", "Pediatric illnesses", "Growth tracking"],
    },
    {
      id: "family-health",
      title: "Family Health",
      description: "Comprehensive multi-generational healthcare plans. Dedicated preventive treatments and chronic illness tracking for families.",
      iconName: "HeartHandshake",
      badge: "POPULAR",
      features: ["Geriatric health", "Adult diagnostics", "Annual physicals", "Lifestyle design"],
    },
    {
      id: "general-medicine",
      title: "General Medicine",
      description: "Expert primary clinical diagnostics, acute fever management, respiratory care, and internal organ wellness.",
      iconName: "Stethoscope",
      features: ["Acute viral treatment", "Lungs & heart screening", "Metabolic profiles", "Gut health consult"],
    },
    {
      id: "home-healthcare",
      title: "Home Healthcare",
      description: "Physician-led direct home visits across Juhu and nearby suburbs for elderly patients or individuals with restricted mobility.",
      iconName: "Home",
      badge: "ELITE ASSIST",
      features: ["In-home diagnostics", "Elderly bedside care", "Post-op monitoring", "IV & line management"],
    },
    {
      id: "preventive-care",
      title: "Preventive Care",
      description: "Cutting-edge early diagnostics, custom cancer screenings, and metabolic biomarkers profile tracking.",
      iconName: "ShieldCheck",
      features: ["Cardio biomarkers", "Cancer markers screening", "Insulin sensitivity metrics", "Gene longevity metrics"],
    },
    {
      id: "vaccination",
      title: "Vaccination",
      description: "Complete pediatric, adult, and international travel immunization schedules with premium vaccine storage controls.",
      iconName: "Syringe",
      features: ["Pediatric schedules", "Flu & pneumonia vaccines", "Travel custom advice", "HPV & Shingles immunization"],
    },
    {
      id: "chronic-disease",
      title: "Chronic Disease",
      description: "Advanced daily management parameters for diabetes mellitus, arterial hypertension, asthma, and hyperlipidemia.",
      iconName: "Activity",
      badge: "LONGEVITY",
      features: ["HbA1c optimization", "Blood pressure tracking", "Asthma action protocol", "Lipid reversal programs"],
    },
  ];

  // 2. Testimonials Dataset
  const reviews: Review[] = [
    {
      id: "rev1",
      name: "Amit Patel",
      role: "Business Owner, Juhu",
      text: "Saved my father's life. When he suffered sudden cardiac distress at 2 AM, Dr. Anantpal arrived within minutes with an emergency kit, stabilizing him before the ambulance. We owe everything to his 24x7 commitment.",
      rating: 5,
      timeframe: "3 weeks ago",
      avatarSeed: "amit",
      isHighPriority: true
    },
    {
      id: "rev2",
      name: "Kareena Kapoor",
      role: "Resident of Juhu Scheme",
      text: "Dr. Singh has been our family doctor for 25+ years. From my childhood vaccinations to treating my grandmother’s diabetes, he handles three generations of our family with extreme precision and compassion.",
      rating: 5,
      timeframe: "1 month ago",
      avatarSeed: "kareena"
    },
    {
      id: "rev3",
      name: "Rajesh Shah",
      role: "Santacruz West, Mumbai",
      text: "He was available 24x7 during our darkest times. Even during peak monsoon floods, he answered our calls and did a home visit to check on our ailing mother. Truly a lifesaver.",
      rating: 5,
      timeframe: "2 months ago",
      avatarSeed: "rajesh",
      isHighPriority: true
    },
    {
      id: "rev4",
      name: "Dr. Sneha Rao",
      role: "Professor of Paediatrics",
      text: "His exceptional diagnosis is legendary. Other specialists missed my daughter's rare pediatric condition, but Dr. Anantpal diagnosed it instantly in one visit and directed us to the perfect treatment.",
      rating: 5,
      timeframe: "3 months ago",
      avatarSeed: "sneha"
    },
    {
      id: "rev5",
      name: "Vikram Malhotra",
      role: "MD, Malhotra Shipping",
      text: "He helped us through Covid. Our entire family was down, scared, and isolated. Dr. Anantpal monitored our vitals daily via phone, prescribed accurate treatment, and kept our spirits high.",
      rating: 5,
      timeframe: "6 months ago",
      avatarSeed: "vikram",
      isHighPriority: true
    }
  ];

  // 3. Why Us Features
  const features = [
    {
      id: "feat1",
      title: "624+ Reviews",
      description: "An impeccable track record of 5-star clinical validation from local families across three decades.",
      iconName: "Star"
    },
    {
      id: "feat2",
      title: "Accurate Diagnosis",
      description: "Clinical intuition sharpened by 30+ years of active emergency and family practice.",
      iconName: "Shield"
    },
    {
      id: "feat3",
      title: "Emergency Care",
      description: "Equipped with advanced life support equipment to tackle critical emergencies immediately.",
      iconName: "BriefcaseMedical"
    },
    {
      id: "feat4",
      title: "Home Visits",
      description: "Bedside medical examinations in Juhu, Mumbai for the elderly or restricted mobility patients.",
      iconName: "Home"
    },
    {
      id: "feat5",
      title: "Family Physician",
      description: "Generational medicine that builds decades-long medical records and deep familial relationships.",
      iconName: "Heart"
    },
    {
      id: "feat6",
      title: "24x7 Availability",
      description: "Critical emergency communication coordinates are monitored 24 hours a day, 7 days a week.",
      iconName: "Phone"
    },
    {
      id: "feat7",
      title: "Patient-Centered",
      description: "No rushed consults. Each patient receives absolute individual biological analysis and deep care.",
      iconName: "UserCheck"
    },
    {
      id: "feat8",
      title: "Long-Term Bonds",
      description: "Advocating for health optimization, wellness, and preventive longevity across generations.",
      iconName: "Sparkles"
    }
  ];

  // 4. Timeline (Doctor Story) Dataset
  const timelineEvents: TimelineEvent[] = [
    {
      id: "time1",
      year: "1994",
      title: "Establishment in Juhu",
      subtitle: "The Genesis of Trust",
      description: "Dr. Anantpal Singh completes rigorous post-grad residency training and opens his primary clinic doors in Juhu, Mumbai, setting a standard of localized multi-specialty medicine.",
      iconName: "Award",
    },
    {
      id: "time2",
      year: "2005",
      title: "Emergency Network Growth",
      subtitle: "Securing the Community",
      description: "Expands clinical boundaries to offer 24x7 critical home support and priority paramedic routing, establishing a lifeline for local seniors and children across Juhu Road.",
      iconName: "Activity",
    },
    {
      id: "time3",
      year: "2015",
      title: "Academic Pedigree & Authorship",
      subtitle: "Codifying Health Wisdom",
      description: "Publishes critical medical treatises '1% Theory' and '369 Degrees of Freedom', establishing national authority on compound clinical longevity and holistic healing paradigms.",
      iconName: "BookOpen",
    },
    {
      id: "time4",
      year: "2020",
      title: "Covid-19 Frontline Leadership",
      subtitle: "Healing Juhu in Hard Times",
      description: "Pioneered telemedicine routing and physical triaging, guiding over 2,000 local Juhu families safely through global respiratory pandemics with zero clinical losses.",
      iconName: "Shield",
    },
    {
      id: "time5",
      year: "Present",
      title: "Three Decades of Excellence",
      subtitle: "624+ Verifiable 5-Star Reviews",
      description: "Actively serving as the paramount, premium medical practitioner in Juhu, Mumbai. Pioneering longevity medicine, high-end pediatrics, and emergency family physics.",
      iconName: "Sparkles",
    }
  ];

  // 5. Books Dataset
  const books: BookItem[] = [
    {
      id: "book1",
      title: "1% Theory",
      subtitle: "The Compound Interest of Daily Health",
      coverColor: "#0f172a",
      accentColor: "#f59e0b",
      description: "A groundbreaking health blueprint written by Dr. Anantpal Singh. It explores how microscopic daily modifications in cellular rest, insulin management, and physical recovery compound over thirty years into robust physiological longevity. Acclaimed by top clinical leaders in Mumbai."
    },
    {
      id: "book2",
      title: "369 Degrees of Freedom",
      subtitle: "A Holistic Physician's Healing Paradigm",
      coverColor: "#030712",
      accentColor: "#0ea5e9",
      description: "An academic yet spiritual roadmap that reconciles standard primary medicine with modern holistic biology. Written to empower patients to understand their endocrine feedback loops, optimize brain neuro-transmitters, and liberate themselves from chronic metabolic dependencies."
    }
  ];

  // Helper to render lucide icons dynamically
  const renderIcon = (name: string, className = "w-6 h-6 text-brand-blue-400") => {
    switch (name) {
      case "BriefcaseMedical": return <BriefcaseMedical className={className} />;
      case "Baby": return <Baby className={className} />;
      case "HeartHandshake": return <HeartHandshake className={className} />;
      case "Stethoscope": return <Stethoscope className={className} />;
      case "Home": return <Home className={className} />;
      case "ShieldCheck": return <ShieldCheck className={className} />;
      case "Syringe": return <Syringe className={className} />;
      case "Activity": return <Activity className={className} />;
      case "Star": return <Star className={className} />;
      case "Shield": return <Shield className={className} />;
      case "Heart": return <Heart className={className} />;
      case "Phone": return <Phone className={className} />;
      case "UserCheck": return <UserCheck className={className} />;
      case "Sparkles": return <Sparkles className={className} />;
      case "Award": return <Award className={className} />;
      case "BookOpen": return <BookOpen className={className} />;
      default: return <Stethoscope className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark-950 text-gray-100 flex flex-col relative medical-grid overflow-hidden selection:bg-brand-blue-500/30 selection:text-white">
      
      {/* Premium Visual Indicators & Transition Screen */}
      <PremiumLoadingScreen />
      <ScrollProgressIndicator />
      
      {/* Global Cosmic Glow Rays background overlay */}
      <CosmicLightRays />

      {/* 3D Global DNA & Holographic Particles Background for HERO */}
      <DNABackground />

      {/* HEADER NAVIGATION (Glassmorphism & Tesla-Inspired) */}
      <header 
        id="navbar-header"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "py-3 bg-brand-dark-950/85 backdrop-blur-md border-b border-white/5 shadow-lg" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#hero-section" className="flex items-center gap-3 group relative">
            <div className="w-10 h-10 rounded-xl bg-brand-blue-500/10 border border-brand-blue-500/30 flex items-center justify-center text-brand-blue-400 shadow-[0_0_15px_rgba(14,165,233,0.25)] group-hover:scale-110 group-hover:border-brand-blue-400 transition-all duration-300">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="block font-display font-bold text-white text-base tracking-wider uppercase">
                DR. ANANTPAL SINGH
              </span>
              <span className="block text-[9px] text-brand-blue-400 font-mono tracking-widest uppercase">
                Juhu, Mumbai • Est. 1994
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
            <a href="#story-section" className="text-gray-400 hover:text-white transition-colors duration-300">
              Story
            </a>
            <a href="#trust-section" className="text-gray-400 hover:text-white transition-colors duration-300">
              Trust
            </a>
            <a href="#services-section" className="text-gray-400 hover:text-white transition-colors duration-300">
              Services
            </a>
            <a href="#testimonials-section" className="text-gray-400 hover:text-white transition-colors duration-300">
              Reviews
            </a>
            <a href="#books-section" className="text-gray-400 hover:text-white transition-colors duration-300">
              Books
            </a>
            <a href="#booking-section" className="text-gray-400 hover:text-white transition-colors duration-300">
              Book Appointment
            </a>
          </nav>

          {/* Direct CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <a 
              href="tel:+919322245341"
              className="px-4 py-2.5 rounded-xl border border-red-500/30 hover:border-red-500 bg-red-950/20 hover:bg-red-500/10 text-red-400 hover:text-red-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_25px_rgba(239,68,68,0.3)] pulse-glow-red"
            >
              <Phone className="w-3.5 h-3.5 animate-bounce" />
              <span>Emergency Hotline</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:border-brand-blue-400 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-brand-dark-950/95 backdrop-blur-lg border-b border-white/5 p-6 lg:hidden flex flex-col gap-5 text-sm uppercase tracking-wider font-mono shadow-2xl"
          >
            <a 
              href="#story-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-400 hover:text-white py-2"
            >
              Story
            </a>
            <a 
              href="#trust-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-400 hover:text-white py-2"
            >
              Trust
            </a>
            <a 
              href="#services-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-400 hover:text-white py-2"
            >
              Services
            </a>
            <a 
              href="#testimonials-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-400 hover:text-white py-2"
            >
              Reviews
            </a>
            <a 
              href="#books-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-400 hover:text-white py-2"
            >
              Books
            </a>
            <a 
              href="#booking-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-400 hover:text-white py-2"
            >
              Book Appointment
            </a>
            
            <div className="h-[1px] bg-white/5 my-2" />
            
            <a 
              href="tel:+919322245341"
              className="w-full py-3 rounded-xl bg-red-950/40 border border-red-500/40 text-center text-red-400 font-bold flex items-center justify-center gap-2 text-xs"
            >
              <Phone className="w-4 h-4 animate-bounce" />
              <span>EMERGENCY CALL: +91 93222 45341</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>


      {/* HERO SECTION (Cinematic Storytelling, DNS rotating, letter reveal) */}
      <section 
        id="hero-section"
        className="relative min-h-screen flex items-center justify-start pt-32 pb-20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Headline and Narrative Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Holographic Glowing Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-blue-500/10 border border-brand-blue-500/25 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-brand-blue-400 animate-spin" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-brand-blue-400">
                THREE DECADES OF CLINICAL EXCELLENCE
              </span>
            </div>

            {/* Letter reveal-style title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.08]">
                Trusted by <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-400 via-brand-blue-500 to-emerald-400 text-glow-blue">
                  Families for <br className="hidden sm:inline" /> Over 30 Years
                </span>
              </h1>
              
              {/* Animated heart line below title */}
              <div className="w-full max-w-sm pt-2">
                <HeartbeatLine color="#0ea5e9" speed={1.0} height={60} />
              </div>
            </div>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl font-light leading-relaxed">
              Dr. Anantpal Singh is Juhu's paramount medical practitioner—marrying cutting-edge diagnostics, paediatric precision, and prompt emergency response with 30+ years of healing hands.
            </p>

            {/* Sub-headline attributes pill row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-xs font-mono uppercase tracking-wider text-gray-500">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <strong>624+</strong> Verifiable Reviews
              </span>
              <span>•</span>
              <span className="text-brand-blue-400">Emergency Care</span>
              <span>•</span>
              <span className="text-brand-blue-400">Paediatrics</span>
              <span>•</span>
              <span className="text-brand-blue-400">Family Physician</span>
              <span>•</span>
              <span className="text-brand-blue-400">24x7 Support</span>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a 
                href="#booking-section"
                className="px-8 py-4 rounded-xl bg-brand-blue-500 hover:bg-brand-blue-600 text-white font-mono uppercase text-xs tracking-widest text-center flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_25px_rgba(14,165,233,0.3)] hover:shadow-[0_4px_35px_rgba(14,165,233,0.5)] hover:scale-[1.02]"
              >
                <span>Secure Booking Slot</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a 
                href="tel:+919322245341"
                className="px-8 py-4 rounded-xl border border-white/10 hover:border-brand-blue-400 bg-white/5 hover:bg-brand-blue-500/10 text-white hover:text-brand-blue-400 font-mono uppercase text-xs tracking-widest text-center flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                <span>Call Doctor Directly</span>
              </a>
            </div>

          </div>

          {/* Interactive clinical holographic summary right side card */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            
            {/* Glow backing */}
            <div className="absolute -inset-4 bg-brand-blue-500/10 rounded-3xl blur-3xl opacity-50 pointer-events-none" />

            {/* Master summary glass card */}
            <div className="relative glass-panel rounded-3xl p-6 md:p-8 space-y-6 border border-white/5 shadow-2xl">
              
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-[10px] font-mono uppercase text-brand-blue-400 tracking-widest">
                  Live Clinical Availability
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono uppercase text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Online Now
                </span>
              </div>

              {/* Patient Count Live Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-brand-dark-900/40 border border-white/5">
                  <p className="text-[9px] font-mono uppercase text-gray-500">Google Rating</p>
                  <p className="text-2xl font-display font-bold text-white mt-1">4.9 / 5.0</p>
                  <div className="flex items-center gap-0.5 mt-1 text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400" />)}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-brand-dark-900/40 border border-white/5">
                  <p className="text-[9px] font-mono uppercase text-gray-500">Reviews Audited</p>
                  <p className="text-2xl font-display font-bold text-white mt-1">624+ Verified</p>
                  <p className="text-[9.5px] text-brand-blue-400 font-mono mt-1 uppercase">100% HIPAA Patient Trust</p>
                </div>
              </div>

              {/* Direct Address Pinpointing Badge */}
              <div className="p-4 rounded-2xl bg-brand-dark-900/40 border border-white/5 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-mono uppercase text-[9px] text-gray-500">HQ Address (Juhu, Mumbai)</p>
                  <p className="text-gray-300 mt-1">7, Juhu Road, Near Juhu Market, Juhu, Mumbai 400049</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-blue-400" /> Medical Council Registered
                </span>
                <span>Reg: #68412-MUM</span>
              </div>

            </div>

          </div>

        </div>

        {/* Cinematic slide-down scroll prompt */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-500 font-mono text-[9px] uppercase tracking-[0.25em] z-20 pointer-events-none">
          <span>Scroll to Explore Story</span>
          <div className="w-[1.5px] h-10 bg-gradient-to-b from-brand-blue-500 to-transparent" />
        </div>
      </section>


      {/* SECTION 2: THE DOCTOR STORY (Cinematic Timeline with 3D Reveal) */}
      <section 
        id="story-section"
        className="relative py-24 border-t border-white/5 bg-[#050912]/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-brand-blue-400 bg-brand-blue-400/10 border border-brand-blue-400/20 rounded-full">
              GENESIS &amp; CHRONICLES
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
              A Lifetime Dedicated to Healing
            </h2>
            <p className="text-base text-gray-400 font-light">
              Thirty years of medical practice codified into a legacy of trust, emergency rescue, and deep multi-generational patient health optimization.
            </p>
          </div>

          {/* Timeline Stack */}
          <div className="relative border-l border-white/10 max-w-4xl mx-auto pl-6 sm:pl-10 space-y-12">
            
            {/* Timeline Events mapped */}
            {timelineEvents.map((event, idx) => (
              <div 
                key={event.id}
                className="relative group"
              >
                {/* Glowing Node on Timeline axis */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1 w-4 h-4 rounded-full bg-brand-dark-950 border-2 border-brand-blue-400 group-hover:border-emerald-400 group-hover:scale-125 transition-all duration-300 z-10 shadow-[0_0_10px_rgba(14,165,233,0.5)]" />

                {/* Event Card (using TiltCard for 3D reveal on mouse hover) */}
                <TiltCard 
                  glowColor={idx % 2 === 0 ? "rgba(14,165,233,0.12)" : "rgba(16,185,129,0.12)"}
                  maxTilt={3}
                >
                  <div className="p-6 md:p-8 rounded-2xl bg-brand-dark-900/60 border border-white/5 backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      
                      {/* Year badge and title */}
                      <div className="flex items-center gap-4">
                        <span className="text-2xl md:text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-400 to-emerald-400 font-mono">
                          {event.year}
                        </span>
                        <div>
                          <h3 className="text-lg md:text-xl font-display font-medium text-white group-hover:text-brand-blue-400 transition-colors duration-300">
                            {event.title}
                          </h3>
                          <p className="text-xs text-brand-blue-400 font-mono uppercase tracking-wider mt-0.5">
                            {event.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-brand-blue-500/10 border border-brand-blue-500/20 flex items-center justify-center">
                        {renderIcon(event.iconName)}
                      </div>

                    </div>

                    <p className="text-sm text-gray-400 leading-relaxed font-light">
                      {event.description}
                    </p>
                  </div>
                </TiltCard>
              </div>
            ))}

          </div>

        </div>
      </section>


      {/* SECTION: CLINICAL GALLERY & ADVANCED CASE STUDY VISUALIZER */}
      <section id="gallery-section" className="py-24 bg-[#02050a]/65 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto mb-12 space-y-4">
            <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-brand-blue-400 bg-brand-blue-400/10 border border-brand-blue-400/20 rounded-full inline-block">
              CLINICAL ENVIRONMENT & REAL PATIENT SPACES
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
              Clinical Spaces &amp; Restorative Journeys
            </h2>
            <p className="text-base text-gray-400 font-light">
              Tour our modern Juhu clinic and explore real before-after patient cases demonstrating Dr. Anantpal's precision clinical methodology.
            </p>
          </div>

          <ClinicGallery />
        </div>
      </section>


      {/* SECTION 3: WHY PATIENTS TRUST DR. ANANTPAL (3D tilt feature cards) */}
      <section 
        id="trust-section"
        className="py-24 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-brand-blue-400 bg-brand-blue-400/10 border border-brand-blue-400/20 rounded-full">
              WHY DR. ANANTPAL SINGH
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
              The Benchmarks of Medical Excellence
            </h2>
            <p className="text-base text-gray-400 font-light">
              Every card below is loaded with concrete medical features designed to prioritize patient safety, precise clinical diagnostics, and immediate accessibility.
            </p>
          </div>

          {/* Grid Layout containing 8 3D-Tilt Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => (
              <TiltCard 
                key={feat.id}
                maxTilt={8}
                glowColor="rgba(14, 165, 233, 0.15)"
                className="h-full"
              >
                <div className="p-6 rounded-2xl bg-brand-dark-900/60 border border-white/5 backdrop-blur-sm h-full flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    {/* Glowing rounded icon */}
                    <div className="w-12 h-12 rounded-xl bg-brand-blue-500/10 border border-brand-blue-500/20 flex items-center justify-center">
                      {renderIcon(feat.iconName, "w-6 h-6 text-brand-blue-400")}
                    </div>
                    
                    <h3 className="text-lg font-display font-semibold text-white tracking-wide">
                      {feat.title}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed font-light flex-1">
                    {feat.description}
                  </p>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Luxury grayscale logo marquee for medical affiliations */}
          <AffiliationsTicker />

        </div>
      </section>


      {/* SECTION 4: REAL PATIENT TESTIMONIALS (3D Carousel, rating stars) */}
      <section 
        id="testimonials-section"
        className="py-24 bg-[#050912]/80 border-y border-white/5 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-6 space-y-4">
            <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-brand-blue-400 bg-brand-blue-400/10 border border-brand-blue-400/20 rounded-full">
              REAL PATIENT VOICES
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
              Healing Journeys &amp; Life Saved
            </h2>
            <p className="text-base text-gray-400 font-light">
              624+ Verifiable local reviews compiled under strict Medical Council ethics. Here are authentic testimonials from families treated across Mumbai.
            </p>
          </div>

          {/* Advanced Testimonial Cylinder Carousel */}
          <TestimonialCarousel reviews={reviews} />

          {/* Social Proof Wall / Floating reviews */}
          <div className="mt-20 border-t border-white/5 pt-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-[10px] font-mono tracking-widest text-brand-blue-400 uppercase">
                Patient Trust Wall
              </p>
              <h3 className="text-lg font-sans font-medium text-gray-300 mt-1">
                Continuous Community Support &amp; Clinical Endorsements
              </h3>
            </div>
            <ReviewMarquee />
          </div>

        </div>
      </section>


      {/* SECTION 5: SERVICES (Premium clinical cards with glow features) */}
      <section 
        id="services-section"
        className="py-24 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-brand-blue-400 bg-brand-blue-400/10 border border-brand-blue-400/20 rounded-full">
              CLINICAL DEPARTMENTS
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
              Premium Medical Capabilities
            </h2>
            <p className="text-base text-gray-400 font-light">
              Dr. Anantpal Singh handles primary care, critical triage, pediatric wellness, and home assistance with specialized clinical tools.
            </p>
          </div>

          {/* Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc) => (
              <div 
                key={svc.id}
                className="group relative p-6 rounded-2xl bg-brand-dark-900/60 border border-white/5 backdrop-blur-sm hover:border-brand-blue-500/30 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
              >
                {/* Border glowing bar */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-blue-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <div className="space-y-4">
                  {/* Icon & Badge row */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue-500/10 border border-brand-blue-500/20 group-hover:border-brand-blue-400 flex items-center justify-center text-brand-blue-400 transition-all duration-300">
                      {renderIcon(svc.iconName, "w-6 h-6 text-brand-blue-400 group-hover:scale-110 transition-transform duration-300")}
                    </div>
                    {svc.badge && (
                      <span className="px-2.5 py-0.5 rounded text-[8px] font-mono uppercase tracking-widest bg-brand-blue-500/10 text-brand-blue-400 border border-brand-blue-500/20">
                        {svc.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-display font-semibold text-white tracking-wide group-hover:text-brand-blue-400 transition-colors duration-300">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-light mt-1.5 h-16 overflow-hidden">
                      {svc.description}
                    </p>
                  </div>
                </div>

                {/* Sub-features list */}
                <ul className="mt-5 space-y-1.5 border-t border-white/5 pt-4">
                  {svc.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-[11px] text-gray-500 font-mono">
                      <span className="w-1 h-1 rounded-full bg-brand-blue-400" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* SECTION 6: 3D MEDICAL STATISTICS (Intersection-Observer animated counters) */}
      <section 
        className="py-16 bg-[#040810] border-y border-white/5 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
            
            {/* Stat 1 */}
            <div className="space-y-2 p-4">
              <div className="text-4xl md:text-5xl lg:text-6xl text-brand-blue-400 text-glow-blue">
                <AnimatedCounter value={624} suffix="+" />
              </div>
              <p className="text-xs uppercase tracking-widest font-mono text-gray-400">
                Patient Reviews
              </p>
              <p className="text-[10px] text-gray-500 font-mono">Verified Google My Business</p>
            </div>

            {/* Stat 2 */}
            <div className="space-y-2 p-4 border-l border-white/5">
              <div className="text-4xl md:text-5xl lg:text-6xl text-brand-blue-400 text-glow-blue">
                <AnimatedCounter value={30} suffix="+" />
              </div>
              <p className="text-xs uppercase tracking-widest font-mono text-gray-400">
                Years Experience
              </p>
              <p className="text-[10px] text-gray-500 font-mono">Since 1994 in Juhu, Mumbai</p>
            </div>

            {/* Stat 3 */}
            <div className="space-y-2 p-4 border-l border-white/5">
              <div className="text-4xl md:text-5xl lg:text-6xl text-brand-blue-400 text-glow-blue">
                <AnimatedCounter value={15000} suffix="+" />
              </div>
              <p className="text-xs uppercase tracking-widest font-mono text-gray-400">
                Patients Helped
              </p>
              <p className="text-[10px] text-gray-500 font-mono">Fledgling &amp; Chronic Support</p>
            </div>

            {/* Stat 4 */}
            <div className="space-y-2 p-4 border-l border-white/5">
              <div className="text-4xl md:text-5xl lg:text-6xl text-emerald-400 text-glow-emerald">
                <AnimatedCounter value={24} suffix="/7" />
              </div>
              <p className="text-xs uppercase tracking-widest font-mono text-gray-400">
                Emergency Support
              </p>
              <p className="text-[10px] text-emerald-500 font-mono">Prioritized Paramedic Lines</p>
            </div>

          </div>
        </div>
      </section>


      {/* CLINICAL NARRATIVE: THE PATIENT'S JOURNEY (Cinematic Emotional Storytelling) */}
      <section 
        id="patient-journey-section"
        className="py-24 bg-[#03060c] border-b border-white/5 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-brand-blue-400 bg-brand-blue-400/10 border border-brand-blue-400/20 rounded-full">
              CLINICAL NARRATIVE
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
              The Patient's Healing Journey
            </h2>
            <p className="text-base text-gray-400 font-light">
              From initial silent concern to complete restorative wellness. Experience the meticulous, unhurried treatment model pioneered by Dr. Anantpal Singh.
            </p>
          </div>

          <PatientJourney />
        </div>
      </section>


      {/* SECTION 10: BOOKS & KNOWLEDGE (3D Rotating Books Showcase) */}
      <section 
        id="books-section"
        className="py-24 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-brand-blue-400 bg-brand-blue-400/10 border border-brand-blue-400/20 rounded-full">
              LITERATURE &amp; PARADIGMS
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
              Medical Literature &amp; Philosophy
            </h2>
            <p className="text-base text-gray-400 font-light">
              Dr. Anantpal Singh has synthesized his decades of front-line diagnostics and cellular medicine into published books. Hover on each book to inspect details.
            </p>
          </div>

          {/* Render both books inside a 3D stage */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {books.map((book) => (
              <Book3D key={book.id} book={book} />
            ))}
          </div>

        </div>
      </section>


      {/* SECTION 11: TRUST & CREDIBILITY BADGES */}
      <section 
        className="py-12 bg-[#03060c] border-y border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-center text-xs font-mono tracking-widest uppercase text-gray-500">
            
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-blue-500" />
              <span>30+ Years Experience</span>
            </div>

            <div className="w-1.5 h-1.5 rounded-full bg-white/10 hidden md:block" />

            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-blue-500" />
              <span>624+ Audited Reviews</span>
            </div>

            <div className="w-1.5 h-1.5 rounded-full bg-white/10 hidden md:block" />

            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-blue-500" />
              <span>Emergency Specialist</span>
            </div>

            <div className="w-1.5 h-1.5 rounded-full bg-white/10 hidden md:block" />

            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-blue-500" />
              <span>Trusted Family Physician</span>
            </div>

            <div className="w-1.5 h-1.5 rounded-full bg-white/10 hidden md:block" />

            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-blue-500" />
              <span>Patient First Philosophy</span>
            </div>

          </div>

          {/* Subtle separator */}
          <div className="my-8 border-t border-white/5" />

          {/* Media Mentions & Affiliations Ticker */}
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center text-center space-y-1">
              <span className="text-[10px] font-mono tracking-[0.2em] text-brand-blue-400 uppercase">
                Vetted & Recognized
              </span>
              <h3 className="text-sm font-sans font-medium text-gray-400 tracking-wider">
                Affiliations & Professional Media Mentions
              </h3>
            </div>

            <div className="relative w-full overflow-hidden py-4 select-none">
              {/* Left and Right fades for premium high-end look */}
              <div className="absolute left-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-r from-[#03060c] via-[#03060c]/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-[#03060c] via-[#03060c]/80 to-transparent z-10 pointer-events-none" />

              <motion.div
                className="flex gap-6 whitespace-nowrap min-w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  ease: "linear",
                  duration: 25,
                  repeat: Infinity,
                }}
              >
                {/* Double the list to support seamless infinite loop */}
                {[...affiliations, ...affiliations].map((item, index) => {
                  const IconComp = item.icon;
                  return (
                    <div
                      key={`${item.id}-${index}`}
                      className="inline-flex flex-col justify-between items-start px-5 py-4 rounded-xl border border-white/5 bg-white/[0.01] grayscale hover:grayscale-0 opacity-40 hover:opacity-100 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-500 group relative overflow-hidden w-[260px] cursor-pointer"
                    >
                      {/* Ambient hover glow inside card */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                        style={{
                          background: `radial-gradient(circle at center, ${item.glowColor} 0%, transparent 70%)`
                        }}
                      />

                      <div className="flex items-center gap-3 relative z-10 w-full">
                        <div className={`p-2 rounded-lg bg-white/5 border border-white/5 transition-all duration-300 ${item.colorClass}`}>
                          <IconComp className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <div className="truncate">
                          <p className={`text-xs font-mono font-semibold tracking-wider text-white transition-colors duration-300`}>
                            {item.shortName}
                          </p>
                          <p className="text-[10px] font-sans text-gray-500 group-hover:text-gray-300 transition-colors truncate">
                            {item.name}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 text-[9px] font-mono tracking-wider text-gray-600 group-hover:text-gray-400 uppercase transition-colors relative z-10 w-full truncate border-t border-white/[0.03] pt-2">
                        {item.role}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 7: ADVANCED APPOINTMENT SYSTEM */}
      <section 
        id="booking-section"
        className="py-24 relative overflow-hidden"
      >
        {/* Glow corner elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <BookingForm services={services.map(s => s.title)} />
        </div>
      </section>


      {/* SECTION 8: INTERACTIVE LOCATION & CLINIC INFO */}
      <section 
        id="contact-section"
        className="py-24 bg-[#050912]/80 border-t border-white/5 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-brand-blue-400 bg-brand-blue-400/10 border border-brand-blue-400/20 rounded-full">
              INTERACTIVE CO-ORDINATES
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
              Locate Our Clinic in Juhu
            </h2>
            <p className="text-base text-gray-400 font-light">
              Visit Dr. Anantpal Singh at Juhu Market, Mumbai. Full address directions, public transit routing, and parking structures details are provided below.
            </p>
          </div>

          <MapSection />

        </div>
      </section>


      {/* SECTION 9: EMERGENCY CONTACT BANNER (Pulse animation) */}
      <section 
        className="py-16 relative bg-gradient-to-r from-red-950/30 via-brand-dark-950 to-red-950/30 border-y border-red-500/20 overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.06)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          <div className="space-y-3">
            <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-red-400 bg-red-400/10 border border-red-400/20 rounded-full inline-block animate-pulse">
              CRITICAL EMERGENCY RESPONSE ACTIVE
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
              Need Medical Help Right Now?
            </h3>
            <p className="text-sm text-gray-400 max-w-lg font-light leading-relaxed">
              Dr. Anantpal Singh monitors critical coordinates 24x7. Do not hesitate to call the Juhu hotline for emergency pediatric advice or acute elder rescue.
            </p>
          </div>

          <a
            href="tel:+919322245341"
            className="px-8 py-4 rounded-xl bg-red-500 hover:bg-red-600 text-white font-mono uppercase text-sm tracking-widest flex items-center gap-3 transition-all duration-300 shadow-[0_4px_30px_rgba(239,68,68,0.35)] hover:shadow-[0_4px_45px_rgba(239,68,68,0.55)] hover:scale-[1.03] pulse-glow-red"
          >
            <Phone className="w-5 h-5 animate-bounce" />
            <span>+91 93222 45341</span>
          </a>

        </div>
      </section>


      {/* SECTION 12: PREMIUM FOOTER */}
      <footer className="bg-brand-dark-950 pt-20 pb-8 border-t border-white/5 relative z-10 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="space-y-5 text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-blue-500/10 border border-brand-blue-500/30 flex items-center justify-center text-brand-blue-400">
                <Activity className="w-4 h-4 animate-pulse" />
              </div>
              <span className="font-display font-bold text-white text-sm uppercase tracking-wider">
                DR. ANANTPAL SINGH
              </span>
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Thirty years of healing, trust, and medical precision in Juhu, Mumbai. Committed to high-end family medicine, emergency pediatric diagnosis, and longevity biology.
            </p>

            <div className="space-y-1.5 font-mono text-[10px]">
              <p>MUMBAI COUNCIL REG: #68412-MUM</p>
              <p>HIPAA CLINICAL COMPLIANT SECURED</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-left">
            <p className="text-white text-xs font-mono uppercase tracking-widest">Navigation</p>
            <ul className="space-y-2 font-mono text-[10px] uppercase">
              <li><a href="#story-section" className="hover:text-white transition-colors">Doctor Story</a></li>
              <li><a href="#trust-section" className="hover:text-white transition-colors">Trust Benchmarks</a></li>
              <li><a href="#services-section" className="hover:text-white transition-colors">Clinical Services</a></li>
              <li><a href="#testimonials-section" className="hover:text-white transition-colors">Patient Reviews</a></li>
              <li><a href="#books-section" className="hover:text-white transition-colors">Books &amp; Literature</a></li>
              <li><a href="#booking-section" className="hover:text-white transition-colors">Reserve Slot</a></li>
            </ul>
          </div>

          {/* Specialties Col */}
          <div className="space-y-4 text-left">
            <p className="text-white text-xs font-mono uppercase tracking-widest">Departments</p>
            <ul className="space-y-2 font-sans text-gray-400 text-xs">
              <li>Emergency Triage Support</li>
              <li>Pediatric &amp; Newborn Wellness</li>
              <li>Adult Longevity Diagnostics</li>
              <li>At-Home bed care coordination</li>
              <li>Immunization Schedules</li>
              <li>Cardiovascular Optimization</li>
            </ul>
          </div>

          {/* Coordinates Col */}
          <div className="space-y-4 text-left">
            <p className="text-white text-xs font-mono uppercase tracking-widest">Clinic Coordinates</p>
            <div className="space-y-3 font-sans text-gray-400 leading-relaxed text-xs">
              <p>
                7, Juhu Rd, Near Juhu Market, Juhu, Mumbai, Maharashtra 400049
              </p>
              <p className="font-mono text-white text-sm">
                Tel: +91 93222 45341
              </p>
              <p className="text-[10px] font-mono text-gray-500 uppercase">
                EMERGENCY ADMIT: 24/7/365 RESPONSE
              </p>
            </div>
          </div>

        </div>

        {/* Copy and legal disclaimer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center text-[10px] font-mono uppercase">
          <p>© {new Date().getFullYear()} Dr. Anantpal Singh. All Rights Reserved.</p>
          <p className="text-gray-600">
            Engineered with Luxury Aesthetics &amp; HIPAA Standards • Mumbai, Maharashtra
          </p>
        </div>
      </footer>

      {/* FLOATING ACTION DOCK (Emergency, Booking & WhatsApp CTAs) */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="fixed bottom-6 inset-x-4 md:inset-x-auto md:right-8 md:w-auto z-50"
      >
        <div className="mx-auto max-w-sm md:max-w-none bg-brand-dark-950/80 border border-white/10 backdrop-blur-xl px-4 py-3 rounded-2xl flex items-center justify-between gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">Clinic: Online</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Call button */}
            <a 
              href="tel:+919322245341"
              className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 flex items-center gap-1.5 text-xs font-mono font-medium transition-all duration-300"
              title="Direct Emergency Hotline"
            >
              <Phone className="w-3.5 h-3.5 animate-pulse" />
              <span className="hidden sm:inline">Call Now</span>
            </a>

            {/* WhatsApp button */}
            <a 
              href="https://wa.me/919322245341?text=Hello%20Dr.%20Anantpal%20Singh,%20I'd%20like%20to%20inquire%20about%20a%20clinical%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5 text-xs font-mono font-medium transition-all duration-300"
              title="Chat on WhatsApp"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse block" />
              <span>WhatsApp</span>
            </a>

            {/* Book Appointment button */}
            <a 
              href="#booking-section"
              className="px-3.5 py-2 rounded-xl bg-brand-blue-500 hover:bg-brand-blue-600 text-white flex items-center gap-1.5 text-xs font-mono font-medium transition-all duration-300 shadow-[0_4px_12px_rgba(14,165,233,0.3)]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Slot</span>
            </a>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
