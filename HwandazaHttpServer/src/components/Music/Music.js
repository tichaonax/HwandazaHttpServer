import React from 'react';
import { connect } from "react-redux";

import "../../styles/css/styles.css";
import './Music.css';

const music = props => (
    <div className="hwandaza-automation">Music goes here</div>
);

export default connect()(music);