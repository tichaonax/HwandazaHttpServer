import React from 'react';
import { connect } from "react-redux";
import format from "date-fns/format";
import DatePicker from "react-datepicker";
import "antd/dist/antd.css";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/css/styles.css";
import './Settings.css';
import { setSyatemDateTime } from '../../actions';

const timeFormat = "HH:mm:ss";

export class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      systemDate: new Date(),
      selecteDateTime: new Date(),
    };

    this.dispatch = props.dispatch;
  }

  handleTimeChange = (dateTime) => {
    this.setState({ selecteDateTime: dateTime });
    const formatedTime = format(new Date(dateTime),timeFormat);
    this.dispatch(setSyatemDateTime(
    {
        Command: "SetSystemTime",
        Time: formatedTime,
   })); 
  }

  handleDateChange(e) {
    this.setState({
      systemDate: e
    });

    const newDate = format(new Date(e), "YYYY-MM-DD");
    if(newDate !== 'Invalid date'){
      this.dispatch(setSyatemDateTime(
      {
          Command: "SetSystemDate",
          Date: newDate,
      }));
     }
  };

  render() {

    const { browserNavigation } = this.props;
    browserNavigation('settings');
    
    const dateFormat = "DD MMM YYYY";
    return (
      <div className="hwandaza-automation">
        <h2>System Settings</h2>
        <DatePicker
          selected={this.state.systemDate}
          onChange={e => this.handleDateChange(e)}
          dateFormat={dateFormat}
          className="settings-input"
        />
        <DatePicker
            selected={this.state.selecteDateTime}
            onChange={this.handleTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={1}
            dateFormat="h:mm aa"
            timeCaption="Time"
            className="settings-input"
        />
      </div>
    );
  }
}

export default connect()(Settings);