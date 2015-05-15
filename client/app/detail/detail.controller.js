'use strict';

angular.module('ben33App')
  .controller('DetailCtrl', ['$scope', '$stateParams', '$location', 'detailService', 'growl', function ($scope, $stateParams, $location, detailService, growl) {
    var eventId = $stateParams.eventId;

    function load() {
      detailService.view(eventId)
        .then(function (data) {
          $scope.detail = data.html;
          $scope.event = data.event;
        })
        .catch(function () {
          $scope.detail = {};
          growl.addErrorMessage('<i class="fa fa-exclamation-triangle"></i> サーバエラー', {ttl: -1});
        });
    }

    $scope.entry = function () {
      detailService.entry(eventId)
        .then(function (message) {
          load();
          growl.addSuccessMessage(message, {ttl: 5000});
        },
        function (message) {
          growl.addErrorMessage(message, {ttl: -1});
        });
    };

    $scope.cancel = function (userName) {
      detailService.cancel(eventId, userName)
        .then(function (message) {
          load();
          growl.addSuccessMessage(message, {ttl: 5000});
        },
        function (message) {
          growl.addErrorMessage(message, {ttl: -1});
        });
    };

    $scope.edit = function () {
      $location.path('/edit/' + eventId);
    };


    /*-
     * 初回読み込み
     */
    load();
    
  }]);

