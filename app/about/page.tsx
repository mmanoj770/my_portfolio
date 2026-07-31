import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import AmbientShapes from "@/components/AmbientShapes";
import { Reveal } from "@/components/Reveal";
import Timeline from "@/components/Timeline";
import { experience } from "@/data/experience";
import { socialLinks } from "@/data/social";

export const metadata: Metadata = {
  title: "About — Manoj M",
};

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden px-6 pb-28 pt-40 md:px-10 md:pt-48">
      <AmbientShapes />
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center md:gap-16">
          <div className="md:col-span-7">
            <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.25em] text-signal">
              About
            </Reveal>
            <Reveal
              as="h1"
              delay={0.1}
              className="mt-4 font-display text-5xl font-semibold leading-tight text-ink md:text-7xl"
            >
              Manoj M
            </Reveal>
            <Reveal delay={0.2} as="p" className="mt-6 text-xl leading-relaxed text-ink-muted">
              Artificial Intelligence &amp; Data Science student focused on engineering practical AI systems — from model training to shipped interfaces.
            </Reveal>
            <Reveal delay={0.25} className="mt-8 flex items-center gap-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-base-border px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-signal hover:text-signal"
              >
                View Resume <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <Reveal delay={0.25} className="w-full max-w-xs">
              <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-base-border bg-base-raised p-2 shadow-2xl transition-all duration-500 hover:border-signal/50">
                <div className="relative h-full w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/images/manoj.jpg"
                    alt="Manoj M"
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base/90 via-transparent to-transparent opacity-70" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-ink">
                    <span>Manoj M</span>
                    <span className="text-signal">AI Engineer</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 space-y-16">
          <Reveal>
            <h2 className="font-display text-2xl font-medium text-ink">Background &amp; Philosophy</h2>
            <p className="mt-4 text-ink-muted leading-relaxed max-w-3xl">
              I spend my time building models, understanding architectures from first principles, and wrapping machine learning into products that solve clear problems.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl font-medium text-ink">Experience</h2>
            <div className="mt-8">
              <Timeline items={experience} />
            </div>
          </Reveal>

          <div id="contact">
            <Reveal>
              <h2 className="font-display text-2xl font-medium text-ink">Get in Touch</h2>
              <p className="mt-4 text-ink-muted leading-relaxed">
                Open to internships, project collaborations and conversations about AI engineering.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.icon === "mail" ? undefined : "_blank"}
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-base-border px-5 py-2 text-sm text-ink-muted transition-colors hover:border-signal hover:text-signal"
                  >
                    {link.label} <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
