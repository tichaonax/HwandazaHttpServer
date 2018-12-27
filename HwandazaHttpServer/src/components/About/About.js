import React from 'react';

import "../../styles/css/styles.css";
import './About.css';

const about = props => {
    
const { browserNavigation } = props;
browserNavigation('about');

return(
<div className="row">
    <div className="columns medium-centered col-sm-9">
        <div className="container fluid">
            <div className="hwandaza-automation">
                <h2>About</h2>
            </div>
            <div className="columns small-centered small-10 medium-6 large-4">
                <ol>
                    <li>
                        <p>Hwandaza Automation runs on Raspbery Pi-III to automate some of the home operations such as pumping water.</p>
                        <p>The Software, raspbery pi interface hardware circuits, design and implementation was done by Tichaona Hwandaza</p>
                        <p>The Software comprises of Windows iOT foreground application and a background application that runs a Web Server</p>
                    </li>
                    <ol>
                        <li>
                            <a href="https://facebook.github.io/react">React</a> - React JavaScript framework that I used.
                        </li>
                    </ol>
                    <ol>
                        <li>
                            <a href="https://github.com/tichaonax/HwandazaWebService">GitHub</a> - This codebase is stored in GitHub.
                        </li>
                    </ol>
    <ol>
                    <li>
                        <h3><b>Status</b></h3>
                        <p>Status comment.</p>
                     </li>
                </ol>
                <ol>
                    <li>
                        <h3><b>Lights</b></h3>
                        <p>A review consists of the </p>
                    </li>
                    </ol>
                <ol>
                    <li>
                        <h3><b>Control</b></h3>
                        <p>Control Information One</p>
                        <p>Control Information Two</p>
                    </li>
                    </ol>
                <ol>
                    <li>
                        <h3><b>Music</b></h3>
                        <p>A review consists of the </p>
                        
                    </li>
                    </ol>
                <ol>
                    <li>
                        <h3><b>Gallery</b></h3>
                        <p>Gallery Information One</p>
                        <p>Gallery Information Two</p>
                    </li>
                    </ol>
                <ol>
                    <li>
                        <h3><b>Settings</b></h3>
                        <p>A review consists of the </p>
                        
                    </li>
                    </ol>
                </ol>
            </div>
        </div>
    </div>
</div>
);
};

export default about;