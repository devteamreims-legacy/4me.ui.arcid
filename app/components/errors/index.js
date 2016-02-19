import _ from 'lodash';
import ngRedux from 'ng-redux';

/**
 * @ngdoc overview
 * @name 4me.ui.arcid.errors
 * @description
 * # ARCID : Show ARCID Errors
 *
 */
angular.module('4me.ui.arcid.components.errors', [ngRedux])
.component('fmeArcidErrors', {
  restrict: 'E',
  controller: errorsController,
  templateUrl: 'views/arcid/app/components/errors/index.tpl.html'
});

errorsController.$inject = ['$ngRedux', '$scope'];
function errorsController($ngRedux, $scope) {
  let unsubscribe = $ngRedux.connect(mapStateToThis)(this);
  $scope.$on('$destroy', unsubscribe);

  function mapStateToThis(state) {
    return {
      error: state.errors
    }
  }
}