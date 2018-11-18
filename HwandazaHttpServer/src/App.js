import React, { Component } from "react";
import { connect } from "react-redux";

import Toolbar from "./components/Toolbar/Toolbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";

import { BrowserRouter } from "react-router-dom";
import Status from "./components/Status/Status";
import Settings from "./components/Settings/Settings";
import Lights from "./components/Lights/Lights";
import Help from "./components/Help/Help";
import About from "./components/About/About";
import Music from "./components/Music/MusicPlayer";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Control from "./components/Control/Control";
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
    let timer = setInterval(this.pollStatus, 2000);
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
    let { shownavpage, navpage } = this.props;
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
          {console.log('Apps props', JSON.stringify(this.props))}
          <main style={{ marginTop: "64px" }}>
            {navpage ==="status" && <div><Status/></div>}
            {navpage ==="lights" &&<div><Lights/></div>}
            {navpage ==="control" &&<div><Control/></div>}
            {navpage ==="settings" &&<div><Settings/></div>}
            {navpage ==="help" &&<div><Help/></div>}
            {navpage ==="about" &&<div><About/></div>}
            
            <Music display={navpage === "music" ? 'block' : 'none'} autoplay={true} />
            <ImageGallery display={navpage === "gallery" ? 'block' : 'none'} />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  const navigation = state.navigation;
  return {
    shownavpage: (navigation ? navigation.shownavpage : null),
    navpage: (navigation ? navigation.navpage : 'status')
  };
};

export default connect(mapStateToProps)(App);
