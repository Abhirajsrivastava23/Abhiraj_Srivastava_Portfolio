"use client";

import { motion } from "framer-motion";
import { useState, useRef, ReactNode } from "react";
import { fadeUp, viewportConfig } from "@/lib/animations";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function GlowCard({ children, className = "", delay = 0 }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden group rounded-xl border border-[#1a1a1a] bg-[#0d0d0d]/70 backdrop-blur-md transition-all duration-500 hover:border-[#FF5C00]/40 hover:shadow-[0_10px_50px_rgba(0,0,0,0.5)] ${className}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      custom={delay}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Sweeping Glass Shine Effect (Hover) */}
      <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 z-0" />

      {/* Running Glass Glow Effect */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ease-in-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 92, 0, 0.15), transparent 40%)`,
        }}
      />
      
      {/* Border Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-xl transition-opacity duration-300 ease-in-out"
        style={{
          opacity: isHovered ? 1 : 0,
          boxShadow: `inset 0 0 0 1px rgba(255, 92, 0, 0.2)`,
        }}
      />

      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  );
}
