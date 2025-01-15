'use strict';

/**
 * @ngdoc function
 * @name kylemosebyDotcomApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kylemosebyDotcomApp
 */
angular.module('kylemosebyDotcomApp')
  .controller('MainCtrl', ['$scope', '$window', '_kylemoseby_', function($scope, $window, _mkm_) {

    $scope._mkm_ = _mkm_;

    // BACKGROUND IMAGE ASPECT RATIO STUFF
    function checkAspectRatio() {

      var aspect = $window.innerWidth / $window.innerHeight;

      return aspect <= 1 ? 'portrait' : 'landscape';
    }

    function getRandomInt(length) {

      var max = Math.floor(length);

      return Math.floor(Math.random() * max); //The maximum is exclusive and the minimum is inclusive
    }

    var images = {
      landscape: [
        'land-1', // Iceland
        'land-2' // Utah
      ],
      portrait: [
        'land-2' // Utah
        // 'port-1', // Scotland
        // 'port-2', // Korea camera
        // 'port-3' // Georgetown
      ]
    };

    $scope.windAspectRatio = checkAspectRatio($window);

    var screenRatio = checkAspectRatio($window);

    $scope.coverImage = images[screenRatio][getRandomInt(images[screenRatio].length)];

    angular.element($window).bind('resize', function() {

      $scope.windAspectRatio = checkAspectRatio($window);

      var screenRatio = checkAspectRatio($window);

      $scope.coverImage = images[screenRatio][getRandomInt(images[screenRatio].length)];

      $scope.$apply();

    });

  }]);
