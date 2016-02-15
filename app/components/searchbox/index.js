/**
 * @ngdoc overview
 * @name 4me.ui.arcid.searchbox
 * @description
 * # ARCID Search box
 *
 */
angular.module('4me.ui.arcid.components.searchbox', [])
.component('fmeArcidSearchbox', {
  restrict: 'E',
  controller: searchboxController,
  templateUrl: 'views/arcid/app/components/searchbox/index.tpl.html'
});

searchboxController.$inject = [];
function searchboxController() {

}
