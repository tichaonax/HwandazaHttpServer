import Api from "./api";
import { Utils } from "../../utility";

export const getStatus = () => {
  const api = Api();
  Object.assign(api.defaults, { withCredentials: true });
  const url = `${Utils.getUrlAddress()}/status`;
  return api.get(url);
};

module.exports = { getStatus };
