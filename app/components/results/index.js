import _ from 'lodash';
import { partialResults } from '../../stub-data/';
import { getProfile } from '../../actions/profile';

import arcidNgRedux from '../../arcidRedux';

/**
 * @ngdoc overview
 * @name 4me.ui.arcid.results
 * @description
 * # ARCID List of results + history
 *
 */
export default angular.module('4me.ui.arcid.components.results', [arcidNgRedux])
.component('fmeArcidResults', {
  restrict: 'E',
  controller: resultsController,
  templateUrl: 'views/arcid/app/components/results/index.tpl.html'
})
.name;

resultsController.$inject = ['$arcidNgRedux', '$scope'];
function resultsController($arcidNgRedux, $scope) {
  
  let unsubscribe = $arcidNgRedux.connect(mapStateToThis)(this);
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
