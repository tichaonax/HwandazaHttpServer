import React from "react";
import { Link } from "react-router-dom";

import {
  SETTINGS_TITLE,
  LIGHTS_TITLE,
  CONTROL_TITLE,
  MUSIC_TITLE,
  STATUS_TITLE,
  ABOUT_TITLE,
  GALLERY_TITLE
} from "../../constants/pageTitles";

import "./NavigationLinks.css";

const navigationlinks = props => {
  let draweractive = props.drawerCall;

  return (
    <ul>
      <li>
        <Link to="/status" onClick={() => props.click("status", draweractive)}>
          {STATUS_TITLE}
        </Link>
      </li>
      <li>
        <Link to="/lights" onClick={() => props.click("lights", draweractive)}>
          {LIGHTS_TITLE}
        </Link>
      </li>
      <li>
        <Link
          to="/control"
          onClick={() => props.click("control", draweractive)}
        >
          {CONTROL_TITLE}
        </Link>
      </li>
      <li>
        <Link to="/music" onClick={() => props.click("music", draweractive)}>
          {MUSIC_TITLE}
        </Link>
      </li>
      <li>
        <Link
          to="/gallery"
          onClick={() => props.click("gallery", draweractive)}
        >
          {GALLERY_TITLE}
        </Link>
      </li>
      <li>
        <Link
          to="/settings"
          onClick={() => props.click("settings", draweractive)}
        >
          {SETTINGS_TITLE}
        </Link>
      </li>

      <li>
        <Link to="/about" onClick={() => props.click("about", draweractive)}>
          {ABOUT_TITLE}
        </Link>
      </li>
    </ul>
  );
};

export default navigationlinks;
