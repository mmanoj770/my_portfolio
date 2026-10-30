/* =========================================================
   Task 2 — Adafruit IO Dashboard & MQTT
   The ESP32 is an MQTT SUBSCRIBER to the Adafruit IO feed "esp".
   Toggling the dashboard switch PUBLISHES "ON" / "OFF" to that
   feed; the Adafruit IO BROKER forwards it here and the relay
   switches the 230 V bulb.
     Topic:  YOUR_ADAFRUIT_IO_USERNAME/feeds/esp
     Payload: "ON" | "OFF"
   Library: "Adafruit IO Arduino" (installs Adafruit MQTT Library)
   ========================================================= */

#include <AdafruitIO_WiFi.h>

/* ---------------- Credentials ---------------- */
#define WIFI_SSID   "YOUR_WIFI_SSID"
#define WIFI_PASS   "YOUR_WIFI_PASSWORD"
#define IO_USERNAME "YOUR_ADAFRUIT_IO_USERNAME"
#define IO_KEY      "YOUR_ADAFRUIT_IO_KEY"   // io.adafruit.com -> key icon

AdafruitIO_WiFi io(IO_USERNAME, IO_KEY, WIFI_SSID, WIFI_PASS);
AdafruitIO_Feed *esp = io.feed("esp");      // subscribes to <username>/feeds/esp

/* ---------------- Relay ---------------- */
#define RELAY_PIN 26
#define RELAY_ON  HIGH    // this relay module is active-HIGH
#define RELAY_OFF LOW

/* Called every time a new value arrives on the "esp" feed */
void handleESPMessage(AdafruitIO_Data *data) {
  String command = data->toString();
  command.trim();          // String::trim() and toUpperCase() modify in place
  command.toUpperCase();   // and return void, so they cannot be chained

  Serial.print("Received from feed: ");
  Serial.println(command);

  if (command == "ON") {
    digitalWrite(RELAY_PIN, RELAY_ON);
    Serial.println("BULB -> ON");
  } else if (command == "OFF") {
    digitalWrite(RELAY_PIN, RELAY_OFF);
    Serial.println("BULB -> OFF");
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, RELAY_OFF);   // bulb OFF at boot

  esp->onMessage(handleESPMessage);     // register the callback before connecting

  Serial.print("Connecting to Adafruit IO");
  io.connect();
  while (io.status() < AIO_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.println(io.statusText());      // "Adafruit IO connected."

  esp->get();   // ask the broker for the last value, so the relay matches the dashboard after a reboot
}

void loop() {
  io.run();     // keeps the MQTT connection alive and dispatches incoming messages
}
