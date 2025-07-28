import React from "react";
import { ScrollColorText, type Line } from "./ScrollColorText";
import { HeadingAnimation, ContentAnimation } from "./micro-animation";

/**
 * Example that mirrors your screenshots.
 * Replace `LINES` with your real copy at any time.
 */
const LINES: Line[] = [
  [
    { text: "Is your lab", accent: true },
    { text: " " },
    { text: "constantly challenged by manual sample tracking," },
    { text: " " },
    { text: "data overload,", accent: true },
    { text: " and the ever-present risk of missing anomalies " },
  ],
  "or making critical errors in results?",
 
];

// Is your lab constantly challenged by manual sample tracking, data overload, and the ever-present risk of missing anomalies or making critical errors in results?

export default function ScrollCopySection() {
  return (
    <section className="bg-white" id="problem">
      <div className="container py-20 md:py-28">
        <HeadingAnimation>
        <h6 className="text-center text-xl font-light text-[#007BA7] pb-10">
          THE PROBLEM
        </h6>
        </HeadingAnimation>
        <ContentAnimation delay={0.3}>
        <ScrollColorText
          lines={LINES}
          className="mx-auto"
          lineClassName="text-[28px] md:text-[48px] font-light leading-tight text-center"
          mainColorClass="text-slate-900"
          accentColorClass="text-[#007BA7]"
          mutedColorClass="text-slate-400/80"
          // Optional: make reveal snappier/slower by adjusting window size per line:
          // revealWindow={0.18}
        />
        </ContentAnimation>
      </div>
    </section>
  );
}
