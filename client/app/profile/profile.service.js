'use strict';

angular.module('ben33App')
  .factory('profileService', ['$q', '$http', function ($q, $http) {

    function getOwnProfile() {
      var res = $q.defer();
      
      $http.get('/api/user/profile')
        .success(function (data, status, headers, config) {
          if (angular.isDefined(data.result) && data.result) {
            res.resolve({
              userid: data.userid,
              username: data.username,
              email: data.email,
              provider: data.provider
            });
          }
          else {
            console.log(data);
            res.reject(data.message);
          }
        })
        .error(function (data, status, headers, config) {
          res.reject('サーバエラーが発生しました');
        });

      return res.promise;
    }

    function getUserProfile(userid) {
      var res = $q.defer();

      $http.get('/api/user/profile/' + userid)
        .success(function (data, status, headers, config) {
          if (angular.isDefined(data.result) && data.result) {
            res.resolve({
              userid: data.userid,
              username: data.username,
              events: data.events
            });

          }
          else {
            console.log(data);
            res.reject(data.message);
          }
        })
        .error(function (data, status, headers, config) {
          res.reject('サーバエラーが発生しました');
        });

      return res.promise;
    }

    function updateOwnProfile(username, password) {
      var res = $q.defer();
      $http.post('/api/user/profile',
                 {
                   username: username,
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
      getOwnProfile: getOwnProfile,
      getUserProfile: getUserProfile,
      updateOwnProfile: updateOwnProfile
    };
    
  }]);
