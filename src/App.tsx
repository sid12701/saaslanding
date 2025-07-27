import Header from "./components/Header";
import Hero from "./components/Hero";
import HeroScrollSection from "./components/HeroScrollSection";
import ScrollCopySection from "./components/ScrollCopySection";
import LabCoveredSection from "./components/LabCoveredSection";
import ComplianceSectionDemo from "./components/ComplianceSectionDemo";
import tab1 from "./assets/tab1.png";
import tab2 from "./assets/tab2.png";
import LoggingTestsSection from "./components/LoggingTestsSection";
import HowItWorks from "./components/HowItWorks";

export default function App() {
  return (
    <main className="min-h-screen font-sans text-foreground antialiased">
      <div>
        <Header />
        <Hero />
        <HeroScrollSection />
        <ScrollCopySection />
        <LabCoveredSection
  heading="LIMSpire Has Your Lab Covered"
  subheading="Experience peace of mind as LIMSpire streamlines every step of your lab’s workflow."
  leftBlurb={{
    heading: "Effortless Sample Management",
    body: "Register, monitor, and update every sample in real time with full traceability."
  }}
  rightBlurb={{
    heading: "Smart AI‑Powered Alerts",
    body: "Detect irregularities instantly and prevent costly errors before they escalate."
  }}

  /* Per-tab imagery/cards */
  leftImageSrc={tab1}
  leftFloatingCards={[]}
  rightImageSrc={tab2}
  rightFloatingCards={[
   ]}

  /* Optional: start on right tab */
  // initialTab="right"
/>

<ComplianceSectionDemo />
<LoggingTestsSection />
<HowItWorks />
      </div>
    </main>
  );
}
