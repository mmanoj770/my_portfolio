// The five IoT session assignments, in order. Used for the IoT page navigation
// and the standalone per-task pages.
export const IOT_TASKS = [
  {
    n: 1,
    title: "ESP32 Web Server & HTML LED Control",
    short: "Web Server",
    stack: "HTTP · HTML/CSS/JS · Wi-Fi · GPIO",
    day: "Day 1",
  },
  {
    n: 2,
    title: "Adafruit IO Dashboard & MQTT",
    short: "MQTT Dashboard",
    stack: "MQTT · Adafruit IO · Relay · 230 V bulb",
    day: "Day 2",
  },
  {
    n: 3,
    title: "IFTTT + Adafruit IO IoT Automation",
    short: "IFTTT Automation",
    stack: "IFTTT · Google Assistant · Webhooks",
    day: "Day 3",
  },
  {
    n: 4,
    title: "Firebase IoT Monitoring Dashboard",
    short: "Firebase Dashboard",
    stack: "Firebase RTDB · Auth · DHT11 · LDR",
    day: "Day 4",
  },
  {
    n: 5,
    title: "Firebase Logging, Automation & Data Export",
    short: "Logging & Export",
    stack: "Automatic mode · History · Chart · CSV",
    day: "Day 4",
  },
] as const;
