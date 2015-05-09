'use strict';

angular.module('ben33App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ui.router',
  'ui.bootstrap',
  'hc.marked',
  'angular-growl'
])
  .config(['$stateProvider',
           '$urlRouterProvider',
           '$locationProvider',
           '$httpProvider',
           'markedProvider',
           'growlProvider',
           function ($stateProvider,
                     $urlRouterProvider,
                     $locationProvider,
                     $httpProvider,
                     markedProvider,
                     growlProvider) {
             
             $urlRouterProvider
               .otherwise('/');
             $.material.init();
             $locationProvider.html5Mode(true);
             $httpProvider.interceptros.push('authInterceptor');
             
             markedProvider.setOptions({
               gfm: true,
               tables: true
             });

             growlProvider.onlyUniqueMessages(false);
             growlProvider.globalEnableHtml(true);

           }])
  .factory('authInterceptor',
           ['$rootScope',
            '$q',
            '$cookieStore',
            '$location',
            function ($rootScope, $q, $cookieStore, $location) {
              return {
                // Add authorization token to headers
                request: function (config) {
                  config.headers = config.headers || {};
                  if ($cookieStore.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                  }
                  return config;
                },

                // Intercept 401s and redirect you to login
                responseError: function (response) {
                  if (response.status == 401) {
                    $location.path('/login');
                    // remove any stale tokens
                    $cookieStore.remove('token');
                    return $q.reject(response);
                  }
                  else {
                    return $q.reject(response);
                  }
                }
              };
            }])
  .run(['$rootScope',
        '$location',
        'Auth',
        function ($rootScope,
                  $location,
                  Auth) {
          // Redirect to login if route requires auth and you're not logged in
          $rootScope.$on('$stateChangeStart', function (event, next) {
            Auth.isLoggedInAsync(function (loggedIn) {
              if (next.authenticate && !loggedIn) {
                $location.path('/login');
              }
            });
          });
        }]);


