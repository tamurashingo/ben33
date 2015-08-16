'use strict';

angular.module('ben33App')
  .controller('LoginCtrl', ['$scope', '$state', 'Auth', 'growl', function ($scope, $state, Auth, growl) {
    $scope.user = {};

    $scope.login = function () {
      Auth.login({
        userid: $scope.userid,
        password: $scope.password
      }).then(function () {
        growl.addSuccessMessage("Logged in", {ttl: 5000});
        $state.go('main');
      })
      .catch(function (error) {
        console.log(error);
        growl.addErrorMessage(error.message, {ttl: 10000});
      });
    };

  }]);
