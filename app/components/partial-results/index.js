import _ from 'lodash';
import { partialResults } from '../../stub-data/';

/**
 * @ngdoc overview
 * @name 4me.ui.arcid.partial-results
 * @description
 * # ARCID List of partials results
 *
 */
angular.module('4me.ui.arcid.components.partialResults', [])
.component('fmeArcidPartialResults', {
  restrict: 'E',
  controller: partialResultsController,
  templateUrl: 'views/arcid/app/components/partial-results/index.tpl.html'
});

partialResultsController.$inject = ['$timeout'];
function partialResultsController($timeout) {
  let loading = true;

  this.flights = [];

  this.isLoading = () => loading;

  $timeout(() => {
    loading = false;
    this.flights = _.clone(partialResults);
  }, 2000);
}
