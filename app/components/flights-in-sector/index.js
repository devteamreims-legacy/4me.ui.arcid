import _ from 'lodash';
import { flightsInSector } from '../../stub-data/';

/**
 * @ngdoc overview
 * @name 4me.ui.arcid.flightsInSector
 * @description
 * # ARCID List flights in sector
 *
 */
angular.module('4me.ui.arcid.components.flightsInSector', [])
.component('fmeArcidFlightsInSector', {
  restrict: 'E',
  controller: flightsInSectorController,
  templateUrl: 'views/arcid/app/components/flights-in-sector/index.tpl.html'
});

flightsInSectorController.$inject = ['$timeout'];
function flightsInSectorController($timeout) {
  let loading = true;

  this.isLoading = () => loading;

  this.flights = [];

  $timeout(() => {
    loading = false;
    this.flights = _.clone(flightsInSector);
  }, 2000);
}
