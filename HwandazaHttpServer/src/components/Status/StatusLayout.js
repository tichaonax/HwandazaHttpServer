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

const statuslayout = props => {
    const { lights, fishpond, waterpump, irrigator } = props.props;
    const waterpumpStatus = getModuleStatus(waterpump);
    const fishpondStatus = getModuleStatus(fishpond);
    const irrigatorStatus = getModuleStatus(irrigator);
    const m1 = getModuleStatus(lights.m1);
    const m2 = getModuleStatus(lights.m2);
    const l3 = getModuleStatus(lights.l3);
    const l4 = getModuleStatus(lights.l4);
    const l5 = getModuleStatus(lights.l5);
    const l6 = getModuleStatus(lights.l6);
 
  return (
    <div>
      <Flex>
        <Box p={3} width={1/2}>
          <div><StatusBox LastUpdate={waterpumpStatus.lastUpdate} Checked={waterpumpStatus.status} Title="Water Pump" Id="1" HeaderColor="#990033" Disabled="disabled"/></div>
          <div><StatusBox LastUpdate={fishpondStatus.lastUpdate} Checked={fishpondStatus.status} Title="Fish Pond" Id="2" HeaderColor="purple" Disabled="disabled"/></div>
          <div><StatusBox LastUpdate={irrigatorStatus.lastUpdate} Checked={irrigatorStatus.status} Title="Lawn Irrigator" Id="3" HeaderColor="green" Disabled="disabled"/></div>
          <div><StatusBox LastUpdate={m1.lastUpdate} Checked={m1.status} Title="M1" Id="8" HeaderColor="#FC8144" Disabled="disabled"/></div>
          <div><StatusBox LastUpdate={m2.lastUpdate} Checked={m2.status} Title="M2" Id="9" HeaderColor="#4596FF" Disabled="disabled"/></div>
        </Box>
        <Box p={3} width={1/2}>
          <div><StatusBox LastUpdate={l3.lastUpdate} Checked={l3.status} Title="L3" Id="4" HeaderColor="#FF45E6" Disabled="disabled"/></div>
          <div><StatusBox LastUpdate={l4.lastUpdate} Checked={l4.status} Title="L4" Id="5" HeaderColor="#27E80E" Disabled="disabled"/></div>
          <div><StatusBox LastUpdate={l5.lastUpdate} Checked={l5.status} Title="L5" Id="6" HeaderColor="#EB5F0E" Disabled="disabled"/></div>
          <div><StatusBox LastUpdate={l6.lastUpdate} Checked={l6.status} Title="L6" Id="7" HeaderColor="#292920" Disabled="disabled"/></div>
        </Box>
      </Flex>
    </div>
  );
};

export default statuslayout;