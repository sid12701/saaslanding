import React from "react";
import { ScrollColorText, type Line } from "./ScrollColorText";

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
    <section className="bg-white">
      <div className="container py-20 md:py-28">
        <ScrollColorText
          lines={LINES}
          className="mx-auto"
          lineClassName="text-[28px] md:text-[48px] font-semibold leading-tight text-center"
          mainColorClass="text-slate-900"
          accentColorClass="text-indigo-500"
          mutedColorClass="text-slate-400/80"
          // Optional: make reveal snappier/slower by adjusting window size per line:
          // revealWindow={0.18}
        />
      </div>
    </section>
  );
}
