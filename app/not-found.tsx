import MagneticButton from "@/components/MagneticButton";
import { Reveal } from "@/components/Reveal";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.25em] text-signal">
        404
      </Reveal>
      <Reveal
        delay={0.1}
        as="h1"
        className="mt-4 font-display text-4xl font-semibold tracking-tightest text-ink md:text-6xl"
      >
        This page hasn&apos;t shipped yet.
      </Reveal>
      <Reveal delay={0.25} className="mt-8">
        <MagneticButton href="/" variant="solid">
          Back home
        </MagneticButton>
      </Reveal>
    </section>
  );
}
