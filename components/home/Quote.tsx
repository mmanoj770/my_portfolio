"use client";

import { Reveal } from "@/components/Reveal";

export default function Quote() {
  return (
    <section className="border-t border-base-border/50 bg-[#0B0B0B] px-6 py-32 md:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal
          as="p"
          className="text-balance font-display text-3xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl"
        >
          &ldquo;Building AI products that create real-world impact.&rdquo;
        </Reveal>
      </div>
    </section>
  );
}
