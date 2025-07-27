import * as React from "react";
import ComplianceSection, { type ComplianceCard } from "./ComplianceSection";
import compliance1 from "../assets/compliance1.png";
import compliance2 from "../assets/compliance2.png";
import compliance3 from "../assets/compliance3.png";

export default function ComplianceSectionDemo() {
  const cards: ComplianceCard[] = [
    {
      image: {
        src: compliance1,
        alt: "Audit trail dashboard",
      },
      captionTitle: "Complete Audit Trail (ISO 17025, CAP)",
      captionBody:
        "LIMSpire ensures every action is traceable, every result is secure, and your lab effortlessly meets the strictest industry regulations.",
    },
    {
      image: {
        src: compliance2,
        alt: "E‑signature approvals",
      },
      captionTitle: "Secure E‑Signatures",
      captionBody:
        "Digitally sign, review, and approve all reports and analyses—ensuring accountability and supporting digital compliance standards.",
    },
    {
      image: {
        src: compliance3,
        alt: "Compliance overview",
      },
      captionTitle: "Quality & Compliance Insights",
      captionBody:
        "Centralize compliance dashboards to monitor controls, flag issues early, and maintain audit‑ready documentation at all times.",
    },
  ];

  return (
    <ComplianceSection
      heading="Stay Confident with Seamless Compliance"
      subheading="LIMSpire ensures every action is traceable, every result is secure, and your lab effortlessly meets the strictest industry regulations."
      cards={[cards[0], cards[1], cards[2]]}
      className="mt-0"
    />
  );
}
