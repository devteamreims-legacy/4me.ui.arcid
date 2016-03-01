import _ from 'lodash';
import arcidNgRedux from '../../arcidRedux';

/**
 * @ngdoc overview
 * @name 4me.ui.arcid.errors
 * @description
 * # ARCID : Show ARCID Errors
 *
 */
export default angular.module('4me.ui.arcid.components.errors', [arcidNgRedux])
.component('fmeArcidErrors', {
  restrict: 'E',
  controller: errorsController,
  templateUrl: 'views/arcid/app/components/errors/index.tpl.html'
})
.name;

errorsController.$inject = ['$arcidNgRedux', '$scope'];
function errorsController($arcidNgRedux, $scope) {
  let unsubscribe = $arcidNgRedux.connect(mapStateToThis)(this);
  $scope.$on('$destroy', unsubscribe);

  function mapStateToThis(state) {
    return {
      error: state.errors
    }
  }
}