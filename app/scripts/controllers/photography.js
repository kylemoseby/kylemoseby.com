'use strict';

/**
 * @ngdoc function
 * @name kylemosebyDotcomApp.controller:PhotographyCtrl
 * @description
 * # PhotographyCtrl
 * Controller of the kylemosebyDotcomApp
 */
angular.module('kylemosebyDotcomApp')
  .controller('PhotographyCtrl', ['_kylemoseby_', '$scope', function (_mkm_, $scope) {
      console.log($scope);
      $scope.portfolio = _mkm_.photography.flickrPortfolio;
    }]);
