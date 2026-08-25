import { Variants } from "framer-motion";

// Premium Apple-like easing - very smooth acceleration and long tail deceleration
const premiumEase = [0.16, 1, 0.3, 1];
// Super smooth subtle easing
const softEase = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 80,
      damping: 15,
      mass: 0.8
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.0, ease: softEase },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60, rotate: -2 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { 
      type: "spring",
      stiffness: 70,
      damping: 14
    },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60, rotate: 2 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { 
      type: "spring",
      stiffness: 70,
      damping: 14
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.7, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 18,
      mass: 1
    },
  },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(20px)", y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 80,
      damping: 15
    },
  },
};

export const viewportConfig = {
  once: false,
  margin: "-80px",
};
