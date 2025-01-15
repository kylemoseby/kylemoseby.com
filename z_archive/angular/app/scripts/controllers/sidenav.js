'use strict';

/**
 * @ngdoc function
 * @name kylemosebyDotcomApp.controller:SidenavCtrl
 * @description
 * # SidenavCtrl
 * Controller of the kylemosebyDotcomApp
 */
angular.module('kylemosebyDotcomApp')
  .controller('SidenavCtrl', ['$scope', '$timeout', '$mdSidenav', function($scope, $timeout, $mdSidenav) {

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }

    console.log('fired');

    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

  }]);
