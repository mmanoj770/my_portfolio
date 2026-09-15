export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt?: string; caption?: string }
  | { type: "image-grid"; images: { src: string; alt?: string; caption?: string }[] };

export type DetailedSection = {
  heading?: string;
  paragraphs?: string[];
  content?: ContentBlock[];
};

export type IoTSession = {
  id: number;
  title: string;
  date?: string;
  status: "complete" | "placeholder";
  summary: string;
  reflection: string;
  learnings: string[];
  tags: string[];
  hero: string;
  gallery: string[];
  pdf: string | null;
  detailedSummary?: {
    title?: string;
    sections: DetailedSection[];
  };
};

export const iotSessions: IoTSession[] = [
  {
    id: 1,
    title: "Task 1 — HTTP LED Web Control",
    date: "Day 1",
    status: "complete",
    tags: ["ESP32", "HTTP REST", "Wi-Fi", "GPIO", "Embedded Web Server"],
    summary:
      "Local network web control server running directly on ESP32 to switch digital outputs via HTTP REST endpoints.",
    reflection:
      "Local HTTP server response times were ultra-low (<150ms) because requests stay within the local Wi-Fi subnet without external routing.",
    learnings: [
      "Configured ESP32 Wi-Fi station mode and WebServer.h endpoint routing.",
      "Handled HTTP GET requests for /api/on and /api/off with plain text replies.",
      "Controlled onboard GPIO 2 blue LED cleanly based on REST callbacks.",
      "Implemented polling on front-end web dashboard for real-time status monitoring.",
    ],
    hero: "/media/iot/task1/board.jpg",
    gallery: ["/media/iot/task1/board.jpg", "/media/iot/task1/on.jpg", "/media/iot/task1/off.jpg"],
    pdf: "/pdfs/iot-session-1.pdf",
  },
  {
    id: 2,
    title: "Task 2 — MQTT Cloud Dashboard with Relay Control",
    date: "Day 2",
    status: "complete",
    tags: ["MQTT", "Adafruit IO", "Relay", "230V Mains", "Pub/Sub"],
    summary:
      "Remote publish-subscribe control enabling switching of high-voltage 230V loads from anywhere on the internet using Adafruit IO.",
    reflection:
      "MQTT's light packet overhead drastically reduces bandwidth consumption compared to HTTP, making it ideal for remote IoT control.",
    learnings: [
      "Connected ESP32 MQTT client to Adafruit IO cloud broker over Wi-Fi.",
      "Subscribed to topic feeds and processed real-time payload updates.",
      "Safely wired a 5V relay module to switch a 230V AC mains incandescent bulb.",
      "Ensured proper high-voltage physical isolation and active-HIGH switching logic.",
    ],
    hero: "/media/iot/task2/dashboard.jpg",
    gallery: ["/media/iot/task2/dashboard.jpg", "/media/iot/task2/relay.jpg", "/media/iot/task2/bulb-on.jpg"],
    pdf: "/pdfs/iot-session-2.pdf",
  },
  {
    id: 3,
    title: "Task 3 — Google Assistant Voice Control via IFTTT",
    date: "Day 3",
    status: "complete",
    tags: ["Google Assistant", "IFTTT", "Webhooks", "Voice API", "Automation"],
    summary:
      "Hands-free voice automation bridging Google Assistant voice intents through IFTTT webhooks directly to the MQTT feed.",
    reflection:
      "Chaining voice recognition to webhooks demonstrates how multi-protocol IoT pipelines connect user interfaces to physical hardware.",
    learnings: [
      "Created IFTTT Applets triggered by Google Assistant voice phrases.",
      "Configured Webhook POST requests delivering JSON payloads to Adafruit IO REST endpoints.",
      "Mapped voice intents to existing MQTT hardware topics with zero firmware changes.",
      "Achieved sub-3-second end-to-end latency from spoken phrase to physical bulb actuation.",
    ],
    hero: "/media/iot/task3/voice.jpg",
    gallery: ["/media/iot/task3/voice.jpg", "/media/iot/task3/applet.jpg"],
    pdf: "/pdfs/iot-session-3.pdf",
  },
  {
    id: 4,
    title: "Task 4 — Forge Full-Stack Smart Home Platform",
    date: "Intermediate",
    status: "complete",
    tags: ["Firebase RTDB", "DHT11", "LDR", "React / Web Dashboard", "Full Stack"],
    summary:
      "Full-stack smart home solution streaming environmental telemetry (temperature, humidity, light) to Firebase with real-time web control.",
    reflection:
      "Forge unifies edge sensing, cloud database synchronization, and modern front-end web control into a robust real-time automation ecosystem.",
    learnings: [
      "Interfaced digital DHT11 and analog LDR sensors on ESP32 with 15-sample noise smoothing.",
      "Established bi-directional WebSocket streaming with Firebase Realtime Database.",
      "Built a modern responsive web dashboard with live gauge cards, manual toggle, mode switch, and CSV data export.",
      "Implemented automatic threshold-driven lighting logic alongside manual override controls.",
    ],
    hero: "/media/iot/task4-dash/dashboard-full.jpg",
    gallery: [
      "/media/iot/task4-hw/breadboard.jpg",
      "/media/iot/task4-dash/dashboard-full.jpg",
      "/media/iot/task4-cloud/rtdb-console.jpg",
    ],
    pdf: "/pdfs/iot-session-4.pdf",
  },
];

export function getIoTSession(id: number): IoTSession | undefined {
  return iotSessions.find((s) => s.id === id);
}
