import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../lib/utils";

type Step = {
  id: string;
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const STEPS: Step[] = [
  {
    id: "step-1",
    number: "01",
    title: "Fill Out a Quick Form",
    description:
      "Share your lab’s details through our simple signup form. One of our experts will promptly reach out to understand your needs and guide you through the setup process.",
    imageSrc:
      "https://images.unsplash.com/photo-1604882732435-69474a4e2533?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Onboarding call scheduled",
  },
  {
    id: "step-2",
    number: "02",
    title: "Start Your Free Trial",
    description:
      "Experience the full power of LIMSpire with a no‑obligation 30‑day trial. Get hands‑on with intuitive sample tracking, AI anomaly alerts, and compliance tools to see the benefits firsthand.",
    imageSrc:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Using the app during free trial",
  },
  {
    id: "step-3",
    number: "03",
    title: "Choose Your Plan & Keep Lab Operations Running",
    description:
      "After your trial, select a subscription that fits your lab’s size and needs. Pay a nominal monthly fee to continue uninterrupted access, with premium support and regular updates included.",
    imageSrc:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Selecting a plan",
  },
];

export default function HowItWorks() {
  const [active, setActive] = React.useState(0);
  const imageRef = React.useRef<HTMLDivElement>(null);

  // Keyboard navigation across the tab list
  const onKeyDownTabs = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % STEPS.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + STEPS.length) % STEPS.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(STEPS.length - 1);
    }
  };

  return (
    <section id="how-it-works" className="bg-white">
      <div className="container py-16 md:py-24">
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-5xl font-semibold">How it Works?</h2>

        {/* Grid */}
        <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-2">
          {/* Left: Tabs (vertical) */}
          <div
            role="tablist"
            aria-label="How it Works steps"
            onKeyDown={onKeyDownTabs}
            className="space-y-10"
          >
            {STEPS.map((step, idx) => {
              const selected = idx === active;
              return (
                <StepTab
                  key={step.id}
                  id={`hiw-tab-${idx}`}
                  panelId="hiw-panel"
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  selected={selected}
                  onSelect={() => {
                    setActive(idx);
                    // On small screens, ensure the image comes into view after changing
                    imageRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                  }}
                />
              );
            })}
          </div>

          {/* Right: Sticky image that changes with active tab */}
          <div
            ref={imageRef}
            id="hiw-panel"
            role="tabpanel"
            aria-labelledby={`hiw-tab-${active}`}
            className="relative md:sticky md:top-24 h-[340px] md:h-[480px] rounded-[22px] border border-slate-200 p-1 bg-white shadow-soft"
          >
            <div className="h-full w-full overflow-hidden rounded-[18px] ring-1 ring-slate-100">
              <AnimatePresence mode="wait">
                <motion.img
                  key={STEPS[active].imageSrc}
                  src={STEPS[active].imageSrc}
                  alt={STEPS[active].imageAlt}
                  className="h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 0.995, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.995, y: -8 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  draggable={false}
                  loading="lazy"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- subcomponents ---------------- */

type StepTabProps = {
  id: string;
  panelId: string;
  number: string;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
};

function StepTab({
  id,
  panelId,
  number,
  title,
  description,
  selected,
  onSelect,
}: StepTabProps) {
  return (
    <button
      id={id}
      role="tab"
      aria-controls={panelId}
      aria-selected={selected}
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full rounded-2xl border p-5 md:p-6 text-left transition-colors outline-none",
        selected
          ? "bg-primary-25 border-primary/30"
          : "bg-white border-slate-200 opacity-50 hover:opacity-100"
      )}
    >
      <div className="mb-3 inline-flex items-center rounded-md bg-white px-2.5 py-1 text-[12px] font-medium text-slate-700 ring-1 ring-slate-200">
        {number}
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-600 text-sm md:text-base">{description}</p>
    </button>
  );
}
