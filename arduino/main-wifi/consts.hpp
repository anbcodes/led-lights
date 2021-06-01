#ifndef MYLEDS_CONSTS_H
#define MYLEDS_CONSTS_H

#define WIFI_SSID "Baumes-guest"
#define WIFI_PASSWORD "wylmiywn"

#define LED_COUNT 300

#define BREAK -32768
#define TCP_PACKETSIZE 200
#define UDP_PACKETSIZE LED_COUNT * 3
#define BUFFER_SIZE 20
#define STREAM_BUFFER_SIZE LED_COUNT* BUFFER_SIZE

#define GREEN_LED_pin 25
#define BLUE_LED_pin 27
#define RED_LED_pin 26

enum TCPType {
  START_STREAMING,
  STOP_STREAMING,
  SET_MODE,
  LIGHTS_ON,
  LIGHTS_OFF,
};

#define DATA_PIN 6

#ifndef PRINT
#define PRINT(v) Serial.print(v)
// #define PRINT(v)
#endif

#ifndef PRINTLN
#define PRINTLN(v) Serial.println(v)
// #define PRINTLN(v)
#endif

#endif
