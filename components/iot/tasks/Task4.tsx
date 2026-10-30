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
import { SmartHomeWiring } from "@/components/iot/diagrams";
import { repoTreeUrl } from "@/lib/iot-repo";

const T = 4;
const FOLDER = "task4-firebase-dashboard";

export default function Task4() {
  return (
    <article id="task4" className="scroll-mt-28 border-t border-base-border pt-16 mb-28">
      <TaskHeader task={T} title="Firebase IoT Monitoring Dashboard" meta="Firebase Realtime Database · Firebase Authentication · DHT11 · LDR · Relay · Day 4">
        <ChecklistIndex
          task={T}
          items={[
            ["Objective of the Firebase IoT monitoring system", "overview"],
            ["Basic concept of Cloud Computing", "concepts"],
            ["IaaS, PaaS, SaaS and BaaS explained", "concepts"],
            ["What a Cloud Platform is", "concepts"],
            ["What a Database is", "concepts"],
            ["Firebase Realtime Database explained", "concepts"],
            ["What a Cloud-Based Dashboard is", "concepts"],
            ["Authentication and the purpose of a login system", "concepts"],
            ["Difference between Authentication and Authorization", "concepts"],
            ["Firebase project setup documented", "configuration"],
            ["Firebase Authentication configuration documented", "configuration"],
            ["Realtime Database structure documented", "design"],
            ["Database / data-flow architecture", "design"],
            ["DHT11 sensor connection documented", "wiring"],
            ["Temperature and humidity data displayed on the dashboard", "evidence"],
            ["LDR sensor and its purpose documented", "hardware"],
            ["Bulb ON/OFF control from the dashboard implemented", "implementation"],
            ["Communication flow between ESP32, Firebase and dashboard", "design"],
            ["Complete ESP32 source code", "implementation"],
            ["Complete dashboard source code", "implementation"],
            ["Screenshots of the login page", "evidence"],
            ["Screenshots of the Firebase database", "evidence"],
            ["Screenshots of the working dashboard", "evidence"],
            ["Photographs of the physical prototype", "evidence"],
            ["Video demonstrating monitoring, control and the webpage workflow", "evidence"],
            ["Problems encountered and their solutions", "challenges"],
            ["Brief reflection on the assignment", "reflection"],
          ]}
        />
      </TaskHeader>

      <DocSection task={T} section="overview">
        <Prose>
          <p>
            <strong>Objective:</strong> build a login-protected web dashboard that shows live temperature, humidity and light level
            from the ESP32 and lets me switch the bulb, with Firebase as the cloud backend in between.
          </p>
          <p>
            <strong>Problem being solved:</strong> Adafruit IO gave me remote control but only fixed dashboard blocks, and anyone with
            the link-level access could see it. I wanted my own dashboard design, my own data structure, real sensor monitoring and a
            proper login — without writing and hosting a backend server.
          </p>
          <p>
            <strong>Summary:</strong> the ESP32 (DHT11 on GPIO 27, LDR on GPIO 34, relay on GPIO 26) signs in to Firebase with a device
            account, writes a reading every 3 seconds and checks the bulb command every second. My SmartHome web app has a login page
            (<C>index.html</C>) and a dashboard (<C>dashboard.html</C>) that listens to the same database paths, so values appear
            within moments and a Turn ON click reaches the relay in about a second.
          </p>
        </Prose>
      </DocSection>

      <DocSection task={T} section="concepts">
        <Sub>Cloud computing</Sub>
        <Prose>
          <p>
            Cloud computing means using someone else&apos;s computers over the internet — storage, databases, processing — and paying
            for (or getting free) only what you use, instead of owning and running servers. For this project it solves a practical
            problem: the ESP32 cannot host a database that a browser anywhere in the world can reach and that several clients update at
            once. A cloud provider keeps that database online 24/7, reachable from any network.
          </p>
        </Prose>

        <Sub>IaaS, PaaS, SaaS and BaaS</Sub>
        <DataTable
          head={["Model", "What the provider manages", "What I manage", "Example"]}
          rows={[
            ["IaaS — Infrastructure as a Service", "Virtual machines, storage, networking", "Operating system, runtime, my app, scaling", "AWS EC2, Google Compute Engine"],
            ["PaaS — Platform as a Service", "Servers + OS + runtime", "My application code", "Google App Engine, Heroku"],
            ["SaaS — Software as a Service", "The whole finished application", "Just using it", "Gmail, IFTTT, the Adafruit IO dashboard"],
            ["BaaS — Backend as a Service", "Ready backend features: database, login, hosting", "Front-end + device code only", "Firebase — what this task uses"],
          ]}
        />
        <Prose>
          <p>
            Firebase is BaaS: I never wrote a server. The browser and the ESP32 both talk directly to Firebase&apos;s database and
            authentication APIs, and Firebase handles storage, sync, scaling and security rules.
          </p>
        </Prose>

        <Sub>What a cloud platform is</Sub>
        <Prose>
          <p>
            A cloud platform is a provider&apos;s whole collection of services under one account — databases, authentication, hosting,
            functions, analytics. Firebase is Google&apos;s platform for app backends. My project <C>iotproject</C> (free Spark plan)
            uses three of its services: <strong>Realtime Database</strong> for data, <strong>Authentication</strong> for login, and
            <strong> Hosting</strong> for the web app.
          </p>
        </Prose>

        <Sub>What a database is</Sub>
        <Prose>
          <p>
            A database is an organised, permanent store of data that programs can write to and read from, usually many at once. Without
            one, a sensor reading would live only in the ESP32&apos;s RAM (gone on reset) or in one browser tab. With Firebase, every
            reading and every command is stored centrally, survives restarts and is visible to the ESP32, the dashboard and the Firebase
            console at the same time.
          </p>
        </Prose>

        <Sub>Firebase Realtime Database</Sub>
        <Prose>
          <p>
            Firebase Realtime Database (RTDB) is a cloud NoSQL database that stores everything as one big <strong>JSON tree</strong>
            rather than tables. Each piece of data has a path like <C>smarthome/devices/esp32_001/status</C>. Its key feature is in the
            name: clients attach <strong>listeners</strong> to a path (<C>ref.on(&quot;value&quot;, …)</C> in my dashboard) and RTDB
            pushes every change to them immediately over an open connection, so the page updates without refreshing or polling.
            Writes such as <C>update()</C> in the browser or <C>setJSON()</C> on the ESP32 are delivered to every listener on that path.
          </p>
        </Prose>

        <Sub>What a cloud-based dashboard is</Sub>
        <Prose>
          <p>
            A cloud-based dashboard is a web page that never talks to the device directly — it only reads and writes the shared cloud
            database, and the device does the same from its side. Because of that, the dashboard works from any browser on any network,
            the ESP32 needs no public IP, and both always show the same state. That is the big step up from Task 1, where the page had
            to be on the same Wi-Fi as the board.
          </p>
        </Prose>

        <Sub>Authentication and the purpose of a login system</Sub>
        <Prose>
          <p>
            Authentication proves who is connecting. My dashboard starts at a login page where users sign in (or create an account) with
            email and password through Firebase Authentication; the ESP32 signs in with its own dedicated device account. The login system
            exists so that the database can refuse anyone who has not signed in — without it, anybody who found the database URL could
            read my sensor data or switch the bulb.
          </p>
        </Prose>

        <Sub>Authentication vs Authorization</Sub>
        <DataTable
          head={["", "Authentication", "Authorization"]}
          rows={[
            ["Question", "Who are you?", "What are you allowed to do?"],
            ["When", "Once, at sign-in (dashboard login / ESP32 boot)", "On every single read and write"],
            ["In my project", "Firebase Auth email + password → ID token", <>Security rules: <C key="r">auth != null</C> may read / write</>],
            ["If it fails", "Login page shows the error, no dashboard", "Firebase returns “Permission denied”"],
          ]}
        />
        <Prose>
          <p>
            My rules authorise <em>every</em> signed-in user equally. That is fine for a demo, but since the login page lets anyone
            create an account, real authorisation would need per-user rules (see Task 5 limitations).
          </p>
        </Prose>
      </DocSection>

      <DocSection task={T} section="design">
        <Sub>Database / data-flow architecture</Sub>
        <Flow
          nodes={[
            { title: "DHT11 + LDR", detail: "GPIO 27 · GPIO 34" },
            { title: "ESP32", detail: "reads every 3 s" },
            { title: "Firebase RTDB", detail: "smarthome/sensorData/esp32_001" },
            { title: "Dashboard", detail: "listener → cards, chart, table" },
          ]}
          edges={["sensor data", "setJSON (signed in)", "push on change"]}
          caption="Monitoring path — sensor to screen."
        />
        <Flow
          nodes={[
            { title: "User", detail: "clicks Turn ON" },
            { title: "Dashboard", detail: "setBulb('on')" },
            { title: "Firebase RTDB", detail: "smarthome/devices/esp32_001/status" },
            { title: "ESP32", detail: "reads status every 1 s" },
            { title: "Relay → bulb", detail: "GPIO 26 LOW = ON" },
          ]}
          edges={["click", "update()", "getString()", "digitalWrite"]}
          caption="Control path — screen to bulb. The database is the single source of truth both sides follow."
        />

        <Sub>Communication flow between ESP32, Firebase and dashboard</Sub>
        <Steps
          items={[
            <>At boot the ESP32 joins Wi-Fi, syncs the clock (NTP) and signs in to Firebase Auth with the device account, receiving an ID token that is attached to every request.</>,
            <>The user signs in on <C>index.html</C>; <C>signInWithEmailAndPassword()</C> succeeds and the page redirects to <C>dashboard.html</C>, whose <C>onAuthStateChanged</C> guard sends signed-out visitors back.</>,
            <>The dashboard attaches three listeners: <C>.info/connected</C> (connection badge), <C>smarthome/devices/esp32_001</C> (bulb status, mode, threshold) and <C>smarthome/sensorData/esp32_001</C> (last 20 readings).</>,
            <>Every 3 s the ESP32 writes a reading to <C>sensorData/esp32_001/&lt;timestamp&gt;</C>; Firebase pushes it to the dashboard, which refreshes the cards, chart and table.</>,
            <>Clicking <em>Turn ON</em> calls <C>update({`{ status: "on", lastUpdate: TIMESTAMP }`})</C> on the device node.</>,
            <>Within a second the ESP32&apos;s <C>getString(&quot;…/status&quot;)</C> sees &ldquo;on&rdquo; and drives the active-LOW relay; the next reading logs <C>bulbState: &quot;on&quot;</C>, confirming it on the dashboard.</>,
          ]}
        />

        <Sub>Realtime Database structure</Sub>
        <SourceFile path={`${FOLDER}/database-structure.json`} />
        <DataTable
          head={["Path", "Written by", "Read by", "Contents"]}
          rows={[
            [<C key="a">smarthome/devices/esp32_001/status</C>, "Dashboard (manual) · ESP32 (automatic)", "ESP32, dashboard", "\"on\" | \"off\""],
            [<C key="b">smarthome/devices/esp32_001/mode</C>, "Dashboard", "ESP32, dashboard", "\"manual\" | \"automatic\""],
            [<C key="c">smarthome/devices/esp32_001/ldrThreshold</C>, "Dashboard / console", "ESP32, dashboard", "Integer, default 400"],
            [<C key="d">smarthome/devices/esp32_001/lastUpdate</C>, "Dashboard · ESP32", "—", "Server timestamp of the last command"],
            [<C key="e">smarthome/sensorData/esp32_001/&lt;epoch ms&gt;</C>, "ESP32", "Dashboard", "temperature, humidity, ldr, bulbState, mode"],
          ]}
        />
      </DocSection>

      <DocSection task={T} section="hardware">
        <DataTable
          head={["Component", "Purpose"]}
          rows={[
            ["ESP32 DevKit V1", "Reads the sensors, drives the relay, talks to Firebase over Wi-Fi"],
            ["DHT11 sensor module", "Temperature (0–50 °C, ±2 °C) and humidity (20–90 %, ±5 %) on one digital data pin"],
            ["LDR + 10 kΩ resistor (voltage divider)", "Measures ambient light as a voltage on an ADC pin"],
            ["5 V relay module (active-LOW)", "Switches the 230 V bulb from GPIO 26"],
            ["230 V bulb + holder", "The appliance controlled from the dashboard"],
            ["Breadboard, jumper wires, micro-USB cable", "Connections and power"],
          ]}
        />
        <Sub>The LDR and its purpose</Sub>
        <Prose>
          <p>
            An LDR (light-dependent resistor) changes resistance with light: high in the dark, low in bright light. On its own the ESP32
            cannot measure resistance, so the LDR and a fixed 10 kΩ resistor form a <strong>voltage divider</strong> between 3.3 V and
            GND, with the middle point on GPIO 34. As light changes, the voltage at the middle changes, and <C>analogRead()</C> turns it
            into a number from 0 to 4095 — higher means brighter in my wiring. On the dashboard it is the &ldquo;Ambient Light&rdquo;
            card (1325 under the lab lights in my screenshot). Its purpose is to let the system know when it is dark, which Task 5 uses
            to switch the bulb automatically.
          </p>
        </Prose>
        <DataTable
          head={["Software", "Purpose"]}
          rows={[
            ["Arduino IDE + ESP32 core", "Firmware"],
            ["Firebase ESP Client (mobizt) + FirebaseJson", "Firebase Auth sign-in and RTDB reads / writes from the ESP32"],
            ["DHT sensor library + Adafruit Unified Sensor", "Reading the DHT11"],
            ["Firebase JS SDK 10.13 (compat)", "Auth + Realtime Database in the browser"],
            ["Chart.js 3.9", "Historical sensor chart"],
            ["Firebase console + Firebase CLI", "Project setup, rules, hosting the web app"],
          ]}
        />
      </DocSection>

      <DocSection task={T} section="wiring">
        <Figure caption="Wiring diagram — signals drawn as wires, power drawn as labelled pills (same label = same connection).">
          <SmartHomeWiring />
        </Figure>
        <Sub>DHT11 sensor connection and full pin map</Sub>
        <DataTable
          head={["Component pin", "ESP32 pin", "Notes"]}
          rows={[
            ["DHT11 VCC", "3V3", "Module has its own pull-up resistor on DATA"],
            ["DHT11 DATA", "GPIO 27", "Single-wire digital protocol; read at most every 2 s"],
            ["DHT11 GND", "GND", ""],
            ["LDR (top of divider)", "3V3", ""],
            ["LDR / 10 kΩ junction", "GPIO 34", "ADC1, input-only pin — fine for an analog input"],
            ["10 kΩ (bottom of divider)", "GND", ""],
            ["Relay VCC", "VIN (5 V)", "Coil needs 5 V"],
            ["Relay GND", "GND", "Common ground"],
            ["Relay IN", "GPIO 26", "Active-LOW: LOW = bulb ON; driven HIGH at boot so the bulb starts OFF"],
            ["Relay COM / NO", "Mains live / bulb", "Neutral goes straight to the bulb"],
          ]}
        />
      </DocSection>

      <DocSection task={T} section="implementation">
        <Sub>Complete ESP32 source code</Sub>
        <SourceFile path={`${FOLDER}/firmware/smarthome_esp32/smarthome_esp32.ino`} />
        <DataTable
          head={["Function", "What it does"]}
          rows={[
            [<C key="a">setup()</C>, "Relay OFF, DHT start, Wi-Fi, NTP clock, Firebase sign-in with the device account, then picks up the current mode / threshold / bulb state."],
            [<C key="b">syncFromDashboard()</C>, "Every 1 s: reads mode and ldrThreshold; in manual mode reads status and switches the relay if it changed."],
            [<C key="c">applyBulb()</C>, "Drives the active-LOW relay (LOW = ON) and remembers the state."],
            [<C key="d">logReading()</C>, "Every 3 s: reads DHT11 + LDR, skips the cycle if the DHT returns NaN, writes one JSON row keyed by the timestamp."],
            [<C key="e">timestampKey()</C>, "Epoch time in ms as the key, so the dashboard can show it as a date."],
          ]}
        />

        <Sub>Bulb ON/OFF control from the dashboard</Sub>
        <Prose>
          <p>
            The Turn ON / Turn OFF buttons call <C>setBulb(&apos;on&apos;)</C> / <C>setBulb(&apos;off&apos;)</C>, which write
            <C>status</C> and a server <C>lastUpdate</C> timestamp to <C>smarthome/devices/esp32_001</C>. The device listener updates
            the &ldquo;Status:&rdquo; text, and the ESP32 picks up the new value on its next 1-second check and switches the relay.
          </p>
        </Prose>

        <Sub>Complete dashboard source code</Sub>
        <SourceFile path={`${FOLDER}/web/index.html`} title="index.html — login / create account" />
        <SourceFile path={`${FOLDER}/web/dashboard.html`} title="dashboard.html — live dashboard" />
        <DataTable
          head={["Dashboard code", "What it does"]}
          rows={[
            [<C key="a">auth.onAuthStateChanged()</C>, "Auth guard: no signed-in user → redirect to index.html; otherwise show the email and start the listeners."],
            [<C key="b">db.ref(&quot;.info/connected&quot;)</C>, "Special Firebase path that is true while the browser is connected — drives the “Firebase Connection” badge."],
            [<C key="c">listenDevice()</C>, "Listener on the device node: bulb status, mode text, highlighted mode button, threshold."],
            [<C key="d">listenSensorHistory()</C>, "Listener on the last 20 readings: newest one fills the cards, all of them fill the chart and table."],
            [<C key="e">setBulb() / setMode()</C>, "update() on the device node with a server timestamp; errors are shown to the user."],
          ]}
        />
      </DocSection>

      <DocSection task={T} section="configuration">
        <Sub>Firebase project setup</Sub>
        <Steps
          items={[
            <>console.firebase.google.com → <em>Create a project</em> → name <C>iotproject</C> → Spark (free) plan.</>,
            <><em>Build → Realtime Database → Create database</em> → region → start in <strong>locked mode</strong>, then publish the rules below.</>,
            <><em>Project settings → Your apps → Web (&lt;/&gt;)</em> → registered the web app &ldquo;smart app&rdquo; and copied the <C>firebaseConfig</C> object into both HTML files.</>,
            <>Copied the <strong>Web API key</strong> and <strong>database URL</strong> into <C>API_KEY</C> / <C>DATABASE_URL</C> in the firmware.</>,
            <>Installed the Firebase CLI, ran <C>firebase init hosting</C> in my project folder (files in <C>public/</C>) and <C>firebase deploy</C> to host the dashboard.</>,
          ]}
        />
        <Sub>Firebase Authentication configuration</Sub>
        <Steps
          items={[
            <><em>Build → Authentication → Get started → Sign-in method</em> → enabled <strong>Email/Password</strong>.</>,
            <><em>Users → Add user</em> → created a dedicated device account for the ESP32 (its email / password go into <C>USER_EMAIL</C> / <C>USER_PASSWORD</C>).</>,
            <>Dashboard users sign in or register on <C>index.html</C> (<C>signInWithEmailAndPassword</C> / <C>createUserWithEmailAndPassword</C>); they then appear in the Users list.</>,
          ]}
        />
        <DataTable
          head={["Who signs in", "How", "Why this method"]}
          rows={[
            ["ESP32", "Email / password in firmware (Firebase ESP Client)", "A device cannot click through a pop-up login"],
            ["Dashboard user", "Email / password form on index.html", "Simple, works on any browser, includes “Create one”"],
          ]}
        />
        <Sub>Realtime Database security rules</Sub>
        <SourceFile path={`${FOLDER}/database.rules.json`} />
        <Prose>
          <p>
            Only requests carrying a valid Firebase ID token are allowed. I confirmed it works: reading the database URL without
            signing in returns <C>{`{ "error": "Permission denied" }`}</C>.
          </p>
        </Prose>
      </DocSection>

      <DocSection task={T} section="evidence">
        <EvidenceGroup
          title="Screenshots of the login page"
          items={[
            { src: "/media/iot/task4-dash/login.jpg", label: "SmartHome login page (index.html) — email / password + Create one", fit: "contain" },
            { src: "/media/iot/task4/firebase-auth-users", label: "Firebase Authentication — Email/Password users (device + dashboard)", fit: "contain" },
          ]}
        />
        <EvidenceGroup
          title="Screenshots of the Firebase database"
          items={[
            { src: "/media/iot/task4/firebase-rtdb-data", label: "Realtime Database — smarthome/devices and sensorData tree", fit: "contain" },
            { src: "/media/iot/task4-cloud/rtdb-console.jpg", label: "Firebase console — project iotproject (Spark) with Realtime Database, Authentication and Hosting", fit: "contain" },
            { src: "/media/iot/task4/firebase-rules", label: "Realtime Database rules — auth != null", fit: "contain" },
          ]}
        />
        <EvidenceGroup
          title="Screenshots of the working dashboard (temperature and humidity displayed)"
          columns={1}
          items={[
            { src: "/media/iot/task4-dash/dashboard-full.jpg", label: "Live dashboard — Connected · 23.0 °C · 60.0 % · light 1325 · AUTOMATIC · threshold 400 · history chart", aspectRatio: "16/9", fit: "contain" },
          ]}
        />
        <EvidenceGroup
          title="Photographs of the physical prototype"
          items={[
            { src: "/media/iot/task5/lab-bulb-on-frame.jpg", label: "Lab test — bulb ON while the team uses the dashboard", aspectRatio: "16/9" },
            { src: "/media/iot/task5/lab-bulb-off-frame.jpg", label: "Same test a moment later — bulb switched OFF", aspectRatio: "16/9" },
            { src: "/media/iot/task4/prototype", label: "ESP32 with DHT11, LDR divider and relay" },
          ]}
        />
        <EvidenceGroup
          title="Video demonstrating monitoring, control and the webpage workflow"
          items={[
            { type: "video", src: "/media/iot/task4/webpage-workflow.mp4", label: "Lab demo — the web dashboard open on the laptop while the bulb on the breadboard setup switches", aspectRatio: "16/9" },
            { type: "video", src: "/media/iot/journey/video-lab.mp4", label: "Lab clip — bulb switched from the laptop dashboard" },
            { type: "video", src: "/media/iot/task4-hw/demo.mp4", label: "Bench test — ESP32 on the breadboard with Serial Monitor output" },
          ]}
        />
      </DocSection>

      <DocSection task={T} section="challenges">
        <DataTable
          head={["Problem", "Cause", "Solution"]}
          rows={[
            [
              "Dashboard said “Connected” but every card showed “--”",
              "My first firmware (envirosense_v1.ino) wrote to sensors/current and device/*, but the dashboard listens on smarthome/devices/esp32_001 and smarthome/sensorData/esp32_001.",
              "Rewrote the firmware to use exactly the dashboard's paths and field names. The “--” screenshot below is from before the fix.",
            ],
            [
              "Mode buttons had no effect on the ESP32",
              "v1 compared the mode with \"MANUAL\" / \"AUTO\"; the dashboard writes \"manual\" / \"automatic\".",
              "Used the dashboard's lowercase values in the firmware.",
            ],
            [
              "Page kept bouncing between login and dashboard",
              "Both pages redirected inside onAuthStateChanged — the login page sent signed-in users on, the dashboard sent them back while the session was loading.",
              "Removed the auto-redirect from index.html; it redirects only after a successful sign-in. Only dashboard.html has the guard.",
            ],
            [
              "One big page mixed login and dashboard code",
              "My first version rendered both views in index.html.",
              "Split into index.html (login / register) and dashboard.html (protected), which made the auth flow easier to follow.",
            ],
            [
              "Occasional NaN readings from the DHT11",
              "The DHT11 needs about 2 s between reads and sometimes misses a read.",
              "Read every 3 s and skip that cycle instead of logging NaN.",
            ],
            [
              "Bulb flashed on for a moment at every reset",
              "This relay is active-LOW; a pin that is LOW during boot switches it on.",
              "Write the relay pin HIGH first thing in setup() and use LOW = ON in applyBulb().",
            ],
          ]}
        />
        <div className="md:max-w-xl">
          <Evidence src="/media/iot/task2/dashboard.jpg" label="Before the path fix — Firebase connected, but no sensor values (“--”)" fit="contain" />
        </div>
      </DocSection>

      <DocSection task={T} section="reflection">
        <Prose>
          <p>
            This was the first task where three separate pieces — firmware, cloud database, web page — had to agree on the same contract:
            the database paths and the exact strings stored in them. Most of my debugging was not about code being wrong but about two
            correct programs disagreeing (<C>sensors/current</C> vs <C>smarthome/sensorData</C>, &ldquo;AUTO&rdquo; vs
            &ldquo;automatic&rdquo;). Writing the database structure down first would have saved me hours.
          </p>
          <p>
            The idea I am taking forward is that the device and the dashboard are equal clients of one source of truth. Neither one
            &ldquo;owns&rdquo; the bulb; they both follow what Firebase says. That makes adding new clients easy — Task 5 builds
            automation and logging on exactly this structure.
          </p>
        </Prose>
      </DocSection>

      <DocSection task={T} section="repository">
        <RepoCard
          url={repoTreeUrl(FOLDER)}
          folder={`iot-projects/${FOLDER}`}
          files={[
            { name: "firmware/smarthome_esp32/smarthome_esp32.ino", note: "ESP32 firmware matching the dashboard's database" },
            { name: "firmware/envirosense_v1/envirosense_v1.ino", note: "My first version (old paths) — kept to show the fix" },
            { name: "web/index.html", note: "Login / create-account page" },
            { name: "web/dashboard.html", note: "Live dashboard: cards, controls, chart, table, CSV" },
            { name: "database.rules.json", note: "Realtime Database security rules" },
            { name: "database-structure.json", note: "Database tree with example values" },
          ]}
        />
        <Callout title="Keys removed">
          Wi-Fi, Firebase config and the device account are placeholders in the repository. Firebase web config is not secret on its own,
          but the security rules are what actually protect the data.
        </Callout>
      </DocSection>
    </article>
  );
}
