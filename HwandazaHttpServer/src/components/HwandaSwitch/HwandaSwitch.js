import React from "react";
import Switch from "react-switch";
 
export class HwandaSwitch extends React.Component {
  render() {
    const { power, textColor, fillColor, handleChange } = this.props;
  
    return (
      <label htmlFor="normal-switch">
        <Switch
          onChange={handleChange}
          checked={power}
          className="react-switch"
          id="icon-switch"
          uncheckedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 15,
                color: textColor,
                paddingRight: 2
              }}
            >
              Off
            </div>
          }
          checkedIcon={
            <svg viewBox="0 0 10 10" height="100%" width="100%" fill={fillColor}>
              <circle r={3} cx={5} cy={5} />
            </svg>
          }
        />
      </label>
    );
  }
}

export default HwandaSwitch;