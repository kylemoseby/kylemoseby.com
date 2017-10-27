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
  .module('kylemosebyDotcomApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/code', {
        templateUrl: 'views/code.html',
        controller: 'CodeCtrl',
        controllerAs: 'code'
      })
      .when('/cv', {
        templateUrl: 'views/cv.html',
        controller: 'CvCtrl',
        controllerAs: 'cv'
      })
      .when('/photography', {
        templateUrl: 'views/photography.html',
        controller: 'PhotographyCtrl',
        controllerAs: 'photography'
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

  }])
  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
  }])
  .config(['$sceDelegateProvider', function($sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://api.flickr.com/services/rest/**'
    ]);
  }]);
