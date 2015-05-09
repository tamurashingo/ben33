'use strict';

angular.module('ben33App')
  .controller('ProfileEditCtrl', ['$scope', 'profileService', 'Auth', 'growl', function ($scope, profileService, Auth, growl) {

    $scope.show = false;
    $scope.clicked = false;

    /**
     * profileを取得する
     */
    (function () {
      profileService.getOwnProfile()
        .then(function (user) {
          $scope.userid = user.userid;
          $scope.username = user.username;
          $scope.email = user.email;
          $scope.provider = user.provider;
        
          $scope.show = true;
        })
        .catch(function (err) {
          growl.addErrorMessage(err, {ttl: 5000});
        });
    })();

    /**
     * profileを更新する
     */
    $scope.update = function () {
      $scope.clicked = true;
      profileService.updateOwnProfile($scope.username, $scope.password)
        .then(function (message) {
          Auth.update();
          growl.addSuccessMessage(message, {ttl: 5000});
        })
        .catch(function (err) {
          growl.addErrorMessage(err, {ttl: 5000});
          $scope.clicked = false;
        });
    };
    
  }]);
