import React from 'react';
import { connect } from "react-redux";

import "../../styles/styles.css";
import './Lights.css';

const lights = props => (
    <div className="hwandaza-automation">Lights goes here</div>
);

export default connect()(lights);