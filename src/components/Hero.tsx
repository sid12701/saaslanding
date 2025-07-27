// src/sections/Hero.tsx
import * as React from "react";
import { Button } from "./ui/button";
import heroBg from "../assets/hero-bg.png";
export default function Hero() {
  return (
    <section id="problem" className="relative overflow-hidden bg-white">
      {/* ✅ Background image (PNG/WebP/AVIF). NO negative z-index */}
      <div aria-hidden className="absolute inset-0 z-0">
          <img
            src={heroBg}                 // fallback
            alt=""
            className="h-full w-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            draggable={false}
          />

        {/* If this white fade was hiding your art, comment it out or reduce opacity */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_45%,rgba(255,255,255,0.85)_80%,#fff_100%)]" /> */}
      </div>

      {/* ✅ Content above bg */}
      <div className="relative z-10">
        <div className="container py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Inspire Breakthroughs in <br className="hidden md:block" /> Every Lab
          </h1>
          <p className="mt-5 text-slate-600 text-lg">
            Personalized genetic testing for safer, more effective medication.
          </p>
          <div className="mt-8 flex justify-center">
            <Button size="lg" variant="gradient" className="shadow-pill">
              Request a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
