import React from "react";
import swal from "sweetalert";
import { Tabs } from "antd";
import "../styles/styles.css";

import Control from "../components/Control";
import ImageGallery from "../components/ImageGallery";
import Lights from "../components/Lights";
import Settings from "../components/Settings";
import Status from "../components/Status";
import MusicPlayer from "../components/MusicPlayer";
const TabPane = Tabs.TabPane;

export default class HwandazaAutomation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "small"
    };
  }

  pop = () => {
    swal("Oops!", "Not Allowed!", "error");
  };

  onChange = e => {
    console.log("tab", e);
  };

  render() {
    return (
      <div className="HwandazaAutomation">
        <h1 onClick={() => this.pop()}>Hwanda Automation</h1>
        <div>
          <Tabs onChange={tab => this.onChange(tab)} type="card" size="small">
            <TabPane tab="Status" key="1">
              <Status />
            </TabPane>
            <TabPane tab="Lights" key="2">
              <Lights />
            </TabPane>
            <TabPane tab="Gallery" key="3">
              <ImageGallery />
            </TabPane>
            <TabPane tab="Music" key="4">
              <MusicPlayer />
            </TabPane>
            <TabPane tab="Control" key="5">
              <Control />
            </TabPane>
            <TabPane tab="Settings" key="6">
              <Settings />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
