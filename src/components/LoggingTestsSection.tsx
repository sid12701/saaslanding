import * as React from "react";
import { useInView } from "framer-motion";
import { Gravity, MatterBody, type GravityRef } from "./ui/gravity";

export default function LoggingTestsSection() {
  // We observe the *Before* card so physics only runs when it’s visible.
  const beforeRef = React.useRef<HTMLDivElement>(null);
  const gravityRef = React.useRef<GravityRef>(null);

  const inView = useInView(beforeRef, {
    amount: 0.4,
    margin: "-10% 0px -30% 0px",
  });

  React.useEffect(() => {
    if (!gravityRef.current) return;
    if (inView) {
      gravityRef.current.start();
    } else {
      gravityRef.current.stop();
    }
  }, [inView]);

  return (
    <section id="how-it-works" className="bg-white">
      <div className="container py-16 md:py-24">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-semibold">
            Why You’ll Love Logging Tests
            <br className="hidden md:block" /> with LIMSpire
          </h2>
          <p className="mt-3 text-base md:text-lg text-slate-600">
            Experience the transformation from tedious, error‑prone test logging
            to a streamlined, intelligent, and intuitive workflow—making every
            entry count.
          </p>
        </div>

        {/* Two-column content */}
        <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2">
          {/* BEFORE — gravity inside this card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-6">
            <h3 className="text-sm md:text-base font-semibold text-slate-900">
              Before…
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Manual Entries, Lost Data, Endless Rework
            </p>

            {/* Gravity stage (confined to the card) */}
            <div
              ref={beforeRef}
              className="relative mt-4 h-[360px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white"
            >
              {/* The physics canvas is absolutely positioned to this container */}
              <Gravity
                ref={gravityRef}
                autoStart={false}
                gravity={{ x: 0, y: 1 }}
                className="h-full w-full"
              >
                {/* Chips start near the top; they fall & collide within the box */}
                <MatterBody matterBodyOptions={{ friction: 0.5, restitution: 0.2 }} x="22%" y="8%">
                  <div className="rounded-full bg-primary text-white px-5 py-2 text-base md:text-lg font-medium">
                    Manual Entries
                  </div>
                </MatterBody>

                <MatterBody matterBodyOptions={{ friction: 0.5, restitution: 0.2 }} x="50%" y="10%">
                  <div className="rounded-full bg-primary-500 text-white px-5 py-2 text-base md:text-lg font-medium">
                    Lost Data
                  </div>
                </MatterBody>

                <MatterBody matterBodyOptions={{ friction: 0.5, restitution: 0.2 }} x="72%" y="6%" angle={8}>
                  <div className="rounded-full bg-primary-700 text-white px-5 py-2 text-base md:text-lg font-medium">
                    Endless Rework
                  </div>
                </MatterBody>
              </Gravity>

              {/* Optional subtle floor guide for polish */}
              <div className="pointer-events-none absolute inset-x-3 bottom-3 h-px bg-slate-200/70" />
            </div>
          </div>

          {/* AFTER — dark preview card */}
          <div className="rounded-3xl border border-slate-200 bg-primary-900 p-4 md:p-6">
            <h3 className="text-sm md:text-base font-semibold text-white/90">
              After LIMSpire
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Log Tests Effortlessly, With simplified procedure.
            </p>

            <div className="relative mt-4 overflow-hidden rounded-2xl bg-primary-800/40 ring-1 ring-white/10">
              {/* Replace with your real screenshot */}
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1600&auto=format&fit=crop"
                alt="Log Test UI preview"
                className="h-[360px] w-full object-cover"
                draggable={false}
                loading="lazy"
              />
              {/* Minimal floating modal to echo the mock (optional) */}
              <div className="absolute right-6 bottom-6 w-[310px] rounded-xl border border-white/20 bg-white/95 p-3 shadow-soft">
                <div className="text-[13px] font-semibold text-slate-900">Log Test</div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-[12px] text-slate-600">
                  <div>
                    <div className="text-slate-500">Patient</div>
                    <div className="truncate">Bob Biswas • 42</div>
                  </div>
                  <div>
                    <div className="text-slate-500">Test</div>
                    <div className="truncate">Complete Blood Count (CBC)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /AFTER */}
        </div>
      </div>
    </section>
  );
}
