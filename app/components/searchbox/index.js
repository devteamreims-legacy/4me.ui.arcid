import Actions from '../../actions/';
import ngRedux from 'ng-redux';
/**
 * @ngdoc overview
 * @name 4me.ui.arcid.searchbox
 * @description
 * # ARCID Search box
 *
 */
angular.module('4me.ui.arcid.components.searchbox', [ngRedux])
.component('fmeArcidSearchbox', {
  restrict: 'E',
  controller: searchboxController,
  templateUrl: 'views/arcid/app/components/searchbox/index.tpl.html'
});

searchboxController.$inject = ['$ngRedux', '$scope'];
function searchboxController($ngRedux, $scope) {
  
  let unsubscribe = $ngRedux.connect(mapStateToThis)(this);
  $scope.$on('$destroy', unsubscribe);

  this.submitQuery = () => {
    if(this.callsign === '') {
      return;
    }
    console.log('Dispatching action !');
    this.dispatch(Actions.ArcidQuery.getFlights(this.callsign));
  };

  function mapStateToThis(state) {
    return {
      results: state.results,
      callsign: state.results.query
    }
  }
}
