"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

interface CodeBlockProps {
  filename?: string;
  code: string;
  href?: string;
}

const COLLAPSE_AFTER_LINES = 45;

export default function CodeBlock({ filename, code, href }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const lines = code.split("\n").length;
  const collapsible = lines > COLLAPSE_AFTER_LINES;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-base-border bg-base-surface">
      {filename && (
        <div className="flex items-center justify-between gap-3 border-b border-base-border px-4 py-2.5 font-mono text-xs text-ink-muted bg-base-raised/40">
          <span className="truncate">
            {filename}
            <span className="ml-2 text-ink-faint">· {lines} lines</span>
          </span>
          <div className="flex shrink-0 items-center gap-2">
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-md border border-base-border bg-base-surface px-2.5 py-1 font-sans text-xs text-ink-muted transition-colors hover:border-signal hover:text-ink focus-ring"
              >
                <ExternalLink size={12} />
                <span>GitHub</span>
              </a>
            )}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-md border border-base-border bg-base-surface px-2.5 py-1 font-sans text-xs text-ink-muted transition-colors hover:border-signal hover:text-ink focus-ring"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
      <pre
        className={`overflow-x-auto p-5 font-mono text-xs leading-relaxed text-ink/90 ${
          collapsible && !expanded ? "max-h-[30rem] overflow-y-auto" : ""
        }`}
      >
        <code>{code}</code>
      </pre>
      {collapsible && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full items-center justify-center gap-1.5 border-t border-base-border bg-base-raised/40 py-2 text-xs text-ink-muted transition-colors hover:text-ink focus-ring"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? "Collapse" : `Expand all ${lines} lines`}
        </button>
      )}
    </div>
  );
}
