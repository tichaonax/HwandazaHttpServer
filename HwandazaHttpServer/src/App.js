import React, { Component } from "react";
import { connect } from "react-redux";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
 
import Toolbar from "./components/Toolbar/Toolbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Status from "./components/Status/Status";
import Settings from "./components/Settings/Settings";
import Lights from "./components/Lights/Lights";
import Help from "./components/Help/Help";
import About from "./components/About/About";
import Music from "./components/Music/MusicPlayer";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Control from "./components/Control/Control";
import Spinner from "./components/spinner/Spinner";
import { showNavPage, setNavPage, randomToggleStatus, getStatus, resetNotifications } from "./actions";
import { Utils } from './utility';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
    }
  }

  componentDidMount() {
    let timer = setInterval(this.pollStatus, 2000);
    this.setState({ timer });
    //console.log('Path', Utils.parseUrl(window.location.href).pathname);
    if(Utils.parseUrl(window.location.href).pathname ==='/music'){
      this.props.onSetNavPage('music');
    }
  }

  componentWillUnmount() {
    if(this.state.timer){
      this.clearInterval(this.state.timer);
    }
  }

  pollStatus = () => {
    //this.props.onRandomToggleStatus());
    this.props.onGetStatus();
  }

  drawerToggleClickHandler = () => {
    let newState = !this.props.shownavpage;
    this.props.onShowNavPage(newState);
  };
favoritesSelector
  backdropClickHandler = () => {
    this.props.onShowNavPage(false);
  };

  navClickHandler = (navtopage, draweractive) => {
    if (draweractive) {
      this.props.onShowNavPage(false);
    }
    this.props.onSetNavPage(navtopage);
  };

  createNotificationInfoHandler = (info) => {
    NotificationManager.info(info);
    this.props.onResetNotifications();
  }

  createNotificationSuccessHandler = (success) => {
    NotificationManager.success(success.message, success.title);
    this.props.onResetNotifications();
  }

  createNotificationWarningHandler = (warn) => {
    NotificationManager.warning(warn.message, warn.title, 3000);
    this.props.onResetNotifications();
  }

  render() {
    let backdrop;
    let { shownavpage, navpage, notification } = this.props;
    if (shownavpage) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }    

    if(notification){
      if(notification.success){
        this.createNotificationSuccessHandler(notification.success);
      };

      if(notification.info){
        this.createNotificationInfoHandler(notification.info);
      }

      if(notification.warn){
        this.createNotificationWarningHandler(notification.warn);
     }
    }

    return (
      
      <BrowserRouter>
        <div style={{ height: "100%" }}>
          <Spinner />
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
               <Route path="/gallery" component={ImageGallery} />
               <Route path="/settings" component={Settings} />
               <Route path="/help" component={Help} />
               <Route path="/about" component={About} />
              {/*  <Route component={NotFound} /> */}
             </Switch>

            <Music display={navpage === "music" ? 'block' : 'none'} autoplay={true} />
          </main>
          <NotificationContainer/>
        </div>
      </BrowserRouter>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  onResetNotifications: () => dispatch(resetNotifications()),
  onGetStatus: () => dispatch(getStatus()),
  onShowNavPage: newState => dispatch(showNavPage(newState)),
  onRandomToggleStatus: () => dispatch(randomToggleStatus()),
  onSetNavPage: navtopage => dispatch(setNavPage(navtopage)),
});

const mapStateToProps = state => {
  const navigation = state.navigation;
  const notification = state.player;
  return {
    shownavpage: (navigation ? navigation.shownavpage : null),
    navpage: (navigation ? navigation.navpage : 'status'),
    notification,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
