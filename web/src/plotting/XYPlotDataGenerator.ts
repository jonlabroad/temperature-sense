import Highcharts = require("highcharts");

export default class XYPlotDataGenerator
{
    public generate(seriesName : string, dataElements : any[], perElementFunc :  (data: any) => [number, number]) : Highcharts.IndividualSeriesOptions
    {
        var newSeries : Highcharts.IndividualSeriesOptions = {
            name: seriesName,
            data: []
        };

        for (var i in dataElements) {
            var datapoint = perElementFunc(dataElements[i]);
            if (datapoint != null) {
                newSeries.data.push(datapoint);
            }
        }
        return newSeries;
    }
}