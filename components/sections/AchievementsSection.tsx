"use client";

import { motion } from "framer-motion";
import React from "react";
import { achievements } from "@/constants/content";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { ExternalLink } from "lucide-react";

export function AchievementsSection() {
  return (
    <section id="certifications" className="py-20 px-6 md:px-10 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-14"
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
            Track
          </span>
        </motion.h2>
      </motion.div>

      {/* Cards List */}
      <div className="relative flex flex-col gap-6 md:gap-8">
        {achievements.map((item, i) => (
          <AchievementCard key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

function AchievementCard({
  item,
  index,
}: {
  item: (typeof achievements)[0];
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative w-full group"
    >
      {/* Outer Neon Glow on Hover */}
      <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-[#FF5C00]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none mix-blend-screen" />

      <div className="relative overflow-hidden rounded-3xl border border-white/10 group-hover:border-[#FF5C00]/40 transition-all duration-500 bg-[#0c0c0c] backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        {/* Top liquid accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF5C00]/50 to-transparent z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Inner ambient glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none z-0 mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,92,0,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Card Content */}
        <div className="p-8 md:p-12 lg:p-14 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-6 md:gap-10 items-start">
            {/* Number */}
            <div className="relative select-none">
              <span
                className="font-display block"
                style={{
                  fontSize: "clamp(60px, 8vw, 95px)",
                  lineHeight: 1,
                  color: "transparent",
                  fontStyle: "italic",
                  WebkitTextStroke: "1.5px rgba(255, 92, 0, 0.25)",
                }}
              >
                {item.number}
              </span>
              <span
                className="font-display block absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  fontSize: "clamp(60px, 8vw, 95px)",
                  lineHeight: 1,
                  color: "transparent",
                  fontStyle: "italic",
                  WebkitTextStroke: "2px rgba(255, 92, 0, 0.8)",
                  textShadow: "0 0 25px rgba(255,92,0,0.6)",
                }}
              >
                {item.number}
              </span>
            </div>

            {/* Title + Description + Buttons */}
            <div className="min-w-0 flex flex-col justify-center">
              <h3
                className="font-display text-white leading-tight mb-2 group/title"
                style={{ fontSize: "clamp(24px, 3vw, 34px)" }}
              >
                {item.credentialUrl || item.credlyUrl ? (
                  <a
                    href={item.credlyUrl || item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors duration-300 inline-flex items-center gap-3"
                  >
                    <span>{item.title}</span>
                    <ExternalLink
                      size={20}
                      className="text-accent opacity-70 group-hover/title:opacity-100 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all"
                    />
                  </a>
                ) : (
                  item.title
                )}
              </h3>
              <p className="text-[#666] group-hover:text-[#888] transition-colors duration-300 text-sm md:text-base font-body leading-relaxed max-w-xl">
                {item.description}
              </p>

              {(item.credentialUrl || item.credlyUrl) && (
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase text-black bg-[#FF5C00] hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,92,0,0.35)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] group/btn"
                    >
                      <span>Microsoft Credential</span>
                      <ExternalLink
                        size={13}
                        className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      />
                    </a>
                  )}
                  {item.credlyUrl && (
                    <a
                      href={item.credlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase text-white bg-white/10 hover:bg-white hover:text-black border border-white/20 hover:border-white transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] group/btn"
                    >
                      <span>Verify on Credly</span>
                      <ExternalLink
                        size={13}
                        className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Semester Badge & Difficulty */}
            <div className="hidden md:flex flex-col items-end pt-2 gap-3">
              <span className="text-[#888] text-xs font-mono tracking-widest border border-[#2a2a2a] group-hover:border-[#FF5C00]/40 rounded-full px-5 py-2 whitespace-nowrap bg-white/5 transition-colors duration-300">
                {item.when}
              </span>

              <div className="flex flex-col items-end gap-1">
                <span className="text-[#888] text-[10px] font-mono uppercase tracking-widest">
                  {item.level}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-white text-xs font-mono">{item.difficultyText}</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="text-[10px]"
                        style={{ color: i < item.difficultyStars ? "#FF5C00" : "#333" }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
