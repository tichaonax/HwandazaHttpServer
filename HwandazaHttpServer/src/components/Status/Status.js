import React from "react";
import { connect } from "react-redux";

import StatusLayout from "./StatusLayout";
import {
  lightsSelector,
  fishpondSelector,
  waterpumpSelector,
  irrigatorSelector,
 } from '../../selectors';

 import "../../styles/css/styles.css";
 import "./Status.css";


const status = props => {
    
  return(
  <div className="hwandaza-automation">
    <h2>System Status</h2>
    <StatusLayout props={props}/>
  </div>
  );
};

const mapStateToProps = (state) => {
  const fishpond = fishpondSelector(state);
  const waterpump = waterpumpSelector(state);
  const irrigator = irrigatorSelector(state);
  const lights = lightsSelector(state);
  return {
    lights: lights.status,
    fishpond: fishpond.status,
    waterpump: waterpump.status,
    irrigator: irrigator.status,
  }
};
export default connect(mapStateToProps)(status);
