"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { achievements } from "@/constants/content";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";

export function AchievementsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="certifications" className="py-28 px-6 md:px-10 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-20"
      >
        <motion.p className="section-label mb-3" variants={fadeUp}>
          HIGHLIGHTS
        </motion.p>
        <motion.h2
          className="font-display text-white flex items-center gap-4"
          style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          variants={fadeUp}
        >
          Certifications
          <span className="text-accent text-sm md:text-lg font-mono tracking-widest uppercase px-3 py-1 border border-accent/20 bg-accent/5 rounded-full translate-y-1">
            Upcoming
          </span>
        </motion.h2>
      </motion.div>

      {/* Sticky Card Stack */}
      <div className="relative mt-12 pb-[100vh]">
        {achievements.map((item, i) => (
          <StickyCard key={i} item={item} index={i} total={achievements.length} />
        ))}
      </div>
    </section>
  );
}

function StickyCard({
  item,
  index,
  total,
}: {
  item: (typeof achievements)[0];
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Each card sticks slightly lower than the previous to create a cascade
  const stickyTop = 100 + index * 40;
  const isLast = index === total - 1;
  
  // 1. Outgoing: track from sticky position until it gets covered by the next card
  const { scrollYProgress: outgoingProgress } = useScroll({
    target: cardRef,
    offset: [`start ${stickyTop}px`, `start ${stickyTop - 400}px`],
  });

  // Scale down and dim ONLY when getting covered by the next card
  const scale = useTransform(outgoingProgress, [0, 1], [1, isLast ? 1 : 0.95]);
  const brightness = useTransform(outgoingProgress, [0, 1], [1, isLast ? 1 : 0.5]);
  const opacity = useTransform(outgoingProgress, [0, 1], [1, isLast ? 1 : 0.5]);

  return (
    <motion.div
      ref={cardRef}
      className={`sticky w-full group ${!isLast ? "mb-40 md:mb-52" : ""}`}
      style={{
        top: `${stickyTop}px`,
        scale,
        opacity,
        zIndex: index + 1,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Outer Neon Glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-[#FF5C00]/30 to-transparent rounded-3xl opacity-50 md:opacity-0 md:group-hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none mix-blend-screen" />

      <motion.div
        className="relative overflow-hidden rounded-3xl border border-white/5 group-hover:border-[#FF5C00]/30 transition-all duration-500 bg-[#050505]/95 backdrop-blur-2xl"
        style={{
          filter: useTransform(brightness, (v) => `brightness(${v})`),
          boxShadow: "0 20px 40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
          {/* Top liquid accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF5C00]/50 to-transparent z-10 opacity-100 md:opacity-50 md:group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Glass & Neon edge highlights */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none z-20 shadow-[inset_0_0_0_1px_rgba(255,92,0,0.1)] md:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] md:group-hover:shadow-[inset_0_0_0_1px_rgba(255,92,0,0.4)] transition-shadow duration-500" />

          {/* Sweeping Glass Shine Effect (Hover) */}
          <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[2s] ease-in-out pointer-events-none bg-gradient-to-r from-transparent via-white-[0.03] to-transparent skew-x-12 z-0" />

          {/* Inner ambient light */}
          <div 
            className="absolute inset-0 opacity-40 md:opacity-0 md:group-hover:opacity-60 transition-opacity duration-700 pointer-events-none z-0 mix-blend-screen" 
            style={{ background: 'radial-gradient(circle at center, rgba(255,92,0,0.12) 0%, transparent 70%)' }} 
          />

          {/* Card Content */}
          <div className="p-10 md:p-14 lg:p-16 min-h-[280px] md:min-h-[320px] relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-6 md:gap-12 items-start">
              {/* Number — layered: dim base + bright glow overlay */}
              <div className="relative">
                {/* Dim base (always visible) */}
                <span
                  className="font-display block"
                  style={{
                    fontSize: "clamp(70px, 10vw, 120px)",
                    lineHeight: 1,
                    color: "transparent",
                    fontStyle: "italic",
                    WebkitTextStroke: "1.5px rgba(255, 92, 0, 0.08)",
                  }}
                >
                  {item.number}
                </span>
                {/* Bright glow */}
                <span
                  className="font-display block absolute inset-0 pointer-events-none opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    fontSize: "clamp(70px, 10vw, 120px)",
                    lineHeight: 1,
                    color: "transparent",
                    fontStyle: "italic",
                    WebkitTextStroke: "2px rgba(255, 92, 0, 0.8)",
                    textShadow: "0 0 30px rgba(255,92,0,0.8), 0 0 10px rgba(255,92,0,0.5)",
                  }}
                >
                  {item.number}
                </span>
              </div>

              {/* Title + Event + Description */}
              {/* Title + Description */}
              <div className="min-w-0 flex flex-col justify-center">
                <h3
                  className="font-display text-white leading-tight mb-2"
                  style={{ fontSize: "clamp(26px, 3.5vw, 36px)" }}
                >
                  {item.title}
                </h3>
                <p className="text-[#555] text-sm md:text-base font-body leading-relaxed max-w-xl">
                  {item.description}
                </p>
              </div>

              {/* Semester Badge & Difficulty */}
              <div className="hidden md:flex flex-col items-end pt-2 gap-3">
                {/* Glowing Semester Pill */}
                <div className="relative">
                  <span className="text-[#666] text-xs font-mono tracking-widest border border-[#2a2a2a] rounded-full px-5 py-2 whitespace-nowrap bg-white/5 block relative z-10">
                    {item.when}
                  </span>
                  {/* Glowing Pill */}
                  <span
                    className="absolute inset-0 border border-[#FF5C00] rounded-full px-5 py-2 whitespace-nowrap bg-[#FF5C00]/10 text-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      filter: "drop-shadow(0 0 12px rgba(255,92,0,0.6))",
                      zIndex: 20,
                    }}
                  >
                    {/* Ghost text just to keep the pill shape the exact same size */}
                    {item.when}
                  </span>
                </div>

                {/* Level & Stars */}
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[#888] text-[10px] font-mono uppercase tracking-widest">
                    {item.level}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white text-xs font-mono">{item.difficultyText}</span>
                    <div className="relative flex">
                      {/* Dim stars behind for the non-active state */}
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className="text-[10px]"
                            style={{ color: i < item.difficultyStars ? "#663010" : "#333" }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      {/* Bright glowing stars */}
                      <div className="flex absolute inset-0 pointer-events-none gap-0.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-[10px]" style={{ 
                            color: i < item.difficultyStars ? "#FF5C00" : "transparent",
                            textShadow: i < item.difficultyStars ? "0 0 8px #FF5C00" : "none",
                          }}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Grid */}
            {item.images.length > 0 && (
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3 max-h-[300px]">
                <div className="md:col-span-2 md:row-span-2 bg-[#151515] border border-[#1e1e1e] rounded-lg overflow-hidden">
                  <div className="w-full h-full min-h-[260px] flex items-center justify-center">
                    <span className="text-[#2a2a2a] text-xs font-mono">Photo</span>
                  </div>
                </div>
                {[0, 1].map((j) => (
                  <div key={j} className="bg-[#151515] border border-[#1e1e1e] rounded-lg overflow-hidden">
                    <div className="w-full h-full min-h-[125px] flex items-center justify-center">
                      <span className="text-[#2a2a2a] text-xs font-mono">Photo</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

      </motion.div>
  );
}
