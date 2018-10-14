import React from 'react';
import { connect } from "react-redux";

import "../../styles/css/styles.css";
import './NotFound.css';

const notfound = props => (
    <div className="hwandaza-automation">NotFound goes here</div>
);

export default connect()(notfound);
