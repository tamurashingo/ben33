'use strict';

angular.module('ben33App')
  .factory('detailService', ['$rootScope', '$q', '$http', '$sce', '$modal', 'growl', 'Util', function ($rootScope, $q, $http, $sce, $modal, growl, Util) {

    function entryEvent(eventId, userName, comment) {
      var res = $q.defer();
      console.log(eventId);
      console.log(userName);
      console.log(comment);
      $http.post('/api/event/entry', {
        id: eventId,
        userName: userName,
        comment: comment
      })
        .success(function (data, status, headers, config) {
          if (angular.isDefined(data.result) && data.result) {
            res.resolve(data.message);
          }
          else if (angular.isUndefined(data.result)) {
            res.reject('サーバエラーです。<br />管理者に連絡してください。');
          }
          else if (data.result == false) {
            res.reject(data.message);
          }
          // not reached
          res.reject('FATAL ERROR!!');
        })
        .error(function (data, status, headers, config) {
          res.reject('サーバエラーです。<br />管理者に連絡してください。');
        });

      return res.promise;
    }

    function detail(eventId) {
      var url = '/api/event/desc/' + eventId,
          res = $q.defer();

      $http.get(url)
        .success(function (data, status, headers, config) {
          res.resolve(data);
        })
        .error(function (data, status, headers, config) {
          res.reject();
        });

      return res.promise;
    }

    function view(eventId) {
      var res = $q.defer();
      
      detail(eventId)
        .then(function (event) {
          var html = Util.md2html(createMarkdown(event));
          res.resolve({html: html,
                       event: event});
        });

      return res.promise;
    }


    /**
     * ダウンロードしたイベント情報を元にMarkdown形式のデータを生成します。
     *
     */
    function createMarkdown(event) {
      var str = '';

      str = 'event id:' + event._id;
      str = str + '  \n';
      
      // イベント名
      str = str + '# ' + event.eventName;

      // イベント概要
      if (event.abstraction) {
        str = str + '\n'
          + event.abstraction;
      }

      // ハイフネーション
      str = str + '\n'
        + '- - -';

      // 開始日時
      if (event.startDate) {
        str = str + '\n'
          + '### <i class="fa fa-calendar"></i> '
          + event.startDate;
      }
      // 終了日時
      if (event.endDate) {
        if (!event.startDate) {
          str = str + '\n'
            + '### <i class="fa fa-calendar"></i> ';
        }
        str = str + ' ~ '
          + event.endDate;
      }
      // 場所
      if (event.venue) {
        str = str + '\n'
          + '### <i class="fa fa-map-marker"></i> '
          + event.venue;
      }
      // イベント管理者
      if (event.userName) {
        str = str + '\n'
          + '#### <i class="fa fa-user"></i> '
          + event.userName;
      }
      
      
      // ハイフネーション
      str = str + '\n'
        + '- - -';
      
      // イベント詳細
      if (event.comment) {
        str = str + '\n'
          + event.comment;
      }
      return str;
    }


    function openEntryModal(id) {
      var scope = $rootScope.$new(),
          modal;

      scope.userName = "";
      scope.comment = "";
      
      scope.entry = function () {
        modal.close();
        entryEvent(id, scope.userName, scope.comment)
          .then(function (message) {
            growl.addSuccessMessage(message, {ttl: 5000});
          },
          function (message) {
            growl.addErrorMessage(message, {ttl: -1});
          });
      };
      scope.dismiss = function () {
        modal.close();
      };
      modal = $modal.open({
        templateUrl: 'entry.html',
        backdrop: 'static',
        scope: scope
      });
    }

    return {
      view: view,
      entry: openEntryModal
    };
    
  }])
;
