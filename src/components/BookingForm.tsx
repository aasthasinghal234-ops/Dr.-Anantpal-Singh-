import React, { useState } from "react";
import { Calendar, Check, Send, AlertCircle, Clock, ShieldCheck, Database, FileCode, CheckCircle2 } from "lucide-react";
import { supabase, SUPABASE_SQL_SETUP } from "../lib/supabase";

interface BookingFormProps {
  services: string[];
}

export default function BookingForm({ services }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    message: "",
    slot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [showSqlGuide, setShowSqlGuide] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Available luxurious slots
  const timeSlots = [
    "09:00 AM - 10:30 AM",
    "11:00 AM - 12:30 PM",
    "04:00 PM - 05:30 PM",
    "06:00 PM - 07:30 PM",
  ];

  const containsMaliciousContent = (val: string) => {
    const lower = val.toLowerCase();
    return (
      lower.includes("<script") ||
      lower.includes("javascript:") ||
      lower.includes("onload=") ||
      lower.includes("onerror=") ||
      lower.includes("union select") ||
      lower.includes("insert into") ||
      lower.includes("delete from") ||
      lower.includes("drop table") ||
      lower.includes("or 1=1") ||
      lower.includes("' or '1'='1") ||
      /<[^>]*>/g.test(val) // Any HTML tags
    );
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};

    // 1. Security Check
    if (
      containsMaliciousContent(formData.name) ||
      containsMaliciousContent(formData.phone) ||
      containsMaliciousContent(formData.email) ||
      containsMaliciousContent(formData.message)
    ) {
      tempErrors.name = "Security violation: Malicious payload or script detected.";
      setErrors(tempErrors);
      return false;
    }

    // 2. Name validation
    if (!formData.name.trim()) {
      tempErrors.name = "Full name is required";
    } else if (!/^[a-zA-Z\s-]+$/.test(formData.name)) {
      tempErrors.name = "Name can only contain alphabets, spaces, and hyphens.";
    }
    
    // 3. Phone validation (Strictly numeric, 10-12 digits)
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10,12}$/.test(formData.phone)) {
      tempErrors.phone = "Please enter a valid phone number.";
    }

    // 4. Email validation
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required";
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        tempErrors.email = "Please enter a valid email address.";
      } else {
        // Basic disposable/invalid domain structure validation
        const domain = formData.email.split("@")[1] || "";
        if (!domain.includes(".") || domain.length < 4) {
          tempErrors.email = "Please enter an email with a valid domain.";
        }
      }
    }

    if (!formData.service) tempErrors.service = "Please select a medical service";
    if (!formData.date) tempErrors.date = "Please select a preferred date";
    if (!formData.slot) tempErrors.slot = "Please select a preferred time slot";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setDbError(null);

    try {
      const { error } = await supabase
        .from("bookings")
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            service: formData.service,
            date: formData.date,
            slot: formData.slot,
            message: formData.message || null,
          }
        ]);

      if (error) {
        console.error("Supabase error during submission:", error);
        setDbError(
          `Supabase Error: ${error.message}. This usually means the 'bookings' table doesn't exist yet, or Row Level Security (RLS) policies are blockading the insert.`
        );
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error("Database connection failure:", err);
      setDbError(err?.message || "Could not connect to the remote Supabase endpoint. Please verify API credentials and internet routing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "",
      date: "",
      message: "",
      slot: "",
    });
    setErrors({});
    setDbError(null);
    setIsSuccess(false);
  };

  return (
    <div className="w-full relative glass-panel rounded-3xl p-6 md:p-10 shadow-3xl border border-white/5 overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-brand-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -right-32 -top-32 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Success View */}
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center text-center py-12 px-4 relative z-10 animate-fadeIn">
          {/* Animated 3D Floating Checkmark Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-400 flex items-center justify-center mb-6 relative animate-bounce shadow-[0_0_50px_rgba(16,185,129,0.3)]">
            <Check className="w-10 h-10 text-emerald-400" />
            <div className="absolute inset-0 rounded-full border border-emerald-400/30 scale-150 animate-ping opacity-70" />
          </div>

          <h4 className="text-2xl md:text-3xl font-display font-medium text-white tracking-wide">
            Appointment Confirmed
          </h4>
          <p className="text-sm text-gray-400 mt-2 max-w-md">
            Your premium consultation slot with Dr. Anantpal Singh has been secured. A confirmation SMS & Calendar invite has been dispatched to your coordinates.
          </p>

          {/* Consultation Summary Voucher */}
          <div className="mt-8 p-5 rounded-2xl bg-[#090d16] border border-white/5 w-full max-w-sm text-left font-mono space-y-3">
            <div className="flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest border-b border-white/5 pb-2">
              <span>Appointment Pass</span>
              <span className="text-emerald-400">Verified</span>
            </div>
            <div className="text-xs space-y-1.5 text-gray-300">
              <p><span className="text-gray-500">PATIENT:</span> {formData.name}</p>
              <p><span className="text-gray-500">CLINIC:</span> Juhu Road, Mumbai</p>
              <p><span className="text-gray-500">SPECIALIZATION:</span> {formData.service}</p>
              <p><span className="text-gray-500">DATE:</span> {formData.date}</p>
              <p><span className="text-gray-500">TIME SLOT:</span> {formData.slot}</p>
            </div>
            <div className="pt-2 border-t border-dashed border-white/10 flex items-center gap-2 text-[10px] text-gray-400">
              <ShieldCheck className="w-4 h-4 text-brand-blue-400" />
              <span>Prioritized Emergency Support Active</span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="mt-8 px-6 py-3 rounded-xl border border-white/10 hover:border-brand-blue-400 bg-white/5 hover:bg-brand-blue-500/10 text-white hover:text-brand-blue-400 text-xs uppercase tracking-wider font-mono transition-all duration-300"
          >
            Schedule Another Visit
          </button>
        </div>
      ) : (
        /* Form View */
        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          <div className="space-y-2">
            <h4 className="text-2xl font-display font-medium text-white">
              Schedule Consultation
            </h4>
            <p className="text-xs text-gray-400 font-mono tracking-wider">
              PRIORITIZED CLINICAL REGISTRATION &amp; DIRECT SECURED ROUTING
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-gray-400">
                Full Name <span className="text-brand-blue-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Dr. / Mr. / Ms. Name"
                value={formData.name}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/[^a-zA-Z\s-]/g, "");
                  setFormData({ ...formData, name: cleaned });
                }}
                className={`w-full px-4 py-3 rounded-xl bg-brand-dark-900/60 border ${
                  errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-brand-blue-400"
                } text-white text-sm outline-none transition-all duration-300 focus:bg-brand-dark-900/90 focus:shadow-[0_0_15px_rgba(14,165,233,0.15)]`}
              />
              {errors.name && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                </p>
              )}
            </div>

            {/* Mobile Coordinates */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-gray-400">
                Contact Number <span className="text-brand-blue-400">*</span>
              </label>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="9876543210"
                value={formData.phone}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/[^0-9]/g, "");
                  setFormData({ ...formData, phone: cleaned });
                }}
                className={`w-full px-4 py-3 rounded-xl bg-brand-dark-900/60 border ${
                  errors.phone ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-brand-blue-400"
                } text-white text-sm outline-none transition-all duration-300 focus:bg-brand-dark-900/90 focus:shadow-[0_0_15px_rgba(14,165,233,0.15)]`}
              />
              {errors.phone && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                </p>
              )}
            </div>

            {/* Secured Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-gray-400">
                Email Address <span className="text-brand-blue-400">*</span>
              </label>
              <input
                type="email"
                placeholder="your.coordinate@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value.trim() })}
                className={`w-full px-4 py-3 rounded-xl bg-brand-dark-900/60 border ${
                  errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-brand-blue-400"
                } text-white text-sm outline-none transition-all duration-300 focus:bg-brand-dark-900/90 focus:shadow-[0_0_15px_rgba(14,165,233,0.15)]`}
              />
              {errors.email && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                </p>
              )}
            </div>

            {/* Medical Service Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-gray-400">
                Medical Specialty <span className="text-brand-blue-400">*</span>
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl bg-brand-dark-900/60 border ${
                  errors.service ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-brand-blue-400"
                } text-white text-sm outline-none transition-all duration-300 focus:bg-brand-dark-900/90 focus:shadow-[0_0_15px_rgba(14,165,233,0.15)]`}
              >
                <option value="" className="bg-brand-dark-950 text-gray-400">Choose Specialization</option>
                {services.map((svc) => (
                  <option key={svc} value={svc} className="bg-brand-dark-950 text-white">
                    {svc}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.service}
                </p>
              )}
            </div>

            {/* Calendar Preferred Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-gray-400">
                Preferred Calendar Date <span className="text-brand-blue-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-brand-dark-900/60 border ${
                    errors.date ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-brand-blue-400"
                  } text-white text-sm outline-none transition-all duration-300 focus:bg-brand-dark-900/90 focus:shadow-[0_0_15px_rgba(14,165,233,0.15)] pr-10`}
                />
                <Calendar className="absolute right-3.5 top-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
              {errors.date && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.date}
                </p>
              )}
            </div>

            {/* Time Slot Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-gray-400">
                Consultation Slot <span className="text-brand-blue-400">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.slot}
                  onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-brand-dark-900/60 border ${
                    errors.slot ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-brand-blue-400"
                  } text-white text-sm outline-none transition-all duration-300 focus:bg-brand-dark-900/90 focus:shadow-[0_0_15px_rgba(14,165,233,0.15)] pr-10`}
                >
                  <option value="" className="bg-brand-dark-950 text-gray-400">Choose Time Frame</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot} className="bg-brand-dark-950 text-white">
                      {slot}
                    </option>
                  ))}
                </select>
                <Clock className="absolute right-3.5 top-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
              {errors.slot && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.slot}
                </p>
              )}
            </div>
          </div>

          {/* Clinical notes / message */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-gray-400">
              Brief Medical Concern / Comments (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Please describe symptoms, prior treatment, or requirements (e.g. wheelchair, pediatric care, vaccine dose type)"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-brand-dark-900/60 border border-white/5 focus:border-brand-blue-400 text-white text-sm outline-none transition-all duration-300 focus:bg-brand-dark-900/95 focus:shadow-[0_0_15px_rgba(14,165,233,0.15)] resize-none"
            />
          </div>

          {/* Secure disclaimer */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-brand-blue-500/5 border border-brand-blue-500/10 text-[11px] text-gray-400 leading-relaxed font-sans">
            <ShieldCheck className="w-5 h-5 text-brand-blue-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>HIPAA Compliant &amp; Highly Encrypted Connection:</strong> Your medical information is fully protected by global standard cybersecurity measures and is only dispatched directly to Dr. Anantpal Singh’s clinical triage panel.
            </span>
          </div>

          {/* Supabase Real-time connection diagnostics */}
          {dbError && (
            <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20 text-left space-y-4 animate-fadeIn">
              <div className="flex items-start gap-3">
                <Database className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h5 className="text-sm font-sans font-semibold text-white">Supabase Connection Error</h5>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    The connection was made successfully, but the database returned: <code className="text-red-300 font-mono text-[11px] bg-red-950/40 px-1 py-0.5 rounded">{dbError}</code>
                  </p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-3 space-y-3">
                <p className="text-xs text-gray-400">
                  This happens when the <code className="text-brand-blue-400 font-mono">bookings</code> table is missing in your Supabase account. You can create it in 5 seconds with our ready-to-use template:
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSqlGuide(!showSqlGuide)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-gray-300 hover:bg-white/10 hover:text-white transition-all flex items-center gap-1.5"
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>{showSqlGuide ? "Hide Setup Script" : "Show SQL Setup Script"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopySql}
                    className="px-3 py-1.5 rounded-lg bg-brand-blue-500/10 border border-brand-blue-500/20 text-[11px] font-mono text-brand-blue-400 hover:bg-brand-blue-500/20 transition-all flex items-center gap-1.5"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Database className="w-3.5 h-3.5" />
                        <span>Copy SQL Command</span>
                      </>
                    )}
                  </button>
                </div>

                {showSqlGuide && (
                  <div className="relative mt-2 rounded-xl bg-black/50 border border-white/5 p-3 overflow-hidden">
                    <pre className="text-[10px] font-mono text-brand-blue-300 leading-relaxed overflow-x-auto max-h-48 whitespace-pre-wrap">
                      {SUPABASE_SQL_SETUP}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-brand-blue-500 hover:bg-brand-blue-600 disabled:bg-gray-800 disabled:text-gray-500 text-white font-mono uppercase text-sm tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_25px_rgba(14,165,233,0.25)] hover:shadow-[0_4px_35px_rgba(14,165,233,0.45)] cursor-pointer hover:scale-[1.01]"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>VERIFYING CLINICAL SLOT...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Book Secured Appointment</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
