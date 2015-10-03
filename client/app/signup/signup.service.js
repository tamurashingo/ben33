'use strict';

angular.module('ben33App')
  .factory('signupService', ['$q', '$http', function ($q, $http) {

    function signup (username, email, password) {
      var res = $q.defer();
      $http.post('/api/user/signup',
                 {
                   username: username,
                   email: email,
                   password: password})
        .success(function (data, status, headers, config) {
          if (angular.isDefined(data.result) && data.result) {
            res.resolve(data.message);
          }
          else {
            res.reject(data.message);
          }
        })
        .error(function (data, status, headers, config) {
          res.reject('サーバエラーが発生しました');
        });

      return res.promise;
    }

    return {
      signup: signup
    };
    
  }]);
