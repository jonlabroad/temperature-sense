declare const Promise: any;
import AWS = require('aws-sdk')
import Config from "../Config"


import ThermostatSettingRequestGenerator from "./ThermostatSettingRequestGenerator"
import ThermostatData from "../data/ThermostatData"
import ThermostatElement from "../data/ThermostatElement"
import DateUtil from "../DateUtil"
import { QueryOutput } from 'aws-sdk/clients/dynamodb'

export default class ThermostatSettingDBReader
{
    private dynamoDb : AWS.DynamoDB = new AWS.DynamoDB();
        
    constructor() {
    }

    public readToday(handleFunc?: (err: AWS.AWSError, data: ThermostatData) => void) : any {
        return this.query(DateUtil.getTodayCalendarDate(), handleFunc);
    }

    public query(calendarDate : string, handleFunc?: (err: AWS.AWSError, data: ThermostatData) => void) : any {
        var request : any  = ThermostatSettingRequestGenerator.generateQuery(calendarDate);
        var self = this;
        var queryRequest = this.dynamoDb.query(request, function(err, data) {
            if (err) {
                throw err;
            }
            self.processData(err, data, handleFunc)
        });
        return queryRequest.promise;
    }

    private processData(err: AWS.AWSError, data: AWS.DynamoDB.Types.QueryOutput, handleFunc?: (err: AWS.AWSError, data: ThermostatData) => void) {
        var processedData : ThermostatData = new ThermostatData();
        for (var i in data.Items) {
            var processedElement = new ThermostatElement(data.Items[i]);
            processedData.data.push(processedElement);
        }

        processedData.data.sort(function(d1 : ThermostatElement, d2 : ThermostatElement) : number { return d1.date.unix() - d2.date.unix() });

        handleFunc(err, processedData);
    }
}