import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/Reveal";

export default function FeaturedProjects() {
  return (
    <section className="border-t border-base-border/50 bg-[#0B0B0B] px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between">
          <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
            Selected Work
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/projects"
              className="hidden items-center gap-2 text-sm text-ink-muted transition-colors hover:text-signal focus-ring md:inline-flex"
            >
              View all projects <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>

        <StaggerReveal className="mt-10 divide-y divide-base-border border-y border-base-border">
          {projects.map((p) => (
            <StaggerItem key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                className="group flex items-center justify-between gap-6 py-7 focus-ring"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-sm text-ink-faint">
                    {p.index}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-medium text-ink transition-colors group-hover:text-signal md:text-2xl">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink-muted">
                      {p.category}
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  size={20}
                  className="shrink-0 text-ink-faint transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal"
                />
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <Reveal delay={0.2} className="mt-6 md:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-signal"
          >
            View all projects <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
