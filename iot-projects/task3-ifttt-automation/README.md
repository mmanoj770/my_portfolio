# Task 3 — IFTTT + Adafruit IO IoT Automation

"Hey Google, activate Bulb On" → IFTTT → Adafruit IO → MQTT → ESP32 → relay → bulb.
The ESP32 firmware is unchanged from Task 2: IFTTT writes into the same `esp` feed the dashboard uses.

| Applet | Trigger (If This) | Action (Then That) |
|---|---|---|
| Bulb On | Google Assistant — Activate scene "Bulb On" | Webhooks — POST `{"value":"ON"}` to `https://io.adafruit.com/api/v2/<username>/feeds/esp/data` |
| Bulb Off | Google Assistant — Activate scene "Bulb Off" | Webhooks — POST `{"value":"OFF"}` to the same URL |

Webhook settings: method `POST`, content type `application/json`, additional header `X-AIO-Key: <your key>`.

## Files
- `task3_ifttt_relay/task3_ifttt_relay.ino` — ESP32 firmware (same as Task 2)
- `ifttt/applet-bulb-on.json`, `ifttt/applet-bulb-off.json` — applet settings
- `ifttt/simulate_ifttt.sh` — sends the same request as IFTTT to test without voice:
  `AIO_USERNAME=... AIO_KEY=... ./ifttt/simulate_ifttt.sh ON`
