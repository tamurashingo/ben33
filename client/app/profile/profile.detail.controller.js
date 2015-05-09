'use strict';

angular.module('ben33App')
  .controller('ProfileDetailCtrl', ['$scope', '$stateParams', 'profileService', 'Auth', 'growl', function ($scope, $stateParams, profileService, Auth, growl) {

    var userid = $stateParams.userid;

    $scope.show = false;

    /**
     * profileを取得する
     */
    (function () {
      profileService.getUserProfile(userid)
        .then(function (user) {
          $scope.userid = user.userid;
          $scope.username = user.username;
          $scope.events = user.events;
        
          $scope.show = true;
        })
        .catch(function (err) {
          growl.addErrorMessage(err, {ttl: 5000});
        });
    })();
  }]);
