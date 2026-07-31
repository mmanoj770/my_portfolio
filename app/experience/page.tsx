import type { Metadata } from "next";
import Timeline from "@/components/Timeline";
import AmbientShapes from "@/components/AmbientShapes";
import { Reveal } from "@/components/Reveal";
import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience — Manoj M",
};

export default function ExperiencePage() {
  return (
    <div className="relative overflow-hidden px-6 pb-28 pt-40 md:px-10 md:pt-48">
      <AmbientShapes />
      <div className="mx-auto max-w-5xl">
        <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.25em] text-signal">
          Experience
        </Reveal>
        <Reveal
          as="h1"
          delay={0.1}
          className="mt-4 font-display text-5xl font-semibold leading-tight text-ink md:text-7xl"
        >
          Track record.
        </Reveal>

        <div className="mt-20">
          <Timeline items={experience} />
        </div>
      </div>
    </div>
  );
}
