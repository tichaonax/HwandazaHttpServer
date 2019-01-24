import React from "react";
import SwitchHeader from "../PowerSwitch/SwitchHeader";
import PowerSwitch from "../PowerSwitch/PowerSwitch";
import "./Status.css";

const statusbox = props => {
  console.log('LastUpdate', props.LastUpdate);
  return (
    <div className="status-box">
      <SwitchHeader Title={props.Title} HeaderColor={props.HeaderColor} />
      <div className="left">{props.LastUpdate}</div>
      <PowerSwitch Id={props.Id} Checked={props.Checked} Disabled={props.Disabled}/>
    </div>
  );
};

export default statusbox;
