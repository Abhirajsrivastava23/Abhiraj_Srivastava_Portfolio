"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/constants/content";
import { Download, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
  { label: "Expertise", href: "#expertise" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeText, setResumeText] = useState("Download CV");

  const handleResumeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const pdfUrl = siteConfig.resumeUrl || "/Abhiraj_Srivastava_CV.pdf";
    setResumeText("Downloading...");

    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error("File fetch failed");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "Abhiraj_Srivastava_CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 3000);

      setResumeText("Downloaded ✓");
      setTimeout(() => setResumeText("Download CV"), 2500);
    } catch {
      // Fallback
      const fallbackLink = document.createElement("a");
      fallbackLink.href = pdfUrl;
      fallbackLink.download = "Abhiraj_Srivastava_CV.pdf";
      fallbackLink.target = "_blank";
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      document.body.removeChild(fallbackLink);
      setResumeText("Download CV");
    }
  };

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 50));
    return unsub;
  }, [scrollY]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full bg-white/[0.03] backdrop-blur-2xl backdrop-saturate-[1.5] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-300"
        initial={{ y: -30, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Inner ambient glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        <div className="relative flex items-center justify-between px-5 md:px-8 py-3">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center justify-center select-none group px-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-sm font-mono tracking-[0.2em] font-bold text-white group-hover:text-accent transition-colors duration-300">HOME</span>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="relative px-4 py-2 text-sm text-[#888] hover:text-white transition-all duration-300 font-body tracking-wide group"
              >
                <span className="relative z-10">{link.label}</span>
                {/* Hover Background Pill */}
                <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                {/* Hover Glow Line */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#FF5C00] group-hover:w-1/2 transition-all duration-300 opacity-0 group-hover:opacity-100 blur-[1px] pointer-events-none" />
              </button>
            ))}
          </nav>

          {/* Download PDF */}
          <div className="hidden md:flex items-center">
            <motion.a
              href={siteConfig.resumeUrl || "/Abhiraj_Srivastava_CV.pdf"}
              download="Abhiraj_Srivastava_CV.pdf"
              onClick={handleResumeClick}
              className="relative overflow-hidden flex items-center justify-center min-w-[145px] gap-2 bg-[#FF5C00] text-black text-xs font-bold px-5 py-2.5 rounded-full tracking-wider uppercase group cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,92,0,0.4)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Sweeping shine effect */}
              <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.2s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 z-0 pointer-events-none" />
              <Download size={14} className="relative z-10" />
              <span className="relative z-10">{resumeText}</span>
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center md:hidden"
        initial={{ opacity: 0, y: "-100%" }}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : "-100%" }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="font-display text-4xl text-white hover:text-accent transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : 20 }}
              transition={{ delay: i * 0.08 + 0.1 }}
            >
              {link.label}
            </motion.button>
          ))}
          <motion.a
            href={siteConfig.resumeUrl || "/Abhiraj_Srivastava_CV.pdf"}
            download="Abhiraj_Srivastava_CV.pdf"
            onClick={handleResumeClick}
            className="mt-4 flex items-center justify-center min-w-[180px] gap-2 bg-[#FF5C00] text-black text-sm font-bold px-6 py-3 rounded-full tracking-wider uppercase cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: menuOpen ? 1 : 0 }}
            transition={{ delay: 0.4 }}
          >
            <Download size={16} />
            <span>{resumeText}</span>
          </motion.a>
        </nav>
      </motion.div>
    </>
  );
}
