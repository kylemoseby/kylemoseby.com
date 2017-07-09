'use strict';

/**
 * @ngdoc function
 * @name kylemosebyDotcomApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the kylemosebyDotcomApp
 */
angular.module('kylemosebyDotcomApp') // 'seattleDataGov',
  .controller('CodeCtrl', ['$scope', '_kylemoseby_', function($scope, _mkm_) {

    $scope.mkm = _mkm_;

    $scope.albumID = '72157633992047331';

    $scope.flickrID = '91631856@N00';

    $scope.git = {};
    $scope.git.username = 'kylemoseby';

  }]);
