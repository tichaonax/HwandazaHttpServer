import { connect } from "react-redux";
import React, { Component } from 'react'

import { setLoadingStatus } from '../../actions';

import "../../styles/css/styles.css";
import './About.css';

export class About extends Component {
    constructor(props) {
        super(props)
      }

      componentDidMount() {
        this.props.dispatch(setLoadingStatus(false));
      }

render() {
const { browserNavigation } = this.props;
browserNavigation('about');

return(
<div className="row">
    <div className="columns medium-centered col-sm-9 about">
        <div className="container fluid">
            <div className="hwandaza-automation">
                <h2>About</h2>
            </div>
            <div className="columns small-centered small-10 medium-6 large-4">
                <ol>
                    <li>
                        <p>Hwandaza Automation runs on Raspberry Pi 3 Model B to automate some of the home 
                            operations such as pumping water.</p>
                        <p>The Software comprises of Windows 10 IoT foreground application and a background 
                            application that runs a Web Server.
                            The Web Server takes commands from a React client application then sends them 
                            to the foreground application for processing.
                        </p>
                    </li>
                    <ol>
                        <li>
                            <a href="https://facebook.github.io/react">React</a> - React JavaScript framework that I used.
                        </li>
                    </ol>
                    <ol>
                        <li>
                            <a href="https://github.com/tichaonax/HwandazaWebService">GitHub</a> - HwandazaWebService codebase is stored in GitHub.
                        </li>
                    </ol>
                    <ol>
                        <li>
                            <a href="https://github.com/tichaonax/HwandazaHttpServer">GitHub</a> - HwandazaHttpServer codebase is stored in GitHub.
                        </li>
                    </ol>
                <ol>
                    <li>
                        <h3><b>Status</b></h3>
                        <p>This screen shows the status of controlled items. The switches are read only.</p>
                        <p>The top shows the date and time since the system was restarted.</p>
                        <p>The left controlled items have a time stamp of last status change for the controlled device.</p>
                     </li>
                </ol>
                <ol>
                    <li>
                        <h3><b>Lights</b></h3>
                        <p>This allows you to manually turn on the lights.</p>
                        <p>This system randomly turns on/off these lights at night for random period
                            and random times to simulate a person moving in the house at night.</p>
                    </li>
                    </ol>
                <ol>
                    <li>
                        <h3><b>Control</b></h3>
                        <p>The pumps can be turned on/off only on this screen. Each pump will run for a 
                            predetrmined time and shut off.
                            The system also has a schedule shown on the device screen, that is automatically
                            controlled by the device.
                        </p>
                        <p>Water Pump: runs for 4 minutes daily every 30 minutes from 7:00AM to 5:00PM</p>
                        <p>FishPond: runs for 30 minutes daily at 10:00AM and 2:00PM</p>
                        <p>Lawn Irrigator: runs for 30 minutes daily 7:00AM and 5:00PM</p>
                    </li>
                </ol>
                <ol>
                    <li>
                        <h3><b>Music</b></h3>
                        <p>The UI for playing music, the tracks are stored at the Raspbery Pi device.</p>
                        <p>User can search music by title or by folder location/artist name.</p>
                        <p>User can add playing music to favorites stored locally to the browser</p>
                    </li>
                </ol>
                <ol>
                    <li>
                        <h3><b>Gallery</b></h3>
                        <p>View images stored on the device, these are the same images that rotate on the 
                            device as background images</p>
                    </li>
                    </ol>
                <ol>
                    <li>
                        <h3><b>Settings</b></h3>
                        <p>Allows to change the system Date and Time</p>
                        <p>Changing Date occurs immediately on the device</p>
                        <p>Changing Time requires the application to restart so the 
                            scehdules can reconfigure, changing Date does not reset the application</p>
                    </li>
                </ol>
                </ol>
            </div>
        </div>
    </div>
</div>
);
};
};

export default connect()(About);