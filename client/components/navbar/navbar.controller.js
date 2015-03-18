'use strict';

angular.module('ben33App')
  .controller('NavbarCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.menu = [{
      'title': 'イベント一覧',
      'link': '/'
    },
    {
      'title': 'イベント作成',
      'link': '/create'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  }]);
