'use strict';

angular.module('ben33App')
  .controller('LoginCtrl', ['$scope', '$location', 'Auth', 'growl', function ($scope, $location, Auth, growl) {

    $scope.login = function () {
      Auth.login({
        userid: $scope.userid,
        password: $scope.password
      }).then(function () {
        growl.addWarnMessage("ログインしました", {ttl: 5000});

//        サンプル
//        if ($scope.returnToState === '/:pageNo') {
//          $location.path('/' + $scope.returnToStateParams.pageNo);
//        }
        
        if ($scope.returnToState === '/create') {
          $location.path('/create');
        }
        else if ($scope.returnToState.startsWith('/detail/entry/')) {
          $location.path('/detail/entry/' + $scope.returnToStateParams.eventId);
        }
        else {
          $location.path('/');
        }
      })
      .catch(function (error) {
        console.log(error);
        growl.addErrorMessage(error.message, {ttl: 10000});
      });
    };

  }]);
