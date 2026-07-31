import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight } from "lucide-react";

export default function AboutPreview() {
  return (
    <section className="border-t border-base-border px-6 py-28 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
          About
        </Reveal>

        <div>
          <Reveal
            as="p"
            className="text-balance font-display text-2xl font-medium leading-snug text-ink md:text-4xl"
          >
            I work at the intersection of data, models and interfaces —
            training systems that predict, reason and act, then shipping them
            as products people can actually touch.
          </Reveal>

          <Reveal delay={0.15}>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-signal focus-ring"
            >
              More about me
              <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
