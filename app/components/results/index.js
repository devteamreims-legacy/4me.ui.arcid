import _ from 'lodash';
import { partialResults } from '../../stub-data/';
import { getProfile } from '../../actions/profile';

import arcidNgRedux from '../../arcidRedux';

import {
  getSelectedIfplId
} from '../../selectors/profile';

import {
  isLoading,
  getFlights
} from '../../selectors/results';

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

  this.selectFlight = (ifpldId) => this.dispatch(getProfile(ifpldId));

  function mapStateToThis(state) {
    return {
      isLoading: isLoading(state),
      flights: getFlights(state),
      selectedIfplId: getSelectedIfplId(state)
    };
  }
}
