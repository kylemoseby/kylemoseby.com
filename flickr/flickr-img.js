'use strict';

/**
 * @ngdoc directive
 * @name mkm.flickr.directive:flickImg
 * @description
 * # flickImg
 */
angular.module('mkm.flickr')
  .directive('flickrImg', [function() {
    return {
      templateUrl: function(element) {

        return element.attr('new-view') || 'flickr/flickr-img.html';
      },
      restrict: 'E',
      link: function(scope) {

        // function imgSetWidth() {
        // MAKES TESTING HARD TO USE WINDOW FIX LATER
        // var wdth = element.innerWidth();
        //   var wdth = window.innerWidth;

        //   if (wdth > 1600) {

        //     scope.size = 'h';

        //   } else if (800 > wdth > 1024) {

        //     scope.size = 'b';

        //   } else if (320 > wdth > 800) {

        //     scope.size = 'c';

        //   } else if (wdth > 320) {

        //     scope.size = 'n';
        //   }
        // }

        scope.size = 'b';

        // imgSetWidth();

        window.onresize = function() {

          // imgSetWidth();

          scope.$digest();
        };
      },
      scope: {
        img: '=info'
      }
    };


  }]);
