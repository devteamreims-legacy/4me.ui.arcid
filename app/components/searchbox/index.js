import arcidNgRedux from '../../arcidRedux';
import _ from 'lodash';

/**
 * @ngdoc overview
 * @name 4me.ui.arcid.searchbox
 * @description
 * # ARCID Search box
 *
 */
export default angular.module('4me.ui.arcid.components.searchbox', [arcidNgRedux])
.component('fmeArcidSearchbox', {
  restrict: 'E',
  controller: searchboxController,
  templateUrl: 'views/arcid/app/components/searchbox/index.tpl.html'
})
.name;

import {
  isLoading,
  getQueryCallsign,
} from '../../selectors/query';

import {
  startQuery
} from '../../actions/query';

import {
  startSearch,
} from '../../actions/autocomplete';

searchboxController.$inject = ['$arcidNgRedux', '$scope'];
function searchboxController($arcidNgRedux, $scope) {

  const $ctrl = this;

  function mapStateToThis(state) {
    return {
      isLoading: isLoading(state),
      query: getQueryCallsign(state),
    };
  }

  const mapDispatchToThis = {
    startQuery,
    startSearch,
  };

  let unsubscribe = $arcidNgRedux.connect(mapStateToThis, mapDispatchToThis)(this);
  $scope.$on('$destroy', unsubscribe);

  $scope.$watch('$ctrl.query', _.debounce($ctrl.startSearch, 500));

}
