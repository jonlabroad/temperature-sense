import Config from "../Config"
import DateUtil from "../DateUtil"

export default class WeatherDataRequestGenerator {
    constructor() {
    }

    public static generateQuery(calendarDate : string) : any {
        var request : any = {
            TableName: `${Config.weatherTableName}`,
            ExpressionAttributeValues: {
                ":v1": {
                    N: `${parseInt(calendarDate)}`
                }
            },
            KeyConditionExpression: "CalendarDate = :v1"
        }
        return request;
    }
}