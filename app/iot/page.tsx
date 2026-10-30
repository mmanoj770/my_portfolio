import type { Metadata } from "next";
import Link from "next/link";
import AmbientShapes from "@/components/AmbientShapes";
import { Reveal } from "@/components/Reveal";
import MediaSlot from "@/components/iot/MediaSlot";
import { SKELETON } from "@/components/iot/doc";
import Task1 from "@/components/iot/tasks/Task1";
import Task2 from "@/components/iot/tasks/Task2";
import Task3 from "@/components/iot/tasks/Task3";
import Task4 from "@/components/iot/tasks/Task4";
import Task5 from "@/components/iot/tasks/Task5";
import Insights from "@/components/iot/Insights";
import { IOT_TASKS } from "@/data/iot-tasks";
import { lineCount, repoTreeUrl } from "@/lib/iot-repo";
import { Sparkles, ExternalLink, FolderGit2 } from "lucide-react";

export const metadata: Metadata = {
  title: "IoT & Connectivity — Smart Home Automation — Manoj M",
  description:
    "Full documentation of the IoT & Connectivity session: ESP32 web server, Adafruit IO MQTT, IFTTT automation, and a Firebase monitoring dashboard with logging, automation and CSV export.",
};

const CODE_FILES = [
  "task1-esp32-web-server/task1_led_web_server/task1_led_web_server.ino",
  "task2-adafruit-io-mqtt/task2_mqtt_relay/task2_mqtt_relay.ino",
  "task4-firebase-dashboard/firmware/smarthome_esp32/smarthome_esp32.ino",
  "task4-firebase-dashboard/web/index.html",
  "task4-firebase-dashboard/web/dashboard.html",
];

