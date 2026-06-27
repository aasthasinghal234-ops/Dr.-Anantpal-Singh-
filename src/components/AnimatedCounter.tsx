import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number; // duration in ms
}

export default function AnimatedCounter({ value, suffix = "", duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = value;
    const range = end - start;
    if (range === 0) return;

    let startTime: number | null = null;

    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Cubic ease-out
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + easeProgress * range));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end); // Ensure exact final value
      }
    };

    requestAnimationFrame(step);
  }, [hasStarted, value, duration]);

  return (
    <div ref={elementRef} className="font-display font-bold tracking-tight">
      {count}
      {suffix}
    </div>
  );
}
