import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { protosemWeeks, getWeek } from "@/data/protosem";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return protosemWeeks.map((w) => ({ id: w.id.toString() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const week = getWeek(Number(id));
  return { title: week ? `${week.title} — Protosem` : "Protosem" };
}

export default async function WeekDocPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const week = getWeek(Number(id));
  if (!week) notFound();

  return (
    <article className="px-6 pb-28 pt-40 md:px-10 md:pt-48">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Link
            href="/protosem"
            className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-signal focus-ring"
          >
            <ArrowLeft size={16} /> All weeks
          </Link>
        </Reveal>

        <Reveal delay={0.1} as="p" className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-signal">
          {week.status === "complete" ? "Published" : "Upcoming"}
        </Reveal>

        <Reveal
          delay={0.15}
          as="h1"
          className="mt-3 text-balance font-display text-4xl font-semibold tracking-tightest text-ink md:text-6xl"
        >
          {week.title}
        </Reveal>

        {week.status === "placeholder" ? (
          <Reveal delay={0.25} as="p" className="mt-8 text-ink-muted">
            {week.summary}
          </Reveal>
        ) : (
          <>
            <Reveal delay={0.25} as="p" className="mt-8 text-lg leading-relaxed text-ink-muted">
              {week.summary}
            </Reveal>

            <Reveal delay={0.3} className="mt-14">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                Reflection
              </p>
              <p className="mt-4 leading-relaxed text-ink-muted">
                {week.reflection}
              </p>
            </Reveal>

            <Reveal delay={0.35} className="mt-14">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                Learnings
              </p>
              <ul className="mt-4 space-y-2">
                {week.learnings.map((l) => (
                  <li key={l} className="flex items-start gap-3 text-ink-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                    {l}
                  </li>
                ))}
              </ul>
            </Reveal>

            {week.gallery.length > 0 && (
              <Reveal delay={0.4} className="mt-14">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                  Gallery
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {week.gallery.map((g) => (
                    <div
                      key={g}
                      className="aspect-video rounded-xl border border-base-border bg-base-surface"
                    />
                  ))}
                </div>
              </Reveal>
            )}

            {week.pdf && (
              <Reveal delay={0.45} className="mt-14">
                <a
                  href={week.pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-base-border px-5 py-2.5 text-sm text-ink transition-colors hover:border-signal hover:text-signal focus-ring"
                >
                  <FileText size={16} /> Download week PDF
                </a>
              </Reveal>
            )}
          </>
        )}
      </div>
    </article>
  );
}
