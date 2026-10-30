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

const T = 3;
const FOLDER = "task3-ifttt-automation";

export default function Task3() {
  return (
    <article id="task3" className="scroll-mt-28 border-t border-base-border pt-16 mb-28">
      <TaskHeader task={T} title="IFTTT + Adafruit IO IoT Automation" meta="IFTTT · Google Assistant · Adafruit IO action · MQTT · Day 3">
        <ChecklistIndex
          task={T}
          items={[
            ["Objective of the IoT automation", "overview"],
            ["Basic concept of IoT automation", "concepts"],
            ["What IFTTT is and why it is used", "concepts"],
            ["Trigger → Action concept explained", "concepts"],
            ["Role of Adafruit IO in the automation", "concepts"],
            ["Hardware and software used", "hardware"],
            ["IFTTT Applet / workflow created and documented", "configuration"],
            ["Trigger used identified", "configuration"],
            ["Action performed identified", "configuration"],
            ["How the trigger reaches the IoT system", "design"],
            ["Communication / data-flow diagram", "design"],
            ["ESP32 source code", "implementation"],
            ["Screenshots of the IFTTT configuration", "evidence"],
            ["Screenshots of the Adafruit IO dashboard / feed", "evidence"],
            ["Photographs of the working prototype", "evidence"],
            ["Video demonstrating the complete automation", "evidence"],
            ["Automation tested under different conditions", "evidence"],
            ["Problems and their solutions documented", "challenges"],
            ["What I learned about cloud-based automation", "reflection"],
            ["Brief reflection on the assignment", "reflection"],
          ]}
        />
      </TaskHeader>

      <DocSection task={T} section="overview">
        <Prose>
          <p>
            <strong>Objective:</strong> switch the Task 2 bulb with a voice command — &ldquo;Hey Google, activate Bulb On&rdquo; —
            by chaining Google Assistant → IFTTT → Adafruit IO → ESP32, without writing a server and without changing the ESP32 code.
          </p>
          <p>
            <strong>Problem being solved:</strong> a dashboard still needs someone to open an app and tap a button. Automation means an
            <em> event</em> (a spoken phrase here; it could be a time, a location or a weather change) causes the action automatically.
            IFTTT connects services that do not know about each other, and Adafruit IO is the bridge into my hardware.
          </p>
        </Prose>
      </DocSection>

      <DocSection task={T} section="concepts">
        <Sub>Basic concept of IoT automation</Sub>
        <Prose>
          <p>
            IoT automation is a device acting on its own when a condition becomes true, instead of a person pressing a button each time.
            Every automation has the same three parts: a <strong>trigger</strong> (something that happens), optional
            <strong> conditions</strong>, and an <strong>action</strong> on a real device. Lights turning on at sunset, a fan starting
            when temperature passes 30 °C, or my bulb switching when I speak a phrase are all the same pattern.
          </p>
        </Prose>

        <Sub>What IFTTT is and why it is used</Sub>
        <Prose>
          <p>
            IFTTT (&ldquo;If This Then That&rdquo;) is a cloud automation service that links hundreds of apps and devices — Google
            Assistant, Gmail, weather, Webhooks, Adafruit and more. You build an <strong>Applet</strong> by choosing one service as the
            &ldquo;If This&rdquo; trigger and another as the &ldquo;Then That&rdquo; action. I used it because Google Assistant has no
            direct link to Adafruit IO, and IFTTT lets me join them in a few minutes with no code and no server of my own.
          </p>
        </Prose>

        <Sub>Trigger → Action</Sub>
        <DataTable
          head={["Part", "Meaning", "In my applet"]}
          rows={[
            ["Trigger (If This)", "The event IFTTT watches for", "Google Assistant: “Activate scene” → scene “Bulb On”"],
            ["Action (Then That)", "What IFTTT does when the trigger fires", "Adafruit: Send data to Adafruit IO — feed_name esp, data ON"],
            ["Result", "What happens in the physical world", "Adafruit IO pushes ON over MQTT → ESP32 → relay → bulb lights"],
          ]}
        />

        <Sub>Role of Adafruit IO in the automation</Sub>
        <Prose>
          <p>
            Adafruit IO is the translator between the web world and the device world. IFTTT can only make HTTP requests, but my ESP32
            listens on MQTT. Adafruit IO accepts the HTTP POST on its REST API, stores the value in the <C>esp</C> feed, and
            immediately publishes it on the MQTT topic <C>&lt;username&gt;/feeds/esp</C> that the ESP32 subscribes to. It also keeps
            the history, so I can see whether a voice command actually reached the cloud when debugging.
          </p>
        </Prose>
      </DocSection>

      <DocSection task={T} section="design">
        <Flow
          nodes={[
            { title: "Voice", detail: "“Hey Google, activate Bulb On”" },
            { title: "Google Assistant", detail: "recognises the scene" },
            { title: "IFTTT applet", detail: "trigger fires" },
            { title: "Adafruit IO REST API", detail: "POST /feeds/esp/data" },
            { title: "Adafruit IO broker", detail: "MQTT publish" },
            { title: "ESP32 → relay", detail: "bulb ON" },
          ]}
          edges={["speech", "scene event", "Adafruit IO API", "store in feed", "MQTT push"]}
          caption="Communication / data-flow diagram. The dashboard toggle from Task 2 writes into the same feed, so voice and dashboard control stay in sync."
        />
        <Sub>How the trigger reaches the IoT system</Sub>
        <Steps
          items={[
            <>I say &ldquo;Hey Google, activate Bulb On&rdquo;. Google Assistant matches the phrase to the scene <em>Bulb On</em>, which IFTTT created in my linked Google account.</>,
            <>Google notifies IFTTT that the scene was activated, which fires the <strong>Bulb On</strong> applet&apos;s trigger.</>,
            <>The applet&apos;s action, <strong>Send data to Adafruit IO</strong>, calls the Adafruit IO API with <C>feed_name = esp</C> and <C>data = ON</C> (equivalent to <C>POST /api/v2/&lt;username&gt;/feeds/esp/data</C> with my key — see the test script).</>,
            <>Adafruit IO checks the key, saves &ldquo;ON&rdquo; as a new data point in the <C>esp</C> feed, and publishes it on the MQTT topic <C>&lt;username&gt;/feeds/esp</C>.</>,
            <>The ESP32, already subscribed since boot, receives it in <C>handleESPMessage()</C> and sets GPIO 26 HIGH. The relay clicks and the bulb lights, roughly 2–3 seconds after I finish speaking.</>,
          ]}
        />
      </DocSection>

      <DocSection task={T} section="hardware">
        <Prose>
          <p>The hardware is exactly the Task 2 prototype — that is the point: the automation lives entirely in the cloud.</p>
        </Prose>
        <DataTable
          head={["Hardware / software", "Purpose"]}
          rows={[
            ["ESP32 DevKit V1 + 5 V relay + 230 V bulb", "Same circuit as Task 2 (GPIO 26 → relay IN)"],
            ["Phone with Google Assistant", "Voice input; the same Google account is linked to IFTTT"],
            ["IFTTT account (ifttt.com / app)", "Hosts the two applets"],
            ["Google Assistant service on IFTTT", "Trigger: Activate scene"],
            ["Adafruit service on IFTTT", "Action: Send data to Adafruit IO"],
            ["Adafruit IO (feed esp)", "REST API in, MQTT out"],
            ["Arduino IDE + Adafruit IO Arduino library", "ESP32 firmware (unchanged from Task 2)"],
          ]}
        />
      </DocSection>

      <DocSection task={T} section="wiring">
        <Figure caption="Same wiring as Task 2 — no hardware change was needed for voice control.">
          <Task2Wiring />
        </Figure>
      </DocSection>

      <DocSection task={T} section="implementation">
        <Sub>ESP32 source code</Sub>
        <Prose>
          <p>
            Identical to Task 2. The ESP32 does not know or care whether a value in the feed came from the dashboard or from IFTTT — it
            just reacts to &ldquo;ON&rdquo; / &ldquo;OFF&rdquo;. <C>toUpperCase()</C> matters more here, because a webhook body typed
            by hand could easily say &ldquo;on&rdquo;.
          </p>
        </Prose>
        <SourceFile path={`${FOLDER}/task3_ifttt_relay/task3_ifttt_relay.ino`} />
        <Sub>The exact request IFTTT sends (test script)</Sub>
        <Prose>
          <p>
            To test the cloud half of the chain without speaking, this script sends the same request the applet&apos;s action makes (a POST to the feed&apos;s data endpoint).
          </p>
        </Prose>
        <SourceFile path={`${FOLDER}/ifttt/simulate_ifttt.sh`} />
      </DocSection>

      <DocSection task={T} section="configuration">
        <Sub>IFTTT applet / workflow</Sub>
        <Steps
          items={[
            <>ifttt.com → <em>Create</em> → <strong>If This</strong> → search <em>Google Assistant</em> → connect my Google account.</>,
            <>Trigger <strong>&ldquo;Activate scene&rdquo;</strong> → scene name <C>Bulb On</C>. IFTTT adds the scene to Google Home, so the phrase is &ldquo;Hey Google, activate Bulb On&rdquo;.</>,
            <><strong>Then That</strong> → search <em>Adafruit</em> → connect my Adafruit IO account → <strong>&ldquo;Send data to Adafruit IO&rdquo;</strong>.</>,
            <>Action fields: <C>feed_name</C> = <C>esp</C> (the feed from Task 2), <C>data</C> = <C>ON</C>.</>,
            <>Create action → Finish. IFTTT titles it &ldquo;If you say &lsquo;Okay Google, activate Bulb On&rsquo;, then Send data to esp feed&rdquo; and shows it as <strong>Connected</strong>.</>,
            <>Repeated for a second applet <strong>Bulb Off</strong> with scene <C>Bulb Off</C> and <C>data</C> = <C>OFF</C>.</>,
          ]}
        />
        <Sub>Trigger used and action performed</Sub>
        <DataTable
          head={["Applet", "Trigger (If This)", "Action (Then That)", "Effect"]}
          rows={[
            ["Bulb On", "Google Assistant · Activate scene “Bulb On”", "Adafruit · Send data to Adafruit IO — feed_name esp, data ON", "Bulb turns ON"],
            ["Bulb Off", "Google Assistant · Activate scene “Bulb Off”", "Adafruit · Send data to Adafruit IO — feed_name esp, data OFF", "Bulb turns OFF"],
          ]}
        />
        <SourceFile path={`${FOLDER}/ifttt/applet-bulb-on.json`} title="applet-bulb-on.json — applet settings (key replaced)" />
        <Callout title="Team setup and alternative action">
          The IFTTT applets and the Adafruit IO account were set up together with my teammate Arjun, so the screenshots below show his
          IFTTT account (<C>arjunjr101</C>) and our shared Adafruit IO account (<C>johnwick221</C>). They are unedited. An IFTTT
          Webhooks action that POSTs to the feed&apos;s REST endpoint does the same job; <C>applet-bulb-on.json</C> and
          <C>simulate_ifttt.sh</C> document that equivalent request.
        </Callout>
      </DocSection>

      <DocSection task={T} section="evidence">
        <EvidenceGroup
          title="Screenshots of the IFTTT configuration"
          items={[
            { src: "/media/iot/task3/ifttt-applets", label: "IFTTT applet — “If you say ‘Okay Google, activate Bulb On’, then Send data to esp feed” (Connected)", fit: "contain" },
            { src: "/media/iot/task3/ifttt-trigger", label: "How it works — If: Google Assistant “Activate scene”; Then: Send data to Adafruit IO (feed_name, data)", fit: "contain" },
            { src: "/media/iot/task3/ifttt-activity", label: "Applet activity — connected Sep 10, 2026, run 4 times", fit: "contain" },
          ]}
        />
        <EvidenceGroup
          title="Screenshots of the Adafruit IO dashboard / feed"
          items={[
            { src: "/media/iot/task3/adafruit-feed", label: "Feed esp — values written by IFTTT arriving in the history", fit: "contain" },
            { src: "/media/iot/task2/adafruit-dashboard", label: "My Adafruit IO dashboard “esp bulb” — the same feed that IFTTT writes to", fit: "contain" },
          ]}
        />
        <EvidenceGroup
          title="Photographs of the working prototype"
          narrow
          items={[
            { src: "/media/iot/task2/relay-bulb-off-frame.jpg", label: "Prototype — bulb OFF", aspectRatio: "auto" },
            { src: "/media/iot/task2/relay-bulb-on-frame.jpg", label: "Prototype — bulb ON after the command", aspectRatio: "auto" },
          ]}
        />
        <EvidenceGroup
          title="Video demonstrating the complete automation"
          narrow
          items={[
            { type: "video", src: "/media/iot/task3/voice-demo", label: "Voice command → IFTTT → Adafruit IO → ESP32 → bulb", aspectRatio: "auto" },
            { type: "video", src: "/media/iot/task3/demo.mp4", label: "Task 3 demo — cloud command switching the relay and bulb", aspectRatio: "auto" },
          ]}
        />

        <Sub>Automation tested under different conditions</Sub>
        <Prose>
          <p>
            Test 1 was run and is recorded in the demo video and the applet&apos;s activity log (run 4 times). Tests 2–7 are the other
            conditions I planned for; they show the behaviour I expect from how the chain is built, and I have not recorded results for
            them yet.
          </p>
        </Prose>
        <DataTable
          head={["#", "Condition", "Status", "Expected behaviour and why"]}
          rows={[
            ["1", "“Activate Bulb On” with the bulb off", "Tested — demo video, activity log", "Bulb turns on after a couple of seconds: scene → applet → Adafruit IO → MQTT → relay."],
            ["2", "“Activate Bulb On” when it is already on", "Expected", "No visible change; another ON appears in the feed. ON just sets the relay HIGH again."],
            ["3", "Phone on mobile data, ESP32 on the lab hotspot", "Expected", "Still works, because everything goes through the cloud."],
            ["4", "Voice ON, then dashboard OFF, then voice ON", "Expected", "The bulb follows the latest command: both write to the same feed and the last value wins."],
            ["5", "ESP32 powered off while the command is given, then powered on", "Expected", "Bulb comes on after boot: the value is kept in the feed and esp->get() fetches it."],
            ["6", "simulate_ifttt.sh ON / OFF from a laptop", "Expected", "Bulb switches without Google or IFTTT, which isolates the Adafruit IO → ESP32 half."],
            ["7", "A phrase that is not a scene name", "Expected", "Nothing is published and the bulb is unchanged, because the trigger never fires."],
          ]}
        />
      </DocSection>

      <DocSection task={T} section="challenges">
        <DataTable
          head={["Problem", "Cause", "Solution"]}
          rows={[
            [
              "Could not find a “Say a phrase” trigger for Google Assistant",
              "IFTTT's current Google Assistant service only offers “Activate scene”.",
              "Created scenes named Bulb On / Bulb Off, so the commands became “Hey Google, activate Bulb On / Off”.",
            ],
            [
              "Applet ran but the feed did not change",
              "The action only works if feed_name matches the feed key exactly (esp) and data is exactly ON or OFF.",
              "Set feed_name to esp and data to ON / OFF, then checked the applet's activity and the esp feed history to confirm the value arrived.",
            ],
            [
              "Hard to tell which link in the chain failed",
              "Five services in a row; a silent failure anywhere looks the same — the bulb does not move.",
              "Tested one link at a time: Adafruit IO feed history (did the cloud get it?), simulate_ifttt.sh (does the ESP32 react?), then the voice phrase.",
            ],
            [
              "Noticeable delay compared with the dashboard",
              "Voice recognition plus IFTTT's trigger processing add a couple of seconds.",
              "Accepted for lighting (about 2–3 s); the dashboard remains the fast path.",
            ],
          ]}
        />
      </DocSection>

      <DocSection task={T} section="reflection">
        <Sub>What I learned about cloud-based automation</Sub>
        <Prose>
          <p>
            Cloud automation is built from small services that each do one job and talk over standard interfaces — HTTP webhooks in,
            MQTT out. Because the ESP32 only listens to a feed, I could add a completely new way of controlling it without touching
            its firmware. That loose coupling is what makes these systems easy to extend, but it also makes them fragile: the bulb
            now depends on Google, IFTTT and Adafruit IO all being up, and on my keys being correct.
          </p>
        </Prose>
        <Sub>Reflection on the assignment</Sub>
        <Prose>
          <p>
            Saying a sentence and watching a mains bulb switch was the most satisfying moment of the session, but the real lesson was
            in debugging. With five links in the chain, I learned to test one link at a time and use the feed history as a checkpoint.
            If I extended this, I would add time-based applets (lights on at sunset) and send a notification back when the bulb changes.
          </p>
        </Prose>
      </DocSection>

      <DocSection task={T} section="repository">
        <RepoCard
          url={repoTreeUrl(FOLDER)}
          folder={`iot-projects/${FOLDER}`}
          files={[
            { name: "task3_ifttt_relay/task3_ifttt_relay.ino", note: "ESP32 firmware (same as Task 2)" },
            { name: "ifttt/applet-bulb-on.json", note: "Bulb On applet: trigger + webhook settings" },
            { name: "ifttt/applet-bulb-off.json", note: "Bulb Off applet" },
            { name: "ifttt/simulate_ifttt.sh", note: "Sends the same POST as IFTTT, for testing" },
          ]}
        />
        <Bullets items={["The AIO key is a placeholder in every file — keep the real key only in IFTTT and the sketch you flash."]} />
      </DocSection>
    </article>
  );
}
