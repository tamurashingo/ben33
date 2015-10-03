'use strict';

angular.module('ben33App')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/signup/signup.html',
        controller: 'SignupCtrl'
      });
  }]);
