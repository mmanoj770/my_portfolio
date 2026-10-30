import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, CheckCircle2, FolderGit2, ExternalLink, AlertTriangle, Info } from "lucide-react";
import MediaSlot from "@/components/iot/MediaSlot";
import CodeBlock from "@/components/iot/CodeBlock";
import { readProjectFile, readProjectExcerpt, repoBlobUrl, resolveMedia } from "@/lib/iot-repo";

// The standard 11-section skeleton every task page follows.
export const SKELETON = [
  { key: "overview", title: "Overview" },
  { key: "concepts", title: "Concepts" },
  { key: "design", title: "System Design" },
  { key: "hardware", title: "Hardware & Software" },
  { key: "wiring", title: "Wiring / Setup" },
  { key: "implementation", title: "Implementation" },
  { key: "configuration", title: "Configuration" },
  { key: "evidence", title: "Evidence" },
  { key: "challenges", title: "Challenges & Fixes" },
  { key: "reflection", title: "Reflection" },
  { key: "repository", title: "Repository Link" },
] as const;

export type SectionKey = (typeof SKELETON)[number]["key"];

export function sectionId(task: number, key: SectionKey) {
  return `task${task}-${key}`;
}

export function TaskHeader({
  task,
  title,
  meta,
  children,
}: {
  task: number;
  title: string;
  meta: string;
  children?: ReactNode;
}) {
  return (
    <header>
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-signal font-semibold mb-3">
        Task {String(task).padStart(2, "0")}
      </div>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-ink">{title}</h2>
      <p className="mt-2 text-xs font-mono text-ink-faint">{meta}</p>
      {children}
      <nav aria-label={`Task ${task} sections`} className="mt-6 flex flex-wrap gap-1.5">
        {SKELETON.map((s, i) => (
          <a
            key={s.key}
            href={`#${sectionId(task, s.key)}`}
            className="rounded-full border border-base-border bg-base-surface px-2.5 py-1 font-mono text-[11px] text-ink-faint transition-colors hover:border-signal hover:text-ink focus-ring"
          >
            {String(i + 1).padStart(2, "0")} {s.title}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function DocSection({
  task,
  section,
  children,
}: {
  task: number;
  section: SectionKey;
  children: ReactNode;
}) {
  const index = SKELETON.findIndex((s) => s.key === section);
  return (
    <section id={sectionId(task, section)} className="scroll-mt-28 mt-14">
      <h3 className="flex items-baseline gap-3 border-b border-base-border/60 pb-3 font-display text-xl md:text-2xl font-semibold text-ink">
        <span className="font-mono text-sm text-signal">{String(index + 1).padStart(2, "0")}</span>
        {SKELETON[index].title}
      </h3>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

export function Sub({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h4 id={id} className="scroll-mt-28 pt-2 font-display text-base md:text-lg font-semibold text-ink">
      {children}
    </h4>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-3 text-sm md:text-[15px] leading-relaxed text-ink-muted max-w-3xl [&_strong]:font-semibold [&_strong]:text-ink [&_em]:text-ink">
      {children}
    </div>
  );
}

export function C({ children }: { children: ReactNode }) {
  return (
    <code className="rounded border border-base-border bg-base-raised px-1.5 py-0.5 font-mono text-[0.8em] text-ink">
      {children}
    </code>
  );
}

export function DataTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-base-border bg-base-surface">
      <table className="w-full text-left text-xs md:text-sm">
        <thead className="border-b border-base-border bg-base-raised/70 font-mono text-[11px] uppercase text-ink-faint">
          <tr>
            {head.map((h) => (
              <th key={h} className="p-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-base-border/50 text-ink-muted">
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td key={c} className={`p-3 align-top ${c === 0 ? "font-medium text-ink" : ""}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="space-y-3 max-w-3xl">
      {items.map((step, i) => (
        <li key={i} className="flex gap-3.5 text-sm text-ink-muted leading-relaxed">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-base-border bg-base-surface font-mono text-xs text-ink">
            {i + 1}
          </span>
          <span className="pt-0.5">{step}</span>
        </li>
      ))}
    </ol>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5 max-w-3xl">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-ink-muted leading-relaxed">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "warn";
  title: string;
  children: ReactNode;
}) {
  const Icon = tone === "warn" ? AlertTriangle : Info;
  const color = tone === "warn" ? "border-amber-500/40 bg-amber-500/10 text-amber-400" : "border-signal/40 bg-signal/10 text-signal";
  return (
    <div className={`rounded-xl border p-4 max-w-3xl ${color}`}>
      <div className="flex items-center gap-2 font-display text-sm font-semibold">
        <Icon size={16} /> {title}
      </div>
      <div className="mt-1.5 text-sm leading-relaxed text-ink-muted">{children}</div>
    </div>
  );
}

export type FlowNode = { title: string; detail?: string };

// A left-to-right chain of boxes (stacks vertically on small screens).
// `edges[i]` labels the arrow between nodes[i] and nodes[i + 1].
export function Flow({
  nodes,
  edges = [],
  caption,
  vertical = false,
}: {
  nodes: FlowNode[];
  edges?: string[];
  caption?: string;
  vertical?: boolean;
}) {
  const row = vertical ? "flex-col" : "flex-col md:flex-row";
  return (
    <figure className="rounded-2xl border border-base-border bg-base-surface p-4 md:p-6">
      <div className={`flex ${row} items-stretch`}>
        {nodes.map((node, i) => (
          <div key={node.title} className={`flex ${row} items-stretch ${vertical ? "" : "md:flex-1"}`}>
            <div className="flex-1 rounded-xl border border-base-border bg-base-raised/60 p-3 text-center">
              <div className="font-display text-sm font-semibold text-ink">{node.title}</div>
              {node.detail && <div className="mt-1 text-[11px] leading-snug text-ink-faint">{node.detail}</div>}
            </div>
            {i < nodes.length - 1 && (
              <div className={`flex ${vertical ? "flex-row" : "flex-row md:flex-col"} items-center justify-center gap-1.5 px-2 py-1.5 text-signal`}>
                <ArrowDown size={16} className={vertical ? "" : "md:hidden"} />
                {!vertical && <ArrowRight size={16} className="hidden md:block" />}
                {edges[i] && (
                  <span className="font-mono text-[10px] leading-tight text-ink-faint md:max-w-[6.5rem] md:text-center">
                    {edges[i]}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {caption && <figcaption className="mt-4 text-center text-xs text-ink-faint">{caption}</figcaption>}
    </figure>
  );
}

export function Figure({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="rounded-2xl border border-base-border bg-base-surface p-3 md:p-5">
      <div className="overflow-x-auto">
        <div className="min-w-[640px]">{children}</div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-ink-faint">{caption}</figcaption>
    </figure>
  );
}

// Source file from iot-projects/, shown in full with a link to the same file on GitHub.
export function SourceFile({ path, title }: { path: string; title?: string }) {
  return <CodeBlock filename={title ?? path.split("/").pop()} code={readProjectFile(path)} href={repoBlobUrl(path)} />;
}

// A single function from a source file in iot-projects/.
export function SourceExcerpt({ path, fn, title }: { path: string; fn: string; title?: string }) {
  return (
    <CodeBlock
      filename={title ?? `${path.split("/").pop()} — ${fn}`}
      code={readProjectExcerpt(path, fn)}
      href={repoBlobUrl(path)}
    />
  );
}

type EvidenceItem = {
  src: string;
  label: string;
  type?: "image" | "video";
  aspectRatio?: "4/3" | "16/9" | "square" | "auto";
  fit?: "cover" | "contain";
};

const GRID_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
} as const;

// A titled grid of evidence. Items whose file is missing are skipped, and the whole
// group (heading included) is hidden until at least one of its files exists.
export function EvidenceGroup({
  title,
  items,
  columns = 2,
  narrow = false,
}: {
  title: string;
  items: EvidenceItem[];
  columns?: 1 | 2 | 3;
  narrow?: boolean;
}) {
  const present = items.filter((item) => resolveMedia(item.src));
  if (present.length === 0) return null;
  return (
    <div className="space-y-4">
      <Sub>{title}</Sub>
      <div className={`grid gap-4 ${GRID_COLUMNS[columns]} ${narrow ? "md:max-w-xl" : ""}`}>
        {present.map((item) => (
          <Evidence key={item.src} {...item} />
        ))}
      </div>
    </div>
  );
}

// Renders a photo / screenshot / video only if the file exists in public/.
export function Evidence({ src, label, type, aspectRatio, fit }: EvidenceItem) {
  const resolved = resolveMedia(src);
  if (!resolved) return null;
  const isVideo = type === "video" || resolved.endsWith(".mp4");
  return (
    <MediaSlot
      type={isVideo ? "video" : "image"}
      src={resolved}
      alt={label}
      label={label}
      aspectRatio={aspectRatio ?? (isVideo ? "16/9" : "4/3")}
      fit={fit}
    />
  );
}

export function RepoCard({
  url,
  folder,
  files,
}: {
  url: string;
  folder: string;
  files: { name: string; note: string }[];
}) {
  return (
    <div className="rounded-2xl border border-signal/40 bg-signal/5 p-5 md:p-6">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-wrap items-center justify-between gap-3 focus-ring rounded-lg"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-signal text-base-surface">
            <FolderGit2 size={18} />
          </div>
          <div>
            <div className="font-display text-sm font-semibold text-ink group-hover:text-signal transition-colors">
              github.com/mmanoj770/my_portfolio
            </div>
            <div className="font-mono text-xs text-ink-muted">/{folder}</div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-3 py-1.5 font-mono text-xs font-semibold uppercase text-signal">
          Open folder <ExternalLink size={12} />
        </span>
      </a>
      <ul className="mt-5 divide-y divide-base-border/50 border-t border-base-border/50 text-sm">
        {files.map((f) => (
          <li key={f.name} className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:justify-between sm:gap-6">
            <span className="font-mono text-xs text-ink">{f.name}</span>
            <span className="text-xs text-ink-faint sm:text-right">{f.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Index of the assessment checklist for a task, each item linking to where it is covered.
export function ChecklistIndex({ task, items }: { task: number; items: [string, SectionKey][] }) {
  return (
    <details className="group mt-6 rounded-2xl border border-base-border bg-base-surface p-5 max-w-3xl">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-display text-sm font-semibold text-ink">
        <span className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-signal" />
          Assessment checklist — {items.length} items, each linked to where it is covered
        </span>
        <span className="font-mono text-xs text-ink-faint group-open:hidden">Show</span>
        <span className="hidden font-mono text-xs text-ink-faint group-open:inline">Hide</span>
      </summary>
      <ol className="mt-4 grid gap-1.5 text-sm">
        {items.map(([label, section]) => (
          <li key={label}>
            <a
              href={`#${sectionId(task, section)}`}
              className="flex items-start gap-2.5 rounded-md px-1.5 py-1 text-ink-muted transition-colors hover:bg-base-raised hover:text-ink"
            >
              <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-400" />
              <span className="flex-1">{label}</span>
              <span className="shrink-0 font-mono text-[11px] text-ink-faint">
                {String(SKELETON.findIndex((s) => s.key === section) + 1).padStart(2, "0")}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
