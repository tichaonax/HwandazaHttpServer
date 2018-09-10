import React from "react";

import "./Status.css";

const statusswitch = props => {
  return (
    <div>
      <div className="onoffswitch">
        <input
          type="checkbox"
          name="onoffswitch"
          className="onoffswitch-checkbox"
          id={props.Id}
          checked={props.Checked}
          disabled={props.Disabled}
        />
        <label className="onoffswitch-label" htmlFor={props.Id}>
          <span className="onoffswitch-inner" />
          <span className="onoffswitch-switch" />
        </label>
      </div>
    </div>
  );
};

export default statusswitch;
