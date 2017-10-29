'use strict';

/**
 * @ngdoc function
 * @name kylemosebyDotcomApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the kylemosebyDotcomApp
 */
angular.module('kylemosebyDotcomApp')
  .controller('HeaderCtrl', ['$scope', '$window', '_kylemoseby_', function($scope, $window, $mkm) {

    $scope.pages = Object.keys($mkm);

    // Update current page style
    $scope.$on('$routeChangeSuccess', function($event, $current) {

      $scope.currentPage = $current.originalPath.replace('/', '');

      if ($scope.currentPage === '/') {
        $scope.hideMenu = true;
      }
    });
  }]);
