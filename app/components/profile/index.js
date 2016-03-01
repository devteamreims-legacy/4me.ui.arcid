import _ from 'lodash';
import { singleResult } from '../../stub-data/';
import arcidNgRedux from '../../arcidRedux';

/**
 * @ngdoc overview
 * @name 4me.ui.arcid.profile
 * @description
 * # ARCID : Show a single flight profile
 *
 */
export default angular.module('4me.ui.arcid.components.profile', [
  arcidNgRedux,
  'angularMoment'
])
.component('fmeArcidProfile', {
  restrict: 'E',
  controller: profileController,
  templateUrl: 'views/arcid/app/components/profile/index.tpl.html'
})
.name;

profileController.$inject = ['$arcidNgRedux', '$scope'];
function profileController($arcidNgRedux, $scope) {
  let unsubscribe = $arcidNgRedux.connect(mapStateToThis)(this);
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
