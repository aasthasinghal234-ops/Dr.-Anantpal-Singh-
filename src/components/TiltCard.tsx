import React, { useRef, useState } from "react";
import { motion } from "motion/react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt angle in degrees
  glowColor?: string; // hex or rgba color
  onClick?: () => void;
  id?: string;
  key?: string | number;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  glowColor = "rgba(14, 165, 233, 0.15)",
  onClick,
  id,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shineX, setShineX] = useState(0);
  const [shineY, setShineY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative mouse position from center (-0.5 to 0.5)
    const relX = (e.clientX - rect.left) / width - 0.5;
    const relY = (e.clientY - rect.top) / height - 0.5;

    // Calculate rotation angles
    const rotX = -relY * maxTilt; // rotate around X based on vertical mouse
    const rotY = relX * maxTilt;  // rotate around Y based on horizontal mouse

    setRotateX(rotX);
    setRotateY(rotY);

    // Track cursor location for glass reflection shimmer (0 to 100%)
    const sheenXVal = ((e.clientX - rect.left) / width) * 100;
    const sheenYVal = ((e.clientY - rect.top) / height) * 100;
    setShineX(sheenXVal);
    setShineY(sheenYVal);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative perspective-1000 preserve-3d transition-transform duration-200 ease-out cursor-pointer ${className}`}
      style={{
        transform: isHovered
          ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
          : "rotateX(0deg) rotateY(0deg) scale(1)",
      }}
    >
      {/* Outer Glow */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${shineX}% ${shineY}%, ${glowColor} 0%, transparent 65%)`,
          boxShadow: isHovered ? `0 0 30px ${glowColor}` : "none",
        }}
      />

      {/* Shimmer overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none z-30 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.35 : 0,
          background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 50%)`,
        }}
      />

      {/* Internal border highlights */}
      <div
        className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none z-20 transition-all duration-300"
        style={{
          borderColor: isHovered ? "rgba(56, 189, 248, 0.25)" : "rgba(255, 255, 255, 0.05)",
        }}
      />

      {/* Main card content wrapper */}
      <div className="relative z-10 w-full h-full rounded-2xl">
        {children}
      </div>
    </div>
  );
}
