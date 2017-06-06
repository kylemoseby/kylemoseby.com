'use strict';

/**
 * @ngdoc function
 * @name kylemosebyDotcomApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kylemosebyDotcomApp
 */
angular.module('kylemosebyDotcomApp')
  .controller('MainCtrl', ['$scope', '$window', '$anchorScroll', '$location', function($scope, $window, $anchorScroll, $location) {

    // BACKGROUND IMAGE ASPECT RATIO STUFF
    function checkAspectRatio($win) {

      var aspect = $win.innerWidth / $win.innerHeight;

      return aspect <= 1 ? 'portrait' : 'landscape';
    }


    function setAspectRatio() {

      $scope.windAspectRatio = checkAspectRatio($window);

    }
    // // BACKGROUND IMAGE ASPECT RATIO STUFF



    $window.onresize = setAspectRatio;

    // ANCHOR SCROLL STUFF
    $scope.gotoAnchor = function(id) {

      $location.hash(id);

      $anchorScroll();
    };

    // // ANCHOR SCROLL STUFF



    // INIT
    setAspectRatio();

  }]);
