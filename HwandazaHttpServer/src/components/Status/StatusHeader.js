import React from "react";

import "./Status.css";

const statusheader = props => {
  return (
    <div
      style={{
        color: props.HeaderColor,
        fontWeight: "bold",
        fontSize: "15px"
      }}
    >
      <span className="status-header">
        {props.Title}
      </span>
    </div>
  );
};

export default statusheader;
