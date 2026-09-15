"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Cpu, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { IoTSession } from "@/data/iot";
import { StaggerReveal, StaggerItem } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import IoTPreviewModal from "./IoTPreviewModal";

export default function IoTSessionGrid({ sessions }: { sessions: IoTSession[] }) {
  const [preview, setPreview] = useState<IoTSession | null>(null);
  const router = useRouter();

  return (
    <>
      <StaggerReveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {sessions.map((session) => (
          <StaggerItem key={session.id}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => setPreview(session)}
              onDoubleClick={() => router.push(`/iot/session/${session.id}`)}
              className={cn(
                "group relative flex flex-col justify-between rounded-3xl border p-6 text-left transition-all duration-300 cursor-pointer focus-ring",
                session.status === "complete"
                  ? "border-base-border bg-base-surface/60 hover:border-signal/50 hover:bg-base-surface"
                  : "border-base-border/40 bg-base-surface/20 text-ink-faint hover:border-base-border/80"
              )}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-signal">
                    <Cpu size={14} /> Session {session.id.toString().padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px]",
                      session.status === "complete"
                        ? "bg-signal/10 text-signal border border-signal/30"
                        : "bg-base-raised text-ink-faint border border-base-border/50"
                    )}
                  >
                    {session.status === "complete" ? (
                      <>
                        <CheckCircle2 size={10} /> Published
                      </>
                    ) : (
                      <>
                        <Clock size={10} /> Soon
                      </>
                    )}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-ink group-hover:text-signal transition-colors">
                  {session.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-ink-muted line-clamp-2">
                  {session.summary}
                </p>
              </div>

              <div className="mt-6 border-t border-base-border/40 pt-4">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {session.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-base-raised/70 px-2 py-0.5 font-mono text-[10px] text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                  {session.tags.length > 3 && (
                    <span className="rounded bg-base-raised/70 px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">
                      +{session.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-medium text-ink-muted group-hover:text-ink">
                  <span>Click for preview</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 text-signal" />
                </div>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerReveal>

      <IoTPreviewModal session={preview} onClose={() => setPreview(null)} />
    </>
  );
}
