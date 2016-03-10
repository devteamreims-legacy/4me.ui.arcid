import _ from 'lodash';
import arcidNgRedux from '../../arcidRedux';

import {
  isLoading as isQueryLoading,
  getResults,
  isErrored,
  getError,
  hasMultipleResults,
} from '../../selectors/query';

import {
  getSelectedIfplId,
} from '../../selectors/profile';

import {
  getFlights as getHistoryFlights,
  isLoading as isHistoryLoading,
} from '../../selectors/history';

import {
  getProfile
} from '../../actions/profile';

import {
  clearResults
} from '../../actions/query';

/**
 * @ngdoc overview
 * @name 4me.ui.arcid.results
 * @description
 * # ARCID List of results + history
 *
 */
export default angular.module('4me.ui.arcid.components.left-pane', [arcidNgRedux])
.component('fmeArcidLeftPane', {
  restrict: 'E',
  controller: leftPaneController,
  templateUrl: 'views/arcid/app/components/left-pane/index.tpl.html'
})
.name;

leftPaneController.$inject = ['$arcidNgRedux', '$scope'];
function leftPaneController($arcidNgRedux, $scope) {
  const mapStateToThis = (state) => {
    let flights = [
      ...getHistoryFlights(state),
    ];

    const showResultPicker = hasMultipleResults(state);

    if(showResultPicker) {
      flights = [
        ...getResults(state),
        ...flights
      ];
    }

    const isLoading = isHistoryLoading(state) || isQueryLoading(state);

    return {
      isLoading,
      flights,
      selectedIfplId: getSelectedIfplId(state),
      isErrored: isErrored(state),
      error: getError(state),
      showResultPicker,
    };
  };

  const mapDispatchToThis = (dispatch) => {
    return {
      clearResults: () => dispatch(clearResults()),
      selectFlight: (ifplId) => dispatch(getProfile(ifplId)),
    };
  };

  let unsubscribe = $arcidNgRedux.connect(mapStateToThis, mapDispatchToThis)(this);
  $scope.$on('$destroy', unsubscribe);

}
