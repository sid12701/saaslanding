import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../lib/utils";

// Placeholder data — replace with real logos later
const LOGOS = [
  { name: "Spherule", color: "#9CA3AF" },
  { name: "Acme Corp", color: "#6B7280" },
  { name: "Capsule", color: "#2563EB" },
  { name: "Catalog", color: "#6366F1" },
  { name: "FeatherDev", color: "#22C55E" },
  { name: "Solvector", color: "#F59E0B" },
  { name: "Nimbus", color: "#0EA5E9" }
];

// Width of a single logo item; viewport shows exactly 4 at a time
const ITEM_WIDTH_REM = 14;
const FADE_PX = 64;

export default function LogosMarquee() {
  const prefersReduced = useReducedMotion();

  // duplicate list for seamless loop
  const items = [...LOGOS, ...LOGOS];

  return (
    <div
      className={cn("relative mx-auto overflow-hidden mask-fade-right")}
      style={{ maxWidth: `calc(${ITEM_WIDTH_REM}rem * 4)` }}
      aria-label="Trusted by companies"
      role="region"
    >
      {/* Visual fallback fade for browsers without CSS mask support */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full"
        style={{
          width: `${FADE_PX}px`,
          background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)"
        }}
        aria-hidden
      />

      <motion.div
        className="flex"
        style={{ width: `calc(${ITEM_WIDTH_REM}rem * ${items.length})` }}
        animate={!prefersReduced ? { x: ["0%", "-50%"] } : undefined}
        transition={!prefersReduced ? { duration: 18, ease: "linear", repeat: Infinity } : undefined}
      >
        {items.map((item, i) => (
          <LogoItem key={`${item.name}-${i}`} name={item.name} color={item.color} />
        ))}
      </motion.div>
    </div>
  );
}

function LogoItem({ name, color }: { name: string; color: string }) {
  return (
    <div
      className="flex items-center justify-center gap-3 px-6"
      style={{ width: `${ITEM_WIDTH_REM}rem` }}
    >
      <div className="h-8 w-8 rounded-lg" style={{ background: color }} aria-hidden />
      <span className="text-sm font-medium text-foreground/60">{name}</span>
    </div>
  );
}
