import type { Metadata } from "next";
import { projects } from "@/data/projects";
import HorizontalGallery from "@/components/projects/HorizontalGallery";
import AmbientShapes from "@/components/AmbientShapes";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Projects — Manoj M",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="relative flex h-[70vh] items-end overflow-hidden bg-base md:h-[80vh]">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://cdn.recent.design/items/ktzp1pw/0/v0.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/50 to-base/70" />
        <AmbientShapes />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 md:px-10">
          <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.25em] text-signal">
            Projects
          </Reveal>
          <Reveal
            as="h1"
            delay={0.1}
            className="mt-4 max-w-3xl text-balance font-display text-5xl font-semibold leading-[1.02] tracking-tightest text-ink md:text-7xl"
          >
            Five problems, five shipped solutions.
          </Reveal>
        </div>
      </section>

      <section className="border-t border-base-border py-16 md:py-0">
        <HorizontalGallery projects={projects} />
      </section>
    </>
  );
}
