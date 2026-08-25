"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { GlowCard } from "@/components/ui/GlowCard";
import { Rocket } from "lucide-react";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-32 px-6 md:px-10 relative">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        {/* Section header */}
        <motion.div variants={fadeUp} className="mb-16">
          <p className="text-accent text-xs font-mono tracking-[0.3em] uppercase mb-3">
            05 // Portfolio
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-white tracking-wide">
            Projects
          </h2>
        </motion.div>

        {/* Coming soon card */}
        <motion.div variants={fadeUp}>
          <GlowCard delay={0}>
            <div className="py-20 px-8 flex flex-col items-center justify-center text-center">
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Rocket size={48} className="text-accent mb-6" />
              </motion.div>
              <h3
                className="text-2xl md:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Chakra Petch', sans-serif" }}
              >
                Projects are coming soon.
              </h3>
              <p className="text-[#666] text-sm md:text-base font-body max-w-md">
                Currently building exciting things. Stay tuned for some amazing projects
                that showcase my skills in software engineering and AI/ML.
              </p>
              <motion.div
                className="mt-8 flex gap-3"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="w-2 h-2 rounded-full bg-accent" />
              </motion.div>
            </div>
          </GlowCard>
        </motion.div>
      </motion.div>
    </section>
  );
}
