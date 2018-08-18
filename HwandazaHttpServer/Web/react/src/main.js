import React from "react";
import reactDOM from "react-dom";
import { getStore } from "../src/store/getStore";
import { getStatus } from "./actions";
// app specific imports
import HwandazaAutomation from "./containers/HwandazaAutomation";

const store = getStore();

const render = store => {
  reactDOM.render(
    <div>
      <HwandazaAutomation state={store.getState()} />
    </div>,
    document.getElementById("hwandaza-automation")
  );
};

render(store);

const action = getStatus();
store.dispatch(action);