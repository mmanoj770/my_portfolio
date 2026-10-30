import { Sub, Prose, C, DataTable, Bullets, Callout } from "@/components/iot/doc";

// Cross-task engineering notes: how the five builds would behave outside the lab.
// Figures come from my own firmware (intervals, pins) or from the linked datasheet / docs.
export default function Insights() {
  return (
    <section id="insights" className="scroll-mt-28 border-t border-base-border pt-16 mb-24">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-signal font-semibold mb-3">Across all five tasks</div>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-ink">From Lab Prototype to Real Use</h2>
      <p className="mt-3 max-w-3xl text-sm md:text-[15px] leading-relaxed text-ink-muted">
        What the builds actually achieved, where the hardware and cloud limits are, how each version fails, and what I would change before
        leaving it running in a real room.
      </p>

      <div className="mt-10 space-y-5">
        <Sub>Real use cases and what each would need</Sub>
        <DataTable
          head={["Use case", "Pattern I built", "What would change in a real deployment"]}
          rows={[
            [
              "Classroom / office lighting that follows daylight",
              "Task 5 — LDR threshold switches the relay",
              "Add hysteresis so the light doesn't flicker at dusk, a motion sensor so empty rooms stay dark, and a certified relay or smart switch in an enclosure.",
            ],
            [
              "Server room, greenhouse or storage monitoring",
              "Tasks 4–5 — DHT11 logged to Firebase, chart and CSV",
              "Swap the DHT11 for a more accurate sensor, add threshold alerts, and keep older readings instead of showing only the last 20.",
            ],
            [
              "Remote switching of an appliance (pump, fan, lamp)",
              "Tasks 2–3 — dashboard toggle and voice command",
              "Confirm the real state back to the user, decide the safe state after a power cut, and rate-limit commands.",
            ],
            [
              "Energy-use auditing",
              "Task 5 — bulb state and timestamp logged every 3 s",
              "Total ON-time per day from the CSV × the bulb's wattage gives an energy estimate; a current sensor would measure it for real.",
            ],
          ]}
        />

        <Sub>Hardware outcomes and limits</Sub>
        <DataTable
          head={["Part", "What it does / limit", "Effect on my design"]}
          rows={[
            [
              "DHT11",
              "0–50 °C ±2 °C, 20–90 % RH ±5 %, 1 °C / 1 % resolution; needs about 2 s between reads",
              "Logged every 3 s, and a failed read (NaN) is skipped. Good for trends and room comfort, not for precise measurement.",
            ],
            [
              "ESP32 ADC (LDR)",
              "12-bit: 0–4095, not perfectly linear near the ends; GPIO34 is input-only",
              "Fine for a bright / dark decision. My first firmware scaled it to 0–1023 like an Arduino Uno; I changed to the raw value everywhere.",
            ],
            [
              "ESP32 GPIO",
              "Weak outputs — they can only drive a small signal, not a relay coil",
              "GPIO 26 drives the relay module's input only; the coil is powered from the 5 V pin through the module.",
            ],
            [
              "5 V relay module",
              "Typical modules are rated about 10 A at 250 V AC; active-HIGH or active-LOW depends on the module",
              "My Task 2 module is active-HIGH, the Task 4–5 module is active-LOW — I check which one before every wiring change.",
            ],
            [
              "Wi-Fi",
              "2.4 GHz only; the ESP32 cannot join 5 GHz-only networks",
              "A 2.4 GHz hotspot is a hard requirement of the whole setup.",
            ],
            [
              "Latency (from the comparison table)",
              "Local HTTP under 150 ms; MQTT under 1 s; voice 2–3 s; Firebase about 1–2 s",
              "Fast enough for lighting; far too slow for anything safety-critical.",
            ],
          ]}
        />

        <Sub>Data volume and the free-tier limits</Sub>
        <Prose>
          <p>
            One reading every 3 seconds is 28,800 rows a day. Each row is a small JSON object (about 100 bytes by my estimate), so
            roughly 3 MB a day. Firebase&apos;s free Spark plan allows 1 GB stored, 10 GB of downloads a month and 100 simultaneous
            connections, so storage would last close to a year before it filled, and one device plus a few dashboard viewers is far below
            the connection limit.
          </p>
          <p>
            The bigger risk is the ESP32 <em>reading</em> from Firebase: my firmware polls three values every second. That is a quarter of
            a million small reads a day, which I estimate adds up to a few GB a month. Switching to a stream listener, so Firebase pushes
            changes instead of the device asking, is the first fix I would make.
          </p>
        </Prose>

        <Sub>How each version fails</Sub>
        <DataTable
          head={["Event", "What happens in my build"]}
          rows={[
            ["Wi-Fi drops (Tasks 4–5)", "The loop stops until Firebase is ready again. The relay keeps its last state; readings during the gap are lost because nothing is buffered."],
            ["Wi-Fi drops (Task 2)", "The Adafruit IO library reconnects on its own; the bulb keeps its state until a new message arrives."],
            ["Power cut", "The relay starts OFF (the firmware sets the pin first thing), then the ESP32 reads the dashboard state and restores it."],
            ["Cloud unreachable or login fails", "Dashboard shows “Disconnected”; the ESP32 prints the sign-in error and does nothing, so the bulb stays as it was."],
            ["DHT11 read fails", "That log row is skipped instead of saving a NaN."],
            ["Voice chain breaks (Task 3)", "Nothing reaches the feed, so the bulb is unchanged — it fails safe, but silently."],
            ["Two controllers disagree (dashboard vs voice)", "Both write to the same feed or node; the last write wins."],
          ]}
        />

        <Sub>What separates this prototype from a product</Sub>
        <Bullets
          items={[
            <><strong>Security:</strong> per-user rules instead of <C>auth != null</C>, no open sign-up, and credentials kept out of the firmware.</>,
            <><strong>Mains safety:</strong> a certified relay or smart switch in an insulated enclosure, with a fuse. Nothing live is exposed on a breadboard.</>,
            <><strong>Reliability:</strong> reconnect handling, a watchdog reset, an offline buffer, and a real clock.</>,
            <><strong>Maintenance:</strong> over-the-air updates and a Wi-Fi setup page instead of re-flashing for a new network.</>,
            <><strong>Measurement:</strong> a calibrated sensor and a threshold chosen from a day of readings, not one afternoon.</>,
          ]}
        />

        <Sub>Lessons that carried across tasks</Sub>
        <Bullets
          items={[
            "Don't assume the ESP32 behaves like an Arduino Uno: the ADC is 12-bit, the pins are 3.3 V, and some pins are input-only.",
            "Averaging in software is a cheap way to calm a noisy sensor, and the window size is easy to tune.",
            "Prove the logic with a low-voltage LED before connecting the relay to mains.",
            "Write down the contract between firmware, cloud and web page — paths and exact strings — before coding.",
            "When a chain of services fails, test one link at a time and use the cloud history as a checkpoint.",
            "Authentication says who you are; authorization says what you may do. A login screen alone doesn't protect the hardware.",
          ]}
        />

        <Callout title="Sources for the figures above">
          DHT11 limits from a{" "}
          <a className="text-signal underline underline-offset-2" href="https://openlab.citytech.cuny.edu/cet4711/files/2018/05/DHT11.pdf" target="_blank" rel="noopener noreferrer">
            copy of the DHT11 datasheet
          </a>
          ; Firebase free-plan limits from the{" "}
          <a className="text-signal underline underline-offset-2" href="https://firebase.google.com/docs/database/usage/limits" target="_blank" rel="noopener noreferrer">
            Realtime Database limits page
          </a>
          ; Adafruit IO free-tier rate (30 data points a minute) from the{" "}
          <a className="text-signal underline underline-offset-2" href="https://io.adafruit.com/api/docs/mqtt.html" target="_blank" rel="noopener noreferrer">
            Adafruit IO MQTT docs
          </a>
          . Data volumes and read counts are my own estimates from the firmware intervals.
        </Callout>
      </div>
    </section>
  );
}
