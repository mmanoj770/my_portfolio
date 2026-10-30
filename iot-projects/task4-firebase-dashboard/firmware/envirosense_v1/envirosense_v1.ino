/* =========================================================
   EnviroSense — ESP32 firmware
   Reads LDR, controls relay (bulb), syncs with Firebase RTDB
   so the web dashboard and this device stay in sync.
   ========================================================= */

#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include <DHT.h>

/* =========================================================
   WIFI CREDENTIALS
   ========================================================= */
#define WIFI_SSID     "YOUR_WIFI_SSID"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"

/* =========================================================
   FIREBASE CONFIG — matches your web app's firebaseConfig
   ========================================================= */
#define API_KEY      "YOUR_FIREBASE_WEB_API_KEY"
#define DATABASE_URL "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com/"

/* Dedicated device login you created in Firebase Auth */
#define USER_EMAIL    "YOUR_DEVICE_ACCOUNT_EMAIL"
#define USER_PASSWORD "YOUR_DEVICE_ACCOUNT_PASSWORD"

/* =========================================================
   PIN CONFIG
   ========================================================= */
#define LDR_PIN   34   // ADC pin, LDR voltage divider
#define RELAY_PIN 26   // Relay IN pin
#define DHT_PIN   27   // DHT11 data pin
#define DHT_TYPE  DHT11

DHT dht(DHT_PIN, DHT_TYPE);

/* =========================================================
   FIREBASE OBJECTS
   ========================================================= */
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

bool signupOK = false;
unsigned long lastSendTime = 0;
const unsigned long SEND_INTERVAL = 3000; // ms, matches web app's demo tick

/* Local mirror of device state */
String currentMode = "MANUAL";
bool currentBulbState = false;
int  ldrThreshold = 450;

void setup() {
  Serial.begin(115200);

  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH); // start with bulb OFF (active-LOW relay)

  dht.begin();

  /* ---------------- WiFi ---------------- */
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(300);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("Connected, IP: ");
  Serial.println(WiFi.localIP());

  /* ---------------- Firebase ---------------- */
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  auth.user.email    = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  config.token_status_callback = tokenStatusCallback;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  Serial.println("Signing in to Firebase...");
  unsigned long signupStart = millis();
  while (auth.token.uid == "" && millis() - signupStart < 15000) {
    delay(200);
  }

  if (auth.token.uid != "") {
    Serial.println("Firebase sign-in OK");
    signupOK = true;
  } else {
    Serial.println("Firebase sign-in FAILED — check email/password/rules");
  }

  /* Pull the current threshold and mode once at boot */
  if (signupOK) {
    if (Firebase.RTDB.getInt(&fbdo, "settings/ldrThreshold")) {
      ldrThreshold = fbdo.intData();
    }
    if (Firebase.RTDB.getString(&fbdo, "device/mode")) {
      currentMode = fbdo.stringData();
    }
    if (Firebase.RTDB.getBool(&fbdo, "device/bulbState")) {
      currentBulbState = fbdo.boolData();
      digitalWrite(RELAY_PIN, currentBulbState ? LOW : HIGH);
    }
  }
}

void loop() {
  if (!signupOK || !Firebase.ready()) return;

  /* -------------------------------------------------------
     Read LDR (0-4095 on ESP32 ADC), map to 0-1023 to match
     the threshold slider range used in the web app.
     ------------------------------------------------------- */
  int rawLdr = analogRead(LDR_PIN);
  int ldrValue = map(rawLdr, 0, 4095, 0, 1023);

  /* -------------------------------------------------------
     Pull latest mode / threshold / manual bulb command
     from Firebase so the device stays in sync with the web UI.
     ------------------------------------------------------- */
  if (Firebase.RTDB.getString(&fbdo, "device/mode")) {
    currentMode = fbdo.stringData();
  }

  if (Firebase.RTDB.getInt(&fbdo, "settings/ldrThreshold")) {
    ldrThreshold = fbdo.intData();
  }

  if (currentMode == "AUTO") {
    /* Device decides the bulb state from light level */
    bool shouldBeOn = ldrValue > ldrThreshold;
    if (shouldBeOn != currentBulbState) {
      currentBulbState = shouldBeOn;
      digitalWrite(RELAY_PIN, currentBulbState ? LOW : HIGH);
      Firebase.RTDB.setBool(&fbdo, "device/bulbState", currentBulbState);
    }
  } else {
    /* MANUAL mode — web app / user controls the bulb, device just follows */
    if (Firebase.RTDB.getBool(&fbdo, "device/bulbState")) {
      bool webBulbState = fbdo.boolData();
      if (webBulbState != currentBulbState) {
        currentBulbState = webBulbState;
        digitalWrite(RELAY_PIN, currentBulbState ? LOW : HIGH);
      }
    }
  }

  /* -------------------------------------------------------
     Push sensor reading to Firebase every SEND_INTERVAL.
     DHT11 needs at least ~2s between reads, so this interval
     (3s) is safe. If a read fails, keep the last good value.
     ------------------------------------------------------- */
  if (millis() - lastSendTime > SEND_INTERVAL) {
    lastSendTime = millis();

    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    if (isnan(temperature) || isnan(humidity)) {
      Serial.println("DHT11 read failed, skipping this cycle");
    } else {
      FirebaseJson json;
      json.set("ldr", ldrValue);
      json.set("temperature", temperature);
      json.set("humidity", humidity);

      if (Firebase.RTDB.updateNode(&fbdo, "sensors/current", &json)) {
        Serial.printf("Sent LDR=%d T=%.1f H=%.0f mode=%s bulb=%s\n",
                       ldrValue, temperature, humidity,
                       currentMode.c_str(), currentBulbState ? "ON" : "OFF");
      } else {
        Serial.println("Firebase send failed: " + fbdo.errorReason());
      }
    }
  }

  delay(200);
}
