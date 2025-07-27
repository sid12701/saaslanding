import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../lib/utils";

/** A segment inside a line. When accent=true it's shown in the accent color upon reveal. */
export type Segment = { text: string; accent?: boolean };

/** You can pass a string (single colored line) or an array of segments (mix main + accent). */
export type Line = string | Segment[];

export interface ScrollColorTextProps {
  /** Lines of copy. String = single-color line; Segment[] = mix of accent + normal. */
  lines: Line[];

  /** Tailwind classes for colors/typography/layout. */
  className?: string;          // container
  lineClassName?: string;      // applied to both muted + colored layers

  /** Colors (Tailwind classes). Tweak to match your brand. */
  mainColorClass?: string;     // for normal colored text
  accentColorClass?: string;   // for highlighted words
  mutedColorClass?: string;    // for the base gray text

  /**
   * How much scroll is used to reveal each line.
   * Default spreads evenly across the section height.
   */
  revealWindow?: number; // 0..1; if undefined we compute as 1/(lines+1)
}

/**
 * ScrollColorText
 * Renders a muted base paragraph and a matching colored overlay paragraph for each line.
 * The overlay fades in based on scroll progress, line by line.
 */
export function ScrollColorText({
  lines,
  className,
  lineClassName = "text-3xl md:text-5xl font-semibold leading-tight text-center",
  mainColorClass = "text-slate-900",
  accentColorClass = "text-indigo-500",
  mutedColorClass = "text-slate-400",
  revealWindow,
}: ScrollColorTextProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const total = lines.length;
  const step = 1 / (total + 1);
  const windowSize = revealWindow ?? step; // how much progress each line uses for its fade-in

  return (
    <section ref={ref} className={cn("relative mx-auto w-full", className)}>
      <div className="relative mx-auto max-w-5xl">
        {lines.map((line, i) => {
          // This line begins revealing at i*step and finishes at i*step + windowSize
          const start = Math.max(0, i * step);
          const end = Math.min(1, start + windowSize);

          const opacity = useTransform(scrollYProgress, [start, end], [0, 1], { clamp: true });

          // Render helpers
          const renderMuted = () =>
            typeof line === "string" ? (
              line
            ) : (
              <>
                {line.map((seg, idx) => (
                  <span key={idx}>{seg.text}</span>
                ))}
              </>
            );

          const renderColored = () =>
            typeof line === "string" ? (
              <span className={mainColorClass}>{line}</span>
            ) : (
              <>
                {line.map((seg, idx) => (
                  <span key={idx} className={seg.accent ? accentColorClass : mainColorClass}>
                    {seg.text}
                  </span>
                ))}
              </>
            );

          return (
            <div key={i} className="relative">
              {/* Base muted line (always visible) */}
              <p className={cn("select-none", lineClassName, mutedColorClass)} aria-hidden>
                {renderMuted()}
              </p>

              {/* Colored overlay line (reveals with scroll) */}
              <motion.p
                style={{ opacity }}
                className={cn(
                  "pointer-events-none absolute inset-0",
                  "select-none",
                  lineClassName
                )}
              >
                {renderColored()}
              </motion.p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
