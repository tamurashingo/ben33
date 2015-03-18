'use strict';

angular.module('ben33App')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('detail', {
        url: '/detail/:eventId',
        templateUrl: 'app/detail/detail.html',
        controller: 'DetailCtrl'
      });
  }]);

