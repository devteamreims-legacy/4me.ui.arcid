import searchbox from './searchbox/';
import flightsInSector from './flights-in-sector/';
import partialResults from './partial-results/';
import profile from './profile/';

angular.module('4me.ui.arcid.components', [
  '4me.ui.arcid.components.searchbox',
  '4me.ui.arcid.components.flightsInSector',
  '4me.ui.arcid.components.partialResults',
  '4me.ui.arcid.components.profile',
  'angularMoment'
]);
