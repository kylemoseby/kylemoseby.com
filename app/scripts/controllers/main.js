'use strict';

/**
 * @ngdoc function
 * @name kylemosebyDotcomApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kylemosebyDotcomApp
 */
angular.module('kylemosebyDotcomApp')
  .controller('MainCtrl', ['$scope', '_kylemoseby_', function($scope, _mkm_) {
    $scope.mkm = _mkm_;
    console.log($scope.mkm);

  }]);
