'use strict';

angular.module('ben33App')
  .factory('detailService', ['$rootScope', '$q', '$http', '$sce', '$modal', 'growl', 'Util', function ($rootScope, $q, $http, $sce, $modal, growl, Util) {

    function entryEvent(eventId, userId, comment) {
      var res = $q.defer();
      $http.post('/api/event/entry', {
        eventid: eventId,
        userid: userId,
        comment: comment
      })
        .success(function (data, status, headers, config) {
          res.resolve(data);
        })
        .error(function (data, status, headers, config) {
          res.reject();
        });

      return res.promise;
    }

    function cancelEvent(eventId, userId, comment) {
      var res = $q.defer();
      $http.post('/api/event/cancel', {
        eventid: eventId,
        userid: userId,
        comment: comment
      })
        .success(function (data, status, headers, config) {
          res.resolve(data);
        })
        .error(function (data, status, headers, config) {
          res.reject();
        });

      return res.promise;
    }

    function detail(eventId) {
      var url = '/api/event/desc/' + eventId,
          res = $q.defer();

      $http.get(url)
        .success(function (data, status, headers, config) {
          if (angular.isDefined(data.result) && data.result) {
            res.resolve(data.event);
          }
          else {
            res.reject(data.message);
          }
        })
        .error(function (data, status, headers, config) {
          res.reject('サーバエラーです');
        });

      return res.promise;
    }

    function view(eventId) {
      var res = $q.defer();
      
      detail(eventId)
        .then(function (event) {
          console.log('view');
          console.log(event);
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
      if (event.mgrName) {
        str = str + '\n'
          + '#### <i class="fa fa-user"></i> '
          + event.mgrName;
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


    return {
      view: view,
      entryEvent: entryEvent,
      cancelEvent: cancelEvent
    };
    
  }])
;
