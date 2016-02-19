import searchbox from './searchbox/';
import resultsAndHistory from './results/';
import profile from './profile/';
import errors from './errors/';

angular.module('4me.ui.arcid.components', [
  '4me.ui.arcid.components.searchbox',
  '4me.ui.arcid.components.results',
  '4me.ui.arcid.components.profile',
  '4me.ui.arcid.components.errors',
  'angularMoment'
]);
