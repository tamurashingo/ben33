'use strict';

angular.module('ben33App')
  .controller('DetailCtrl', ['$scope', '$stateParams', '$location', 'detailService', 'Auth', 'growl', function ($scope, $stateParams, $location, detailService, Auth, growl) {
    var eventId = $stateParams.eventId;

    /** イベント詳細 */
    $scope.detail = '';
    /** エントリー済みかどうか */
    $scope.isentried = false;
    /** 修正可能かどうか */
    $scope.iseditable = false;
    
    /**
     * 初期画面読み込み
     *
     */
    $scope.load = function () {
      console.log('load start');
      detailService.view(eventId)
        .then(function (data) {
          var userid = Auth.getUserid();
          $scope.detail = data.html;
          $scope.event = data.event;
          console.log('load');
          console.log(data.event);

          /*-
           * エントリー済みのチェック
           */
          angular.forEach(data.event.attends, function (elm, idx) {
            console.log('elm:' + elm.userid);
            console.log('userid:' + userid);
            if (elm.userid === userid) {
              $scope.isentried = true;
            }
          });

          /*-
           * 修正可能のチェック
           */
          $scope.iseditable = Auth.isLoggedIn() && Auth.getUserid() === data.event.createdBy._id;
          console.log('owner');
          console.log(data.event.createdBy._id);
        })
        .catch(function () {
          $scope.detail = '';
          growl.addErrorMessage('<i class="fa fa-exclamation-triangle"></i> サーバエラー', {ttl: -1});
        });
    };

    $scope.entry = function () {
      $location.path('/detail/entry/' + eventId);
    };

    $scope.cancel = function () {
      $location.path('/detail/cancel/' + eventId);
    };

    $scope.edit = function () {
      $location.path('/edit/' + eventId);
    };

    $scope.back = function (eventId) {
      $location.path('/detail/' + eventId);
    };

    /*-
     * 初回読み込み
     */
    $scope.load();
    
  }]);

