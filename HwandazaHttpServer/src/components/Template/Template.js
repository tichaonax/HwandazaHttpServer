import React from 'react';
import { connect } from "react-redux";

import './Template.css';

const template = props => (
    <div>Template goes here</div>
);

export default connect()(template);
