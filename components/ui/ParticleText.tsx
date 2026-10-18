"use client";

import React, { useEffect, useRef } from "react";

interface ParticleTextProps {
  text: string;
  className?: string;
  canvasWidth?: number;
  canvasHeight?: number;
  textSize?: number;
  textColor?: string;
  interactive?: boolean;
  onHoverStateChange?: (isHovered: boolean) => void;
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
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  update(mouse: { x: number; y: number; radius: number }, interactive: boolean) {
    if (interactive) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        const pushX = Math.cos(angle) * force * 15;
        const pushY = Math.sin(angle) * force * 15;
        this.vx -= pushX * 0.1;
        this.vy -= pushY * 0.1;
        this.vy -= force * 0.5;
      } else {
        let returnDx = this.baseX - this.x;
        let returnDy = this.baseY - this.y;
        this.vx += returnDx * 0.08;
        this.vy += returnDy * 0.08;
      }
    } else {
      let returnDx = this.baseX - this.x;
      let returnDy = this.baseY - this.y;
      this.vx += returnDx * 0.08;
      this.vy += returnDy * 0.08;
    }

    this.vx *= 0.85;
    this.vy *= 0.85;
    this.x += this.vx;
    this.y += this.vy;
  }
}

export function ParticleText({
  text,
  className = "",
  canvasWidth = 1200,
  canvasHeight = 220,
  textSize = 140,
  textColor = "#FF5C00",
  interactive = true,
  onHoverStateChange,
}: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouse = useRef({ x: -1000, y: -1000, radius: 45 });
  const isInteractingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx) return;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Wait for fonts to load before drawing
    document.fonts.ready.then(() => {
      let currentSize = textSize;
      ctx.font = `bold ${currentSize}px 'Chakra Petch', sans-serif`;
      const textWidth = ctx.measureText(text).width;
      if (textWidth > canvasWidth - 40) {
        currentSize = Math.floor(currentSize * ((canvasWidth - 40) / textWidth));
        ctx.font = `bold ${currentSize}px 'Chakra Petch', sans-serif`;
      }
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      
      ctx.fillStyle = textColor;
      // Draw text near the left edge, slightly above center to accommodate descenders
      ctx.fillText(text, 10, canvasHeight / 2 - 10);

      const textCoordinates = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      const particleArray: Particle[] = [];
      
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const isMobile = window.innerWidth < 768;
      const gap = isMobile ? 6 : 4;
      const dotSize = isMobile ? 2 : 1.5;

      for (let y = 0; y < textCoordinates.height; y += gap) {
        for (let x = 0; x < textCoordinates.width; x += gap) {
          const index = (y * canvasWidth + x) * 4;
          const alpha = textCoordinates.data[index + 3];
          
          if (alpha > 128) {
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
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        let currentInteracting = false;
        const radiusSq = mouse.current.radius * mouse.current.radius;
        
        for (let i = 0; i < particles.current.length; i++) {
          particles.current[i].draw(ctx);
          particles.current[i].update(mouse.current, interactive);
          
          if (interactive && !currentInteracting) {
            let dx = mouse.current.x - particles.current[i].x;
            let dy = mouse.current.y - particles.current[i].y;
            if (dx * dx + dy * dy < radiusSq) {
              currentInteracting = true;
            }
          }
        }
        
        if (currentInteracting !== isInteractingRef.current) {
          isInteractingRef.current = currentInteracting;
          if (onHoverStateChange) {
            onHoverStateChange(currentInteracting);
          }
        }
        
        animationRef.current = requestAnimationFrame(animate);
      };

      animate();
    });

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      if (window.matchMedia("(hover: none)").matches && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;
        
        // Simulate a touch at the center of the screen during scroll
        mouse.current.x = (window.innerWidth / 2 - rect.left) * scaleX;
        mouse.current.y = (window.innerHeight / 3 - rect.top) * scaleY;

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
  }, [text, canvasWidth, canvasHeight, textSize, textColor, interactive]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    mouse.current.x = (e.clientX - rect.left) * scaleX;
    mouse.current.y = (e.clientY - rect.top) * scaleY;
  };

  const handleMouseEnter = () => {
    // We let the animation loop handle the hover state to ensure it's precisely over the particles
  };

  const handleMouseLeave = () => {
    mouse.current.x = -1000;
    mouse.current.y = -1000;
    // The animation loop will detect no interaction and fire onHoverStateChange(false)
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!interactive || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    mouse.current.x = (e.touches[0].clientX - rect.left) * scaleX;
    mouse.current.y = (e.touches[0].clientY - rect.top) * scaleY;
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${interactive ? 'cursor-crosshair' : ''} ${className}`}
    >
      {/* High-performance pseudo-glow instead of canvas drop-shadow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,92,0,0.15)_0%,transparent_60%)] rounded-full pointer-events-none" style={{ filter: "blur(20px)", transform: "translateZ(0)" }} />
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchMove}
        onTouchEnd={handleMouseLeave}
        className="w-full h-auto object-contain block relative z-10"
        style={{ transform: "translateZ(0)" }}
      />
    </div>
  );
}
