"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline" | "ghost";
  onClick?: () => void;
  type?: "button" | "submit";
  target?: string;
  rel?: string;
  download?: boolean | string;
};

export default function MagneticButton({
  href,
  children,
  className,
  variant = "solid",
  onClick,
  type = "button",
  target,
  rel,
  download,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  function handleMouseMove(e: React.MouseEvent) {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.35, y: y * 0.35 });
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  const styles = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-colors duration-300 focus-ring",
    variant === "solid" &&
      "bg-ink text-base hover:bg-signal hover:text-ink",
    variant === "outline" &&
      "border border-base-border text-ink hover:border-signal hover:text-signal",
    variant === "ghost" && "text-ink-muted hover:text-ink",
    className
  );

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.5 }}
      className={styles}
    >
      {children}
    </motion.div>
  );

  if (href) {
    const isExternalOrPdf =
      href.startsWith("http") || href.endsWith(".pdf") || target === "_blank";

    if (isExternalOrPdf) {
      return (
        <a
          href={href}
          target={target || "_blank"}
          rel={rel || "noreferrer"}
          download={download}
          onClick={onClick}
          className="inline-block"
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} onClick={onClick} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className="inline-block">
      {content}
    </button>
  );
}
