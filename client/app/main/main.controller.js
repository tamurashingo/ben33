'use strict';

angular.module('ben33App')
  .controller('MainCtrl', ['$scope', '$location', '$stateParams', 'mainService', 'growl', function ($scope, $location, $stateParams, mainService, growl) {
    console.log('main.controller.js');
    console.log($stateParams);
    $scope.allEvents = [];

    /** ページは1から始める */
    $scope.pageNo = 1;
    /** 次ボタンが押せるかどうか */
    $scope.nextButton = false;
    /** 戻るボタンが押せるかどうか */
    $scope.prevButton = false;

    (function () {
      var pageNo = parseInt($stateParams.pageNo, 10);
      // TODO: 将来的には Number.isNaN に置き換える
      if (isNaN(pageNo)) {
        $location.url('/main/1');
      }
      $scope.pageNo = pageNo;
    })();
    

    $scope.indexview = function () {
      
      mainService.view($scope.pageNo)
        .then(function (data) {
          $scope.allEvents = data.result;
          $scope.prevButton = data.prev;
          $scope.nextButton = data.next;
        })
        .catch(function (msg) {
          if (!msg) {
            msg = '<i class="fa fa-exclamation-triangle"></i> サーバエラー';
          }
          growl.addErrorMessage(msg, {ttl: 5000});
        });
    };

    $scope.indexview();

    $scope.prev = function () {
      if (!$scope.prevButton) {
        return ;
      }

      $scope.pageNo = $scope.pageNo - 1;
      $location.path('/main/' + $scope.pageNo);
      $scope.indexview();
    };

    $scope.next = function () {
      if (!$scope.nextButton) {
        return ;
      }

      $scope.pageNo = $scope.pageNo + 1;
      $location.path('/main/' + $scope.pageNo);
      $scope.indexview();
    };
  }]);
