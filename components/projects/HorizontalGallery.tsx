"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalGallery({
  projects,
}: {
  projects: Project[];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;
    if (window.innerWidth < 768) return; // vertical stack on mobile

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const distance = track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      <div
        ref={trackRef}
        className="flex flex-col gap-8 px-6 py-10 md:flex-row md:gap-10 md:px-10 md:py-0 md:h-screen md:items-center md:will-change-transform"
      >
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="group relative flex h-[70vh] w-full shrink-0 flex-col justify-end overflow-hidden rounded-3xl border border-base-border bg-base-surface p-8 transition-colors duration-500 hover:border-signal/50 md:h-[62vh] md:w-[70vw] md:p-10 lg:w-[52vw] focus-ring"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-40 transition-transform duration-700 group-hover:scale-105"
              style={{
                background: `radial-gradient(circle at 30% 20%, ${p.accent}33, transparent 60%)`,
              }}
            />
            <span className="relative z-10 font-mono text-sm text-signal">
              {p.index}
            </span>
            <h3 className="relative z-10 mt-4 max-w-md font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              {p.title}
            </h3>
            <p className="relative z-10 mt-3 max-w-md text-sm text-ink-muted">
              {p.category}
            </p>
            <div className="relative z-10 mt-6 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors group-hover:text-signal">
              View case study
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
