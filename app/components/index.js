import searchbox from './searchbox/';
import resultsAndHistory from './results/';
import profile from './profile/';
import errors from './errors/';

export default angular.module('4me.ui.arcid.components', [
  searchbox,
  resultsAndHistory,
  profile,
  errors
])
.name;
