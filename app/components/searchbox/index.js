import Actions from '../../actions/';

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

searchboxController.$inject = ['$arcidNgRedux', '$scope'];
function searchboxController($arcidNgRedux, $scope) {
  
  let unsubscribe = $arcidNgRedux.connect(mapStateToThis)(this);
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
