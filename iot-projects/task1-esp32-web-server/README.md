# Task 1 — ESP32 Web Server & HTML LED Control

The ESP32 joins a 2.4 GHz Wi-Fi network, serves a control page at `/` and switches the on-board LED (GPIO 2) through three HTTP endpoints.

| Endpoint | Action | Reply |
|---|---|---|
| `GET /` | Sends the LED Control page | HTML |
| `GET /api/on` | GPIO 2 HIGH | `ON` |
| `GET /api/off` | GPIO 2 LOW | `OFF` |
| `GET /api/status` | — | `ON` / `OFF` |

## Files
- `task1_led_web_server/task1_led_web_server.ino` — complete sketch (the page is embedded as a raw string)
- `index.html` — the same page on its own, for reading / editing

## Run it
1. Arduino IDE → install **esp32 by Espressif** → board **ESP32 Dev Module**.
2. Set `ssid` / `password` (2.4 GHz network).
3. Upload (hold **BOOT** if it stalls at "Connecting…"), open the Serial Monitor at **115200** and note the IP.
4. On a device on the same network, open `http://<that IP>/`.

Wiring: none — GPIO 2 drives the on-board LED. For an external LED: GPIO 2 → 220 Ω → LED → GND.
