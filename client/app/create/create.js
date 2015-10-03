'use strict';

angular.module('ben33App')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('create', {
        url: '/create',
        templateUrl: 'app/create/create.html',
        controller: 'CreateCtrl',
        data: {
          requiresLogin: true
        }
      });
  }]);
