"use client";

import { motion, useReducedMotion } from "framer-motion";

const shapes = [
  { size: 340, top: "8%", left: "6%", color: "#5B8DEF", duration: 22 },
  { size: 220, top: "55%", left: "80%", color: "#7C6FF0", duration: 26 },
  { size: 160, top: "78%", left: "18%", color: "#345A9E", duration: 30 },
];

export default function AmbientShapes() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20 blur-3xl"
          style={{
            width: s.size,
            height: s.size,
            top: s.top,
            left: s.left,
            background: s.color,
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -30, 0],
                  x: [0, 20, 0],
                }
          }
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
