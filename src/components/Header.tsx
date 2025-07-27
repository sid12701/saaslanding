import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import logo from "../assets/logo.png";

const NAV = [
  { label: "The Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Why Us?", href: "#why-us" },
  { label: "Compliance", href: "#compliance" },
  { label: "How it Works?", href: "#how-it-works" },
];

export default function Header() {
  return (
    <header className="sticky top-4 z-50 flex w-full justify-center">
      <nav
        className={cn(
          "mx-auto flex items-center gap-5 rounded-3xl border border-slate-200/80 bg-white/90 px-4 py-2.5 shadow-lg shadow-slate-900/5 backdrop-blur",
          "md:gap-7 md:px-6"
        )}
        aria-label="Primary"
      >
        {/* Logo */}
        <a href="#" aria-label="Home" className="flex items-center">
          <img
            src={logo} // put your file in /public/logo.png
            alt="LIMSpire"
            className="h-7 w-auto"
            draggable={false}
          />
        </a>

        {/* Links */}
        <ul className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  "text-[15px] font-medium text-slate-700 transition-colors hover:text-slate-900",
                  "data-[active=true]:text-slate-900 data-[active=true]:underline data-[active=true]:underline-offset-8 data-[active=true]:decoration-2 data-[active=true]:decoration-primary"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Spacer */}
        <div className="grow" />

        {/* CTA */}
        <a href="#request-demo" className="shrink-0">
          <Button size="lg" className="rounded-full px-5">
            Request a Demo
          </Button>
        </a>
      </nav>
    </header>
  );
}
