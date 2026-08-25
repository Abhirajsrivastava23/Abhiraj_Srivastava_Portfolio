"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { expertise } from "@/constants/content";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";

export function ExpertiseSection() {
  return (
    <section id="expertise" className="py-28 px-6 md:px-10 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-20"
      >
        <motion.p className="section-label mb-3" variants={fadeUp}>
          MY SKILLS
        </motion.p>
        <motion.h2
          className="font-display text-white"
          style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          variants={fadeUp}
        >
          My{" "}
          <span className="text-accent glow-accent">Expertise</span>
        </motion.h2>
      </motion.div>

      {/* Expertise Grid */}
      <div className="flex flex-col gap-0">
        {expertise.map((item, i) => (
          <ExpertiseItem key={i} item={item} />
        ))}
      </div>
    </section>
  );
}

function ExpertiseItem({ item }: { item: (typeof expertise)[0] }) {
  return (
    <motion.div
      className="border-b border-[#1a1a1a] overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      {/* Header Row */}
      <div className="w-full text-left py-8 md:py-10 group">
        <motion.div variants={fadeUp} className="flex items-start md:items-center justify-between gap-4">
          <div className="flex items-start md:items-center gap-6 md:gap-10">
            {/* Number */}
            <span
              className="font-display text-[#222] group-hover:text-accent transition-colors duration-400"
              style={{ fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1 }}
            >
              {item.number}
            </span>

            <div>
              <h3
                className="font-display text-white group-hover:text-accent transition-colors duration-300"
                style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
              >
                {item.title}
              </h3>
              <p className="text-[#444] text-sm font-body mt-1 hidden md:block">
                {item.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Skills Grid */}
      <div className="overflow-visible">
        <div className="pb-10 flex flex-col gap-5 pl-0 md:pl-24">
          {item.skills.map((skill, i) => (
            <SkillBar key={i} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SkillBar({
  skill,
  index,
}: {
  skill: { name: string; level: number };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportConfig}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[#666] text-sm font-body">{skill.name}</span>
        <span className="text-[#444] text-xs font-mono">{skill.level}%</span>
      </div>
      <div className="h-px bg-[#1e1e1e] w-full relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-accent"
          initial={{ width: "0%" }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={viewportConfig}
          transition={{ duration: 0.8, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </motion.div>
  );
}
