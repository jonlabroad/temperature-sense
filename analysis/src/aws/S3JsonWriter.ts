import AWS = require('aws-sdk')
import Config from '../Config';
import BinnedRates from '../data/BinnedRates';

export default class S3JsonWriter {
    private bucket : string;
    private s3 : AWS.S3;
    constructor() {
        this.s3 = new AWS.S3();
    }

    public write(path : string, data : Object) {
        this.s3.putObject({
                Bucket: Config.BucketName,
                Key: path,
                Body: JSON.stringify(data),
                ContentType: "application/json"
            }, function(err, data) {
                if (err) {
                    console.log(err, err.stack);
                }
                else {
                    console.log(`${path} uploaded`);
                }
        });
    }

    // This is a serious bunch of crap that I have to do this
    public writeMap(path : string, data : Map<string, BinnedRates>) {
        var newObj : Object = {};
        var keyArray = Array.from(data.keys());
        for (var i in keyArray) {
            var key = keyArray[i];
            newObj[key] = data.get(key);
        }
        this.write(path, newObj);
    }
}