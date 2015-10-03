'use strict';

angular.module('ben33App')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('profileedit', {
        url: '/profile/edit',
        templateUrl: 'app/profile/edit.html',
        controller: 'ProfileEditCtrl',
        data: {
          requiresLogin: true
        }
      })
      .state('profiledetail', {
        url: '/profile/detail/:userid',
        templateUrl: 'app/profile/detail.html',
        controller: 'ProfileDetailCtrl'
      });
  }]);
