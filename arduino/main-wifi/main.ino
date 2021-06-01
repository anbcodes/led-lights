// clang-format off
#include <FastLED.h>
#include <SPI.h>
#include <WiFiNINA.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>
// clang-format on

#include <vector>

#include "utility/wifi_drv.h"
#include "wifi.h"
#include "consts.hpp"

CRGB leds[LED_COUNT];

Wifi wifi;

char UDPBuffer[UDP_PACKETSIZE];
short TCPBuffer[TCP_PACKETSIZE];

bool lightsAreOn = false;
bool isStreaming = false;

void color(int r, int g, int b) {
  WiFiDrv::digitalWrite(RED_LED_pin, r);
  WiFiDrv::digitalWrite(GREEN_LED_pin, g);
  WiFiDrv::digitalWrite(BLUE_LED_pin, b);
}

void setup() {
  FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, LED_COUNT);
  // wifi.connect();
  // wifi.printStatus();
  // ArduinoOTA.begin(WiFi.localIP(), "Arduino", "password", InternalStorage);
}

void getStream() {
  int len = wifi.getUDPRequest(UDPBuffer);
  if (len) {
    for (int i = 0; i < 300; i++) {
      leds[i] =
          CHSV(UDPBuffer[i * 3], UDPBuffer[i * 3 + 1], UDPBuffer[i * 3 + 2]);
    }
    // color(0, 0, 255);
  }
}

void parseTCPPacket() {
  // int len = wifi.getTCPRequest(TCPBuffer);
  int len = 0;
  if (len) {
    switch (TCPBuffer[0]) {
      case START_STREAMING:
        isStreaming = true;
        break;
      case STOP_STREAMING:
        isStreaming = false;
        break;
      case SET_MODE:
        // TODO: Set led display mode
        break;
      case LIGHTS_ON:
        lightsAreOn = true;
        break;
      case LIGHTS_OFF:
        lightsAreOn = false;
        break;
      default:
        break;
    }
  }
}

void displayLEDMode() {}

void loop() {
  ArduinoOTA.poll();

  if (isStreaming) {
    getStream();
  }

  parseTCPPacket();

  if (!isStreaming) {
    displayLEDMode();
  }

  if (lightsAreOn) {
    FastLED.show();
  } else {
    leds[LED_COUNT - 1] = CRGB(255, 255, 255);
    for (int i = 0; i < LED_COUNT - 1; i++) {
      if (i % 10 == 0) {
        leds[i] = CRGB(255, 255, 255);
      } else {
        leds[i] = CRGB(0, 0, 0);
      }
    }
    FastLED.show();
    // FastLED.showColor(CRGB(255, 255, 255));
  }
}
