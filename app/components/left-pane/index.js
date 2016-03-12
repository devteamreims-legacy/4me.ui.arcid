import _ from 'lodash';
import arcidNgRedux from '../../arcidRedux';

import {
  isLoading as isQueryLoading,
  getResults,
  isErrored,
  getError,
  hasMultipleResults,
  getQueryCallsign as getResultQuery,
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
  getQuery as getAutocompleteQuery,
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
    let highlightString = '';

    if(showResultPicker) {
      highlightString = getResultQuery(state);
      flights = [
        ...getResults(state)
      ];
    } else if(!_.isEmpty(getAutocompleteFlights(state))) {
      highlightString = getAutocompleteQuery(state);
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
      highlightString,
      selectedIfplId: getSelectedIfplId(state),
      isErrored: isErrored(state),
      error: getError(state),
      showResultPicker,
    };
  };

  const mapDispatchToThis = (dispatch) => {
    return {
      clearResults: () => dispatch(clearResults()),
      selectFlight: (flight) => {
        dispatch(getProfile(flight, false));
      },
    };
  };

  let unsubscribe = $arcidNgRedux.connect(mapStateToThis, mapDispatchToThis)(this);
  $scope.$on('$destroy', unsubscribe);

}
