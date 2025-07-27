"use client";
import React from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { cn } from "../../lib/utils";

export const ContainerScroll = ({
  titleComponent,
  children,
  compact = false,
}: {
  titleComponent?: React.ReactNode; // optional since you don't want text
  children: React.ReactNode;
  /** compact mode removes extra vertical padding and reduces heights */
  compact?: boolean;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scaleRange = isMobile ? [0.7, 0.9] : [1.05, 1];

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex items-center justify-center relative",
        compact ? "h-[48rem] md:h-[60rem] p-0" : "h-[60rem] md:h-[80rem] p-2 md:p-20"
      )}
    >
      <div
        className={cn("w-full relative", compact ? "py-0 md:py-4" : "py-10 md:py-40")}
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale} compact={compact}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export function Header({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent?: React.ReactNode;
}) {
  if (!titleComponent) return null;
  return (
    <motion.div style={{ translateY: translate }} className="max-w-5xl mx-auto text-center">
      {titleComponent}
    </motion.div>
  );
}

export function Card({
  rotate,
  scale,
  translate, // API parity
  children,
  compact = false,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className={cn(
        "max-w-5xl mx-auto w-full border-4 border-[#6C6C6C] bg-[#222222] rounded-[30px] shadow-2xl",
        compact
          ? "h-[26rem] md:h-[34rem] p-2 md:p-4 mt-0"
          : "h-[30rem] md:h-[40rem] p-2 md:p-6 -mt-12"
      )}
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
}
