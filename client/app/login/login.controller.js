'use strict';

angular.module('ben33App')
  .controller('LoginCtrl', ['$scope', 'Auth', function ($scope, Auth) {

    $scope.login = function () {
      Auth.login({
        userId: $scope.userid,
        password: $scope.password
      }).then(function () {
      });
    };

  }]);
