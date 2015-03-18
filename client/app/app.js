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
           'markedProvider',
           'growlProvider',
           function ($stateProvider,
                     $urlRouterProvider,
                     $locationProvider,
                     markedProvider,
                     growlProvider) {
             
             $urlRouterProvider
               .otherwise('/');
             $.material.init();
             $locationProvider.html5Mode(true);
             
             markedProvider.setOptions({
               gfm: true,
               tables: true
             });

             growlProvider.onlyUniqueMessages(false);
             growlProvider.globalEnableHtml(true);

           }]);

