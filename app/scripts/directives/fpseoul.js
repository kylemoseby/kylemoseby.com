'use strict';

/**
 * @ngdoc directive
 * @name kylemosebyDotcomApp.directive:fpSeoul
 * @description
 * # fpSeoul
 */
angular.module('kylemosebyDotcomApp')
  .directive('fpSeoul', function() {
    return {
      template: '<div class="fp-seoul"></div>',
      restrict: 'E',
      link: function postLink() {}
    };
  });
