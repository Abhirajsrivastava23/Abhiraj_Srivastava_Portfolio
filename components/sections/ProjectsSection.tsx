"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { projects } from "@/constants/content";
import {
  ExternalLink,
  Sparkles,
  Layers,
  Cpu,
  Code2,
  Globe,
  ChevronLeft,
  ChevronRight,
  Zap,
  Truck,
  Heart,
  Gift,
  ShieldCheck,
  MessageCircle,
  Users,
} from "lucide-react";

export function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = projects.length;
  const currentProject = projects[currentIndex];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + total) % total);
  };

  // Auto-rotation every 7 seconds, pauses on hover
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 7000);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, total]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  return (
    <section id="projects" className="py-20 px-6 md:px-10 max-w-[1400px] mx-auto relative">
      {/* Section Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <motion.p className="section-label mb-3" variants={fadeUp}>
            05 // PORTFOLIO
          </motion.p>
          <motion.h2
            className="font-display text-white flex items-center gap-4"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            variants={fadeUp}
          >
            Projects
            <span className="text-accent text-sm md:text-lg font-mono tracking-widest uppercase px-3 py-1 border border-accent/20 bg-accent/5 rounded-full translate-y-1">
              Slider
            </span>
          </motion.h2>
        </div>

        {/* Project Tab Selector & Nav Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Tab Switchers */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            {projects.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  currentIndex === idx
                    ? "bg-[#FF5C00] text-black font-bold shadow-[0_0_15px_rgba(255,92,0,0.4)]"
                    : "text-[#888] hover:text-white"
                }`}
              >
                <span>0{idx + 1}</span>
                <span className="hidden sm:inline">
                  {proj.id === "nexora-ai"
                    ? "NEXORA.AI"
                    : proj.id === "fatafat-app"
                    ? "Fatafat App"
                    : "SeeU Daters"}
                </span>
              </button>
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous project"
              className="w-10 h-10 rounded-full border border-white/10 hover:border-[#FF5C00]/50 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,92,0,0.3)] active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => paginate(1)}
              aria-label="Next project"
              className="w-10 h-10 rounded-full border border-white/10 hover:border-[#FF5C00]/50 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,92,0,0.3)] active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Slider Panel */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentProject.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full relative group"
          >
            {/* Outer Ambient Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#FF5C00]/20 via-[#FF5C00]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none mix-blend-screen" />

            {/* Project Card Shell */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 group-hover:border-[#FF5C00]/40 transition-all duration-500 bg-[#0c0c0c] backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,0.8)]">
              {/* Top liquid accent line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF5C00]/60 to-transparent z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Inner ambient wash */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none z-0"
                style={{
                  backgroundImage:
                    currentProject.id === "nexora-ai"
                      ? "radial-gradient(circle at 10% 20%, rgba(255, 92, 0, 0.18) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(138, 43, 226, 0.12) 0%, transparent 50%)"
                      : currentProject.id === "fatafat-app"
                      ? "radial-gradient(circle at 10% 20%, rgba(255, 92, 0, 0.18) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(244, 63, 94, 0.14) 0%, transparent 50%)"
                      : "radial-gradient(circle at 10% 20%, rgba(239, 68, 68, 0.2) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(236, 72, 153, 0.16) 0%, transparent 50%)",
                }}
              />

              <div className="p-8 md:p-12 lg:p-14 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left Column: Info */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  {/* Logo + Title + Status */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    {currentProject.logo && (
                      <div className="relative group/logo">
                        <div className="absolute -inset-1 bg-[#FF5C00]/40 rounded-2xl blur-md opacity-40 group-hover/logo:opacity-100 transition-opacity duration-300" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={currentProject.logo}
                          alt={`${currentProject.name} Logo`}
                          className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl object-contain bg-[#161616] p-2 border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                        />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-display text-white text-3xl md:text-5xl tracking-tight leading-none">
                          {currentProject.id === "nexora-ai" ? (
                            <>
                              NEXORA<span className="text-[#FF5C00]">.AI</span>
                            </>
                          ) : currentProject.id === "fatafat-app" ? (
                            <>
                              Fatafat<span className="text-[#FF5C00]"> Delivery App</span>
                            </>
                          ) : (
                            <>
                              SeeU<span className="text-[#FF5C00]"> Daters</span>
                            </>
                          )}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                          </span>
                          {currentProject.status}
                        </span>
                      </div>
                      <p className="text-accent text-xs md:text-sm font-mono tracking-widest uppercase mt-1">
                        {currentProject.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[#999] group-hover:text-[#aaa] transition-colors duration-300 text-sm md:text-base font-body leading-relaxed mb-6">
                    {currentProject.description}
                  </p>

                  {/* Key Metrics */}
                  {currentProject.metrics && (
                    <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
                      {currentProject.metrics.map((metric, i) => (
                        <div
                          key={i}
                          className="p-3 md:p-4 rounded-xl bg-white/[0.03] border border-white/10 group-hover:border-[#FF5C00]/25 transition-all duration-300"
                        >
                          <p className="text-[#666] text-[10px] md:text-xs font-mono uppercase tracking-wider mb-1">
                            {metric.label}
                          </p>
                          <p className="text-white text-xs md:text-sm font-mono font-semibold">
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {currentProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#888] group-hover:text-white group-hover:border-white/20 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={currentProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs md:text-sm font-mono font-bold tracking-wider uppercase text-black bg-[#FF5C00] hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_25px_rgba(255,92,0,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] group/btn"
                    >
                      <span>
                        {currentProject.id === "nexora-ai"
                          ? "Launch NEXORA.AI"
                          : currentProject.id === "fatafat-app"
                          ? "Open Fatafat App"
                          : "Launch SeeU Daters"}
                      </span>
                      <ExternalLink
                        size={15}
                        className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      />
                    </a>

                    <a
                      href={currentProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs md:text-sm font-mono font-medium tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 transition-all duration-300"
                    >
                      <Globe size={14} className="text-[#FF5C00]" />
                      <span>{currentProject.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Custom Visual Mockup Per Project */}
                <div className="lg:col-span-5 relative">
                  <a
                    href={currentProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative rounded-2xl overflow-hidden border border-white/15 group-hover:border-[#FF5C00]/50 transition-all duration-500 bg-[#070707] shadow-[0_20px_50px_rgba(0,0,0,0.9)] group/preview"
                  >
                    {/* Browser Chrome Header */}
                    <div className="px-4 py-3 bg-[#111] border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-black/60 border border-white/10 text-[11px] font-mono text-[#888]">
                        <span className="text-emerald-400">https://</span>
                        <span>{currentProject.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                      </div>
                      <ExternalLink
                        size={14}
                        className="text-[#666] group-hover/preview:text-accent transition-colors"
                      />
                    </div>

                    {/* Dynamic Simulated Preview Based on Project */}
                    {currentProject.id === "nexora-ai" ? (
                      /* Nexora Canvas Mockup */
                      <div className="p-6 md:p-8 bg-gradient-to-br from-[#0c0c0c] via-[#090909] to-[#040404] min-h-[300px] flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FF5C00]/15 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-2 text-xs font-mono text-[#FF5C00]">
                            <Sparkles size={13} />
                            <span>AI CANVAS_001</span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#777]">
                            v4.0 UNIFIED
                          </span>
                        </div>

                        <div className="my-6 relative z-10">
                          <p className="text-[10px] font-mono tracking-widest text-[#666] uppercase mb-1">
                            AN IDEA. A WEBSITE.
                          </p>
                          <h4 className="text-xl md:text-2xl font-display text-white leading-tight">
                            All yours<span className="text-[#FF5C00]">.</span>
                          </h4>
                          <p className="text-[#777] text-xs font-body mt-2 leading-relaxed max-w-xs">
                            Plan with AI, refine visually, and leave with real code you can call your own.
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-2 relative z-10 pt-4 border-t border-white/10">
                          <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-center">
                            <Layers size={13} className="text-[#FF5C00] mx-auto mb-1" />
                            <span className="text-[10px] font-mono text-[#999] block">Plan</span>
                          </div>
                          <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-center">
                            <Cpu size={13} className="text-[#FF5C00] mx-auto mb-1" />
                            <span className="text-[10px] font-mono text-[#999] block">Build AI</span>
                          </div>
                          <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-center">
                            <Code2 size={13} className="text-[#FF5C00] mx-auto mb-1" />
                            <span className="text-[10px] font-mono text-[#999] block">Own Code</span>
                          </div>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF5C00] text-black text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(255,92,0,0.5)]">
                            <span>Open Live Site</span>
                            <ExternalLink size={13} />
                          </span>
                        </div>
                      </div>
                    ) : currentProject.id === "fatafat-app" ? (
                      /* Fatafat Delivery App Mockup */
                      <div className="p-6 md:p-8 bg-gradient-to-br from-[#120709] via-[#0d0406] to-[#050102] min-h-[300px] flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-2 text-xs font-mono text-[#FF5C00]">
                            <Zap size={13} className="text-amber-400" />
                            <span>FATAFAT RAPID DELIVERY</span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400">
                            CELEBRATIONS
                          </span>
                        </div>

                        <div className="my-6 relative z-10">
                          <p className="text-[10px] font-mono tracking-widest text-[#888] uppercase mb-1">
                            CELEBRATE • GIFT • INDULGE
                          </p>
                          <h4 className="text-xl md:text-2xl font-display text-white leading-tight">
                            Delivered <span className="text-[#FF5C00]">Fatafat.</span>
                          </h4>
                          <p className="text-[#888] text-xs font-body mt-2 leading-relaxed max-w-xs">
                            Handcrafted cakes, fresh floral bouquets, gourmet desserts & celebration hampers fast.
                          </p>
                        </div>

                        <div className="grid grid-cols-4 gap-2 relative z-10 pt-4 border-t border-white/10">
                          <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-center">
                            <span className="text-xs mb-1 block">🎂</span>
                            <span className="text-[9px] font-mono text-[#aaa] block">Cakes</span>
                          </div>
                          <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-center">
                            <span className="text-xs mb-1 block">🌸</span>
                            <span className="text-[9px] font-mono text-[#aaa] block">Flowers</span>
                          </div>
                          <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-center">
                            <Gift size={13} className="text-rose-400 mx-auto mb-1" />
                            <span className="text-[9px] font-mono text-[#aaa] block">Hampers</span>
                          </div>
                          <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-center">
                            <Truck size={13} className="text-amber-400 mx-auto mb-1" />
                            <span className="text-[9px] font-mono text-[#aaa] block">Express</span>
                          </div>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF5C00] text-black text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(255,92,0,0.5)]">
                            <span>Open Fatafat App</span>
                            <ExternalLink size={13} />
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* SeeU Daters College Dating Mockup */
                      <div className="p-6 md:p-8 bg-gradient-to-br from-[#170509] via-[#0f0407] to-[#040102] min-h-[300px] flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-2 text-xs font-mono text-pink-400">
                            <Heart size={13} className="fill-pink-500 text-pink-500" />
                            <span>VERIFIED CAMPUS DATING</span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1">
                            <ShieldCheck size={11} />
                            <span>STUDENT VERIFIED</span>
                          </span>
                        </div>

                        <div className="my-6 relative z-10">
                          <p className="text-[10px] font-mono tracking-widest text-[#888] uppercase mb-1">
                            BY STUDENTS • FOR STUDENTS
                          </p>
                          <h4 className="text-xl md:text-2xl font-display text-white leading-tight">
                            Authentic <span className="text-pink-500">Connections.</span>
                          </h4>
                          <p className="text-[#888] text-xs font-body mt-2 leading-relaxed max-w-xs">
                            Verified college dating platform for real student matches, safe chat, and campus circles.
                          </p>
                        </div>

                        <div className="grid grid-cols-4 gap-2 relative z-10 pt-4 border-t border-white/10">
                          <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-center">
                            <span className="text-xs mb-1 block">💕</span>
                            <span className="text-[9px] font-mono text-[#aaa] block">Match 95%</span>
                          </div>
                          <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-center">
                            <ShieldCheck size={13} className="text-pink-400 mx-auto mb-1" />
                            <span className="text-[9px] font-mono text-[#aaa] block">Verified ID</span>
                          </div>
                          <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-center">
                            <MessageCircle size={13} className="text-pink-400 mx-auto mb-1" />
                            <span className="text-[9px] font-mono text-[#aaa] block">Safe Chat</span>
                          </div>
                          <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-center">
                            <Users size={13} className="text-pink-400 mx-auto mb-1" />
                            <span className="text-[9px] font-mono text-[#aaa] block">Colleges</span>
                          </div>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF5C00] text-black text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(255,92,0,0.5)]">
                            <span>Open SeeU Daters</span>
                            <ExternalLink size={13} />
                          </span>
                        </div>
                      </div>
                    )}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Progress Dots & Status Bar */}
      <div className="mt-8 flex items-center justify-between flex-wrap gap-4 px-2">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "w-8 bg-[#FF5C00] shadow-[0_0_12px_rgba(255,92,0,0.6)]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
          <span className="ml-3 text-xs font-mono text-[#666]">
            0{currentIndex + 1} / 0{total}
          </span>
        </div>

        {/* Keyboard / Swipe hint */}
        <p className="text-xs font-mono text-[#555] hidden sm:block">
          Use buttons or tabs to slide between projects
        </p>
      </div>

    </section>
  );
}
