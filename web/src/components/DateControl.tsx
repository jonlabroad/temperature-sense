import * as React from "react";
import * as ReactDOM from "react-dom";

export interface DateControlProps {
    selected : string;
}

export interface DateControlState {
}

export default class DateControl extends React.Component<DateControlProps, DateControlState> {
    private componentMounted : boolean = false;
    
    constructor(props : any) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}