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

export interface TemperatureDashboardProps {
}

export interface TemperatureDashboardState {
  selection : Selection;
  temperatureData : TemperatureData;
  thermostatData : ThermostatData;
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

    constructor(props : any) {
        super(props);
        this.debugId = TemperatureDashboard.nextId++;
        this.state = {
          selection: { calendarDate: DateUtil.getNow() },
          temperatureData: null,
          thermostatData: null
        }
        this.setUrl();

        new Credentials().init();
        this.dataProvider = new TemperatureDataProvider();
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

      private setDataState(tempData? : TemperatureData, thermoData? : ThermostatData) {
        if (this.componentMounted) {
          var newState : TemperatureDashboardState = {
              selection: this.state.selection,
              temperatureData: tempData != null ? tempData : this.state.temperatureData,
              thermostatData: thermoData != null ? thermoData : this.state.thermostatData,
          };
          this.setState(newState);
        }
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

      protected readData(calendarDate : string) {
        this.dataProvider.readTemperature(DateUtil.getCalendarDate(this.state.selection.calendarDate), this.setTempState.bind(this));
        this.dataProvider.readThermostatSetting(DateUtil.getCalendarDate(this.state.selection.calendarDate), this.setThermoState.bind(this));
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
        this.setState({
          selection: {
            calendarDate: date
          }
        });
        this.readData(DateUtil.getCalendarDate(date));
      }
       
    render() {
        return (
          <div>
              {this.renderNavBar()}
              <div>
              <DateControl
                selected={this.state.selection.calendarDate}
                onChangeHandler={this.handleDateChange.bind(this)}
              />
              <TemperatureLinePlot
                height={400}
                width={800}
                calendarDate={DateUtil.getCalendarDate(this.state.selection.calendarDate)}
                temperatureData={this.state.temperatureData}
                thermostatData={this.state.thermostatData}
              />
            </div>
          </div>
        );
    }
}