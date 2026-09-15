"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ArrowUpRight, Download, Cpu, Tag } from "lucide-react";
import { IoTSession } from "@/data/iot";

export default function IoTPreviewModal({
  session,
  onClose,
}: {
  session: IoTSession | null;
  onClose: () => void;
}) {
  const pdfUrl = session?.pdf || `/pdfs/iot-session-${session?.id ?? 0}.pdf`;

  return (
    <AnimatePresence>
      {session && (
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

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
                {session.status === "complete" ? "Published Log" : "Upcoming Session"}
              </span>
              {session.date && (
                <span className="rounded-full bg-base-surface border border-base-border px-2.5 py-0.5 font-mono text-[10px] text-ink-faint">
                  {session.date}
                </span>
              )}
            </div>

            <h3 className="mt-3 font-display text-3xl font-medium text-ink">
              {session.title}
            </h3>

            {session.tags && session.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {session.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-ink-muted bg-base-surface px-2.5 py-1 rounded-md border border-base-border/50"
                  >
                    <Tag size={10} className="text-signal" /> {t}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              {session.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/iot/session/${session.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-base-border bg-base-surface px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-signal hover:text-signal focus-ring"
              >
                Open full session doc
                <ArrowUpRight size={16} />
              </Link>

              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                download={`iot-session-${session.id}.pdf`}
                className="inline-flex items-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-signal hover:bg-signal/20 focus-ring"
              >
                <Download size={16} className="text-signal" />
                Download PDF
              </a>
            </div>

            <p className="mt-4 font-mono text-xs text-ink-faint">
              Tip: double-click a card to jump straight to documentation.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
