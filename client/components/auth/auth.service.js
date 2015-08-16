'use strict';

angular.module('ben33App')
  .factory('Auth', ['$http', '$q', 'store', 'jwtHelper', function ($http, $q, store, jwtHelper) {
    return {

      /**
       * Authenticate user and save token
       *
       * @param {Object} user - login info
       * @param {Function} callback - optional
       * @return {Promise}
       */
      login: function (user, callback) {
        var deferred = $q.defer();
        $http.post('/auth', {
          userid: user.userid,
          password: user.password
        })
        .success(function (data) {
          store.set('jwt', data.token);
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param {Function}
       */
      logout: function () {
        store.remove('jwt');
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function () {
        if (store.get('jwt')) {
          return jwtHelper.decodeToken(stoe.get('jwt')).username;
        }
        else {
          return "no login";
        }
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function () {
        return store.get('jwt') && !jwtHelper.isTokenExpired(store.get('jwt'));
      },

      /**
       * Get auth token
       */
      getToken: function () {
        return store.get('jwt');
      }
    };
  }]);
