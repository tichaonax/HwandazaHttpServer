const queryString = require("query-string");

class Utils {
  static parseUrl(url) {
    let link = document.createElement("a");
    link.setAttribute("href", url);
    const retValue = {
      port: link.port,
      hostname: link.hostname,
      pathname: link.pathname,
      protocol: link.protocol,
      search: link.search
    };

    link = null;

    return retValue;
  }

  static getBaseUrl() {
    return this.getUrlAddress(window.location.href).replace(
      /\/+$/g,
      ""
    );
  }

  static getUrlAddress(url) {
    const newUrl = Utils.parseUrl(url);
    return `${newUrl.protocol}//${newUrl.hostname}:${newUrl.port}`;
  }

  static parse(search) {
    return queryString.parse(search);
  }

  static stringify(parsed) {
    return queryString.stringify(parsed);
  }

  static getQueryString(param) {
    return queryString.parse(window.location.search)[`${param}`];
  }

  static getBoolValue(module) {
    return (module && module.power === 1) ? true : false;
  }

  static getCommandString(checked) {
    return (checked) ? "On" : "Off";
  }

  static buildPostFetchOptions(body) {
    const payload = JSON.stringify(body);
    return {
      method: "POST",
      body: payload,
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    }
  }
}

module.exports = {
  Utils
};