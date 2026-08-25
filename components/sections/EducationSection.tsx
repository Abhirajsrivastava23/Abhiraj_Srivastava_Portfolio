"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { education, roadmap } from "@/constants/content";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { GlowCard } from "@/components/ui/GlowCard";

export function EducationSection() {
  return (
    <section id="education" className="py-28 px-6 md:px-10 max-w-[1400px] mx-auto overflow-hidden">
      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-20"
      >
        <motion.p className="section-label mb-3" variants={fadeUp}>
          BACKGROUND
        </motion.p>
        <motion.h2
          className="font-display text-white"
          style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          variants={fadeUp}
        >
          Education
        </motion.h2>
      </motion.div>

      {/* Education Cards */}
      <div className="flex flex-col gap-8 mb-32">
        {education.map((edu, i) => {
          const widthClass = i === 0 ? "w-full" : i === 1 ? "w-full md:w-[90%]" : "w-full md:w-[75%]";
          return (
            <div key={i} className={widthClass}>
              <EducationCard edu={edu} index={i} />
            </div>
          );
        })}
      </div>

      {/* Roadmap Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-10 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8"
      >
        <motion.span variants={fadeUp} className="text-[#555] font-mono text-xs md:text-sm tracking-[0.2em] uppercase md:whitespace-nowrap">
          04 // B.Tech Roadmap — All 8 Semesters (CU, 2026-2030)
        </motion.span>
        <motion.div variants={fadeUp} className="w-full md:flex-grow h-px bg-[#222]" />
      </motion.div>

      {/* Roadmap Timeline */}
      <div className="relative max-w-5xl mx-auto py-10 mt-20">
        {/* Timeline Center Line */}
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#FF5C00]/30 to-transparent md:-translate-x-1/2" />
        
        {roadmap.map((sem, i) => (
          <RoadmapTimelineItem key={i} sem={sem} index={i} />
        ))}
      </div>
    </section>
  );
}

function EducationCard({
  edu,
  index,
}: {
  edu: (typeof education)[0];
  index: number;
}) {
  return (
    <GlowCard delay={index * 0.15}>
      <div className="p-8 md:p-10">
        {/* Watermark */}
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(80px, 12vw, 150px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.03)",
            lineHeight: 1,
            letterSpacing: "0.05em",
          }}
          aria-hidden
        >
          {edu.watermark}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          {/* Institution name — multiline via whitespace */}
          <h3
            className="font-display text-white leading-tight group-hover:text-accent transition-colors duration-300"
            style={{
              fontSize: "clamp(24px, 3.5vw, 44px)",
              whiteSpace: "pre-line",
            }}
          >
            {edu.institution}
          </h3>
          <p className="text-[#555] text-sm font-body mt-2">{edu.degree}</p>
        </div>

        <div className="text-left md:text-right flex-shrink-0">
          <p className="text-[#444] text-xs font-mono tracking-wider mb-1">{edu.period}</p>
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3 py-1">
            <span className="text-accent text-xs font-mono font-medium">{edu.cgpa}</span>
          </div>
        </div>
      </div>

      </div>
    </GlowCard>
  );
}

function RoadmapTimelineItem({
  sem,
  index,
}: {
  sem: (typeof roadmap)[0];
  index: number;
}) {
  const isLeft = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);

  // Track this element's scroll progress through the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "center center", "end 5%"],
  });

  // Jump in zoom: small (0.5) → pop (1.1) → settle (1.05) → shrink back (0.6)
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.7, 1], [0.5, 1.1, 1.05, 1.05, 0.6]);

  // Opacity: fade in and fade out
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.05, 1, 1, 0.05]);

  // Y pop-up: starts below, pops up, drifts up
  const y = useTransform(scrollYProgress, [0, 0.4, 1], [50, 0, -30]);

  // Slide from side
  const x = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    [isLeft ? -40 : 40, 0, 0]
  );

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row justify-between items-center w-full mb-16 md:mb-32 group ${isLeft ? "md:flex-row-reverse" : ""}`}
    >
      {/* Spacer for empty side (desktop only) */}
      <div className="hidden md:block w-5/12" />

      {/* Center Dot — also animates with scroll */}
      <motion.div
        className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#FF5C00] z-10 -translate-x-1/2"
        style={{
          opacity,
          boxShadow: useTransform(
            scrollYProgress,
            [0, 0.3, 0.7, 1],
            [
              "0 0 4px rgba(255,92,0,0.2)",
              "0 0 15px rgba(255,92,0,0.8)",
              "0 0 15px rgba(255,92,0,0.8)",
              "0 0 4px rgba(255,92,0,0.2)",
            ]
          ),
        }}
      />

      {/* Content Side */}
      <motion.div
        style={{
          scale,
          opacity,
          y,
          x,
        }}
        whileHover={{
          scale: 1.05,
          y: -5,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full md:w-5/12 pl-12 md:pl-0 flex flex-col ${isLeft ? "md:items-end md:text-right" : "md:items-start md:text-left"} cursor-default`}
      >
        <p className="text-[#444] font-mono tracking-[0.2em] uppercase text-[10px] md:text-xs mb-2">
          {sem.date}
        </p>
        <h4 className="font-display text-white text-3xl md:text-4xl mb-1 transition-colors duration-300">
          Semester {sem.semester}: {sem.title}
        </h4>
        <p className="text-[#FF5C00] font-mono tracking-[0.25em] uppercase text-[10px] md:text-xs mb-4 md:mb-6">
          {sem.credits} CREDITS
        </p>

        {/* Subjects list */}
        <ul className={`flex flex-col gap-1.5 ${isLeft ? "md:items-end" : "md:items-start"}`}>
          {sem.subjects.map((subject, idx) => (
            <li key={idx} className="text-xs text-[#777] font-body max-w-[80%] hover:text-[#aaa] transition-colors">
              {subject}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
