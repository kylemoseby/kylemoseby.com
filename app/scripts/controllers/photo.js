'use strict';

/**
 * @ngdoc function
 * @name kylemosebyDotcomApp.controller:PhotoCtrl
 * @description
 * # PhotoCtrl
 * Controller of the kylemosebyDotcomApp
 */
angular.module('kylemosebyDotcomApp')
  .controller('PhotoCtrl', ['$scope', function($scope) {

    $scope.photoalbums = [
      '72157642607219393',
      '72157642608822784',
      '72157641683609583'
    ];
    // var _http = $http({
    //   'method': 'GET',
    //   url: 'data/portfolio.json'
    // });

    // _http.then(function(response) {

    //   $scope.photos = response.data.photos;

    // });

  }]);
