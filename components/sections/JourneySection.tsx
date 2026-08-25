"use client";

import { motion } from "framer-motion";
import { journey } from "@/constants/content";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { GlowCard } from "@/components/ui/GlowCard";

export function JourneySection() {
  return (
    <section id="journey" className="py-28 px-6 md:px-10 max-w-[1400px] mx-auto">
      {/* Section Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-16"
      >
        <motion.p className="section-label mb-3" variants={fadeUp}>
          MY EXPERIENCE
        </motion.p>
        <motion.h2
          className="font-display text-white"
          style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          variants={fadeUp}
        >
          My{" "}
          <span className="text-accent glow-accent">Journey</span>
        </motion.h2>
      </motion.div>

      {/* Timeline */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="flex flex-col"
      >
        {journey.map((item, i) => (
          <JourneyItem key={i} item={item} index={i} />
        ))}
      </motion.div>
    </section>
  );
}

function JourneyItem({
  item,
  index,
}: {
  item: (typeof journey)[0];
  index: number;
}) {
  return (
    <div className="mb-4">
      <GlowCard delay={index * 0.1}>
        <div className="group relative py-8 px-6 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-2 md:gap-8 items-start md:items-center">
        {/* Company */}
        <div className="flex items-center gap-3">
          <motion.span
            className="text-[#2a2a2a] font-mono text-xs group-hover:text-accent transition-colors duration-300"
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
          <h3 className="font-body font-medium text-white text-base md:text-lg group-hover:text-accent transition-colors duration-300">
            {item.company}
          </h3>
        </div>

        {/* Role + Description */}
        <div>
          <p className="text-[#555] text-sm font-body mb-1">{item.role}</p>
          <p className="text-[#3a3a3a] text-xs font-body leading-relaxed hidden md:block">
            {item.description}
          </p>
        </div>

        {/* Period */}
        <div className="md:text-right">
          <span className="text-[#444] text-xs font-mono tracking-wider whitespace-nowrap">
            {item.period}
          </span>
        </div>
      </div>

        </div>
      </GlowCard>
    </div>
  );
}
