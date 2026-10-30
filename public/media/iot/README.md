# IoT Session Media Folder

Photos, screenshots and videos used on the /iot page. Evidence slots on the page only
appear once their file exists, so adding a file below (then pushing) is all that is needed.
For the slots marked *add*, any of `.png`, `.jpg`, `.jpeg`, `.webp` (or `.mp4` for videos) works.

## Already on the page
- `hero.jpg` — cover photo
- `task1/` — `on.jpg`, `off.jpg` (web UI + board), `demo-frame.jpg`, `setup.jpg`, `board.jpg`, `demo.mp4`
- `task2/` — `relay-bulb-off-frame.jpg`, `relay-bulb-on-frame.jpg` (stills from `demo.mp4`), `demo.mp4`,
  `dashboard.jpg` (Firebase dashboard before the path fix — used in Task 4 challenges)
- `task3/demo.mp4`
- `task4-dash/` — `login.jpg`, `dashboard-full.jpg`; `task4-cloud/rtdb-console.jpg`; `task4-hw/demo.mp4`
- `task5/` — `lab-bulb-on-frame.jpg`, `lab-bulb-off-frame.jpg` (stills from `journey/video-lab.mp4`)
- `journey/` — build journey photos and lab clips

## Add — Task 2 (Adafruit IO)
- `task2/adafruit-dashboard` — the dashboard with the Bulb toggle
- `task2/adafruit-feed` — the `esp` feed page showing ON / OFF history
- `task2/adafruit-toggle-settings` — the Toggle block settings (ON text / OFF text)
- `task2/serial-monitor` — Serial Monitor showing "Received from feed: ON"

## Add — Task 3 (IFTTT)
- `task3/ifttt-applets` — My Applets list showing Bulb On / Bulb Off
- `task3/ifttt-trigger` — Google Assistant "Activate scene" trigger settings
- `task3/ifttt-webhook` — Webhooks action settings (hide the AIO key!)
- `task3/ifttt-activity` — the applet's activity log with run times
- `task3/adafruit-feed` — the `esp` feed history after voice commands
- `task3/voice-demo` (video) — saying the phrase and the bulb switching

## Add — Task 4 (Firebase dashboard)
- `task4/firebase-rtdb-data` — Realtime Database → Data tab with `smarthome` expanded
- `task4/firebase-auth-users` — Authentication → Users list
- `task4/firebase-rules` — Realtime Database → Rules tab
- `task4/prototype` — photo of the ESP32 with DHT11, LDR and relay
- `task4/webpage-workflow` (video) — screen recording: login → dashboard → Turn ON/OFF → mode switch

## Add — Task 5 (logging & export)
- `task5/smarthome_sensor_history.csv` — the CSV downloaded from the dashboard (shown as a table on the page)
- `task5/csv-opened` — that CSV opened in Excel / Google Sheets
- `task5/firebase-logs` — Data tab with `smarthome/sensorData/esp32_001` expanded
- `task5/history-table` — the dashboard's Sensor History table
- `task5/automatic-mode-dark` — Automatic mode with the LDR covered and the bulb ON
- `task5/full-system` (video) — live data, manual control, automatic mode, CSV download
