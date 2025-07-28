import * as React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { cn } from "../lib/utils";

interface SectionAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
}

export function SectionAnimation({ 
  children, 
  className, 
  delay = 0,
  staggerChildren = 0.1 
}: SectionAnimationProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.2,
    margin: "-10% 0px -10% 0px"
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut",
        delay,
        staggerChildren
      }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  );
}

interface HeadingAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function HeadingAnimation({ 
  children, 
  className,
  delay = 0 
}: HeadingAnimationProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.3,
    margin: "-5% 0px -5% 0px"
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        delay 
      }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  );
}

interface ContentAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ContentAnimation({ 
  children, 
  className,
  delay = 0.2 
}: ContentAnimationProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.2,
    margin: "-10% 0px -10% 0px"
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ 
        duration: 0.7, 
        ease: "easeOut",
        delay 
      }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  );
}