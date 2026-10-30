# Task 2 — Adafruit IO Dashboard & MQTT

The ESP32 subscribes to the Adafruit IO feed `esp` over MQTT. A dashboard Toggle block publishes `ON` / `OFF` to that feed and the ESP32 switches a relay wired to a 230 V bulb.

| MQTT role | Here |
|---|---|
| Publisher | Adafruit IO dashboard Toggle block (and IFTTT in Task 3) |
| Broker | `io.adafruit.com` (8883 TLS / 1883) |
| Subscriber | ESP32 (`task2_mqtt_relay.ino`) |
| Topic | `<username>/feeds/esp`, payload `ON` / `OFF` |

## Adafruit IO setup
1. Create an account at io.adafruit.com; copy the username and **AIO Key** (key icon).
2. Feeds → New Feed → `esp`.
3. Dashboards → New Dashboard → add a **Toggle** block on feed `esp` with ON text `ON` and OFF text `OFF` (optionally a Stream block for history).

## Wiring
| ESP32 | Relay module |
|---|---|
| VIN (5 V) | VCC |
| GND | GND |
| GPIO 26 | IN (active-HIGH) |

Mains: live → relay COM, relay NO → bulb → neutral. Wire only while unplugged.

## Library
Arduino Library Manager → **Adafruit IO Arduino** (installs Adafruit MQTT Library).
