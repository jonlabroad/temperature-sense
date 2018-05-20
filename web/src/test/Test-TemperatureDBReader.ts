import Config from "../Config"
import TemperatureDBReader from "../temperature/TemperatureDBReader"
import TemperatureData from "../data/TemperatureData"
import TemperatureElement from "../data/TemperatureElement"
import AWS = require("aws-sdk");

var handleFunc = function(err: AWS.AWSError, data: TemperatureData) : void {
    if (err) {
        throw err
    }

    //console.log(data.data);
}

async function test() {
    console.log("Testing DynamoDBReader");
    var reader = new TemperatureDBReader();
    return reader.readToday(handleFunc);
}
AWS.config.region = Config.awsRegion;
test().then(function() {
});