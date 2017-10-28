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
    function checkAspectRatio($win) {

      var aspect = $win.innerWidth / $win.innerHeight;

      return aspect <= 1 ? 'portrait' : 'landscape';
    }

    var images = {
      landscape: [
        'kylemoseby-cover-land-1.jpg', // Iceland
        'kylemoseby-cover-land-2.jpg' // Utah
      ],
      portrait: [
        'kylemoseby-cover-port-1.jpg', // Scotland
        'kylemoseby-cover-port-2.jpg', // Korea camera
        'kylemoseby-cover-port-3.jpg' // Georgetown
      ]
    };


    function setAspectRatio() {

      $scope.windAspectRatio = checkAspectRatio($window);

      function getRandomInt(length) {
        let max = Math.floor(length);
        return Math.floor(Math.random() * max); //The maximum is exclusive and the minimum is inclusive
      }

      let screenRatio = checkAspectRatio($window);

      $scope.coverImage = '/images/' + images[screenRatio][getRandomInt(images[screenRatio].length)];

      console.log($scope.coverImage);
    }


    $window.onresize = setAspectRatio;

    // INIT
    setAspectRatio();

  }]);
