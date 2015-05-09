'use strict';

angular.module('ben33App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ui.router',
  'ui.bootstrap',
  'hc.marked',
  'angular-growl',
  'angular-jwt',
  'angular-storage'
])
  .config(['$stateProvider',
           '$urlRouterProvider',
           '$locationProvider',
           '$httpProvider',
           'markedProvider',
           'growlProvider',
           'jwtInterceptorProvider',
           function ($stateProvider,
                     $urlRouterProvider,
                     $locationProvider,
                     $httpProvider,
                     markedProvider,
                     growlProvider,
                     jwtInterceptorProvider) {
             
             $urlRouterProvider
               .otherwise('/main/');
             $.material.init();
             $locationProvider.html5Mode(true);
             
             markedProvider.setOptions({
               gfm: true,
               tables: true
             });

             growlProvider.onlyUniqueMessages(false);
             growlProvider.globalEnableHtml(true);

             // JWT interceptor will take care of sending the JWT in every request
             jwtInterceptorProvider.tokenGetter = ['store', function (store) {
               return store.get('jwt');
             }];

             $httpProvider.interceptors.push('jwtInterceptor');

           }])
  .run(['$rootScope',
        '$state',
        'Auth',
        function ($rootScope,
                  $state,
                  Auth) {

          // Redirect to login if route requires auth and you're not logged in
          $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            console.log('next:' + toState.url);
            console.log('param');
            console.log(toParams);
            if (toState.data && toState.data.requiresLogin) {
              if (!Auth.isLoggedIn()) {
                $rootScope.returnToState = toState.url;
                $rootScope.returnToStateParams = toParams;
                event.preventDefault();
                $state.go('login');
              }
            }
          });

        }]);



