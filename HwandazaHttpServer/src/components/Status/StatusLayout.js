import React from "react";
import { Flex, Box } from 'rebass';

import StatusBox from './StatusBox';

import "./Status.css";
 
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

  function getCheckedValue(power) {
    return (power === 1) ? "checked" : null;
  }

const statuslayout = props => {
    const { lights, fishpond, waterpump, irrigator } = props.props;
    //console.log('lights', JSON.stringify(lights));
    const waterpumpStatus = getModuleStatus(waterpump);
    const fishpondStatus = getModuleStatus(fishpond);
    const irrigatorStatus = getModuleStatus(irrigator);

    const m1Checked = (lights) ? getCheckedValue(lights.m1): null;
    const m1LastUpdate = (lights) ? lights.m1LastUpdate : null;
 
    const m2Checked = (lights) ? getCheckedValue(lights.m2) : null;
    const m2LastUpdate = (lights) ? lights.m2LastUpdate : null;

    const l3Checked = (lights) ? getCheckedValue(lights.l3) : null;
    const l3LastUpdate = (lights) ? lights.l3LastUpdate : null;

    const l4Checked = (lights) ? getCheckedValue(lights.l4) : null;
    const l4LastUpdate = (lights) ? lights.l4LastUpdate : null;

    const l5Checked = (lights) ? getCheckedValue(lights.l5) : null;
    const l5LastUpdate = (lights) ? lights.l5LastUpdate : null;

    const l6Checked = (lights) ? getCheckedValue(lights.l6) : null;
    const l6LastUpdate = (lights) ? lights.l6LastUpdate : null;
 
  return (
    <div>
      <Flex>
        <Box p={3} width={1/2}>
          <div><StatusBox LastUpdate={waterpumpStatus.lastUpdate} Checked={waterpumpStatus.status} Title="Water Pump" Id="1" HeaderColor="#990033" Disabled="disabled"/></div>
          <div><StatusBox LastUpdate={fishpondStatus.lastUpdate} Checked={fishpondStatus.status} Title="Fish Pond" Id="2" HeaderColor="purple" Disabled="disabled"/></div>
          <div><StatusBox LastUpdate={irrigatorStatus.lastUpdate} Checked={irrigatorStatus.status} Title="Lawn Irrigator" Id="3" HeaderColor="green" Disabled="disabled"/></div>
          <div><StatusBox LastUpdate={m1LastUpdate} Checked={m1Checked} Title="M1" Id="8" HeaderColor="#FC8144" Disabled="disabled"/></div>
          <div><StatusBox LastUpdate={m2LastUpdate} Checked={m2Checked} Title="M2" Id="9" HeaderColor="#4596FF" Disabled="disabled"/></div>
        </Box>
        <Box p={3} width={1/2}>
          <div><StatusBox LastUpdate={l3LastUpdate} Checked={l3Checked} Title="L3" Id="4" HeaderColor="#FF45E6" Disabled="disabled"/></div>
          <div><StatusBox LastUpdate={l4LastUpdate} Checked={l4Checked} Title="L4" Id="5" HeaderColor="#27E80E" Disabled="disabled"/></div>
          <div><StatusBox LastUpdate={l5LastUpdate} Checked={l5Checked} Title="L5" Id="6" HeaderColor="#EB5F0E" Disabled="disabled"/></div>
          <div><StatusBox LastUpdate={l6LastUpdate} Checked={l6Checked} Title="L6" Id="7" HeaderColor="#292920" Disabled="disabled"/></div>
        </Box>
      </Flex>
    </div>
  );
};

export default statuslayout;