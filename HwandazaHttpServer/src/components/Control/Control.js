import React from 'react';
import {
    connect
} from "react-redux";
import PropTypes from 'prop-types';
import {
    fishpondSelector,
    waterpumpSelector,
    irrigatorSelector
} from '../../selectors';

import './Control.css';

const control = props => {
    const { fishpond, waterpump, irrigator } = props

    return ( 
    <div> 
        <div> Water pump is { waterpump && waterpump.power } </div>
        <div> Fishpond is { fishpond && fishpond.power } </div>
        <div> Irrigator is { irrigator && irrigator.power } </div>
   </div>
    );
}

/* control.propTypes = {
 
} */

const mapStateToProps = (state) => {
    const fishpond = fishpondSelector(state);
    const waterpump = waterpumpSelector(state);
    const irrigator = irrigatorSelector(state);
    return {
        fishpond: fishpond.status,
        waterpump: waterpump.status,
        irrigator: irrigator.status,
    }
};


/* const mapDispatchToProps = (dispatch) => ({
    increaseItemQuantity(id){
        dispatch(increaseItemQuantity(id));
    },
    decreaseItemQuantity(id){
        dispatch(decreaseItemQuantity(id));
    }
}); */

export default connect(mapStateToProps)(control);