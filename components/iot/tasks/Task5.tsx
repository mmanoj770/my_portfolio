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
  SourceExcerpt,
  Evidence,
  EvidenceGroup,
  RepoCard,
  ChecklistIndex,
  Callout,
} from "@/components/iot/doc";
import { SmartHomeWiring } from "@/components/iot/diagrams";
import { readPublicCsv, repoTreeUrl, resolveMedia } from "@/lib/iot-repo";

const T = 5;
const FOLDER = "task5-logging-automation";
const FIRMWARE = `${FOLDER}/firmware/smarthome_esp32/smarthome_esp32.ino`;
const DASHBOARD = `${FOLDER}/web/dashboard.html`;
const CSV_EXPORT = "/media/iot/task5/ems01_history_2026-10-30.csv";

const CSV_SCREENSHOT = "/media/iot/task5/csv-opened";

// The CSV file actually downloaded from the dashboard and / or a screenshot of it opened in a
// spreadsheet. Hidden until one of them has been added to public/.
function DownloadedCsv() {
  const rows = readPublicCsv(CSV_EXPORT);
  const hasRows = rows !== null && rows.length > 1;
  const firstChange = hasRows ? Math.max(1, rows.findIndex((r, i) => i > 1 && r[4] !== rows[1][4])) : 1;
  if (!hasRows && !resolveMedia(CSV_SCREENSHOT)) return null;
  return (
    <div className="space-y-4">
      <Sub>Downloaded CSV file contains the recorded data</Sub>
      {hasRows && (
        <>
          <Prose>
            <p>
              This is the actual CSV file downloaded from the EMS01 history page, <C>ems01_history_2026-10-30.csv</C>: {rows.length - 1}{" "}
              timestamped readings logged on 17 Sep 2026 (12:26–13:52), with temperature, humidity, light level (DARK / BRIGHT) and bulb
              state (ON / OFF).{" "}
              <a href={CSV_EXPORT} download className="text-signal underline underline-offset-2">
                Download the file
              </a>
              . Its columns differ slightly from the SmartHome dashboard&apos;s own export (no mode column; light is DARK / BRIGHT instead
              of a number).
            </p>
            <p>
              The table shows the rows around the first moment the bulb switched from OFF to ON as the light changed.
            </p>
          </Prose>
          <DataTable head={rows[0]} rows={rows.slice(Math.max(1, firstChange - 6), firstChange + 14)} />
        </>
      )}
      <div className="md:max-w-2xl">
        <Evidence src={CSV_SCREENSHOT} label="Downloaded CSV opened in a spreadsheet" fit="contain" />
      </div>
    </div>
  );
}

