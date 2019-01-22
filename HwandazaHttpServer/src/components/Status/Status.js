import React from "react";
import { connect } from "react-redux";

import StatusLayout from "./StatusLayout";
import { setNavPage } from "../../actions";

import {
  lightsSelector,
  fishpondSelector,
  waterpumpSelector,
  irrigatorSelector,
  systemUpTimeSelector,
 } from '../../selectors';

 import "../../styles/css/styles.css";
 import "./Status.css";

const status = props => {
  props.onSetNavPage('status');
  return(
    <div className="row">
      <div className="columns medium-centered col-sm-9 status">
        <div className="hwandaza-automation">
          <h3>Uptime: {props.systemUpTime}</h3>
          <StatusLayout props={props}/>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  onSetNavPage: navtopage => dispatch(setNavPage(navtopage)),
});

const mapStateToProps = (state) => {
  const fishpond = fishpondSelector(state);
  const waterpump = waterpumpSelector(state);
  const irrigator = irrigatorSelector(state);
  const lights = lightsSelector(state);
  const systemUpTime = systemUpTimeSelector(state);
  return {
    lights: lights.status,
    fishpond: fishpond.status,
    waterpump: waterpump.status,
    irrigator: irrigator.status,
    systemUpTime,
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(status);
