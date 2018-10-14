import React from 'react';
import { connect } from "react-redux";

import "../../styles/css/styles.css";
import './Help.css';

const help = props => (
    <div className="hwandaza-automation">Help goes here</div>
);

export default connect()(help);