export default function Task5() {
  return (
    <article id="task5" className="scroll-mt-28 border-t border-base-border pt-16 mb-28">
      <TaskHeader task={T} title="Firebase Logging, Automation & Data Export" meta="Manual / Automatic modes · LDR threshold · timestamped history · Chart.js · CSV export">
        <ChecklistIndex
          task={T}
          items={[
            ["Objective of the complete IoT system", "overview"],
            ["Final system architecture documented", "design"],
            ["DHT11 temperature and humidity monitoring demonstrated", "evidence"],
            ["LDR-based light level monitoring demonstrated", "evidence"],
            ["Manual bulb control implemented", "implementation"],
            ["Automatic bulb control using the LDR implemented", "implementation"],
            ["Manual / Automatic mode implemented and documented", "design"],
            ["Logic used for automatic lighting explained", "design"],
            ["LDR threshold / calibration method documented", "configuration"],
            ["Historical data logging in Firebase implemented", "implementation"],
            ["Database structure used for logs documented", "design"],
            ["Timestamped sensor readings recorded", "implementation"],
            ["Temperature and humidity values recorded", "implementation"],
            ["LDR / light-level values recorded", "implementation"],
            ["Bulb status and operating mode recorded", "implementation"],
            ["Historical data displayed on the dashboard", "implementation"],
            ["Graph / chart for recorded sensor data", "implementation"],
            ["CSV data download implemented", "implementation"],
            ["Downloaded file demonstrated to contain the recorded data", "evidence"],
            ["Screenshots of the Firebase log data", "evidence"],
            ["Screenshots of the dashboard and data visualisation", "evidence"],
            ["Photographs of the complete prototype", "evidence"],
            ["Video demonstrating the complete system", "evidence"],
            ["Problems encountered and solutions implemented", "challenges"],
            ["Limitations of the current prototype explained", "reflection"],
            ["Possible future improvements suggested", "reflection"],
            ["Final learning reflection", "reflection"],
            ["All source code and project files in the repository", "repository"],
          ]}
        />
      </TaskHeader>

      <DocSection task={T} section="overview">
        <Prose>
          <p>
            <strong>Objective of the complete system:</strong> turn the Task 4 dashboard into a complete smart-lighting and
            environment-logging system. It monitors temperature, humidity and light, switches the bulb either manually or automatically
            when it gets dark, records every reading with a timestamp in Firebase, shows the history as a chart and table, and exports it
            as a CSV file for analysis.
          </p>
          <p>
            <strong>Problem being solved:</strong> live values alone do not answer questions like &ldquo;how warm did the lab get this
            afternoon?&rdquo; or &ldquo;how long was the light on?&rdquo;, and a light that someone has to remember to switch wastes
            energy. Logging gives history; automatic mode removes the human from routine switching while keeping a manual override.
          </p>
        </Prose>
      </DocSection>

      <DocSection task={T} section="concepts">
        <Bullets
          items={[
            <><strong>Data logging:</strong> saving each measurement with the time it was taken, building a time series that can be graphed, compared and exported. Live values show <em>now</em>; logs show <em>what happened</em>.</>,
            <><strong>Closed-loop automation:</strong> sensor → decision → actuator. The LDR measures light, the firmware compares it with a threshold, the relay switches, and the next reading shows the result.</>,
            <><strong>Operating modes:</strong> one setting decides who is in charge of the bulb — the user (manual) or the sensor logic (automatic). Exactly one of them controls it at any time, so they never fight.</>,
            <><strong>Threshold and calibration:</strong> a threshold is the number where the decision flips. Calibration means choosing it from real measurements of this sensor in this room, not guessing.</>,
            <><strong>CSV (comma-separated values):</strong> a plain-text table, one row per line, that Excel, Google Sheets or Python can open directly.</>,
          ]}
        />
      </DocSection>

      <DocSection task={T} section="design">
        <Sub>Final system architecture</Sub>
        <Flow
          vertical
          nodes={[
            { title: "1 · Sensing layer", detail: "DHT11 (GPIO 27) temperature + humidity · LDR divider (GPIO 34) light level" },
            { title: "2 · Device layer — ESP32 firmware", detail: "every 1 s: read mode / threshold / command, run automatic logic · every 3 s: log a reading · relay on GPIO 26" },
            { title: "3 · Cloud layer — Firebase", detail: "Authentication (device + users) · Realtime Database: devices/esp32_001 (state & settings) + sensorData/esp32_001 (log) · Hosting" },
            { title: "4 · Presentation layer — dashboard", detail: "login · live cards · Turn ON / OFF · Manual / Automatic · threshold · Chart.js history · table · CSV download" },
          ]}
          edges={["readings", "signed-in reads / writes", "realtime listeners"]}
          caption="Final architecture — four layers, each only talking to the one next to it."
        />

        <Sub>Manual / Automatic mode</Sub>
        <DataTable
          head={["", "Manual mode", "Automatic mode"]}
          rows={[
            ["Who controls the bulb", "The user, with Turn ON / Turn OFF", "The ESP32, from the LDR reading"],
            ["What the dashboard writes", "status = \"on\" / \"off\"", "mode = \"automatic\" (once)"],
            ["What the ESP32 does every second", "Copies status to the relay", "Compares light with ldrThreshold, switches the relay, writes status back"],
            ["Logged in each row", "mode: \"manual\"", "mode: \"automatic\""],
            ["How to switch", "Click Automatic", "Click Manual — the bulb stays as it is until the next command"],
          ]}
        />

        <Sub>Logic used for automatic lighting</Sub>
        <Flow
          nodes={[
            { title: "Read LDR", detail: "analogRead(34) · 0–4095" },
            { title: "Compare", detail: "ldr < ldrThreshold ?" },
            { title: "Decide", detail: "dark → ON · bright → OFF" },
            { title: "Changed?", detail: "only act if different" },
            { title: "Relay + Firebase", detail: "applyBulb · status written back" },
          ]}
          edges={["every 1 s", "", "", "yes"]}
          caption="With my divider, more light gives a higher reading, so “darker than the threshold” means ldr < ldrThreshold. Writing the decision back keeps the dashboard's Status in sync."
        />

        <Sub>Database structure used for logs</Sub>
        <SourceFile path={`${FOLDER}/database-structure.json`} />
        <DataTable
          head={["Field", "Type", "Example", "Meaning"]}
          rows={[
            [<C key="k">&lt;key&gt;</C>, "string (epoch ms)", "1789119000000", "When the reading was taken — the key itself is the timestamp, so rows sort in time order"],
            [<C key="t">temperature</C>, "number", "23", "°C from the DHT11"],
            [<C key="h">humidity</C>, "number", "60", "% relative humidity from the DHT11"],
            [<C key="l">ldr</C>, "number", "1325", "Raw light level, 0–4095 (higher = brighter)"],
            [<C key="b">bulbState</C>, "string", "\"off\"", "Relay state at that moment"],
            [<C key="m">mode</C>, "string", "\"automatic\"", "Operating mode at that moment"],
          ]}
        />
      </DocSection>

      <DocSection task={T} section="hardware">
        <Prose>
          <p>
            Same hardware and software as Task 4 — ESP32, DHT11, LDR + 10 kΩ divider, 5 V active-LOW relay, 230 V bulb, Firebase,
            Chart.js. Task 5 adds no new parts; everything new is in the firmware logic and the dashboard.
          </p>
        </Prose>
      </DocSection>

      <DocSection task={T} section="wiring">
        <Figure caption="Same wiring as Task 4.">
          <SmartHomeWiring />
        </Figure>
      </DocSection>

      <DocSection task={T} section="implementation">
        <Sub>Manual bulb control</Sub>
        <SourceExcerpt path={FIRMWARE} fn="void syncFromDashboard()" />
        <Sub>Automatic bulb control using the LDR</Sub>
        <SourceExcerpt path={FIRMWARE} fn="void runAutomatic(int ldr)" />
        <Sub>Historical data logging in Firebase (timestamped)</Sub>
        <Prose>
          <p>
            Every 3 seconds one row is written under <C>smarthome/sensorData/esp32_001</C>. The key is the current time in milliseconds
            (from NTP), and the row records temperature, humidity, LDR level, bulb state and mode — so every log entry captures both the
            environment and what the system was doing about it.
          </p>
        </Prose>
        <SourceExcerpt path={FIRMWARE} fn="void logReading(int ldr)" />
        <SourceExcerpt path={FIRMWARE} fn="String timestampKey()" />
        <Sub>Mode switching from the dashboard</Sub>
        <SourceExcerpt path={DASHBOARD} fn="function setMode(mode)" />
        <Sub>Historical data displayed on the dashboard</Sub>
        <Prose>
          <p>
            The dashboard listens to the last 20 log rows, sorts them by timestamp and draws both a table (newest first) and a chart.
          </p>
        </Prose>
        <SourceExcerpt path={DASHBOARD} fn="function listenSensorHistory()" />
        <Sub>Graph / chart for recorded sensor data</Sub>
        <Prose>
          <p>
            A Chart.js line chart with three series. Light is plotted as <C>LDR / 10</C> so values in the thousands do not flatten the
            temperature and humidity lines; the table keeps the real value.
          </p>
        </Prose>
        <SourceExcerpt path={DASHBOARD} fn="function renderChart()" />
        <Sub>CSV data download</Sub>
        <Prose>
          <p>
            The Download CSV button builds the file in the browser from the same rows as the table — no server needed — and saves it as
            <C>smarthome_sensor_history.csv</C> with the header <C>Timestamp,Temperature(C),Humidity(%),LDR,Bulb_State,Operating_Mode</C>.
          </p>
        </Prose>
        <SourceExcerpt path={DASHBOARD} fn="function downloadCSV()" />
        <Callout title="Full source">
          The complete firmware and dashboard are listed in Task 4 and in this task&apos;s repository folder.
        </Callout>
      </DocSection>

      <DocSection task={T} section="configuration">
        <Sub>LDR threshold / calibration method</Sub>
        <Steps
          items={[
            <>Flashed <C>ldr_calibration.ino</C>, which prints the min / average / max of 50 raw readings every second, and opened the Serial Monitor at 115200.</>,
            <>Recorded the average in three conditions: <strong>bright lab lighting</strong>, <strong>dim room</strong> (lights partly off), and <strong>dark</strong> (LDR covered with a hand).</>,
            <>Chose a threshold between &ldquo;dim room&rdquo; and &ldquo;dark&rdquo;, so a passing shadow does not switch the bulb but real darkness does. That gave <C>ldrThreshold = 400</C>.</>,
            <>Stored the threshold in Firebase (<C>smarthome/devices/esp32_001/ldrThreshold</C>) instead of hard-coding it. The ESP32 re-reads it every second, so it can be tuned from the Firebase console without re-flashing, and the dashboard shows the current value.</>,
            <>Verified in Automatic mode: covering the LDR switched the bulb ON within about a second, uncovering it switched it OFF, and both changes appeared in the log with <C>mode: &quot;automatic&quot;</C>.</>,
          ]}
        />
        <DataTable
          head={["Condition", "Raw LDR reading", "Bulb in automatic mode"]}
          rows={[
            ["Bright lab lighting", "≈ 1300 (1325 on the dashboard screenshot)", "OFF — far above 400"],
            ["Dim room", "Lower, but still above 400", "OFF"],
            ["Dark / LDR covered", "Below 400", "ON"],
          ]}
        />
        <SourceFile path={`${FOLDER}/firmware/ldr_calibration/ldr_calibration.ino`} />
      </DocSection>

      <DocSection task={T} section="evidence">
        <EvidenceGroup
          title="DHT11 and LDR monitoring, dashboard and data visualisation"
          columns={1}
          items={[
            { src: "/media/iot/task4-dash/dashboard-full.jpg", label: "Dashboard in AUTOMATIC mode — 23.0 °C, 60.0 %, light 1325 (above threshold 400, so bulb OFF), history chart of temperature, humidity and LDR/10", aspectRatio: "16/9", fit: "contain" },
          ]}
        />
        <EvidenceGroup
          title="History table and automatic mode"
          items={[
            { src: "/media/iot/task5/history-table", label: "Sensor History table — timestamp, temperature, humidity, LDR, bulb, mode", fit: "contain" },
            { src: "/media/iot/task5/automatic-mode-dark", label: "Automatic mode with the LDR covered — bulb switched ON by the sensor", fit: "contain" },
          ]}
        />
        <EvidenceGroup
          title="Screenshots of the Firebase log data"
          items={[
            { src: "/media/iot/task5/firebase-logs", label: "Firebase RTDB — smarthome/sensorData/esp32_001 with timestamped rows", fit: "contain" },
            { src: "/media/iot/task4/firebase-rtdb-data", label: "Firebase RTDB — device node with status, mode and ldrThreshold", fit: "contain" },
          ]}
        />
        <DownloadedCsv />
        <EvidenceGroup
          title="Photographs of the complete prototype"
          items={[
            { src: "/media/iot/task5/lab-bulb-on-frame.jpg", label: "Complete system in the lab — bulb ON", aspectRatio: "16/9" },
            { src: "/media/iot/task5/lab-bulb-off-frame.jpg", label: "Complete system in the lab — bulb OFF", aspectRatio: "16/9" },
            { src: "/media/iot/task4/prototype", label: "ESP32 with DHT11, LDR divider and relay" },
          ]}
        />
        <EvidenceGroup
          title="Video demonstrating the complete system"
          items={[
            { type: "video", src: "/media/iot/task5/full-system", label: "Complete system — live data, manual control, automatic mode with the LDR, CSV download" },
            { type: "video", src: "/media/iot/journey/video-lab.mp4", label: "Lab clip — bulb switched from the dashboard" },
          ]}
        />
      </DocSection>

      <DocSection task={T} section="challenges">
        <DataTable
          head={["Problem", "Cause", "Solution implemented"]}
          rows={[
            [
              "Exported CSV did not show which mode the system was in",
              "My first CSV had only Time, Temperature, Humidity, LDR and Bulb_State.",
              "Logged mode in every row and added the Operating_Mode column to the export.",
            ],
            [
              "Light line made the chart unreadable",
              "LDR values are in the hundreds or thousands, temperature and humidity in the tens, so they were squashed flat.",
              "Plotted LDR / 10 on the chart only; the table and CSV keep the real value.",
            ],
            [
              "Dashboard timestamps showed long numbers or wrong dates",
              "The dashboard turns the row key into a date, so the key must be real epoch time in milliseconds — the ESP32 does not know the time after boot.",
              "Synced the clock with NTP in setup() and used epoch seconds + \"000\" as the key.",
            ],
            [
              "Threshold from the first firmware no longer made sense",
              "v1 scaled the LDR to 0–1023 (threshold 450); the dashboard and logs use the raw 0–4095 reading.",
              "Kept the raw reading everywhere and re-chose the threshold with the calibration sketch (400).",
            ],
            [
              "History view only showed the last few readings",
              "The first version listened with limitToLast(10).",
              "Raised it to the last 20 readings, a good balance between context and load time.",
            ],
          ]}
        />
      </DocSection>

      <DocSection task={T} section="reflection">
        <Sub>Limitations of the current prototype</Sub>
        <Bullets
          items={[
            <><strong>Authorization is all-or-nothing.</strong> The rule <C>auth != null</C> plus an open &ldquo;Create one&rdquo; link means anyone who registers can switch the bulb and read the data.</>,
            <><strong>Manual buttons stay active in Automatic mode.</strong> A Turn ON click is overridden by the ESP32 within a second, which can confuse a user.</>,
            <><strong>Single threshold, no hysteresis.</strong> If the light level hovers around 400, the bulb could flicker on and off.</>,
            <><strong>History is limited to 20 rows on screen and in the CSV</strong>; older data is in Firebase but not reachable from the dashboard.</>,
            <><strong>The log grows forever.</strong> One row every 3 s is about 28,800 rows a day, with no clean-up.</>,
            <><strong>Polling instead of streaming.</strong> The ESP32 asks Firebase every second, adding up to 1 s of delay and many reads.</>,
            <><strong>No offline buffering.</strong> If Wi-Fi drops, readings in that period are lost.</>,
            <><strong>DHT11 accuracy</strong> is only about ±2 °C and ±5 % RH.</>,
          ]}
        />
        <Sub>Possible future improvements</Sub>
        <Bullets
          items={[
            "Per-user security rules (only allowed UIDs may write to devices/) and turn off public sign-up.",
            "Disable the manual buttons in Automatic mode and show “controlled by sensor”.",
            "Hysteresis: ON below 380, OFF above 420, plus a moving average of the LDR.",
            "A date-range picker and full-history CSV export; a scheduled Cloud Function that deletes or averages old rows.",
            "Use a Firebase stream (beginStream) on the device node instead of polling.",
            "Buffer readings in flash (LittleFS) while offline and upload them on reconnect.",
            "DHT22 or BME280 for better accuracy; a PIR sensor so the light also needs someone in the room.",
            "Track bulb on-time from the logs to estimate energy use; push alerts when temperature crosses a limit.",
            "Wi-Fi setup portal and over-the-air updates instead of hard-coded credentials.",
          ]}
        />
        <Sub>Final learning reflection</Sub>
        <Prose>
          <p>
            Across the five tasks the bulb never changed, but where its control lives moved step by step: a local web server, a cloud
            broker, a voice service, and finally a database that both the device and the dashboard follow. Task 5 closed the loop:
            the system can now decide on its own, remember what it did, and hand that history to me as a file.
          </p>
          <p>
            The most useful habits I picked up were designing the data structure before writing code, keeping one source of truth,
            calibrating sensors with real measurements, and testing a chain one link at a time. Writing up the limitations also showed
            me that &ldquo;it works in the demo&rdquo; and &ldquo;it is safe to leave running&rdquo; are different goals — security
            rules, data retention and offline behaviour are what I would work on next.
          </p>
        </Prose>
      </DocSection>

      <DocSection task={T} section="repository">
        <RepoCard
          url={repoTreeUrl(FOLDER)}
          folder={`iot-projects/${FOLDER}`}
          files={[
            { name: "firmware/smarthome_esp32/smarthome_esp32.ino", note: "Monitoring, manual / automatic control, timestamped logging" },
            { name: "firmware/ldr_calibration/ldr_calibration.ino", note: "Threshold calibration helper" },
            { name: "web/dashboard.html", note: "Dashboard: modes, chart, history table, CSV download" },
            { name: "web/index.html", note: "Login page" },
            { name: "database-structure.json", note: "Log and device node structure" },
            { name: "database.rules.json", note: "Security rules" },
          ]}
        />
      </DocSection>
    </article>
  );
}
