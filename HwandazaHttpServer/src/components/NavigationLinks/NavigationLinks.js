import React from "react";
import { Link } from "react-router-dom";

import {
  SETTINGS_TITLE,
  LIGHTS_TITLE,
  CONTROL_TITLE,
  MUSIC_TITLE,
  STATUS_TITLE,
  ABOUT_TITLE,
  GALLERY_TITLE,
  SLIDE_SHOW,
} from "../../constants/pageTitles";

import "./NavigationLinks.css";

const navigationlinks = props => {
  let draweractive = props.drawerCall;

  return (
    <ul>
      <li>
        <Link to="/status" onClick={() => props.click("status", draweractive)}>
          <div className="spacer" >&nbsp;<i className="fa fa-info-circle" aria-hidden="true"></i>&nbsp;{STATUS_TITLE}</div>
        </Link>
      </li>
      <li>
        <Link to="/lights" onClick={() => props.click("lights", draweractive)}>
        <div className="spacer" >&nbsp;<i className="fa fa-lightbulb-o" aria-hidden="true"></i>&nbsp;{LIGHTS_TITLE}</div>
        </Link>
      </li>
      <li>
        <Link
          to="/control"
          onClick={() => props.click("control", draweractive)}
        >
          <div className="spacer" >&nbsp;<i className="fa fa-power-off" aria-hidden="true"></i>&nbsp;&nbsp;{CONTROL_TITLE}</div>
        </Link>
      </li>
      <li>
        <Link to="/music" onClick={() => props.click("music", draweractive)}>
        <div className="spacer" >&nbsp;<i className="fa fa-music" aria-hidden="true"></i>&nbsp;{MUSIC_TITLE}</div>
        </Link>
      </li>
      <li>
        <Link
          to="/gallery"
          onClick={() => props.click("gallery", draweractive)}
        >
          <div className="spacer" >&nbsp;<i className="fa fa-camera" aria-hidden="true"></i>&nbsp;{GALLERY_TITLE}</div>
        </Link>
      </li>
      <li>
        <Link
          to="/settings"
          onClick={() => props.click("settings", draweractive)}
        >
          <div className="spacer" >&nbsp;<i className="fa fa-cog fa-fw" aria-hidden="true"></i>&nbsp;{SETTINGS_TITLE}</div>
        </Link>
      </li>
      <li>
        <Link to="/slideshow" onClick={() => props.click("slideshow", draweractive)}>
        <div className="spacer" >&nbsp;<i className="fa fa-slideshare" aria-hidden="true"></i>&nbsp;{SLIDE_SHOW}</div>
        </Link>
      </li>
      <li>
        <Link to="/about" onClick={() => props.click("about", draweractive)}>
        <div className="spacer" >&nbsp;<i className="fa fa-question-circle" aria-hidden="true"></i>&nbsp;{ABOUT_TITLE}</div>
        </Link>
      </li>
    </ul>
  );
};

export default navigationlinks;
