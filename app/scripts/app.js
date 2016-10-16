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
    'mkm.codepen',
    'mkm.flickr',
    'mkm.seaCrimeData',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/photo', {
        templateUrl: 'views/photo.html',
        controller: 'PhotoCtrl',
        controllerAs: 'Photo'
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
      .when('/code', {
        templateUrl: 'views/code.html',
        controller: 'CodeCtrl',
        controllerAs: 'code'
      })
      .otherwise({
        redirectTo: '/home'
      });
  })
  .factory('_kylemoseby_', [function() {
    return {
      code: {
        'title': 'Code'
      },
      photo: {
        'title': 'Photography'
      },
      contact: {
        'title': 'Contact'
      },
    };
  }])
  .controller('mainNav', ['$scope', '_kylemoseby_', '$location', function($scope, km, $location) {

    $scope.pages = km;

    $scope.hideNav = false;

    $scope.menuClick = function(newPath) {

      $location.path('/' + newPath);

    };

    $scope.$on('$locationChangeStart', function(event, newUrl) {

      var $$path = newUrl.slice(newUrl.indexOf('#/') + 2, newUrl.length);

      if (km[$$path]) {

        $scope.hideNav = km[$$path].hideNav;

      } else if ($$path === 'home') {

        $scope.hideNav = true;
      }
    });


  }]);
