import React from "react";
// import SwitchButton from "react-switch-button";
import "react-switch-button/dist/react-switch-button.css";
import "antd/dist/antd.css";

export default class WaterPump extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "rsbc-switch-button-flat-round",
      themeChecked: false
    };
  }

  onChange(e) {
    const theme =
      this.state.theme === "rsbc-switch-button-flat-square"
        ? "rsbc-switch-button-flat-round"
        : "rsbc-switch-button-flat-square";
    this.setState({
      theme: theme,
      themeChecked: this.state.theme === "rsbc-switch-button-flat-round"
    });
    console.log("themeChecked=>", !this.state.themeChecked);
  }

  render() {
    return (
      <div className="row">
      {/*  <SwitchButton
          name="switch-theme"
          label="Water Status"
          checked={this.state.themeChecked}
          onChange={() => this.onChange()}
        />
      */}
        <span>
          <span>{this.state.themeChecked ? " ON" : " OFF"}</span>
        </span>
      </div>
    );
  }
}
