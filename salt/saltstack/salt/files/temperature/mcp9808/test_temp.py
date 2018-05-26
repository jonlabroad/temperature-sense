#!/usr/bin/python

import time
import Adafruit_MCP9808.MCP9808 as MCP9808

def c_to_f(c):
    return c * 9.0 / 5.0 + 32.0

sensor = MCP9808.MCP9808()

sensor.begin()

temp = sensor.readTempC()
print('{0:0.3F}*F'.format(c_to_f(temp)))