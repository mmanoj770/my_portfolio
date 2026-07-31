import type { Metadata } from "next";
import WeekGrid from "@/components/protosem/WeekGrid";
import AmbientShapes from "@/components/AmbientShapes";
import { Reveal } from "@/components/Reveal";
import { protosemWeeks } from "@/data/protosem";

export const metadata: Metadata = {
  title: "Protosem Journey — Manoj M",
};

export default function ProtosemPage() {
  return (
    <div className="relative overflow-hidden px-6 pb-28 pt-40 md:px-10 md:pt-48">
      <AmbientShapes />
      <div className="mx-auto max-w-5xl">
        <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.25em] text-signal">
          Protosem
        </Reveal>
        <Reveal
          as="h1"
          delay={0.1}
          className="mt-4 font-display text-5xl font-semibold leading-tight text-ink md:text-7xl"
        >
          20-week log.
        </Reveal>
        <Reveal delay={0.2} as="p" className="mt-4 text-ink-muted">
          Click a week for preview. Double-click for full documentation.
        </Reveal>

        <div className="mt-16">
          <WeekGrid weeks={protosemWeeks} />
        </div>
      </div>
    </div>
  );
}
