'use strict';

angular.module('ben33App')
  .controller('CreateCtrl', ['$scope', '$http', '$interval', '$sce', function($scope, $http, $interval, $sce) {

    $interval(function () {
      $http.post('/api/event/preview', {md: $scope.desc}).then(function(data) {
        $scope.preview = $sce.trustAsHtml(data.data.html);
      });
    }, 500);

  }]);

