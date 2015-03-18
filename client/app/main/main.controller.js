'use strict';

angular.module('ben33App')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

  }]);
