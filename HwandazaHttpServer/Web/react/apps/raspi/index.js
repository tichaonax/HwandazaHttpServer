import React from 'react';
import ReactDOM from 'react-dom';

import Status from '../status';

const App = () => (
    <div>
        <Status/>
    </div>
);

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<App/>, document.getElementById('status'));
})