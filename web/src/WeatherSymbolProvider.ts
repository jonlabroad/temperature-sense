export default class WeatherSymbolProvider
{
    private static baseUrl = "https://cdn.rawgit.com/YR/weather-symbols/6.0.2/dist/svg/";
    private static symbolMap : { [key:string]:string; } = {
        "clear-day": "01d",
        "clear-night": "01n",
        "rain": "09",
        "snow": "13",
        "sleet": "12",
        "wind": "15",
        "fog": "15",
        "cloudy": "04",
        "partly-cloudy-day": "03d",
        "partly-cloudy-night": "03n"
    };

    public static getSymbolUrl(icon : string) : string {
        var symbol : string  = "32";
        if (WeatherSymbolProvider.symbolMap[icon]) {
            symbol = WeatherSymbolProvider.symbolMap[icon];
        }
        return WeatherSymbolProvider.baseUrl + symbol + ".svg";
    }
}