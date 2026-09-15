import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AmbientShapes from "@/components/AmbientShapes";
import { Reveal } from "@/components/Reveal";
import IoTSessionGrid from "@/components/iot/IoTSessionGrid";
import { iotSessions } from "@/data/iot";

export const metadata: Metadata = {
  title: "IoT Session — Manoj M",
  description: "IoT engineering, microcontrollers, sensor integration, and cloud telemetry logs.",
};

export default function IoTPage() {
  return (
    <div className="relative overflow-hidden px-6 pb-28 pt-40 md:px-10 md:pt-48">
      <AmbientShapes />
      <div className="mx-auto max-w-6xl">
        <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.25em] text-signal">
          IoT Session
        </Reveal>
        <Reveal
          as="h1"
          delay={0.1}
          className="mt-4 font-display text-5xl font-semibold leading-tight text-ink md:text-7xl"
        >
          Hardware &amp; IoT Log.
        </Reveal>
        <Reveal delay={0.2} as="p" className="mt-4 max-w-2xl text-lg text-ink-muted">
          Hands-on logs detailing microcontroller architectures, sensor interfacing, MQTT messaging, cloud telemetry, and edge automation systems.
        </Reveal>

        <Reveal delay={0.25} className="mt-10">
          <Link
            href="/iot-session"
            className="group relative flex flex-col md:flex-row items-start md:items-center justify-between rounded-3xl border border-signal/50 bg-signal/10 p-8 transition-all duration-300 hover:border-signal hover:bg-signal/15"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal font-semibold">
                Featured Full Documentation
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl group-hover:text-signal transition-colors">
                IoT &amp; Connectivity — Smart Home Automation
              </h2>
              <p className="mt-2 text-sm text-ink-muted max-w-2xl leading-relaxed">
                Full 3-day hardware log covering HTTP REST control, MQTT pub/sub, Google Assistant voice commands, and the Forge Smart Home platform.
              </p>
            </div>
            <div className="mt-6 md:mt-0 flex items-center gap-2 rounded-full border border-signal/40 bg-signal/20 px-5 py-2.5 font-sans text-xs font-semibold text-ink group-hover:border-signal">
              <span>Read Full Report</span>
              <ArrowUpRight size={16} className="text-signal transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        </Reveal>

        <div className="mt-16">
          <IoTSessionGrid sessions={iotSessions} />
        </div>
      </div>
    </div>
  );
}
