import React from "react";
import WaterPump from "../components/WaterPump";

export default class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <WaterPump />
      </div>
    );
  }
}
