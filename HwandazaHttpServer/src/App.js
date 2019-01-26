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
import {
  showNavPage,
  setNavPage,
  randomToggleStatus,
  getStatus,
  resetNotifications,
  getRandomBackGroundImage,
} from "./actions";

import { Utils } from './utility';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusTimer: null,
      randomImageTimer: null,
    }
  }

  componentDidMount() {
    let statusTimer = setInterval(this.pollSystemStatus, 2000);
    this.setState({ statusTimer });
    let randomImageTimer = setInterval(this.rotateBackgroundImage, 10000);
    this.setState({ randomImageTimer });
    if(Utils.parseUrl(window.location.href).pathname ==='/music'){
      this.props.onSetNavPage('music');
    }
  }

  componentWillUnmount() {
    if(this.state.statusTimer){
      this.clearInterval(this.state.statusTimer);
    }
    if(this.state.randomImageTimer){
      this.clearInterval(this.state.randomImageTimer);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.navpage !== nextProps.navpage) {
      return true;
    }

    if (this.props.backgroundImage !== nextProps.backgroundImage) {
      return true;
    }

    if (this.props.notification !== nextProps.notification) {
      return true;
    }
    
    if (this.props.shownavpage !== nextProps.shownavpage) {
      return true;
    }

    return false;
  }

  pollSystemStatus = () => {
    //this.props.onRandomToggleStatus();
    this.props.onGetStatus();
  }

  rotateBackgroundImage = () => {
    this.props.onGetRandomBackGroundImage();
  }

  drawerToggleClickHandler = () => {
    let newState = !this.props.shownavpage;
    this.props.onShowNavPage(newState);
  };

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

  setBrowserNavigation(navpage){
    if(Utils.parseUrl(window.location.href).pathname === `/${navpage}` && this.props.navpage!==navpage){
      this.props.onSetNavPage(navpage);
    }
  }
  
  styles = (backgroundImage, navpage) => ({
    header: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
      position: 'fixed',
      overflowY: 'scroll',
    },
  
    content: {
      height: '100%',
      width: '100%',
      backgroundColor: navpage !== 'slideshow' ? 'rgba(244,246,249, 0.7)': null,
      color: '#222222',
      marginTop: navpage==='music' ? '55px' : '15px',
      overflowY: 'scroll',
    }
  })

  render() {
    let backdrop;
    let { shownavpage, navpage, notification, backgroundImage } = this.props;

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

    //let coverImage = "http://192.168.0.115:8300/picture/Album/martha/20150906_191625.jpg";
    let coverImage = null;
    if(backgroundImage && backgroundImage.Url){
      coverImage = `/picture/${backgroundImage.Url}`;
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
          <div style={this.styles(coverImage, navpage).header}>
            <main style ={this.styles(coverImage, navpage).content }>
              <Switch>
                <Route exact path="/" render={(routerProps) => (<Status {...routerProps} browserNavigation={this.setBrowserNavigation.bind(this)} />)}/>
                <Route path="/status" render={(routerProps) => (<Status {...routerProps} browserNavigation={this.setBrowserNavigation.bind(this)} />)}/>
                <Route path="/lights" render={(routerProps) => (<Lights {...routerProps} browserNavigation={this.setBrowserNavigation.bind(this)} />)}/>
                <Route path="/control" render={(routerProps) => (<Control {...routerProps} browserNavigation={this.setBrowserNavigation.bind(this)} />)}/>
                <Route path="/gallery" render={(routerProps) => (<ImageGallery {...routerProps} browserNavigation={this.setBrowserNavigation.bind(this)} />)}/>
                <Route path="/settings" render={(routerProps) => (<Settings {...routerProps} browserNavigation={this.setBrowserNavigation.bind(this)} />)}/>
                <Route path="/help" render={(routerProps) => (<Help {...routerProps} browserNavigation={this.setBrowserNavigation.bind(this)} />)}/>
                <Route path="/about" render={(routerProps) => (<About {...routerProps} browserNavigation={this.setBrowserNavigation.bind(this)} />)}/>
                {/*  <Route render={(routerProps) => (<About {...routerProps} browserNavigation={this.setBrowserNavigation.bind(this)} />)}/> */}
              </Switch>
              <Music display={navpage === "music" ? 'block' : 'none'} autoplay={true} browserNavigation={this.setBrowserNavigation.bind(this)}/>
            </main>
          </div>
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
  onGetRandomBackGroundImage: () => dispatch(getRandomBackGroundImage()),
});

const mapStateToProps = state => {
  const navigation = state.navigation;
  const notification = state.player;
  const backgroundImage = state.backgroundImage;
  return {
    shownavpage: (navigation ? navigation.shownavpage : null),
    navpage: navigation ? navigation.navpage : 'status',
    notification,
    backgroundImage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
