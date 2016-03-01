import _ from 'lodash';

import arcidComponents from './components/';

import ngRedux from 'ng-redux';
import rootReducer from './reducers/';

import thunk from 'redux-thunk';
import deepFreeze from 'redux-freeze';
import createLogger from 'redux-logger';

import { combineReducers } from 'redux';

import arcidNgRedux from './arcidRedux';

/**
 * @ngdoc overview
 * @name 4me.ui.arcid
 * @description
 * # 4me.ui.arcid
 *
 * ARCID Request organ, using 4me.core.ui hooks
 * Register our organ into the main app here
 */
var m = angular
  .module('4me.ui.arcid', [
      'ui.router',
      '4me.core.config',
      '4me.core.notifications',
      '4me.core.errors',
      '4me.core.organs.services',
      '4me.core.status',
      arcidComponents,
      arcidNgRedux
  ]);

/**
 * @ngdoc overview
 * @name 4me.ui.arcid
 * @description
 * # 4me.ui.arcid register states
 *
 * Register organ states here
 */

m.config(organConfig);
m.run(organRegistration);

organConfig.$inject = ['$stateProvider'];
function organConfig($stateProvider) {
  $stateProvider.state('arcid', {
    url: '/arcid',
    templateUrl: 'views/arcid/app/index.tpl.html'
  });
};

organRegistration.$inject = ['mainOrganService', '$state', '$injector', 'arcid.notifications'];
function organRegistration(mainOrganService, $state, $injector, notifications) {

  var r = mainOrganService.register({
    name: 'arcid',
    isActive: () => $state.includes('arcid'),
    navigateTo: function() {
      $state.go('arcid');
      this.getNotificationService().markAllAsRead();
    },
    getNotificationService: function() {
      return $injector.get('arcid.notifications');
    },
    getStatusService: function() {
      return $injector.get('arcid.status');
    }
  });
}

/**
 * @ngdoc overview
 * @name 4me.ui.arcid
 * @description
 * # Decorator for core functions
 *
 * Provides decorated services for core functions :
 * * Error management
 * * Notifications
 *
 */

m.factory('arcid.errors', organErrors);

organErrors.$inject = ['errors'];
function organErrors(errors) {
  var service = {};

  service.add = function(type, message, reason) {
    return errors.add('arcid', type, message, reason);
  };

  return _.defaults(service, errors);
}

m.factory('arcid.notifications', organNotifications);

organNotifications.$inject = ['notifications'];
function organNotifications(notifications) {
  var service = {};

  service.add = function(priority, title, props) {
    return notifications.add('arcid', priority, title, props);
  };

  service.get = function() {
    return _.filter(notifications.get(), function(n) {
      return n.sender === 'arcid';
    })
  };

  return _.defaults(service, _.clone(notifications));
}


// We need another full service here, not some proxy status service
m.factory('arcid.status', organStatus);

organStatus.$inject = ['statusFactory'];
function organStatus(statusFactory) {
  var service = statusFactory.get('arcid');
  return service;
}

m.config(setupRedux);

setupRedux.$inject = ['$arcidNgReduxProvider'];
function setupRedux($arcidNgReduxProvider) {

  const logger = createLogger();

  $arcidNgReduxProvider.createStoreWith(rootReducer, [thunk, deepFreeze, logger]);
}

m.run(bootstrapArcid);

bootstrapArcid.$inject = ['$xmanNgRedux', '$rootScope', 'myCwp', 'mySector'];
function bootstrapArcid($xmanNgRedux, $rootScope, myCwp, mySector) {
  const store = $xmanNgRedux;

  //bootstrap(store, $rootScope, myCwp, mySector);
}
