'use strict';

/**
 * @ngdoc overview
 * @name kylemosebyDotcomApp
 * @description
 * # kylemosebyDotcomApp
 *
 * Main module of the application.
 */
angular
  .module('kylemosebyDotcomApp', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .when('/contact_success', {
        templateUrl: 'views/contact_success.html',
        controller: 'ContactSuccessCtrl',
        controllerAs: 'contactsuccessctrl'
      })
      .otherwise({
        redirectTo: '/404',
        templateUrl: 'views/404.html',
        controller: '404',
        controllerAs: '404'
      });
  })
  .controller('404', [function() {

  }]);
