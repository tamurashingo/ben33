'use strict';

angular.module('ben33App')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/main/:pageNo',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  }]);
