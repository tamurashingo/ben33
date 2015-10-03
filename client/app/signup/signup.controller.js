'use strict';

angular.module('ben33App')
  .controller('SignupCtrl', ['$scope', '$timeout', '$location', 'signupService', 'Auth', 'growl', function ($scope, $timeout, $location, signupService, Auth, growl) {

    $scope.clicked = false;

    $scope.signup = function () {
      $scope.clicked = true;
      
      signupService.signup($scope.username, $scope.email, $scope.password)
        .then(function (message) {
          growl.addSuccessMessage('<i class="fa fa-smile-o fa-lg"></i> ' + message, {ttl: 5000});
          $timeout(function () {
            Auth.login({
              userid: $scope.email,
              password: $scope.password
            })
              .then(function () {
                growl.addWarnMessage('ログインしました', {ttl: 5000});
                $location.path('/');
              });
          }, 1500);
        })
        .catch(function (message) {
          growl.addErrorMessage('<i class="fa fa-meh-o fa-lg"></i> ' + message, {ttl: 10000});
          $scope.clicked = false;
        });
    };
    
  }]);
