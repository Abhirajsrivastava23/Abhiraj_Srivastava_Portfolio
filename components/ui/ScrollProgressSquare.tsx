"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function ScrollProgressSquare() {
  const { scrollYProgress } = useScroll();

  // Smooth out the scroll progress for a premium feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Top edge: grows from left (0) to right (0.25)
  const scaleXTop = useTransform(smoothProgress, [0, 0.25], [0, 1]);
  
  // Right edge: grows from top (0.25) to bottom (0.50)
  const scaleYRight = useTransform(smoothProgress, [0.25, 0.5], [0, 1]);
  
  // Bottom edge: grows from right (0.50) to left (0.75)
  const scaleXBottom = useTransform(smoothProgress, [0.5, 0.75], [0, 1]);
  
  // Left edge: grows from bottom (0.75) to top (1.0)
  const scaleYLeft = useTransform(smoothProgress, [0.75, 1], [0, 1]);

  const thickness = 3; // pixels
  // Massive multi-layered glow for ambient light spill
  const baseGlow = `
    0 0 5px #fff,
    0 0 15px rgba(255,92,0,0.8), 
    0 0 30px rgba(255,92,0,0.6), 
    0 0 60px rgba(255,92,0,0.4), 
    0 0 100px rgba(255,92,0,0.2),
    0 0 150px rgba(255,92,0,0.1)
  `;
  
  return (
    <>
      {/* Top Bar (Left to Right) */}
      <motion.div
        className="pointer-events-none"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: thickness,
          background: "linear-gradient(90deg, transparent 0%, rgba(255,92,0,0.5) 40%, rgba(255,92,0,1) 85%, #ffffff 100%)",
          boxShadow: baseGlow,
          mixBlendMode: "screen",
          transformOrigin: "left",
          scaleX: scaleXTop,
          zIndex: 99999,
        }}
      />
      
      {/* Right Bar (Top to Bottom) */}
      <motion.div
        className="pointer-events-none"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: thickness,
          background: "linear-gradient(180deg, transparent 0%, rgba(255,92,0,0.5) 40%, rgba(255,92,0,1) 85%, #ffffff 100%)",
          boxShadow: baseGlow,
          mixBlendMode: "screen",
          transformOrigin: "top",
          scaleY: scaleYRight,
          zIndex: 99999,
        }}
      />
      
      {/* Bottom Bar (Right to Left) */}
      <motion.div
        className="pointer-events-none"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: thickness,
          background: "linear-gradient(270deg, transparent 0%, rgba(255,92,0,0.5) 40%, rgba(255,92,0,1) 85%, #ffffff 100%)",
          boxShadow: baseGlow,
          mixBlendMode: "screen",
          transformOrigin: "right",
          scaleX: scaleXBottom,
          zIndex: 99999,
        }}
      />
      
      {/* Left Bar (Bottom to Top) */}
      <motion.div
        className="pointer-events-none"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: thickness,
          background: "linear-gradient(0deg, transparent 0%, rgba(255,92,0,0.5) 40%, rgba(255,92,0,1) 85%, #ffffff 100%)",
          boxShadow: baseGlow,
          mixBlendMode: "screen",
          transformOrigin: "bottom",
          scaleY: scaleYLeft,
          zIndex: 99999,
        }}
      />
    </>
  );
}
