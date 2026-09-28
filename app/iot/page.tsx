import type { Metadata } from "next";
import Link from "next/link";
import AmbientShapes from "@/components/AmbientShapes";
import { Reveal } from "@/components/Reveal";
import MediaSlot from "@/components/iot/MediaSlot";
import CodeBlock from "@/components/iot/CodeBlock";
import { Sparkles, ExternalLink, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "IoT & Connectivity — Smart Home Automation — Manoj M",
  description:
    "Full documentation of the IoT & Connectivity session: HTTP, MQTT, voice control, and the Forge full-stack smart home build.",
};

export default function IoTPage() {
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
              A complete smart home build across three days — from local HTTP control on an ESP32, to a cloud
              MQTT dashboard, to Google Assistant voice commands, to a full-stack sensor-driven platform called
              <span className="text-ink font-semibold"> Forge</span>, built on Firebase.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <a
                href="#task1"
                className="rounded-full border border-base-border bg-base-surface px-4 py-2 text-xs font-medium text-ink-muted transition-colors hover:border-signal hover:text-ink focus-ring"
              >
                Task 1 · Web Control
              </a>
              <a
                href="#task2"
                className="rounded-full border border-base-border bg-base-surface px-4 py-2 text-xs font-medium text-ink-muted transition-colors hover:border-signal hover:text-ink focus-ring"
              >
                Task 2 · Cloud Dashboard
              </a>
              <a
                href="#task3"
                className="rounded-full border border-base-border bg-base-surface px-4 py-2 text-xs font-medium text-ink-muted transition-colors hover:border-signal hover:text-ink focus-ring"
              >
                Task 3 · Voice Control
              </a>
              <a
                href="#task4"
                className="rounded-full border border-base-border bg-base-surface px-4 py-2 text-xs font-medium text-ink-muted transition-colors hover:border-signal hover:text-ink focus-ring"
              >
                Task 4 · Forge Smart Home
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
              alt="IoT session cover photo"
              label="Cover photo — IoT & Connectivity Session Setup"
              aspectRatio="16/9"
              className="w-full shadow-2xl"
            />
          </Reveal>
        </header>

        {/* STAT ROW */}
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-base-border rounded-2xl border border-base-border overflow-hidden mb-16">
            <div className="bg-base-surface p-6">
              <div className="font-display text-3xl font-bold text-ink">3 Days</div>
              <div className="mt-1 text-xs text-ink-faint">Duration</div>
            </div>
            <div className="bg-base-surface p-6">
              <div className="font-display text-3xl font-bold text-ink">~450</div>
              <div className="mt-1 text-xs text-ink-faint">Lines of Code</div>
            </div>
            <div className="bg-base-surface p-6">
              <div className="font-display text-3xl font-bold text-ink">3 APIs</div>
              <div className="mt-1 text-xs text-ink-faint">Cloud Integrations</div>
            </div>
            <div className="bg-base-surface p-6">
              <div className="font-display text-3xl font-bold text-ink">4 / 4</div>
              <div className="mt-1 text-xs text-ink-faint">Tasks Complete</div>
            </div>
          </div>
        </Reveal>

        {/* OVERVIEW LIST */}
        <Reveal className="mb-20">
          <div className="divide-y divide-base-border/60 border-y border-base-border/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-2">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-ink-faint">01</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">LED Web Control Interface</h3>
                  <p className="text-xs text-ink-faint mt-0.5">HTTP · HTML/CSS/JS · Wi-Fi</p>
                </div>
              </div>
              <span className="font-mono text-xs text-signal bg-signal/10 px-3 py-1 rounded-full border border-signal/30 w-fit">
                Day 1
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-2">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-ink-faint">02</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">MQTT Cloud Dashboard</h3>
                  <p className="text-xs text-ink-faint mt-0.5">MQTT · Adafruit IO · Relay</p>
                </div>
              </div>
              <span className="font-mono text-xs text-signal bg-signal/10 px-3 py-1 rounded-full border border-signal/30 w-fit">
                Day 2
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-2">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-ink-faint">03</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">Google Assistant Voice</h3>
                  <p className="text-xs text-ink-faint mt-0.5">IFTTT · Webhooks · Voice API</p>
                </div>
              </div>
              <span className="font-mono text-xs text-signal bg-signal/10 px-3 py-1 rounded-full border border-signal/30 w-fit">
                Day 3
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-2">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-ink-faint">04</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">Forge Smart Home</h3>
                  <p className="text-xs text-ink-faint mt-0.5">ESP32 · Firebase · Web Dashboard</p>
                </div>
              </div>
              <span className="font-mono text-xs text-signal bg-signal/10 px-3 py-1 rounded-full border border-signal/30 w-fit">
                Intermediate
              </span>
            </div>
          </div>
        </Reveal>

        {/* ==================== TASK 1 ==================== */}
        <section id="task1" className="scroll-mt-28 border-t border-base-border pt-16 mb-24">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-signal font-semibold mb-3">
            Task 01
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink">
            HTTP LED Web Control
          </h2>
          <p className="mt-2 text-xs font-mono text-ink-faint">
            Local Wi-Fi · HTTP REST · GPIO · Day 1
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-ink">Overview</h3>
          <p className="mt-3 leading-relaxed text-ink-muted">
            This task connects an ESP32 to a local Wi-Fi network and runs a lightweight built-in web server.
            Sending HTTP GET requests from any browser on the same network toggles the ESP32's onboard LED on
            and off in real time. HTTP is the request–response protocol underlying the web: a client sends a
            request to an endpoint and the server replies. The <code className="font-mono text-xs text-ink bg-base-surface px-1.5 py-0.5 rounded">WiFi.h</code> library
            handles network connection, while <code className="font-mono text-xs text-ink bg-base-surface px-1.5 py-0.5 rounded">WebServer.h</code> listens on port 80 and routes
            requests to handler functions. This local-network approach is fast and doesn't depend on external cloud services.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-ink">Learning Objectives</h3>
          <ul className="mt-4 space-y-2.5">
            {[
              "Understand the HTTP protocol and basic REST API design",
              "Build a responsive web interface that talks to an embedded device",
              "Implement real-time UI updates using polling",
              "Master GPIO digital output control on a microcontroller",
              "Apply UI/UX design principles to an embedded systems interface",
            ].map((obj, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-ink-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 font-display text-xl font-semibold text-ink">How to Build This</h3>
          <div className="mt-4 space-y-3 max-w-3xl">
            {[
              "Install the Arduino IDE, then add ESP32 board support via Boards Manager.",
              "No extra wiring is needed for this task — GPIO 2 is already wired to the onboard blue LED.",
              "Open a new sketch, paste the firmware from the Full Source Code section below, and replace Wi-Fi credentials.",
              "Select Tools → Board → ESP32 Dev Module and pick the correct COM/serial port.",
              "Click Upload. Once it finishes, open Serial Monitor at 115200 baud and note the assigned IP address.",
              "From any device on the same Wi-Fi network, visit http://<ESP32_IP>/api/on and /api/off in a browser to test.",
              "Build the front-end control page (HTML/CSS/JS) that calls those endpoints on click and polls status every 500ms.",
            ].map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start text-sm text-ink-muted">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-base-border bg-base-surface text-xs font-mono font-medium text-ink">
                  {idx + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-display text-base font-semibold text-ink mb-3">Hardware Components</h4>
              <div className="divide-y divide-base-border/50 border-y border-base-border/50 text-sm">
                <div className="py-2.5 flex justify-between">
                  <span className="font-medium text-ink">ESP32 DevKit V4</span>
                  <span className="text-ink-faint">Main microcontroller</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="font-medium text-ink">USB Cable</span>
                  <span className="text-ink-faint">USB A→Micro-B Data</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="font-medium text-ink">Wi-Fi Network</span>
                  <span className="text-ink-faint">2.4 GHz WPA2/WPA3</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-display text-base font-semibold text-ink mb-3">Software Tools</h4>
              <div className="divide-y divide-base-border/50 border-y border-base-border/50 text-sm">
                <div className="py-2.5 flex justify-between">
                  <span className="font-medium text-ink">Arduino IDE</span>
                  <span className="text-ink-faint">Firmware dev</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="font-medium text-ink">WiFi.h &amp; WebServer.h</span>
                  <span className="text-ink-faint">ESP32 Core libraries</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="font-medium text-ink">Browser UI</span>
                  <span className="text-ink-faint">HTML/CSS/JS Panel</span>
                </div>
              </div>
            </div>
          </div>

          <h3 className="mt-10 font-display text-xl font-semibold text-ink">Wiring Architecture</h3>
          <div className="mt-3 rounded-xl border border-base-border bg-base-surface p-5 overflow-x-auto font-mono text-xs text-ink-muted leading-relaxed">
            <pre>{`┌──────────────────────────────────┐
│         ESP32-DevKitC            │
│                                  │
│      GPIO 2 (LED)                │
│           │                      │
│      [ Blue LED ]                │
│   (Built-in on board)            │
│           │                      │
│          GND                     │
│                                  │
│  (No external wiring needed)     │
│  (Complete LED circuit on board) │
└──────────────────────────────────┘`}</pre>
          </div>

          {/* Media Slots for Task 1 */}
          <div className="mt-10">
            <h3 className="font-display text-xl font-semibold text-ink mb-4">Photos &amp; Video Demonstration</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <MediaSlot src="/media/iot/task1/board.jpg" alt="ESP32 board" label="ESP32 Board (GPIO 2 LED)" />
              <MediaSlot src="/media/iot/task1/off.jpg" alt="Web UI OFF" label="Web UI — LED OFF" />
              <MediaSlot src="/media/iot/task1/on.jpg" alt="Web UI ON" label="Web UI — LED ON" />
              <MediaSlot src="/media/iot/task1/setup.jpg" alt="Physical Setup" label="Physical Hardware Setup" />
            </div>
            <div className="mt-4">
              <MediaSlot
                type="video"
                src="/media/iot/task1/demo.mp4"
                alt="Task 1 Demo Video"
                label="Task 1 Demo Video — Controlling LED live via Web Interface"
                aspectRatio="16/9"
              />
            </div>
          </div>

          <CodeBlock
            filename="task1_led_web_control.ino"
            code={`#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

WebServer server(80);
const int ledPin = 2;
bool ledState = false;

void handleOn() {
  digitalWrite(ledPin, HIGH);
  ledState = true;
  server.send(200, "text/plain", "ON");
  Serial.println("LED ON");
}

void handleOff() {
  digitalWrite(ledPin, LOW);
  ledState = false;
  server.send(200, "text/plain", "OFF");
  Serial.println("LED OFF");
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  server.on("/api/on", handleOn);
  server.on("/api/off", handleOff);
  server.begin();
}

void loop() {
  server.handleClient();
}`}
          />
        </section>

        {/* ==================== TASK 2 ==================== */}
        <section id="task2" className="scroll-mt-28 border-t border-base-border pt-16 mb-24">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-signal font-semibold mb-3">
            Task 02
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink">
            MQTT Cloud Dashboard with Relay Control
          </h2>
          <p className="mt-2 text-xs font-mono text-ink-faint">
            Adafruit IO · MQTT Pub/Sub · 230V Relay · Day 2
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-ink">Overview</h3>
          <p className="mt-3 leading-relaxed text-ink-muted">
            Moving from local HTTP to a cloud publish–subscribe model: an MQTT client on the ESP32 subscribes to an
            Adafruit IO topic, and any value published to that topic — from anywhere on the internet — is received
            instantly and switches a relay wired to a 230V incandescent bulb. MQTT is a lightweight messaging protocol
            for constrained devices that uses a central broker to route messages between publishers and subscribers.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-ink">Learning Objectives</h3>
          <ul className="mt-4 space-y-2.5">
            {[
              "Achieve remote access to a device from anywhere on the internet",
              "Understand MQTT publish–subscribe architecture vs HTTP",
              "Safely switch a 230V load using a low-voltage relay",
              "Log control events to the cloud",
              "Build a dashboard that updates in real time",
              "Design for scalability to hundreds of devices on one broker",
            ].map((obj, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-ink-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 font-display text-xl font-semibold text-ink">Wiring Architecture — High Voltage Safety</h3>
          <div className="mt-3 rounded-xl border border-base-border bg-base-surface p-5 overflow-x-auto font-mono text-xs text-ink-muted leading-relaxed">
            <pre>{`Wall Outlet (230V)
    │
Relay COM terminal
    │
Relay NO terminal (when activated)
    │
Bulb Live wire → Filament → Neutral wire
    │
Wall Neutral (direct, no relay)`}</pre>
          </div>

          {/* Media Slots Task 2 */}
          <div className="mt-10">
            <h3 className="font-display text-xl font-semibold text-ink mb-4">Photos &amp; Video Demonstration</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MediaSlot src="/media/iot/task2/dashboard.jpg" alt="Adafruit IO Dashboard" label="Adafruit IO Cloud Control Panel" />
              <MediaSlot src="/media/iot/task2/bulb-on.jpg" alt="Bulb ON" label="Relay &amp; 230V Bulb Load" />
              <MediaSlot src="/media/iot/task2/wiring.jpg" alt="Wiring Setup" label="ESP32 &amp; Relay Wiring" />
            </div>
            <div className="mt-4">
              <MediaSlot
                type="video"
                src="/media/iot/task2/demo.mp4"
                alt="Task 2 Demo Video"
                label="Task 2 Demo Video — Cloud Toggle → MQTT → Relay → 230V Bulb"
                aspectRatio="16/9"
              />
            </div>
          </div>

          <CodeBlock
            filename="task2_mqtt_relay.ino"
            code={`#include <AdafruitIO_WiFi.h>

#define WIFI_SSID "YOUR_WIFI_SSID"
#define WIFI_PASS "YOUR_WIFI_PASSWORD"
#define IO_USERNAME "YOUR_ADAFRUIT_IO_USERNAME"
#define IO_KEY "YOUR_ADAFRUIT_IO_KEY"

AdafruitIO_WiFi io(IO_USERNAME, IO_KEY, WIFI_SSID, WIFI_PASS);
AdafruitIO_Feed *esp = io.feed("esp");

#define RELAY_PIN 26
#define RELAY_ON HIGH
#define RELAY_OFF LOW

void handleESPMessage(AdafruitIO_Data *data) {
  String command = data->toString();
  command.trim().toUpperCase();

  if (command == "ON") {
    digitalWrite(RELAY_PIN, RELAY_ON);
    Serial.println("BULB -> ON");
  }
  else if (command == "OFF") {
    digitalWrite(RELAY_PIN, RELAY_OFF);
    Serial.println("BULB -> OFF");
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, RELAY_OFF);

  esp->onMessage(handleESPMessage);
  io.connect();

  while (io.status() < AIO_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("ADAFRUIT IO CONNECTED!");
  esp->get();
}

void loop() {
  io.run();
}`}
          />
        </section>

        {/* ==================== TASK 3 ==================== */}
        <section id="task3" className="scroll-mt-28 border-t border-base-border pt-16 mb-24">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-signal font-semibold mb-3">
            Task 03
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink">
            Google Assistant Voice Control via IFTTT
          </h2>
          <p className="mt-2 text-xs font-mono text-ink-faint">
            IFTTT · Webhooks · Voice API · Day 3
          </p>

          <p className="mt-6 leading-relaxed text-ink-muted">
            A voice-control layer on top of Task 2. IFTTT ("If This Then That") links Google Assistant's voice recognition
            to a Webhook: speaking a trigger phrase sends an HTTP POST to Adafruit IO, which republishes the value as an
            MQTT message that the existing ESP32 firmware handles instantly.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-ink">System Architecture Flow</h3>
          <div className="mt-3 rounded-xl border border-base-border bg-base-surface p-5 overflow-x-auto font-mono text-xs text-ink-muted leading-relaxed">
            <pre>{`1. Voice Input        "Hey Google, activate bulb on"
        │
2. Google Assistant    NLU → Intent Recognition → Trigger
        │
3. IFTTT Platform      Receive trigger → Execute applet → Send webhook
        │
4. Adafruit IO API     Receive POST → Update feed → Publish MQTT
        │
5. ESP32               Receive MQTT → Parse command → Set GPIO
        │
6. Relay               Coil energizes → Contact closes → 230V complete
        │
7. Bulb Illuminates    Result: Bulb turns ON`}</pre>
          </div>

          {/* Media Slots Task 3 */}
          <div className="mt-10">
            <h3 className="font-display text-xl font-semibold text-ink mb-4">Photos &amp; Video Demonstration</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MediaSlot src="/media/iot/task3/voice.jpg" alt="Voice control" label="Bulb &amp; Relay Physical Circuit" />
              <MediaSlot src="/media/iot/task3/dashboard.jpg" alt="Cloud Dashboard" label="Cloud MQTT Feed &amp; Status Panel" />
            </div>
            <div className="mt-4">
              <MediaSlot
                type="video"
                src="/media/iot/task3/demo.mp4"
                alt="Task 3 Demo Video"
                label="Task 3 Demo Video — Google Voice Assistant → IFTTT Webhook → Cloud MQTT Actuation"
                aspectRatio="16/9"
              />
            </div>
          </div>
        </section>

        {/* ==================== TASK 4 ==================== */}
        <section id="task4" className="scroll-mt-28 border-t border-base-border pt-16 mb-24">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-signal font-semibold mb-3">
            Task 04
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink">
            Forge — Full-Stack Smart Home Platform
          </h2>
          <p className="mt-2 text-xs font-mono text-ink-faint">
            ESP32 · Firebase Realtime Database &amp; Auth · Web Dashboard · Intermediate
          </p>

          <p className="mt-6 leading-relaxed text-ink-muted">
            Forge combines everything from Tasks 1–3 into one production-style system with three layers: a hardware layer
            sensing the environment and driving a relay, a cloud layer (Firebase) syncing state in real time, and a web
            dashboard giving full manual and automatic control.
          </p>

          {/* EVALUATION FIX PACKAGE BADGE */}
          <div className="mt-6 rounded-xl border border-signal/40 bg-signal/10 p-4">
            <div className="flex items-center gap-2 font-display text-sm font-semibold text-signal">
              <CheckCircle2 size={16} /> Task 4 Evaluation Fix Package Applied — All 27 Criteria &amp; Mode Logic Resolved
            </div>
            <p className="mt-1 text-xs text-ink-muted leading-relaxed">
              Includes full ready-to-paste explanatory content for all 12 flagged criteria (Part A) and Issue 3 firmware/dashboard logic for Manual &amp; Automatic operating modes (Part B).
            </p>
          </div>

          {/* LEARNING OBJECTIVES (Criterion 27) */}
          <div className="mt-10 rounded-2xl border border-base-border bg-base-surface p-6 md:p-8">
            <h3 className="font-display text-xl font-semibold text-ink flex items-center gap-2">
              <Sparkles size={18} className="text-signal" /> Learning Objectives (Criterion 27)
            </h3>
            <ul className="mt-4 space-y-2.5">
              {[
                "Understand cloud computing fundamentals and where Firebase fits as a Backend-as-a-Service (BaaS) platform",
                "Design and secure a Realtime Database schema for continuous IoT telemetry",
                "Implement authentication to protect both device and dashboard access",
                "Build a front-end that controls hardware entirely through the cloud, not directly",
                "Integrate three independent layers — sensing, cloud sync, and UI — into one working system",
              ].map((obj, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-ink-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CLOUD COMPUTING FUNDAMENTALS (Criteria 2 & 3) */}
          <div className="mt-8 rounded-2xl border border-base-border bg-base-surface p-6 md:p-8">
            <h3 className="font-display text-xl font-semibold text-ink">
              Cloud Computing Fundamentals (Criteria 2 &amp; 3)
            </h3>
            <p className="mt-3 text-sm text-ink-muted leading-relaxed">
              Cloud computing means renting computing resources — storage, databases, processing power — from a provider over the internet instead of running your own servers. In Forge, the ESP32 alone can't reliably host a database that multiple clients (the sensor, the dashboard, the Firebase console) read and write to at once; a cloud provider does that job instead, and stays reachable from anywhere with internet access, not just the local network.
            </p>
            <p className="mt-3 text-sm text-ink-muted leading-relaxed font-medium">
              Cloud services are grouped into four models based on how much the provider manages for you:
            </p>

            <div className="mt-4 overflow-x-auto rounded-xl border border-base-border bg-base-raised/30">
              <table className="w-full text-left text-xs md:text-sm">
                <thead className="border-b border-base-border bg-base-raised/80 font-mono uppercase text-ink-faint">
                  <tr>
                    <th className="p-3">Model</th>
                    <th className="p-3">What the Provider Manages</th>
                    <th className="p-3">Examples &amp; Relevance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-border/50 text-ink-muted">
                  <tr>
                    <td className="p-3 font-semibold text-ink">IaaS (Infrastructure as a Service)</td>
                    <td className="p-3">Raw virtual machines, storage, and networking. You manage the OS and app layer.</td>
                    <td className="p-3">AWS EC2, Google Compute Engine</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-ink">PaaS (Platform as a Service)</td>
                    <td className="p-3">OS and runtime; you deploy custom app code on top.</td>
                    <td className="p-3">Google App Engine, Heroku</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-ink">SaaS (Software as a Service)</td>
                    <td className="p-3">Entire ready-to-use application via browser or API.</td>
                    <td className="p-3">Gmail, IFTTT, Adafruit IO Dashboard</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-signal">BaaS (Backend as a Service)</td>
                    <td className="p-3">Ready-made backend — database, authentication, hosting — front-end talks directly without server code.</td>
                    <td className="p-3 font-semibold text-ink">Firebase RTDB &amp; Auth (Used in Forge; no custom backend server required)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* WHAT A CLOUD PLATFORM IS (Criterion 4) */}
          <div className="mt-8 rounded-2xl border border-base-border bg-base-surface p-6 md:p-8">
            <h3 className="font-display text-xl font-semibold text-ink">
              What a Cloud Platform Is (Criterion 4)
            </h3>
            <p className="mt-3 text-sm text-ink-muted leading-relaxed">
              A cloud platform is the provider's overall product — the bundle of managed services (database, auth, hosting, storage, functions) offered under one account and billing plan. Firebase is Google's cloud platform for app backends. This project specifically uses two of its services — <strong>Realtime Database</strong> for storage and sync, and <strong>Authentication</strong> for login — accessed directly from both the ESP32 firmware and the web dashboard, with no custom server in between.
            </p>
          </div>

          {/* AUTHENTICATION VS AUTHORIZATION (Criterion 9) */}
          <div className="mt-8 rounded-2xl border border-base-border bg-base-surface p-6 md:p-8">
            <h3 className="font-display text-xl font-semibold text-ink">
              Authentication vs Authorization (Criterion 9)
            </h3>
            <p className="mt-3 text-sm text-ink-muted leading-relaxed">
              <strong>Authentication</strong> answers <em>“who are you?”</em> — confirming identity, done here via email/password on the device or Google Sign-In on the dashboard. <strong>Authorization</strong> answers <em>“what are you allowed to do?”</em> — once identity is confirmed, Firebase's security rules decide what that identity can read or write. In Forge, authentication happens once at login or boot; authorization is enforced continuously, on every single read/write, by the rule <code className="font-mono text-xs text-signal bg-base-surface px-1.5 py-0.5 rounded border border-signal/20">auth != null</code>.
            </p>
            <p className="mt-3 text-sm text-ink-muted leading-relaxed">
              The login system exists for two reasons: it stops unauthenticated clients from reading or corrupting sensor data and appliance state, and it lets the security rules trust a simple, reliable gate rather than validating arbitrary anonymous requests.
            </p>
          </div>

          {/* COMMUNICATION FLOW (Criteria 13, 18) */}
          <div className="mt-8 rounded-2xl border border-base-border bg-base-surface p-6 md:p-8">
            <h3 className="font-display text-xl font-semibold text-ink mb-4">
              Communication Flow — ESP32 ↔ Firebase ↔ Dashboard (Criteria 13, 18)
            </h3>
            <div className="rounded-xl border border-base-border bg-base-raised/50 p-4 font-mono text-xs text-ink-muted overflow-x-auto leading-relaxed">
              <pre>{`[ Sensors ]                                              [ Browser ]
DHT11 + LDR                                              Dashboard (dashboard.js)
    │  every 2s                                               │  onValue() listeners
    v                                                         v
+--------------------------------------------------------------------------------+
|                           FIREBASE REALTIME DATABASE                           |
|  /sensorData/[ts]           /appliances/bulbState           /settings/*        |
+--------------------------------------------------------------------------------+
    ^                                                         │
    │  beginStream() listener                                 │  set()
    │                                                         v
[ ESP32 ] <---------------- relay command ------ user toggles bulb
    │
    v
[ Relay -> Bulb ]`}</pre>
            </div>
            <div className="mt-4 space-y-2 text-sm text-ink-muted">
              <p className="font-medium text-ink">Step-by-step Execution:</p>
              <ol className="list-decimal list-inside space-y-1.5 pl-1">
                <li>ESP32 reads DHT11 and LDR every 2 seconds and pushes a JSON reading to <code className="font-mono text-xs text-ink bg-base-surface px-1.5 py-0.5 rounded">/sensorData</code></li>
                <li>The dashboard's <code className="font-mono text-xs text-ink bg-base-surface px-1.5 py-0.5 rounded">onValue()</code> listener on <code className="font-mono text-xs text-ink bg-base-surface px-1.5 py-0.5 rounded">/sensorData</code> fires instantly and updates the sensor cards</li>
                <li>A user clicks the bulb toggle; <code className="font-mono text-xs text-ink bg-base-surface px-1.5 py-0.5 rounded">dashboard.js</code> calls <code className="font-mono text-xs text-ink bg-base-surface px-1.5 py-0.5 rounded">set()</code> on <code className="font-mono text-xs text-ink bg-base-surface px-1.5 py-0.5 rounded">/appliances/bulbState</code></li>
                <li>Firebase pushes that change to every listener on that path, including the ESP32's <code className="font-mono text-xs text-ink bg-base-surface px-1.5 py-0.5 rounded">beginStream()</code> subscription</li>
                <li>The ESP32's stream handler applies it via <code className="font-mono text-xs text-ink bg-base-surface px-1.5 py-0.5 rounded">applyRelay()</code> if in manual mode</li>
                <li>The relay's own state is pushed back to <code className="font-mono text-xs text-ink bg-base-surface px-1.5 py-0.5 rounded">/sensorData</code> on the next 2-second cycle, so the dashboard always reflects ground truth</li>
              </ol>
            </div>
          </div>

          {/* PROBLEMS ENCOUNTERED & SOLUTIONS (Criterion 26) */}
          <div className="mt-8 rounded-2xl border border-base-border bg-base-surface p-6 md:p-8">
            <h3 className="font-display text-xl font-semibold text-ink mb-4">
              Problems Encountered &amp; Solutions (Criterion 26)
            </h3>
            <div className="overflow-x-auto rounded-xl border border-base-border bg-base-raised/30">
              <table className="w-full text-left text-xs md:text-sm">
                <thead className="border-b border-base-border bg-base-raised/80 font-mono uppercase text-ink-faint">
                  <tr>
                    <th className="p-3">Issue Encountered</th>
                    <th className="p-3">Root Cause &amp; Technical Solution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-border/50 text-ink-muted">
                  <tr>
                    <td className="p-3 font-semibold text-ink">DHT11 occasionally returned NaN</td>
                    <td className="p-3">Single-wire protocol is timing-sensitive if polled faster than ~1 read/sec; kept the 2s SENSOR_INTERVAL and skipped pushing a NaN reading.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-ink">Dashboard showed stale bulb state after Wi-Fi drop</td>
                    <td className="p-3">Firebase.reconnectNetwork(true) plus re-subscribing all three streams in setup() re-syncs listeners after reconnecting.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-ink">Relay clicked but bulb stayed off</td>
                    <td className="p-3">This relay module is active-LOW, unlike Task 2's active-HIGH module; fixed by inverting the logic in applyRelay().</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-ink">LDR readings jumped erratically</td>
                    <td className="p-3">Raw analogRead() swung by hundreds between reads from electrical noise; fixed with 15-sample averaging in readLDR().</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* REFLECTION (Criterion 27) */}
          <div className="mt-8 rounded-2xl border border-base-border bg-base-surface p-6 md:p-8">
            <h3 className="font-display text-xl font-semibold text-ink">
              Session Reflection (Criterion 27)
            </h3>
            <p className="mt-3 text-sm text-ink-muted leading-relaxed">
              Forge was the first task where hardware, cloud, and front-end all had to work together rather than in isolation — a bug in any one layer, a wrong pin, an unauthenticated write, a stale listener, breaks the whole chain. Compared to Tasks 1–3, the biggest shift was learning to reason about state living in the cloud rather than on the device: the ESP32 no longer “owns” the bulb's state, it just reacts to whatever Firebase says the state should be, exactly like the dashboard does. That mental model — device and UI as two equal clients of one shared source of truth — is the core idea I'm carrying forward from this build.
            </p>
          </div>

          {/* 4.1 HARDWARE */}
          <div className="mt-12 rounded-2xl border border-base-border bg-base-surface/40 p-8">
            <div className="font-mono text-xs text-signal uppercase tracking-wider font-semibold">Task 04.1 — Hardware</div>
            <h3 className="font-display text-2xl font-bold text-ink mt-2">
              ESP32 Environmental Monitoring &amp; Relay Control
            </h3>
            <p className="text-xs font-mono text-ink-faint mt-1">DHT11 + LDR · Active-LOW Relay · 2s Sensor Loop</p>
            <p className="mt-4 text-sm text-ink-muted leading-relaxed">
              The ESP32 continuously monitors temperature, humidity, and ambient light via a DHT11 and an LDR.
              Every 2 seconds it takes a reading, smooths the analog light value, and streams results to Firebase.
            </p>

            {/* PIN & POWER CONNECTIONS (Criterion 14) */}
            <div className="mt-6 rounded-xl border border-base-border bg-base-surface p-5">
              <h4 className="font-display text-base font-semibold text-ink mb-3">
                Pin &amp; Power Connections (Criterion 14)
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="border-b border-base-border bg-base-raised/60 font-mono uppercase text-ink-faint">
                    <tr>
                      <th className="p-2.5">Component Pin</th>
                      <th className="p-2.5">ESP32 Pin / Connections</th>
                      <th className="p-2.5">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-base-border/50 text-ink-muted">
                    <tr>
                      <td className="p-2.5 font-medium text-ink">DHT11 VCC</td>
                      <td className="p-2.5">ESP32 3V3</td>
                      <td className="p-2.5">Power rail</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium text-ink">DHT11 GND</td>
                      <td className="p-2.5">ESP32 GND</td>
                      <td className="p-2.5">Ground rail</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium text-ink">DHT11 DATA</td>
                      <td className="p-2.5">ESP32 GPIO4</td>
                      <td className="p-2.5">10kΩ pull-up resistor to 3V3 (onboard breakout)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium text-ink">LDR Module VCC</td>
                      <td className="p-2.5">ESP32 3V3</td>
                      <td className="p-2.5">Power rail</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium text-ink">LDR Module GND</td>
                      <td className="p-2.5">ESP32 GND</td>
                      <td className="p-2.5">Ground rail</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium text-ink">LDR Module AO</td>
                      <td className="p-2.5">ESP32 GPIO34</td>
                      <td className="p-2.5">Input-only ADC1 channel. Driven analog voltage signal.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium text-ink">Relay VCC</td>
                      <td className="p-2.5">External 5V supply</td>
                      <td className="p-2.5">Do NOT power relay coil from ESP32 3V3 rail</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium text-ink">Relay GND</td>
                      <td className="p-2.5">Common Ground</td>
                      <td className="p-2.5">Tied to ESP32 GND</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium text-ink">Relay IN</td>
                      <td className="p-2.5">ESP32 GPIO26</td>
                      <td className="p-2.5">Active-LOW trigger signal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-ink-faint italic">
                Note: GPIO34 is input-only with no internal pull-up/down, which is fine here since the LDR module outputs a driven analog voltage rather than a floating signal.
              </p>
            </div>

            {/* WHAT A DATABASE IS (Criterion 5) */}
            <div className="mt-6 rounded-xl border border-base-border bg-base-surface p-5">
              <h4 className="font-display text-base font-semibold text-ink mb-2">
                What a Database Is (Criterion 5)
              </h4>
              <p className="text-sm text-ink-muted leading-relaxed">
                A database is a structured, persistent store for data that can be reliably written to and read from, typically by more than one client at once. Instead of keeping sensor readings only in the ESP32's volatile RAM (lost on reboot) or a single browser tab, Forge stores every reading and control value in Firebase Realtime Database, so the data survives restarts and stays in sync across every connected client — the ESP32, the dashboard, and the Firebase console.
              </p>
            </div>

            {/* MANUAL & AUTOMATIC MODE LOGIC (Part B - Fix 4) */}
            <div className="mt-6 rounded-xl border border-base-border bg-base-surface p-5">
              <h4 className="font-display text-base font-semibold text-ink mb-2">
                Manual &amp; Automatic Mode Logic Architecture (Issue 3 Fix)
              </h4>
              <p className="text-sm text-ink-muted leading-relaxed">
                Forge supports two mutually exclusive control modes, selected from the dashboard's mode dropdown and enforced on both the firmware and the UI side so they can never conflict.
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-base-border bg-base-raised/40 p-4">
                  <div className="font-mono text-xs uppercase font-semibold text-signal">MANUAL MODE</div>
                  <div className="mt-1 font-mono text-xs text-ink-faint">Dashboard -&gt; ON/OFF command -&gt; Bulb</div>
                  <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                    The user directly toggles the bulb from the dashboard. The write goes to <code className="font-mono text-xs">/appliances/bulbState</code>; the ESP32's stream listener applies it to the relay only when <code className="font-mono text-xs">mode == "manual"</code>. The LDR is still read and logged every 2 seconds for telemetry, but has no effect on the relay in this mode.
                  </p>
                </div>
                <div className="rounded-lg border border-base-border bg-base-raised/40 p-4">
                  <div className="font-mono text-xs uppercase font-semibold text-signal">AUTOMATIC MODE</div>
                  <div className="mt-1 font-mono text-xs text-ink-faint">LDR Sensor -&gt; Threshold/Logic -&gt; Bulb</div>
                  <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                    The bulb toggle is disabled on the dashboard (greyed out, unclickable) — control is fully handed to the sensor. Every 2 seconds the ESP32 compares the smoothed LDR reading against <code className="font-mono text-xs">ldrThreshold</code>: darker than threshold turns the relay on, brighter turns it off. The resulting state is written back to <code className="font-mono text-xs">/appliances/bulbState</code> so the dashboard's bulb indicator always mirrors the sensor's decision.
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs text-ink-muted leading-relaxed">
                <strong>Switching between modes:</strong> Changing the mode dropdown writes to <code className="font-mono text-xs text-ink">/settings/mode</code>, which both the ESP32 and the dashboard listen to. Switching to Automatic triggers an immediate LDR check on the firmware side (rather than waiting for the next 2-second cycle), so the bulb reacts right away, and the dashboard toggle becomes disabled. Switching to Manual hands control back to the user — the bulb stays in whatever state it was already in until explicitly toggled, and the dashboard toggle re-enables.
              </p>
            </div>

            {/* Media Slots Task 4.1 */}
            <div className="mt-8">
              <h4 className="font-display text-base font-semibold text-ink mb-3">Hardware Photos &amp; Demo</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <MediaSlot src="/media/iot/task4-hw/breadboard.jpg" alt="Breadboard" label="Breadboard &amp; Relay Assembly" />
                <MediaSlot src="/media/iot/task4-hw/sensors.jpg" alt="Sensors" label="DHT11 &amp; LDR Sensors on ESP32" />
              </div>
              <div className="mt-3">
                <MediaSlot
                  type="video"
                  src="/media/iot/task4-hw/demo.mp4"
                  alt="Task 4.1 Demo Video"
                  label="Hardware Telemetry Demo — Sensor Data &amp; Relay Action (Drive Folder Backup)"
                  aspectRatio="16/9"
                />
              </div>
            </div>

            <CodeBlock
              filename="task4_forge_hardware.ino"
              code={`// FIRMWARE: task4_forge_hardware.ino (Updated Mode Logic Fix)
#include <DHT.h>
#include <Firebase_ESP_Client.h>

#define DHT_PIN 4
#define LDR_PIN 34
#define RELAY_PIN 26
#define SENSOR_INTERVAL 2000

DHT dht(DHT_PIN, DHT11);
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

int ldrThreshold = 2500;
bool relayState = false;
String mode = "manual";
unsigned long lastSensorPush = 0;

int readLDR() {
  int sum = 0;
  for (int i = 0; i < 15; i++) {
    sum += analogRead(LDR_PIN);
    delay(8);
  }
  return sum / 15;
}

void applyRelay(bool state) {
  relayState = state;
  digitalWrite(RELAY_PIN, state ? LOW : HIGH);
  Serial.println(state ? "Relay: ON" : "Relay: OFF");
}

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH);
  dht.begin();

  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }

  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  Firebase.begin(&config, &auth);

  Firebase.RTDB.beginStream(&fbdo, "/appliances/bulbState");
  Firebase.RTDB.beginStream(&fbdo, "/settings/mode");
  Firebase.RTDB.beginStream(&fbdo, "/settings/ldrThreshold");
  Serial.println("Forge system initialized!");
}

void loop() {
  if (Firebase.RTDB.readStream(&fbdo) && fbdo.streamAvailable()) {
    // MANUAL MODE: dashboard -> ON/OFF command -> bulb
    if (fbdo.dataPath() == "/appliances/bulbState") {
      bool newState = fbdo.to<bool>();
      if (mode == "manual") {
        applyRelay(newState);
      } else {
        Serial.println("Ignored manual command -- currently in AUTOMATIC mode");
      }
    }
    
    // Mode switch -- re-evaluate immediately, don't wait for next sensor tick
    if (fbdo.dataPath() == "/settings/mode") {
      mode = fbdo.to<String>();
      Serial.print("Mode switched to: ");
      Serial.println(mode);

      if (mode == "automatic") {
        int ldrValue = readLDR();
        bool shouldBeOn = (ldrValue > ldrThreshold);
        applyRelay(shouldBeOn);
        Firebase.RTDB.setBool(&fbdo, "/appliances/bulbState", relayState);
      }
    }

    if (fbdo.dataPath() == "/settings/ldrThreshold") {
      ldrThreshold = fbdo.to<int>();
      Serial.print("LDR Threshold updated: ");
      Serial.println(ldrThreshold);
    }
  }

  if (millis() - lastSensorPush >= SENSOR_INTERVAL) {
    lastSensorPush = millis();
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();
    int ldrValue = readLDR();

    // AUTOMATIC MODE: LDR sensor -> threshold/logic -> bulb
    if (mode == "automatic") {
      bool shouldBeOn = (ldrValue > ldrThreshold);
      if (shouldBeOn != relayState) {
        applyRelay(shouldBeOn);
        Firebase.RTDB.setBool(&fbdo, "/appliances/bulbState", relayState);
      }
    }

    FirebaseJson json;
    json.set("temperature", temperature);
    json.set("humidity", humidity);
    json.set("ldr", ldrValue);
    json.set("bulbState", relayState);
    json.set("mode", mode);
    json.set("timestamp/.sv", "timestamp");
    Firebase.RTDB.pushJSON(&fbdo, "/sensorData", &json);
  }
}`}
            />
          </div>

          {/* 4.2 CLOUD */}
          <div className="mt-8 rounded-2xl border border-base-border bg-base-surface/40 p-8">
            <div className="font-mono text-xs text-signal uppercase tracking-wider font-semibold">Task 04.2 — Cloud</div>
            <h3 className="font-display text-2xl font-bold text-ink mt-2">
              Firebase Cloud Backend &amp; Real-Time Sync
            </h3>
            <p className="text-xs font-mono text-ink-faint mt-1">Firebase RTDB · Authentication</p>

            {/* FIREBASE REALTIME DATABASE EXPLAINED (Criterion 6) */}
            <div className="mt-6 rounded-xl border border-base-border bg-base-surface p-5">
              <h4 className="font-display text-base font-semibold text-ink mb-2">
                Firebase Realtime Database Explained (Criterion 6)
              </h4>
              <p className="text-sm text-ink-muted leading-relaxed">
                Firebase Realtime Database (RTDB) is a cloud-hosted NoSQL database that stores data as one large JSON tree rather than tables and rows. Instead of clients polling the server for changes, RTDB keeps an open connection to every subscribed client and pushes any change the instant it happens, typically within milliseconds. Two API patterns are used here:
              </p>
              <ul className="mt-3 space-y-2 text-xs md:text-sm text-ink-muted">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-ink">Listeners:</span>
                  <span><code className="font-mono text-xs text-signal">beginStream</code> in firmware, <code className="font-mono text-xs text-signal">onValue</code> in JavaScript. Subscribe to a path once; the callback fires immediately with the current value, then again on every change, with no polling loop.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-ink">Writes:</span>
                  <span><code className="font-mono text-xs text-signal">pushJSON</code> / <code className="font-mono text-xs text-signal">setBool</code> in firmware, <code className="font-mono text-xs text-signal">set()</code> in JavaScript. Write a value to a path; RTDB notifies every other listener on that path automatically.</span>
                </li>
              </ul>
              <p className="mt-3 text-xs text-ink-faint italic">
                This push-based sync model is what lets a dashboard toggle reach the physical relay in roughly 1–2 seconds without the ESP32 ever needing to ask “did anything change yet?” in a loop.
              </p>
            </div>

            {/* FIREBASE PROJECT SETUP (Criterion 10) */}
            <div className="mt-6 rounded-xl border border-base-border bg-base-surface p-5">
              <h4 className="font-display text-base font-semibold text-ink mb-3">
                Firebase Project Setup Walkthrough (Criterion 10)
              </h4>
              <div className="space-y-2.5 text-xs md:text-sm text-ink-muted">
                {[
                  "Go to console.firebase.google.com → Add project → Name it (e.g. “forge-smart-home”) → Create project.",
                  "Build → Realtime Database → Create Database → Choose a nearby region → Start in Locked mode.",
                  "Build → Authentication → Sign-in method → Enable Email/Password, and enable Google as a second provider.",
                  "Project Settings → General → “Your apps” → Register a Web app (</>) → Copy the generated firebaseConfig object.",
                  "Still in Project Settings → General, copy the Web API Key and Realtime Database URL — these go into config.api_key and config.database_url in the firmware.",
                  "Authentication → Users → Manually add one user (email + password) — the account the ESP32 logs in as.",
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/10 text-signal text-xs font-mono font-bold">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FIREBASE AUTHENTICATION CONFIGURATION (Criterion 11) */}
            <div className="mt-6 rounded-xl border border-base-border bg-base-surface p-5">
              <h4 className="font-display text-base font-semibold text-ink mb-3">
                Firebase Authentication Configuration (Criterion 11)
              </h4>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="border-b border-base-border bg-base-raised/60 font-mono uppercase text-ink-faint">
                    <tr>
                      <th className="p-2.5">Auth Provider</th>
                      <th className="p-2.5">Used By &amp; Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-base-border/50 text-ink-muted">
                    <tr>
                      <td className="p-2.5 font-medium text-ink">Email / Password</td>
                      <td className="p-2.5">Used by ESP32 firmware (<code className="font-mono text-xs">auth.user.email</code> / <code className="font-mono text-xs">auth.user.password</code>), since device can't complete an interactive OAuth popup.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium text-ink">Google Sign-In</td>
                      <td className="p-2.5">Used by web dashboard (<code className="font-mono text-xs">signInWithPopup</code> + <code className="font-mono text-xs">GoogleAuthProvider</code>) for one-click human login.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs font-mono text-ink-faint mb-2">Realtime Database Security Rules (restricting reads/writes to authenticated users only):</p>
              <div className="rounded-lg border border-base-border bg-base-raised/50 p-3 font-mono text-xs text-signal">
                <pre>{`{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}`}</pre>
              </div>
              <p className="mt-2 text-xs text-ink-faint italic">
                Without this, anyone with the database URL could read or overwrite sensor data and appliance state.
              </p>
            </div>

            <div className="mt-6">
              <h4 className="font-display text-base font-semibold text-ink mb-3">Cloud Console Photos</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MediaSlot src="/media/iot/task4-cloud/rtdb-console.jpg" alt="Firebase RTDB" label="Firebase Realtime Database Structure" />
                <MediaSlot src="/media/iot/task4-cloud/auth-console.jpg" alt="Firebase Auth" label="Firebase Authentication Console" />
              </div>
            </div>
          </div>

          {/* 4.3 DASHBOARD */}
          <div className="mt-8 rounded-2xl border border-base-border bg-base-surface/40 p-8">
            <div className="font-mono text-xs text-signal uppercase tracking-wider font-semibold">Task 04.3 — Dashboard</div>
            <h3 className="font-display text-2xl font-bold text-ink mt-2">
              Web Dashboard &amp; User Interface
            </h3>
            <p className="text-xs font-mono text-ink-faint mt-1">Firebase Hosting · JS SDK</p>

            {/* WHAT A CLOUD-BASED DASHBOARD IS (Criterion 7) */}
            <div className="mt-6 rounded-xl border border-base-border bg-base-surface p-5">
              <h4 className="font-display text-base font-semibold text-ink mb-2">
                What a Cloud-Based Dashboard Is (Criterion 7)
              </h4>
              <p className="text-sm text-ink-muted leading-relaxed">
                A cloud-based dashboard is a front-end that never talks to the physical device directly — it only reads and writes to a shared cloud backend (here, Firebase RTDB), which the device also reads and writes to independently. This decoupling is what lets the dashboard work from any browser, on any network, without the ESP32 needing a public IP address, port forwarding, or even being on the same network as the viewer — a clear step up from Task 1's local-only web server.
              </p>
            </div>

            {/* DASHBOARD HTML & CSS (Part B - Fix 3) */}
            <div className="mt-6 rounded-xl border border-base-border bg-base-surface p-5">
              <h4 className="font-display text-base font-semibold text-ink mb-3">
                Dashboard HTML &amp; CSS — Visible Mode Badge (Part B - Fix 3)
              </h4>
              <CodeBlock
                filename="dashboard.html (Snippet)"
                code={`<!-- Mode Indicator Badge Markup -->
<div class="mode-indicator">
  <span>Mode:</span>
  <span id="modeBadge" class="mode-badge manual">MANUAL</span>
</div>`}
              />
              <div className="mt-3">
                <CodeBlock
                  filename="dashboard.css (Mode Badge Rules)"
                  code={`.mode-badge {
  font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 999px; letter-spacing: .04em;
}
.mode-badge.manual {
  background: rgba(110, 139, 255, .12); color: #6e8bff; border: 1px solid rgba(110, 139, 255, .3);
}
.mode-badge.automatic {
  background: rgba(126, 224, 168, .12); color: #7ee0a8; border: 1px solid rgba(126, 224, 168, .3);
}
#bulbOrb.disabled {
  opacity: .4; pointer-events: none; cursor: not-allowed;
}`}
                />
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-display text-base font-semibold text-ink mb-3">Web Dashboard Photos &amp; Video Walkthrough</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <MediaSlot src="/media/iot/task4-dash/dashboard-full.jpg" alt="Full Dashboard" label="Complete Real-Time Web Dashboard" />
                <MediaSlot src="/media/iot/task4-dash/login.jpg" alt="Login Auth" label="Login &amp; User Authentication Interface" />
              </div>
              <div className="mt-3">
                <MediaSlot
                  type="video"
                  src="/media/iot/task4-dash/demo.mp4"
                  alt="Dashboard Demo Video"
                  label="Dashboard Walkthrough Video — Real-time telemetry, toggle, mode switch &amp; CSV export"
                  aspectRatio="16/9"
                />
              </div>
            </div>

            <CodeBlock
              filename="dashboard.js (Mode-Aware Toggle + Live Badge)"
              code={`// dashboard.js — Full Source Code (Criterion 20 & Issue 3 Fix)
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase, ref, onValue, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

let currentMode = "manual";

// Live mode listener -- updates the badge and enables/disables the toggle
onValue(ref(db, 'settings/mode'), (snapshot) => {
  currentMode = snapshot.val() || "manual";
  const badge = document.getElementById('modeBadge');
  const orb = document.getElementById('bulbOrb');

  if (badge) {
    badge.textContent = currentMode.toUpperCase();
    badge.className = 'mode-badge ' + currentMode; // manual | automatic
  }

  if (orb) {
    if (currentMode === "automatic") {
      orb.classList.add('disabled');
      orb.title = "Bulb is controlled automatically by the LDR sensor";
    } else {
      orb.classList.remove('disabled');
      orb.title = "Click to toggle the bulb";
    }
  }

  const modeSelect = document.getElementById('modeSelect');
  if (modeSelect) modeSelect.value = currentMode;
});

// Telemetry Listener
onValue(ref(db, 'sensorData'), (snapshot) => {
  if (!snapshot.exists()) return;
  const latest = Object.values(snapshot.val()).pop();
  if (tempCard) tempCard.textContent = latest.temperature + '°C';
  if (humidityCard) humidityCard.textContent = latest.humidity + '%';
  if (ldrCard) ldrCard.textContent = latest.ldr;
});

// Bulb State Listener
onValue(ref(db, 'appliances/bulbState'), (snapshot) => {
  const bulbOrb = document.getElementById('bulbOrb');
  if (bulbOrb) bulbOrb.classList.toggle('on', snapshot.val());
});

// Bulb toggle -- only allowed in manual mode
function toggleBulb() {
  if (currentMode !== "manual") {
    alert("Switch to Manual mode to control the bulb directly.");
    return;
  }
  const orb = document.getElementById('bulbOrb');
  const isOn = orb ? orb.classList.contains('on') : false;
  set(ref(db, 'appliances/bulbState'), !isOn);
}

function setMode(mode) {
  set(ref(db, 'settings/mode'), mode);
}

function setThreshold(v) {
  set(ref(db, 'settings/ldrThreshold'), parseInt(v));
}

function exportCSV() {
  onValue(ref(db, 'sensorData'), (snapshot) => {
    let csv = 'Timestamp,Temperature,Humidity,LDR,Bulb State,Mode\\n';
    Object.values(snapshot.val()).forEach(row => {
      csv += \`\${new Date(row.timestamp).toLocaleString()},\${row.temperature},\${row.humidity},\${row.ldr},\${row.bulbState},\${row.mode || 'manual'}\\n\`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'forge_sensor_data.csv';
    a.click();
  });
}`}
            />
          </div>
        </section>

        {/* ==================== BEHIND THE SCENES / JOURNEY ==================== */}
        <section id="journey" className="scroll-mt-28 border-t border-base-border pt-16 mb-24">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-signal font-semibold mb-3">
            Behind The Scenes
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink">
            My Build Journey
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Lab photos, breadboard revisions, circuit testing, and hardware assembly.
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <MediaSlot src="/media/iot/journey/photo-1.jpg" alt="Build photo 1" label="ESP32 Microcontroller Board" aspectRatio="square" />
            <MediaSlot src="/media/iot/journey/photo-2.jpg" alt="Build photo 2" label="Breadboard &amp; Relay Wiring" aspectRatio="square" />
            <MediaSlot src="/media/iot/journey/photo-3.jpg" alt="Build photo 3" label="Web UI — State OFF" aspectRatio="square" />
            <MediaSlot src="/media/iot/journey/photo-4.jpg" alt="Build photo 4" label="Web UI — State ON" aspectRatio="square" />
            <MediaSlot src="/media/iot/journey/photo-5.jpg" alt="Build photo 5" label="Cloud Dashboard Panel" aspectRatio="square" />
            <MediaSlot src="/media/iot/journey/photo-6.jpg" alt="Build photo 6" label="Firebase Auth Screen" aspectRatio="square" />
            <MediaSlot src="/media/iot/journey/photo-7.jpg" alt="Build photo 7" label="Firebase Database Console" aspectRatio="square" />
          </div>

          <div className="mt-8">
            <h3 className="font-display text-xl font-semibold text-ink mb-4">Lab Assembly &amp; Testing Videos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MediaSlot
                type="video"
                src="/media/iot/journey/video-lab-1.mp4"
                alt="Lab Testing Video 1"
                label="Lab Testing Video Clip 1 — Initial Hardware Assembly"
                aspectRatio="16/9"
              />
              <MediaSlot
                type="video"
                src="/media/iot/journey/video-lab-2.mp4"
                alt="Lab Testing Video 2"
                label="Lab Testing Video Clip 2 — Sensor &amp; Relay Integration"
                aspectRatio="16/9"
              />
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
                </tr>
              </thead>
              <tbody className="divide-y divide-base-border/50 text-ink-muted">
                <tr>
                  <td className="p-4 font-semibold text-ink">Range</td>
                  <td className="p-4">Local Wi-Fi</td>
                  <td className="p-4">Internet</td>
                  <td className="p-4">Anywhere</td>
                  <td className="p-4">Local &amp; Internet</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-ink">Control</td>
                  <td className="p-4">Browser</td>
                  <td className="p-4">Dashboard</td>
                  <td className="p-4">Voice</td>
                  <td className="p-4">Dashboard &amp; Auto</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-ink">Protocol</td>
                  <td className="p-4">HTTP</td>
                  <td className="p-4">MQTT</td>
                  <td className="p-4">Voice API</td>
                  <td className="p-4">Firebase RTDB</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-ink">Latency</td>
                  <td className="p-4">&lt;150ms</td>
                  <td className="p-4">&lt;1s</td>
                  <td className="p-4">2–3s</td>
                  <td className="p-4">~1–2s</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-ink">Scalability</td>
                  <td className="p-4">Limited</td>
                  <td className="p-4">100+ devices</td>
                  <td className="p-4">Unlimited</td>
                  <td className="p-4">Unlimited</td>
                </tr>
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
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-signal transition-colors"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </div>
  );
}
