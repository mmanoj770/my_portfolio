"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ArrowUpRight } from "lucide-react";
import { ProtosemWeek } from "@/data/protosem";

export default function PreviewModal({
  week,
  onClose,
}: {
  week: ProtosemWeek | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {week && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-base/80 p-6 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl rounded-3xl border border-base-border bg-base-raised p-8"
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 text-ink-faint transition-colors hover:text-ink focus-ring"
              aria-label="Close preview"
            >
              <X size={20} />
            </button>

            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
              {week.status === "complete" ? "Published" : "Upcoming"}
            </p>
            <h3 className="mt-3 font-display text-3xl font-medium text-ink">
              {week.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              {week.summary}
            </p>

            <Link
              href={`/protosem/week/${week.id}`}
              className="mt-8 inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-signal focus-ring"
            >
              Open full documentation
              <ArrowUpRight size={16} />
            </Link>
            <p className="mt-3 font-mono text-xs text-ink-faint">
              Tip: double-click a week to jump straight to documentation.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
