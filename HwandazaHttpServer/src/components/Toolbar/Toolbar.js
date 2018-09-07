import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import NavigationLinks from "../NavigationLinks/NavigationLinks";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import { statusDateSelector } from '../../selectors';
import "./Toolbar.css";

const toolbar = props => {
  const { statusDate } = props;
  const dateTime = moment(statusDate).format("LLLL");
  return(
  <header className="toolbar">
    <nav className="toolbar__navigation">
      <div className="toolbar__toggle-button">
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>
      <div className="toolbar__logo">
        <a href="/">HWANDA</a>
      </div>
      <div className="spacer" />
      <div className="toolbar_status-date">{dateTime}</div>
      <div className="spacer" />
      <div className="toolbar_navigation-items">
        <NavigationLinks click={props.navClickHandler} drawerCall={false} />
      </div>
    </nav>
  </header>
);
}

const mapStateToProps = (state) => {
  return {
     statusDate : statusDateSelector(state),
  }
};
export default connect(mapStateToProps)(toolbar);
