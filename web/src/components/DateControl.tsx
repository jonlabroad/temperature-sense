import * as React from "react";
import * as ReactDOM from "react-dom"
import DatePicker from 'react-datepicker'
import DateUtil from '../DateUtil'
import * as Moment from "moment-timezone"

export interface DateControlProps {
    selected : Moment.Moment;
    onChangeHandler : any
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

    public componentDidMount() {
    }

    render() {
        return (
            <DatePicker
                selected={this.props.selected}
                onChange={this.props.onChangeHandler}
            />
        );
    }
}