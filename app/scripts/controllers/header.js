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
  }]);
