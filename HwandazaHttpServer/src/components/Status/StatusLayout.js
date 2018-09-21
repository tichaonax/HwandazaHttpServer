import React from "react";
import { Flex, Box } from 'rebass';

import StatusBox from './StatusBox';

import "./Status.css";
 
function getModuleCheckedValue(module) {
    return (module && module.power === 1) ? "checked" : null;
  }

  function getCheckedValue(power) {
    return (power === 1) ? "checked" : null;
  }

const statuslayout = props => {
    const { lights, fishpond, waterpump, irrigator } = props.Props;
    const waterpumpChecked = getModuleCheckedValue(waterpump);
    const fishpondChecked = getModuleCheckedValue(fishpond);
    const irrigatorChecked = getModuleCheckedValue(irrigator);

    const m1Checked = (lights) ? getCheckedValue(lights.m1): null;
    const m2Checked = (lights) ? getCheckedValue(lights.m2) : null;
    const l3Checked = (lights) ? getCheckedValue(lights.l3) : null;
    const l4Checked = (lights) ? getCheckedValue(lights.l4) : null;
    const l5Checked = (lights) ? getCheckedValue(lights.l5) : null;
    const l6Checked = (lights) ? getCheckedValue(lights.l6) : null;
 
  return (
    <div>
      <Flex>
        <Box p={6} width={1/2}>
          <div><StatusBox Checked={waterpumpChecked} Title="Water Pump" Id="1" HeaderColor="orange" Disabled="disabled"/></div>
          <div><StatusBox Checked={fishpondChecked} Title="Fish Pond" Id="2" HeaderColor="purple" Disabled="disabled"/></div>
          <div><StatusBox Checked={irrigatorChecked} Title="Lawn Irrigator" Id="3" HeaderColor="green" Disabled="disabled"/></div>
        </Box>
        <Box p={3} width={1/2}>
          <div><StatusBox Checked={m1Checked} Title="M1" Id="8" HeaderColor="#FC8144" Disabled="disabled"/></div>
          <div><StatusBox Checked={m2Checked} Title="M2" Id="9" HeaderColor="#4596FF" Disabled="disabled"/></div>
          <div><StatusBox Checked={l3Checked} Title="L3" Id="4" HeaderColor="#FF45E6" Disabled="disabled"/></div>
          <div><StatusBox Checked={l4Checked} Title="L4" Id="5" HeaderColor="#27E80E" Disabled="disabled"/></div>
          <div><StatusBox Checked={l5Checked} Title="L5" Id="6" HeaderColor="#EB5F0E" Disabled="disabled"/></div>
          <div><StatusBox Checked={l6Checked} Title="L6" Id="7" HeaderColor="#292920" Disabled="disabled"/></div>
        </Box>
      </Flex>
    </div>
  );
};

export default statuslayout;