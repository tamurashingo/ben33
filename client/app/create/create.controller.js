'use strict';

angular.module('ben33App')
  .controller('CreateCtrl', ['$scope', 'createService', 'growl', function ($scope, createService, growl) {
    
    /** 作成ボタンの状態 */
    $scope.registButton = true;
      
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


    /**
     * 登録に成功！
     * 登録成功のGrowlを出す。
     * ボタンを非活性にする。
     *
     */
    function success(msg) {
      $scope.registButton = false;
      msg = '<i class="fa fa-check"></i> ' + msg;
      growl.addSuccessMessage(msg, {ttl: 5000});
    }

    /**
     * 登録に失敗！orz
     * 登録失敗のGrowlを出す。
     * ボタンを活性化する。
     *
     */
    function error(msg) {
      $scope.registButton = true;
      msg = '<i class="fa fa-exclamation-triangle"></i> ' + msg;
      growl.addErrorMessage(msg, {ttl: -1});
    }


    /**
     * 下書きの情報を登録します！
     *
     */
    $scope.regist = function () {
      $scope.registButton = false;
      
      var params = createParam($scope);

      createService.postRegistData(params)
        .then(function (msg) {
          success(msg);
        })
        .catch(function (msg) {
          error(msg);
        });
    };

  }]);

