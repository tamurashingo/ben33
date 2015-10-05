'use strict';

angular.module('ben33App')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('detail', {
        url: '/detail/:eventId',
        templateUrl: 'app/detail/detail.html',
        controller: 'DetailCtrl'
      })
      .state('detailentry', {
        url: '/detail/entry/:eventId',
        templateUrl: 'app/detail/entry.html',
        controller: 'DetailEntryCtrl',
        data: {
          requiresLogin: true
        }
      })
      .state('detailcancel', {
        url: '/detail/cancel/:eventId',
        templateUrl: 'app/detail/cancel.html',
        controller: 'DetailCancelCtrl',
        data: {
          requiresLogin: true
        }
      });
  }]);

