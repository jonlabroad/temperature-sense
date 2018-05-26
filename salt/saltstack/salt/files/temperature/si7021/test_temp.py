#!/usr/bin/python

import time
import SI7021.SI7021 as SI7021

def c_to_f(c):
    return c * 9.0 / 5.0 + 32.0

sensor = SI7021.SI7021()

sensor.begin()

temp = sensor.readTempC()
print('{0:0.3F}*F'.format(c_to_f(temp)))

humidity = sensor.readHumidity()
print('{0:0.1F}%'.format(humidity))