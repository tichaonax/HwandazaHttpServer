import React, { Component } from "react";
import { connect } from "react-redux";

import Toolbar from "./components/Toolbar/Toolbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";

import { Route, BrowserRouter, Switch } from "react-router-dom";
import Status from "./components/Status/Status";
import Settings from "./components/Settings/Settings";
import Lights from "./components/Lights/Lights";
import Help from "./components/Help/Help";
import About from "./components/About/About";
import Music from "./components/MusicPlus/MusicContainer";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Control from "./components/Control/Control";
import NotFound from "./components/NotFound/NotFound";
import { showNavPage, setNavPage, randomToggleStatus, getStatus } from "./actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.state = {
      timer: null,
    }
  }

  componentDidMount() {
    let timer = setInterval(this.pollStatus, 1000);
    this.setState({ timer });
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  pollStatus = () => {
    //this.dispatch(randomToggleStatus());
    this.dispatch(getStatus());
  }

  drawerToggleClickHandler = () => {
    let newState = !this.props.shownavpage;
    this.dispatch(showNavPage(newState));
  };

  backdropClickHandler = () => {
    this.dispatch(showNavPage(false));
  };

  navClickHandler = (navtopage, draweractive) => {
    if (draweractive) {
      this.dispatch(showNavPage(false));
    }
    this.dispatch(setNavPage(navtopage));
  };

  render() {
    let backdrop;
    let { shownavpage } = this.props;
    if (shownavpage) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <BrowserRouter>
        <div style={{ height: "100%" }}>
          <Toolbar
            drawerClickHandler={this.drawerToggleClickHandler}
            navClickHandler={this.navClickHandler}
          />
          <SideDrawer
            show={shownavpage}
            navClickHandler={this.navClickHandler}
          />
          {backdrop}
          <main style={{ marginTop: "64px" }}>
              <Switch>
                <Route path="/" exact component={Status} />
                <Route path="/status" component={Status} />
                <Route path="/lights" component={Lights} />
                <Route path="/control" component={Control} />
                <Route path="/music" component={Music} />
                <Route path="/gallery" component={ImageGallery} />
                <Route path="/settings" component={Settings} />
                <Route path="/help" component={Help} />
                <Route path="/about" component={About} />
                <Route component={NotFound} />
              </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  const navigation = state.navigation;
  return {
    shownavpage: (navigation ? navigation.shownavpage : null)
  };
};

export default connect(mapStateToProps)(App);
