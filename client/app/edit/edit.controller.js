'use strict';

angular.module('ben33App')
  .controller('EditCtrl', ['$scope', 'createService', 'editService', '$stateParams', 'growl', function ($scope, createService, editService, $stateParams, growl) {

    var eventId = $stateParams.eventId;

    /*-
     * データ取得
     */
    (function () {
      $scope.eventName = '';
      $scope.startDate = '';
      $scope.endDate = '';
      $scope.venue = '';
      $scope.mgr = '';
      $scope.abstraction = '';
      $scope.desc = '';
      editService.detail(eventId)
        .then(function (data) {
          if (data.result) {
            $scope.eventName = data.data.eventName;
            $scope.startDate = data.data.startDate;
            $scope.endDate = data.data.endDate;
            $scope.venue = data.data.venue;
            $scope.mgr = data.data.mgrName;
            $scope.abstraction = data.data.abstraction;
            $scope.desc = data.data.comment;
          }
          else {
            growl.addErrorMessage('<i class="fa fa-exclamation-triangle"></i> ' + data.message, {ttl: 5000});
          }
        })
        .catch(function () {
          growl.addErrorMessage('<i class="fa fa-exclamation-triangle"></i> サーバエラー', {ttl: -1});      
        });
    })();


    function createParam(scope) {
      var param = {
        eventName: scope.eventName,
        startDate: scope.startDate,
        endDate: scope.endDate,
        venue: scope.venue,
        mgrName: scope.mgr,
        abstraction: scope.abstraction,
        desc: scope.desc
      };
      return param;
    };

    function concat(scope) {
      var markdown = createService.concatEvent(createParam(scope));
      return markdown;
    }

    /*-
     * 1文字打つごとにMarkdownからHTMLに変換する。
     * CPUさん頑張ってください！
     */
    $scope.$watchGroup([
      'eventName',
      'startDate',
      'endDate',
      'venue',
      'mgr',
      'abstraction',
      'desc'],
      function(oldVal, newVal) {
        var markdown = concat($scope);
        $scope.preview = createService.convertMarkdown(markdown);
      });


    $scope.edit = function () {
      $scope.registButton = false;
      
      var params = createParam($scope);

      editService.putEditData(eventId, params)
        .then(function (msg) {
          msg = '<i class="fa fa-check"></i> ' + msg;
          growl.addSuccessMessage(msg, {ttl: 5000});
        })
        .catch(function (msg) {
          msg = '<i class="fa fa-exclamation-triangle"></i> ' + msg;
          growl.addErrorMessage(msg, {ttl: -1});
        });
    };
    

  }]);
