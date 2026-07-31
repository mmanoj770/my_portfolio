import type { Metadata } from "next";
import IslandPanel from "@/components/skills/IslandPanel";
import AmbientShapes from "@/components/AmbientShapes";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Skills — Manoj M",
};

export default function SkillsPage() {
  return (
    <div className="relative overflow-hidden px-6 pb-28 pt-40 md:px-10 md:pt-48">
      <AmbientShapes />
      <div className="mx-auto max-w-4xl">
        <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.25em] text-signal">
          Skills &amp; Stack
        </Reveal>
        <Reveal
          as="h1"
          delay={0.1}
          className="mt-4 font-display text-5xl font-semibold leading-tight text-ink md:text-7xl"
        >
          Tools of the trade.
        </Reveal>
        <Reveal delay={0.2} as="p" className="mt-6 text-lg text-ink-muted">
          Click group to expand skills.
        </Reveal>

        <div className="mt-16">
          <IslandPanel />
        </div>
      </div>
    </div>
  );
}
