import { useState, useEffect, useRef } from "react";
import { Review } from "../types";
import { Star, ChevronLeft, ChevronRight, Quote, Calendar } from "lucide-react";

interface TestimonialCarouselProps {
  reviews: Review[];
}

export default function TestimonialCarousel({ reviews }: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Auto-rotation
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, reviews.length]);

  return (
    <div 
      className="relative w-full py-12 md:py-20 flex flex-col items-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Stage / Container */}
      <div className="relative w-full max-w-4xl h-[400px] md:h-[350px] flex items-center justify-center perspective-1000 overflow-visible">
        {reviews.map((review, idx) => {
          // Calculate offset in cylinder layout
          let offset = idx - activeIndex;
          
          // Handle wrap-around math for circular layout
          if (offset < -1) {
            if (offset < -reviews.length / 2) {
              offset += reviews.length;
            }
          } else if (offset > 1) {
            if (offset > reviews.length / 2) {
              offset -= reviews.length;
            }
          }

          const isCenter = offset === 0;
          const isLeft = offset === -1;
          const isRight = offset === 1;
          const isVisible = isCenter || isLeft || isRight;

          // Compute styles based on relative position
          let scale = 0.8;
          let opacity = 0;
          let translateX = 0;
          let rotateY = 0;
          let zIndex = 0;

          if (isCenter) {
            scale = 1.0;
            opacity = 1;
            translateX = 0;
            rotateY = 0;
            zIndex = 30;
          } else if (isLeft) {
            scale = 0.82;
            opacity = 0.6;
            translateX = -280; // Default wide screens
            rotateY = 32;
            zIndex = 10;
          } else if (isRight) {
            scale = 0.82;
            opacity = 0.6;
            translateX = 280; // Default wide screens
            rotateY = -32;
            zIndex = 10;
          } else {
            // Invisible nodes stacked behind
            scale = 0.6;
            opacity = 0;
            translateX = offset > 0 ? 500 : -500;
            rotateY = offset > 0 ? -60 : 60;
            zIndex = 0;
          }

          // Responsive overrides for small viewports
          const getResponsiveTranslateX = (val: number) => {
            if (typeof window !== "undefined") {
              if (window.innerWidth < 640) return val * 0.42; // Stack closer on mobile
              if (window.innerWidth < 1024) return val * 0.75;
            }
            return val;
          };

          return (
            <div
              key={review.id}
              className="absolute w-[92%] max-w-[480px] h-full transition-all duration-700 ease-out preserve-3d"
              style={{
                transform: `translateX(${getResponsiveTranslateX(translateX)}px) scale(${scale}) rotateY(${rotateY}deg)`,
                opacity: isVisible ? opacity : 0,
                zIndex: zIndex,
                pointerEvents: isCenter ? "auto" : "none",
              }}
            >
              {/* Review Card */}
              <div className="w-full h-full p-6 md:p-8 rounded-3xl glass-panel relative flex flex-col justify-between overflow-hidden shadow-2xl border border-white/5 group">
                {/* Subtle light streak */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-blue-400 to-transparent opacity-40" />

                {/* Background quote mark */}
                <Quote className="absolute right-6 top-6 w-24 h-24 text-white/5 opacity-[0.03] rotate-12" />

                {/* Header */}
                <div className="flex items-center gap-4 relative z-10">
                  <div className="relative">
                    <img
                      src={`https://picsum.photos/seed/${review.avatarSeed}/120/120`}
                      alt={review.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-brand-blue-500/30 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-brand-blue-500 rounded-full p-1 text-[8px] text-white">
                      <Quote className="w-2.5 h-2.5 fill-current" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-display font-medium text-white text-base md:text-lg">
                      {review.name}
                    </h5>
                    <p className="text-xs text-brand-blue-400 font-mono tracking-wider mt-0.5">
                      {review.role}
                    </p>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="flex-1 flex items-center py-6 relative z-10">
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed italic font-sans font-light">
                    "{review.text}"
                  </p>
                </div>

                {/* Footer with Star Rating & Timeframe */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto relative z-10">
                  {/* Star Rating Animation */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className={`w-3.5 h-3.5 ${
                          starIdx < review.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-gray-600" />
                    <span>{review.timeframe}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Indicators & Buttons */}
      <div className="flex items-center gap-6 mt-8 z-20">
        <button
          onClick={handlePrev}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 hover:border-brand-blue-400 bg-white/5 hover:bg-brand-blue-500/10 text-white hover:text-brand-blue-400 flex items-center justify-center transition-all duration-300"
          aria-label="Previous Review"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Carousel indicators */}
        <div className="flex items-center gap-2">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-6 bg-brand-blue-500"
                  : "w-2 bg-gray-700 hover:bg-gray-500"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 hover:border-brand-blue-400 bg-white/5 hover:bg-brand-blue-500/10 text-white hover:text-brand-blue-400 flex items-center justify-center transition-all duration-300"
          aria-label="Next Review"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
