export default class Config
{
    public static projectName : string = "jdlhomedashboard";

    // Temperature
    public static temperatureTableName : string = "HomeTemperature";

    // AWS
    public static awsRegion : string = "us-east-1"; // Bleh, won't read my user config for some reason
    public static identityPoolId : string = "us-east-1:6029da46-2a8d-4a5d-89eb-d40aeba71480"

    public static timezone : string = "America/New_York";
}