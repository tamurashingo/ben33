'use strict';

angular.module('ben33App')
  .factory('User', ['$resource', function ($resource) {
    return $resource('/api/users/:id', {
      id: '@_id'
    },
    {
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      }
    });
  }]);
