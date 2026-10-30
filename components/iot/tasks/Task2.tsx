import {
  TaskHeader,
  DocSection,
  Sub,
  Prose,
  C,
  DataTable,
  Steps,
  Bullets,
  Flow,
  Figure,
  SourceFile,
  Evidence,
  EvidenceGroup,
  RepoCard,
  ChecklistIndex,
  Callout,
} from "@/components/iot/doc";
import { Task2Wiring } from "@/components/iot/diagrams";
import { repoTreeUrl } from "@/lib/iot-repo";

const T = 2;
const FOLDER = "task2-adafruit-io-mqtt";

// Drawn layout of the Adafruit IO dashboard as configured (not a screenshot).
function DashboardLayout() {
  return (
    <figure className="rounded-2xl border border-base-border bg-base-surface p-4 md:p-6">
      <div className="mx-auto max-w-xl rounded-xl border border-base-border bg-base-raised/50 p-4">
        <div className="flex items-center justify-between border-b border-base-border pb-3">
          <span className="font-display text-sm font-semibold text-ink">Dashboard: Smart Bulb</span>
          <span className="font-mono text-[11px] text-ink-faint">io.adafruit.com/&lt;username&gt;/dashboards</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-signal/40 bg-signal/10 p-3">
            <div className="font-mono text-[11px] uppercase text-signal">Toggle block</div>
            <div className="mt-2 flex items-center gap-2">
              <span className="relative inline-block h-5 w-9 rounded-full bg-signal">
                <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" />
              </span>
              <span className="text-sm font-semibold text-ink">Bulb</span>
            </div>
            <div className="mt-2 font-mono text-[11px] leading-relaxed text-ink-muted">
              feed: esp<br />ON text: &quot;ON&quot;<br />OFF text: &quot;OFF&quot;
            </div>
          </div>
          <div className="rounded-lg border border-base-border bg-base-surface p-3">
            <div className="font-mono text-[11px] uppercase text-ink-faint">Stream block</div>
            <div className="mt-2 space-y-1 font-mono text-[11px] text-ink-muted">
              <div>esp → ON</div>
              <div>esp → OFF</div>
              <div>esp → ON</div>
            </div>
            <div className="mt-2 font-mono text-[11px] text-ink-faint">feed: esp (history)</div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-ink-faint">
        Layout of my dashboard blocks and their settings (drawn diagram — screenshots are in the Evidence section).
      </figcaption>
    </figure>
  );
}

