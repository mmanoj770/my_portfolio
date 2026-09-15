"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  filename?: string;
  code: string;
}

export default function CodeBlock({ filename, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-base-border bg-base-surface">
      {filename && (
        <div className="flex items-center justify-between border-b border-base-border px-4 py-2.5 font-mono text-xs text-ink-muted bg-base-raised/40">
          <span>{filename}</span>
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
      )}
      <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-ink/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}
