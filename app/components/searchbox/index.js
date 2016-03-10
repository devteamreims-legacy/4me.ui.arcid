import arcidNgRedux from '../../arcidRedux';

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

searchboxController.$inject = ['$arcidNgRedux', '$scope'];
function searchboxController($arcidNgRedux, $scope) {

  function mapStateToThis(state) {
    return {
      isLoading: isLoading(state),
      query: getQueryCallsign(state),
    };
  }

  const mapDispatchToThis = {
    startQuery,
  };

  let unsubscribe = $arcidNgRedux.connect(mapStateToThis, mapDispatchToThis)(this);
  $scope.$on('$destroy', unsubscribe);

}
