import { Reveal } from "@/components/Reveal";

type TimelineEntry = {
  id: string;
  role: string;
  org: string;
  period: string;
  description: string;
};

export default function Timeline({ items }: { items: TimelineEntry[] }) {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="absolute left-2 top-2 bottom-2 w-px bg-base-border md:left-1/2" />
      <ul className="space-y-14">
        {items.map((item, i) => (
          <li key={item.id} className="relative pl-10 md:pl-0">
            <Reveal>
              <div className="md:grid md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-8">
                <div className="hidden text-right font-mono text-sm text-ink-faint md:block">
                  {item.period}
                </div>
                <div className="absolute left-0 top-1 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-signal bg-base md:relative md:left-auto md:top-1.5 md:translate-x-0 md:mx-auto" />
                <div>
                  <p className="font-mono text-xs text-ink-faint md:hidden">
                    {item.period}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-medium text-ink">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-sm text-signal">{item.org}</p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
