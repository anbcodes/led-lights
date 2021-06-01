#include "WiFi.h"
// clang-format off
#include <FastLED.h>
#include <SPI.h>
#include <WiFiNINA.h>
// clang-format on

#include <bitset>
#include <sstream>

#include "Arduino.h"
#include "utility/wifi_drv.h"
#include "wifi.h"
#include "consts.hpp"

int status = WL_IDLE_STATUS;

WiFiServer server(2728);
WiFiUDP Udp;

#define GREEN_LED_pin 25
#define BLUE_LED_pin 27
#define RED_LED_pin 26

void Wifi::color(int r, int g, int b) {
  WiFiDrv::digitalWrite(RED_LED_pin, r);
  WiFiDrv::digitalWrite(GREEN_LED_pin, g);
  WiFiDrv::digitalWrite(BLUE_LED_pin, b);
}

void Wifi::connect() {
  WiFiDrv::pinMode(BLUE_LED_pin, OUTPUT);
  WiFiDrv::pinMode(RED_LED_pin, OUTPUT);
  WiFiDrv::pinMode(GREEN_LED_pin, OUTPUT);

  Serial.begin(9600);
  delay(3000);
  color(255, 0, 0);
  FastLED.setBrightness(255);

  if (WiFi.status() == WL_NO_MODULE) {
    PRINTLN("Communication with WiFi module failed!");

    while (true)
      ;
  }

  arduino::String fv = WiFi.firmwareVersion();

  if (fv < WIFI_FIRMWARE_LATEST_VERSION) {
    PRINTLN("Please upgrade the firmware");
    PRINTLN(WIFI_FIRMWARE_LATEST_VERSION);
  }

  while (status != WL_CONNECTED) {
    PRINT("Attempting to connect to SSID: ");

    PRINTLN(WIFI_SSID);

    status = WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    if (status == WL_CONNECTED) {
      break;
    }

    PRINTLN(status);

    delay(4000);
  }

  server.begin();
  Udp.begin(5784);

  color(0, 0, 0);
}

void Wifi::printStatus() {
  PRINT("SSID: ");
  PRINTLN(WiFi.SSID());

  IPAddress ip = WiFi.localIP();
  PRINT("IP Address: ");
  PRINTLN(ip);

  long rssi = WiFi.RSSI();
  PRINT("signal strength (RSSI):");
  PRINT(rssi);
  PRINTLN(" dBm");
}

int Wifi::getTCPRequest(short int buffer[TCP_PACKETSIZE]) {
  WiFiClient client = server.available();
  if (client) {
    currentClient = client;
    PRINTLN("getting request");

    char last = 0;
    char count = 0;

    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        if (count % 2 == 0) {
          last = c;
        } else {
          short int num = (c << 8) + last;
          buffer[count / 2] = num;
          if (num == BREAK) {
            return count;
          }
        }
        count++;
      }
    }
  } else {
    currentClient = NULL;
    return 0;
  }
  return 0;
}

int Wifi::getUDPRequest(char buffer[UDP_PACKETSIZE]) {
  int packetSize = Udp.parsePacket();
  int start = millis();
  color(255, 0, 0);
  while (!packetSize && millis() - start < 1000) {
    packetSize = Udp.parsePacket();
    if (packetSize) {
      Udp.read(buffer, UDP_PACKETSIZE);
    }
  };
  color(0, 0, 0);

  return packetSize;
  // if (packetSize) {
  //   // color(0, 255, 0);
  //   return Udp.read(buffer, UDP_PACKETSIZE);
  //   // color(0, 0, 0);
  // } else {
  //   return 0;
  // }
}

void Wifi::setCurrentClient() {
  WiFiClient client = server.available();
  if (client) {
    currentClient = client;
  } else {
    currentClient = NULL;
  }
}

void Wifi::sendResponse(String message) {
  currentClient.print(message.c_str());
  currentClient.print("\n");
}