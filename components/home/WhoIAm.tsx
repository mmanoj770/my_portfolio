"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight } from "lucide-react";

export default function WhoIAm() {
  return (
    <section className="border-t border-base-border/50 bg-[#0B0B0B] px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-5">
            <Reveal
              as="p"
              className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-ink-faint"
            >
              WHO I AM
            </Reveal>
            <Reveal
              as="h2"
              delay={0.1}
              className="font-display text-4xl font-semibold leading-[1.08] tracking-tightest text-ink md:text-5xl lg:text-6xl"
            >
              A student building towards AI Engineering.
            </Reveal>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8 text-base font-light leading-relaxed text-ink-muted lg:col-span-7 lg:text-lg">
            <Reveal delay={0.2} as="p">
              I am an Artificial Intelligence and Data Science student passionate about building intelligent software that solves real-world problems.
            </Reveal>

            <Reveal delay={0.3} as="p">
              My interests span Machine Learning, Deep Learning, Data Engineering, Large Language Models, and Full Stack AI Applications.
            </Reveal>

            <Reveal delay={0.4} as="p">
              I enjoy turning complex ideas into simple and meaningful digital experiences while continuously learning emerging technologies.
            </Reveal>

            <Reveal delay={0.45}>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-signal focus-ring"
              >
                More about me
                <ArrowUpRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