export default function Task2() {
  return (
    <article id="task2" className="scroll-mt-28 border-t border-base-border pt-16 mb-28">
      <TaskHeader task={T} title="Adafruit IO Dashboard & MQTT" meta="MQTT pub/sub · Adafruit IO · 5 V relay · 230 V bulb · Day 2">
        <ChecklistIndex
          task={T}
          items={[
            ["Purpose of Adafruit IO in an IoT system", "concepts"],
            ["Basic concept of MQTT", "concepts"],
            ["MQTT Publisher, Subscriber and Broker identified", "concepts"],
            ["Role of an MQTT Topic / Feed", "concepts"],
            ["Hardware and software used", "hardware"],
            ["Adafruit IO account created and documented", "configuration"],
            ["Dashboard and feed configuration documented", "configuration"],
            ["Communication flow between ESP32, MQTT and Adafruit IO", "design"],
            ["MQTT topic / feed structure used", "design"],
            ["Complete ESP32 source code", "implementation"],
            ["Explanation of important code sections", "implementation"],
            ["Photographs of the hardware setup", "evidence"],
            ["Screenshots of the Adafruit IO dashboard", "evidence"],
            ["LED / bulb control through the cloud dashboard demonstrated", "evidence"],
            ["Working demonstration video", "evidence"],
            ["Problems encountered during MQTT / cloud setup", "challenges"],
            ["Solutions implemented", "challenges"],
            ["Brief learning reflection", "reflection"],
            ["All required files available in the repository", "repository"],
          ]}
        />
      </TaskHeader>

      <DocSection task={T} section="overview">
        <Prose>
          <p>
            <strong>Objective:</strong> control a real 230 V bulb from anywhere on the internet using a cloud dashboard, with the
            ESP32 listening for commands over MQTT.
          </p>
          <p>
            <strong>Problem being solved:</strong> Task 1 only worked on the same Wi-Fi, because the browser had to reach the
            ESP32&apos;s local IP directly. Here neither side needs to know where the other is: both connect out to a broker on the
            internet (Adafruit IO), so the dashboard works from mobile data, another city, anywhere.
          </p>
          <p>
            <strong>Summary:</strong> I created a feed called <C>esp</C> and a dashboard with a Toggle block linked to it. Flipping
            the toggle publishes &ldquo;ON&rdquo; or &ldquo;OFF&rdquo; to the feed. The ESP32 is subscribed to the same feed, so the
            message arrives in <C>handleESPMessage()</C> within about a second, which drives GPIO 26 → relay → bulb.
          </p>
        </Prose>
      </DocSection>

      <DocSection task={T} section="concepts">
        <Sub>Purpose of Adafruit IO in an IoT system</Sub>
        <Prose>
          <p>
            Adafruit IO is a ready-made IoT cloud service. It gives me three things I would otherwise have to build and host myself:
            an <strong>MQTT broker</strong> that devices can connect to from anywhere, <strong>feeds</strong> that store every value
            sent (so I can see the history of ON/OFF commands), and <strong>dashboards</strong> — drag-and-drop control panels
            (toggles, gauges, charts) that publish to and display those feeds in the browser. In this project it sits in the middle
            between the person pressing a button and the ESP32 switching the relay.
          </p>
        </Prose>

        <Sub>Basic concept of MQTT</Sub>
        <Prose>
          <p>
            MQTT is a lightweight <strong>publish / subscribe</strong> messaging protocol made for small devices and unreliable
            networks. Instead of a client asking a server for data (HTTP request → response), devices keep one long-lived TCP
            connection open to a central <strong>broker</strong>. A device <em>publishes</em> a short message to a named
            <em> topic</em>, and the broker immediately pushes it to every device that has <em>subscribed</em> to that topic.
            Senders and receivers never talk directly and do not need each other&apos;s IP address. Messages have a tiny header
            (as little as 2 bytes), so it suits battery-powered and low-bandwidth devices.
          </p>
        </Prose>

        <Sub>Publisher, Subscriber and Broker in my system</Sub>
        <DataTable
          head={["MQTT role", "In my project", "What it does"]}
          rows={[
            ["Publisher", "Adafruit IO dashboard Toggle block (and IFTTT in Task 3)", "Publishes \"ON\" / \"OFF\" to the esp feed when flipped"],
            ["Broker", "Adafruit IO — io.adafruit.com, port 8883 (TLS) / 1883", "Receives every message, stores it in the feed and forwards it to all subscribers"],
            ["Subscriber", "ESP32 running task2_mqtt_relay.ino", "Subscribed to <username>/feeds/esp; switches the relay on each message"],
          ]}
        />

        <Sub>Role of an MQTT topic / feed</Sub>
        <Prose>
          <p>
            A topic is the &ldquo;address&rdquo; a message is sent to — the broker uses it to decide who receives what. On Adafruit IO
            every <strong>feed</strong> is a topic plus a stored history. My feed <C>esp</C> becomes the MQTT topic
            <C>&lt;username&gt;/feeds/esp</C>. Anything published there reaches the ESP32, and anything the ESP32 publishes there
            would show up on the dashboard. Using one feed per device keeps commands for different appliances separate.
          </p>
        </Prose>
      </DocSection>

      <DocSection task={T} section="design">
        <Flow
          nodes={[
            { title: "User", detail: "flips the Bulb toggle" },
            { title: "Adafruit IO dashboard", detail: "publisher" },
            { title: "Adafruit IO broker", detail: "feed esp stores value" },
            { title: "ESP32", detail: "subscriber · handleESPMessage()" },
            { title: "Relay → bulb", detail: "GPIO 26 HIGH = ON" },
          ]}
          edges={["browser", "publish \"ON\"", "MQTT push", "digitalWrite"]}
          caption="Communication flow. The ESP32 and the browser each connect outward to the broker, so no port forwarding or public IP is needed."
        />
        <Sub>MQTT topic / feed structure used</Sub>
        <DataTable
          head={["Item", "Value"]}
          rows={[
            ["Broker host", <C key="h">io.adafruit.com</C>],
            ["Port", "8883 (MQTT over TLS) — 1883 unencrypted"],
            ["MQTT username / password", "Adafruit IO username / Adafruit IO Key"],
            ["Feed name / key", <C key="f">esp</C>],
            ["Full topic", <C key="t">&lt;username&gt;/feeds/esp</C>],
            ["Payloads", <><C>ON</C> or <C>OFF</C> (plain text)</>],
            ["Last-value topic", <><C>&lt;username&gt;/feeds/esp/get</C> — used by <C>esp-&gt;get()</C> at boot</>],
            ["Free-tier limit", "30 data points per minute, 10 feeds, 5 dashboards, 30 days of history"],
          ]}
        />
      </DocSection>

      <DocSection task={T} section="hardware">
        <DataTable
          head={["Hardware", "Purpose"]}
          rows={[
            ["ESP32 DevKit V1", "Wi-Fi MQTT client; drives the relay"],
            ["5 V single-channel relay module (active-HIGH)", "Lets a 3.3 V GPIO signal switch a 230 V circuit, with isolation"],
            ["230 V incandescent bulb + holder", "The load being controlled"],
            ["Mains plug, cable and screw terminals", "Live through the relay, neutral direct to the bulb"],
            ["Jumper wires + micro-USB cable", "Low-voltage connections and power"],
          ]}
        />
        <DataTable
          head={["Software / service", "Purpose"]}
          rows={[
            ["Arduino IDE + ESP32 core", "Firmware development and upload"],
            ["Adafruit IO Arduino library", "Wraps Wi-Fi + MQTT: io.connect(), io.feed(), onMessage(), io.run()"],
            ["Adafruit MQTT Library", "Installed as a dependency; the actual MQTT client"],
            ["Adafruit IO (io.adafruit.com)", "Broker, feed storage and dashboard"],
            ["Phone / laptop browser", "Opens the dashboard from any network"],
          ]}
        />
      </DocSection>

      <DocSection task={T} section="wiring">
        <Figure caption="Wiring diagram — low-voltage control on the left, the switched 230 V circuit on the right. Only the live wire goes through the relay.">
          <Task2Wiring />
        </Figure>
        <DataTable
          head={["From", "To", "Notes"]}
          rows={[
            ["ESP32 VIN (5 V)", "Relay VCC", "Relay coil needs 5 V"],
            ["ESP32 GND", "Relay GND", "Common ground"],
            ["ESP32 GPIO 26", "Relay IN", "HIGH = relay energised = bulb ON (active-HIGH module)"],
            ["Mains live (L)", "Relay COM", "Screw terminal"],
            ["Relay NO", "Bulb", "Normally Open: bulb is off until the relay closes"],
            ["Bulb", "Mains neutral (N)", "Neutral is never switched"],
          ]}
        />
        <Callout tone="warn" title="High-voltage safety">
          All mains connections are in the relay&apos;s screw terminals and the bulb holder, insulated, and wired only while unplugged.
          Using NO (not NC) means the bulb is off whenever the ESP32 is unpowered or resetting.
        </Callout>
      </DocSection>

      <DocSection task={T} section="implementation">
        <Sub>Complete ESP32 source code</Sub>
        <SourceFile path={`${FOLDER}/task2_mqtt_relay/task2_mqtt_relay.ino`} />
        <Sub>Explanation of important code sections</Sub>
        <DataTable
          head={["Code", "What it does"]}
          rows={[
            [<C key="a">AdafruitIO_WiFi io(USER, KEY, SSID, PASS)</C>, "One object that handles both the Wi-Fi connection and the MQTT connection to io.adafruit.com."],
            [<C key="b">io.feed(&quot;esp&quot;)</C>, "Gets a handle to my feed; the library subscribes to <username>/feeds/esp."],
            [<C key="c">esp-&gt;onMessage(handleESPMessage)</C>, "Registers the callback before connecting, so no message is missed."],
            [<C key="d">command.trim(); command.toUpperCase();</C>, "Cleans the payload so \" on\" or \"on\" still matches \"ON\"."],
            [<C key="e">digitalWrite(RELAY_PIN, RELAY_ON)</C>, "Energises the relay coil; COM connects to NO and the bulb lights."],
            [<C key="f">while (io.status() &lt; AIO_CONNECTED)</C>, "Waits until both Wi-Fi and MQTT are up before continuing."],
            [<C key="g">esp-&gt;get()</C>, "Asks the broker for the feed's last value, so after a reboot the bulb matches the dashboard."],
            [<C key="h">io.run()</C>, "Must run every loop: keeps the connection alive (ping) and delivers incoming messages to the callback."],
          ]}
        />
      </DocSection>

      <DocSection task={T} section="configuration">
        <Sub>Adafruit IO account</Sub>
        <Steps
          items={[
            <>Went to <strong>io.adafruit.com</strong> → <em>Get Started for Free</em> → created an Adafruit account (email, username, password) and verified the email.</>,
            <>Signed in to Adafruit IO and opened the yellow <strong>key icon</strong> (&ldquo;My Key&rdquo;) to copy my <strong>Username</strong> and <strong>Active Key</strong>.</>,
            <>Pasted them into <C>IO_USERNAME</C> and <C>IO_KEY</C> in the sketch. The key acts as the MQTT password, so it is never committed to GitHub.</>,
          ]}
        />
        <Sub>Feed configuration</Sub>
        <Steps
          items={[
            <><em>Feeds → New Feed</em> → name <C>esp</C> → Create. Adafruit IO gives it the key <C>esp</C>, i.e. topic <C>&lt;username&gt;/feeds/esp</C>.</>,
            <>Left the feed private (only my key can read / write it) with history on, so every ON/OFF is logged with a timestamp.</>,
          ]}
        />
        <Sub>Dashboard configuration</Sub>
        <Steps
          items={[
            <><em>Dashboards → New Dashboard</em> → name &ldquo;Smart Bulb&rdquo; → open it.</>,
            <>Gear icon → <em>Create New Block</em> → <strong>Toggle</strong> → connect it to feed <C>esp</C>.</>,
            <>Block settings: title &ldquo;Bulb&rdquo;, <strong>Button On Text</strong> = <C>ON</C>, <strong>Button Off Text</strong> = <C>OFF</C> — exactly the strings the firmware compares.</>,
            <>Added a <strong>Stream</strong> block on the same feed to watch messages arrive live, which was useful for debugging.</>,
          ]}
        />
        <DashboardLayout />
      </DocSection>

      <DocSection task={T} section="evidence">
        <EvidenceGroup
          title="Screenshots of the Adafruit IO dashboard and feed"
          items={[
            { src: "/media/iot/task2/adafruit-dashboard", label: "Adafruit IO dashboard — Bulb toggle linked to feed esp", fit: "contain" },
            { src: "/media/iot/task2/adafruit-feed", label: "Feed esp — history of ON / OFF values with timestamps", fit: "contain" },
            { src: "/media/iot/task2/adafruit-toggle-settings", label: "Toggle block settings — ON text “ON”, OFF text “OFF”", fit: "contain" },
            { src: "/media/iot/task2/serial-monitor", label: "Serial Monitor — “Received from feed: ON / BULB -> ON”", fit: "contain" },
          ]}
        />
        <EvidenceGroup
          title="Photographs of the hardware setup & bulb control through the cloud"
          narrow
          items={[
            { src: "/media/iot/task2/relay-bulb-off-frame.jpg", label: "Toggle OFF on the phone — relay open, bulb off", aspectRatio: "auto" },
            { src: "/media/iot/task2/relay-bulb-on-frame.jpg", label: "Toggle ON on the phone — relay closed, bulb lit", aspectRatio: "auto" },
          ]}
        />
        <Prose>
          <p>
            Both stills are from the demo video: the phone (on its own network) flips the dashboard toggle, and the bulb wired through
            the relay next to the laptop switches. The brief asks for &ldquo;LED control&rdquo;; I used the same signal to drive a relay
            and a real bulb instead (the relay module&apos;s own indicator LED also lights with it).
          </p>
        </Prose>
        <Sub>Working demonstration video</Sub>
        <div className="md:max-w-sm">
          <Evidence type="video" src="/media/iot/task2/demo.mp4" label="Task 2 demo — dashboard toggle → MQTT → relay → 230 V bulb" aspectRatio="auto" />
        </div>
      </DocSection>

      <DocSection task={T} section="challenges">
        <DataTable
          head={["Problem during MQTT / cloud setup", "Cause", "Solution implemented"]}
          rows={[
            [
              "Sketch would not compile: “invalid use of void expression”",
              "I wrote command.trim().toUpperCase(); both modify the String in place and return void, so they cannot be chained.",
              "Split into two statements: command.trim(); command.toUpperCase();",
            ],
            [
              "Serial Monitor stuck printing dots after “Connecting to Adafruit IO”",
              "Wi-Fi was fine but MQTT login failed — the username is case-sensitive and the password must be the AIO Key, not my account password.",
              "Copied both values from the “My Key” panel and printed io.statusText() to see which stage failed.",
            ],
            [
              "After a reboot the bulb was OFF while the dashboard toggle still showed ON",
              "MQTT only delivers new messages; Adafruit IO does not support the retain flag, so nothing was resent on reconnect.",
              "Called esp->get() after connecting; Adafruit IO then republishes the last value to the ESP32 only.",
            ],
            [
              "Toggle flipped but the bulb did not react",
              "The block's ON/OFF text must exactly match what the firmware compares.",
              "Set the texts to ON / OFF and normalised the payload with trim() + toUpperCase().",
            ],
            [
              "Messages throttled when clicking the toggle very fast while testing",
              "The free plan allows 30 data points per minute; too many rejected publishes cause a temporary ban.",
              "Tested at a normal pace; one feed and plain ON/OFF payloads keep usage far below the limit.",
            ],
          ]}
        />
      </DocSection>

      <DocSection task={T} section="reflection">
        <Prose>
          <p>
            The jump from HTTP to MQTT changed how I think about connecting devices. In Task 1 the browser had to find the ESP32; here
            nobody finds anybody — both sides connect out to the broker and just agree on a topic name. That is why it suddenly works
            from mobile data, and why adding a second controller (IFTTT in Task 3) needs no firmware change at all.
          </p>
          <p>
            I also learned to respect the boring details: case-sensitive usernames, exact payload strings, rate limits, and what happens
            after a reboot. And wiring a relay to mains made me plan the circuit before touching anything — the low-voltage and 230 V
            sides really are two separate worlds connected only through the relay.
          </p>
        </Prose>
      </DocSection>

      <DocSection task={T} section="repository">
        <RepoCard
          url={repoTreeUrl(FOLDER)}
          folder={`iot-projects/${FOLDER}`}
          files={[{ name: "task2_mqtt_relay/task2_mqtt_relay.ino", note: "Complete ESP32 MQTT subscriber + relay sketch" }]}
        />
        <Bullets items={[<>Replace <C>YOUR_ADAFRUIT_IO_USERNAME</C> and <C>YOUR_ADAFRUIT_IO_KEY</C>; the library is &ldquo;Adafruit IO Arduino&rdquo; in Library Manager.</>]} />
      </DocSection>
    </article>
  );
}
