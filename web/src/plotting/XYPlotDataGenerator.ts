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
            newSeries.data.push(perElementFunc(dataElements[i]));
        }
        return newSeries;
    }
}