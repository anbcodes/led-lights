#ifndef MYWIFI_H
#define MYWIFI_H

#include <WiFiNINA.h>

#include "Arduino.h"
#include "consts.hpp"

class Wifi {
 public:
  WiFiClient currentClient;

  void sendResponse(String response);
  int getTCPRequest(short buffer[TCP_PACKETSIZE]);
  int getUDPRequest(char buffer[UDP_PACKETSIZE]);
  void setCurrentClient();
  void connect();
  void printStatus();

 private:
  void color(int r, int g, int b);
};

#endif
