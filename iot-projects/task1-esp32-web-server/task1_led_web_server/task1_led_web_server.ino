/* =========================================================
   Task 1 — ESP32 Web Server & HTML LED Control
   The ESP32 joins Wi-Fi, serves the control page at "/" and
   exposes three HTTP endpoints that the page calls with fetch():
     GET /api/on      -> LED on,  replies "ON"
     GET /api/off     -> LED off, replies "OFF"
     GET /api/status  -> replies the current state
   ========================================================= */

#include <WiFi.h>
#include <WebServer.h>

/* ---------------- Wi-Fi (2.4 GHz only) ---------------- */
const char* ssid     = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

/* ---------------- Hardware ---------------- */
const int LED_PIN = 2;   // onboard blue LED on the ESP32 DevKit
bool ledState = false;

WebServer server(80);    // HTTP server on port 80

/* The same page as index.html, stored in flash and sent on "GET /" */
const char INDEX_HTML[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ESP32 LED Control</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: "Segoe UI", Arial, sans-serif;
      background: linear-gradient(135deg, #3f7be0, #6a5fd6);
    }

    .card {
      width: 340px;
      background: #fff;
      border-radius: 24px;
      padding: 36px 28px 20px;
      text-align: center;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
    }

    h1 { font-size: 34px; font-weight: 800; color: #111; }

    .subtitle {
      margin-top: 6px;
      font-size: 12px;
      letter-spacing: 0.15em;
      color: #666;
    }

    /* The "bulb" — grey when OFF, glowing yellow when ON */
    .orb {
      width: 110px;
      height: 110px;
      margin: 36px auto;
      border-radius: 50%;
      background: #e5e5e5;
      box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.08);
      transition: background 0.3s, box-shadow 0.3s;
    }

    .orb.on {
      background: radial-gradient(circle at 40% 35%, #ffd84d, #f0b400);
      box-shadow: 0 0 40px 12px rgba(255, 200, 0, 0.45);
    }

    .buttons { display: flex; gap: 12px; }

    button {
      flex: 1;
      padding: 13px 0;
      border: none;
      border-radius: 10px;
      color: #fff;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
    }

    button:active { transform: scale(0.97); }
    .btn-on  { background: #2e8b1e; }
    .btn-off { background: #c8410f; }

    .status {
      margin-top: 22px;
      padding: 18px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 15px;
    }

    .status.on  { background: #c9e7c4; color: #1d5e14; }
    .status.off { background: #f3d2c8; color: #7a2a12; }
    .status.err { background: #eeeeee; color: #555; }

    footer {
      margin-top: 22px;
      padding-top: 14px;
      border-top: 1px solid #eee;
      font-size: 11px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>LED Control</h1>
    <p class="subtitle">SMART ESP32</p>

    <div id="orb" class="orb"></div>

    <div class="buttons">
      <button class="btn-on" onclick="sendCommand('on')">TURN ON</button>
      <button class="btn-off" onclick="sendCommand('off')">TURN OFF</button>
    </div>

    <div id="status" class="status off">[OFF] LED is OFF</div>

    <footer>ESP32 LED Controller v1.0</footer>
  </div>

  <script>
    // Update the orb and status box from the ESP32's reply ("ON" / "OFF")
    function render(state) {
      const on = state.trim() === "ON";
      document.getElementById("orb").className = on ? "orb on" : "orb";

      const status = document.getElementById("status");
      status.className = on ? "status on" : "status off";
      status.textContent = on ? "[ON] LED is ON" : "[OFF] LED is OFF";
    }

    // A button click becomes an HTTP GET request to the ESP32.
    // The path is relative, so the browser sends it to the same IP
    // that served this page, e.g. http://192.168.137.59/api/on
    function sendCommand(cmd) {
      fetch("/api/" + cmd)
        .then(function (res) { return res.text(); })
        .then(render)
        .catch(function () {
          const status = document.getElementById("status");
          status.className = "status err";
          status.textContent = "ESP32 not reachable";
        });
    }

    // Ask for the real LED state every second so every open tab stays in sync
    function poll() {
      fetch("/api/status")
        .then(function (res) { return res.text(); })
        .then(render)
        .catch(function () {});
    }

    poll();
    setInterval(poll, 1000);
  </script>
</body>
</html>
)rawliteral";

/* ---------------- Route handlers ---------------- */
void sendState() {
  server.send(200, "text/plain", ledState ? "ON" : "OFF");
}

void handleRoot() {
  server.send(200, "text/html", INDEX_HTML);
}

void handleOn() {
  ledState = true;
  digitalWrite(LED_PIN, HIGH);
  Serial.println("GET /api/on  -> LED ON");
  sendState();
}

void handleOff() {
  ledState = false;
  digitalWrite(LED_PIN, LOW);
  Serial.println("GET /api/off -> LED OFF");
  sendState();
}

void handleNotFound() {
  server.send(404, "text/plain", "Not found");
}

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("Connected! Open http://");
  Serial.println(WiFi.localIP());   // type this IP into the browser

  server.on("/", handleRoot);
  server.on("/api/on", handleOn);
  server.on("/api/off", handleOff);
  server.on("/api/status", sendState);
  server.onNotFound(handleNotFound);
  server.begin();
  Serial.println("HTTP server started on port 80");
}

void loop() {
  server.handleClient();   // check for and answer incoming HTTP requests
}
