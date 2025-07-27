import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { CheckCircle2 } from "lucide-react";

export type ShowcaseBullet = { title: string; body?: string };
export type ShowcaseTab = {
  id: string;
  label: string;
  title?: string;
  description?: string;
  bullets?: ShowcaseBullet[];
  image: { src: string; alt?: string };
};

export interface TabbedShowcaseProps {
  heading: string;
  subheading?: string;
  tabs: ShowcaseTab[];
  className?: string;
  dark?: boolean; // default light
}

export default function TabbedShowcase({
  heading,
  subheading,
  tabs,
  className,
}: TabbedShowcaseProps) {
  const first = tabs[0]?.id ?? "tab-0";
  const [active, setActive] = React.useState(first);
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section className={cn("relative bg-white text-slate-900", className)}>
      <div className="container py-16 md:py-24">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold">{heading}</h2>
          {subheading && (
            <p className="mt-3 text-base md:text-lg text-slate-600">{subheading}</p>
          )}
          <div className="mx-auto mt-6 h-px w-56 bg-slate-200" />
        </div>

        <Tabs defaultValue={first} onValueChange={setActive}>
          <TabsList variant="pill" className="mx-auto w-fit bg-slate-100 rounded-xl p-1">
            {tabs.map((t) => (
              <TabsTrigger
                key={t.id}
                value={t.id}
                className="min-w-[160px] px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-10 grid items-center gap-8 md:mt-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {activeTab?.title && (
                    <h3 className="text-2xl md:text-3xl font-semibold">{activeTab.title}</h3>
                  )}
                  {activeTab?.description && (
                    <p className="mt-3 text-base md:text-lg text-slate-600">
                      {activeTab.description}
                    </p>
                  )}
                  {activeTab?.bullets?.length ? (
                    <ul className="mt-6 space-y-4">
                      {activeTab.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          <div>
                            <p className="font-medium">{b.title}</p>
                            {b.body && <p className="text-sm mt-1 text-slate-600">{b.body}</p>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="order-1 md:order-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active + "-img"}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-[28px] border border-slate-200 bg-white p-2 md:p-4"
                >
                  <div className="h-[260px] md:h-[360px] w-full overflow-hidden rounded-2xl bg-slate-100">
                    <img
                      src={activeTab?.image.src}
                      alt={activeTab?.image.alt ?? activeTab?.label}
                      className="h-full w-full object-cover"
                      draggable={false}
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {tabs.map((t) => (
            <TabsContent key={t.id} value={t.id} className="sr-only" />
          ))}
        </Tabs>
      </div>
    </section>
  );
}
