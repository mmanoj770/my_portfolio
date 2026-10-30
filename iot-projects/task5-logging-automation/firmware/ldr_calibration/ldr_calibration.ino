/* =========================================================
   LDR calibration helper (Task 5)
   Prints the min / average / max of 50 raw readings every
   second, so the automatic threshold can be chosen from real
   numbers: note the values in bright light, normal room light
   and darkness (LDR covered), then pick a threshold between
   "dim room" and "dark".
   Wiring: 3V3 -> LDR -> GPIO34 -> 10k -> GND (more light = higher)
   ========================================================= */

#define LDR_PIN 34

void setup() {
  Serial.begin(115200);
}

void loop() {
  int minV = 4095, maxV = 0;
  long sum = 0;

  for (int i = 0; i < 50; i++) {
    int v = analogRead(LDR_PIN);
    sum += v;
    if (v < minV) minV = v;
    if (v > maxV) maxV = v;
    delay(20);
  }

  Serial.printf("LDR  min=%4d  avg=%4ld  max=%4d\n", minV, sum / 50, maxV);
  delay(1000);
}
