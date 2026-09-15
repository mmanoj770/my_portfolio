import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, FileText, Cpu, Tag } from "lucide-react";
import { iotSessions, getIoTSession } from "@/data/iot";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return iotSessions.map((s) => ({ id: s.id.toString() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const session = getIoTSession(Number(id));
  return { title: session ? `${session.title} — IoT Session` : "IoT Session" };
}

export default async function IoTSessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = getIoTSession(Number(id));
  if (!session) notFound();

  return (
    <article className="px-6 pb-28 pt-40 md:px-10 md:pt-48">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Link
            href="/iot"
            className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-signal focus-ring"
          >
            <ArrowLeft size={16} /> All IoT Sessions
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
            {session.status === "complete" ? "Published Session" : "Upcoming Session"}
          </span>
          {session.date && (
            <span className="rounded-full bg-base-surface border border-base-border px-3 py-0.5 font-mono text-xs text-ink-muted">
              {session.date}
            </span>
          )}
        </Reveal>

        <Reveal
          delay={0.15}
          as="h1"
          className="mt-3 text-balance font-display text-4xl font-semibold tracking-tightest text-ink md:text-6xl"
        >
          {session.title}
        </Reveal>

        {session.tags && session.tags.length > 0 && (
          <Reveal delay={0.2} className="mt-4 flex flex-wrap gap-2">
            {session.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 font-mono text-xs text-ink-muted bg-base-surface px-3 py-1 rounded-md border border-base-border/50"
              >
                <Tag size={12} className="text-signal" /> {t}
              </span>
            ))}
          </Reveal>
        )}

        {session.status === "placeholder" ? (
          <Reveal delay={0.25} as="p" className="mt-8 text-ink-muted">
            {session.summary}
          </Reveal>
        ) : (
          <>
            <Reveal delay={0.25} as="p" className="mt-8 text-lg leading-relaxed text-ink-muted">
              {session.summary}
            </Reveal>

            {session.reflection && (
              <Reveal delay={0.3} className="mt-14">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                  Session Reflection
                </p>
                <p className="mt-4 leading-relaxed text-ink-muted">
                  {session.reflection}
                </p>
              </Reveal>
            )}

            {session.learnings && session.learnings.length > 0 && (
              <Reveal delay={0.35} className="mt-14">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                  Key Learnings &amp; Takeaways
                </p>
                <ul className="mt-4 space-y-3">
                  {session.learnings.map((l) => (
                    <li key={l} className="flex items-start gap-3 text-ink-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                      <span className="leading-relaxed">{l}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {session.detailedSummary && (
              <Reveal delay={0.4} className="mt-14 border-t border-base-border/40 pt-12">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                  Detailed Documentation
                </p>
                {session.detailedSummary.title && (
                  <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                    {session.detailedSummary.title}
                  </h2>
                )}
                <div className="mt-8 space-y-10">
                  {session.detailedSummary.sections.map((sec, i) => (
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
                href={session.pdf || `/pdfs/iot-session-${session.id}.pdf`}
                target="_blank"
                rel="noreferrer"
                download={`iot-session-${session.id}.pdf`}
                className="inline-flex items-center gap-2.5 rounded-full border border-signal/50 bg-signal/10 px-6 py-3 text-sm font-medium text-ink transition-all duration-300 hover:border-signal hover:bg-signal/20 focus-ring"
              >
                <FileText size={18} className="text-signal" />
                <span>Download IoT Session {session.id} Documentation</span>
              </a>
            </Reveal>
          </>
        )}
      </div>
    </article>
  );
}
