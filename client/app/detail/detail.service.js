'use strict';

angular.module('ben33App')
  .factory('detailService', ['$q', '$http', '$sce', 'Util', function ($q, $http, $sce, Util) {

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
          res.resolve(html);
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

    return {
      view: view
    };
    
  }])
;
