import Config from "../Config"
import ThermostatSettingDBReader from "../temperature/ThermostatSettingDBReader"
import ThermostatData from "../data/ThermostatData"
import ThermostatElement from "../data/ThermostatElement"
import AWS = require("aws-sdk");

var handleFunc = function(err: AWS.AWSError, data: ThermostatData) : void {
    if (err) {
        throw err
    }

    //console.log(data.data);
}

async function test() {
    console.log("Testing DynamoDBReader");
    var reader = new ThermostatSettingDBReader();
    return reader.readToday(handleFunc);
}
AWS.config.region = Config.awsRegion;
test().then(function() {
});