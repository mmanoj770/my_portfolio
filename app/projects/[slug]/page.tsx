import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Manoj M`,
    description: project.summary,
  };
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <article>
      <section className="relative overflow-hidden px-6 pb-20 pt-40 md:px-10 md:pb-28 md:pt-48">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 20% 0%, ${project.accent}33, transparent 55%)`,
          }}
        />
        <div className="relative mx-auto max-w-5xl">
          <Reveal>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-signal focus-ring"
            >
              <ArrowLeft size={16} /> All projects
            </Link>
          </Reveal>

          <Reveal delay={0.1} as="p" className="mt-8 font-mono text-sm text-signal">
            {project.index} — {project.category}
          </Reveal>

          <Reveal
            delay={0.15}
            as="h1"
            className="mt-4 text-balance font-display text-5xl font-semibold leading-[1.02] tracking-tightest text-ink md:text-7xl"
          >
            {project.title}
          </Reveal>

          <Reveal
            delay={0.25}
            as="p"
            className="mt-6 max-w-2xl text-balance text-lg text-ink-muted"
          >
            {project.summary}
          </Reveal>

          <Reveal delay={0.35} className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-base-border px-3 py-1 font-mono text-xs text-ink-muted"
                >
                  {s}
                </span>
              ))}
            </div>

            <a
              href={project.githubUrl || `https://github.com/mmanoj770/${project.slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-base-border/80 bg-base-surface px-5 py-2 text-sm font-medium text-ink transition-all duration-300 hover:border-signal hover:bg-signal/10 hover:text-signal focus-ring"
            >
              <Github size={16} />
              <span>Git Repository</span>
              <ExternalLink size={14} />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-base-border px-6 py-20 md:px-10">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-3">
          <div>
            <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
              Problem
            </Reveal>
            <Reveal delay={0.1} as="p" className="mt-4 text-ink-muted leading-relaxed">
              {project.problem}
            </Reveal>
          </div>
          <div>
            <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
              Approach
            </Reveal>
            <Reveal delay={0.1} as="p" className="mt-4 text-ink-muted leading-relaxed">
              {project.approach}
            </Reveal>
          </div>
          <div>
            <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
              Outcome
            </Reveal>
            <Reveal delay={0.1} as="p" className="mt-4 text-ink-muted leading-relaxed">
              {project.outcome}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-base-border px-6 py-16 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
              Next project
            </p>
            <Link
              href={`/projects/${next.slug}`}
              className="group mt-3 inline-flex items-center gap-3 font-display text-3xl font-medium text-ink transition-colors hover:text-signal md:text-4xl"
            >
              {next.title}
              <ArrowUpRight
                size={22}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>
          <MagneticButton href="/projects" variant="outline">
            Back to all work
          </MagneticButton>
        </div>
      </section>
    </article>
  );
}
