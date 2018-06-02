import * as React from "react";
import * as ReactDOM from "react-dom";

import TemperatureLinePlot from "../TemperatureLinePlot"
import DateControl from "../DateControl"
import DateUtil from "../../DateUtil"
import Credentials from "../../aws/Credentials"
import * as Moment from "moment-timezone"
import TemperatureData from "../../data/TemperatureData";
import ThermostatData from "../../data/ThermostatData";
import TemperatureDataProvider from "../../TemperatureDataProvider";
import HumidityLinePlot from "../HumdityLinePlot";
import WeatherPlot from "../WeatherPlot";
import WeatherData from "../../data/WeatherData";
import WeatherDataProvider from "../../WeatherDataProvider";
import TemperatureLineSettings from "../TemperatureLineSettings";
import CurrentWeather from "../CurrentWeather";

export interface MainTemperatureProps {
}

export interface MainTemperatureState {
  selection : Selection;
  temperatureData : TemperatureData;
  thermostatData : ThermostatData;
  weatherData : WeatherData;
}

class Selection
{
  public calendarDate: Moment.Moment;
}

export default class MainTemperature extends React.Component<MainTemperatureProps, MainTemperatureState> {
  private debugId = -1;
  private static nextId = 0;
  
  private componentMounted : boolean = false;
    private dataProvider : TemperatureDataProvider;
    private weatherDataProvider : WeatherDataProvider;

    private mainTemperatureSettings = new TemperatureLineSettings();
    private waterHeaterSettings : TemperatureLineSettings = new TemperatureLineSettings({
        showHvacBands: false,
        showHvacRates: false,
        showHvacSetting: false
    });

    constructor(props : any) {
        super(props);
        this.debugId = MainTemperature.nextId++;
        this.state = {
          selection: { calendarDate: DateUtil.getNow() },
          temperatureData: null,
          thermostatData: null,
          weatherData: null
        }
        new Credentials().init();
        this.dataProvider = new TemperatureDataProvider();
        this.weatherDataProvider = new WeatherDataProvider();
    }

      public componentDidMount() {
        if (!this.componentMounted) {
            this.componentMounted = true;
        }
        this.readData(DateUtil.getCalendarDate(this.state.selection.calendarDate));
      }

      public componentWillUnmount() {
          this.componentMounted = false;
      }

      private setStateNoNulls(selection? : Selection, tempData? : TemperatureData, thermoData? : ThermostatData, weatherData? : WeatherData) {
        if (this.componentMounted) {
          var newState : MainTemperatureState = {
              selection: selection != null ? selection : this.state.selection,
              temperatureData: tempData != null ? tempData : this.state.temperatureData,
              thermostatData: thermoData != null ? thermoData : this.state.thermostatData,
              weatherData: weatherData != null ? weatherData : this.state.weatherData
          };
          this.setState(newState);
        }
      }

      private setDataState(tempData? : TemperatureData, thermoData? : ThermostatData, weatherData? : WeatherData) {
          this.setStateNoNulls(null, tempData, thermoData, weatherData);
      }

      private setTempState(tempData : TemperatureData) {
        if (tempData != null) {
          this.setDataState(tempData, null);
        }
      }

      private setThermoState(thermoData : ThermostatData) {
        if (thermoData != null) {
          this.setDataState(null, thermoData);
        }
      }

      private setWeatherData(weatherData : WeatherData) {
        if (weatherData != null) {
          this.setDataState(null, null, weatherData);
        }
      }

      protected readData(calendarDate : string) {
        this.dataProvider.readTemperature(calendarDate, this.setTempState.bind(this));
        this.dataProvider.readThermostatSetting(calendarDate, this.setThermoState.bind(this));
        this.weatherDataProvider.readWeatherData(calendarDate, this.setWeatherData.bind(this));
      }

      protected renderSelectors() {
          return "";
      }

      protected renderNavBar() {
        return (
          <nav className="navbar navbar-toggleable-xl navbar-inline bg-mine navbar-dark">
            <a className="navbar-brand" href="#">JDL Home</a>
            <form className="navbar-form form-inline navbar-control">
                {this.renderSelectors()}
            </form>
          </nav>
        );
      }

      private handleDateChange(date: Moment.Moment) {
        this.setStateNoNulls({
            calendarDate: date
          }
        );
        this.readData(DateUtil.getCalendarDate(date));
      }
       
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3"/>
                        <div className="col-6 main-element">
                            <CurrentWeather/>
                        </div>
                        <div className="col-3"/>
                    </div>
                    <div className="row">
                        <div className="col-1"/>
                        <div className="col-1">
                            <DateControl
                                selected={this.state.selection.calendarDate}
                                onChangeHandler={this.handleDateChange.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1"/>
                        <div className="col-10 main-element">
                            <TemperatureLinePlot
                                id="HomeTemperaturePlot"
                                title="Home"
                                calendarDate={DateUtil.getCalendarDate(this.state.selection.calendarDate)}
                                temperatureData={this.state.temperatureData}
                                thermostatData={this.state.thermostatData}
                                settings={this.mainTemperatureSettings}
                                includeList={null}
                                excludeList={{ "temp-piz-water1": true }}
                            />
                        </div>
                        <div className="col-1"/>
                    </div>
                    <div className="row weather-plot">
                        <div className="col-1"/>
                        <div className="col-10 main-element">
                            <WeatherPlot
                                id="WeatherTempPlot"
                                calendarDate={DateUtil.getCalendarDate(this.state.selection.calendarDate)}
                                weatherData={this.state.weatherData}
                            />
                        </div>
                        <div className="col-1"/>
                    </div>
                    <div className="row">
                        <div className="col-1"/>
                        <div className="col-10 main-element">
                            <HumidityLinePlot
                                id="HomeHumidityPlot"
                                calendarDate={DateUtil.getCalendarDate(this.state.selection.calendarDate)}
                                temperatureData={this.state.temperatureData}
                                thermostatData={this.state.thermostatData}
                            />
                        </div>
                        <div className="col-1"/>
                    </div>
                    <div className="row">
                        <div className="col-1"/>
                        <div className="col-10 main-element">
                            <TemperatureLinePlot
                                id="WaterHeaterPlot"
                                title="Water Heater"
                                calendarDate={DateUtil.getCalendarDate(this.state.selection.calendarDate)}
                                temperatureData={this.state.temperatureData}
                                thermostatData={this.state.thermostatData}
                                settings={this.waterHeaterSettings}
                                excludeList={null}
                                includeList={{ "temp-piz-water1": true }}
                            />
                        </div>
                        <div className="col-1"/>
                    </div>
                </div>
            </div>
        );
    }
}