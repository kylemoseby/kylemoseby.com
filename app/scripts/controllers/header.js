'use strict';

/**
 * @ngdoc function
 * @name kylemosebyDotcomApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the kylemosebyDotcomApp
 */
angular.module('kylemosebyDotcomApp')
  .controller('HeaderCtrl', ['$scope', '_kylemoseby_', function($scope, $mkm) {

    $scope.pages = Object.keys($mkm);

    $scope.$on('$routeChangeSuccess', function($event, $current) {

      $scope.currentPage = $current.originalPath.replace('/', '');

      if ($scope.currentPage === '/') {
        $scope.hideMenu = true;
      }
    });

    // $scope.showMenu = true;

  }]);
