"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { passionStatement } from "@/constants/content";
import { useRef } from "react";

export function PassionSection() {
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "end 30%"],
  });

  // Smooth the scroll progress to give the popping up animation a premium bounce
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const opacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden flex items-center justify-center min-h-[120vh]"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Gradient top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      <motion.div
        style={{ opacity }}
        className="flex flex-col gap-2 items-center justify-center text-center"
      >
        {passionStatement.map((line, i) => (
          <PassionLine
            key={i}
            line={line}
            i={i}
            total={passionStatement.length}
            progress={smoothProgress}
          />
        ))}
      </motion.div>

      {/* Gradient bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
    </section>
  );
}

function PassionLine({
  line,
  i,
  total,
  progress,
}: {
  line: string;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Calculate specific scroll boundaries for this single line
  const step = 0.85 / total;
  const start = 0.05 + i * step;
  const end = start + step;

  // Glow color and shadow
  const color = useTransform(
    progress,
    [start, end],
    ["rgba(255,255,255,0.04)", "#FF5C00"]
  );
  
  const textShadow = useTransform(
    progress,
    [start, end],
    ["0px 0px 0px rgba(255,92,0,0)", "0px 0px 40px rgba(255,92,0,0.8)"]
  );
  
  // Popping up motion
  const scale = useTransform(progress, [start, end], [0.9, 1.02]);
  const y = useTransform(progress, [start, end], [25, 0]);

  return (
    <motion.div style={{ scale, y }} className="overflow-visible">
      <motion.p
        className="font-display leading-none px-6 md:px-10 uppercase"
        style={{
          fontSize: "clamp(36px, 6vw, 84px)",
          letterSpacing: "0.02em",
          color,
          textShadow,
        }}
      >
        {line}
      </motion.p>
    </motion.div>
  );
}
