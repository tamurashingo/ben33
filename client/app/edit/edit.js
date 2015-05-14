'use strict';

angular.module('ben33App')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('edit', {
        url: '/edit/:eventId',
        templateUrl: 'app/edit/edit.html',
        controller: 'EditCtrl'
      });
  }]);
