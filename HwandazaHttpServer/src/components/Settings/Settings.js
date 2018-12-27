import React from 'react';
import { connect } from "react-redux";
import moment from "moment";
import { DatePicker, TimePicker, Button } from "antd";
import "antd/dist/antd.css";
import "../../styles/css/styles.css";
import './Settings.css';
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
          format={timeFormat}
        />
      </div>
    );
  }
}

export default connect()(Settings);