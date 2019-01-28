import React from 'react';
import { connect } from "react-redux";
import { HwandaSwitch } from '../HwandaSwitch/HwandaSwitch';
import { lightsSelector } from '../../selectors';
import { setRandomLightStatus, setLoadingStatus } from '../../actions';
import { Utils } from "../../utility";
import "../../styles/css/styles.css";
import './Lights.css';

const lights = props => {
        props.dispatch(setLoadingStatus(false));

    const { lights, browserNavigation } = props;
    browserNavigation('lights');

    function getModuleStatus(module) {
        const mduleStatus = {status: null, lastUpdate: null}
        if(module){
         if(module.power === 1){
          mduleStatus.status ="checked"
         }
         mduleStatus.lastUpdate = module.lastUpdate;
        }
         return mduleStatus;
      }

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
  
    const m1 = getModuleStatus(lights.m1);
    const m2 = getModuleStatus(lights.m2);
    const l3 = getModuleStatus(lights.l3);
    const l4 = getModuleStatus(lights.l4);
    const l5 = getModuleStatus(lights.l5);
    const l6 = getModuleStatus(lights.l6);

    return ( 
    <div className="row">
        <div className="columns medium-centered col-sm-9">
            <div className="hwandaza-automation">
        <h2>Random Lights</h2> 
        <div>
            <div className="switch-header">M1</div>
            <div>
                <HwandaSwitch 
                            power={m1.status} 
                            textColor="orange" 
                            fillColor="red"
                            handleChange={handleLightSwitchChangeM1}/>
            </div>
        </div>
        <div>
            <div className="switch-header">M2</div>
            <div>
                <HwandaSwitch 
                            power={m2.status} 
                            textColor="orange" 
                            fillColor="yellow"
                            handleChange={handleLightSwitchChangeM2}/>
            </div>
        </div>
        <div>
            <div className="switch-header">L3</div>
            <div>
                <HwandaSwitch 
                            power={l3.status} 
                            textColor="orange" 
                            fillColor="aqua"
                            handleChange={handleLightSwitchChangeL3}/>
            </div>
        </div>
        <div>
            <div className="switch-header">L4</div>
            <div>
                <HwandaSwitch 
                            power={l4.status} 
                            textColor="orange" 
                            fillColor="aqua"
                            handleChange={handleLightSwitchChangeL4}/>
            </div>
        </div>
        <div>
            <div className="switch-header">L5</div>
            <div>
                <HwandaSwitch 
                            power={l5.status} 
                            textColor="orange" 
                            fillColor="aqua"
                            handleChange={handleLightSwitchChangeL5}/>
            </div>
        </div>
        <div>
            <div className="switch-header">L6</div>
            <div>
                <HwandaSwitch 
                            power={l6.status} 
                            textColor="orange" 
                            fillColor="aqua"
                            handleChange={handleLightSwitchChangeL6}/>
            </div>
        </div>
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