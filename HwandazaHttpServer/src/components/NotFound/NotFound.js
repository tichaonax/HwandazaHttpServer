import React from 'react';
import { connect } from "react-redux";

import './NotFound.css';

const notfound = props => (
    <div>NotFound goes here</div>
);

export default connect()(notfound);
