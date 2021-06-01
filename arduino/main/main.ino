#include <FastLED.h>

#include <vector>

#include "consts.hpp"
// #include "utility/wifi_drv.h"

CRGB leds[LED_COUNT];

char buffer[STREAM_SIZE];

void color(int r, int g, int b) {
  // WiFiDrv::digitalWrite(RED_LED_pin, r);
  // WiFiDrv::digitalWrite(GREEN_LED_pin, g);
  // WiFiDrv::digitalWrite(BLUE_LED_pin, b);
}

void setup() {
  FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, LED_COUNT);
  Serial.begin(19200);
  PRINTLN("Starting Up");
}

void loop() {
  Serial.readBytes(buffer, 1);
  if (buffer[0] == 255) {
    Serial.readBytes(buffer, STREAM_SIZE);
    for (int i = 0; i < 300; i++) {
      leds[i] = CRGB(buffer[i * 3], buffer[i * 3 + 1], buffer[i * 3 + 2]);
    }
    FastLED.show();
  }

  if (buffer[0] == 254) {
    Serial.readBytes(buffer, STREAM_SIZE);
    for (int i = 0; i < 300; i++) {
      leds[i] = CHSV(buffer[i * 3], buffer[i * 3 + 1], buffer[i * 3 + 2]);
    }
    FastLED.show();
  }

  // FastLED.showColor(CRGB(0, 0, 0));
}
