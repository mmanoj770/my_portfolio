"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";

const line = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045 },
  },
};

const char = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function AnimatedWord({ word }: { word: string }) {
  return (
    <motion.span variants={line} className="inline-block whitespace-nowrap">
      {word.split("").map((c, i) => (
        <motion.span key={i} variants={char} className="inline-block">
          {c}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative flex h-[100svh] w-full items-end overflow-hidden bg-base">
      {/* Fullscreen hero video */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://louis-ansa.cdn.prismic.io/louis-ansa/Z1rNS5bqstJ98ZHm_video-cover-06.mp4.mp4" type="video/mp4" />
      </video>

      {/* Cinematic gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-base/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-base/60 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 md:px-10 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-signal"
        >
          AI Engineer · Building end to end
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={line}
          className="font-display text-[13vw] font-semibold leading-[0.92] tracking-tightest text-ink md:text-[7.5rem]"
        >
          <AnimatedWord word="Manoj" /> <AnimatedWord word="M" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-balance text-lg text-ink-muted md:text-xl"
        >
          Artificial Intelligence &amp; Data Science student, engineering
          models and products that go from a notebook to something people
          actually use.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="/resume.pdf" target="_blank" variant="solid">
            Resume
          </MagneticButton>
          <MagneticButton href="/about#contact" variant="outline">
            Contact
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 right-6 z-10 hidden font-mono text-xs text-ink-faint md:right-10 md:block"
      >
        Scroll to explore
      </motion.div>
    </section>
  );
}
