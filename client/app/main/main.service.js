'use strict';

angular.module('ben33App')
  .factory('mainService', ['$q', '$http', function ($q, $http) {

    function view(pageNo) {
      var url = '/api/event/page/' + ((pageNo -1) * 10),
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

    return {
      view: view
    };
    
  }])
;
