"use client";

import { useState, useRef, useEffect } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  onScramble?: (isScrambling: boolean) => void;
}

export function ScrambleText({ text, className = "", onScramble }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    onScramble?.(true);
    const letters = text.split("");
    let iteration = 0;
    
    // Scramble 15 times then stop
    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        const shuffled = [...letters].sort(() => 0.5 - Math.random());
        return shuffled.join("");
      });
      
      iteration += 1;
      if (iteration >= 15) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, 30);
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(text);
    onScramble?.(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block cursor-default ${className}`}
    >
      {displayText}
    </span>
  );
}
