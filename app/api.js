/**
 * @ngdoc overview
 * @name 4me.ui.arcid.api
 * @description
 * API Urls for arcid organ
 */

const api = {
  rootPath: 'http://' + window.location.hostname + ':3102',
  arcid: {
    searchCallsign: '/searchFlights',
    searchProfile: '/searchProfiles',
    getHistory: '/history',
  },
  socket: 'http://' + window.location.hostname + ':3102'
};

angular.module('4me.ui.arcid.api', [])
.constant('arcid.api', api);

export default api;
