import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import { getStore } from "../src/store/getStore";
import { getStatus, getPictures, getVideos, getSongs} from "./actions";
import App from "./App";

const store = getStore();

const Index = ()=>(
    <Provider store={store}>
        <App/>
    </Provider>
)

const render = (store)=>{
    ReactDOM.render(
        <div>
            <Index state={store.getState()}/>
        </div>,
        document.getElementById('hwandaza-automation'));
};

render(store);

store.dispatch(getStatus());
store.dispatch(getPictures());
store.dispatch(getVideos());
store.dispatch(getSongs());
