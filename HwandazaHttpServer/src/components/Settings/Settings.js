import React from 'react';
import { connect } from "react-redux";
import moment from "moment";
import { DatePicker, TimePicker, Button } from "antd";
import "antd/dist/antd.css";
import "../../styles/styles.css";
import './Settings.css';
import { statusDateSelector } from '../../selectors';
import { setSyatemDateTime } from '../../actions';

const timeFormat = "HH:mm:ss";

export class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      systemDate: moment(),
      open: false,
    };

    this.dispatch = props.dispatch;
  }

  handleOpenChange = open => this.setState({ open });

  handleClose(e) 
  {
    this.setState({ open: false })
    const time = moment(this.state.value).format(timeFormat);
    this.dispatch(setSyatemDateTime(
    {
        Command: "SetSystemTime",
        Time: time,
   })); 
  }


  handleTimeChange = (time) => {
    this.setState({ value: time });
  }

  handleDateChange(e) {
    this.setState({
      systemDate: e
    });

    const newDate = moment(e).format("YYYY-MM-DD");
    if(newDate != 'Invalid date'){
      this.dispatch(setSyatemDateTime(
      {
          Command: "SetSystemDate",
          Date: newDate,
      }));
     }
  };

  render() {
    const {statusDate} = this.props;
    const dateFormat = "DD MMM YYYY";
    const dateTime = moment(statusDate).format(dateFormat);
    const time = moment(statusDate).format(timeFormat);

    return (
      <div>
        <h2>System Settings</h2>
        <DatePicker
          selected={this.state.systemDate}
          onChange={e => this.handleDateChange(e)}
          defaultValue={moment(dateTime, dateFormat)}
          format={dateFormat}
        />
        <TimePicker
          open={this.state.open}
          onOpenChange={this.handleOpenChange}
          onChange={this.handleTimeChange}
          addon={() => (
            <Button size="small" type="primary" onClick={(e)=> {this.handleClose(e);}}>
              Ok
            </Button>
          )}
          defaultValue={moment(time, timeFormat)}
          format={timeFormat}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
     statusDate : statusDateSelector(state),
  }
};

export default connect(mapStateToProps)(Settings);