import AWS = require('aws-sdk')
import Config from "../Config"

export default class Credentials
{
    public init() {
        var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
        AWS.config.credentials = credentials;
        AWS.config.update({region: `${Config.awsRegion}`});
    }
}