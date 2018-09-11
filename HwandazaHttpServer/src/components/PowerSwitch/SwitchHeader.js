import React from "react";

import "./PowerSwitch.css";

const switchheader = props => {
  return (
    <div
      style={{
        color: props.HeaderColor,
        fontWeight: "bold",
        fontSize: "15px"
      }}
    >
      <span className="switch-header">
        {props.Title}
      </span>
    </div>
  );
};

export default switchheader;
