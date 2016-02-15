import _ from 'lodash';
import { singleResult } from '../../stub-data/';

/**
 * @ngdoc overview
 * @name 4me.ui.arcid.profile
 * @description
 * # ARCID : Show a single flight profile
 *
 */
angular.module('4me.ui.arcid.components.profile', [])
.component('fmeArcidProfile', {
  restrict: 'E',
  controller: profileController,
  templateUrl: 'views/arcid/app/components/profile/index.tpl.html'
});

profileController.$inject = ['$timeout'];
function profileController($timeout) {
  let loading = true;

  this.flight = {};

  this.isLoading = () => loading;

  this.isProfileEmpty = () => _.isEmpty(this.flight);

  $timeout(() => {
    loading = false;
    this.flight = _.clone(singleResult);
  }, 2000);
}
