import * as React from "react";
import * as ReactDOM from "react-dom";

export interface CurrentWeatherProps {
}

export interface CurrentWeatherState {
}

export default class CurrentWeather extends React.Component<CurrentWeatherProps, CurrentWeatherState> {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  public componentDidMount() {
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){var js : any = d.createElement(s);js.id=id;(js as any).src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
  }

  protected renderCurrentWeather() : any {
    return (
      <a className="weatherwidget-io" href="https://forecast7.com/en/42d53n71d10/reading/?unit=us" data-label_1="READING" data-label_2="WEATHER" data-icons="Climacons Animated" data-days="3" data-theme="gray" >READING WEATHER</a>
    );
  }

  render() {
    return (
      <span>
        {this.renderCurrentWeather()}
      </span>
    );
  }
}



