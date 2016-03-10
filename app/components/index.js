import searchbox from './searchbox/';
import profile from './profile/';
import leftPane from './left-pane';

export default angular.module('4me.ui.arcid.components', [
  searchbox,
  profile,
  leftPane,
])
.name;
