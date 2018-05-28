export default class BaseLinePlotConfigurator
{
    public configure(title : string, xLabel : string, yLabel : string) : Highcharts.Options {
        var chartDef : Highcharts.Options = {
            title: {
                text: title
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: xLabel
                }
            },
            yAxis: {
                title: {
                    text: yLabel
                },
            },            
            plotOptions: {
                line: {
                    marker: {
                        enabled: false
                    }
                }
            }
        }
        return chartDef;
    }
}