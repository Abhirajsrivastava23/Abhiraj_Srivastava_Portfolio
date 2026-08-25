"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/constants/content";
import { Github, Linkedin, Instagram, ArrowUpRight, Code2, Terminal, ChefHat, BarChart2 } from "lucide-react";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { ParticleButton } from "@/components/ui/ParticleButton";
import { RippleButton } from "@/components/ui/RippleButton";
import { XIcon } from "@/components/ui/XIcon";

export function Footer() {
  const socials = [
    { icon: Github, href: siteConfig.socials.github, label: "GitHub" },
    { icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
    { icon: XIcon, href: siteConfig.socials.twitter, label: "X" },
    { icon: Instagram, href: siteConfig.socials.instagram, label: "Instagram" },
    { icon: Code2, href: siteConfig.socials.leetcode, label: "LeetCode" },
    { icon: Terminal, href: siteConfig.socials.hackerrank, label: "HackerRank" },
    { icon: ChefHat, href: siteConfig.socials.codechef, label: "CodeChef" },
    { icon: BarChart2, href: siteConfig.socials.codeforces, label: "Codeforces" },
  ];

  return (
    <footer id="contact" className="relative border-t border-[#1a1a1a] py-16 px-6 md:px-10 overflow-hidden">
      {/* Watermark */}
      <div
        className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(80px, 20vw, 220px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.025)",
            lineHeight: 0.85,
            letterSpacing: "0.05em",
          }}
        >
          {siteConfig.name}
        </span>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-center justify-center gap-12"
        >
          {/* Top — Giant Let's Connect */}
          <div className="w-full">
            <motion.div variants={fadeUp} className="mb-8 flex justify-center">
              <ParticleButton />
            </motion.div>

            {/* Email — wide horizontal display */}
            <motion.div variants={fadeUp} className="flex justify-center mb-8">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-center gap-4 px-8 py-3 w-full max-w-2xl justify-center border border-[#1e1e1e] hover:border-[#FF5C00]/30 rounded-full bg-[#0d0d0d]/50 backdrop-blur-sm transition-all duration-500 hover:bg-[#FF5C00]/5"
              >
                <span className="text-accent text-lg">✉</span>
                <span className="text-[#888] group-hover:text-white font-mono text-sm md:text-base tracking-[0.2em] transition-colors duration-300">
                  {siteConfig.email}
                </span>
                <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-auto">→</span>
              </a>
            </motion.div>
          </div>

          {/* Bottom — Contact Links Row */}
          <motion.div variants={fadeUp} className="w-full flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-4">
            {/* Email (Always First) */}
            <RippleButton
              href={`mailto:${siteConfig.email}`}
              className="relative flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#2a2a2a] text-[#aaa] hover:text-white hover:border-[#444] hover:bg-white/5 transition-all duration-300 group overflow-hidden"
            >
              <div className="text-accent opacity-80 group-hover:opacity-100 z-10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <span className="font-medium text-xs md:text-sm z-10">Email Me</span>
              {/* Bottom ripple hover effect */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#FF5C00] group-hover:w-full transition-all duration-300 opacity-0 group-hover:opacity-100 blur-[1px]" />
            </RippleButton>

            {/* Rest of Socials */}
            {socials.map(({ icon: Icon, href, label }) => (
              <RippleButton
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#2a2a2a] text-[#aaa] hover:text-white hover:border-[#444] hover:bg-white/5 transition-all duration-300 group overflow-hidden"
              >
                <div className="text-accent opacity-80 group-hover:opacity-100 z-10">
                  <Icon size={16} />
                </div>
                {label !== "X" && <span className="font-medium text-xs md:text-sm z-10">{label}</span>}
                {/* Bottom ripple hover effect */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#FF5C00] group-hover:w-full transition-all duration-300 opacity-0 group-hover:opacity-100 blur-[1px]" />
              </RippleButton>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="mt-16 pt-6 border-t border-[#1a1a1a] flex flex-col md:flex-row items-center justify-between gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="text-[#333] text-xs font-mono">
            © {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.
          </span>
          <span className="text-[#2a2a2a] text-xs font-mono">
            Designed & Built with precision
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
