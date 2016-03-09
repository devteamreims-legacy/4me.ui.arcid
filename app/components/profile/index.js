import _ from 'lodash';
import arcidNgRedux from '../../arcidRedux';

import moment from 'moment';

import {
  isLoading,
  isEmpty,
  getCallsign,
  getDeparture,
  getDestination,
  getDelay,
  getEobt,
  getPointProfile,
  getLastUpdated,
  getSelectedIfplId,
} from '../../selectors/profile';

import {
  getProfile
} from '../../actions/profile';

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

  this.parseTimeOver = (time) => moment.utc(time).format('HH:mm');

  this.forceRefresh = () => this.dispatch(getProfile(this.ifplId, true));

  function mapStateToThis(state) {
    return {
      isLoading: isLoading(state),
      showProfile: !isEmpty(state),
      ifplId: getSelectedIfplId(state),
      callsign: getCallsign(state),
      departure: getDeparture(state),
      destination: getDestination(state),
      delay: getDelay(state),
      eobt: getEobt(state),
      pointProfile: getPointProfile(state),
      lastUpdated: moment.utc(getLastUpdated(state)).fromNow(),
    }
  }
}
