/**
 * @license MIT
 * @fileoverview Menage all routes
 * @copyright codewithsadee 2023 All rights reserved
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */

'use strict';

import { updateWeather, error404 } from "./app.js";
const defaultLocation = "#/weather?lat=23.7644025&lon=90.389015";

const currentLocation = function () {
  window.navigator.geolocation.getCurrentPosition(
    res => {
      const { latitude, longitude } = res.coords;
      updateWeather(`lat=${latitude}`, `lon=${longitude}`);
    },
    err => {
      window.location.hash = defaultLocation;
    }
  );
};
/**
 * @param {string} query Searched query
 */

const searchLocation = query => updateWeather(...query.split("&"));

const routes = new Map([
  ["/current-location", currentLocation],
  ["/weather", searchLocation],
]);

const checkHash = function () {
  const requestUrl = window.location.hash.slice(1);
  const [route, query] = requestUrl.includes
    ? requestUrl.split("?")
    : [requestUrl];
  routes.get(route) ? routes.get(route)(query) : error404();
};

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function () {
  if (!window.location.hash) {
    window.location.hash = "/current-location";
  } else {
    checkHash();
  }
});