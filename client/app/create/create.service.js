'use strict';

angular.module('ben33App')
  .factory('createService', ['$q', '$http','$sce', 'Util', function ($q, $http, $sce, Util) {

    /**
     * サーバに作成のリクエストを飛ばす。
     *
     */
    function postRegistData (data) {
      var res = $q.defer();
      $http.post('/api/event', {createParam:data}).
        success(function (data, status, headers, config) {

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
        }).
        error(function (data, status, headers, config) {
          res.reject('サーバエラーです。<br />管理者に連絡してください。');
        });

      return res.promise;
    };


    /**
     * markdownからhtmlに変換します。
     *
     */
    var convertMarkdown = function (raw) {
      return Util.md2html(raw);
    };


    /**
     * 下書きの各情報をもとにMarkdown形式のデータを生成します。
     *
     */
    var concatEvent = function (desc) {
      var str = '';
      // イベント名
      if (desc.eventName) {
        str = '#' + desc.eventName;
      }
      
      // イベント概要
      if (desc.abstraction) {
        str = str + '\n'
          + desc.abstraction;
      }
      
      // ハイフネーション
      str = str + '\n'
        + '- - -';

      
      // 開始日時
      if (desc.startDate) {
        str = str + '\n'
          + '#### <i class="fa fa-calendar"></i> '
          + desc.startDate;
      }
      // 終了日時
      if (desc.endDate) {
        if (!desc.startDate) {
          str = str + '\n'
            + '#### <i class="fa fa-calendar"></i> ';
        }
        str = str + ' ~ '
          + desc.endDate;
      }
      // 場所
      if (desc.venue) {
        str = str + '\n'
          + '#### <i class="fa fa-map-marker"></i> '
          + desc.venue;
      }
      // イベント管理者
      if (desc.mgr) {
        str = str + '\n'
          + '#### <i class="fa fa-user"></i> '
          + desc.mgr;
      }
      
      
      // ハイフネーション
      str = str + '\n'
        + '- - -';
      
      // イベント詳細
      if (desc.desc) {
        str = str + '\n'
          + desc.desc;
      }
      return str;
    };


    /**
     * 外部公開関数です。
     *
     */
    return {
      postRegistData: postRegistData,
      concatEvent: concatEvent,
      convertMarkdown: convertMarkdown
    };
    
  }])
;
