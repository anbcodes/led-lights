#ifndef MYLEDS_CONSTS_H
#define MYLEDS_CONSTS_H

#define LED_COUNT 300

#define STREAM_SIZE LED_COUNT * 3

#define GREEN_LED_pin 25
#define BLUE_LED_pin 27
#define RED_LED_pin 26

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
