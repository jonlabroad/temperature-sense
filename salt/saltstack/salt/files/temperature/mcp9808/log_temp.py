#!/usr/bin/python

import time
from pytz import timezone
import Adafruit_MCP9808.MCP9808 as MCP9808
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

def writeTemp(tempF):
    item = {
        'CalendarDate': { 'N': str(getCalendarDate()) },
        'HourMin': { 'N': str(getHourMin()) },
        'SensorHourMin': { 'S': getSensorHourMin() },
        'SensorId': { 'S': getSensorName() },
        'TempF': { 'N': str(tempF) }
    }
    print(item)
    dynamodb.put_item(TableName=tableName, Item=item)

sensor = MCP9808.MCP9808()
sensor.begin()

avgTempF = sampleTemp()
print('{0:0.3F}'.format(avgTempF))
writeTemp(avgTempF)
