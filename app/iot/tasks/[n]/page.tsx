import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AmbientShapes from "@/components/AmbientShapes";
import Task1 from "@/components/iot/tasks/Task1";
import Task2 from "@/components/iot/tasks/Task2";
import Task3 from "@/components/iot/tasks/Task3";
import Task4 from "@/components/iot/tasks/Task4";
import Task5 from "@/components/iot/tasks/Task5";
import { IOT_TASKS } from "@/data/iot-tasks";

const TASK_COMPONENTS = { 1: Task1, 2: Task2, 3: Task3, 4: Task4, 5: Task5 } as const;

type Params = { params: Promise<{ n: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return IOT_TASKS.map((t) => ({ n: String(t.n) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { n } = await params;
  const task = IOT_TASKS.find((t) => String(t.n) === n);
  return { title: task ? `Task ${task.n} — ${task.title} — IoT Session — Manoj M` : "IoT Session" };
}

export default async function IoTTaskPage({ params }: Params) {
  const { n } = await params;
  const index = IOT_TASKS.findIndex((t) => String(t.n) === n);
  if (index === -1) notFound();

  const task = IOT_TASKS[index];
  const prev = IOT_TASKS[index - 1];
  const next = IOT_TASKS[index + 1];
  const TaskContent = TASK_COMPONENTS[task.n];

  return (
    <div className="relative overflow-hidden px-6 pb-28 pt-36 md:px-10 md:pt-44">
      <AmbientShapes />
      <div className="mx-auto max-w-5xl">
        <Link
          href="/iot"
          className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-signal focus-ring"
        >
          <ArrowLeft size={16} /> IoT &amp; Connectivity — all tasks
        </Link>

        <div className="mt-8">
          <TaskContent />
        </div>

        <nav className="flex items-center justify-between gap-4 border-t border-base-border pt-8 text-sm">
          {prev ? (
            <Link href={`/iot/tasks/${prev.n}`} className="inline-flex items-center gap-2 text-ink-muted hover:text-signal transition-colors">
              <ArrowLeft size={16} /> Task {prev.n} · {prev.short}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/iot/tasks/${next.n}`} className="inline-flex items-center gap-2 text-ink-muted hover:text-signal transition-colors">
              Task {next.n} · {next.short} <ArrowRight size={16} />
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
