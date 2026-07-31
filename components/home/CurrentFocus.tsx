"use client";

import { Reveal, StaggerReveal, StaggerItem } from "@/components/Reveal";
import { Sun, Sparkles, Code2 } from "lucide-react";

const focusItems = [
  {
    icon: Sun,
    title: "Machine Learning",
    description: "Building predictive models and practical ML solutions.",
  },
  {
    icon: Sparkles,
    title: "Generative AI",
    description:
      "Exploring LLMs, RAG systems, AI Agents, and intelligent automation.",
  },
  {
    icon: Code2,
    title: "Software Engineering",
    description:
      "Building scalable AI-powered web applications using modern technologies.",
  },
];

export default function CurrentFocus() {
  return (
    <section className="border-t border-base-border/50 bg-[#0B0B0B] px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        {/* HEADER GRID */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end md:gap-12 mb-16">
          <div className="md:col-span-7">
            <Reveal
              as="p"
              className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-ink-faint"
            >
              CURRENT FOCUS
            </Reveal>
            <Reveal
              as="h2"
              delay={0.1}
              className="font-display text-4xl font-semibold leading-[1.08] tracking-tightest text-ink md:text-5xl lg:text-6xl"
            >
              Where I&apos;m spending my time.
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal
              delay={0.2}
              as="p"
              className="text-sm font-light leading-relaxed text-ink-muted md:text-base"
            >
              Three areas I&apos;m actively deepening — through coursework, personal projects, and daily practice.
            </Reveal>
          </div>
        </div>

        {/* THREE PREMIUM CARDS */}
        <StaggerReveal className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {focusItems.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem
                key={item.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-base-border bg-base-surface p-8 min-h-[260px] transition-colors duration-300 hover:border-base-raised"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-base-border bg-base-raised text-ink">
                    <Icon size={18} />
                  </div>

                  <h3 className="mt-8 font-display text-xl font-semibold tracking-tight text-ink">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm font-light leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
