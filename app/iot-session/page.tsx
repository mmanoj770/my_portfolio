import type { Metadata } from "next";
import Link from "next/link";
import AmbientShapes from "@/components/AmbientShapes";
import { Reveal } from "@/components/Reveal";
import MediaSlot from "@/components/iot/MediaSlot";
import CodeBlock from "@/components/iot/CodeBlock";
import {
  Cpu,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export const metadata: Metadata = {
  title: "IoT & Connectivity — Smart Home Automation — Manoj M",
  description:
    "Full documentation of the IoT & Connectivity session: HTTP, MQTT, voice control, and the Forge full-stack smart home build.",
};

export default function IoTSessionPage() {
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <MediaSlot src="/media/iot/task1/board.jpg" alt="ESP32 board" label="ESP32 Board (GPIO 2 LED)" />
              <MediaSlot src="/media/iot/task1/off.jpg" alt="Web UI OFF" label="Web UI — LED OFF" />
              <MediaSlot src="/media/iot/task1/on.jpg" alt="Web UI ON" label="Web UI — LED ON" />
              <MediaSlot src="/media/iot/task1/responsive.jpg" alt="Mobile responsive" label="Mobile Responsive View" />
              <MediaSlot src="/media/iot/task1/ide.jpg" alt="Arduino IDE" label="Arduino IDE Code" />
              <MediaSlot src="/media/iot/task1/setup.jpg" alt="Physical Setup" label="Physical Setup" />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <MediaSlot src="/media/iot/task2/dashboard.jpg" alt="Adafruit IO Dashboard" label="Adafruit IO Dashboard" />
              <MediaSlot src="/media/iot/task2/relay.jpg" alt="Relay Close-up" label="Relay Module Close-up" />
              <MediaSlot src="/media/iot/task2/bulb-on.jpg" alt="Bulb ON" label="Bulb Lit Up" />
              <MediaSlot src="/media/iot/task2/bulb-off.jpg" alt="Bulb OFF" label="Bulb OFF" />
              <MediaSlot src="/media/iot/task2/wiring.jpg" alt="Wiring Setup" label="Wiring Connections" />
              <MediaSlot src="/media/iot/task2/broker.jpg" alt="Broker Config" label="MQTT Broker Config" />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <MediaSlot src="/media/iot/task3/voice.jpg" alt="Voice control" label="Bulb Responding to Voice Command" />
              <MediaSlot src="/media/iot/task3/applet.jpg" alt="IFTTT applet" label="IFTTT Applet Configuration" />
              <MediaSlot src="/media/iot/task3/webhook.jpg" alt="Webhook payload" label="Webhook Payload Setup" />
            </div>
            <div className="mt-4">
              <MediaSlot
                type="video"
                src="/media/iot/task3/demo.mp4"
                alt="Task 3 Demo Video"
                label="Task 3 Demo Video — 'Activate bulb on' voice command demo"
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
            Forge — Full-Stack Smart Home
          </h2>
          <p className="mt-2 text-xs font-mono text-ink-faint">
            ESP32 · Firebase · Web Dashboard · Intermediate
          </p>

          <p className="mt-6 leading-relaxed text-ink-muted">
            Forge combines everything from Tasks 1–3 into one production-style system with three layers: a hardware layer
            sensing the environment and driving a relay, a cloud layer (Firebase) syncing state in real time, and a web
            dashboard giving full manual and automatic control.
          </p>

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

            {/* Media Slots Task 4.1 */}
            <div className="mt-8">
              <h4 className="font-display text-base font-semibold text-ink mb-3">Hardware Photos &amp; Demo</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <MediaSlot src="/media/iot/task4-hw/breadboard.jpg" alt="Breadboard" label="Breadboard Wiring" />
                <MediaSlot src="/media/iot/task4-hw/relay-mains.jpg" alt="Relay Mains" label="Relay Mains Module" />
                <MediaSlot src="/media/iot/task4-hw/sensors.jpg" alt="Sensors" label="DHT11 &amp; LDR Sensors" />
                <MediaSlot src="/media/iot/task4-hw/full-setup.jpg" alt="Full Setup" label="Full Physical Setup" />
              </div>
              <div className="mt-3">
                <MediaSlot
                  type="video"
                  src="/media/iot/task4-hw/demo.mp4"
                  alt="Task 4.1 Demo Video"
                  label="Hardware Demo — Sensor telemetry &amp; relay action"
                  aspectRatio="16/9"
                />
              </div>
            </div>

            <CodeBlock
              filename="task4_forge_hardware.ino"
              code={`#include <DHT.h>
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
    if (fbdo.dataPath() == "/appliances/bulbState") {
      bool newState = fbdo.to<bool>();
      if (mode == "manual" && newState != relayState) applyRelay(newState);
    }
    if (fbdo.dataPath() == "/settings/mode") mode = fbdo.to<String>();
    if (fbdo.dataPath() == "/settings/ldrThreshold") ldrThreshold = fbdo.to<int>();
  }

  if (millis() - lastSensorPush >= SENSOR_INTERVAL) {
    lastSensorPush = millis();
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();
    int ldrValue = readLDR();

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

            <div className="mt-6">
              <h4 className="font-display text-base font-semibold text-ink mb-3">Cloud Console Photos</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MediaSlot src="/media/iot/task4-cloud/rtdb-console.jpg" alt="Firebase RTDB" label="Firebase RTDB Console Structure" />
                <MediaSlot src="/media/iot/task4-cloud/security-rules.jpg" alt="Security Rules" label="Firebase Security Rules" />
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

            <div className="mt-6">
              <h4 className="font-display text-base font-semibold text-ink mb-3">Web Dashboard Photos &amp; Video Walkthrough</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <MediaSlot src="/media/iot/task4-dash/dashboard-full.jpg" alt="Full Dashboard" label="Complete Web Dashboard" />
                <MediaSlot src="/media/iot/task4-dash/mobile.jpg" alt="Mobile Dashboard" label="Responsive Mobile View" />
                <MediaSlot src="/media/iot/task4-dash/login.jpg" alt="Login Auth" label="Login / Auth Screen" />
                <MediaSlot src="/media/iot/task4-dash/history-table.jpg" alt="History Table" label="Historical Sensor Data Table" />
              </div>
              <div className="mt-3">
                <MediaSlot
                  type="video"
                  src="/media/iot/task4-dash/demo.mp4"
                  alt="Dashboard Demo Video"
                  label="Dashboard Walkthrough — Real-time telemetry, toggle, mode switch &amp; CSV export"
                  aspectRatio="16/9"
                />
              </div>
            </div>

            <CodeBlock
              filename="dashboard.js"
              code={`import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase, ref, onValue, set } from 'firebase/database';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

onValue(ref(db, 'sensorData'), (snapshot) => {
  const latest = Object.values(snapshot.val()).pop();
  tempCard.textContent = latest.temperature + '°C';
  humidityCard.textContent = latest.humidity + '%';
});

function toggleBulb() {
  const isOn = bulbOrb.classList.contains('on');
  set(ref(db, 'appliances/bulbState'), !isOn);
}

onValue(ref(db, 'appliances/bulbState'), (snapshot) => {
  bulbOrb.classList.toggle('on', snapshot.val());
});

function setMode(mode)      { set(ref(db, 'settings/mode'), mode); }
function setThreshold(v)    { set(ref(db, 'settings/ldrThreshold'), parseInt(v)); }

function exportCSV() {
  onValue(ref(db, 'sensorData'), (snapshot) => {
    let csv = 'Timestamp,Temperature,Humidity,LDR,Bulb State\\n';
    Object.values(snapshot.val()).forEach(row => {
      csv += \`\${new Date(row.timestamp).toLocaleString()},\${row.temperature},\${row.humidity},\${row.ldr},\${row.bulbState}\\n\`;
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
            {Array.from({ length: 8 }).map((_, idx) => (
              <MediaSlot
                key={idx}
                src={`/media/iot/journey/photo-${idx + 1}.jpg`}
                alt={`Journey photo ${idx + 1}`}
                label={`Build photo ${idx + 1}`}
                aspectRatio="square"
              />
            ))}
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
          <Link
            href="/iot"
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-signal transition-colors"
          >
            ← Back to IoT Overview
          </Link>
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
