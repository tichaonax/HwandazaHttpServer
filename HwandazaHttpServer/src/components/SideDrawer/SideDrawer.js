import React from "react";
import { connect } from "react-redux";
import NavigationLinks from "../NavigationLinks/NavigationLinks";

import "./SideDrawer.css";

class SideDrawer extends React.Component {
  render() {
    let drawerClasses = "side-drawer";

    if (this.props.shownavpage) {
      drawerClasses = "side-drawer open";
    }

    return (
      <nav className={drawerClasses}>
        <NavigationLinks
          click={this.props.navClickHandler}
          drawerCall={true}
        />
      </nav>
    );
  }
}

const mapStateToProps = state => {
  const navigation = state.get(`navigation`);
  return {
    shownavpage: navigation.shownavpage
  };
};

export default connect(mapStateToProps)(SideDrawer);
