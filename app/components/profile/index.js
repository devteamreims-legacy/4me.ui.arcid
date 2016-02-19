import _ from 'lodash';
import { singleResult } from '../../stub-data/';
import ngRedux from 'ng-redux';

/**
 * @ngdoc overview
 * @name 4me.ui.arcid.profile
 * @description
 * # ARCID : Show a single flight profile
 *
 */
angular.module('4me.ui.arcid.components.profile', [ngRedux])
.component('fmeArcidProfile', {
  restrict: 'E',
  controller: profileController,
  templateUrl: 'views/arcid/app/components/profile/index.tpl.html'
});

profileController.$inject = ['$ngRedux', '$scope'];
function profileController($ngRedux, $scope) {
  let unsubscribe = $ngRedux.connect(mapStateToThis)(this);
  $scope.$on('$destroy', unsubscribe);

  function mapStateToThis(state) {
    return {
      isLoading: state.flightProfile.isLoading,
      flightId: state.flightProfile.flightId,
      flight: state.flightProfile.flight,
      lastUpdated: state.flightProfile.lastUpdated,
      pointProfile: state.flightProfile.pointProfile,
      airspaceProfile: state.flightProfile.airspaceProfile
    }
  }
}
