import AWS = require('aws-sdk')
import Config from "../Config"


import DateUtil from "../DateUtil"
import { QueryOutput } from 'aws-sdk/clients/dynamodb'
import WeatherData from '../data/WeatherData';
import WeatherElement from '../data/WeatherElement';
import WeatherDataRequestGenerator from './WeatherDataRequestGenerator';

export default class WeatherDBReader
{
    private dynamoDb : AWS.DynamoDB = new AWS.DynamoDB();
        
    constructor() {
    }

    public readToday(handleFunc?: (err: AWS.AWSError, data: WeatherData) => void) : any {
        return this.query(DateUtil.getTodayCalendarDate(), handleFunc);
    }

    public query(calendarDate : string, handleFunc?: (err: AWS.AWSError, data: WeatherData) => void) : any {
        var request : any  = WeatherDataRequestGenerator.generateQuery(calendarDate);
        var self = this;
        var queryRequest = this.dynamoDb.query(request, function(err, data) {
            if (err) {
                throw err;
            }
            self.processData(err, data, handleFunc)
        });
        return queryRequest.promise;
    }

    private processData(err: AWS.AWSError, data: AWS.DynamoDB.Types.QueryOutput, handleFunc?: (err: AWS.AWSError, data: WeatherData) => void) {
        var processedData : WeatherData = new WeatherData();
        processedData.data = [];
        for (var i in data.Items) {
            var processedElement = new WeatherElement(data.Items[i]);
            processedData.data.push(processedElement);
        }

        processedData.data.sort(function(d1 : WeatherElement, d2 : WeatherElement) : number { return d1.date.unix() - d2.date.unix() });
        handleFunc(err, processedData);
    }
}