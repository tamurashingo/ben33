'use strict';

angular.module('ben33App')
  .factory('editService', ['$q', '$http', function ($q, $http) {

    /**
     * サーバからデータベースの値を取得する
     *
     */
    function detail(eventId) {
      var url = '/api/event/desc/' + eventId,
          res = $q.defer();
      $http.get(url)
        .success(function (data, status, headers, config) {
          if (angular.isDefined(data.result) && data.result) {
            res.resolve({
              result: true,
              data: data.event
            });
          }
          else {
            res.resolve({
              result: false,
              message: data.message,
              desc: data.desc
            });
          }
          res.resolve(data);
        })
        .error(function (data, status, headers, config) {
          res.reject();
        });

      return res.promise;
    }

    /**
     * サーバに更新のリクエストを飛ばす。
     *
     */
    function putEditData (eventId, data) {
      var res = $q.defer();
      $http.put('/api/event/edit', {eventId: eventId, editParam: data}).
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
     * 外部公開関数です。
     *
     */
    return {
      detail: detail,
      putEditData: putEditData
    };
    
  }])
;
