#!/usr/bin/python

import time
from pytz import timezone
import SI7021.SI7021 as SI7021
import boto3
import socket

from datetime import datetime

timezone = timezone("US/Eastern")
tableName = "HomeTemperature"
numMeasurements = 10
measurementDelaySec = 2
dynamodb = boto3.client('dynamodb')

def c_to_f(c):
    return c * 9.0 / 5.0 + 32.0

def getCalendarDate():
    d = datetime.now(timezone)
    return int("%d%02d%02d" % (d.year, d.month, d.day))
def getHourMin():
    d = datetime.now(timezone)
    return int("%d%02d" % (d.hour, d.minute))

def getSensorHourMin():
    return '{0}_{1}'.format(getSensorName(), getHourMin())

def getSensorName():
    return socket.gethostname()

def getTempF():
    tempC = sensor.readTempC()
    tempF = c_to_f(tempC)
    return tempF

def looksValid(tempF):
    return tempF > 45 and tempF < 100

def looksValidHumidity(humidity):
    return humidity >= 0 and humidity <= 100

def sampleTemp():
    avgTempF = -1
    numMeas = 0
    for i in range(0, numMeasurements):
        tempF = getTempF()
        if not looksValid(tempF):
            continue

        if (numMeas == 0):
            avgTempF = tempF
        else:
            avgTempF = (avgTempF * numMeas + tempF)/(numMeas + 1)

        numMeas = numMeas + 1
        print('{0}: {1:0.3F}'.format(numMeas, tempF))

        time.sleep(measurementDelaySec)
    
    return avgTempF

def sampleHumidity():
    avgHumidity = -1
    numMeas = 0
    for i in range(0, numMeasurements):
        try:
            humidity = sensor.readHumidity()
        except e:
            print e
            continue

        if not looksValidHumidity(humidity):
            continue

        if (numMeas == 0):
            avgHumidity = humidity
        else:
            avgHumidity = (avgHumidity * numMeas + humidity)/(numMeas + 1)

        numMeas = numMeas + 1
        print('{0}: {1:0.3F}'.format(numMeas, humidity))

        time.sleep(measurementDelaySec)
    
    return avgHumidity

def write(tempF, humidity):
    item = {
        'CalendarDate': { 'N': str(getCalendarDate()) },
        'HourMin': { 'N': str(getHourMin()) },
        'SensorHourMin': { 'S': getSensorHourMin() },
        'SensorId': { 'S': getSensorName() },
        'TempF': { 'N': str(tempF) },
        'Humidity': { 'N': str(humidity) }
    }
    print(item)
    dynamodb.put_item(TableName=tableName, Item=item)

sensor = SI7021.SI7021()

avgTempF = sampleTemp()
print('{0:0.3F}'.format(avgTempF))

avgHumidity = sampleHumidity()
print('{0:0.1F}%'.format(avgHumidity))
write(avgTempF, avgHumidity)
