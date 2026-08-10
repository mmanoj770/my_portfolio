import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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

            {week.hero && (
              <Reveal delay={0.28} className="mt-8 overflow-hidden rounded-2xl border border-base-border">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={week.hero}
                    alt={week.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </Reveal>
            )}

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
              <ul className="mt-4 space-y-3">
                {week.learnings.map((l) => (
                  <li key={l} className="flex items-start gap-3 text-ink-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                    <span className="leading-relaxed">{l}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {week.gallery.length > 0 && (
              <Reveal delay={0.4} className="mt-14">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                  Gallery
                </p>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {week.gallery.map((g, i) => (
                    <div
                      key={i}
                      className="group relative aspect-video overflow-hidden rounded-xl border border-base-border bg-base-surface"
                    >
                      <Image
                        src={g}
                        alt={`Orientation photo ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {week.detailedSummary && (
              <Reveal delay={0.42} className="mt-14 border-t border-base-border/40 pt-12">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                  Detailed Summary of the Week
                </p>
                {week.detailedSummary.title && (
                  <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                    {week.detailedSummary.title}
                  </h2>
                )}
                <div className="mt-8 space-y-10">
                  {week.detailedSummary.sections.map((sec, i) => (
                    <div key={i} className="space-y-4">
                      {sec.heading && (
                        <h3 className="font-display text-xl font-semibold tracking-tight text-ink pt-6 border-t border-base-border/30">
                          {sec.heading}
                        </h3>
                      )}
                      
                      {sec.content ? (
                        <div className="space-y-5">
                          {sec.content.map((block, j) => {
                            if (block.type === "paragraph") {
                              return (
                                <p key={j} className="text-base leading-relaxed text-ink-muted">
                                  {block.text}
                                </p>
                              );
                            }
                            if (block.type === "image") {
                              return (
                                <div key={j} className="my-6 overflow-hidden rounded-2xl border border-base-border bg-base-surface">
                                  <div className="relative aspect-[16/9] w-full">
                                    <Image
                                      src={block.src}
                                      alt={block.alt || week.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  {block.caption && (
                                    <p className="px-4 py-2.5 font-mono text-xs text-ink-faint border-t border-base-border/40 bg-base-raised/50">
                                      {block.caption}
                                    </p>
                                  )}
                                </div>
                              );
                            }
                            if (block.type === "image-grid") {
                              return (
                                <div key={j} className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                  {block.images.map((img, imgIdx) => (
                                    <div
                                      key={imgIdx}
                                      className="group overflow-hidden rounded-2xl border border-base-border bg-base-surface"
                                    >
                                      <div className="relative aspect-video w-full">
                                        <Image
                                          src={img.src}
                                          alt={img.alt || week.title}
                                          fill
                                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                      </div>
                                      {img.caption && (
                                        <p className="px-4 py-2.5 font-mono text-xs text-ink-faint border-t border-base-border/40 bg-base-raised/50">
                                          {img.caption}
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {sec.paragraphs?.map((p, j) => (
                            <p key={j} className="text-base leading-relaxed text-ink-muted">
                              {p}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal delay={0.45} className="mt-14">
              <a
                href={week.pdf || `/pdfs/protosem-week-${week.id}.pdf`}
                target="_blank"
                rel="noreferrer"
                download={`protosem-week-${week.id}.pdf`}
                className="inline-flex items-center gap-2.5 rounded-full border border-signal/50 bg-signal/10 px-6 py-3 text-sm font-medium text-ink transition-all duration-300 hover:border-signal hover:bg-signal/20 focus-ring"
              >
                <FileText size={18} className="text-signal" />
                <span>Download Week {week.id} PDF</span>
              </a>
            </Reveal>
          </>
        )}
      </div>
    </article>
  );
}
