import * as React from "react";
import * as ReactDOM from "react-dom";

import TemperatureLinePlot from "./TemperatureLinePlot"
import DateControl from "./DateControl"
import DateUtil from "../DateUtil"
import Credentials from "../aws/Credentials"
import * as Moment from "moment-timezone"
import TemperatureData from "../data/TemperatureData";
import ThermostatData from "../data/ThermostatData";
import TemperatureDataProvider from "../TemperatureDataProvider";
import HumidityLinePlot from "./HumdityLinePlot";
import WeatherPlot from "./WeatherPlot";
import WeatherData from "../data/WeatherData";
import WeatherDataProvider from "../WeatherDataProvider";

export interface TemperatureDashboardProps {
}

export interface TemperatureDashboardState {
  selection : Selection;
  temperatureData : TemperatureData;
  thermostatData : ThermostatData;
  weatherData : WeatherData;
}

class Selection
{
  public calendarDate: Moment.Moment;
}

export default class TemperatureDashboard extends React.Component<TemperatureDashboardProps, TemperatureDashboardState> {
  private debugId = -1;
  private static nextId = 0;
  
  private componentMounted : boolean = false;
    private dataProvider : TemperatureDataProvider;
    private weatherDataProvider : WeatherDataProvider;

    constructor(props : any) {
        super(props);
        this.debugId = TemperatureDashboard.nextId++;
        this.state = {
          selection: { calendarDate: DateUtil.getNow() },
          temperatureData: null,
          thermostatData: null,
          weatherData: null
        }
        this.setUrl();

        new Credentials().init();
        this.dataProvider = new TemperatureDataProvider();
        this.weatherDataProvider = new WeatherDataProvider();
    }

      protected setUrl() {
        //Url.setUrl(this.selection.teamId, this.selection.gameweek, this.selection.differentialsOnly, this.selection.cup);
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
          var newState : TemperatureDashboardState = {
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
              {this.renderNavBar()}
                <div className="container">
                  <div className="row">
                    <div className="col-10">
                      <DateControl
                        selected={this.state.selection.calendarDate}
                        onChangeHandler={this.handleDateChange.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-10">
                      <TemperatureLinePlot
                        id="HomeTemperaturePlot"
                        calendarDate={DateUtil.getCalendarDate(this.state.selection.calendarDate)}
                        temperatureData={this.state.temperatureData}
                        thermostatData={this.state.thermostatData}
                      />
                    </div>
                  </div>
                  <div className="row weather-plot">
                    <div className="col-10">
                      <WeatherPlot
                        id="WeatherTempPlot"
                        calendarDate={DateUtil.getCalendarDate(this.state.selection.calendarDate)}
                        weatherData={this.state.weatherData}
                      />
                    </div>
                  </div>
                 <div className="row">
                  <div className="col-10">
                    <HumidityLinePlot
                      id="HomeHumidityPlot"
                      calendarDate={DateUtil.getCalendarDate(this.state.selection.calendarDate)}
                      temperatureData={this.state.temperatureData}
                      thermostatData={this.state.thermostatData}
                    />
                  </div>
                </div>
          </div>
        </div>
        );
    }
}