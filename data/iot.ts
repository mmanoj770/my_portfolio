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

const placeholder = (id: number): IoTSession => ({
  id,
  title: `IoT Session ${id}`,
  status: "placeholder",
  summary: "This IoT session log has not been published yet.",
  reflection: "Coming soon.",
  learnings: [],
  tags: ["IoT", "Hardware"],
  hero: "/images/iot-placeholder.jpg",
  gallery: [],
  pdf: `/pdfs/iot-session-${id}.pdf`,
});

export const iotSessions: IoTSession[] = [
  {
    id: 1,
    title: "Session 1 — Fundamentals of IoT & Sensor Interfacing",
    date: "Phase 1",
    status: "complete",
    tags: ["IoT Architecture", "Arduino", "Sensors", "Electronics"],
    summary:
      "An introduction to Internet of Things (IoT) architecture, hardware platforms, and real-time sensor data acquisition using microcontrollers.",
    reflection:
      "Understanding hardware-software interaction at the signal level is critical for reliable IoT applications. Interfacing analog and digital sensors gave me hands-on insight into raw data processing before sending values to edge units.",
    learnings: [
      "Explored core IoT architecture layers: Perception, Network, Middleware, and Application layers.",
      "Configured microcontrollers (Arduino / ESP32) for GPIO pin control and sensor reading.",
      "Interfaced temperature, humidity (DHT11/DHT22), and ultrasonic distance sensors.",
      "Implemented signal filtering and debouncing logic for clean sensor telemetry.",
      "Built a basic local serial monitor monitoring tool for real-time sensor analytics.",
    ],
    hero: "/images/iot-session-1.jpg",
    gallery: ["/images/iot-session-1.jpg"],
    pdf: "/pdfs/iot-session-1.pdf",
    detailedSummary: {
      title: "Session 1 – Fundamentals of IoT & Sensor Interfacing",
      sections: [
        {
          heading: "1. Overview of IoT System Architecture",
          content: [
            {
              type: "paragraph",
              text: "The IoT ecosystem bridges physical devices with digital analytical platforms. In this initial session, we explored the complete stack of IoT architecture: physical sensing, embedded processing, wireless transport, and cloud services.",
            },
            {
              type: "paragraph",
              text: "We analyzed how sensors convert physical quantities into electrical signals, which are then sampled by analog-to-digital converters (ADC) inside embedded microcontrollers.",
            },
          ],
        },
        {
          heading: "2. Hands-on Sensor Interfacing & Telemetry",
          content: [
            {
              type: "paragraph",
              text: "Using ESP32 and Arduino development boards, we connected digital temperature/humidity sensors and ultrasonic proximity sensors. We calibrated analog inputs and built custom signal smoothing algorithms to eliminate noise.",
            },
          ],
        },
      ],
    },
  },
  {
    id: 2,
    title: "Session 2 — Microcontrollers & Embedded Wireless Protocols",
    date: "Phase 2",
    status: "complete",
    tags: ["ESP32", "MQTT", "Wi-Fi", "WebSockets"],
    summary:
      "Deep dive into ESP32 microcontroller features, Wi-Fi networking, and lightweight IoT protocols like MQTT and HTTP/WebSockets for microsecond messaging.",
    reflection:
      "MQTT's publish-subscribe paradigm drastically simplifies device-to-broker communication over high-latency network conditions compared to traditional HTTP polling.",
    learnings: [
      "Configured ESP32 Wi-Fi station mode and access point mode for direct device configuration.",
      "Implemented MQTT client using Mosquitto broker for low-overhead publish-subscribe telemetry.",
      "Handled Quality of Service (QoS) levels and Retained Messages for state persistence.",
      "Created lightweight REST endpoints on embedded chips for remote configuration.",
    ],
    hero: "/images/iot-session-2.jpg",
    gallery: ["/images/iot-session-2.jpg"],
    pdf: "/pdfs/iot-session-2.pdf",
    detailedSummary: {
      title: "Session 2 – Microcontrollers & Embedded Wireless Protocols",
      sections: [
        {
          heading: "1. Wireless Connectivity & ESP32 Stack",
          content: [
            {
              type: "paragraph",
              text: "ESP32 offers dual-core processing along with built-in Wi-Fi and Bluetooth LE. We configured freeRTOS tasks to separate sensor polling from network transmission, preventing network blocking on time-critical sensor reads.",
            },
          ],
        },
        {
          heading: "2. MQTT Publish-Subscribe Pattern",
          content: [
            {
              type: "paragraph",
              text: "We established MQTT topic structures (e.g., home/sensors/temperature) and verified real-time payload transmission to a centralized MQTT broker with minimal latency.",
            },
          ],
        },
      ],
    },
  },
  {
    id: 3,
    title: "Session 3 — Cloud IoT Integration & Real-time Dashboards",
    date: "Phase 3",
    status: "complete",
    tags: ["Cloud IoT", "Node-RED", "Grafana", "Time-Series DB"],
    summary:
      "Connecting edge IoT nodes to cloud services, storing time-series telemetry in databases, and visualizing system states via interactive dashboards.",
    reflection:
      "Visualization turns raw sensor feeds into actionable operational insights. Integrating Node-RED and Grafana allowed dynamic monitoring of system thresholds.",
    learnings: [
      "Streamed sensor metrics from ESP32 to cloud dashboards via MQTT websockets.",
      "Structured time-series data storage for continuous environmental telemetry.",
      "Configured automated alert notifications when values breach operating thresholds.",
      "Designed an interactive control panel for toggling physical actuators remotely.",
    ],
    hero: "/images/iot-session-3.jpg",
    gallery: ["/images/iot-session-3.jpg"],
    pdf: "/pdfs/iot-session-3.pdf",
  },
  {
    id: 4,
    title: "Session 4 — Actuators, Relays & Industrial Automation",
    date: "Phase 4",
    status: "complete",
    tags: ["Actuators", "Relays", "Motor Drivers", "Edge Automation"],
    summary:
      "Controlling high-voltage hardware loads safely using optical isolation relays, motor drivers, and automated closed-loop feedback systems.",
    reflection:
      "Closing the loop between sensor input and physical actuation is where IoT delivers true automation. Safety precautions with relay isolation are vital when interfacing with high currents.",
    learnings: [
      "Wired optocoupler-isolated relay modules to switch high-power loads safely.",
      "Utilized Pulse Width Modulation (PWM) for precise DC motor and LED brightness control.",
      "Designed closed-loop PID control logic for target temperature regulation.",
      "Implemented hardware watchdog timers to automatically recover from system freezes.",
    ],
    hero: "/images/iot-session-4.jpg",
    gallery: ["/images/iot-session-4.jpg"],
    pdf: "/pdfs/iot-session-4.pdf",
  },
  ...Array.from({ length: 6 }, (_, i) => placeholder(i + 5)),
];

export function getIoTSession(id: number): IoTSession | undefined {
  return iotSessions.find((s) => s.id === id);
}
