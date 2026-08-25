"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ParticleButtonProps {
  className?: string;
}

class Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  color: string;
  size: number;

  constructor(x: number, y: number, color: string, size: number) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.vx = 0;
    this.vy = 0;
    this.color = color;
    this.size = size;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    // Draw as a small square to match the LED matrix look
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  update(mouse: { x: number; y: number; radius: number }) {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius) {
      // Create a smooth lens/bulge effect (repel but curved)
      const force = (mouse.radius - distance) / mouse.radius;
      const angle = Math.atan2(dy, dx);
      
      // Push particles away but let them slip around the mouse
      const pushX = Math.cos(angle) * force * 15;
      const pushY = Math.sin(angle) * force * 15;
      
      this.vx -= pushX * 0.1;
      this.vy -= pushY * 0.1;
      
      // Slight anti-gravity float when disturbed
      this.vy -= force * 0.5;
    } else {
      // Return to base position
      let returnDx = this.baseX - this.x;
      let returnDy = this.baseY - this.y;
      this.vx += returnDx * 0.08; // Spring
      this.vy += returnDy * 0.08;
    }

    // Friction
    this.vx *= 0.85;
    this.vy *= 0.85;

    this.x += this.vx;
    this.y += this.vy;
  }
}

export function ParticleButton({ className = "" }: ParticleButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  const mouse = useRef({ x: -1000, y: -1000, radius: 45 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx) return;

    // Set large resolution for the big text
    const width = 1000;
    const height = 200;
    canvas.width = width;
    canvas.height = height;

    // 1. Draw text to hidden canvas
    ctx.font = "bold 120px 'Chakra Petch', sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    
    // Draw "LET'S " in white/gray
    ctx.fillStyle = "#e5e7eb"; 
    ctx.fillText("LET'S ", 50, height / 2);
    
    // Measure where to draw "CONNECT"
    const letsWidth = ctx.measureText("LET'S ").width;
    
    // Draw "CONNECT" in orange
    ctx.fillStyle = "#FF5C00";
    ctx.fillText("CONNECT", 50 + letsWidth, height / 2);

    // 2. Extract pixels
    const textCoordinates = ctx.getImageData(0, 0, width, height);
    const particleArray: Particle[] = [];
    
    // Clear canvas so we only draw particles now
    ctx.clearRect(0, 0, width, height);

    // 3. Sample grid to create the LED dot effect
    const isMobile = window.innerWidth < 768;
    const gap = isMobile ? 6 : 4;
    const dotSize = isMobile ? 2 : 1.5;

    for (let y = 0; y < textCoordinates.height; y += gap) {
      for (let x = 0; x < textCoordinates.width; x += gap) {
        const index = (y * width + x) * 4;
        const alpha = textCoordinates.data[index + 3];
        
        if (alpha > 128) {
          // Get the exact color of the pixel we drew
          const r = textCoordinates.data[index];
          const g = textCoordinates.data[index + 1];
          const b = textCoordinates.data[index + 2];
          const color = `rgb(${r},${g},${b})`;
          
          particleArray.push(new Particle(x, y, color, dotSize));
        }
      }
    }
    particles.current = particleArray;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.current.length; i++) {
        particles.current[i].draw(ctx);
        particles.current[i].update(mouse.current);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      if (window.matchMedia("(hover: none)").matches && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;
        
        // Simulate a touch at the center of the screen during scroll
        mouse.current.x = (window.innerWidth / 2 - rect.left) * scaleX;
        mouse.current.y = (window.innerHeight / 2 - rect.top) * scaleY;

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          mouse.current.x = -1000;
          mouse.current.y = -1000;
        }, 150);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    // Map mouse coordinates precisely to internal canvas resolution
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    mouse.current.x = (e.clientX - rect.left) * scaleX;
    mouse.current.y = (e.clientY - rect.top) * scaleY;
  };

  const handleMouseLeave = () => {
    mouse.current.x = -1000;
    mouse.current.y = -1000;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    mouse.current.x = (e.touches[0].clientX - rect.left) * scaleX;
    mouse.current.y = (e.touches[0].clientY - rect.top) * scaleY;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      className={`relative w-full max-w-[1000px] h-[120px] md:h-[200px] cursor-none mx-auto ${className}`}
    >
      {/* High-performance pseudo-glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,92,0,0.1)_0%,transparent_60%)] rounded-full pointer-events-none" style={{ filter: "blur(20px)", transform: "translateZ(0)" }} />
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none relative z-10"
        style={{ transform: "translateZ(0)" }}
      />
    </div>
  );
}
