import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import scroll from "../assets/scroll.png";
/**
 * Immediate handoff from hero to scroll animation.
 * Tip: If you want it even tighter, uncomment the -mt utilities below.
 */
export default function HeroScrollSection() {
  return (
    <section
      id="scroll-demo"
      className={
        // Zero-gap by default. For an even tighter seam, enable one of the -mt classes:
        // "-mt-2 md:-mt-4" or "-mt-4 md:-mt-8"
        "flex flex-col overflow-hidden pt-0 pb-0"
      }
    >
      <ContainerScroll compact>
        <img
          src={scroll}
          alt="demo"
          width={1400}
          height={720}
          draggable={false}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          loading="eager"
        />
      </ContainerScroll>
    </section>
  );
}
