'use strict';

/**
 * @ngdoc directive
 * @name kylemosebyDotcomApp.directive:fpVik
 * @description
 * # fpVik
 */
angular.module('kylemosebyDotcomApp')
  .directive('fpVik', function() {
    return {
      template: '<div class="fp-vik"></div>',
      restrict: 'E',
      link: function postLink() {
        // element.text('this is the fpVik directive');
      }
    };
  });
