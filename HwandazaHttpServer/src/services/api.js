import axios from "axios";
import { Utils } from "../utility";

export const Api = () => {
  const newBaseUrl = Utils.getUrlAddress(window.location.href).replace(
    /\/+$/g,
    ""
  );
  const baseUrl = `${newBaseUrl}/`;
  const config = {
    baseUrl,
    headers: { Accept: "application/json" },
    credentials: "same-origin"
  };

  const instance = axios.create(config);
  instance.defaults.headers.post["Content-Type"] = "application/json";
  return instance;
};

export default Api;
