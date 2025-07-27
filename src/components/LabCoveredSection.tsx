import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

/** Small feature blurb shown in the two-column row under the divider */
type Blurb = {
  heading: string;
  body: string;
};

type FloatingCard = {
  title: string;
  body?: string;
  // Tailwind classes used to position the floating cards over the device mock
  className: string;
};

export interface LabCoveredSectionProps {
  eyebrow?: string; // optional small text above h2 if you ever need it
  heading: string;  // e.g., "LIMSpire Has Your Lab Covered"
  subheading?: string;

  /** Left and right blurbs (will act as tabs) */
  leftBlurb: Blurb;
  rightBlurb: Blurb;

  /** Back-compat single image/cards (used if left/right not provided) */
  deviceImageSrc?: string;
  deviceImageAlt?: string;
  floatingCards?: FloatingCard[];

  /** Per-tab images/cards (override the back-compat values) */
  leftImageSrc?: string;
  leftImageAlt?: string;
  leftFloatingCards?: FloatingCard[];

  rightImageSrc?: string;
  rightImageAlt?: string;
  rightFloatingCards?: FloatingCard[];

  /** Initial active tab (default: "left") */
  initialTab?: "left" | "right";
}

const defaultCards: FloatingCard[] = [
  {
    title: "Patient\nBob Biswas (42)",
    body: "Gender: Male · Mobile: 7202860019 · Email: bob.2007@gmail.com",
    className:
      // bottom-left
      "left-[-2%] md:left-[4%] bottom-[8%] md:bottom-[10%] w-[280px] md:w-[340px]"
  },
  {
    title: "Tip",
    body:
      "Ensure sample is well mixed to prevent sedimentation before analysis. This ensures an accurate hemoglobin measurement and reduces the chance of erroneous low results.",
    className:
      // center-bottom
      "left-[36%] md:left-[44%] bottom-[12%] md:bottom-[16%] w-[260px] md:w-[300px]"
  },
  {
    title: "Blood Sample · #BE23A011",
    body:
      "Assigned to: Rahul Sharma — Hemoglobin · CBC · Blood Glucose",
    className:
      // bottom-right
      "right-[-2%] md:right-[4%] bottom-[8%] md:bottom-[10%] w-[300px] md:w-[360px]"
  }
];

export default function LabCoveredSection({
  eyebrow,
  heading,
  subheading,
  leftBlurb,
  rightBlurb,
  deviceImageSrc = "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1600&auto=format&fit=crop",
  deviceImageAlt = "Product UI",
  floatingCards = defaultCards,
  leftImageSrc,
  leftImageAlt,
  leftFloatingCards,
  rightImageSrc,
  rightImageAlt,
  rightFloatingCards,
  initialTab = "left",
}: LabCoveredSectionProps) {
  const [active, setActive] = React.useState<"left" | "right">(initialTab);

  // Resolve active tab content (left/right override back-compat props)
  const aImageSrc =
    active === "left"
      ? leftImageSrc ?? deviceImageSrc
      : rightImageSrc ?? deviceImageSrc;
  const aImageAlt =
    active === "left"
      ? leftImageAlt ?? deviceImageAlt
      : rightImageAlt ?? deviceImageAlt;
  const aCards =
    active === "left"
      ? leftFloatingCards ?? floatingCards
      : rightFloatingCards ?? floatingCards;

  // keyboard support: arrow keys toggle tabs
  const onTabListKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive("left");
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActive("right");
    }
  };

  return (
    <section className="relative bg-white">
      <div className="container py-16 md:py-24">
        {/* Heading block */}
        <div className="text-center max-w-3xl mx-auto">
          {eyebrow && <p className="text-sm font-medium text-primary mb-2">{eyebrow}</p>}
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">{heading}</h2>
          {subheading && (
            <p className="mt-3 text-slate-600 text-base md:text-lg">
              {subheading}
            </p>
          )}
        </div>

        {/* Thin divider */}
        <div className="mx-auto mt-8 mb-8 h-px w-full max-w-4xl bg-slate-200" />

        {/* Two blurbs now behave as tabs */}
        <div
          role="tablist"
          aria-label="Feature tabs"
          onKeyDown={onTabListKeyDown}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2"
        >
          <BlurbTab
            id="lab-tab-left"
            controls="lab-panel"
            blurb={leftBlurb}
            active={active === "left"}
            onClick={() => setActive("left")}
          />
          <BlurbTab
            id="lab-tab-right"
            controls="lab-panel"
            blurb={rightBlurb}
            active={active === "right"}
            onClick={() => setActive("right")}
          />
        </div>

        {/* Device frame with floating cards; swaps per tab */}
        <div id="lab-panel" role="tabpanel" aria-labelledby={active === "left" ? "lab-tab-left" : "lab-tab-right"}>
          <div className="relative mx-auto mt-10 max-w-5xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8, scale: 0.995 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.995 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="relative"
              >
                {/* soft backdrop/tint */}
                <div className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-b from-primary/5 via-primary/10 to-primary/5 blur-[1px]" />
                <div className="rounded-[28px] border border-slate-200 bg-white p-2 md:p-4 shadow-soft">
                  <div className="rounded-2xl overflow-hidden bg-slate-100">
                    <img
                      src={aImageSrc}
                      alt={aImageAlt}
                      className="h-[380px] w-full object-cover md:h-[520px]"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </div>

                {/* Floating info cards (per tab) */}
                {aCards.map((card, idx) => (
                  <FloatingCard key={`${active}-${idx}`} {...card} index={idx} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* keeps consistency with your site background */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-grid opacity-[0.25]" />
    </section>
  );
}

/* -------------------- Subcomponents -------------------- */

function BlurbTab({
  blurb,
  active,
  onClick,
  id,
  controls,
}: {
  blurb: Blurb;
  active: boolean;
  onClick: () => void;
  id: string;
  controls: string;
}) {
  return (
    <button
      type="button"
      id={id}
      role="tab"
      aria-selected={active}
      aria-controls={controls}
      onClick={onClick}
      className={cn(
        "relative text-left rounded-xl px-2 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        active ? "bg-primary-25" : "hover:bg-slate-50"
      )}
    >
      <div className="pb-2">
        <h3 className="text-lg md:text-xl font-semibold text-slate-900">{blurb.heading}</h3>
        <p className="mt-2 text-slate-600">{blurb.body}</p>
      </div>
      {/* blue underline highlight for active tab */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-0 right-0 bottom-0 h-0.5 rounded bg-primary transition-opacity",
          active ? "opacity-100" : "opacity-0"
        )}
      />
    </button>
  );
}

function FloatingCard({
  title,
  body,
  className,
  index,
}: FloatingCard & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay: 0.05 + index * 0.08, ease: "easeOut" }}
      className={cn(
        "absolute rounded-2xl border bg-white shadow-soft",
        "border-slate-200 p-4 md:p-5",
        className
      )}
    >
      <p className="font-medium whitespace-pre-line">{title}</p>
      {body && <p className="mt-2 text-sm text-slate-600">{body}</p>}
    </motion.div>
  );
}
