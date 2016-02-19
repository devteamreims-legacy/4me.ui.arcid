import _ from 'lodash';
import { partialResults } from '../../stub-data/';
import ngRedux from 'ng-redux';
import { getProfile } from '../../actions/profile';

/**
 * @ngdoc overview
 * @name 4me.ui.arcid.results
 * @description
 * # ARCID List of results + history
 *
 */
angular.module('4me.ui.arcid.components.results', [ngRedux])
.component('fmeArcidResults', {
  restrict: 'E',
  controller: resultsController,
  templateUrl: 'views/arcid/app/components/results/index.tpl.html'
});

resultsController.$inject = ['$ngRedux', '$scope'];
function resultsController($ngRedux, $scope) {
  
  let unsubscribe = $ngRedux.connect(mapStateToThis)(this);
  $scope.$on('$destroy', unsubscribe);

  this.selectFlight = (flightId) => this.dispatch(getProfile(flightId));

  function mapStateToThis(state) {
    return {
      isLoading: state.results.isLoading,
      flights: state.results.flights,
      selectedFlightId: state.flightProfile.flightId
    }
  }
}
