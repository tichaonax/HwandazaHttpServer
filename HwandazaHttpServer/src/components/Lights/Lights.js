import React from 'react';
import { connect } from "react-redux";
import { HwandaSwitch } from '../HwandaSwitch/HwandaSwitch';
import { lightsSelector } from '../../selectors';
import { setRandomLightStatus } from '../../actions';
import { Utils } from "../../utility";
import "../../styles/css/styles.css";
import './Lights.css';


const lights = props => {

    const { lights, browserNavigation } = props;
    browserNavigation('lights');

    function dispatchCommand(checked, light) {
        props.dispatch(setRandomLightStatus(
            {
                Command: Utils.getCommandString(checked),
                Module: "RandomLights",
                Lights:[light],
            }
        ));
    }

    function handleLightSwitchChangeM1(checked){
        dispatchCommand(checked, "M1");
    }
    function handleLightSwitchChangeM2(checked){
        dispatchCommand(checked, "M2");
    }
    function handleLightSwitchChangeL3(checked){
        dispatchCommand(checked, "L3");
    }
    function handleLightSwitchChangeL4(checked){
        dispatchCommand(checked, "L4");
    }
    function handleLightSwitchChangeL5(checked){
        dispatchCommand(checked, "L5");
    }
    function handleLightSwitchChangeL6(checked){
        dispatchCommand(checked, "L6");
    }

    function getCheckedValue(power) {
        return (power === 1) ? true : false;
      }

    const m1Checked = (lights) ? getCheckedValue(lights.m1): false;
    const m2Checked = (lights) ? getCheckedValue(lights.m2): false;
    const l3Checked = (lights) ? getCheckedValue(lights.l3): false;
    const l4Checked = (lights) ? getCheckedValue(lights.l4): false;
    const l5Checked = (lights) ? getCheckedValue(lights.l5): false;
    const l6Checked = (lights) ? getCheckedValue(lights.l6): false;

    return ( 
    <div className="hwandaza-automation">
        <h2>Random Lights</h2> 
        <div>
            <div className="switch-header">M1</div>
            <div>
                <HwandaSwitch 
                            power={m1Checked} 
                            textColor="orange" 
                            fillColor="red"
                            handleChange={handleLightSwitchChangeM1}/>
            </div>
        </div>
        <div>
            <div className="switch-header">M2</div>
            <div>
                <HwandaSwitch 
                            power={m2Checked} 
                            textColor="orange" 
                            fillColor="yellow"
                            handleChange={handleLightSwitchChangeM2}/>
            </div>
        </div>
        <div>
            <div className="switch-header">L3</div>
            <div>
                <HwandaSwitch 
                            power={l3Checked} 
                            textColor="orange" 
                            fillColor="aqua"
                            handleChange={handleLightSwitchChangeL3}/>
            </div>
        </div>
        <div>
            <div className="switch-header">L4</div>
            <div>
                <HwandaSwitch 
                            power={l4Checked} 
                            textColor="orange" 
                            fillColor="aqua"
                            handleChange={handleLightSwitchChangeL4}/>
            </div>
        </div>
        <div>
            <div className="switch-header">L5</div>
            <div>
                <HwandaSwitch 
                            power={l5Checked} 
                            textColor="orange" 
                            fillColor="aqua"
                            handleChange={handleLightSwitchChangeL5}/>
            </div>
        </div>
        <div>
            <div className="switch-header">L6</div>
            <div>
                <HwandaSwitch 
                            power={l6Checked} 
                            textColor="orange" 
                            fillColor="aqua"
                            handleChange={handleLightSwitchChangeL6}/>
            </div>
        </div>
   </div>
    );
}

const mapStateToProps = (state) => {
    const lights = lightsSelector(state);
    return {
        lights: lights.status,
    }
};

export default connect(mapStateToProps)(lights);