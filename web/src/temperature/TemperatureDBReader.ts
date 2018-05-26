import AWS = require('aws-sdk')
import Config from "../Config"


import TemperatureRequestGenerator from "./TemperatureRequestGenerator"
import TemperatureData from "../data/TemperatureData"
import TemperatureElement from "../data/TemperatureElement"
import DateUtil from "../DateUtil"
import { QueryOutput } from 'aws-sdk/clients/dynamodb'

export default class TemperatureDBReader
{
    private dynamoDb : AWS.DynamoDB = new AWS.DynamoDB();
        
    constructor() {
    }

    public readToday(handleFunc?: (err: AWS.AWSError, data: TemperatureData) => void) : any {
        return this.query(DateUtil.getTodayCalendarDate(), handleFunc);
    }

    public query(calendarDate : string, handleFunc?: (err: AWS.AWSError, data: TemperatureData) => void) : any {
        var request : any  = TemperatureRequestGenerator.generateQuery(calendarDate);
        var self = this;
        var queryRequest = this.dynamoDb.query(request, function(err, data) {
            if (err) {
                throw err;
            }
            self.processData(err, data, handleFunc)
        });
        return queryRequest.promise;
    }

    private processData(err: AWS.AWSError, data: AWS.DynamoDB.Types.QueryOutput, handleFunc?: (err: AWS.AWSError, data: TemperatureData) => void) {
        var processedData : TemperatureData = new TemperatureData();
        for (var i in data.Items) {
            var processedElement = new TemperatureElement(data.Items[i]);
            if (!(processedElement.sensorName in processedData.data)) {
                processedData.data[processedElement.sensorName] = new Array<TemperatureElement>();
            }
            processedData.data[processedElement.sensorName].push(processedElement);
        }

        for (var key in processedData.data) {
            processedData.data[key].sort(function(d1 : TemperatureElement, d2 : TemperatureElement) : number { return d1.date.unix() - d2.date.unix() });
        }

        handleFunc(err, processedData);
    }
}