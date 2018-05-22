import * as React from "react";
import * as ReactDOM from "react-dom";

import BasicLinePlot from "./BasicLinePlot"
import DateControl from "./DateControl"
import DateUtil from "../DateUtil"
import Credentials from "../aws/Credentials"
import * as Moment from "moment-timezone"

export interface TemperatureDashboardProps {
}

export interface TemperatureDashboardState {
  selection : Selection;
}

class Selection
{
  public calendarDate: Moment.Moment;
}

export default class TemperatureDashboard extends React.Component<TemperatureDashboardProps, TemperatureDashboardState> {
    private componentMounted : boolean = false;
    
    constructor(props : any) {
        super(props);
        this.state = {
          selection: { calendarDate: DateUtil.getNow() }
        }
        this.setUrl();

        new Credentials().init();
    }

      protected setUrl() {
        //Url.setUrl(this.selection.teamId, this.selection.gameweek, this.selection.differentialsOnly, this.selection.cup);
      }

      public componentDidMount() {
        if (!this.componentMounted) {
            this.componentMounted = true;
        }
      }

      public componentWillUnmount() {
          this.componentMounted = false;
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
              <BasicLinePlot
                height={400}
                width={800}
                calendarDate={DateUtil.getCalendarDate(this.state.selection.calendarDate)}
              />
            </div>
          </div>
        );
    }
}