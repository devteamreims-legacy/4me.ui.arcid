import ngReduxProvider from 'ng-redux/lib/components/ngRedux';

export default angular.module('arcidNgRedux', [])
  .provider('$arcidNgRedux', ngReduxProvider)
  .name;