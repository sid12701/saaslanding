import * as React from "react";
import { cn } from "../lib/utils";

/* ---------- Types ---------- */

export type ComplianceCard = {
  /** Optional image shown above the caption heading/description */
  image?: { src: string; alt?: string };
  captionTitle: string;
  captionBody: string;
};

export interface ComplianceSectionProps {
  heading: string;
  subheading?: string;
  cards: [ComplianceCard, ComplianceCard, ComplianceCard];
  className?: string;
}

/* ---------- Card ---------- */

function ComplianceCardView({ data }: { data: ComplianceCard }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-6 shadow-soft">
      {/* Image (replaces the previous audit trail area) */}
      {data.image?.src && (
        <div className="mb-5">
          <div className="overflow-hidden rounded-xl bg-slate-100">
            <img
              src={data.image.src}
              alt={data.image.alt ?? ""}
              className="h-36 w-full object-cover md:h-44"
              loading="lazy"
              draggable={false}
            />
          </div>
        </div>
      )}

      {/* Caption */}
      <div>
        <h4 className="text-base md:text-lg font-semibold">{data.captionTitle}</h4>
        <p className="mt-2 text-slate-600 text-[14px] md:text-[15px] leading-6">
          {data.captionBody}
        </p>
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

export default function ComplianceSection({
  heading,
  subheading,
  cards,
  className,
}: ComplianceSectionProps) {
  return (
    <section className={cn("bg-white", className)}>
      {/* Wider container so cards appear wider */}
      <div className="container max-w-[1440px] py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">{heading}</h2>
          {subheading && <p className="mt-3 text-slate-600 text-base md:text-lg">{subheading}</p>}
        </div>

        <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-3">
          <ComplianceCardView data={cards[0]} />
          <ComplianceCardView data={cards[1]} />
          <ComplianceCardView data={cards[2]} />
        </div>
      </div>
    </section>
  );
}
