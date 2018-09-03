import React from 'react';
import { connect } from "react-redux";
import moment from "moment";
import { DatePicker, TimePicker, Button } from "antd";
import "antd/dist/antd.css";
import "../../styles/styles.css";
import './Settings.css';

export class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
    };
  }
  onDateChange(date, dateString) {
    console.log(date, dateString);
  }
  onTimeChange = time => this.setState({ time });

  handleOpenChange = open => {
    this.setState({ open });
  };

  handleClose = () => this.setState({ open: false });

  handleChange(e) {
    console.log("new time", e);
    this.setState({
      startDate: e
    });
  }
  render() {
    return (
      <div>
        <h2>System Settings</h2>
        <DatePicker
          selected={this.state.startDate}
          onChange={e => this.handleChange(e)}
        />
        <TimePicker
          open={this.state.open}
          onOpenChange={this.handleOpenChange}
          addon={() => (
            <Button size="small" type="primary" onClick={this.handleClose}>
              Ok
            </Button>
          )}
        />
      </div>
    );
  }
}

export default connect()(Settings);