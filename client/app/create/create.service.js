'use strict';

angular.module('ben33App')
  .factory('createService', ['$q', '$http','$sce', function ($q, $http, $sce) {

/**
 *
 * # Event Name
 * ### <i class="fa fa-calendar"></i> 2015/03/15 19:00 ~ 2015/03/15 21:00  
 * ### <i class="fa fa-map-marker"></i> 会議室101
 * ### <i class="fa fa-user"></i> 管理者
 * - - -
 *
 *
 */

  /**
   *
   *
   */
  var convertMarkdown = function (raw) {
    var res = $q.defer();
    $http.post('/api/event/preview', {md: raw})
      .then(function (data) {
        res.resolve($sce.trustAsHtml(data.data.html));
      });

    return res.promise;
  };


  /**
   *
   *
   */
  var concatEvent = function (desc) {
    var str = '';
    // イベント名
    if (desc.eventName) {
      str = '#' + desc.eventName;
    }
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

    // イベント概要
    if (desc.abstraction) {
      str = str + '\n'
                + desc.abstraction;
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

  return {
    concatEvent: concatEvent,
    convertMarkdown: convertMarkdown
  };

  }])
;

