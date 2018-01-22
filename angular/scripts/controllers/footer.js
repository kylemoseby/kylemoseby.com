'use strict';

/**
 * @ngdoc function
 * @name kylemosebyDotcomApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the kylemosebyDotcomApp
 */
angular.module('kylemosebyDotcomApp')
  .controller('FooterCtrl', ['$scope', '_kylemoseby_', function($scope, $mkm) {
    $scope.social = $mkm.contact.social;
  }]);
