'use strict';

angular.module('ben33App')
  .controller('DetailCtrl', ['$scope', '$stateParams', 'detailService', 'growl', function ($scope, $stateParams, detailService, growl) {
    var eventId = $stateParams.eventId;

    detailService.view(eventId)
      .then(function (data) {
        $scope.detail = data;
      })
      .catch(function () {
          $scope.detail = {};
          growl.addErrorMessage('<i class="fa fa-exclamation-triangle"></i> サーバエラー', {ttl: -1});
      });
    
  }]);

