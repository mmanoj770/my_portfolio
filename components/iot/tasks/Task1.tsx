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
  RepoCard,
  ChecklistIndex,
  Callout,
} from "@/components/iot/doc";
import { Task1Wiring } from "@/components/iot/diagrams";
import { repoTreeUrl } from "@/lib/iot-repo";

const T = 1;
const FOLDER = "task1-esp32-web-server";

export default function Task1() {
  return (
    <article id="task1" className="scroll-mt-28 border-t border-base-border pt-16 mb-28">
      <TaskHeader task={T} title="ESP32 Web Server & HTML LED Control" meta="Local Wi-Fi · HTTP · WebServer.h · GPIO 2 · Day 1">
        <ChecklistIndex
          task={T}
          items={[
            ["Objective of the assignment and the problem being addressed", "overview"],
            ["Basic concept of an ESP32 Web Server", "concepts"],
            ["How the ESP32 and browser communicate over Wi-Fi", "concepts"],
            ["Hardware components used", "hardware"],
            ["Circuit / wiring diagram", "wiring"],
            ["ESP32 pin connections", "wiring"],
            ["Complete Arduino / ESP32 source code", "implementation"],
            ["HTML interface developed for controlling the LED", "implementation"],
            ["How the webpage sends a command to the ESP32", "implementation"],
            ["Photographs of the physical setup", "evidence"],
            ["Screenshots of the web interface", "evidence"],
            ["Video demonstrating LED ON/OFF control from the webpage", "evidence"],
            ["Problems encountered and how they were solved", "challenges"],
            ["Brief reflection on what I learned", "reflection"],
            ["All required files / code available in the repository", "repository"],
          ]}
        />
      </TaskHeader>

      <DocSection task={T} section="overview">
        <Prose>
          <p>
            <strong>Objective:</strong> turn an ESP32 into a small web server so the LED on the board can be switched ON and OFF
            from a webpage, without installing any app — just a browser on the same Wi-Fi.
          </p>
          <p>
            <strong>Problem being solved:</strong> a microcontroller has no screen or buttons for a user, and normally you can only
            talk to it over a USB cable. Putting a web server on the ESP32 means any phone or laptop on the network becomes its
            remote control. This is the first, local-only step of the smart home: later tasks replace the LED with a 230 V bulb and
            move control to the cloud.
          </p>
          <p>
            <strong>Summary:</strong> the ESP32 joins a 2.4 GHz Wi-Fi hotspot, gets an IP address (<C>192.168.137.59</C> in my photos),
            and listens on port 80. Opening that address shows my &ldquo;LED Control&rdquo; page. Pressing <em>TURN ON</em> makes
            the browser request <C>/api/on</C>; the ESP32 sets GPIO 2 HIGH, the blue LED lights, and the page updates to
            &ldquo;[ON] LED is ON&rdquo;.
          </p>
        </Prose>
      </DocSection>

      <DocSection task={T} section="concepts">
        <Sub>What an ESP32 web server is</Sub>
        <Prose>
          <p>
            A web server is just a program that waits for HTTP requests and answers them. On a laptop that would be something like
            Apache; on the ESP32 it is the <C>WebServer</C> library from the ESP32 Arduino core. I create <C>WebServer server(80)</C>,
            register a function for each URL path with <C>server.on(&quot;/api/on&quot;, handleOn)</C>, and call
            <C>server.handleClient()</C> in <C>loop()</C> so the ESP32 keeps checking for new requests. When a request arrives, the
            matching function runs, does the hardware work (<C>digitalWrite</C>) and sends a reply with <C>server.send()</C>.
          </p>
          <p>
            The ESP32 is in <strong>station mode</strong> (<C>WIFI_STA</C>): it joins an existing network like a phone would, instead
            of creating its own. Its IP is printed on the Serial Monitor because that is the address you type into the browser.
          </p>
        </Prose>

        <Sub>How the ESP32 and the browser talk over Wi-Fi</Sub>
        <Prose>
          <p>
            Both devices are connected to the same Wi-Fi hotspot, so they are on the same local network (<C>192.168.137.x</C>).
            The browser opens a TCP connection to the ESP32&apos;s IP on port 80 and sends a plain-text HTTP request such as
            <C>GET /api/on HTTP/1.1</C>. The ESP32 replies with a status code and a tiny body — <C>200 OK</C> and the text
            <C>ON</C>. Nothing leaves the local network: no internet and no cloud, which is why it responds almost instantly but also
            why it only works when you are on the same Wi-Fi.
          </p>
        </Prose>
        <DataTable
          head={["HTTP request", "What the ESP32 does", "Reply"]}
          rows={[
            [<C key="r">GET /</C>, "Sends the HTML control page stored in flash", "200 · text/html (the page)"],
            [<C key="on">GET /api/on</C>, "digitalWrite(2, HIGH) — LED on", <C key="ron">200 · &quot;ON&quot;</C>],
            [<C key="off">GET /api/off</C>, "digitalWrite(2, LOW) — LED off", <C key="roff">200 · &quot;OFF&quot;</C>],
            [<C key="s">GET /api/status</C>, "Nothing — just reports the state", <C key="rs">200 · &quot;ON&quot; / &quot;OFF&quot;</C>],
            ["Anything else", "Not found handler", "404 · Not found"],
          ]}
        />
      </DocSection>

      <DocSection task={T} section="design">
        <Flow
          nodes={[
            { title: "User", detail: "taps TURN ON" },
            { title: "Browser", detail: "fetch('/api/on')" },
            { title: "Wi-Fi hotspot", detail: "2.4 GHz LAN" },
            { title: "ESP32 WebServer", detail: "port 80 · handleOn()" },
            { title: "GPIO 2", detail: "HIGH → blue LED on" },
          ]}
          edges={["click", "HTTP GET", "TCP :80", "digitalWrite"]}
          caption="Command path. The reply (&quot;ON&quot;) travels back the same way and the page redraws the orb and status box."
        />
        <Flow
          nodes={[
            { title: "Page timer", detail: "every 1 s" },
            { title: "GET /api/status", detail: "over Wi-Fi" },
            { title: "ESP32", detail: "reads ledState" },
            { title: "Page", detail: "shows real state" },
          ]}
          edges={["setInterval", "request", "\"ON\"/\"OFF\""]}
          caption="Status polling keeps every open tab in sync, even if someone else pressed the button or the board reset."
        />
      </DocSection>

      <DocSection task={T} section="hardware">
        <DataTable
          head={["Hardware", "Purpose"]}
          rows={[
            ["ESP32 DevKit V1 (ESP32-WROOM-32)", "Microcontroller with built-in 2.4 GHz Wi-Fi; runs the web server"],
            ["On-board blue LED (GPIO 2)", "The output being controlled — already wired on the board with its resistor"],
            ["Micro-USB data cable", "Power (5 V) plus uploading code and the Serial Monitor"],
            ["Laptop / phone", "Runs the browser that shows the control page"],
            ["Wi-Fi hotspot (2.4 GHz)", "Shared local network for the ESP32 and the browser"],
          ]}
        />
        <DataTable
          head={["Software", "Purpose"]}
          rows={[
            ["Arduino IDE 2.3", "Writing and uploading the sketch, Serial Monitor at 115200 baud"],
            ["ESP32 board package (Espressif)", "Adds the ESP32 Dev Module board and the WiFi / WebServer libraries"],
            [<C key="w">WiFi.h</C>, "Connects the ESP32 to the hotspot in station mode"],
            [<C key="ws">WebServer.h</C>, "HTTP server: routes paths to handler functions"],
            ["HTML + CSS + JavaScript", "The LED Control page; JavaScript fetch() sends the commands"],
          ]}
        />
      </DocSection>

      <DocSection task={T} section="wiring">
        <Figure caption="Wiring diagram — the LED circuit is built into the DevKit, so the only physical connection is the USB cable.">
          <Task1Wiring />
        </Figure>
        <Sub>ESP32 pin connections</Sub>
        <DataTable
          head={["ESP32 pin", "Connected to", "Notes"]}
          rows={[
            ["GPIO 2", "On-board blue LED (through its on-board resistor)", "Output; HIGH = LED on, LOW = LED off"],
            ["GND", "LED cathode (on-board)", "Return path for the LED current"],
            ["Micro-USB", "Laptop USB port", "5 V power + serial upload / Serial Monitor"],
          ]}
        />
        <Callout title="Using an external LED instead">
          The same code drives an external LED if you wire GPIO 2 → 220 Ω resistor → LED anode (long leg), and the LED cathode → GND.
          The resistor limits the current so neither the LED nor the pin is damaged.
        </Callout>
      </DocSection>

      <DocSection task={T} section="implementation">
        <Sub>Complete ESP32 source code</Sub>
        <Prose>
          <p>
            The page is embedded in the sketch as a raw string literal (<C>R&quot;rawliteral( … )rawliteral&quot;</C>), so the
            ESP32 serves it itself — no separate web host needed.
          </p>
        </Prose>
        <SourceFile path={`${FOLDER}/task1_led_web_server/task1_led_web_server.ino`} />

        <Sub>Key sections explained</Sub>
        <DataTable
          head={["Code", "What it does"]}
          rows={[
            [<C key="a">WiFi.begin(ssid, password)</C>, "Joins the hotspot; the while loop prints dots until connected, then prints the IP to open."],
            [<C key="b">WebServer server(80)</C>, "Creates the HTTP server on port 80, the default port browsers use."],
            [<C key="c">server.on(&quot;/api/on&quot;, handleOn)</C>, "Routing table: each URL path is linked to the function that should run."],
            [<C key="d">handleOn() / handleOff()</C>, "Change ledState, drive GPIO 2, log to Serial, and reply with the new state."],
            [<C key="e">server.send(200, &quot;text/plain&quot;, …)</C>, "The HTTP reply. 200 means success; the body is just ON or OFF so the page can parse it easily."],
            [<C key="f">server.handleClient()</C>, "Called every loop; without it, requests would never be answered."],
          ]}
        />

        <Sub>HTML interface developed for controlling the LED</Sub>
        <Prose>
          <p>
            A single card: title, an orb that glows yellow when the LED is on, green TURN ON and red TURN OFF buttons, and a status box.
            It is plain HTML, CSS and JavaScript with no libraries, so it fits comfortably in the ESP32&apos;s flash.
          </p>
        </Prose>
        <SourceFile path={`${FOLDER}/index.html`} />

        <Sub>How the webpage sends a command to the ESP32</Sub>
        <Steps
          items={[
            <>The page was loaded from <C>http://192.168.137.59/</C>, so the browser already knows where the ESP32 is.</>,
            <>Clicking <em>TURN ON</em> runs <C>sendCommand(&apos;on&apos;)</C>, which calls <C>fetch(&quot;/api/&quot; + cmd)</C>. Because the path is relative, the request goes to the same IP: <C>GET http://192.168.137.59/api/on</C>.</>,
            <>The ESP32&apos;s <C>server.handleClient()</C> receives it and the routing table calls <C>handleOn()</C>.</>,
            <><C>handleOn()</C> sets <C>ledState = true</C>, runs <C>digitalWrite(2, HIGH)</C> (LED lights) and replies <C>200 &quot;ON&quot;</C>.</>,
            <>Back in the browser, <C>.then(res =&gt; res.text())</C> reads &ldquo;ON&rdquo; and <C>render()</C> turns the orb yellow and shows &ldquo;[ON] LED is ON&rdquo;. If the ESP32 cannot be reached, the status box says so instead.</>,
            <>Separately, <C>setInterval(poll, 1000)</C> asks <C>/api/status</C> every second, so the page always shows the real LED state.</>,
          ]}
        />
      </DocSection>

      <DocSection task={T} section="configuration">
        <Steps
          items={[
            <>Arduino IDE → <em>File → Preferences</em> → add the Espressif board URL, then <em>Boards Manager</em> → install <strong>esp32 by Espressif</strong>.</>,
            <><em>Tools → Board → ESP32 Dev Module</em>, select the COM port that appears when the board is plugged in.</>,
            <>Turn on a 2.4 GHz hotspot (the ESP32 cannot see 5 GHz networks) and put its name and password into <C>ssid</C> / <C>password</C>.</>,
            <>Upload. If it stops at &ldquo;Connecting…&rdquo;, hold the <strong>BOOT</strong> button until the upload starts.</>,
            <>Open the Serial Monitor at <strong>115200 baud</strong> and press EN (reset). It prints <C>Connected! Open http://192.168.137.59</C>.</>,
            <>On a phone or laptop joined to the same hotspot, open that address and use the buttons.</>,
          ]}
        />
      </DocSection>

      <DocSection task={T} section="evidence">
        <Sub>Screenshots of the web interface</Sub>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Evidence src="/media/iot/task1/off.jpg" label="Web UI at 192.168.137.59 — LED OFF (grey orb, only the red power LED lit on the board)" aspectRatio="auto" />
          <Evidence src="/media/iot/task1/on.jpg" label="Web UI — LED ON (yellow orb, blue GPIO 2 LED lit on the board)" aspectRatio="auto" />
        </div>
        <Sub>Photographs of the physical setup</Sub>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Evidence src="/media/iot/task1/demo-frame.jpg" label="Lab setup — ESP32 in hand, LED Control page open on the laptop" aspectRatio="auto" />
          <Evidence src="/media/iot/task1/setup.jpg" label="Bench: ESP32 on USB with Arduino IDE and Serial Monitor" />
          <Evidence src="/media/iot/task1/board.jpg" label="ESP32 DevKit and breadboard on the lab bench" />
        </div>
        <Sub>Video — LED ON/OFF from the webpage</Sub>
        <Evidence type="video" src="/media/iot/task1/demo.mp4" label="Task 1 demo — pressing TURN ON / TURN OFF switches the ESP32 LED" />
      </DocSection>

      <DocSection task={T} section="challenges">
        <DataTable
          head={["Problem", "Why it happened", "How I fixed it"]}
          rows={[
            [
              "Upload stopped at “Connecting……” and failed",
              "This DevKit does not always enter download mode automatically.",
              "Held the BOOT button while the IDE showed “Connecting…”, released once writing started.",
            ],
            [
              "Serial Monitor printed random symbols instead of the IP",
              "Monitor baud rate did not match Serial.begin(115200).",
              "Set the Serial Monitor to 115200 baud and pressed EN to see the boot messages again.",
            ],
            [
              "ESP32 never connected (endless dots)",
              "The ESP32 only supports 2.4 GHz Wi-Fi; the network I first tried was not suitable.",
              "Used a 2.4 GHz hotspot — that is why my IP is in the 192.168.137.x range.",
            ],
            [
              "Page would not open on my phone",
              "The phone was on mobile data, not the same network, so 192.168.137.59 meant nothing to it.",
              "Joined the phone to the same hotspot. Lesson: a local web server is only reachable on its own network.",
            ],
            [
              "Page showed the wrong state after a reset or with two tabs open",
              "My first version only had /api/on and /api/off, so the page assumed the state from its last click.",
              "Added /api/status and a 1-second poll so the page always asks the ESP32 for the real state.",
            ],
          ]}
        />
      </DocSection>

      <DocSection task={T} section="reflection">
        <Prose>
          <p>
            This task made HTTP feel concrete. I had used websites for years, but writing both ends — the <C>fetch()</C> call in the
            page and the <C>server.on()</C> handler on the ESP32 — showed me that a &ldquo;button on a website&rdquo; is just a request
            to a URL and a reply. Keeping the replies as simple text (&ldquo;ON&rdquo; / &ldquo;OFF&rdquo;) made the page logic easy.
          </p>
          <p>
            The biggest limitation is also the most important lesson: it only works on the same Wi-Fi, and the IP can change when the
            hotspot restarts. That is exactly the problem the next task solves by moving control to the cloud with MQTT.
          </p>
        </Prose>
      </DocSection>

      <DocSection task={T} section="repository">
        <RepoCard
          url={repoTreeUrl(FOLDER)}
          folder={`iot-projects/${FOLDER}`}
          files={[
            { name: "task1_led_web_server/task1_led_web_server.ino", note: "Complete ESP32 sketch (serves the page + API)" },
            { name: "index.html", note: "The LED Control web interface on its own" },
          ]}
        />
        <Bullets items={[<>Credentials are placeholders — replace <C>YOUR_WIFI_SSID</C> / <C>YOUR_WIFI_PASSWORD</C> before uploading.</>]} />
      </DocSection>
    </article>
  );
}
