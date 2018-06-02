import * as React from "react";
import * as ReactDOM from "react-dom";

import MainTemperature from "./pages/MainTemperature";

export interface MainProps {
}

export interface MainState {
}

export default class Main extends React.Component<MainProps, MainState> {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  protected setUrl() {
    //Url.setUrl(this.selection.teamId, this.selection.gameweek, this.selection.differentialsOnly, this.selection.cup);
  }

  protected renderNavBar() {
    return (
      <nav className="navbar navbar-toggleable-xl navbar-inline bg-mine navbar-dark">
        <a className="navbar-brand" href="#">JDL Home</a>
        <form className="navbar-form form-inline navbar-control">
        </form>
      </nav>
    );
  }

  render() {
    return (
      <div>
        {this.renderNavBar()}
        <MainTemperature
        />
      </div>
    );
  }
}