export default function IoTPage() {
  const totalLines = CODE_FILES.reduce((sum, f) => sum + lineCount(f), 0);

  return (
    <div className="relative overflow-hidden px-6 pb-28 pt-36 md:px-10 md:pt-44">
      <AmbientShapes />
      <div className="mx-auto max-w-5xl">
        {/* HERO SECTION */}
        <header className="mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-3.5 py-1 font-mono text-xs uppercase tracking-[0.18em] text-signal mb-6">
              <Sparkles size={13} /> Published Session Log
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl md:text-6xl max-w-4xl leading-[1.08]">
              IoT &amp; Connectivity — Smart Home Automation
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-3xl text-lg md:text-xl leading-relaxed text-ink-muted">
              One bulb, five ways to control it — a local ESP32 web server, a cloud MQTT dashboard on Adafruit IO, voice automation
              through IFTTT, and a <span className="text-ink font-semibold">Firebase</span> smart home with live monitoring, automatic
              lighting, history logging and CSV export.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {IOT_TASKS.map((t) => (
                <a
                  key={t.n}
                  href={`#task${t.n}`}
                  className="rounded-full border border-base-border bg-base-surface px-4 py-2 text-xs font-medium text-ink-muted transition-colors hover:border-signal hover:text-ink focus-ring"
                >
                  Task {t.n} · {t.short}
                </a>
              ))}
              <a
                href="#insights"
                className="rounded-full border border-signal/40 bg-signal/10 px-4 py-2 text-xs font-medium text-signal transition-colors hover:border-signal focus-ring"
              >
                Real use &amp; limits
              </a>
            </div>
          </Reveal>

          {/* GOOGLE DRIVE HIGHLIGHT BANNER */}
          <Reveal delay={0.22} className="mt-6">
            <a
              href="https://drive.google.com/drive/folders/1ehc8M4c2labZ-5MKvNeTX5fQEdpvEkve?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-signal/40 bg-signal/10 p-4 transition-all hover:border-signal hover:bg-signal/15 hover:shadow-lg focus-ring max-w-3xl"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-signal text-base-surface font-bold">
                  <ExternalLink size={18} />
                </div>
                <div>
                  <div className="font-display text-sm font-semibold text-ink group-hover:text-signal transition-colors">
                    Official IoT Session Google Drive Folder
                  </div>
                  <p className="text-xs text-ink-muted mt-0.5">
                    View &amp; download original full HD demo recordings of all IoT tasks &amp; lab tests
                  </p>
                </div>
              </div>
              <span className="shrink-0 font-mono text-xs font-semibold uppercase text-signal border border-signal/30 bg-signal/10 px-3 py-1.5 rounded-full hidden sm:inline-block">
                Open Drive ↗
              </span>
            </a>
          </Reveal>

          {/* Hero Cover Photo Slot */}
          <Reveal delay={0.25} className="mt-10">
            <MediaSlot
              type="image"
              src="/media/iot/hero.jpg"
              alt="ESP32 and breadboard on the lab bench"
              label="ESP32 DevKit and breadboard on the lab bench"
              aspectRatio="16/9"
              className="w-full shadow-2xl"
            />
          </Reveal>
        </header>

        {/* STAT ROW */}
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-base-border rounded-2xl border border-base-border overflow-hidden mb-16">
            <div className="bg-base-surface p-6">
              <div className="font-display text-3xl font-bold text-ink">5 Tasks</div>
              <div className="mt-1 text-xs text-ink-faint">Local → cloud → voice → database</div>
            </div>
            <div className="bg-base-surface p-6">
              <div className="font-display text-3xl font-bold text-ink">{totalLines.toLocaleString("en-US")}</div>
              <div className="mt-1 text-xs text-ink-faint">Lines of firmware + web code</div>
            </div>
            <div className="bg-base-surface p-6">
              <div className="font-display text-3xl font-bold text-ink">3</div>
              <div className="mt-1 text-xs text-ink-faint">Cloud services: Adafruit IO, IFTTT, Firebase</div>
            </div>
            <div className="bg-base-surface p-6">
              <div className="font-display text-3xl font-bold text-ink">5 / 5</div>
              <div className="mt-1 text-xs text-ink-faint">Tasks complete</div>
            </div>
          </div>
        </Reveal>

        {/* OVERVIEW LIST */}
        <Reveal className="mb-12">
          <div className="divide-y divide-base-border/60 border-y border-base-border/60">
            {IOT_TASKS.map((t) => (
              <a key={t.n} href={`#task${t.n}`} className="group flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-2">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-ink-faint">{String(t.n).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink group-hover:text-signal transition-colors">{t.title}</h3>
                    <p className="text-xs text-ink-faint mt-0.5">{t.stack}</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-signal bg-signal/10 px-3 py-1 rounded-full border border-signal/30 w-fit">
                  {t.day}
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        {/* HOW EACH TASK IS DOCUMENTED */}
        <Reveal className="mb-20">
          <div className="rounded-2xl border border-base-border bg-base-surface p-6 md:p-8">
            <h2 className="font-display text-xl font-semibold text-ink">How each task is documented</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
              Every task follows the same 11-section structure, and opens with its assessment checklist — each item links to the
              section that covers it. Each task also has its own page and its own code folder in the repository.
            </p>
            <ol className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 md:grid-cols-4">
              {SKELETON.map((s, i) => (
                <li key={s.key} className="flex items-baseline gap-2 text-sm text-ink-muted">
                  <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {IOT_TASKS.map((t) => (
                <Link
                  key={t.n}
                  href={`/iot/tasks/${t.n}`}
                  className="rounded-full border border-base-border bg-base-raised px-3.5 py-1.5 text-xs text-ink-muted transition-colors hover:border-signal hover:text-ink focus-ring"
                >
                  Task {t.n} page →
                </Link>
              ))}
              <a
                href={repoTreeUrl("")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-3.5 py-1.5 text-xs font-medium text-signal transition-colors hover:border-signal focus-ring"
              >
                <FolderGit2 size={13} /> All code: iot-projects/ ↗
              </a>
            </div>
          </div>
        </Reveal>

        <Task1 />
        <Task2 />
        <Task3 />
        <Task4 />
        <Task5 />
        <Insights />

        {/* ==================== BEHIND THE SCENES / JOURNEY ==================== */}
        <section id="journey" className="scroll-mt-28 border-t border-base-border pt-16 mb-24">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-signal font-semibold mb-3">Behind The Scenes</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink">My Build Journey</h2>
          <p className="mt-2 text-sm text-ink-muted">Lab photos, screenshots along the way, and testing clips.</p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <MediaSlot src="/media/iot/journey/photo-1.jpg" alt="ESP32 and breadboard" label="ESP32 + breadboard on the bench" aspectRatio="square" />
            <MediaSlot src="/media/iot/journey/photo-2.jpg" alt="Arduino IDE and Serial Monitor" label="Uploading with the Serial Monitor open" aspectRatio="square" />
            <MediaSlot src="/media/iot/journey/photo-3.jpg" alt="Task 1 web UI off" label="Task 1 web UI — LED OFF" aspectRatio="square" />
            <MediaSlot src="/media/iot/journey/photo-4.jpg" alt="Task 1 web UI on" label="Task 1 web UI — LED ON" aspectRatio="square" />
            <MediaSlot src="/media/iot/journey/photo-5.jpg" alt="Dashboard waiting for data" label="Firebase dashboard before the path fix" aspectRatio="square" />
            <MediaSlot src="/media/iot/journey/photo-6.jpg" alt="SmartHome login page" label="SmartHome login page" aspectRatio="square" />
            <MediaSlot src="/media/iot/journey/photo-7.jpg" alt="Firebase console" label="Firebase console — iotproject" aspectRatio="square" />
            <MediaSlot src="/media/iot/task5/lab-bulb-on-frame.jpg" alt="Lab test with bulb on" label="Lab test — bulb switched from the dashboard" aspectRatio="square" />
          </div>

          <div className="mt-8">
            <h3 className="font-display text-xl font-semibold text-ink mb-4">Lab Assembly &amp; Testing Videos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MediaSlot type="video" src="/media/iot/journey/video-lab.mp4" alt="Lab testing video" label="Lab test — team switching the bulb from the dashboard" aspectRatio="16/9" />
              <MediaSlot type="video" src="/media/iot/task4-hw/demo.mp4" alt="Bench test video" label="Bench test — ESP32 with Serial Monitor output" aspectRatio="16/9" />
            </div>
          </div>
        </section>

        {/* ==================== SYSTEM COMPARISON & USE CASES ==================== */}
        <section className="border-t border-base-border pt-16 mb-20">
          <h3 className="font-display text-2xl font-bold text-ink mb-6">System Comparison</h3>
          <div className="overflow-x-auto rounded-xl border border-base-border bg-base-surface">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-base-border bg-base-raised/60 text-xs font-mono uppercase text-ink-faint">
                <tr>
                  <th className="p-4">Aspect</th>
                  <th className="p-4">Task 1</th>
                  <th className="p-4">Task 2</th>
                  <th className="p-4">Task 3</th>
                  <th className="p-4">Task 4</th>
                  <th className="p-4">Task 5</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-border/50 text-ink-muted">
                {[
                  ["Range", "Same Wi-Fi", "Internet", "Internet", "Internet", "Internet"],
                  ["Control", "Browser buttons", "Dashboard toggle", "Voice", "Login + dashboard", "Dashboard + LDR automatic"],
                  ["Protocol", "HTTP", "MQTT", "HTTPS webhook → MQTT", "Firebase RTDB", "Firebase RTDB"],
                  ["Latency", "< 150 ms", "< 1 s", "2–3 s", "~1–2 s", "~1–2 s"],
                  ["Data kept", "None", "Feed history", "Feed history", "Last 20 readings shown", "Timestamped log + CSV"],
                  ["Security", "Open on the LAN", "AIO key", "AIO key in IFTTT", "Firebase Auth + rules", "Firebase Auth + rules"],
                ].map(([aspect, ...cells]) => (
                  <tr key={aspect}>
                    <td className="p-4 font-semibold text-ink">{aspect}</td>
                    {cells.map((c, i) => (
                      <td key={i} className="p-4">
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-display text-2xl font-bold text-ink mt-14 mb-6">Real-World Use Cases</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-base-border bg-base-surface p-6">
              <h4 className="font-display text-base font-semibold text-ink mb-2">Smart Lighting Automation</h4>
              <p className="text-sm text-ink-muted leading-relaxed">
                Automatically turns lights on in dark rooms and off when bright, reducing energy waste and maintaining optimal illumination.
              </p>
            </div>
            <div className="rounded-xl border border-base-border bg-base-surface p-6">
              <h4 className="font-display text-base font-semibold text-ink mb-2">Environmental Monitoring</h4>
              <p className="text-sm text-ink-muted leading-relaxed">
                Tracks temperature and humidity in server rooms, greenhouses, or museums — with continuous historical trend data.
              </p>
            </div>
            <div className="rounded-xl border border-base-border bg-base-surface p-6">
              <h4 className="font-display text-base font-semibold text-ink mb-2">Remote Building Management</h4>
              <p className="text-sm text-ink-muted leading-relaxed">
                Centralised control of multiple IoT nodes and relays across buildings from a single real-time dashboard.
              </p>
            </div>
            <div className="rounded-xl border border-base-border bg-base-surface p-6">
              <h4 className="font-display text-base font-semibold text-ink mb-2">Energy Efficiency Auditing</h4>
              <p className="text-sm text-ink-muted leading-relaxed">
                CSV export supports detailed analysis of operational consumption patterns and system optimization opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER NAVIGATION */}
        <div className="flex justify-between items-center border-t border-base-border pt-8">
          <a href="#" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-signal transition-colors">
            Back to Top ↑
          </a>
        </div>
      </div>
    </div>
  );
}
