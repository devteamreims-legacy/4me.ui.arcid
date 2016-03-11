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
  getFlights as getAutocompleteFlights,
  isLoading as isAutocompleteLoading,
} from '../../selectors/autocomplete';

import {
  getProfile
} from '../../actions/profile';

import {
  clearResults
} from '../../actions/query';

import {
  optimisticAdd,
} from '../../actions/history';

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
    // Order of appearance : queryResults then autocompleteResults then history

    let flights = [];
    const showResultPicker = hasMultipleResults(state);

    if(showResultPicker) {
      flights = [
        ...getResults(state)
      ];
    } else if(!_.isEmpty(getAutocompleteFlights(state))) {
      flights = [
        ...getAutocompleteFlights(state)
      ];
    } else {
      flights = [
        ...getHistoryFlights(state),
      ];
    }

    const isLoading = isHistoryLoading(state) || isQueryLoading(state) || isAutocompleteLoading(state);

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
      selectFlight: (ifplId, flight) => {
        if(flight) {
          dispatch(optimisticAdd(flight));
        }
        dispatch(getProfile(ifplId));
      },
    };
  };

  let unsubscribe = $arcidNgRedux.connect(mapStateToThis, mapDispatchToThis)(this);
  $scope.$on('$destroy', unsubscribe);

}
