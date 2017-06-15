'use strict';

/**
 * @ngdoc function
 * @name kylemosebyDotcomApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the kylemosebyDotcomApp
 */
angular.module('kylemosebyDotcomApp') // 'seattleDataGov',
  .controller('CodeCtrl', ['$scope', '_kylemoseby_', 'seattleDataGov',  function($scope, _mkm_, seattleDataGov) {

    $scope.mkm = _mkm_;

    $scope.albumID = '72157633992047331';

    $scope.flickrID = '91631856@N00';

    $scope.git = {};
    $scope.git.username = 'kylemoseby';

    /*
      SEATTLE CRIME MAP STUFF
    */
    $scope.crimeData = seattleDataGov;

    $scope.crimeData.promise
      .then(function(data) {

        $scope.$index = data.index;

        $scope.$reports = data.incidents;

      });
  }]);
