/* =========================================================
   SmartHome — ESP32 firmware (Tasks 4 & 5)
   DHT11 + LDR monitoring, relay (bulb) control, Manual/Automatic
   mode and timestamped history logging to Firebase RTDB.

   Uses the same database paths the web dashboard listens on:
     smarthome/devices/esp32_001
         status        "on" | "off"           (bulb command / state)
         mode          "manual" | "automatic"
         ldrThreshold  int (default 400)
         lastUpdate    server timestamp
     smarthome/sensorData/esp32_001/<epoch ms>
         temperature, humidity, ldr, bulbState, mode

   Built from envirosense_v1.ino (same pins, libraries and auth
   flow); v1 wrote to sensors/current + device/*, which the
   dashboard never read — see the Challenges section.
   ========================================================= */

#include <WiFi.h>
#include <time.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include <DHT.h>

/* ---------------- Wi-Fi ---------------- */
#define WIFI_SSID     "YOUR_WIFI_SSID"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"

/* ---------------- Firebase ---------------- */
#define API_KEY      "YOUR_FIREBASE_WEB_API_KEY"
#define DATABASE_URL "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com/"

/* Dedicated device account created in Firebase Authentication */
#define USER_EMAIL    "YOUR_DEVICE_ACCOUNT_EMAIL"
#define USER_PASSWORD "YOUR_DEVICE_ACCOUNT_PASSWORD"

/* ---------------- Pins ---------------- */
#define LDR_PIN   34   // ADC1, input-only — LDR voltage divider
#define RELAY_PIN 26   // relay IN (active-LOW module)
#define DHT_PIN   27   // DHT11 data
#define DHT_TYPE  DHT11

/* ---------------- Database paths ---------------- */
const String DEVICE_PATH = "smarthome/devices/esp32_001";
const String LOG_PATH    = "smarthome/sensorData/esp32_001";

/* ---------------- Timing ---------------- */
const unsigned long CONTROL_INTERVAL = 1000;  // check dashboard commands every 1 s
const unsigned long LOG_INTERVAL     = 3000;  // DHT11 needs >= 2 s between reads

DHT dht(DHT_PIN, DHT_TYPE);

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

bool signupOK = false;
unsigned long lastControl = 0;
unsigned long lastLog = 0;

/* Local mirror of the device node */
String currentMode = "manual";
bool   bulbOn = false;
int    ldrThreshold = 400;

/* ---------------- Helpers ---------------- */

void applyBulb(bool on) {
  bulbOn = on;
  digitalWrite(RELAY_PIN, on ? LOW : HIGH);   // active-LOW: LOW energises the coil
  Serial.println(on ? "Bulb -> ON" : "Bulb -> OFF");
}

/* More light = higher reading with this divider (3V3 -> LDR -> GPIO34 -> 10k -> GND) */
int readLDR() {
  return analogRead(LDR_PIN);   // raw 0–4095
}

/* Epoch time in ms as a string key, so the dashboard can do new Date(Number(key)) */
String timestampKey() {
  time_t now = time(nullptr);
  return String((unsigned long)now) + "000";
}

/* MANUAL: follow the dashboard. Both modes: pick up mode/threshold changes. */
void syncFromDashboard() {
  if (Firebase.RTDB.getString(&fbdo, DEVICE_PATH + "/mode")) {
    String m = fbdo.stringData();
    if (m != currentMode) {
      currentMode = m;
      Serial.println("Mode -> " + currentMode);
    }
  }

  if (Firebase.RTDB.getInt(&fbdo, DEVICE_PATH + "/ldrThreshold")) {
    ldrThreshold = fbdo.intData();
  }

  if (currentMode == "manual") {
    if (Firebase.RTDB.getString(&fbdo, DEVICE_PATH + "/status")) {
      bool wantOn = (fbdo.stringData() == "on");
      if (wantOn != bulbOn) applyBulb(wantOn);
    }
  }
}

/* AUTOMATIC: the LDR decides, and the result is written back so the dashboard shows it */
void runAutomatic(int ldr) {
  bool shouldBeOn = (ldr < ldrThreshold);   // darker than threshold -> light needed
  if (shouldBeOn != bulbOn) {
    applyBulb(shouldBeOn);
    Firebase.RTDB.setString(&fbdo, DEVICE_PATH + "/status", bulbOn ? "on" : "off");
    Firebase.RTDB.setTimestamp(&fbdo, DEVICE_PATH + "/lastUpdate");
  }
}

/* One history row: smarthome/sensorData/esp32_001/<epoch ms> */
void logReading(int ldr) {
  float temperature = dht.readTemperature();
  float humidity    = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("DHT11 read failed, skipping this log entry");
    return;
  }

  FirebaseJson json;
  json.set("temperature", temperature);
  json.set("humidity", humidity);
  json.set("ldr", ldr);
  json.set("bulbState", bulbOn ? "on" : "off");
  json.set("mode", currentMode);

  String path = LOG_PATH + "/" + timestampKey();
  if (Firebase.RTDB.setJSON(&fbdo, path, &json)) {
    Serial.printf("Logged T=%.1f H=%.0f LDR=%d bulb=%s mode=%s\n",
                  temperature, humidity, ldr,
                  bulbOn ? "on" : "off", currentMode.c_str());
  } else {
    Serial.println("Log write failed: " + fbdo.errorReason());
  }
}

void setup() {
  Serial.begin(115200);

  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH);   // bulb OFF at boot (active-LOW relay)

  dht.begin();

  /* ---------------- Wi-Fi ---------------- */
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(300);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("Connected, IP: ");
  Serial.println(WiFi.localIP());

  /* ---------------- Clock (for log timestamps) ---------------- */
  configTime(19800, 0, "pool.ntp.org", "time.google.com");   // IST, UTC+5:30
  Serial.print("Syncing time");
  while (time(nullptr) < 1700000000) {
    delay(300);
    Serial.print(".");
  }
  Serial.println(" done");

  /* ---------------- Firebase ---------------- */
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  auth.user.email    = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.token_status_callback = tokenStatusCallback;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  Serial.println("Signing in to Firebase...");
  unsigned long start = millis();
  while (auth.token.uid == "" && millis() - start < 15000) {
    delay(200);
  }

  if (auth.token.uid != "") {
    Serial.println("Firebase sign-in OK");
    signupOK = true;
    syncFromDashboard();   // pick up the mode / threshold / bulb state left on the dashboard
  } else {
    Serial.println("Firebase sign-in FAILED — check email/password/rules");
  }
}

void loop() {
  if (!signupOK || !Firebase.ready()) return;

  unsigned long now = millis();

  if (now - lastControl >= CONTROL_INTERVAL) {
    lastControl = now;
    syncFromDashboard();
    if (currentMode == "automatic") {
      runAutomatic(readLDR());
    }
  }

  if (now - lastLog >= LOG_INTERVAL) {
    lastLog = now;
    logReading(readLDR());
  }
}
