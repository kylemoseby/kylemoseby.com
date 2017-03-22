'use strict';

/**
 * @ngdoc function
 * @name kylemosebyDotcomApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kylemosebyDotcomApp
 */
angular.module('kylemosebyDotcomApp')
  .controller('MainCtrl', ['$scope', '$window', function($scope, $window) {


    function checkAspectRatio($win) {

      var aspect = $win.innerWidth / $win.innerHeight;

      return aspect <= 1 ? 'portrait' : 'landscape';
    }


    function setAspectRatio() {

      $scope.windAspectRatio = checkAspectRatio($window);

    }



    $window.onresize = setAspectRatio;


    // INIT
    setAspectRatio();

  }]);
