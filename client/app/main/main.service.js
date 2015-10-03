'use strict';

angular.module('ben33App')
  .factory('mainService', ['$q', '$http', '$state', function ($q, $http, $state) {

    function view(pageNo) {
      var url = '/api/event/page/' + ((pageNo -1) * 10),
          res = $q.defer();

      $http.get(url)
        .success(function (data, status, headers, config) {
          res.resolve(data);
        })
        .error(function (data, status, headers, config) {
console.log("error");
console.log(data);
console.log(status);
console.log(headers);
console.log(config);
          if (status === 401) {
            $state.go('login');
            res.reject('セッションが切れました。<br />再ログインしてください。');
          }
          res.reject();
        });

      return res.promise;
    }

    return {
      view: view
    };
    
  }])
;
