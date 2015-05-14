'use strict';

angular.module('ben33App')
  .controller('DetailEntryCtrl', ['$scope', '$controller', '$stateParams', '$location', '$timeout', 'detailService', 'Auth', 'growl', function ($scope, $controller, $stateParams, $location, $timeout, detailService, Auth, growl) {
    var eventId = $stateParams.eventId;

    $scope.comment = '';

    /* コントローラの継承 */
    angular.extend(this, $controller('DetailCtrl', {$scope: $scope}));

    $scope.entry = function () {
      console.log('ok');
      
      var userid = Auth.getUserid();
      console.log('userid:' + userid);
      detailService.entryEvent(eventId, userid, $scope.comment)
        .then(function (data, status, headers, config) {
          console.log('結果が返ってきました');
          console.log(data);
          if (angular.isDefined(data.result) && data.result) {
            // ok
            growl.addSuccessMessage(data.message, {ttl: 5000});
            $timeout(function () {
              $location.path('/detail/' + eventId);
            }, 1500);
          }
          else {
            growl.addErrorMessage(data.message, {ttl: 5000});
          }
        })
        .catch(function (data, status, headers, config) {
          growl.addErrorMessage('サーバエラーが発生しました', {ttl: -1});
        });
    };

    $scope.load();
    
  }]);



