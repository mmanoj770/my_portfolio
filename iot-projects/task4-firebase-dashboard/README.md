# Task 4 — Firebase IoT Monitoring Dashboard

ESP32 (DHT11 + LDR + relay) ↔ Firebase Realtime Database ↔ login-protected web dashboard.

## Files
| File | Purpose |
|---|---|
| `firmware/smarthome_esp32/smarthome_esp32.ino` | ESP32 firmware using the dashboard's database paths |
| `firmware/envirosense_v1/envirosense_v1.ino` | First version (wrote to `sensors/current` / `device/*`, which the dashboard never read) |
| `web/index.html` | Login / create-account page (Firebase Auth, email + password) |
| `web/dashboard.html` | Live cards, bulb control, mode, threshold, history chart + table, CSV |
| `database.rules.json` | Realtime Database rules (`auth != null`) |
| `database-structure.json` | Database tree with example values |

## Database
```
smarthome/
  devices/esp32_001/        status "on"|"off", mode "manual"|"automatic", ldrThreshold, lastUpdate
  sensorData/esp32_001/<epoch ms>/   temperature, humidity, ldr, bulbState, mode
```

## Wiring
| Component | ESP32 |
|---|---|
| DHT11 DATA / VCC / GND | GPIO 27 / 3V3 / GND |
| LDR divider (3V3 → LDR → node → 10 kΩ → GND) | node → GPIO 34 |
| Relay IN / VCC / GND (active-LOW) | GPIO 26 / VIN 5 V / GND |

## Setup
1. Firebase console → create project → Realtime Database (locked mode) → publish `database.rules.json`.
2. Authentication → enable Email/Password → add a device user for the ESP32.
3. Register a web app and paste its `firebaseConfig` into both HTML files.
4. Firmware: set Wi-Fi, `API_KEY`, `DATABASE_URL`, device email/password. Libraries: Firebase ESP Client (mobizt), DHT sensor library, Adafruit Unified Sensor.
5. Host the `web/` files with `firebase init hosting` → `firebase deploy` (or open locally).
