import React from 'react';
import { connect } from "react-redux";

import {
    fishpondSelector,
    waterpumpSelector,
    irrigatorSelector
} from '../../selectors';

import { Utils } from "../../utility";
import "../../styles/styles.css";
import './Control.css';
import { HwandaSwitch } from '../HwandaSwitch/HwandaSwitch';

import {
    setModuleStatus,
    } from '../../actions';

const control = props => {

    const { fishpond, waterpump, irrigator } = props

    function handleWaterPumpSwitchChange(checked) {
        props.dispatch(setModuleStatus(
            {
                Command: Utils.getCommandString(checked),
                Module: "MainWaterPump",
            }
        ));
    }
      
    function handleIrrigatorSwitchChange(checked) {
        props.dispatch(setModuleStatus(
            {
                Command: Utils.getCommandString(checked),
                Module: "LawnIrrigator",
            }
        ));
    }

    function handleFishpondSwitchChange(checked) {
        props.dispatch(setModuleStatus(
            {
                Command: Utils.getCommandString(checked),
                Module: "FishPondPump",
            }
        ));
    }

    return ( 
    <div className="hwandaza-automation">
        <h2>Module Control</h2> 
        <div>
            <div className="switch-header">Water Pump </div>
            <div>
                <HwandaSwitch 
                            power={waterpump && Utils.getBoolValue(waterpump)} 
                            textColor="orange" 
                            fillColor="red"
                            handleChange={handleWaterPumpSwitchChange}/>
            </div>
        </div>
        <div>
            <div className="switch-header">Fishpond</div>
            <div>
                <HwandaSwitch 
                            power={fishpond && Utils.getBoolValue(fishpond)} 
                            textColor="orange" 
                            fillColor="yellow"
                            handleChange={handleFishpondSwitchChange}/>
            </div>
        </div>
        <div>
            <div className="switch-header">Irrigator</div>
            <div>
                <HwandaSwitch 
                            power={irrigator && Utils.getBoolValue(irrigator)} 
                            textColor="orange" 
                            fillColor="aqua"
                            handleChange={handleIrrigatorSwitchChange}/>
            </div>
        </div>
   </div>
    );
}

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