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
      <span style={{ left: "-1px", fontSize: "13px", position: "relative", top: "-1px" }}>
        {props.Title}
      </span>
    </div>
  );
};

export default statusheader;
