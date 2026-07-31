"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";

export default function IslandPanel() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <LayoutGroup>
      <div className="flex flex-col items-center gap-4">
        {skillGroups.map((group) => {
          const isOpen = active === group.id;
          return (
            <motion.div
              key={group.id}
              layout
              onClick={() => setActive(isOpen ? null : group.id)}
              className={cn(
                "w-full max-w-2xl cursor-pointer overflow-hidden rounded-[2rem] border border-base-border bg-base-raised px-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
                isOpen ? "py-8" : "py-5"
              )}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <motion.div layout="position" className="flex items-center justify-between">
                <span className="font-display text-lg font-medium text-ink">
                  {group.label}
                </span>
                <span className="font-mono text-xs text-ink-faint">
                  {group.items.length.toString().padStart(2, "0")}
                </span>
              </motion.div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-6 flex flex-wrap gap-2"
                  >
                    {group.items.map((item, i) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                        className="rounded-full border border-signal/30 bg-signal/10 px-4 py-1.5 text-sm text-ink"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
