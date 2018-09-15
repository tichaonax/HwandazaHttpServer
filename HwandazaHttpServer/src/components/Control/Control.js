import React from 'react';
import { connect } from 'react-redux';
import { Flex, Box } from 'rebass';

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
        <Flex>
            <Box p={3} width={1/2}>
                Water Pump
            </Box>
            <Box p={3} width={1/4} alignItems='center'>
                <HwandaSwitch 
                    power={waterpump && Utils.getBoolValue(waterpump)} 
                    textColor="orange" 
                    fillColor="red"
                    handleChange={handleWaterPumpSwitchChange}/>
            </Box>
            <Box p={3} width={1/4}></Box>
        </Flex>
        <Flex> 
            <Box p={3} width={1/2} alignItems='center'>
                Fishpond Pump
            </Box>
            <Box p={3} width={1/4}>        
                <HwandaSwitch 
                    power={fishpond && Utils.getBoolValue(fishpond)} 
                    textColor="orange" 
                    fillColor="yellow"
                    handleChange={handleFishpondSwitchChange}/>
            </Box>
            <Box p={3} width={1/4}></Box>
        </Flex>
        <Flex>
            <Box p={3} width={1/2} alignItems='center'>
                Lawn Irrigator
            </Box>
            <Box p={3} width={1/4}>
                <HwandaSwitch 
                    power={irrigator && Utils.getBoolValue(irrigator)} 
                    textColor="orange" 
                    fillColor="aqua"
                    handleChange={handleIrrigatorSwitchChange}/>
            </Box>
            <Box p={3} width={1/4}></Box>
        </Flex>
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

export default connect(mapStateToProps)(control);