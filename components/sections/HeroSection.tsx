"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/constants/content";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { ParticleText } from "@/components/ui/ParticleText";
import { Github, Linkedin, Instagram, Code2, Terminal, ChefHat, BarChart2 } from "lucide-react";
import { XIcon } from "@/components/ui/XIcon";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [isNameHovered, setIsNameHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Mobile/Tablet specific logic: Touch & Scroll triggers colorful effect
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      // Only apply this scrolling logic for touch devices
      if (window.matchMedia("(hover: none)").matches) {
        setIsNameHovered(true);
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setIsNameHovered(false);
        }, 1200);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleMobileTouch = () => {
    if (window.matchMedia("(hover: none)").matches) {
      setIsNameHovered(true);
      setTimeout(() => setIsNameHovered(false), 2000);
    }
  };

  // Text slides OUT to the LEFT when scrolling down
  const textX = useTransform(scrollYProgress, [0, 0.5], [0, -600]);
  // Image slides OUT to the RIGHT when scrolling down
  const imageX = useTransform(scrollYProgress, [0, 0.5], [0, 600]);
  // Both fade out
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

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
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Watermark BG Name */}
      <motion.div
        className="watermark select-none pointer-events-none absolute"
        style={{
          fontSize: "clamp(80px, 26vw, 300px)",
          top: "30%",
          left: "0%",
          transform: "translateY(-50%)",
          whiteSpace: "nowrap",
          zIndex: 0,
          fontFamily: "'Bebas Neue', cursive",
          letterSpacing: "0.05em",
          color: "#0a0a0a",
          WebkitTextStroke: "1.5px rgba(255, 92, 0, 0.4)",
          filter: "blur(6px)",
          opacity: heroOpacity,
        }}
        animate={{ 
          scale: [1, 1.02, 1],
          textShadow: [
            "1px 1px 0px #1a1a1a, 3px 3px 0px #151515, 5px 5px 15px rgba(255,92,0,0.3), -2px -2px 10px rgba(255,255,255,0.02)",
            "1px 1px 0px #1a1a1a, 3px 3px 0px #151515, 5px 5px 45px rgba(255,92,0,0.9), -2px -2px 15px rgba(255,255,255,0.05)",
            "1px 1px 0px #1a1a1a, 3px 3px 0px #151515, 5px 5px 15px rgba(255,92,0,0.3), -2px -2px 10px rgba(255,255,255,0.02)"
          ]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        ADITYA
      </motion.div>

      {/* Subtle radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 60% 50%, rgba(255,92,0,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 pt-16 md:pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center min-h-[calc(100vh-5rem)]">
          
          {/* Left — Name & Text: enters FROM LEFT, exits TO LEFT */}
          <motion.div 
            style={{ opacity: heroOpacity }} 
            className="hero-slide-left flex flex-col justify-center"
          >
            <motion.div style={{ x: textX }}>
            {/* Name */}
            <div>
              {/* Intro line */}
              <p
                className="text-[#888] text-xs md:text-sm font-mono tracking-[0.3em] uppercase mb-2"
              >
                HI, I&apos;M
              </p>
              <div 
                className="w-full max-w-[440px] md:max-w-[900px] mt-4 mb-6 md:mb-12 -ml-2 md:-ml-4 transform scale-[1.15] md:scale-[1.35] origin-left"
                onTouchStart={handleMobileTouch}
              >
                <ParticleText 
                  text="ADITYA RAJ" 
                  canvasWidth={1600} 
                  canvasHeight={300} 
                  textSize={210} 
                  textColor="#FF5C00" 
                  onHoverStateChange={setIsNameHovered}
                  className="w-full object-contain"
                />
              </div>
            </div>

            {/* Title */}
            <p
              className="mt-2 text-[#888] text-xs md:text-sm font-body tracking-[0.15em] uppercase"
            >
              {siteConfig.title}
            </p>

            {/* College & Course */}
            <p
              className="mt-1.5 text-accent text-xs font-mono tracking-wider"
            >
              Chandigarh University, UP • B.Tech CSE (AI/ML) • 2026–2030
            </p>

            {/* Bio */}
            <p
              className="mt-3 text-[#666] text-xs md:text-sm font-body leading-relaxed max-w-sm"
            >
              {siteConfig.tagline} Proactive pre-college student dedicated to software & AI/ML engineering through self-discipline and continuous learning.
            </p>

            {/* Socials */}
            <div 
              className="mt-3"
              onMouseEnter={() => setIsNameHovered(true)}
              onMouseLeave={() => setIsNameHovered(false)}
            >
              <div className="flex flex-wrap gap-2">
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="relative flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md text-[#666] hover:text-accent hover:border-[#FF5C00]/40 hover:bg-[#FF5C00]/10 hover:shadow-[0_0_15px_rgba(255,92,0,0.15)] transition-all duration-300 text-[10px] font-mono tracking-widest uppercase overflow-hidden group"
                    whileHover="hover"
                    initial="initial"
                  >
                    <motion.div
                      variants={{
                        initial: { y: 0 },
                        hover: {
                          y: [0, -30, 30, 0],
                          transition: { duration: 0.5, ease: "easeInOut" }
                        }
                      }}
                    >
                      <Icon size={14} />
                    </motion.div>
                    {label !== "X" && <span>{label}</span>}
                  </motion.a>
                ))}

                {/* Location */}
                <span className="ml-2 flex items-center text-[#444] text-xs font-mono tracking-wider">
                  {siteConfig.location}
                </span>
              </div>
            </div>
            </motion.div>
          </motion.div>

          {/* Right — Hero Image: enters FROM RIGHT, exits TO RIGHT */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="hero-slide-right relative flex items-end justify-center md:justify-end mt-12 md:mt-0"
          >
            <motion.div
              style={{ x: imageX }}
            >
            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
              }}
              className="relative"
            >
              {/* Accent line top-right */}
              <motion.div
                className="absolute -top-3 -right-3 w-16 h-px bg-accent z-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                style={{ transformOrigin: "right" }}
              />
              <motion.div
                className="absolute -top-3 -right-3 w-px h-16 bg-accent z-10"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                style={{ transformOrigin: "top" }}
              />

              {/* Photo */}
              <div
                className="relative overflow-hidden"
                style={{
                  width: "clamp(260px, 32vw, 400px)",
                  height: "clamp(320px, 45vw, 520px)",
                }}
                onTouchStart={handleMobileTouch}
              >
                <Image
                  src="/profile_new.png?v=20260821"
                  fill
                  alt="Aditya Raj"
                  className={`object-cover object-top transition-all duration-700 ${isNameHovered ? 'grayscale-0' : 'grayscale hover:grayscale-0'}`}
                  priority
                />
                {/* Edge blending vignette */}
                <div 
                  className="absolute inset-0 pointer-events-none" 
                  style={{ boxShadow: "inset 0 0 80px 40px #0a0a0a" }}
                />
              </div>

              {/* Email Bar — matches image width */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-3 flex items-center justify-center gap-3 py-2.5 border border-[#1e1e1e] hover:border-[#FF5C00]/40 rounded-md bg-[#0d0d0d]/80 transition-all duration-400 hover:bg-[#FF5C00]/5 group"
                style={{ width: "clamp(260px, 32vw, 400px)" }}
                onMouseEnter={() => setIsNameHovered(true)}
                onMouseLeave={() => setIsNameHovered(false)}
              >
                <span className="text-accent text-sm">✉</span>
                <span className="text-[#777] group-hover:text-white font-mono text-xs md:text-sm tracking-[0.15em] transition-colors duration-300">
                  {siteConfig.email}
                </span>
                <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </a>

              {/* Floating stat card */}
              <motion.div
                className="absolute -left-4 md:-left-16 bottom-16 bg-[#111] border border-[#1e1e1e] px-3 py-2 md:px-4 md:py-3 z-10"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="font-display text-xl md:text-2xl text-accent">2026-2030</p>
                <p className="text-[#555] text-xs font-mono tracking-wider mt-0.5">Batch</p>
              </motion.div>

              {/* Available badge */}
              <motion.div
                className="absolute -right-4 md:-right-10 top-16 flex items-center gap-2 bg-[#111] border border-[#1e1e1e] px-2 py-1.5 md:px-3 md:py-2 z-10"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-[#888] text-xs font-mono">Available</span>
              </motion.div>
            </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
