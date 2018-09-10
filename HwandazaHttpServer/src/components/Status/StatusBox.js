import React from "react";
import StatusHeader from "./StatusHeader";
import StatusSwitch from "./StatusSwitch";
import "./Status.css";

const statusbox = props => {
  return (
    <div className="status-box">
      <StatusHeader Title={props.Title} HeaderColor={props.HeaderColor} />
      <StatusSwitch Id={props.Id} Checked={props.Checked} Disabled={props.Disabled}/>
    </div>
  );
};

export default statusbox;
