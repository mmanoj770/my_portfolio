# Task 5 — Firebase Logging, Automation & Data Export

Builds on Task 4: Manual / Automatic mode, LDR-based automatic lighting, timestamped history in Firebase, Chart.js graph, history table and CSV download.

## Files
| File | Purpose |
|---|---|
| `firmware/smarthome_esp32/smarthome_esp32.ino` | Monitoring, manual + automatic control, logging every 3 s |
| `firmware/ldr_calibration/ldr_calibration.ino` | Prints min / avg / max LDR readings to pick the threshold |
| `web/dashboard.html` | Mode buttons, threshold display, chart, table, `downloadCSV()` |
| `web/index.html` | Login page |
| `database-structure.json`, `database.rules.json` | Log structure and security rules |

## Automatic lighting logic
Every second, in `automatic` mode: `bulb ON if ldr < ldrThreshold` (more light = higher reading with this divider), and the decision is written back to `smarthome/devices/esp32_001/status` so the dashboard shows it. `ldrThreshold` (default 400) lives in Firebase so it can be tuned without re-flashing.

## Log row
`smarthome/sensorData/esp32_001/<epoch ms>` → `{ temperature, humidity, ldr, bulbState, mode }`

## CSV export
`smarthome_sensor_history.csv` — `Timestamp,Temperature(C),Humidity(%),LDR,Bulb_State,Operating_Mode`
