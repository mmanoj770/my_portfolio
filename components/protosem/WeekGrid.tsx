"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProtosemWeek } from "@/data/protosem";
import { StaggerReveal, StaggerItem } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import PreviewModal from "./PreviewModal";

export default function WeekGrid({ weeks }: { weeks: ProtosemWeek[] }) {
  const [preview, setPreview] = useState<ProtosemWeek | null>(null);
  const router = useRouter();

  return (
    <>
      <StaggerReveal className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {weeks.map((week) => (
          <StaggerItem key={week.id}>
            <motion.button
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => setPreview(week)}
              onDoubleClick={() => router.push(`/protosem/week/${week.id}`)}
              className={cn(
                "flex aspect-square w-full flex-col items-center justify-center rounded-2xl border text-center transition-colors duration-300 focus-ring",
                week.status === "complete"
                  ? "border-signal/40 bg-signal/10 text-ink hover:border-signal"
                  : "border-base-border bg-base-surface text-ink-faint hover:border-base-border/80"
              )}
            >
              <span className="font-mono text-2xl font-medium">
                {week.id.toString().padStart(2, "0")}
              </span>
              <span className="mt-1 text-[11px] uppercase tracking-wide">
                {week.status === "complete" ? "Published" : "Soon"}
              </span>
            </motion.button>
          </StaggerItem>
        ))}
      </StaggerReveal>

      <PreviewModal week={preview} onClose={() => setPreview(null)} />
    </>
  );
}
