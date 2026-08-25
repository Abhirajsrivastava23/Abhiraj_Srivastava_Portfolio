"use client";

import React, { useState, useRef, ReactNode } from "react";

interface RippleButtonProps {
  children: ReactNode;
  href: string;
  target?: string;
  rel?: string;
  className?: string;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export function RippleButton({ children, href, target, rel, className = "" }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const ref = useRef<HTMLAnchorElement>(null);
  const nextId = useRef(0);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = nextId.current++;

    setRipples((prev) => [...prev, { x, y, id }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Ripple circles */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(255,92,0,0.5) 0%, rgba(255,92,0,0) 70%)",
            animation: "ripple-expand 0.6s ease-out forwards",
          }}
        />
      ))}
      {children}
      <style jsx>{`
        @keyframes ripple-expand {
          0% {
            width: 0px;
            height: 0px;
            opacity: 1;
          }
          100% {
            width: 200px;
            height: 200px;
            opacity: 0;
          }
        }
      `}</style>
    </a>
  );
}
