import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import moment from "moment";
import Switch from "react-switch";

import NavigationLinks from "../NavigationLinks/NavigationLinks";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import { statusDateSelector } from '../../selectors';
import "./Toolbar.css";

const dateFomart = "ddd ll hh:mm A";

export class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.state = {
      check: false,
      dateTime: null,
      statusDate: null,
    };
  }
  componentWillReceiveProps(newProps){
    if(newProps.statusDate !== this.state.statusDate){
        this.toggleSwitch(newProps.statusDate);
    }
  }

  toggleSwitch = (statusDate) => {
    this.setState(prevState => ({
      check: !prevState.check,
      statusDate,
    }));
  } 

  render() {
    const { statusDate } = this.props;
    const dateTime = moment(statusDate).format(dateFomart);

    return(
    <header className="toolbar">
      <nav className="toolbar__navigation">
      <div className="toolbar__toggle-button">
        <DrawerToggleButton click={this.props.drawerClickHandler} />
      </div>
      <div className="toolbar__logo">
        <a href="/">HW</a>
      </div>
      <div className="spacer" />
      <div id="dateTime_div" className="toolbar_status-date"><Link to="settings">{dateTime}</Link></div>
      <div className="spacer" />
      <div>
      <Switch
          onChange={()=>{}}
          checked={this.state.check}
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
                color: "white",
                paddingRight: 2
              }}
            />
          }
          checkedIcon={
            <svg viewBox="0 0 10 10" height="100%" width="100%" fill="#ea0bd4">
              <circle r={4} cx={5} cy={5} />
            </svg>
          }
        />
      </div>
      <div className="spacer" />
      <div className="toolbar_navigation-items">
        <NavigationLinks click={this.props.navClickHandler} drawerCall={false} />
      </div>
    </nav>
  </header>
);
}
}

const mapStateToProps = (state) => {
  return {
     statusDate : statusDateSelector(state),
  }
};
export default connect(mapStateToProps)(Toolbar);
