#!/usr/bin/env bash
# Sends exactly the request the IFTTT Webhooks action sends, so the
# Adafruit IO -> MQTT -> ESP32 half of the chain can be tested without
# Google Assistant.  Usage:  ./simulate_ifttt.sh ON   |   ./simulate_ifttt.sh OFF
set -euo pipefail

AIO_USERNAME="${AIO_USERNAME:-YOUR_ADAFRUIT_IO_USERNAME}"
AIO_KEY="${AIO_KEY:-YOUR_ADAFRUIT_IO_KEY}"
VALUE="${1:-ON}"

curl -sS -X POST "https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/esp/data" \
  -H "Content-Type: application/json" \
  -H "X-AIO-Key: ${AIO_KEY}" \
  -d "{\"value\": \"${VALUE}\"}"
echo
