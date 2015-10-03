'use strict';

angular.module('ben33App')
  .controller('NavbarCtrl', ['$scope', '$location', 'Auth', 'growl', function ($scope, $location, Auth, growl) {
    $scope.menu = [{
      'title': 'イベント一覧',
      'link': '/main/'
    },
    {
      'title': 'イベント作成',
      'link': '/create'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return $location.path().indexOf(route) === 0;
    };

    $scope.isLoggedIn = function () {
      return Auth.isLoggedIn();
    };

    $scope.logout = function () {
      Auth.logout();
      growl.addWarnMessage("ログアウトしました", {ttl: 5000});
      $location.path('/');
    };

    $scope.currentUser = function () {
      return Auth.getCurrentUser();
    };

  }]);
