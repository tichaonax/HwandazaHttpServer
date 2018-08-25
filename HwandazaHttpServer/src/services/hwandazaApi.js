import { Api } from "./api";
import { Utils } from "../utility";

export const getStatusApi = () => {
  const api = Api();
  Object.assign(api.defaults, { withCredentials: true });
  const url = `${Utils.getUrlAddress()}/hwandazaautomation/status`;
  return api.get(url);
};

export default getStatusApi;
