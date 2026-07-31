import { Reveal } from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";

export default function ContactCTA() {
  return (
    <section className="border-t border-base-border/50 bg-[#0B0B0B] px-6 py-28 text-center md:px-10">
      <div className="mx-auto max-w-3xl">
        <Reveal
          as="h2"
          className="text-balance font-display text-4xl font-semibold tracking-tightest text-ink md:text-6xl"
        >
          Let&apos;s build something worth shipping.
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-5 text-ink-muted">
            Open to internships, collaborations, and applied AI roles.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex justify-center">
          <MagneticButton href="/about#contact" variant="solid">
            Get in touch
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
